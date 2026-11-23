/**
 * Server checks for a founding membership sold at a launch site (lib/launchSites.ts).
 *
 * The page's price list lives in the repo; the contract lives in the owner's Mindbody and can be
 * edited there at any time. So before every sale the purchase route re-reads the contract and only
 * sells when it is still the founding contract the page describes: same name family, sold online,
 * monthly autopay, no deposit or discount, and the price the page shows. A mismatch takes it off
 * sale and raises an /ops/ alert instead of charging a number the guest didn't see (the Spavia
 * checkout's rule).
 *
 * Start date: founding contracts are "charged on a specific date" (the spa's planned start). While
 * that date is in the future the sale is sent with StartDate = that date and the first month is
 * charged at signup, exactly like Mindbody's own store; the next charge falls a month after the
 * start. Once the date has passed (or the contract is switched to "on sale date") the membership
 * starts the day it is bought.
 *
 * The Remedy Room membership sold before opening (site.remedyRoom, plan "remedy") goes through the
 * same check with its own name rule (the spa's "Remedy Room Membership …" contract, never a Flex
 * or founding one) and one extra rule: it must carry a fixed start date until that date has
 * passed, so the site can never bill a guest from today for a spa that is not open. It is not
 * founding.
 */
import { launchPlanPrice, launchToday, type LaunchPlanKey, type LaunchSite, type LaunchTierKey } from "@/lib/launchSites";

const MB = "https://api.mindbodyonline.com/public/v6";

export type LiveFoundingContract = {
  contractId: number;
  name: string;
  price: number;
  /** yyyy-mm-dd the membership starts */
  startDate: string;
  /** true when the start is a fixed future date (first month still charged today) */
  fixedStart: boolean;
  terms: string | null;
};

export type FoundingContractCheck =
  | { ok: true; contract: LiveFoundingContract }
  | { ok: false; reason: "unreachable" | "missing" | "not_founding" | "not_online" | "shape" | "price"; detail: string };

/** One check per founding tier, plus `remedy` where the site sells the Remedy Room membership. */
export type LiveLaunchChecks = Record<LaunchTierKey, FoundingContractCheck> & { remedy?: FoundingContractCheck };

const money = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? Math.round(v * 100) / 100 : NaN);

