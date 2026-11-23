/**
 * Founding checkouts a guest started and may not have finished, so the spa's owner can follow up
 * (John 11/23/2026: "we should be able in our launch board to see who drops off in the checkout
 * funnel"). Ported from the Spavia site (src/lib/ops/founding-checkouts.ts). Atlas reads the feed
 * hourly at /api/ops/founding-checkouts/ for the spa's Launch Board.
 *
 * One record per spa and email, saved once the guest has sent their email (the checkout's email
 * screen says the spa may reach out), and moved forward as they reach each screen. Only the
 * furthest screen is kept. Launch sites only, never a test purchase (?memtest=1).
 *
 * This is the ONE place the site keeps a guest's contact details for analytics-like use, so it is
 * deliberately NOT in the lib/ops store (which holds no personal data). It lives in the site's own
 * Redis and is only readable with the ops key. Nothing here ever fails a guest's request: a write
 * that doesn't land is skipped.
 */
import { Redis } from "@upstash/redis";
import type { LaunchSite } from "@/lib/launchSites";

/** Furthest screen reached, in checkout order. Matches the Launch Board's funnel bars:
 *  email = sent their email (a returning guest still needs the emailed code), account = their
 *  details, payment = the card screen, review = the last screen, joined. */
export const FOUNDING_STAGES = ["email", "account", "payment", "review", "joined"] as const;
export type FoundingStage = (typeof FOUNDING_STAGES)[number];

export type FoundingCheckout = {
  spa: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  startedAt: string;
  updatedAt: string;
  stage: FoundingStage;
};

const KEY = "sway:founding-checkouts:v1";

function redis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

const clean = (v: unknown, max = 80) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Pure merge: the record after a guest reaches `stage`. */
export function mergeFoundingCheckout(
  old: FoundingCheckout | undefined,
  spa: string,
  email: string,
  stage: FoundingStage,
  who: { firstName?: string; lastName?: string; phone?: string },
  now: string
): FoundingCheckout {
  const furthest = old && FOUNDING_STAGES.indexOf(old.stage) > FOUNDING_STAGES.indexOf(stage) ? old.stage : stage;
  const firstName = clean(who.firstName) || old?.firstName;
  const lastName = clean(who.lastName) || old?.lastName;
  const phone = clean(who.phone, 30) || old?.phone;
  return {
    spa,
    email,
    ...(firstName ? { firstName } : {}),
    ...(lastName ? { lastName } : {}),
    ...(phone ? { phone } : {}),
    startedAt: old?.startedAt || now,
    updatedAt: now,
    stage: furthest,
  };
}

export async function noteFoundingCheckout(
  site: LaunchSite | null | undefined,
  test: boolean,
  email: string | undefined | null,
  stage: FoundingStage,
  who: { firstName?: string; lastName?: string; phone?: string } = {}
) {
  const address = clean(email, 200).toLowerCase();
  // Real guests on the real site only: previews and local runs never write to the owner's list.
  if (!site || test || !address.includes("@") || process.env.VERCEL_ENV !== "production") return;
  try {
    const r = redis();
    if (!r) return;
    const field = `${site.key}|${address}`;
    const raw = await r.hget<FoundingCheckout | string>(KEY, field);
    const old = typeof raw === "string" ? (JSON.parse(raw) as FoundingCheckout) : raw ?? undefined;
    const record = mergeFoundingCheckout(old, site.key, address, stage, who, new Date().toISOString());
    await r.hset(KEY, { [field]: JSON.stringify(record) });
  } catch {
    /* follow-up list only: never block the checkout */
  }
}

/** Every saved checkout, newest first (the ops feed). */
export async function foundingCheckouts(): Promise<FoundingCheckout[]> {
  const r = redis();
  if (!r) return [];
  const all = (await r.hgetall<Record<string, FoundingCheckout | string>>(KEY)) ?? {};
  const out: FoundingCheckout[] = [];
  for (const v of Object.values(all)) {
    try {
      const row = typeof v === "string" ? (JSON.parse(v) as FoundingCheckout) : v;
      if (row?.email && row?.spa) out.push(row);
    } catch {
      /* skip a damaged entry */
    }
  }
  return out.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
