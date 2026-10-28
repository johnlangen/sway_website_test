/**
 * Reads the first-party analytics (lib/ops/record.ts) for the /ops/ dashboard and
 * /api/ops/report/. One date range (America/Denver days) and optionally one location.
 */
import { Redis } from "@upstash/redis";
import { createHash, timingSafeEqual } from "crypto";
import { OPS_PREFIX, opsDay, opsRedisSettings } from "./record";
import { FLOW_STEPS } from "./labels";

// ---------------------------------------------------------------- access
/** OPS_KEY in Vercel, or derived from the Mindbody API key (no setup needed). */
export function opsKey(): string {
  if (process.env.OPS_KEY) return process.env.OPS_KEY;
  const mb = process.env.MINDBODY_API_KEY;
  return mb ? createHash("sha256").update(`sway-ops|${mb}`).digest("hex").slice(0, 32) : "";
}
export const OPS_COOKIE = "sway_ops";
export function opsKeyMatches(given: string | undefined | null): boolean {
  const key = opsKey();
  if (!key || !given || given.length !== key.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(key));
}

function redis(): Redis | null {
  const { url, token } = opsRedisSettings();
  return url && token ? new Redis({ url, token }) : null;
}

// ---------------------------------------------------------------- helpers
export function dayRange(to: string, days: number): string[] {
  const out: string[] = [];
  const end = Date.parse(`${to}T12:00:00Z`);
  for (let i = days - 1; i >= 0; i--) out.push(new Date(end - i * 86400000).toISOString().slice(0, 10));
  return out;
}
const asHash = (raw: unknown): Record<string, number> => {
  const out: Record<string, number> = {};
  if (raw && typeof raw === "object" && !Array.isArray(raw)) for (const [k, v] of Object.entries(raw)) out[k] = Number(v) || 0;
  return out;
};
const add = (m: Map<string, number>, k: string, n: number) => m.set(k, (m.get(k) || 0) + n);
const sorted = <T extends { n: number }>(rows: T[]) => rows.sort((a, b) => b.n - a.n);

export type LedgerRow = {
  at: string;
  flow: string;
  location: string;
  item?: string;
  label?: string;
  ref?: string;
  value?: number;
  extra?: Record<string, unknown>;
  first?: { source: string; medium: string; campaign?: string; day: string };
  last?: { source: string; medium: string; campaign?: string; day: string };
};

export type OpsReport = Awaited<ReturnType<typeof opsReport>>;