/** Mindbody returns AgreementTerms as HTML; the checkout shows plain text. */
export function termsToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(div|p|li|h[1-6]|tr)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "· ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;|&rsquo;|&lsquo;/gi, "'")
    .replace(/&ldquo;|&rdquo;/gi, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Is this the contract the page means, by name? A founding tier is "Founding <Tier> …". The Remedy
 * Room membership is the spa's regular "Remedy Room Membership | 4 Sessions": not a Flex one
 * ("Flex Remedy Room Membership …") and not anything founding.
 */
function planNameMatches(plan: LaunchPlanKey, name: string): boolean {
  if (plan === "remedy") return /^\s*remedy room membership\b/i.test(name);
  return /^\s*founding\b/i.test(name) && new RegExp(`\\b${plan}\\b`, "i").test(name);
}

/** Pure: is this Mindbody contract the plan the page sells for `tier` at `price`? */
export function checkFoundingContract(
  raw: any,
  tier: LaunchPlanKey,
  price: number,
  today: string,
  /** The spa's start date (yyyy-mm-dd), for the Remedy Room contract's fixed-start rule. */
  opens?: string
): FoundingContractCheck {
  if (!raw || typeof raw !== "object") return { ok: false, reason: "missing", detail: "contract not returned" };
  const name = String(raw.Name ?? "");
  if (!planNameMatches(tier, name)) return { ok: false, reason: "not_founding", detail: `name "${name}"` };
  if (raw.SoldOnline !== true) return { ok: false, reason: "not_online", detail: "not marked sold online" };
  const sched = raw.AutopaySchedule ?? {};
  const monthly = sched.FrequencyTimeUnit === "Monthly" && Number(sched.FrequencyValue) === 1 && raw.AutopayEnabled !== false;
  const clean =
    money(raw.DepositAmount ?? 0) === 0 &&
    money(raw.DiscountAmount ?? 0) === 0 &&
    (raw.IntroOffer ?? "None") === "None" &&
    raw.FirstAutopayFree !== true &&
    raw.LastAutopayFree !== true &&
    !raw.NumberOfPromoAutopays;
  if (!monthly || !clean) return { ok: false, reason: "shape", detail: "not a plain monthly autopay contract" };
  const first = money(raw.FirstPaymentAmountTotal);
  const recurring = money(raw.RecurringPaymentAmountTotal);
  if (first !== price || recurring !== price)
    return { ok: false, reason: "price", detail: `Mindbody first $${first} / monthly $${recurring}, page $${price}` };

  const specific = /^(\d{4}-\d{2}-\d{2})/.exec(String(raw.ClientsChargedOnSpecificDate ?? ""))?.[1];
  let startDate = today;
  let fixedStart = false;
  if (raw.ClientsChargedOn === "SpecificDate") {
    if (!specific) return { ok: false, reason: "shape", detail: "charged on a specific date, but no date set" };
    if (specific > today) {
      startDate = specific;
      fixedStart = true;
    }
  } else if (raw.ClientsChargedOn !== "OnSaleDate") {
    return { ok: false, reason: "shape", detail: `charged on "${raw.ClientsChargedOn}"` };
  } else if (tier === "remedy" && !(opens && today >= opens)) {
    // Before opening, the Remedy Room contract is sold only while it carries the spa's start date.
    // On "the sale date" it would bill a guest from today for a spa that is not open. From the
    // spa's start date on, the owner switches it back and it sells as a normal membership.
    return { ok: false, reason: "shape", detail: "Remedy Room contract has no fixed start date" };
  }
  return {
    ok: true,
    contract: {
      contractId: Number(raw.Id),
      name: name.replace(/\s+/g, " ").trim(),
      price,
      startDate,
      fixedStart,
      terms: typeof raw.AgreementTerms === "string" && raw.AgreementTerms.trim() ? termsToPlainText(raw.AgreementTerms) : null,
    },
  };
}

/**
 * Read every founding contract at the site live and check each. With a staff `token` Mindbody
 * returns any contract; without one it returns only contracts marked sold online, which founding
 * contracts must be anyway (so the page can show the start date before a staff login exists).
 */
export async function liveFoundingContracts(
  site: LaunchSite,
  token?: string | null
): Promise<LiveLaunchChecks> {
  // The founding tiers, plus the Remedy Room membership where the site sells one (key "remedy").
  const tiers: LaunchPlanKey[] = [...(Object.keys(site.founding.tiers) as LaunchTierKey[]), ...(site.remedyRoom ? (["remedy"] as const) : [])];
  const fail = (reason: "unreachable", detail: string) =>
    Object.fromEntries(tiers.map((t) => [t, { ok: false, reason, detail }])) as LiveLaunchChecks;
  const url = new URL(`${MB}/sale/contracts`);
  url.searchParams.set("request.locationId", String(site.locationId));
  url.searchParams.set("request.limit", "100");
  if (!token) url.searchParams.set("request.soldOnline", "true");
  tiers.forEach((t, i) => url.searchParams.set(`request.contractIds[${i}]`, String(launchPlanPrice(site, t)!.contractId)));
  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": process.env.MINDBODY_API_KEY!,
        SiteId: site.siteId,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return fail("unreachable", `contracts ${res.status}`);
    const list: any[] = Array.isArray(data?.Contracts) ? data.Contracts : [];
    const today = launchToday(site);
    return Object.fromEntries(
      tiers.map((t) => {
        const { contractId, price } = launchPlanPrice(site, t)!;
        return [t, checkFoundingContract(list.find((c) => Number(c?.Id) === contractId), t, price, today, site.remedyRoom?.opens)];
      })
    ) as LiveLaunchChecks;
  } catch (err: any) {
    return fail("unreachable", err?.message || "fetch failed");
  }
}

/** One contract the site sells, read live with a staff token (the purchase route's check). */
export async function liveFoundingContract(
  site: LaunchSite,
  tier: LaunchPlanKey,
  token: string
): Promise<FoundingContractCheck> {
  return (await liveFoundingContracts(site, token))[tier] ?? { ok: false, reason: "missing", detail: "not sold at this site" };
}

/** "February 5, 2027" from yyyy-mm-dd (no time zone math: it is a calendar date). */
export function longDate(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1, 12)).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** The same calendar day one month later (Mar 5 after Feb 5), clamped to the month's last day. */
export function monthAfter(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const next = new Date(Date.UTC(y, m, Math.min(d, last), 12));
  return next.toISOString().slice(0, 10);
}
