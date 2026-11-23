/**
 * Every membership the website sells, and what its checkout page needs to show.
 *
 * One checkout page for all of them (John 11/23/2026: "with all our memberships we should
 * implement this new page and flow ... and have extremely thorough tracking on it"):
 *   /locations/denver-larimer/membership/join/?plan=essential|premier|ultimate|aescape30|aescape60|remedy
 *   /locations/denver-rino/membership/join/?plan=lounge                (and denver-central-park)
 *   /locations/denver-rino/membership/join/?plan=essential&perk=rate   (founding; perk=visits = the
 *                                                                       regular rate + Lounge visits)
 *   /locations/union-market/founding-membership/join/?tier=essential   (launch site, lib/launchSites.ts)
 * all rendered by app/components/MembershipCheckout.tsx on the SAME server routes the pop-up used.
 *
 * Contract ids and prices are NOT retyped here where they already live somewhere: Larimer's plans
 * are LARIMER_JOIN_PLANS below (the membership page imports them), club founding comes from
 * lib/clubFounding.ts, launch sites from lib/launchSites.ts. scripts/test-membership-offers.mts
 * pins every plan to its Mindbody contract id.
 *
 * CHECKOUT_MODE is the rollback switch: "popup" sends that location's Join buttons back to the
 * old pop-up (MembershipJoinFlow) on the next deploy. Nothing else changes.
 */

import { CLUB_LOCATIONS, type ClubLocationKey } from "./clubLocations";
import { CLUB_FOUNDING, CLUB_FOUNDING_TIERS, FOUNDING_RATES, LOUNGE_VISIT_PERK, type FoundingTierKey } from "./clubFounding";
import { FOUNDING_TIER_CONTENT } from "./foundingTiers";
import { LAUNCH_TIER_KEYS, type LaunchSite } from "./launchSites";

export const CHECKOUT_MODE: Record<"denver-larimer" | "denver-rino" | "denver-central-park", "page" | "popup"> = {
  "denver-larimer": "page",
  "denver-rino": "page",
  "denver-central-park": "page",
};

/** Which existing membership would make this purchase a duplicate (the pop-up's rule, unchanged). */
export type PlanFamily = "spa" | "aescape" | "remedy" | "club_lounge";

export type CheckoutPlan = {
  /** ?plan= value and the tracking variant. */
  key: string;
  family: PlanFamily;
  contractId: number;
  /** "Essential", "Founding Essential", "Remedy Lounge" */
  name: string;
  /** Monthly price in USD (a launch site's live price replaces it once loaded). */
  price: number;
  /** One line in the plan picker. */
  line: string;
  /** On the member card until the guest's name is known: "50 minutes, every month". */
  headline: string;
  /** One short line for phones. */
  short: string;
  chooseLabel: string;
  choose: string[];
  /** What the price is shown against. */
  visit?: number;
  regular?: number;
  /** Extra lines on the welcome screen. */
  doneNotes?: string[];
  doneCta: { href: string; label: string };
};

export type CheckoutConfig = {
  /** Tracking: which kind of offer this checkout sells. */
  offer: "membership" | "founding" | "lounge";
  locationKey: string;
  shortName: string;
  cityLine: string;
  /** Mindbody site. Omitted at Larimer, exactly as the pop-up did (the routes default to it). */
  siteId?: string;
  /** GA4 membership_location. */
  analyticsKey: string;
  help: { phone?: string; email?: string };
  back: { href: string; label: string };
  /** "Membership" / "Founding membership" */
  label: string;
  /** "Member" / "Founding member" */
  memberLabel: string;
  welcome: string;
  /** Join button: "Start my membership" / "Become a founding member" */
  joinVerb: string;
  plans: CheckoutPlan[];
  perksLabel: string;
  perks: string[];
  finePrint: string;
  renewal: string;
  /** "Keep me updated" starts checked (Larimer and the clubs, as the pop-up did) or not (launch sites). */
  marketingDefault: boolean;
  /** Keep the stopped-checkout follow-up list for this spa, and say so on the email screen. */
  followUp: boolean;
  salesOpen: boolean;
  /** Launch sites read price, start date and terms live (/api/membership/founding/). */
  launch: boolean;
  /** Which Google Ads conversions a completed join fires. */
  ads: "larimer" | "club" | "none";
};

/* ── Larimer ──────────────────────────────────────────────────────────────── */

type LarimerPlanKey = "essential" | "premier" | "ultimate" | "aescape30" | "aescape60" | "remedy";

