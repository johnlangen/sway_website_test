/**
 * Feeds Atlas reads for a launch site's Launch Board (John 11/23/2026). Same shapes as the Spavia
 * site's /api/ops/funnel/ and /api/ops/sales/, so Atlas's founding checkout section works for a
 * Sway spa the way it does for a Spavia one. Ops key only (lib/ops/report.ts).
 *
 * Scope on purpose: launch sites (lib/launchSites.ts) and the membership flow only. Atlas reads
 * Larimer's and the clubs' online joins another way, and nothing here changes that.
 */
import { Redis } from "@upstash/redis";
import { OPS_PREFIX, opsRedisSettings } from "./record";
import type { LedgerRow } from "./report";
import { LAUNCH_SITES } from "@/lib/launchSites";
import { giftSites } from "@/lib/giftCards/sites";

/** The founding checkout's steps, in order (app/components/MembershipCheckout.tsx). */
export const FOUNDING_STEPS = ["from-founding", "plan", "email", "code", "details", "payment", "review", "founding-joined"];
export const FOUNDING_SIDE_STEPS = ["member"];
/** Membership-flow variants (plan keys) that are NOT founding: a launch site's Remedy Room membership. */
const NOT_FOUNDING_VARIANTS = new Set(["remedy"]);

/**
 * The Remedy Room membership's checkout at a launch site, as its OWN flow in the feed ("remedy"),
 * so Atlas can show it beside the founding checkout without mixing the two (Atlas, 11/23/2026).
 * Its screens are the membership flow's steps recorded under variant "remedy"; which page sent the
 * guest is the checkout-detail flow's from-* steps under the same variant.
 */
export const REMEDY_FLOW = "remedy";
export const REMEDY_STEPS = ["opened", "email", "code", "details", "payment", "review", "joined"];
export const REMEDY_SOURCE_STEPS = ["from-location", "from-membership", "from-founding", "from-direct", "from-other"];

/**
 * Pure: which feed row one recorded step field ("flow|spa|step|variant") belongs to, or null.
 * `from` is the flow it was recorded under (the unique-guest sketch is keyed by it).
 */
export function feedRowFor(field: string, spas: Set<string>): { flow: string; spa: string; step: string; from: string; variant: string } | null {
  const [flow, spa, step, variant = ""] = field.split("|");
  if (!spas.has(spa) || !step) return null;
  const v = variant || "-";
  if (flow === "membership") return NOT_FOUNDING_VARIANTS.has(variant) ? { flow: REMEDY_FLOW, spa, step, from: flow, variant: v } : { flow, spa, step, from: flow, variant: v };
  if (flow === "checkout" && variant === "remedy" && step.startsWith("from-")) return { flow: REMEDY_FLOW, spa, step, from: flow, variant: v };
  return null;
}

const MAX_DAYS = 120; // the unique-visitor sketches are kept 120 days

function redis(): Redis | null {
  const { url, token } = opsRedisSettings();
  return url && token ? new Redis({ url, token }) : null;
}

/** Inclusive yyyy-mm-dd days from..to, newest capped at MAX_DAYS back from `to`. */
export function feedDays(from: string | null, to: string | null, today: string): string[] {
  const ok = (d: string | null): d is string => !!d && /^\d{4}-\d{2}-\d{2}$/.test(d);
  const end = ok(to) && to <= today ? to : today;
  const endMs = Date.parse(`${end}T12:00:00Z`);
  const startMs = Math.max(ok(from) ? Date.parse(`${from}T12:00:00Z`) : endMs, endMs - (MAX_DAYS - 1) * 86400000);
  const out: string[] = [];
  for (let t = startMs; t <= endMs; t += 86400000) out.push(new Date(t).toISOString().slice(0, 10));
  return out;
}

export type FunnelRow = { day: string; spa: string; flow: string; step: string; guests: number };

