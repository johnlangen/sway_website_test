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
 */
import { launchToday, type LaunchSite, type LaunchTierKey } from "@/lib/launchSites";

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

/** Pure: is this Mindbody contract the founding plan the page sells for `tier` at `price`? */
export function checkFoundingContract(
  raw: any,
  tier: LaunchTierKey,
  price: number,
  today: string
): FoundingContractCheck {
  if (!raw || typeof raw !== "object") return { ok: false, reason: "missing", detail: "contract not returned" };
  const name = String(raw.Name ?? "");
  if (!/^\s*founding\b/i.test(name) || !new RegExp(`\\b${tier}\\b`, "i").test(name))
    return { ok: false, reason: "not_founding", detail: `name "${name}"` };
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
): Promise<Record<LaunchTierKey, FoundingContractCheck>> {
  const tiers = Object.keys(site.founding.tiers) as LaunchTierKey[];
  const fail = (reason: "unreachable", detail: string) =>
    Object.fromEntries(tiers.map((t) => [t, { ok: false, reason, detail }])) as Record<LaunchTierKey, FoundingContractCheck>;
  const url = new URL(`${MB}/sale/contracts`);
  url.searchParams.set("request.locationId", String(site.locationId));
  url.searchParams.set("request.limit", "100");
  if (!token) url.searchParams.set("request.soldOnline", "true");
  tiers.forEach((t, i) => url.searchParams.set(`request.contractIds[${i}]`, String(site.founding.tiers[t].contractId)));
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
        const { contractId, price } = site.founding.tiers[t];
        return [t, checkFoundingContract(list.find((c) => Number(c?.Id) === contractId), t, price, today)];
      })
    ) as Record<LaunchTierKey, FoundingContractCheck>;
  } catch (err: any) {
    return fail("unreachable", err?.message || "fetch failed");
  }
}

/** One founding contract, read live with a staff token (the purchase route's check). */
export async function liveFoundingContract(
  site: LaunchSite,
  tier: LaunchTierKey,
  token: string
): Promise<FoundingContractCheck> {
  return (await liveFoundingContracts(site, token))[tier];
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
