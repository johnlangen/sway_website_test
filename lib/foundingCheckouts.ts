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
import { getLaunchSiteBySiteId, LAUNCH_SITES } from "@/lib/launchSites";
import { getClubBySiteId } from "@/lib/clubLocations";

/**
 * The spa a checkout belongs to, for the follow-up list. Since 11/23/2026 every membership
 * checkout page keeps this list (lib/membershipOffers.ts followUp), not only launch sites:
 * a launch site's key, a club's slug, or "denver-larimer" (no siteId, or Larimer's own).
 */
export function followUpSpaForSite(siteId: string | null | undefined): { key: string } | null {
  const s = (siteId || "").trim();
  const launch = getLaunchSiteBySiteId(s);
  if (launch) return { key: launch.key };
  const club = s ? getClubBySiteId(s) : null;
  if (club) return { key: club.key };
  if (!s || s === process.env.MINDBODY_SITE_ID) return { key: "denver-larimer" };
  return null;
}

/** Launch-site spas: the only rows Atlas's Launch Board feed returns by default. */
export const isLaunchSpa = (spa: string) => Object.prototype.hasOwnProperty.call(LAUNCH_SITES, spa);

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
  /** The plan they were joining: a founding tier ("essential" / "premier" / "ultimate") or "remedy"
   *  (a launch site's Remedy Room membership, which is not founding). Missing on rows written
   *  before 11/23/2026 evening, when every launch-site checkout was a founding one. */
  plan?: string;
};

const KEY = "sway:founding-checkouts:v1";

function redis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

const clean = (v: unknown, max = 80) => (typeof v === "string" ? v.trim().slice(0, max) : "");
/** A plan key as the checkout names it (lib/membershipOffers.ts CheckoutPlan.key), or "". */
const cleanPlan = (v: unknown) => (typeof v === "string" && /^[a-z0-9_-]{1,40}$/.test(v) ? v : "");

/** Pure merge: the record after a guest reaches `stage`. */
export function mergeFoundingCheckout(
  old: FoundingCheckout | undefined,
  spa: string,
  email: string,
  stage: FoundingStage,
  who: { firstName?: string; lastName?: string; phone?: string; plan?: string },
  now: string
): FoundingCheckout {
  const plan = cleanPlan(who.plan);
  // Someone who already joined and is now in the checkout for a DIFFERENT membership (a founder
  // adding the Remedy Room membership) is a new checkout: start the record over, so they show as
  // stopped on the new plan instead of "joined" on it. Their name and phone carry over. A joined
  // row with no plan predates the Remedy Room checkout, so it was a founding tier: only "remedy"
  // is known to be different from it.
  const another =
    !!old && old.stage === "joined" && stage !== "joined" && !!plan && (old.plan ? plan !== old.plan : plan === "remedy");
  if (old && another) old = { ...old, stage, startedAt: now };
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
    ...(plan || old?.plan ? { plan: plan || old?.plan } : {}),
  };
}

export async function noteFoundingCheckout(
  site: { key: string } | null | undefined,
  test: boolean,
  email: string | undefined | null,
  stage: FoundingStage,
  who: { firstName?: string; lastName?: string; phone?: string; plan?: string } = {}
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

/**
 * A sale went through: mark the guest joined, but only if they are already on the list (a join
 * through a checkout that never told them about the list adds nobody to it).
 */
export async function noteJoinedIfStarted(site: { key: string } | null | undefined, email: string | undefined | null) {
  const address = clean(email, 200).toLowerCase();
  if (!site || !address.includes("@") || process.env.VERCEL_ENV !== "production") return;
  try {
    const r = redis();
    if (!r) return;
    const field = `${site.key}|${address}`;
    const raw = await r.hget<FoundingCheckout | string>(KEY, field);
    const old = typeof raw === "string" ? (JSON.parse(raw) as FoundingCheckout) : raw ?? undefined;
    if (!old) return;
    await r.hset(KEY, { [field]: JSON.stringify(mergeFoundingCheckout(old, site.key, address, "joined", {}, new Date().toISOString())) });
  } catch {
    /* follow-up list only */
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
