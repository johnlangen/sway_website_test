"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SwayCurve } from "../../../components/SwayCurve";

/* Dallas Launch Board — owner-facing lead dashboard, secret-link access
   (?key=DALLAS_DASHBOARD_SECRET). Reads /api/dallas-dashboard.

   Deliberately shows NO contact info: outreach runs through the pre-opening
   campaign, not ad-hoc from here. The API sends a hashed email key for
   dedup only.

   Assumptions surfaced in the UI so projections read as projections:
   - FOUNDING_PRICE: assumed founding rate (Dallas pricing not announced)
   - REALISTIC_RATE: lead-to-member conversion used for the middle number
   - default goal 50 founding leads; override with &goal=100              */

const FOUNDING_PRICE = 99;
const REALISTIC_RATE = 0.3;
const DEFAULT_GOAL = 50;

const MILESTONES = [
  { at: 10, label: "First 10", emoji: "🌱" },
  { at: 25, label: "25 Strong", emoji: "🔥" },
  { at: 50, label: "Halfway Hero", emoji: "⭐" },
  { at: 100, label: "Century Club", emoji: "🏆" },
];

type Lead = {
  firstName: string;
  lastName: string;
  emailKey: string | null;
  hasPhone: boolean;
  source: string;
  createdAt: string | null;
  viaInstagram: boolean;
  utmCampaign: string | null;
  utmSource: string | null;
  referrerHost: string | null;
};

const SOURCE_FILTERS = [
  { key: "all", label: "All sources" },
  { key: "founding-membership", label: "Founding page" },
  { key: "location-page", label: "Location page" },
  { key: "contest", label: "Contest" },
] as const;

const SOURCE_LABELS: Record<string, string> = {
  "founding-membership": "Founding page",
  "location-page": "Location page",
  "enter-to-win": "Contest",
  "enter-to-win+ig": "Contest +IG",
};