/** Larimer's sellable plans. The membership page and the checkout both read this. */
export const LARIMER_JOIN_PLANS: Record<LarimerPlanKey, { key: LarimerPlanKey; contractId: number; name: string; price: number; blurb: string }> = {
  essential: { key: "essential", contractId: 122, name: "Essential", price: 99, blurb: "1 signature facial or massage per month, plus all member perks." },
  premier: { key: "premier", contractId: 123, name: "Premier", price: 129, blurb: "1 targeted facial or massage per month, plus all member perks." },
  ultimate: { key: "ultimate", contractId: 124, name: "Ultimate", price: 159, blurb: "1 tech-enhanced facial or massage per month, plus all member perks." },
  // Aescape = two new-menu contracts at the same price. Old generic 111 must never sell.
  aescape30: { key: "aescape30", contractId: 119, name: "Aescape 4×30", price: 99, blurb: "Four 30-minute Aescape robot massage sessions every month." },
  aescape60: { key: "aescape60", contractId: 120, name: "Aescape 2×60", price: 99, blurb: "Two 60-minute Aescape robot massage sessions every month." },
  remedy: { key: "remedy", contractId: 102, name: "Remedy Room", price: 99, blurb: "4 Remedy Room recovery circuit visits per month." },
};

const LARIMER_SINGLE_VISIT: Record<"essential" | "premier" | "ultimate", number> = { essential: 139, premier: 169, ultimate: 199 };
const LARIMER_SPA_PERKS = ["50% off all boosts", "50% off Remedy Room", "Private member lounge", "Bring a friend at member pricing", "10% off retail", "Rollover credits"];
const LARIMER = "/locations/denver-larimer";

function larimerPlans(group: "spa" | "aescape" | "remedy"): CheckoutPlan[] {
  if (group === "spa")
    return (["essential", "premier", "ultimate"] as const).map((k) => {
      const p = LARIMER_JOIN_PLANS[k];
      const t = FOUNDING_TIER_CONTENT[k];
      return {
        key: k,
        family: "spa",
        contractId: p.contractId,
        name: p.name,
        price: p.price,
        line: `${t.short}, every month.`,
        headline: t.timeLine,
        short: t.short,
        chooseLabel: "Choose each month",
        choose: t.choose,
        visit: LARIMER_SINGLE_VISIT[k],
        doneCta: { href: `${LARIMER}/book`, label: "Book your first visit" },
      };
    });
  if (group === "aescape")
    return (["aescape30", "aescape60"] as const).map((k) => {
      const p = LARIMER_JOIN_PLANS[k];
      const four = k === "aescape30";
      return {
        key: k,
        family: "aescape",
        contractId: p.contractId,
        name: p.name,
        price: p.price,
        line: p.blurb,
        headline: four ? "Four 30-minute sessions, every month" : "Two 60-minute sessions, every month",
        short: four ? "Four 30-minute Aescape sessions" : "Two 60-minute Aescape sessions",
        chooseLabel: "Every month",
        choose: [
          four ? "Four 30-minute Aescape robot massage sessions" : "Two 60-minute Aescape robot massage sessions",
          "Real-time muscle mapping and personalized pressure",
          "Compression apparel provided at check-in",
        ],
        doneCta: { href: `${LARIMER}/book-aescape`, label: "Book your first session" },
      };
    });
  const p = LARIMER_JOIN_PLANS.remedy;
  return [
    {
      key: "remedy",
      family: "remedy",
      contractId: p.contractId,
      name: p.name,
      price: p.price,
      line: p.blurb,
      headline: "Four Remedy Room visits, every month",
      short: "Four Remedy Room visits",
      chooseLabel: "Every visit",
      choose: ["Traditional sauna", "Cold plunge", "Compression therapy", "LED light therapy"],
      doneCta: { href: `${LARIMER}/book-remedy-room`, label: "Book your first visit" },
    },
  ];
}

function larimerCheckout(planKey: string | undefined): { config: CheckoutConfig; initialPlan: string | null } {
  const group = planKey === "aescape30" || planKey === "aescape60" || planKey === "aescape" ? "aescape" : planKey === "remedy" ? "remedy" : "spa";
  const plans = larimerPlans(group);
  return {
    initialPlan: plans.find((p) => p.key === planKey)?.key ?? (plans.length === 1 ? plans[0].key : null),
    config: {
      offer: "membership",
      locationKey: "denver-larimer",
      shortName: "Sway Larimer",
      cityLine: "Denver, CO",
      analyticsKey: "larimer",
      help: { phone: "(303) 476-6150" },
      back: { href: `${LARIMER}/membership/`, label: "Back to memberships" },
      label: "Membership",
      memberLabel: "Member",
      welcome: "Welcome to Sway.",
      joinVerb: "Start my membership",
      plans,
      perksLabel: "Every member gets",
      perks: group === "spa" ? LARIMER_SPA_PERKS : [],
      finePrint: group === "spa" ? "No enrollment fee · Treatments roll over · Pause up to 3 months a year" : "No enrollment fee · Secure Mindbody checkout",
      renewal: "Your membership renews automatically until you cancel.",
      marketingDefault: true,
      followUp: true,
      salesOpen: true,
      launch: false,
      ads: "larimer",
    },
  };
}

