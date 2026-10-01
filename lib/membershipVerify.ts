import { Redis } from "@upstash/redis";
import { createHash, randomBytes, randomInt, timingSafeEqual } from "crypto";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import { getClubBySiteId, isClubSiteId } from "@/lib/clubLocations";

/**
 * Email verification for the native membership checkout.
 *
 * Why: before this, anyone who typed a guest's email could start a monthly
 * autopay on that guest's stored card, and /api/membership/purchase accepted
 * any clientId. Now:
 *
 *   - An email that matches an existing Mindbody client gets a 6-digit code.
 *     Entering it creates a short-lived server session listing the client ids
 *     that share that email at that site.
 *   - An email with no account gets a "new" session with NO client ids. The
 *     only way an id gets into it is by creating the account through
 *     /api/membership/account/create (which pins the session's email), so a
 *     new-guest session can never reach someone else's existing account.
 *   - Purchase + the membership account routes require the session cookie and
 *     only act on client ids inside it, at the session's site.
 *
 * Sessions/codes live in the same Upstash Redis as lib/cardRateLimit.ts, but
 * unlike that limiter this FAILS CLOSED: if Redis is unavailable on Vercel,
 * saved-card purchases stop rather than going unverified.
 *
 * Codes are never logged, stored only as hashes, single use, 10-minute expiry,
 * 5 attempts each.
 */

export const CODE_TTL_SECONDS = 600;
export const SESSION_TTL_SECONDS = 30 * 60;
const MAX_CODE_ATTEMPTS = 5;
export const RESEND_COOLDOWN_SECONDS = 30;
const SENDS_PER_EMAIL_PER_HOUR = 5;
const STARTS_PER_IP_PER_HOUR = 20;
const CONFIRMS_PER_IP_PER_HOUR = 30;

export const SESSION_COOKIE = "sway_mv";
const COOKIE_PATH = "/api/membership";

export class VerifyUnavailableError extends Error {}

/* ── storage ───────────────────────────────────────────────────── */

type Store = {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, opts: { ex: number; nx?: boolean }): Promise<boolean>;
  del(key: string): Promise<number>;
  incr(key: string, ttlSeconds: number): Promise<number>;
};

function redisStore(redis: Redis): Store {
  return {
    get: (key) => redis.get(key),
    async set(key, value, { ex, nx }) {
      const res = nx
        ? await redis.set(key, value, { ex, nx: true })
        : await redis.set(key, value, { ex });
      return res === "OK";
    },
    del: (key) => redis.del(key),
    async incr(key, ttlSeconds) {
      const n = await redis.incr(key);
      if (n === 1) await redis.expire(key, ttlSeconds);
      return n;
    },
  };
}

// Local development only (no Vercel, no KV env): a per-process map. Never
// used on Vercel, where every instance must share state.
const mem = new Map<string, { v: unknown; exp: number }>();
function memoryStore(): Store {
  const live = (key: string) => {
    const e = mem.get(key);
    if (!e) return null;
    if (Date.now() > e.exp) {
      mem.delete(key);
      return null;
    }
    return e;
  };
  return {
    async get<T>(key: string) {
      const e = live(key);
      return e ? (structuredClone(e.v) as T) : null;
    },
    async set(key, value, { ex, nx }) {
      if (nx && live(key)) return false;
      mem.set(key, { v: structuredClone(value), exp: Date.now() + ex * 1000 });
      return true;
    },
    async del(key) {
      return live(key) && mem.delete(key) ? 1 : 0;
    },
    async incr(key, ttlSeconds) {
      const e = live(key);
      const n = ((e?.v as number) ?? 0) + 1;
      mem.set(key, { v: n, exp: e?.exp ?? Date.now() + ttlSeconds * 1000 });
      return n;
    },
  };
}

function isLocalDev(): boolean {
  return !process.env.VERCEL && process.env.NODE_ENV !== "production";
}

function getStore(): Store {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) return redisStore(new Redis({ url, token }));
  if (isLocalDev()) return memoryStore();
  throw new VerifyUnavailableError("Verification storage is not configured.");
}

/* ── helpers ───────────────────────────────────────────────────── */

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

export function normalizeEmail(s: unknown): string {
  return typeof s === "string" ? s.trim().toLowerCase() : "";
}

export function isValidEmail(s: string): boolean {
  return s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
}

/** Only sites the website actually sells memberships on. Unknown = refuse. */
export function resolveSiteId(raw: unknown): string | null {
  const larimer = process.env.MINDBODY_SITE_ID!;
  if (raw === undefined || raw === null || raw === "") return larimer;
  if (typeof raw !== "string") return null;
  const s = raw.trim();
  if (s === larimer || isClubSiteId(s)) return s;
  return null;
}