/** Unique guests per day at each membership-flow step, for the launch sites. */
export async function launchFunnelRows(days: string[]): Promise<FunnelRow[]> {
  const r = redis();
  if (!r || !days.length) return [];
  const spas = new Set(Object.keys(LAUNCH_SITES));
  const p = r.pipeline();
  for (const d of days) p.hgetall(`${OPS_PREFIX}steps:${d}`);
  const hashes = (await p.exec()) as (Record<string, unknown> | null)[];
  // day|flow|spa|step -> the sketches it was recorded under (one per variant): "membership" rows are
  // the founding checkout (every variant except the Remedy Room's), "remedy" rows are the Remedy
  // Room membership's checkout (feedRowFor above).
  const combos = new Map<string, Set<string>>();
  hashes.forEach((h, i) => {
    for (const field of Object.keys(h ?? {})) {
      const row = feedRowFor(field, spas);
      if (!row) continue;
      const k = `${days[i]}|${row.flow}|${row.spa}|${row.step}`;
      if (!combos.has(k)) combos.set(k, new Set());
      combos.get(k)!.add(`${OPS_PREFIX}sv:${days[i]}:${row.from}:${row.spa}:${row.step}:${row.variant}`);
    }
  });
  if (!combos.size) return [];
  const keys = [...combos.keys()];
  const q = r.pipeline();
  for (const k of keys) q.pfcount(...([...combos.get(k)!] as [string, ...string[]]));
  const counts = (await q.exec()) as unknown[];
  return keys
    .map((k, i) => {
      const [day, flow, spa, step] = k.split("|");
      return { day, spa, flow, step, guests: Number(counts[i]) || 0 };
    })
    .filter((row) => row.guests > 0);
}

export type FoundingSale = {
  at: string;
  day: string;
  flow: "membership";
  spa: string;
  siteId: string;
  clientContractId?: string;
  amount: number;
  plan?: string;
  /** true = a founding membership. false = the launch site's Remedy Room membership (plan "remedy"). */
  founding: boolean;
  buyerEmailHash?: string;
  membershipStart?: string;
  attribution: { first?: LedgerRow["first"]; last?: LedgerRow["last"] };
};

/**
 * Memberships the website sold at the launch sites (from the completion ledger): founding ones
 * (founding: true) and, since 11/23/2026, the Remedy Room membership (founding: false, plan
 * "remedy"). Founding counts must filter on founding === true.
 */
export async function foundingSales(days: string[]): Promise<FoundingSale[]> {
  const r = redis();
  if (!r || !days.length) return [];
  const p = r.pipeline();
  for (const d of days) p.lrange(`${OPS_PREFIX}ledger:${d}`, 0, -1);
  const lists = (await p.exec()) as unknown[][];
  const out: FoundingSale[] = [];
  lists.forEach((list, i) => {
    for (const raw of list ?? []) {
      let row: LedgerRow;
      try {
        row = typeof raw === "string" ? (JSON.parse(raw) as LedgerRow) : (raw as LedgerRow);
      } catch {
        continue;
      }
      const site = LAUNCH_SITES[row?.location as keyof typeof LAUNCH_SITES];
      const isFounding = row.extra?.founding === true;
      if (!site || row.flow !== "membership" || !(isFounding || row.extra?.plan === "remedy")) continue;
      const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);
      out.push({
        at: row.at,
        day: days[i],
        flow: "membership",
        spa: site.key,
        siteId: site.siteId,
        ...(row.ref ? { clientContractId: row.ref } : {}),
        amount: typeof row.value === "number" ? row.value : 0,
        ...(str(row.extra?.plan) ? { plan: str(row.extra?.plan) } : {}),
        founding: isFounding,
        ...(str(row.extra?.buyerEmailHash) ? { buyerEmailHash: str(row.extra?.buyerEmailHash) } : {}),
        ...(str(row.extra?.start) ? { membershipStart: str(row.extra?.start) } : {}),
        attribution: { ...(row.first ? { first: row.first } : {}), ...(row.last ? { last: row.last } : {}) },
      });
    }
  });
  return out.sort((a, b) => a.at.localeCompare(b.at));
}