export async function opsReport(opts: { to?: string; days?: number; loc?: string; page?: string }) {
  const to = opts.to && /^\d{4}-\d{2}-\d{2}$/.test(opts.to) ? opts.to : opsDay();
  const days = Math.min(Math.max(opts.days || 1, 1), 120);
  const loc = opts.loc || "";
  const range = dayRange(to, days);
  const r = redis();
  const empty = {
    range: { from: range[0], to, days, loc },
    totals: { visitors: 0, views: 0, clicks: 0, completions: 0, completedValue: 0, bookedValue: 0 },
    trend: [] as { day: string; visitors: number; views: number; completions: number }[],
    funnels: [] as {
      flow: string;
      steps: { step: string; visitors: number; reports: number }[];
      completed: number;
      bookedValue: number;
      variants: { variant: string; first: number; done: number; completed: number }[];
    }[],
    landings: [] as { source: string; medium: string; campaign: string; n: number }[],
    landingPages: [] as { page: string; n: number }[],
    pages: [] as { page: string; location: string; views: number; visitors: number }[],
    clicks: [] as { page: string; location: string; type: string; target: string; label: string; n: number }[],
    clickTypes: [] as { type: string; n: number }[],
    shown: [] as { flow: string; location: string; step: string; message: string; n: number }[],
    completions: [] as { flow: string; location: string; item: string; n: number }[],
    byLocation: [] as { location: string; bookings: number; memberships: number; leads: number; gifts: number; bookedValue: number }[],
    bySource: [] as { flow: string; source: string; n: number; value: number }[],
    ledger: [] as LedgerRow[],
  };
  if (!r) return empty;

  // 1) per-day hashes + ledgers
  const kinds = ["views", "clicks", "steps", "shown", "landings", "completed", "donevalue"] as const;
  const p = r.pipeline();
  for (const d of range) for (const k of kinds) p.hgetall(`${OPS_PREFIX}${k}:${d}`);
  for (const d of range) p.lrange(`${OPS_PREFIX}ledger:${d}`, 0, 499);
  const res = (await p.exec()) as unknown[];
  const perDay = range.map((d, i) => {
    const o: Record<string, Record<string, number>> = {};
    kinds.forEach((k, j) => (o[k] = asHash(res[i * kinds.length + j])));
    return { day: d, ...o } as { day: string } & Record<(typeof kinds)[number], Record<string, number>>;
  });
  const ledgerRaw = res.slice(range.length * kinds.length) as unknown[];
  const ledger: LedgerRow[] = ledgerRaw
    .flatMap((list) => (Array.isArray(list) ? list : []))
    .flatMap((item) => {
      try {
        return [(typeof item === "string" ? JSON.parse(item) : item) as LedgerRow];
      } catch {
        return [];
      }
    })
    .filter((row) => row && (!loc || row.location === loc))
    .sort((a, b) => (a.at < b.at ? 1 : -1));

  const inLoc = (l: string) => !loc || l === loc;

  // 2) aggregate
  const pageViews = new Map<string, number>();
  const clickMap = new Map<string, number>();
  const clickTypes = new Map<string, number>();
  const stepReports = new Map<string, number>(); // flow|step → reports
  const stepCombos = new Map<string, Set<string>>(); // flow|step → "day:loc:variant" combos (for HLL keys)
  const variantCombos = new Map<string, Set<string>>(); // flow → variants seen
  const shown = new Map<string, number>();
  const landings = new Map<string, number>();
  const landingPages = new Map<string, number>();
  const completed = new Map<string, number>();
  // Booked value: the price the flow showed at its done step (cents, first-party, lib/ops/record.ts)
  const doneValue = new Map<string, number>(); // flow|location → dollars
  const trend: { day: string; views: number; completions: number }[] = [];
  let views = 0;
  let clicks = 0;
  for (const d of perDay) {
    let dv = 0;
    let dc = 0;
    for (const [k, n] of Object.entries(d.views)) {
      const [l, page] = k.split("|");
      if (!inLoc(l)) continue;
      add(pageViews, `${l}|${page}`, n);
      views += n;
      dv += n;
    }
    for (const [k, n] of Object.entries(d.clicks)) {
      const [l, , type] = k.split("|");
      if (!inLoc(l)) continue;
      add(clickMap, k, n);
      add(clickTypes, type, n);
      clicks += n;
    }
    for (const [k, n] of Object.entries(d.steps)) {
      const [flow, l, step, variant] = k.split("|");
      if (!inLoc(l)) continue;
      add(stepReports, `${flow}|${step}`, n);
      if (!stepCombos.has(`${flow}|${step}`)) stepCombos.set(`${flow}|${step}`, new Set());
      stepCombos.get(`${flow}|${step}`)!.add(`${d.day}:${l}:${variant}`);
      if (!variantCombos.has(flow)) variantCombos.set(flow, new Set());
      variantCombos.get(flow)!.add(variant);
    }
    for (const [k, n] of Object.entries(d.shown)) {
      const [, l] = k.split("|");
      if (inLoc(l)) add(shown, k, n);
    }
    for (const [k, n] of Object.entries(d.landings)) {
      const [l, source, medium, campaign, page] = k.split("|");
      if (!inLoc(l)) continue;
      add(landings, `${source}|${medium}|${campaign}`, n);
      add(landingPages, page, n);
    }
    for (const [k, n] of Object.entries(d.completed)) {
      const [, l] = k.split("|");
      if (!inLoc(l)) continue;
      add(completed, k, n);
      dc += n;
    }
    for (const [k, cents] of Object.entries(d.donevalue)) {
      const [flow, l] = k.split("|");
      if (inLoc(l)) add(doneValue, `${flow}|${l}`, cents / 100);
    }
    trend.push({ day: d.day, views: dv, completions: dc });
  }

  // 3) unique visitors (HyperLogLog unions)
  const locs = loc ? [loc] : ["denver-larimer", "denver-rino", "denver-central-park", "union-market", "knox-henderson"];
  const q = r.pipeline();
  q.pfcount(...(range.flatMap((d) => locs.map((l) => `${OPS_PREFIX}uv:${d}:${l}`)) as [string, ...string[]]));
  for (const d of range) q.pfcount(...(locs.map((l) => `${OPS_PREFIX}uv:${d}:${l}`) as [string, ...string[]]));
  const pageList = [...pageViews.keys()];
  // page uniques: pv keys are per page (all locations); a page belongs to one location anyway
  for (const key of pageList) {
    const page = key.split("|")[1];
    q.pfcount(...(range.map((d) => `${OPS_PREFIX}pv:${d}:${page}`) as [string, ...string[]]));
  }
  const stepKeys = [...stepCombos.keys()];
  for (const sk of stepKeys) {
    const [flow, step] = sk.split("|");
    const keys = [...stepCombos.get(sk)!].map((c) => {
      const [d, l, variant] = c.split(":");
      return `${OPS_PREFIX}sv:${d}:${flow}:${l}:${step}:${variant}`;
    });
    q.pfcount(...(keys as [string, ...string[]]));
  }
  // per-variant uniques at each flow's first recorded step and at done
  const variantQueries: { flow: string; variant: string; which: "first" | "done" }[] = [];
  for (const [flow, variants] of variantCombos) {
    const order = FLOW_STEPS[flow] ?? [];
    const flowSteps = [...order, ...stepKeys.filter((k) => k.startsWith(`${flow}|`)).map((k) => k.split("|")[1]).filter((st) => !order.includes(st))];
    for (const variant of variants) {
      // "first" = the earliest step where this option was the one selected (a massage treatment
      // only exists from the treatment step on)
      const firstStep =
        flowSteps.find((st) => [...(stepCombos.get(`${flow}|${st}`) ?? [])].some((c) => c.endsWith(`:${variant}`))) ?? "";
      for (const which of ["first", "done"] as const) {
        const step = which === "first" ? firstStep : "done";
        const combos = [...(stepCombos.get(`${flow}|${step}`) ?? [])].filter((c) => c.endsWith(`:${variant}`));
        if (!combos.length) continue;
        variantQueries.push({ flow, variant, which });
        q.pfcount(
          ...(combos.map((c) => {
            const [d, l] = c.split(":");
            return `${OPS_PREFIX}sv:${d}:${flow}:${l}:${step}:${variant}`;
          }) as [string, ...string[]])
        );
      }
    }
  }
  const counts = ((await q.exec()) as unknown[]).map((n) => Number(n) || 0);
  let i = 0;
  const visitors = counts[i++];
  const dayVisitors = range.map(() => counts[i++]);
  const pageVisitors = pageList.map(() => counts[i++]);
  const stepVisitors = new Map(stepKeys.map((k) => [k, counts[i++]]));
  const variantCounts = variantQueries.map((v) => ({ ...v, n: counts[i++] }));

  // 4) shape
  const flowsSeen = new Set<string>([...stepKeys.map((k) => k.split("|")[0]), ...[...completed.keys()].map((k) => k.split("|")[0])]);
  const funnels = [...flowsSeen]
    .sort((a, b) => Object.keys(FLOW_STEPS).indexOf(a) - Object.keys(FLOW_STEPS).indexOf(b))
    .map((flow) => {
      const order = FLOW_STEPS[flow] ?? [];
      const seen = stepKeys.filter((k) => k.startsWith(`${flow}|`)).map((k) => k.split("|")[1]);
      const steps = [...order.filter((s) => seen.includes(s)), ...seen.filter((s) => !order.includes(s)).sort()].map((step) => ({
        step,
        visitors: stepVisitors.get(`${flow}|${step}`) || 0,
        reports: stepReports.get(`${flow}|${step}`) || 0,
      }));
      const flowCompleted = [...completed.entries()].filter(([k]) => k.startsWith(`${flow}|`)).reduce((s, [, n]) => s + n, 0);
      const variants = [...(variantCombos.get(flow) ?? [])]
        .map((variant) => {
          const itemId = /^(?:massage|facial)-(\d+)$/.exec(variant)?.[1] ?? variant;
          return {
            variant,
            first: variantCounts.find((v) => v.flow === flow && v.variant === variant && v.which === "first")?.n || 0,
            done: variantCounts.find((v) => v.flow === flow && v.variant === variant && v.which === "done")?.n || 0,
            completed: [...completed.entries()].filter(([k]) => k.startsWith(`${flow}|`) && k.endsWith(`|${itemId}`)).reduce((s, [, n]) => s + n, 0),
          };
        })
        .sort((a, b) => b.first - a.first);
      const bookedValue = [...doneValue.entries()].filter(([k]) => k.startsWith(`${flow}|`)).reduce((s, [, v]) => s + v, 0);
      return { flow, steps, completed: flowCompleted, bookedValue: Math.round(bookedValue), variants };
    });

  const completedValue = ledger.reduce((s, row) => s + (typeof row.value === "number" ? row.value : 0), 0);
  const bySourceMap = new Map<string, { n: number; value: number }>();
  for (const row of ledger) {
    const t = row.last ?? row.first;
    const key = `${row.flow}|${t ? `${t.source} / ${t.medium}` : "(direct or untagged)"}`;
    const cur = bySourceMap.get(key) ?? { n: 0, value: 0 };
    cur.n++;
    cur.value += typeof row.value === "number" ? row.value : 0;
    bySourceMap.set(key, cur);
  }

  return {
    range: { from: range[0], to, days, loc },
    totals: {
      visitors,
      views,
      clicks,
      completions: [...completed.values()].reduce((s, n) => s + n, 0),
      completedValue,
      bookedValue: Math.round([...doneValue.values()].reduce((s, v) => s + v, 0)),
    },
    trend: trend.map((t, j) => ({ ...t, visitors: dayVisitors[j] })),
    funnels,
    landings: sorted([...landings].map(([k, n]) => {
      const [source, medium, campaign] = k.split("|");
      return { source, medium, campaign: campaign === "-" ? "" : campaign, n };
    })),
    landingPages: sorted([...landingPages].map(([page, n]) => ({ page, n }))),
    pages: pageList
      .map((k, j) => {
        const [location, page] = k.split("|");
        return { page, location, views: pageViews.get(k) || 0, visitors: pageVisitors[j], n: pageViews.get(k) || 0 };
      })
      .sort((a, b) => b.views - a.views),
    clicks: sorted(
      [...clickMap].map(([k, n]) => {
        const [location, page, type, target, label] = k.split("|");
        return { location, page, type, target: target === "-" ? "" : target, label: label === "-" ? "" : label, n };
      })
    ).filter((c) => !opts.page || c.page === opts.page),
    clickTypes: sorted([...clickTypes].map(([type, n]) => ({ type, n }))),
    shown: sorted(
      [...shown].map(([k, n]) => {
        const [flow, location, step, , message] = k.split("|");
        return { flow, location, step, message, n };
      })
    ),
    completions: sorted(
      [...completed].map(([k, n]) => {
        const [flow, location, item] = k.split("|");
        return { flow, location, item, n };
      })
    ),
    byLocation: (() => {
      const m = new Map<string, { location: string; bookings: number; memberships: number; leads: number; gifts: number; bookedValue: number }>();
      const row = (l: string) => m.get(l) ?? m.set(l, { location: l, bookings: 0, memberships: 0, leads: 0, gifts: 0, bookedValue: 0 }).get(l)!;
      for (const [k, n] of completed) {
        const [flow, l] = k.split("|");
        const r = row(l);
        if (flow === "membership") r.memberships += n;
        else if (flow === "lead") r.leads += n;
        else if (flow === "gift") r.gifts += n;
        else r.bookings += n;
      }
      for (const [k, v] of doneValue) row(k.split("|")[1]).bookedValue += v;
      return [...m.values()]
        .map((r) => ({ ...r, bookedValue: Math.round(r.bookedValue) }))
        .sort((a, b) => b.bookedValue - a.bookedValue || b.bookings - a.bookings);
    })(),
    bySource: [...bySourceMap].map(([k, v]) => {
      const [flow, source] = k.split("|");
      return { flow, source, ...v };
    }).sort((a, b) => b.n - a.n),
    ledger: ledger.slice(0, 200),
  };
}