export function siteLabel(siteId: string): string {
  return getClubBySiteId(siteId)?.label ?? "Sway Larimer";
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

const emailKey = (siteId: string, email: string) => sha256(`${siteId}:${email}`);

/** Fixed-window counter. Returns true when the request is allowed. */
async function underLimit(store: Store, key: string, limit: number, windowSec: number) {
  return (await store.incr(key, windowSec)) <= limit;
}

/* ── Mindbody lookup (exact email match) ───────────────────────── */

export type MatchedClient = {
  id: string;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  hasCardOnFile: boolean;
  lastFour: string | null;
};

/**
 * Clients at `siteId` whose email EXACTLY equals `email`. Mindbody's
 * searchText is fuzzy (it also matches names), so filter the results.
 * Card-on-file clients sort first: that's the account a returning guest
 * expects to be charged.
 */
export async function findClientsByEmail(siteId: string, email: string): Promise<MatchedClient[]> {
  const token = await getMindbodyStaffToken(siteId);
  const url = new URL("https://api.mindbodyonline.com/public/v6/client/clients");
  url.searchParams.set("request.searchText", email);
  url.searchParams.set("request.includeInactive", "false");
  url.searchParams.set("request.limit", "25");
  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "Api-Key": process.env.MINDBODY_API_KEY!,
      SiteId: siteId,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Mindbody client search failed (${res.status})`);
  const data = await res.json();
  const clients: any[] = Array.isArray(data?.Clients) ? data.Clients : [];
  return clients
    .filter((c) => normalizeEmail(c?.Email) === email && c?.Id != null)
    .map((c) => ({
      id: String(c.Id),
      firstName: (c.FirstName ?? "").trim(),
      lastName: (c.LastName ?? "").trim(),
      mobilePhone: (c.MobilePhone ?? "").trim(),
      hasCardOnFile: Boolean(c.ClientCreditCard?.LastFour),
      lastFour: c.ClientCreditCard?.LastFour ? String(c.ClientCreditCard.LastFour) : null,
    }))
    .sort((a, b) => Number(b.hasCardOnFile) - Number(a.hasCardOnFile));
}

/* ── codes ─────────────────────────────────────────────────────── */

/** Per-IP cap on email-step lookups. Per-email limits live in issueCode. */
export async function startAllowedForIp(req: Request): Promise<boolean> {
  const hour = Math.floor(Date.now() / 3_600_000);
  return underLimit(getStore(), `mv:rl:start:ip:${clientIp(req)}:${hour}`, STARTS_PER_IP_PER_HOUR, 3_700);
}

/**
 * Generates and stores a fresh code for (site, email). Returns the plaintext
 * code for the caller to email, or a limit reason. Any previous code for the
 * pair is replaced and its attempt counter reset.
 */
export async function issueCode(
  siteId: string,
  email: string
): Promise<{ code: string } | { limited: "cooldown" | "email_limited" }> {
  const store = getStore();
  const ek = emailKey(siteId, email);
  const hour = Math.floor(Date.now() / 3_600_000);

  if (!(await store.set(`mv:cool:${ek}`, 1, { ex: RESEND_COOLDOWN_SECONDS, nx: true })))
    return { limited: "cooldown" };
  if (!(await underLimit(store, `mv:rl:send:${ek}:${hour}`, SENDS_PER_EMAIL_PER_HOUR, 3_700)))
    return { limited: "email_limited" };

  const code =
    isLocalDev() && process.env.MEMBERSHIP_VERIFY_DEV_CODE === "1"
      ? "000000"
      : String(randomInt(0, 1_000_000)).padStart(6, "0");

  await store.set(`mv:code:${ek}`, { h: sha256(`${code}:${ek}`) }, { ex: CODE_TTL_SECONDS });
  await store.del(`mv:att:${ek}`);
  return { code };
}

export type CodeResult = "ok" | "invalid" | "expired" | "too_many" | "ip_limited";

export async function consumeCode(req: Request, siteId: string, email: string, code: string): Promise<CodeResult> {
  const store = getStore();
  const hour = Math.floor(Date.now() / 3_600_000);
  if (!(await underLimit(store, `mv:rl:confirm:ip:${clientIp(req)}:${hour}`, CONFIRMS_PER_IP_PER_HOUR, 3_700)))
    return "ip_limited";

  const ek = emailKey(siteId, email);
  const codeKey = `mv:code:${ek}`;
  const record = await store.get<{ h: string }>(codeKey);
  if (!record?.h) return "expired";

  const attempts = await store.incr(`mv:att:${ek}`, CODE_TTL_SECONDS);
  if (attempts > MAX_CODE_ATTEMPTS) {
    await store.del(codeKey);
    return "too_many";
  }

  const expected = Buffer.from(record.h, "hex");
  const actual = Buffer.from(sha256(`${code}:${ek}`), "hex");
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return "invalid";

  // Single use: only the request that actually deletes the key wins, so two
  // concurrent submits of the same code can't both mint a session.
  return (await store.del(codeKey)) === 1 ? "ok" : "expired";
}

/* ── sessions ──────────────────────────────────────────────────── */

export type MembershipSession = {
  email: string;
  siteId: string;
  /** "verified" = proved control of the email. "new" = no account existed. */
  mode: "verified" | "new";
  clientIds: string[];
  createdAt: number;
};

export async function createSession(s: Omit<MembershipSession, "createdAt">): Promise<string> {
  const store = getStore();
  const token = randomBytes(32).toString("base64url");
  await store.set(`mv:sess:${sha256(token)}`, { ...s, createdAt: Date.now() }, { ex: SESSION_TTL_SECONDS });
  return token;
}

function readCookie(req: Request, name: string): string | null {
  const header = req.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=") || null;
  }
  return null;
}

export async function getSession(req: Request): Promise<{ token: string; session: MembershipSession } | null> {
  const token = readCookie(req, SESSION_COOKIE);
  if (!token || token.length > 100) return null;
  const session = await getStore().get<MembershipSession>(`mv:sess:${sha256(token)}`);
  return session ? { token, session } : null;
}

/** Records a client id created inside this session (new-guest account). */
export async function addClientToSession(token: string, session: MembershipSession, clientId: string) {
  if (session.clientIds.includes(clientId)) return;
  const remainingMs = session.createdAt + SESSION_TTL_SECONDS * 1000 - Date.now();
  if (remainingMs <= 0) return;
  await getStore().set(
    `mv:sess:${sha256(token)}`,
    { ...session, clientIds: [...session.clientIds, clientId] },
    { ex: Math.ceil(remainingMs / 1000) }
  );
}

export function sessionCookie(token: string): string {
  const secure = process.env.VERCEL || process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${SESSION_COOKIE}=${token}; Path=${COOKIE_PATH}; Max-Age=${SESSION_TTL_SECONDS}; HttpOnly; SameSite=Strict${secure}`;
}

/* ── purchase double-submit lock ───────────────────────────────── */

/** True if this caller took the lock; false if a purchase is already in flight / done. */
export async function takePurchaseLock(siteId: string, clientId: string, contractId: number): Promise<boolean> {
  return getStore().set(`mv:buy:${siteId}:${clientId}:${contractId}`, 1, { ex: 300, nx: true });
}

export async function releasePurchaseLock(siteId: string, clientId: string, contractId: number) {
  await getStore().del(`mv:buy:${siteId}:${clientId}:${contractId}`);
}

/* ── email ─────────────────────────────────────────────────────── */

const CODE_EMAIL_FROM = "Sway Wellness <contact@swaywellnessspa.com>";

export async function sendCodeEmail(to: string, code: string, siteId: string): Promise<boolean> {
  if (isLocalDev() && process.env.MEMBERSHIP_VERIFY_DEV_CODE === "1") return true;
  if (!process.env.RESEND_API_KEY) {
    console.error("[membership/verify] RESEND_API_KEY missing");
    return false;
  }
  const location = siteLabel(siteId);
  const minutes = CODE_TTL_SECONDS / 60;
  try {
    const { resend } = await import("@/lib/resend");
    const { error } = await resend.emails.send({
      from: CODE_EMAIL_FROM,
      to,
      subject: `${code} is your Sway verification code`,
      text: [
        `Your Sway verification code is ${code}.`,
        "",
        `Enter it on the ${location} membership page to continue. It expires in ${minutes} minutes.`,
        "",
        "If you didn't request this, you can ignore this email. Nothing happens without the code.",
        "",
        "Sway Wellness · (303) 476-6150",
      ].join("\n"),
      html: `<div style="font-family:Helvetica,Arial,sans-serif;color:#113D33;max-width:440px;margin:0 auto;padding:24px">
  <p style="font-size:13px;letter-spacing:.15em;text-transform:uppercase;color:#4A776D;margin:0 0 16px">Sway Wellness</p>
  <p style="font-size:16px;margin:0 0 12px">Your verification code is</p>
  <p style="font-size:34px;font-weight:700;letter-spacing:.3em;margin:0 0 16px">${code}</p>
  <p style="font-size:14px;line-height:1.5;margin:0 0 16px">Enter it on the ${location} membership page to continue. It expires in ${minutes} minutes.</p>
  <p style="font-size:13px;line-height:1.5;color:#113D33aa;margin:0">If you didn't request this, you can ignore this email. Nothing happens without the code.</p>
</div>`,
    });
    if (error) {
      console.error("[membership/verify] email send failed:", error.name ?? error.message);
      return false;
    }
    return true;
  } catch (err: any) {
    console.error("[membership/verify] email send threw:", err?.message);
    return false;
  }
}

/** Shared headers: auth responses must never be cached. */
export const NO_STORE = { "Cache-Control": "no-store, private" };
