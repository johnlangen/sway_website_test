import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import { getLaunchSite, LAUNCH_TIER_KEYS, type LaunchTierKey } from "@/lib/launchSites";
import { liveFoundingContracts, longDate, monthAfter } from "@/lib/launchFounding";

export const runtime = "nodejs";

/**
 * GET /api/membership/founding/?location=union-market
 *
 * What the founding page and its checkout can sell right now, read live from the spa's Mindbody:
 *   { location, salesOpen, checkoutReady, plans: [{ tier, contractId, price, available,
 *     startDate, startLabel, fixedStart, nextChargeLabel, terms }] }
 *
 * - `available` is false when Mindbody's contract no longer matches the page (name, sold online,
 *   monthly, price): that tier is off sale until someone fixes it.
 * - `checkoutReady` is true only when the website's staff login works on that Mindbody site AND
 *   every tier is available. The Join buttons need salesOpen && checkoutReady; until then the
 *   page keeps its interest form.
 * The contract read works without a staff login (founding contracts are sold online), so the
 * page can show the real start date before the login exists. Cached 5 minutes per instance.
 */

type Plan = {
  tier: LaunchTierKey;
  contractId: number;
  price: number;
  available: boolean;
  startDate: string | null;
  startLabel: string | null;
  fixedStart: boolean;
  nextChargeLabel: string | null;
  terms: string | null;
};
type Payload = { location: string; salesOpen: boolean; checkoutReady: boolean; plans: Plan[] };

const cache = new Map<string, { at: number; payload: Payload }>();
const TTL_MS = 5 * 60 * 1000;

export async function GET(req: Request) {
  const site = getLaunchSite(new URL(req.url).searchParams.get("location"));
  if (!site) return NextResponse.json({ error: "Unknown location." }, { status: 404 });

  const hit = cache.get(site.key);
  if (hit && Date.now() - hit.at < TTL_MS) return NextResponse.json(hit.payload, { headers: { "Cache-Control": "no-store" } });

  const token = await getMindbodyStaffToken(site.siteId).catch(() => null);
  const checks = await liveFoundingContracts(site, token);
  const plans: Plan[] = LAUNCH_TIER_KEYS.map((tier) => {
    const c = checks[tier];
    const { contractId, price } = site.founding.tiers[tier];
    if (!c.ok) {
      if (c.reason !== "unreachable") console.error("[membership/founding] off sale:", { location: site.key, tier, reason: c.reason, detail: c.detail });
      return { tier, contractId, price, available: false, startDate: null, startLabel: null, fixedStart: false, nextChargeLabel: null, terms: null };
    }
    return {
      tier,
      contractId,
      price,
      available: true,
      startDate: c.contract.startDate,
      startLabel: longDate(c.contract.startDate),
      fixedStart: c.contract.fixedStart,
      nextChargeLabel: longDate(monthAfter(c.contract.startDate)),
      terms: c.contract.terms,
    };
  });
  const payload: Payload = {
    location: site.key,
    salesOpen: site.founding.salesOpen,
    checkoutReady: Boolean(token) && plans.every((p) => p.available),
    plans,
  };
  // Only keep a good answer: a Mindbody hiccup shouldn't hide the Join buttons for five minutes.
  if (plans.some((p) => p.available)) cache.set(site.key, { at: Date.now(), payload });
  return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
}