/* ── Clubs (RiNo, Central Park) ───────────────────────────────────────────── */

/** The clubs' unlimited Remedy Lounge membership (same contract id on both club sites). */
export const CLUB_LOUNGE = {
  contractId: 143,
  price: 129,
  dropIn: 49,
  perks: ["Unlimited Remedy Lounge visits", "One 75-minute session every day", "Member-only promos and retail offers", "Freeze up to 3 months a year"],
};

const CLUB_ANALYTICS: Record<ClubLocationKey, string> = { "denver-rino": "rino", "denver-central-park": "central_park" };
const CLUB_FOUNDING_PERKS = [
  "Unused treatments roll over for 12 months while you stay active",
  "Member pricing on any extra treatment",
  "50% off boosts",
  "Share your treatment with one family member or partner",
  "Suspend up to 3 months a calendar year",
];

function clubCheckout(clubKey: ClubLocationKey, planKey: string | undefined, perkParam: string | undefined): { config: CheckoutConfig; initialPlan: string | null } {
  const club = CLUB_LOCATIONS[clubKey];
  const founding = CLUB_FOUNDING[clubKey];
  const base = `/locations/${clubKey}`;
  const shared = {
    locationKey: clubKey,
    shortName: founding.shortName,
    cityLine: "Denver, CO",
    siteId: club.siteId,
    analyticsKey: CLUB_ANALYTICS[clubKey],
    help: { phone: club.phone },
    marketingDefault: true,
    followUp: true,
    launch: false,
    ads: "club" as const,
  };

  const tier = (["essential", "premier", "ultimate"] as const).find((t) => t === planKey);
  if (tier) {
    // Founding: the founding rate (contracts 137-139), or the regular rate plus Lounge visits
    // (contracts 122-124, the desk adds the visits). Same choice the founding page offers.
    const visits = perkParam === "visits";
    const plans: CheckoutPlan[] = (["essential", "premier", "ultimate"] as FoundingTierKey[]).map((k) => {
      const rate = FOUNDING_RATES[k];
      const t = CLUB_FOUNDING_TIERS.find((x) => x.key === k)!;
      const time = FOUNDING_TIER_CONTENT[k];
      return {
        key: visits ? `${k}-visits` : k,
        family: "spa",
        contractId: visits ? rate.regularContractId : rate.contractId,
        name: `Founding ${t.name}`,
        price: visits ? rate.regular : rate.founding,
        line: t.line,
        headline: time.timeLine,
        short: time.short,
        chooseLabel: "Choose each month",
        choose: [...t.massages, ...t.facials],
        visit: rate.dropIn,
        ...(visits ? {} : { regular: rate.regular }),
        doneNotes: club.servicesLive
          ? visits
            ? [`We'll add your ${LOUNGE_VISIT_PERK.visits} Remedy Lounge visits to your account.`]
            : []
          : visits
            ? [`We'll add your ${LOUNGE_VISIT_PERK.visits} Remedy Lounge visits to your account, and reach out when massage and facial booking opens.`]
            : ["We'll reach out when massage and facial booking opens."],
        doneCta: visits ? { href: `${base}/book-remedy-lounge`, label: "Book a Remedy Lounge visit" } : { href: `${base}/`, label: `Back to ${founding.shortName}` },
      };
    });
    return {
      initialPlan: visits ? `${tier}-visits` : tier,
      config: {
        ...shared,
        offer: "founding",
        back: { href: `${base}/founding-membership/`, label: "Back to founding membership" },
        label: "Founding membership",
        memberLabel: "Founding member",
        welcome: "Welcome, founding member.",
        joinVerb: "Become a founding member",
        plans,
        perksLabel: "Every founding membership",
        perks: visits ? [`${LOUNGE_VISIT_PERK.visits} free Remedy Lounge visits`, ...CLUB_FOUNDING_PERKS] : CLUB_FOUNDING_PERKS,
        finePrint: "No enrollment fee · Treatments roll over · Pause up to 3 months a year",
        renewal: "Your membership renews automatically every 12 months until you cancel. To cancel, contact the club by phone or email.",
        salesOpen: founding.salesOpen,
      },
    };
  }

  return {
    initialPlan: "club_lounge",
    config: {
      ...shared,
      offer: "lounge",
      back: { href: `${base}/membership/`, label: "Back to membership" },
      label: "Remedy Lounge membership",
      memberLabel: "Remedy Lounge member",
      welcome: "Welcome to Sway.",
      joinVerb: "Start my membership",
      plans: [
        {
          key: "club_lounge",
          family: "club_lounge",
          contractId: CLUB_LOUNGE.contractId,
          name: "Remedy Lounge",
          price: CLUB_LOUNGE.price,
          line: `Unlimited Remedy Lounge access at ${founding.shortName}. One 75-minute recovery session every day.`,
          headline: "Unlimited Remedy Lounge, every day",
          short: "Unlimited Remedy Lounge visits",
          chooseLabel: "Your membership",
          choose: CLUB_LOUNGE.perks,
          doneCta: { href: `${base}/book-remedy-lounge`, label: "Book your first visit" },
        },
      ],
      perksLabel: "",
      perks: [],
      finePrint: "No enrollment fee · Month-to-month · Freeze up to 3 months a year",
      renewal: "Your membership renews automatically until you cancel.",
      salesOpen: true,
    },
  };
}

