// Private first-party analytics dashboard (lib/ops/README.md). Open /api/ops/login/?key=… once
// (sets a cookie), then /ops/. 404 without it. Counts are Sway's own (lib/ops/record.ts): ad
// blockers and GA4 setup gaps don't hide anything here.
import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { HideFloatingWidgets } from "@/app/components/HideFloatingWidgets";
import { OPS_COOKIE, opsKeyMatches, opsReport, type LedgerRow } from "@/lib/ops/report";
import { opsDay } from "@/lib/ops/record";
import { FLOW_NAMES, LOCATION_NAMES, itemLabel, variantLabel } from "@/lib/ops/labels";
import AutoRefresh from "./AutoRefresh";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "Sway site analytics" },
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

const RANGES = [
  { days: 1, label: "Today" },
  { days: 7, label: "7 days" },
  { days: 28, label: "28 days" },
  { days: 90, label: "90 days" },
];
const LOCS = ["", "denver-larimer", "denver-rino", "denver-central-park", "union-market", "knox-henderson"];

const fmt = (n: number) => n.toLocaleString("en-US");
const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const pct = (a: number, b: number) => (b > 0 ? `${Math.round((a / b) * 100)}%` : "–");
const locName = (l: string) => LOCATION_NAMES[l] ?? l;
const timeMT = (iso: string) =>
  new Date(iso).toLocaleString("en-US", { timeZone: "America/Denver", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const touch = (row: LedgerRow) => {
  const t = row.last ?? row.first;
  return t ? `${t.source} / ${t.medium}${t.campaign ? ` · ${t.campaign}` : ""}` : "direct / untagged";
};

function Panel({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white border border-[#113D33]/10 p-5 md:p-6">
      <h2 className="text-lg font-semibold text-[#113D33]">{title}</h2>
      {note && <p className="text-xs text-[#113D33]/75 mt-1">{note}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}
function Table({ head, rows, empty = "Nothing yet." }: { head: string[]; rows: React.ReactNode[][]; empty?: string }) {
  if (!rows.length) return <p className="text-sm text-[#113D33]/75">{empty}</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-[#113D33]/75">
            {head.map((h, i) => (
              <th key={h} className={`py-1.5 pr-3 font-semibold ${i > 0 && typeof rows[0]?.[i] === "number" ? "text-right" : ""}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-[#113D33]/5">
              {r.map((c, j) => (
                <td key={j} className={`py-1.5 pr-3 align-top ${typeof c === "number" ? "text-right tabular-nums" : "break-words"}`}>
                  {typeof c === "number" ? fmt(c) : c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function OpsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string; loc?: string; to?: string; page?: string }>;
}) {
  if (!opsKeyMatches((await cookies()).get(OPS_COOKIE)?.value)) notFound();
  const q = await searchParams;
  const days = RANGES.some((r) => String(r.days) === q.days) ? Number(q.days) : 7;
  const loc = LOCS.includes(q.loc || "") ? q.loc || "" : "";
  const today = opsDay();
  const to = /^\d{4}-\d{2}-\d{2}$/.test(q.to || "") && q.to! <= today ? q.to! : today;
  const page = q.page && /^\/[A-Za-z0-9/_.~%-]{0,200}$/.test(q.page) ? q.page : "";
  const r = await opsReport({ to, days, loc, page });
  const href = (o: { days?: number; loc?: string; page?: string }) => {
    const p = new URLSearchParams();
    p.set("days", String(o.days ?? days));
    const l = o.loc ?? loc;
    if (l) p.set("loc", l);
    if (to !== today) p.set("to", to);
    const pg = o.page ?? page;
    if (pg) p.set("page", pg);
    return `/ops/?${p.toString()}`;
  };
  const maxTrend = Math.max(1, ...r.trend.map((t) => t.visitors));
  const chip = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-sm font-semibold transition ${active ? "bg-[#113D33] text-white" : "bg-white text-[#113D33] border border-[#113D33]/15 hover:border-[#113D33]/40"}`;

  return (
    <div className="min-h-screen bg-[#F7F4E9] text-[#113D33] font-vance px-4 md:px-8 pt-28 pb-20">
      <HideFloatingWidgets />
      {days === 1 && to === today && <AutoRefresh seconds={120} />}
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#4A776D]">Private · first-party counts</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Sway site analytics</h1>
          <p className="text-sm text-[#113D33]/75">
            {r.range.from === r.range.to ? r.range.to : `${r.range.from} to ${r.range.to}`} (Mountain time)
            {loc ? ` · ${locName(loc)}` : " · all locations"}
            {page ? ` · clicks on ${page}` : ""}. Counted on Sway&apos;s own server, so ad blockers don&apos;t hide anything.
          </p>
          <div className="flex flex-wrap gap-2">
            {RANGES.map((x) => (
              <Link key={x.days} href={href({ days: x.days })} className={chip(x.days === days)}>
                {x.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {LOCS.map((l) => (
              <Link key={l || "all"} href={href({ loc: l })} className={chip(l === loc)}>
                {l ? locName(l) : "All locations"}
              </Link>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            ["Visitors", fmt(r.totals.visitors)],
            ["Page views", fmt(r.totals.views)],
            ["Clicks", fmt(r.totals.clicks)],
            ["Completed", fmt(r.totals.completions)],
            ["Online value", money(r.totals.completedValue)],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-white border border-[#113D33]/10 p-4">
              <p className="text-[11px] uppercase tracking-wider text-[#113D33]/75">{k}</p>
              <p className="text-2xl font-semibold mt-1 tabular-nums">{v}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#113D33]/75 -mt-3">
          Completed = bookings, memberships and leads written by the server after Mindbody confirmed (authoritative). Online value = memberships&apos; monthly price; booking value shows in each funnel.
        </p>

        {r.trend.length > 1 && (
          <Panel title="By day" note="Bar = unique visitors; numbers: visitors · views · completed">
            <div className="space-y-1">
              {r.trend.map((t) => (
                <div key={t.day} className="flex items-center gap-3 text-xs">
                  <span className="w-20 shrink-0 tabular-nums text-[#113D33]/75">{t.day.slice(5)}</span>
                  <div className="flex-1 h-3 rounded-full bg-[#113D33]/5 overflow-hidden">
                    <div className="h-full bg-[#4A776D]" style={{ width: `${(t.visitors / maxTrend) * 100}%` }} />
                  </div>
                  <span className="w-36 shrink-0 text-right tabular-nums">
                    {fmt(t.visitors)} · {fmt(t.views)} · <strong>{fmt(t.completions)}</strong>
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        )}

        <Panel
          title="Funnels"
          note="Unique visitors who reached each step (each browser once per day). 'Completed (server)' = confirmed by Mindbody; the gap to 'done' is blocked/failed reporting, not lost bookings."
        >
          {r.funnels.length === 0 && <p className="text-sm text-[#113D33]/75">No flow activity in this range yet.</p>}
          <div className="grid md:grid-cols-2 gap-5">
            {r.funnels.map((f) => {
              const first = f.steps[0]?.visitors || 0;
              return (
                <div key={f.flow} className="rounded-xl border border-[#113D33]/10 p-4">
                  <h3 className="font-semibold">{FLOW_NAMES[f.flow] ?? f.flow}</h3>
                  <Table
                    head={["Step", "Visitors", "of start", "from prev"]}
                    rows={[
                      ...f.steps.map((s, i) => [s.step, s.visitors, pct(s.visitors, first), i === 0 ? "" : pct(s.visitors, f.steps[i - 1].visitors)]),
                      ["Completed (server)", f.completed, pct(f.completed, first), ""],
                    ]}
                  />
                  {f.variants.length > 1 || (f.variants[0] && f.variants[0].variant !== "-") ? (
                    <details className="mt-3">
                      <summary className="text-sm font-semibold cursor-pointer">By option picked ({f.variants.length})</summary>
                      <div className="mt-2">
                        <Table
                          head={["Option", "Started", "Reached done", "Completed (server)"]}
                          rows={f.variants.map((v) => [variantLabel(v.variant), v.first, v.done, v.completed])}
                        />
                      </div>
                    </details>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Panel>

        <div className="grid md:grid-cols-2 gap-6">
          <Panel title="Where visitors came from" note="Landing visits (first page of a visit) by source / medium / campaign. Tag links with utm_* to split these further.">
            <Table head={["Source", "Medium", "Campaign", "Visits"]} rows={r.landings.slice(0, 40).map((x) => [x.source, x.medium, x.campaign, x.n])} />
          </Panel>
          <Panel title="Completed, by source" note="Last non-direct touch (else first) on each completed booking / membership / lead, from the sw_src cookies.">
            <Table
              head={["Flow", "Source", "Completed", "Value"]}
              rows={r.bySource.map((x) => [FLOW_NAMES[x.flow] ?? x.flow, x.source, x.n, x.value ? money(x.value) : ""])}
            />
          </Panel>
        </div>

        <Panel title="Top pages" note="Views and unique visitors. Tap a page to see every click on it.">
          <Table
            head={["Page", "Location", "Views", "Visitors"]}
            rows={r.pages.slice(0, 60).map((p) => [
              <Link key={p.page} className="underline underline-offset-2" href={href({ page: p.page })}>
                {p.page}
              </Link>,
              locName(p.location),
              p.views,
              p.visitors,
            ])}
          />
        </Panel>

        <Panel
          title={page ? `Clicks on ${page}` : "Clicks"}
          note="Every click on a link or button: type, where it goes, its label. Booking-flow buttons show '(private)' unless they're times/dates (they can show guest names)."
        >
          {page && (
            <p className="mb-3 text-sm">
              <Link className="underline underline-offset-2" href={href({ page: "" })}>
                Show clicks on all pages
              </Link>
            </p>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            {r.clickTypes.map((c) => (
              <span key={c.type} className="px-2.5 py-1 rounded-full bg-[#113D33]/5 text-xs font-semibold">
                {c.type} · {fmt(c.n)}
              </span>
            ))}
          </div>
          <Table
            head={page ? ["Type", "Goes to", "Label", "Clicks"] : ["Page", "Type", "Goes to", "Label", "Clicks"]}
            rows={r.clicks
              .slice(0, 150)
              .map((c) => (page ? [c.type, c.target, c.label, c.n] : [c.page, c.type, c.target, c.label, c.n]))}
          />
        </Panel>

        <Panel title="Messages guests saw" note="Errors and notices shown in the booking and membership flows.">
          <Table
            head={["Flow", "Location", "Step", "Message", "Times"]}
            rows={r.shown.slice(0, 60).map((s) => [FLOW_NAMES[s.flow] ?? s.flow, locName(s.location), s.step, s.message, s.n])}
            empty="None in this range."
          />
        </Panel>

        <Panel title="Recent completions" note="Newest first. No guest details are stored, only what was booked and where the guest came from.">
          <Table
            head={["When (MT)", "Flow", "Location", "What", "Value", "Source"]}
            rows={r.ledger.slice(0, 100).map((row) => [
              timeMT(row.at),
              FLOW_NAMES[row.flow] ?? row.flow,
              locName(row.location),
              row.label || itemLabel(row.flow, row.item || ""),
              typeof row.value === "number" ? money(row.value) : "",
              touch(row),
            ])}
          />
        </Panel>
      </div>
    </div>
  );
}
