// The dashboard's screen, laid out like the Spavia site monitor (spavia-website src/app/ops/Dashboard.tsx)
// in Sway's colors. Everything here is drawn from the report the page reads; nothing in this file
// talks to Redis or Mindbody.
import type { LedgerRow, OpsReport, OpsTrend } from "@/lib/ops/report";
import { FLOW_NAMES, LOCATION_NAMES, itemLabel, variantLabel } from "@/lib/ops/labels";
import OpsControls from "./OpsControls";

const STEP_NAMES: Record<string, Record<string, string>> = {
  service: {
    welcome: "Opened booking",
    category: "Massage or facial",
    treatment: "Treatment",
    boosts: "Boosts",
    time: "Time",
    account: "Email / account",
    name: "Name & phone",
    confirm: "Review",
    booking: "Tapped Book",
    done: "Booked",
  },
  aescape: { select: "Session", time: "Time", email: "Email", name: "Name & phone", card: "Card", confirm: "Review", booking: "Tapped Book", done: "Booked" },
  remedy_room: { select: "Opened booking", email: "Email", name: "Name & phone", card: "Card", confirm: "Review", booking: "Tapped Book", done: "Booked" },
  remedy_lounge: { select: "Opened booking", sauna: "Sauna add-on", email: "Email", name: "Name & phone", card: "Card", confirm: "Review", booking: "Tapped Book", done: "Booked" },
  membership: { email: "Email", code: "Email code", already: "Already a member (stopped)", details: "Details", confirm: "Review", done: "Joined" },
  maven: { session: "Session", time: "Time", email: "Email", card: "Card", confirm: "Review", booking: "Tapped Book", done: "Booked" },
};
// Screens only some guests see (saved email, members, optional add-ons); drawn quietly and left out of the drop-off
const SIDE_STEPS = new Set([
  "service:account",
  "service:name",
  "aescape:email",
  "aescape:name",
  "aescape:card",
  "remedy_room:email",
  "remedy_room:name",
  "remedy_room:card",
  "remedy_lounge:sauna",
  "remedy_lounge:email",
  "remedy_lounge:name",
  "remedy_lounge:card",
  "maven:email",
  "maven:card",
  "membership:code",
  "membership:already",
]);
const BOOKING_FLOWS = ["service", "aescape", "remedy_room", "remedy_lounge", "maven"];

const time = (iso: unknown) =>
  new Date(String(iso)).toLocaleTimeString("en-US", { timeZone: "America/Denver", hour: "numeric", minute: "2-digit", second: "2-digit" });
const mtDay = (iso: unknown) => new Date(String(iso)).toLocaleDateString("en-CA", { timeZone: "America/Denver" });
const shortTime = (iso: unknown) =>
  new Date(String(iso)).toLocaleTimeString("en-US", { timeZone: "America/Denver", hour: "numeric", minute: "2-digit" });
const prettyDay = (day: string, opts: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" }) =>
  new Date(`${day}T12:00:00Z`).toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });
const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const fmt = (n: number) => n.toLocaleString("en-US");
const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "–");
const locName = (l: string) => LOCATION_NAMES[l] ?? l;
const touch = (row: LedgerRow) => {
  const t = row.last ?? row.first;
  return t ? `${t.source} / ${t.medium}${t.campaign ? ` · ${t.campaign}` : ""}` : "direct / untagged";
};

const card = "rounded-2xl border border-[#e7e1d6] bg-white shadow-[0_1px_2px_rgba(36,40,35,0.04)]";
const th = "border-b border-[#ece7dd] px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a8478]";
const td = "border-b border-[#f1ede5] px-3 py-2 align-top text-sm";