function matchesFilter(l: Lead, filter: string) {
  if (filter === "all") return true;
  if (filter === "contest") return l.source.startsWith("enter-to-win");
  return l.source === filter;
}

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function DallasLaunchBoard() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [goal, setGoal] = useState(DEFAULT_GOAL);
  const [filter, setFilter] = useState<string>("all");
  const [campaignName, setCampaignName] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const g = parseInt(params.get("goal") || "", 10);
    if (g > 0) setGoal(g);
    if (!key) {
      setError("missing-key");
      return;
    }
    fetch(`/api/dallas-dashboard?key=${encodeURIComponent(key)}`)
      .then((r) => {
        if (r.status === 401) throw new Error("bad-key");
        if (!r.ok) throw new Error("fetch-failed");
        return r.json();
      })
      .then((d) => setLeads(d.entries ?? []))
      .catch((e) => setError(e.message));
  }, []);

  const stats = useMemo(() => {
    if (!leads) return null;
    // Dedup by hashed email so repeat submitters count once
    const seen = new Set<string>();
    const unique = leads.filter((l) => {
      const k = (l.emailKey || `${l.firstName}-${l.lastName}`).toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    const founding = unique.filter((l) => l.source === "founding-membership");
    const now = Date.now();
    const weekMs = 7 * 24 * 3600 * 1000;
    const thisWeek = unique.filter(
      (l) => l.createdAt && now - new Date(l.createdAt).getTime() < weekMs
    );
    const withUA = leads.filter(
      (l) => l.createdAt && new Date(l.createdAt) >= new Date("2026-05-20")
    );
    const igShare = withUA.length
      ? Math.round((withUA.filter((l) => l.viaInstagram).length / withUA.length) * 100)
      : 0;

    const filtered = unique.filter((l) => matchesFilter(l, filter));

    // Weekly buckets over the FILTERED list, last 8 weeks (oldest → newest)
    const weeks: { label: string; count: number }[] = [];
    for (let i = 7; i >= 0; i--) {
      const start = now - (i + 1) * weekMs;
      const end = now - i * weekMs;
      const count = filtered.filter((l) => {
        if (!l.createdAt) return false;
        const t = new Date(l.createdAt).getTime();
        return t >= start && t < end;
      }).length;
      const d = new Date(end);
      weeks.push({
        label: d.toLocaleDateString("en-US", { month: "numeric", day: "numeric" }),
        count,
      });
    }
    const maxWeek = Math.max(1, ...weeks.map((w) => w.count));

    const campaigns: Record<string, number> = {};
    for (const l of unique) {
      if (l.utmCampaign) campaigns[l.utmCampaign] = (campaigns[l.utmCampaign] || 0) + 1;
    }

    return { unique, founding, thisWeek, igShare, filtered, weeks, maxWeek, campaigns };
  }, [leads, filter]);

  /* ---------- locked / loading states ---------- */
  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F4E9] text-[#113D33] font-vance flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <SwayCurve width={120} strokeWidth={2.2} className="text-[#4A776D] mx-auto mb-5" />
          <h1 className="text-2xl font-semibold mb-2">Dallas Launch Board</h1>
          <p className="text-sm text-[#113D33]/70">
            {error === "missing-key" || error === "bad-key"
              ? "This dashboard needs its access link. Check with John for the full URL."
              : "Couldn't load leads right now. Refresh to try again."}
          </p>
        </div>
      </div>
    );
  }
  if (!stats) {
    return <div className="min-h-screen bg-[#F7F4E9]" />;
  }

  const { unique, founding, thisWeek, igShare, filtered, weeks, maxWeek, campaigns } = stats;
  const foundingCount = founding.length;
  const pct = Math.min(100, Math.round((foundingCount / goal) * 100));
  const mrrAll = foundingCount * FOUNDING_PRICE;
  const mrrRealistic = Math.round(foundingCount * REALISTIC_RATE) * FOUNDING_PRICE;
  const mrrGoal = Math.round(goal * REALISTIC_RATE) * FOUNDING_PRICE;

  const bigStats = [
    { label: "Total leads", value: unique.length },
    { label: "Founding interest", value: foundingCount },
    { label: "New this week", value: thisWeek.length },
    { label: "Via Instagram", value: `${igShare}%`, sub: "since May 20" },
  ];

  const utmLink = campaignName.trim()
    ? `https://swaywellnessspa.com/locations/dallas/founding-membership?utm_source=staci&utm_medium=qr&utm_campaign=${encodeURIComponent(
        campaignName.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
      )}`
    : "";

  return (
    <div className="min-h-screen bg-[#F7F4E9] text-[#113D33] font-vance pb-20">
      {/* HEADER */}
      <section className="px-6 pt-24 md:pt-32 pb-8 text-center max-w-4xl mx-auto">
        <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#4A776D] mb-3">
          Sway Dallas &middot; Founding Team
        </p>
        <SwayCurve width={140} strokeWidth={2.2} animate className="text-[#4A776D] mx-auto block mb-5" />
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3">
          Dallas Launch Board
        </h1>
        <p className="text-sm md:text-base text-[#113D33]/70 max-w-md mx-auto">
          Every person below raised their hand for Sway Dallas. Live from the
          website — refresh anytime.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* BIG STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {bigStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="rounded-2xl bg-white shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)] p-5 text-center"
            >
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="text-xs uppercase tracking-wide text-[#4A776D] mt-1">{s.label}</div>
              {s.sub && <div className="text-[10px] text-[#113D33]/45 mt-0.5">{s.sub}</div>}
            </motion.div>
          ))}
        </div>

        {/* GOAL PROGRESS — interest list, not memberships */}
        <div className="rounded-2xl bg-white shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)] p-6">
          <div className="flex items-baseline justify-between mb-1">
            <h2 className="text-lg font-semibold">Founding interest list</h2>
            <span className="text-sm text-[#113D33]/60">
              {foundingCount} of {goal} leads
            </span>
          </div>
          <p className="text-xs text-[#113D33]/55 mb-3">
            People who raised their hand on the founding page — not paying
            members yet. Memberships get sold closer to opening.
          </p>
          <div className="h-4 rounded-full bg-[#113D33]/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="h-full rounded-full bg-[#4A776D]"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {MILESTONES.map((m) => {
              const hit = foundingCount >= m.at;
              return (
                <span
                  key={m.at}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    hit
                      ? "bg-[#113D33] text-white"
                      : "bg-[#113D33]/[0.06] text-[#113D33]/45"
                  }`}
                >
                  <span>{m.emoji}</span>
                  {m.label}
                  {!hit && <span className="font-normal">· {m.at - foundingCount} to go</span>}
                </span>
              );
            })}
          </div>
        </div>

        {/* REVENUE PROJECTIONS */}
        <div className="rounded-2xl bg-[#113D33] text-white p-6">
          <h2 className="text-lg font-semibold mb-1">What this list could be worth</h2>
          <p className="text-xs text-white/60 mb-5">
            Projections, not bookings — assumes a {money(FOUNDING_PRICE)}/mo founding
            rate (Dallas pricing TBD) and that {Math.round(REALISTIC_RATE * 100)}% of
            interest converts when doors open.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold">{money(mrrRealistic)}<span className="text-sm font-normal text-white/60">/mo</span></div>
              <div className="text-xs text-white/70 mt-1">
                Today&apos;s list, realistic ({Math.round(REALISTIC_RATE * 100)}% join)
              </div>
              <div className="text-[11px] text-white/50">{money(mrrRealistic * 12)}/year</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{money(mrrAll)}<span className="text-sm font-normal text-white/60">/mo</span></div>
              <div className="text-xs text-white/70 mt-1">Today&apos;s list, best case (all join)</div>
              <div className="text-[11px] text-white/50">{money(mrrAll * 12)}/year</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{money(mrrGoal)}<span className="text-sm font-normal text-white/60">/mo</span></div>
              <div className="text-xs text-white/70 mt-1">
                At {goal} leads, realistic ({Math.round(REALISTIC_RATE * 100)}% join)
              </div>
              <div className="text-[11px] text-white/50">{money(mrrGoal * 12)}/year</div>
            </div>
          </div>
        </div>

        {/* SOURCE FILTER — drives the chart + feed below */}
        <div className="flex flex-wrap gap-2">
          {SOURCE_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                filter === f.key
                  ? "bg-[#113D33] text-white shadow-sm"
                  : "bg-white text-[#113D33]/70 shadow-sm hover:text-[#113D33]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* MOMENTUM (filtered) */}
        <div className="rounded-2xl bg-white shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)] p-6">
          <h2 className="text-lg font-semibold mb-4">
            Momentum · last 8 weeks
            {filter !== "all" && (
              <span className="text-sm font-normal text-[#113D33]/55">
                {" "}· {SOURCE_FILTERS.find((f) => f.key === filter)?.label}
              </span>
            )}
          </h2>
          <div className="flex items-end gap-2 h-28">
            {weeks.map((w, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[11px] font-semibold text-[#113D33]/70">
                  {w.count > 0 ? w.count : ""}
                </span>
                <div
                  className="w-full rounded-t-md bg-[#4A776D]/80"
                  style={{ height: `${Math.max(4, (w.count / maxWeek) * 80)}px` }}
                />
                <span className="text-[9px] text-[#113D33]/45">{w.label}</span>
              </div>
            ))}
          </div>
          {Object.keys(campaigns).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(campaigns)
                .sort((a, b) => b[1] - a[1])
                .map(([c, n]) => (
                  <span key={c} className="rounded-full bg-[#4A776D]/10 px-3 py-1.5 text-xs text-[#113D33]/75">
                    📣 {c}: <span className="font-semibold">{n}</span>
                  </span>
                ))}
            </div>
          )}
        </div>

        {/* LEAD FEED (filtered, no contact info) */}
        <div className="rounded-2xl bg-white shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)] p-6">
          <h2 className="text-lg font-semibold mb-2">The people ({filtered.length})</h2>
          <div className="rounded-xl bg-[#4A776D]/[0.08] px-4 py-3 mb-4 text-xs leading-relaxed text-[#113D33]/75">
            <span className="font-semibold text-[#113D33]">What happens with this list:</span>{" "}
            everyone here is queued for the Dallas pre-opening campaign — opening
            updates and the founding offer go out by email and text before doors
            open. No need to reach out one-by-one. Want a VIP added or a copy of
            the full list? Email contact@swaywellnessspa.com.
          </div>
          <div className="divide-y divide-[#113D33]/[0.07]">
            {filtered.map((l, i) => (
              <div key={i} className="py-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-semibold text-sm min-w-[140px]">
                  {l.firstName} {l.lastName}
                </span>
                <span className="rounded-full bg-[#113D33]/[0.06] px-2.5 py-0.5 text-[11px] text-[#113D33]/70">
                  {SOURCE_LABELS[l.source] ?? l.source}
                </span>
                {l.viaInstagram && (
                  <span className="rounded-full bg-[#E1306C]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#C13584]">
                    via Instagram
                  </span>
                )}
                {l.utmCampaign && (
                  <span className="rounded-full bg-[#4A776D]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#4A776D]">
                    📣 {l.utmCampaign}
                  </span>
                )}
                {l.hasPhone && (
                  <span className="text-[11px] text-[#113D33]/45">📱 on the text list</span>
                )}
                <span className="text-xs text-[#113D33]/50 ml-auto">
                  {l.createdAt
                    ? new Date(l.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </span>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="py-6 text-center text-sm text-[#113D33]/50">
                No leads from this source yet — that&apos;s the next milestone.
              </p>
            )}
          </div>
        </div>

        {/* PROMOTE & TRACK — self-serve UTM links for events / QR codes */}
        <div className="rounded-2xl bg-white shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)] p-6">
          <h2 className="text-lg font-semibold mb-1">Promote &amp; track</h2>
          <p className="text-xs text-[#113D33]/60 mb-4 leading-relaxed">
            Doing a market, event, or flyer? Name it below, copy the link, and
            paste it into any QR code generator. Everyone who scans and signs up
            shows up on this board tagged with your event name — so you can see
            exactly what each event produced.
          </p>
          <input
            value={campaignName}
            onChange={(e) => {
              setCampaignName(e.target.value);
              setCopied(false);
            }}
            placeholder="Event name — e.g. Klyde Warren Park July"
            className="w-full rounded-xl border border-[#113D33]/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#113D33]/25"
          />
          {utmLink && (
            <div className="mt-3">
              <div className="rounded-xl bg-[#113D33]/[0.05] px-4 py-3 text-xs break-all text-[#113D33]/80">
                {utmLink}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(utmLink).then(() => setCopied(true));
                }}
                className="mt-3 rounded-full bg-[#113D33] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#0c2a23] transition"
              >
                {copied ? "Copied ✓" : "Copy link"}
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-[11px] text-[#113D33]/45">
          Private link — don&apos;t share outside the Dallas team. Questions:
          contact@swaywellnessspa.com
        </p>
      </div>
    </div>
  );
}
