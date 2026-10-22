/**
 * First-party site analytics (ported from the Spavia site's ops monitor, 10/22: "you should be able
 * to answer any question I ask about any funnel or click on the website").
 *
 * Everything lives in the site's Redis under sway:ops:v1:, counted on our own server, so ad
 * blockers and GA4 setup gaps (unregistered params, missing GTM tags) don't hide anything:
 *   - page views and every click (page, kind of link, where it goes, its label), per location/day;
 *   - every step reached in each booking / membership flow, with the option picked (variant:
 *     treatment or session type), unique visitors per step (HyperLogLog), errors shown to guests;
 *   - where visitors came from (landing source/medium/campaign), from the sw_src_* cookies;
 *   - a ledger of completed bookings, memberships and leads written by the API routes AFTER
 *     Mindbody confirms, with first/last-touch attribution (the authoritative count).
 *
 * No names, emails, phones, card details or Mindbody client ids are stored. Visitor ids are random
 * browser ids, stored only inside HyperLogLogs (hashed). Nothing here ever blocks or fails a
 * guest's request: every write swallows its own errors and runs after the response (after()).
 *
 * Read it with ~/spavia-agents/sway/sway_ops.py (lib/ops/README.md).
 */
import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

export const OPS_PREFIX = "sway:ops:v1:";
const COUNT_DAYS = 400; // count hashes: tiny, kept long enough for year-over-year questions
const HLL_DAYS = 120; // unique-visitor sketches
const LEDGER_DAYS = 3 * 365;

export const FLOWS = [
  "service", // massage/facial (Larimer /book + club ClubServiceFlow)
  "aescape",
  "remedy_room",
  "remedy_lounge",
  "membership",
  "maven", // Maven hotel Aescape page
  "lead", // enter-to-win / waitlist / founding forms
] as const;
export type OpsFlow = (typeof FLOWS)[number];

/**
 * The analytics database. OPS_KV_REST_API_URL/TOKEN (a separate Upstash database) when set, so
 * analytics volume can never compete with the site's own Redis use (membership locks, gclid
 * store, waitlist); otherwise the site's KV. OPS_TRACKING=off stops every write (kill switch).
 */
export function opsRedisSettings(): { url?: string; token?: string } {
  if (process.env.OPS_KV_REST_API_URL && process.env.OPS_KV_REST_API_TOKEN)
    return { url: process.env.OPS_KV_REST_API_URL, token: process.env.OPS_KV_REST_API_TOKEN };
  return {
    url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
  };
}
let client: Redis | null | undefined;
function redis(): Redis | null {
  if (client !== undefined) return client;
  const { url, token } = opsRedisSettings();
  client = url && token ? new Redis({ url, token }) : null;
  return client;
}
const trackingOff = () => process.env.OPS_TRACKING === "off";

/** EXPIRE once per key per warm server instance (instead of on every write: halves the
 *  command count). A key missed here gets its TTL from the next instance that writes it. */
const ttlDone = new Set<string>();
function ttl(p: ReturnType<Redis["pipeline"]>, key: string, seconds: number) {
  if (ttlDone.has(key)) return;
  if (ttlDone.size > 5000) ttlDone.clear();
  ttlDone.add(key);
  p.expire(key, seconds);
}

/** The office's day (America/Denver), so counts line up with Mindbody's day. */
export const opsDay = (at = Date.now()) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Denver" }).format(new Date(at));

/** Drop long digit runs (phones, cards) and emails from any free text we keep. */
export const scrub = (v: string) => v.replace(/\d[\d -]{5,}\d/g, "#").replace(/[^\s@]+@[^\s@]+/g, "[email]");
const clip = (v: string, n: number) => (v.length > n ? v.slice(0, n) : v);
/** Hash-field-safe: no "|" (our separator), no newlines. */
const part = (v: unknown, n = 80) => clip(scrub(String(v ?? "")).replace(/[|\n\r]+/g, " ").trim(), n) || "-";
const hashId = (v: string) => createHash("sha256").update(`sway-ops|${v}`).digest("hex").slice(0, 16);