export type OpsTrend = Awaited<ReturnType<typeof opsTrend>>;

/** Light per-day series for the dashboard's bars: completed bookings, memberships, leads and booked value. */
export async function opsTrend(to: string, days: number, loc = "") {
  const range = dayRange(to, days);
  const r = redis();
  const blank = range.map((day) => ({ day, bookings: 0, memberships: 0, leads: 0, gifts: 0, bookedValue: 0 }));
  if (!r) return blank;
  const p = r.pipeline();
  for (const d of range) {
    p.hgetall(`${OPS_PREFIX}completed:${d}`);
    p.hgetall(`${OPS_PREFIX}donevalue:${d}`);
  }
  const res = (await p.exec()) as unknown[];
  return blank.map((row, i) => {
    for (const [k, n] of Object.entries(asHash(res[i * 2]))) {
      const [flow, l] = k.split("|");
      if (loc && l !== loc) continue;
      if (flow === "membership") row.memberships += n;
      else if (flow === "lead") row.leads += n;
      else if (flow === "gift") row.gifts += n;
      else row.bookings += n;
    }
    for (const [k, cents] of Object.entries(asHash(res[i * 2 + 1]))) {
      if (!loc || k.split("|")[1] === loc) row.bookedValue += cents / 100;
    }
    return { ...row, bookedValue: Math.round(row.bookedValue) };
  });
}
