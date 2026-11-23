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

/** The founding checkout's steps, in order (app/components/MembershipCheckout.tsx). */
export const FOUNDING_STEPS = ["from-founding", "plan", "email", "code", "details", "payment", "review", "founding-joined"];
export const FOUNDING_SIDE_STEPS = ["member"];
/** Membership-flow variants (plan keys) that are NOT founding: a launch site's Remedy Room membership. */
const NOT_FOUNDING_VARIANTS = new Set(["remedy"]);

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
  // day|spa|step -> the variants (tiers) it was recorded under: one sketch per variant
  const combos = new Map<string, Set<string>>();
  hashes.forEach((h, i) => {
    for (const field of Object.keys(h ?? {})) {
      const [flow, spa, step, variant] = field.split("|");
      if (flow !== "membership" || !spas.has(spa) || !step || NOT_FOUNDING_VARIANTS.has(variant)) continue;
      const k = `${days[i]}|${spa}|${step}`;
      if (!combos.has(k)) combos.set(k, new Set());
      combos.get(k)!.add(variant || "-");
    }
  });
  if (!combos.size) return [];
  const keys = [...combos.keys()];
  const q = r.pipeline();
  for (const k of keys) {
    const [day, spa, step] = k.split("|");
    q.pfcount(...([...combos.get(k)!].map((v) => `${OPS_PREFIX}sv:${day}:membership:${spa}:${step}:${v}`) as [string, ...string[]]));
  }
  const counts = (await q.exec()) as unknown[];
  return keys
    .map((k, i) => {
      const [day, spa, step] = k.split("|");
      return { day, spa, flow: "membership", step, guests: Number(counts[i]) || 0 };
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
  founding: true;
  buyerEmailHash?: string;
  membershipStart?: string;
  attribution: { first?: LedgerRow["first"]; last?: LedgerRow["last"] };
};

/** Founding memberships the website sold at the launch sites (from the completion ledger). */
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
      if (!site || row.flow !== "membership" || row.extra?.founding !== true) continue;
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
        founding: true,
        ...(str(row.extra?.buyerEmailHash) ? { buyerEmailHash: str(row.extra?.buyerEmailHash) } : {}),
        ...(str(row.extra?.start) ? { membershipStart: str(row.extra?.start) } : {}),
        attribution: { ...(row.first ? { first: row.first } : {}), ...(row.last ? { last: row.last } : {}) },
      });
    }
  });
  return out.sort((a, b) => a.at.localeCompare(b.at));
}