const SLUGS = ["denver-larimer", "denver-rino", "denver-central-park", "union-market", "knox-henderson"];
/** Same rule as GTM's `location` variable: the /locations/<slug>/ in the path, else Larimer. */
export function locationFromPath(path: string): string {
  if (path.includes("/denver-rino")) return "denver-rino";
  if (path.includes("/denver-central-park")) return "denver-central-park";
  if (path.includes("/union-market") || path.includes("/georgetown")) return "union-market";
  if (path.includes("/knox-henderson") || path.includes("/dallas")) return "knox-henderson";
  return "denver-larimer";
}
export const isLocation = (s: string) => SLUGS.includes(s);

async function exec(build: (p: ReturnType<Redis["pipeline"]>) => void) {
  if (trackingOff()) return;
  const r = redis();
  if (!r) return;
  try {
    const p = r.pipeline();
    build(p);
    await p.exec();
  } catch (err: any) {
    console.warn("[ops] write failed:", err?.message);
  }
}

// ---------------------------------------------------------------- attribution (sw_src_* cookies)
export type Touch = { source: string; medium: string; campaign?: string; clickIds?: string[]; day: string };
export const FIRST_TOUCH_COOKIE = "sw_src_first";
export const LAST_TOUCH_COOKIE = "sw_src_last";

export function decodeTouch(raw: string | undefined): Touch | undefined {
  if (!raw) return undefined;
  const [v, source, medium, campaign, clicks, day] = raw.split("|").map((s) => {
    try {
      return decodeURIComponent(s);
    } catch {
      return "";
    }
  });
  if (v !== "v1" || !source || !medium || !/^\d{4}-\d{2}-\d{2}$/.test(day || "")) return undefined;
  const c = (x: string, n = 60) => x.toLowerCase().replace(/[^a-z0-9._~ -]/g, "").trim().slice(0, n);
  return {
    source: c(source),
    medium: c(medium),
    ...(c(campaign || "", 80) ? { campaign: c(campaign || "", 80) } : {}),
    ...(clicks ? { clickIds: clicks.split("+").map((x) => c(x, 12)).filter(Boolean) } : {}),
    day: day!,
  };
}

function cookie(header: string | null, name: string): string | undefined {
  if (!header) return undefined;
  for (const pair of header.split(";")) {
    const i = pair.indexOf("=");
    if (i > 0 && pair.slice(0, i).trim() === name) return pair.slice(i + 1).trim();
  }
  return undefined;
}
export function touchesFromRequest(req: Request): { first?: Touch; last?: Touch } {
  const h = req.headers.get("cookie");
  const first = decodeTouch(cookie(h, FIRST_TOUCH_COOKIE));
  const last = decodeTouch(cookie(h, LAST_TOUCH_COOKIE));
  return { ...(first ? { first } : {}), ...(last ? { last } : {}) };
}

/** Only the real site counts (not *.vercel.app previews or local dev). */
export function countsForAnalytics(req: Request): boolean {
  const host = (req.headers.get("x-forwarded-host") || req.headers.get("host") || "").split(":")[0].toLowerCase();
  return host === "swaywellnessspa.com" || host === "www.swaywellnessspa.com";
}
const BOT_UA = /bot|crawl|spider|slurp|headless|lighthouse|pingdom|uptime|monitor|preview|facebookexternalhit|whatsapp|python|curl|wget|httpclient/i;
export const isBot = (req: Request) => BOT_UA.test(req.headers.get("user-agent") || "");

// ---------------------------------------------------------------- beacons from the pages
export type Beacon =
  | { kind: "view"; path: string; visitor: string; landing?: { source: string; medium: string; campaign?: string } }
  | { kind: "click"; path: string; visitor: string; type: string; target: string; label: string }
  | {
      kind: "step";
      path: string;
      visitor: string;
      flow: OpsFlow;
      step: string;
      variant?: string;
      error?: string;
      value?: number;
    };