/**
 * A gift card the site's own checkout sold (lib/giftCards), so Atlas can tell website cards from
 * desk cards (Atlas, 11/23/2026). The site sells them at the spa's own Mindbody location (1), not
 * the Online Store (98), so in Mindbody alone a website card looks like a desk sale.
 */
export type WebsiteGiftSale = {
  at: string;
  day: string;
  flow: "gift";
  spa: string;
  siteId: string;
  /** Mindbody's sale id at that site: the join key. Ids repeat across sites, so always pair it with siteId. */
  saleId: string;
  /** What the buyer paid. */
  amount: number;
  /** Never a founding sale: founding counts filter on founding === true. */
  founding: false;
  attribution: { first?: LedgerRow["first"]; last?: LedgerRow["last"] };
};

/** One ledger row as a website gift sale, or null (not a gift sale, an unknown spa, or no sale id to match on). */
export function giftSaleFor(row: LedgerRow, day: string, siteIds: Record<string, string>): WebsiteGiftSale | null {
  if (row?.flow !== "gift" || !row.ref) return null;
  const siteId = siteIds[row.location];
  if (!siteId) return null;
  return {
    at: row.at,
    day,
    flow: "gift",
    spa: row.location,
    siteId,
    saleId: String(row.ref),
    amount: typeof row.value === "number" ? row.value : 0,
    founding: false,
    attribution: { ...(row.first ? { first: row.first } : {}), ...(row.last ? { last: row.last } : {}) },
  };
}

/**
 * A membership the site's own checkout sold at an OPEN spa (Larimer, RiNo, Central Park), for the
 * same reason (Atlas, 11/23/2026). Launch-site memberships are FoundingSale rows above, never these.
 */
export type WebsiteMembershipSale = {
  at: string;
  day: string;
  flow: "membership";
  spa: string;
  siteId: string;
  /** Mindbody's ClientContractId at that site: the join key (pair it with siteId). */
  clientContractId: string;
  /** The monthly price. */
  amount: number;
  /** The plan key the checkout sold (essential / premier / ultimate, or a club plan). */
  plan?: string;
  founding: false;
  attribution: { first?: LedgerRow["first"]; last?: LedgerRow["last"] };
};

/** One ledger row as an open spa's website membership sale, or null. */
export function membershipSaleFor(row: LedgerRow, day: string, siteIds: Record<string, string>): WebsiteMembershipSale | null {
  if (row?.flow !== "membership" || !row.ref) return null;
  const siteId = siteIds[row.location];
  if (!siteId) return null;
  return {
    at: row.at,
    day,
    flow: "membership",
    spa: row.location,
    siteId,
    clientContractId: String(row.ref),
    amount: typeof row.value === "number" ? row.value : 0,
    ...(row.item ? { plan: row.item } : {}),
    founding: false,
    attribution: { ...(row.first ? { first: row.first } : {}), ...(row.last ? { last: row.last } : {}) },
  };
}

/**
 * Gift cards and memberships sold through the site's own checkouts at the open spas (from the
 * completion ledger). The open spas are the ones with a gift checkout (lib/giftCards/sites.ts).
 */
export async function openSpaWebsiteSales(days: string[]): Promise<(WebsiteGiftSale | WebsiteMembershipSale)[]> {
  const r = redis();
  if (!r || !days.length) return [];
  const siteIds = Object.fromEntries(giftSites().map((s) => [s.slug, s.siteId]));
  const p = r.pipeline();
  for (const d of days) p.lrange(`${OPS_PREFIX}ledger:${d}`, 0, -1);
  const lists = (await p.exec()) as unknown[][];
  const out: (WebsiteGiftSale | WebsiteMembershipSale)[] = [];
  lists.forEach((list, i) => {
    for (const raw of list ?? []) {
      let row: LedgerRow;
      try {
        row = typeof raw === "string" ? (JSON.parse(raw) as LedgerRow) : (raw as LedgerRow);
      } catch {
        continue;
      }
      const sale = giftSaleFor(row, days[i], siteIds) ?? membershipSaleFor(row, days[i], siteIds);
      if (sale) out.push(sale);
    }
  });
  return out.sort((a, b) => a.at.localeCompare(b.at));
}
