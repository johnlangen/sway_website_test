/**
 * Email verification for the gift checkout (the Spavia site's MembershipAuth, 10/28 port).
 *
 * Every buyer proves their email with a 6-digit code before any account, saved card or past
 * purchase is shown or used: the receipt goes to that address, and a saved card can only be
 * charged by its owner. Codes are stored only as hashes, single use, 10 minutes, 5 tries; sends are
 * limited per email and per connection. Sessions are per location and last an hour.
 */
import { randomInt, randomUUID, timingSafeEqual } from "crypto";
import { GiftError, sha256, type GiftStore } from "./store";
import { isValidEmail, normalizeEmail } from "./catalog";
import type { GiftSite } from "./sites";

export type GiftSession = {
  id: string;
  slug: string;
  email: string;
  /** The Mindbody client the buyer chose (or created) at this location */
  clientId?: string;
  expires: number;
};

type Challenge = { email: string; slug: string; digest: string; expires: number };

const CODE_TTL = 600;
export const SESSION_TTL = 3600;

async function limited(store: GiftStore, key: string, max: number) {
  return (await store.incr(`rate:${key}`, 3600)) > max;
}

/** Issues a code for (location, email) and emails it. Returns the challenge id (kept in a cookie). */
export async function beginVerification(store: GiftStore, site: GiftSite, rawEmail: unknown, ip: string) {
  const email = normalizeEmail(rawEmail);
  if (!isValidEmail(email)) throw new GiftError("email", "Enter a valid email address.");
  if (!(await store.put(`code-cooldown:${sha256(site.slug + email)}`, 1, 30, true)))
    throw new GiftError("rate_limit", "Please wait 30 seconds before requesting another code.", 429);
  if ((await limited(store, `email:${sha256(email)}`, 5)) || (await limited(store, `ip:${sha256(ip)}`, 20)))
    throw new GiftError("rate_limit", "Too many codes requested. Please try again in an hour, or call the spa.", 429);
  const id = randomUUID();
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  await store.put(`challenge:${id}`, { email, slug: site.slug, digest: sha256(id + code), expires: Date.now() + CODE_TTL * 1000 } satisfies Challenge, CODE_TTL);
  if (!(await sendCode(email, code, site))) {
    await store.remove(`challenge:${id}`);
    throw new GiftError("email_unavailable", "We couldn't send your code just now. Please try again in a minute, or use the Mindbody link below.", 503);
  }
  return id;
}

export async function verifyCode(store: GiftStore, site: GiftSite, challengeId: string, input: unknown): Promise<GiftSession> {
  const code = typeof input === "string" ? input.replace(/\D/g, "") : "";
  if (!/^[0-9a-f-]{36}$/.test(challengeId)) throw new GiftError("code", "That code has expired. Please request a new one.", 401);
  const challenge = await store.get<Challenge>(`challenge:${challengeId}`);
  if (
    (await store.incr(`code-attempt:${challengeId}`, CODE_TTL)) > 5 ||
    !challenge ||
    challenge.slug !== site.slug ||
    challenge.expires <= Date.now() ||
    !/^\d{6}$/.test(code) ||
    !timingSafeEqual(Buffer.from(challenge.digest), Buffer.from(sha256(challengeId + code)))
  )
    throw new GiftError("code", "That code is incorrect or has expired. Request a new code if needed.", 401);
  // Single use: only the first of two simultaneous submits gets a session
  if (!(await store.put(`code-used:${challengeId}`, 1, CODE_TTL, true)))
    throw new GiftError("code", "This code has already been used. Request a new code.", 401);
  await store.remove(`challenge:${challengeId}`);
  const session: GiftSession = { id: randomUUID(), slug: site.slug, email: challenge.email, expires: Date.now() + SESSION_TTL * 1000 };
  await store.put(`session:${session.id}`, session, SESSION_TTL);
  return session;
}

export async function readSession(store: GiftStore, site: GiftSite, id: string | undefined): Promise<GiftSession> {
  const s = id && /^[0-9a-f-]{36}$/.test(id) ? await store.get<GiftSession>(`session:${id}`) : null;
  if (!s || s.slug !== site.slug || s.expires <= Date.now()) throw new GiftError("session", "Verify your email to continue.", 401);
  return s;
}

export async function saveSession(store: GiftStore, s: GiftSession) {
  const ttl = Math.ceil((s.expires - Date.now()) / 1000);
  if (ttl > 0) await store.put(`session:${s.id}`, s, ttl);
}

const FROM = "Sway Wellness <contact@swaywellnessspa.com>";

async function sendCode(to: string, code: string, site: GiftSite): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    if (!process.env.VERCEL) {
      // Local development only: the code goes to the server log instead of an inbox
      console.info(`[gift-cards] verification code for ${to}: ${code}`);
      return true;
    }
    console.error("[gift-cards] RESEND_API_KEY missing");
    return false;
  }
  try {
    const { resend } = await import("@/lib/resend");
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject: `${code} is your Sway verification code`,
      text: [
        `Your Sway verification code is ${code}.`,
        "",
        `Enter it on the ${site.name} gift card page to continue. It expires in 10 minutes.`,
        "",
        "If you didn't request this, you can ignore this email. Nothing happens without the code.",
        "",
        `${site.name} · ${site.phone}`,
      ].join("\n"),
      html: `<div style="font-family:Helvetica,Arial,sans-serif;color:#113D33;max-width:440px;margin:0 auto;padding:24px">
  <p style="font-size:13px;letter-spacing:.15em;text-transform:uppercase;color:#4A776D;margin:0 0 16px">Sway Wellness</p>
  <p style="font-size:16px;margin:0 0 12px">Your verification code is</p>
  <p style="font-size:34px;font-weight:700;letter-spacing:.3em;margin:0 0 16px">${code}</p>
  <p style="font-size:14px;line-height:1.5;margin:0 0 16px">Enter it on the ${site.name} gift card page to continue. It expires in 10 minutes.</p>
  <p style="font-size:13px;line-height:1.5;color:#3d6b60;margin:0">If you didn't request this, you can ignore this email. Nothing happens without the code.</p>
</div>`,
    });
    if (error) {
      console.error("[gift-cards] code email failed:", error.name ?? error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[gift-cards] code email threw:", err instanceof Error ? err.message : "unknown");
    return false;
  }
}