function Panel({ title, note, children, right }: { title: string; note?: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <section className={`${card} p-5 sm:p-6`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-recoleta text-xl text-[#242823]">{title}</h2>
        {right}
      </div>
      {note && <p className="mt-1 text-sm text-[#7a756b]">{note}</p>}
      <div className="mt-4 overflow-x-auto">{children}</div>
    </section>
  );
}

/** A collapsed panel for detail you read now and then */
function Detail({ title, summary, children }: { title: string; summary?: string; children: React.ReactNode }) {
  return (
    <details className={`${card} group`}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 sm:px-6">
        <span>
          <span className="font-semibold text-[#242823]">{title}</span>
          {summary && <span className="ml-2 text-sm text-[#7a756b]">{summary}</span>}
        </span>
        <span aria-hidden="true" className="text-[#b38a5f] transition-transform group-open:rotate-90">›</span>
      </summary>
      <div className="overflow-x-auto px-5 pb-5 sm:px-6">{children}</div>
    </details>
  );
}

type FunnelRow = { label: string; n: number; side?: boolean; done?: boolean };

/** One funnel card: bars against the widest step, drop-off from the previous main step, side screens quiet. */
function FunnelCard({
  title,
  note,
  rows,
  confirmed,
  finish,
  finishLabel = "finish",
  children,
}: {
  title: string;
  note?: string;
  rows: FunnelRow[];
  confirmed?: { n: number; value: number };
  finish: string;
  finishLabel?: string;
  children?: React.ReactNode;
}) {
  const top = Math.max(0, ...rows.map((x) => x.n));
  let prev: number | undefined;
  return (
    <section className={`${card} p-5`}>
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="font-recoleta text-lg">{title}</h2>
        <span className="text-sm tabular-nums text-[#7a756b]">{top ? `${finish} ${finishLabel}` : "no visits"}</span>
      </div>
      {note && <p className="text-xs text-[#7a756b]">{note}</p>}
      <ul className="mt-4 space-y-2">
        {rows.map((x) => {
          const lost = !x.side && prev !== undefined && prev > x.n ? prev - x.n : 0;
          if (!x.side) prev = x.n;
          return (
            <li key={x.label} className={x.side ? "pl-4" : ""}>
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className={x.side ? "text-xs italic text-[#7a756b]" : ""}>{x.label}</span>
                <span className="tabular-nums">
                  {lost > 0 && <span className="mr-2 text-xs text-[#b4532a]">−{fmt(lost)}</span>}
                  <span className="font-semibold">{fmt(x.n)}</span>
                </span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-[#f0ebe2]">
                <div
                  className={`h-1.5 rounded-full ${x.side ? "bg-[#cfc6b6]" : x.done ? "bg-emerald-500" : "bg-[#b38a5f]"}`}
                  style={{ width: `${top ? (x.n / top) * 100 : 0}%` }}
                />
              </div>
            </li>
          );
        })}
        {confirmed && (
          <li>
            <div className="flex items-baseline justify-between gap-2 border-t border-[#ece7dd] pt-2 text-sm">
              <span className="font-semibold">Confirmed by Mindbody</span>
              <span className="tabular-nums">
                {confirmed.value > 0 && <span className="mr-2 text-xs text-[#7a756b]">{money(confirmed.value)}</span>}
                <span className="font-semibold text-[#1f5c35]">{fmt(confirmed.n)}</span>
              </span>
            </div>
          </li>
        )}
      </ul>
      {children}
    </section>
  );
}

function Options({ variants, verb }: { variants: { variant: string; first: number; done: number; completed: number }[]; verb: string }) {
  return (
    <details className="mt-4">
      <summary className="cursor-pointer text-sm font-semibold text-[#b38a5f]">By option picked ({variants.length})</summary>
      <ul className="mt-2 space-y-1 text-sm">
        {variants.map((v) => (
          <li key={v.variant} className="flex items-baseline justify-between gap-3">
            <span className="min-w-0 truncate">{variantLabel(v.variant)}</span>
            <span className="shrink-0 tabular-nums text-[#7a756b]">
              {v.first} started · {v.done} done · <strong className="text-[#242823]">{v.completed}</strong> {verb}
            </span>
          </li>
        ))}
      </ul>
    </details>
  );
}

function Empty({ children = "None." }: { children?: React.ReactNode }) {
  return <p className="text-sm text-[#7a756b]">{children}</p>;
}

function Table({ head, rows, empty }: { head: string[]; rows: React.ReactNode[][]; empty?: string }) {
  if (!rows.length) return <Empty>{empty}</Empty>;
  return (
    <table className="w-full">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h} className={th}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} className={`${td} ${typeof c === "number" ? "tabular-nums" : "break-words"}`}>
                {typeof c === "number" ? fmt(c) : c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Dashboard({
  report: r,
  trend,
  day,
  today,
  days,
  loc,
  page,
  ranges,
  locs,
}: {
  report: OpsReport;
  trend: OpsTrend;
  day: string;
  today: string;
  days: number;
  loc: string;
  page: string;
  ranges: { days: number; label: string }[];
  locs: { slug: string; name: string }[];
}) {
  const link = (params: Record<string, string>) => {
    const q = new URLSearchParams(
      Object.entries({ to: day === today ? "" : day, days: days === 1 ? "" : String(days), loc, page, ...params }).filter(([, v]) => v)
    ).toString();
    return `/ops/${q ? `?${q}` : ""}`;
  };
  const isLive = day === today && days === 1;
  const flow = (f: string) => r.funnels.find((x) => x.flow === f);
  const completedOf = (fs: string[]) => r.completions.filter((c) => fs.includes(c.flow)).reduce((n, c) => n + c.n, 0);
  const bookings = completedOf(BOOKING_FLOWS);
  const memberships = completedOf(["membership"]);
  const leads = completedOf(["lead"]);
  const gifts = completedOf(["gift"]);
  // Completed value per flow, from the ledger's attribution rows (membership = monthly price, gift = amount paid)
  const valueOf = (f: string) => r.bySource.filter((x) => x.flow === f).reduce((n, x) => n + x.value, 0);
  const giftStep = (step: string) => flow("gift")?.steps.find((s) => s.step === step)?.visitors || 0;
  const started = BOOKING_FLOWS.reduce((n, f) => n + (flow(f)?.steps[0]?.visitors || 0), 0);
  const bookedValue = BOOKING_FLOWS.reduce((n, f) => n + (flow(f)?.bookedValue || 0), 0);
  const messages = r.shown.reduce((n, s) => n + s.n, 0);
  const stageOf = (step: string) => BOOKING_FLOWS.reduce((n, f) => n + (flow(f)?.steps.find((s) => s.step === step)?.visitors || 0), 0);
  const memberStep = (step: string) => flow("membership")?.steps.find((s) => s.step === step)?.visitors || 0;
  // Page visitors are unique per page; a guest who opens two of these pages counts twice
  const membershipPageVisitors = r.pages.filter((p) => /\/membership\/$/.test(p.page)).reduce((n, p) => n + p.visitors, 0);
  const giftPageVisitors = r.pages.filter((p) => /gift-cards\/$/.test(p.page)).reduce((n, p) => n + p.visitors, 0);
  const giftTaps = r.clickTypes.find((c) => c.type === "gift_card_purchase")?.n || 0;
  const treatmentFlows = r.funnels.filter((f) => BOOKING_FLOWS.includes(f.flow) && f.steps.length);
  const notConfirmed = BOOKING_FLOWS.reduce((n, f) => {
    const x = flow(f);
    const tapped = x?.steps.find((s) => s.step === "booking")?.visitors || 0;
    return n + Math.max(0, tapped - (x?.completed || 0));
  }, 0);

  // The 14-day bars: completed bookings by height, the day's numbers on hover, each one opens its day
  const peak = Math.max(1, ...trend.map((t) => t.bookings));
  const yesterday = trend.length > 1 ? trend[trend.length - 2] : undefined;
  const topValue = Math.max(1, ...r.byLocation.map((x) => x.bookedValue));
  const rangeLabel = days === 1 ? prettyDay(day) : `${prettyDay(r.range.from, { month: "short", day: "numeric" })} – ${prettyDay(day, { month: "short", day: "numeric" })}`;
  const when = days === 1 ? (day === today ? "today" : "that day") : `these ${days} days`;

  return (
    <div className="ops-monitor min-h-screen bg-[#f4f1ea] pb-16 text-[#242823]">
      {/* ===== Header: status, pickers, the 14-day bars ===== */}
      <div className="bg-[#1d201c] pt-14 text-white">
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-8 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d4b48c]">
                {isLive ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Live · updated {time(new Date().toISOString())} MT
                  </>
                ) : (
                  <>{days === 1 ? "Past day" : `${days} days`} · read {time(new Date().toISOString())} MT</>
                )}
              </p>
              <h1 className="mt-2 font-recoleta text-3xl sm:text-4xl">{rangeLabel}</h1>
              <p className="mt-1 text-sm text-white/60">
                Site monitor ·{" "}
                {loc ? (
                  <>
                    showing <span className="text-white">{loc}</span> ·{" "}
                    <a className="underline decoration-white/30 underline-offset-2 hover:text-white" href={link({ loc: "" })}>
                      all spas
                    </a>
                  </>
                ) : (
                  "all spas"
                )}
                {page ? (
                  <>
                    {" "}· clicks on <span className="text-white">{page}</span>
                  </>
                ) : null}
              </p>
            </div>
            <OpsControls day={day} today={today} days={days} loc={loc} ranges={ranges} locs={locs} />
          </div>

          <div className="mt-8">
            <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.2em] text-white/45">
              <span>Bookings, last 14 days</span>
              <span className="hidden sm:inline">Tap a day to open it</span>
            </div>
            <ol className="mt-3 grid h-36 items-end gap-1.5 sm:gap-2" style={{ gridTemplateColumns: `repeat(${trend.length}, minmax(0, 1fr))` }}>
              {trend.map((t) => {
                const selected = t.day === day && days === 1;
                return (
                  <li key={t.day} className="flex h-full flex-col justify-end">
                    <a
                      href={link({ to: t.day === today ? "" : t.day, days: "" })}
                      title={`${prettyDay(t.day, { weekday: "short", month: "short", day: "numeric" })}: ${t.bookings} bookings · ${money(t.bookedValue)} booked · ${t.memberships} memberships · ${t.leads} leads`}
                      aria-current={selected ? "date" : undefined}
                      className="group flex h-full flex-col items-center justify-end gap-1"
                    >
                      <span className={`text-[10px] tabular-nums ${selected ? "text-white" : "text-white/0 group-hover:text-white/70"}`}>{t.bookings}</span>
                      <span
                        className={`w-full rounded-t-md transition-colors ${selected ? "bg-[#d4b48c]" : t.bookings ? "bg-white/25 group-hover:bg-white/45" : "bg-white/10"}`}
                        style={{ height: `${Math.max(4, (t.bookings / peak) * 100)}%` }}
                      />
                    </a>
                  </li>
                );
              })}
            </ol>
            <ol className="mt-2 grid gap-1.5 sm:gap-2" style={{ gridTemplateColumns: `repeat(${trend.length}, minmax(0, 1fr))` }}>
              {trend.map((t) => (
                <li key={t.day} className={`text-center text-[10px] leading-tight ${t.day === day && days === 1 ? "font-semibold text-[#d4b48c]" : "text-white/45"}`}>
                  <span className="block">{prettyDay(t.day, { weekday: "narrow" })}</span>
                  <span className="block tabular-nums">{Number(t.day.slice(8))}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6">
        {/* ===== Health ===== */}
        <div
          className={`-mt-px flex flex-wrap items-center gap-x-6 gap-y-2 rounded-b-2xl px-5 py-3 text-sm ${
            notConfirmed ? "bg-[#fbe9e4] text-[#8a2b17]" : "bg-[#e5f2e9] text-[#1f5c35]"
          }`}
        >
          <span className="font-semibold">{notConfirmed ? "Needs a look" : "All clear"}</span>
          <span>{notConfirmed} tapped Book but not confirmed</span>
          <span>{messages} messages guests saw</span>
          <span>{fmt(r.totals.visitors)} visitors</span>
          <span>{fmt(r.totals.views)} page views</span>
          <span>{fmt(r.totals.clicks)} clicks</span>
        </div>

        {/* ===== The day in numbers ===== */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          {[
            {
              label: "Bookings",
              value: String(bookings),
              sub: `${money(bookedValue)} booked`,
              trend: yesterday && isLive ? `${yesterday.bookings} yesterday` : "",
            },
            { label: "Gift cards", value: String(gifts), sub: gifts ? money(valueOf("gift")) : "bought on the site" },
            { label: "Memberships", value: String(memberships), sub: memberships ? `${money(valueOf("membership"))}/mo` : "joined online" },
            {
              label: "Booking conversion",
              value: pct(bookings, started),
              sub: `${bookings} of ${fmt(started)} who opened booking`,
            },
            { label: "Leads", value: String(leads), sub: "enter-to-win, waitlist, founding" },
          ].map((k) => (
            <div key={k.label} className={`${card} p-4 sm:p-5`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7a756b]">{k.label}</p>
              <p className="mt-2 font-recoleta text-4xl tabular-nums leading-none">{k.value}</p>
              <p className="mt-2 text-xs text-[#7a756b]">{k.sub}</p>
              {k.trend && <p className="text-xs text-[#7a756b]">{k.trend}</p>}
            </div>
          ))}
        </div>

        {/* ===== The three funnels (as on the Spavia monitor) ===== */}
        <div className="grid gap-6 lg:grid-cols-3">
          <FunnelCard
            title="Booking"
            note="All treatments together"
            rows={[
              { label: "Opened booking", n: started },
              { label: "Review", n: stageOf("confirm") },
              { label: "Tapped Book", n: stageOf("booking") },
              { label: "Booked", n: stageOf("done"), done: true },
            ]}
            confirmed={{ n: bookings, value: bookedValue }}
            finish={pct(bookings, started)}
          />
          <FunnelCard
            title="Membership join"
            rows={[
              { label: "Viewed a membership page", n: membershipPageVisitors },
              { label: "Opened join checkout", n: memberStep("email") },
              { label: "Email code", n: memberStep("code"), side: true },
              { label: "Already a member (stopped)", n: memberStep("already"), side: true },
              { label: "Details", n: memberStep("details") },
              { label: "Review", n: memberStep("confirm") },
              { label: "Joined", n: memberStep("done"), done: true },
            ]}
            confirmed={{ n: memberships, value: valueOf("membership") }}
            finish={pct(memberships, memberStep("email"))}
          >
            {(flow("membership")?.variants.length || 0) > 0 && (
              <Options variants={flow("membership")!.variants} verb="joined" />
            )}
          </FunnelCard>
          <FunnelCard
            title="Gift card checkout"
            rows={[
              { label: "Viewed a gift card page", n: giftPageVisitors },
              { label: "Opened checkout", n: giftStep("gift") },
              { label: "Personalized", n: giftStep("delivery") },
              { label: "Verified email", n: Math.max(giftStep("profiles") + giftStep("profile"), giftStep("payment")) },
              { label: "New guest account", n: giftStep("profile"), side: true },
              { label: "Review", n: giftStep("review") },
              { label: "Purchased", n: giftStep("done"), done: true },
              { label: "Tapped Buy on Mindbody instead", n: giftTaps, side: true },
            ]}
            confirmed={{ n: gifts, value: valueOf("gift") }}
            finish={pct(gifts, giftStep("gift"))}
          >
            <p className="mt-4 text-xs text-[#7a756b]">Mindbody taps are clicks, not unique guests; sales made on Mindbody&apos;s page aren&apos;t counted here.</p>
          </FunnelCard>
        </div>

        {/* ===== Each treatment's own funnel ===== */}
        <div className="space-y-3">
          <p className="pt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7a756b]">Booking by treatment</p>
          {treatmentFlows.length === 0 ? (
            <Panel title="No bookings started">
              <Empty>No booking activity {when} yet.</Empty>
            </Panel>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {treatmentFlows.map((f) => (
                <FunnelCard
                  key={f.flow}
                  title={FLOW_NAMES[f.flow] ?? f.flow}
                  rows={f.steps.map((s) => ({
                    label: STEP_NAMES[f.flow]?.[s.step] || s.step,
                    n: s.visitors,
                    side: SIDE_STEPS.has(`${f.flow}:${s.step}`),
                    done: s.step === "done",
                  }))}
                  confirmed={{ n: f.completed, value: f.bookedValue }}
                  finish={pct(f.completed, f.steps.find((s) => !SIDE_STEPS.has(`${f.flow}:${s.step}`))?.visitors || 0)}
                >
                  {f.variants.length > 1 || (f.variants[0] && f.variants[0].variant !== "-") ? <Options variants={f.variants} verb="booked" /> : null}
                </FunnelCard>
              ))}
            </div>
          )}
        </div>

        {/* ===== Spas ===== */}
        <Panel title={`Spas ${days === 1 && day === today ? "today" : days === 1 ? "that day" : `· ${days} days`}`} note="Completed bookings, gift cards, memberships and leads, by value. Tap a spa to see only its activity.">
          {r.byLocation.length ? (
            <ul className="grid gap-x-10 gap-y-2 md:grid-cols-2">
              {r.byLocation.map((x, i) => (
                <li key={x.location} className="grid grid-cols-[1.5rem_1fr_auto] items-center gap-3 text-sm">
                  <span className="text-right text-xs tabular-nums text-[#7a756b]">{i + 1}</span>
                  <span className="min-w-0">
                    <a href={link({ loc: x.location })} className="block truncate hover:underline">{x.location}</a>
                    <span className="mt-1 block h-1 rounded-full bg-[#f0ebe2]">
                      <span className="block h-1 rounded-full bg-[#b38a5f]" style={{ width: `${(x.bookedValue / topValue) * 100}%` }} />
                    </span>
                  </span>
                  <span className="whitespace-nowrap text-right tabular-nums">
                    <span className="font-semibold">{money(x.bookedValue)}</span>
                    <span className="ml-2 text-xs text-[#7a756b]">
                      {[x.bookings && `${x.bookings} bk`, x.gifts && `${x.gifts} gift`, x.memberships && `${x.memberships} mem`, x.leads && `${x.leads} lead${x.leads === 1 ? "" : "s"}`]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>None yet.</Empty>
          )}
        </Panel>

        {/* ===== Sources ===== */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Where visitors came from" note="First page of each visit, by source / medium / campaign.">
            <Table
              head={["Source", "Medium", "Campaign", "Visits"]}
              rows={r.landings.slice(0, 25).map((x) => [x.source, x.medium, x.campaign, x.n])}
              empty="No visits yet."
            />
          </Panel>
          <Panel title="Completed, by source" note="Last non-direct touch (else first) on each completed booking, membership and lead.">
            <Table
              head={["Flow", "Source", "Completed", "Value"]}
              rows={r.bySource.map((x) => [FLOW_NAMES[x.flow] ?? x.flow, x.source, x.n, x.value ? money(x.value) : ""])}
              empty="None yet."
            />
          </Panel>
        </div>

        {/* ===== Messages guests saw ===== */}
        <Panel title="Messages guests saw" note="Errors and notices shown in the booking and membership flows, by flow and step.">
          {r.shown.length ? (
            <ul className="divide-y divide-[#f1ede5]">
              {r.shown.slice(0, 40).map((e, i) => (
                <li key={i} className="flex gap-4 py-2 text-sm">
                  <span className="w-8 shrink-0 text-right font-semibold tabular-nums">{e.n}</span>
                  <span className="w-48 shrink-0 text-[#7a756b]">
                    {FLOW_NAMES[e.flow] ?? e.flow} · {STEP_NAMES[e.flow]?.[e.step] || e.step}
                    {!loc && e.location ? ` · ${locName(e.location)}` : ""}
                  </span>
                  <span>{e.message}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty />
          )}
        </Panel>

        {/* ===== Detail, folded ===== */}
        <div className="space-y-3">
          <p className="pt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7a756b]">Detail</p>

          <Detail title="Recent completions" summary={`${r.ledger.length} · what was booked and where the guest came from`}>
            <Table
              head={["When (MT)", "Flow", "Location", "What", "Value", "Source"]}
              rows={r.ledger.slice(0, 150).map((row) => [
                <span key="t" className="whitespace-nowrap tabular-nums">{mtDay(row.at).slice(5)} {shortTime(row.at)}</span>,
                FLOW_NAMES[row.flow] ?? row.flow,
                locName(row.location),
                row.label || itemLabel(row.flow, row.item || ""),
                typeof row.value === "number" ? money(row.value) : "",
                touch(row),
              ])}
              empty="None yet."
            />
          </Detail>

          <Detail title="Top pages" summary={`${r.pages.length} pages · tap one to see every click on it`}>
            <Table
              head={["Page", "Location", "Views", "Visitors"]}
              rows={r.pages.slice(0, 80).map((p) => [
                <a key={p.page} className="underline decoration-[#d4b48c] underline-offset-2" href={link({ page: p.page })}>
                  {p.page}
                </a>,
                locName(p.location),
                p.views,
                p.visitors,
              ])}
              empty="No views yet."
            />
          </Detail>

          <Detail title={page ? `Clicks on ${page}` : "Clicks"} summary={`${fmt(r.totals.clicks)} · every link and button, with where it goes`}>
            {page && (
              <p className="mb-3 text-sm">
                <a className="underline underline-offset-2" href={link({ page: "" })}>Show clicks on all pages</a>
              </p>
            )}
            <div className="mb-4 flex flex-wrap gap-2">
              {r.clickTypes.map((c) => (
                <span key={c.type} className="rounded-full bg-[#f7f3ec] px-2.5 py-1 text-xs font-semibold">
                  {c.type} · {fmt(c.n)}
                </span>
              ))}
            </div>
            <p className="mb-3 text-sm text-[#7a756b]">Booking-flow buttons show &quot;(private)&quot; unless they&apos;re times or dates (they can show guest names).</p>
            <Table
              head={page ? ["Type", "Goes to", "Label", "Clicks"] : ["Page", "Type", "Goes to", "Label", "Clicks"]}
              rows={r.clicks.slice(0, 200).map((c) => (page ? [c.type, c.target, c.label, c.n] : [c.page, c.type, c.target, c.label, c.n]))}
              empty="No clicks yet."
            />
          </Detail>

          <Detail title="Landing pages" summary="the first page of each visit">
            <Table head={["Page", "Visits"]} rows={r.landingPages.slice(0, 60).map((x) => [x.page, x.n])} empty="No visits yet." />
          </Detail>
        </div>
      </div>
    </div>
  );
}