export async function recordBeacon(b: Beacon) {
  const day = opsDay();
  const loc = locationFromPath(b.path);
  const page = part(b.path, 120);
  const who = hashId(b.visitor);
  const C = COUNT_DAYS * 86400;
  const H = HLL_DAYS * 86400;
  await exec((p) => {
    if (b.kind === "view") {
      // daily unique visitors per location (views only: every visit has one)
      p.pfadd(`${OPS_PREFIX}uv:${day}:${loc}`, who);
      ttl(p, `${OPS_PREFIX}uv:${day}:${loc}`, H);
      p.hincrby(`${OPS_PREFIX}views:${day}`, `${loc}|${page}`, 1);
      ttl(p, `${OPS_PREFIX}views:${day}`, C);
      p.pfadd(`${OPS_PREFIX}pv:${day}:${page}`, who);
      ttl(p, `${OPS_PREFIX}pv:${day}:${page}`, H);
      if (b.landing) {
        const src = `${loc}|${part(b.landing.source, 60)}|${part(b.landing.medium, 40)}|${part(b.landing.campaign, 80)}|${page}`;
        p.hincrby(`${OPS_PREFIX}landings:${day}`, src, 1);
        ttl(p, `${OPS_PREFIX}landings:${day}`, C);
      }
    } else if (b.kind === "click") {
      const f = `${loc}|${page}|${part(b.type, 24)}|${part(b.target, 140)}|${part(b.label, 60)}`;
      p.hincrby(`${OPS_PREFIX}clicks:${day}`, f, 1);
      ttl(p, `${OPS_PREFIX}clicks:${day}`, C);
    } else {
      const variant = part(b.variant, 40);
      const f = `${b.flow}|${loc}|${part(b.step, 30)}|${variant}`;
      if (b.error) {
        p.hincrby(`${OPS_PREFIX}shown:${day}`, `${f}|${part(b.error, 160)}`, 1);
        ttl(p, `${OPS_PREFIX}shown:${day}`, C);
        return;
      }
      p.hincrby(`${OPS_PREFIX}steps:${day}`, f, 1);
      ttl(p, `${OPS_PREFIX}steps:${day}`, C);
      const k = `${OPS_PREFIX}sv:${day}:${b.flow}:${loc}:${part(b.step, 30)}:${variant}`;
      p.pfadd(k, who);
      ttl(p, k, H);
      if (b.step === "done" && typeof b.value === "number" && b.value > 0 && b.value < 10000) {
        p.hincrby(`${OPS_PREFIX}donevalue:${day}`, `${b.flow}|${loc}|${variant}`, Math.round(b.value * 100));
        ttl(p, `${OPS_PREFIX}donevalue:${day}`, C);
      }
    }
  });
}

// ---------------------------------------------------------------- completions (server, authoritative)
export type Completion = {
  flow: OpsFlow;
  location: string;
  /** Mindbody session type / contract / form id: what was booked or bought */
  item?: string | number;
  /** Human label (e.g. contract name, "Remedy Lounge + 2 saunas"); never guest data */
  label?: string;
  /** Mindbody appointment / client-contract id, for joining back to Mindbody */
  ref?: string | number;
  value?: number;
  /** Extra non-personal facts, e.g. { boosts: 1, member: true, source: "enter-to-win" } */
  extra?: Record<string, string | number | boolean>;
};

export async function recordCompletion(req: Request, c: Completion) {
  if (!countsForAnalytics(req)) return;
  const day = opsDay();
  const alias: Record<string, string> = { georgetown: "union-market", dallas: "knox-henderson" };
  const named = alias[c.location] ?? c.location;
  const loc = isLocation(named) ? named : "denver-larimer";
  const row = {
    at: new Date().toISOString(),
    flow: c.flow,
    location: loc,
    ...(c.item !== undefined ? { item: String(c.item) } : {}),
    ...(c.label ? { label: part(c.label, 80) } : {}),
    ...(c.ref !== undefined ? { ref: String(c.ref) } : {}),
    ...(typeof c.value === "number" ? { value: c.value } : {}),
    ...(c.extra ? { extra: c.extra } : {}),
    ...touchesFromRequest(req),
  };
  await exec((p) => {
    p.hincrby(`${OPS_PREFIX}completed:${day}`, `${c.flow}|${loc}|${part(c.item, 40)}`, 1);
    ttl(p, `${OPS_PREFIX}completed:${day}`, COUNT_DAYS * 86400);
    p.lpush(`${OPS_PREFIX}ledger:${day}`, JSON.stringify(row));
    ttl(p, `${OPS_PREFIX}ledger:${day}`, LEDGER_DAYS * 86400);
  });
}