/* ── Launch sites (Union Market) ──────────────────────────────────────────── */

export function launchCheckout(site: LaunchSite, tierParam: string | undefined): { config: CheckoutConfig; initialPlan: string | null } {
  const base = `/locations/${site.key}`;
  const plans: CheckoutPlan[] = LAUNCH_TIER_KEYS.map((k) => {
    const t = FOUNDING_TIER_CONTENT[k];
    const price = site.founding.tiers[k];
    return {
      key: k,
      family: "spa",
      contractId: price.contractId,
      name: `Founding ${t.name}`,
      price: price.price,
      line: `${t.short}, every month.`,
      headline: t.timeLine,
      short: t.short,
      chooseLabel: "Choose each month",
      choose: t.choose,
      visit: price.visit,
      regular: price.regular,
      doneNotes: ["We'll email you as soon as booking opens."],
      doneCta: { href: `${base}/`, label: `Back to ${site.shortName}` },
    };
  });
  return {
    initialPlan: LAUNCH_TIER_KEYS.find((t) => t === (tierParam || "").toLowerCase()) ?? null,
    config: {
      offer: "founding",
      locationKey: site.key,
      shortName: site.shortName,
      cityLine: site.cityLine,
      siteId: site.siteId,
      analyticsKey: site.key.replace(/-/g, "_"),
      help: { email: site.helpEmail },
      back: { href: `${base}/founding-membership/`, label: "Back to founding membership" },
      label: "Founding membership",
      memberLabel: "Founding member",
      welcome: "Welcome, founding member.",
      joinVerb: "Become a founding member",
      plans,
      perksLabel: "Every founding membership",
      perks: ["Unused treatments roll over for 12 months while you stay active", "Member pricing on extra treatments", "Share your treatment with one family member or partner"],
      finePrint: "",
      renewal: "Your membership renews every 12 months until you cancel. To cancel, contact the spa by phone or email.",
      marketingDefault: false,
      followUp: true,
      salesOpen: site.founding.salesOpen,
      launch: true,
      ads: "none",
    },
  };
}

/* ── lookup ───────────────────────────────────────────────────────────────── */

export function membershipCheckout(location: string, q: { plan?: string; perk?: string }): { config: CheckoutConfig; initialPlan: string | null } | null {
  const plan = (q.plan || "").toLowerCase() || undefined;
  if (location === "denver-larimer") return larimerCheckout(plan);
  if (location === "denver-rino" || location === "denver-central-park") return clubCheckout(location, plan === "lounge" ? "club_lounge" : plan, (q.perk || "").toLowerCase() || undefined);
  return null;
}

/** Where a Join button goes. `from` names the button, for the checkout's entry-point tracking. */
export function joinHref(location: string, plan: string, opts: { perk?: string; from?: string } = {}): string {
  const q = new URLSearchParams({ plan });
  if (opts.perk) q.set("perk", opts.perk);
  if (opts.from) q.set("from", opts.from);
  return `/locations/${location}/membership/join/?${q}`;
}

/** Every plan the site can sell at a location, for the contract-id test. */
export function allPlans(location: string): CheckoutPlan[] {
  if (location === "denver-larimer") return (["spa", "aescape", "remedy"] as const).flatMap(larimerPlans);
  if (location === "denver-rino" || location === "denver-central-park")
    return [
      ...clubCheckout(location, "essential", "rate").config.plans,
      ...clubCheckout(location, "essential", "visits").config.plans,
      ...clubCheckout(location, "club_lounge", undefined).config.plans,
    ];
  return [];
}
