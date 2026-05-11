"use client";

import { useEffect, useState } from "react";

/* ---------------------------------------------
   DATA — kept inline so dashboard is self-contained
--------------------------------------------- */

const KEY_DATES = {
  today: "2026-05-11",
  announce: "2026-05-15",
  launch: "2026-06-01",
};

const SEGMENTS = [
  { name: "Active members (transactional)", csv: "01-members-transactional.csv", count: 159, useFor: "Membership-affecting emails", optIn: "No (transactional)" },
  { name: "All marketing-opted-in", csv: "02-announce-may15-all.csv", count: 4628, useFor: "Main announcement send", optIn: "Yes" },
  { name: "Opted-in · RiNo", csv: "02a-announce-may15-rino.csv", count: 3865, useFor: "Location-specific marketing", optIn: "Yes" },
  { name: "Opted-in · Central Park", csv: "02b-announce-may15-central-park.csv", count: 760, useFor: "Location-specific marketing", optIn: "Yes" },
  { name: "VIPs · Champion + Loyal", csv: "03-vip-champions-loyal.csv", count: 277, useFor: "High-touch personal outreach", optIn: "Mixed" },
  { name: "VIPs · opted-in", csv: "03b-vip-marketing-opted-in.csv", count: 211, useFor: "VIP marketing campaigns", optIn: "Yes" },
  { name: "Re-engagement · Lost", csv: "04-reengagement-lost.csv", count: 1406, useFor: "Cold re-engagement", optIn: "Yes" },
  { name: "Re-engagement · At Risk", csv: "04b-reengagement-at-risk.csv", count: 3519, useFor: "Warmer re-engagement", optIn: "Yes" },
  { name: "ClassPass converters", csv: "05-classpass-converters.csv", count: 314, useFor: "Convert to Sway membership", optIn: "Yes" },
  { name: "Frozen memberships", csv: "06-frozen-memberships.csv", count: 3, useFor: "Phone, don't email", optIn: "No" },
  { name: "Payment failure", csv: "07-payment-failure.csv", count: 27, useFor: "Resolve before transition", optIn: "No" },
  { name: "Unredeemed credits liability", csv: "08-unredeemed-credits-liability.csv", count: 74, useFor: "Must honor in Mindbody", optIn: "No" },
  { name: "Employees (internal)", csv: "09-employees-internal.csv", count: 81, useFor: "Internal comms only", optIn: "—" },
];

const CAMPAIGNS = [
  { date: "2026-05-15", audience: "All members + opted-in", channel: "Email", goal: "Announcement (Heather voice)", from: "Heather · Upswell domain", csv: "01 + 02 deduped", status: "Drafted" },
  { date: "2026-05-15", audience: "Public", channel: "Press + blog + social + banner", goal: "Public announcement", from: "Sway brand", csv: "—", status: "Drafted" },
  { date: "2026-05-21", audience: "VIPs (211)", channel: "Email", goal: "Founding Ambassador early access", from: "Heather · Upswell domain", csv: "03b", status: "Drafted" },
  { date: "2026-05-22", audience: "Active members", channel: "Email × 3 versions", goal: "Segmented details by tier", from: "Sway team · Upswell domain", csv: "01 split", status: "Drafted" },
  { date: "2026-05-26", audience: "Active members", channel: "Email", goal: "Logistics + first visit", from: "Sway team · Upswell domain", csv: "01", status: "Drafted" },
  { date: "2026-05-27", audience: "All opted-in", channel: "Email", goal: "General pre-launch + first visit offer", from: "Sway · Upswell domain", csv: "02", status: "Drafted" },
  { date: "2026-05-30", audience: "VIPs", channel: "Email", goal: "Final priority booking link", from: "Heather · Upswell domain", csv: "03b", status: "Drafted" },
  { date: "2026-06-01", audience: "Active members", channel: "Email", goal: "Launch day welcome", from: "Heather · Sway domain", csv: "01", status: "Drafted" },
  { date: "2026-06-02", audience: "All opted-in", channel: "Email", goal: "Public launch + first visit offer", from: "Sway brand · Sway domain", csv: "02", status: "Drafted" },
  { date: "2026-06-08", audience: "Lost segment", channel: "Email", goal: "Re-engagement #1", from: "Sway · Sway domain", csv: "04", status: "Drafted" },
  { date: "2026-06-17", audience: "At Risk segment", channel: "Email", goal: "Re-engagement #2 / urgency", from: "Sway · Sway domain", csv: "04b", status: "Drafted" },
  { date: "2026-06-22", audience: "ClassPass users", channel: "Email", goal: "Convert to Sway membership", from: "Sway · Sway domain", csv: "05", status: "Drafted" },
];

const PRICING = [
  { rate: "$0/mo", count: 73, note: "Comp / partner / employee / family" },
  { rate: "$99/mo", count: 36, note: "Early Central Park founders + partner tiers" },
  { rate: "$129/mo", count: 36, note: "Mid-period founders + Broadway Legacy" },
  { rate: "$159/mo", count: 29, note: "RiNo late founders" },
  { rate: "$189/mo", count: 2, note: "Retail All Access (list price)" },
  { rate: "$1,599/yr", count: 1, note: "Single annual prepay" },
  { rate: "$59-$89/mo", count: 5, note: "Discounted contracts" },
];

const BLOCKERS_P0 = [
  "Press contact info (name, email, phone) — blocks press release boilerplate",
  "Heather photo (high-res) — blocks LinkedIn / press / blog",
  "Email send platform decision — use whatever Heather already has for Upswell (recommend)",
  "Update /membership page to show both Sway Membership + Sway Unlimited side-by-side — emails reference these tiers, page needs to land them somewhere",
  "GBP claim filing — START NOW. 1-2 week processing window.",
  "Permit applications for Phase 2 buildout — START NOW. 2-3 month lead.",
];

const BLOCKERS_P1 = [
  "Partnership decisions (Wellhub auto, ClassPass confirm modality split, EGYM Wellpass evaluate, plus 14 brand partners)",
  "First Visit Offer policy ($40 off / $99 same as Larimer?)",
  "VIP / Founding Ambassador perks — what specifically?",
  "Mindbody site provisioning — blocks member import",
];

const BLOCKERS_P2 = [
  "Temp partition designer assigned (visual quality critical)",
  "Massage therapist hires + first-week schedules",
  "Hours decision for both locations",
  "Unredeemed credits conversion plan (74 customers)",
];

const QUESTIONS_QUICK = [
  "Email platform: Mailchimp / Klaviyo / Mariana Tek / other?",
  "Heather photo: existing file or do we shoot this week?",
  "Press contact: who handles inbound press inquiries?",
  "Partnership decisions: 80/20 default — keep all $99/$129/$159 + all peer $0 reciprocals?",
  "First Visit Offer: same $40 off / $99 as Larimer?",
  "Sway Unlimited price: $189 confirmed?",
  "Mindbody site provisioning: who owns? when ready?",
];

const DOCS = [
  { title: "README", path: "docs/upswell-conversion/README.md" },
  { title: "Campaign master plan", path: "docs/upswell-conversion/campaign-master-plan.md" },
  { title: "Public announcement (May 15)", path: "docs/upswell-conversion/public-announcement-may15.md" },
  { title: "Press contact list", path: "docs/upswell-conversion/press-contact-list.md" },
  { title: "Partnership decisions matrix", path: "docs/upswell-conversion/partnership-decisions.md" },
  { title: "Transition plan + blockers", path: "docs/upswell-conversion/transition-plan-blockers.md" },
  { title: "Website plan", path: "docs/upswell-conversion/website-plan.md" },
  { title: "Questions for Heather", path: "docs/upswell-conversion/questions-for-heather.md" },
  { title: "POS extract checklist", path: "docs/upswell-conversion/pos-extract-checklist.md" },
  { title: "Mariana Tek reports inventory", path: "docs/upswell-conversion/mariana-tek-reports-inventory.md" },
];

const EMAILS = [
  { n: "01", date: "May 15", title: "Heather announcement", to: "Members + opted-in", path: "email-01-may15-announcement.md" },
  { n: "02", date: "May 21", title: "VIP early access (Founding Ambassadors)", to: "VIPs · 211", path: "email-02-may21-vip-early-access.md" },
  { n: "03", date: "May 22", title: "Segmented details (3 versions)", to: "Members · split by tier", path: "email-03-may22-members-segmented.md" },
  { n: "04", date: "May 26", title: "Logistics + first visit guide", to: "Members · 159", path: "email-04-may26-logistics.md" },
  { n: "05", date: "May 27", title: "General audience pre-launch", to: "Non-member opted-in · 4,470", path: "email-05-may27-general-prelaunch.md" },
  { n: "06", date: "May 30", title: "VIP final priority booking", to: "VIPs · 211", path: "email-06-may30-vip-final.md" },
  { n: "07", date: "Jun 1", title: "Launch day member welcome", to: "Members · 159", path: "email-07-june01-member-welcome.md" },
  { n: "08", date: "Jun 2", title: "Public launch + $40 off offer", to: "Non-member opted-in · 4,470", path: "email-08-june02-public-launch.md" },
  { n: "09", date: "Jun 8", title: "Re-engagement (Lost)", to: "Lost · 1,406", path: "email-09-june08-reengagement-lost.md" },
  { n: "10", date: "Jun 17", title: "Re-engagement (At Risk)", to: "At Risk · 3,519", path: "email-10-june17-reengagement-atrisk.md" },
  { n: "11", date: "Jun 22", title: "ClassPass conversion", to: "ClassPass users · 314", path: "email-11-june22-classpass-conversion.md" },
];

/* ---------------------------------------------
   COMPONENT
--------------------------------------------- */

function daysBetween(a: string, b: string): number {
  const da = new Date(a).getTime();
  const db = new Date(b).getTime();
  return Math.round((db - da) / (1000 * 60 * 60 * 24));
}

function formatDate(d: string) {
  const [y, m, day] = d.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(m) - 1]} ${parseInt(day)}, ${y}`;
}

export default function UpswellDashboard() {
  const [tab, setTab] = useState<"overview" | "campaigns" | "segments" | "pricing" | "blockers" | "docs">("overview");
  const [today, setToday] = useState<string>(KEY_DATES.today);

  useEffect(() => {
    // Use real today if available
    const d = new Date().toISOString().slice(0, 10);
    setToday(d);
  }, []);

  const daysToAnnounce = daysBetween(today, KEY_DATES.announce);
  const daysToLaunch = daysBetween(today, KEY_DATES.launch);

  return (
    <main className="min-h-screen bg-[#F7F4E9] text-[#113D33] font-vance pt-20 sm:pt-24 md:pt-28">
      {/* HEADER */}
      <header className="border-b border-[#113D33]/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#4A776D]">Internal · Sway</div>
              <h1 className="text-2xl md:text-3xl font-bold mt-1">Upswell → Sway Conversion</h1>
              <p className="text-sm opacity-70 mt-1">RiNo Station · Central Park · Launch June 1, 2026</p>
            </div>
            <div className="flex gap-4">
              <CountdownCard label="To announcement" days={daysToAnnounce} target={formatDate(KEY_DATES.announce)} accent="#4A776D" />
              <CountdownCard label="To launch" days={daysToLaunch} target={formatDate(KEY_DATES.launch)} accent="#113D33" />
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1 overflow-x-auto">
            {(["overview", "campaigns", "segments", "pricing", "blockers", "docs"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition border-b-2 ${
                  tab === t
                    ? "border-[#113D33] text-[#113D33]"
                    : "border-transparent text-[#113D33]/50 hover:text-[#113D33]"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {tab === "overview" && <OverviewTab />}
        {tab === "campaigns" && <CampaignsTab today={today} />}
        {tab === "segments" && <SegmentsTab />}
        {tab === "pricing" && <PricingTab />}
        {tab === "blockers" && <BlockersTab />}
        {tab === "docs" && <DocsTab />}
      </div>

      <footer className="border-t border-[#113D33]/10 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-xs opacity-50">
          Internal dashboard · noindex · Last updated May 11 2026 · Source: <code className="bg-black/5 px-1.5 py-0.5 rounded">docs/upswell-conversion/</code>
        </div>
      </footer>
    </main>
  );
}

function CountdownCard({ label, days, target, accent }: { label: string; days: number; target: string; accent: string }) {
  return (
    <div className="bg-white rounded-xl border border-[#113D33]/10 px-5 py-3 shadow-sm">
      <div className="text-[10px] uppercase tracking-wider opacity-60">{label}</div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-3xl font-bold tabular-nums" style={{ color: accent }}>
          {days >= 0 ? days : 0}
        </span>
        <span className="text-xs opacity-60">days</span>
      </div>
      <div className="text-[11px] opacity-70 mt-0.5">{target}</div>
    </div>
  );
}

/* ---- Overview tab ---- */
function OverviewTab() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Section title="Member economics">
        <Stat label="Total Mariana Tek contacts" value="9,094" />
        <Stat label="Marketing-opted-in" value="4,628" sublabel="51% of list — Friday email audience" />
        <Stat label="Active paying members" value="108" sublabel="excluding employees + $0 partner tiers" />
        <Stat label="Total active membership contracts" value="181" />
        <Stat label="Grandfathered monthly revenue" value="~$13K" sublabel="if every existing rate honored permanently" />
        <Stat label="Annual prepay holders" value="1" sublabel="single $1,599/yr member — minimal liability" />
      </Section>

      <Section title="Location split">
        <Stat label="RiNo Station" value="7,517" sublabel="83% of all contacts · 87 active members" />
        <Stat label="Central Park" value="1,535" sublabel="17% of contacts but 72 active members — 5× higher conversion rate" />
        <Stat label="Champion + Loyal VIPs" value="277" sublabel="211 opted-in for marketing" />
      </Section>

      <Section title="Key decisions locked">
        <ul className="text-sm space-y-2 opacity-90">
          <li>✓ <b>Yoga / Pilates dropped</b> — no movement classes under Sway</li>
          <li>✓ <b>Buildout phased</b> — temp partitions Phase 1, full buildout Phase 2 (Aug/Sept)</li>
          <li>✓ <b>Cold plunge regulatory OK</b> at both locations</li>
          <li>✓ <b>Broadway Legacy honored</b> in Mindbody</li>
          <li>✓ <b>Wellhub continues</b> (Gympass rebrand, auto)</li>
          <li>✓ <b>ClassPass continues</b> with individual modality listings at new locations</li>
          <li>✓ <b>All existing rates honored indefinitely</b> ($13K/mo retained revenue)</li>
        </ul>
      </Section>

      <Section title="What's deployed">
        <ul className="text-sm space-y-2 opacity-90">
          <li>✓ <code className="bg-black/5 px-1 rounded">/locations/denver-rino</code></li>
          <li>✓ <code className="bg-black/5 px-1 rounded">/locations/denver-central-park</code></li>
          <li>✓ Both indexed, in sitemap, in locations map</li>
          <li>✓ DaySpa + FAQPage + BreadcrumbList JSON-LD</li>
          <li>✓ Phase 1 / Phase 2 service badges</li>
          <li>✓ Waitlist mailto CTAs (until Mindbody live)</li>
          <li>⏳ Homepage announcement banner (build before May 14)</li>
          <li>⏳ Real photos / OG images for both pages</li>
          <li>⏳ Booking flows at /book (blocked on Mindbody)</li>
        </ul>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-[#113D33]/10 p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-60 mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Stat({ label, value, sublabel }: { label: string; value: string; sublabel?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-black/5 last:border-b-0 pb-3 last:pb-0">
      <div className="flex-1">
        <div className="text-sm">{label}</div>
        {sublabel && <div className="text-xs opacity-60 mt-0.5">{sublabel}</div>}
      </div>
      <div className="text-xl font-bold tabular-nums">{value}</div>
    </div>
  );
}

/* ---- Campaigns tab ---- */
function CampaignsTab({ today }: { today: string }) {
  return (
    <div className="space-y-6">
      <Section title="11 emails drafted">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-2 pr-4">#</th>
                <th className="text-left py-2 pr-4">Date</th>
                <th className="text-left py-2 pr-4">Email</th>
                <th className="text-left py-2 pr-4">Audience</th>
                <th className="text-left py-2">File</th>
              </tr>
            </thead>
            <tbody>
              {EMAILS.map((e) => (
                <tr key={e.n} className="border-b border-black/5">
                  <td className="py-3 pr-4 font-mono text-xs opacity-60">{e.n}</td>
                  <td className="py-3 pr-4 whitespace-nowrap">{e.date}</td>
                  <td className="py-3 pr-4 font-medium">{e.title}</td>
                  <td className="py-3 pr-4 opacity-80">{e.to}</td>
                  <td className="py-3 text-xs opacity-60 font-mono">{e.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Full campaign calendar">
        <p className="text-xs opacity-70 mb-3">
          <b>Sender strategy:</b> Pre-launch from Upswell domain (warm sender, recognized by recipients). Post-launch from Sway domain — Sway brand has built relationship through the prior emails. CAN-SPAM consent transfers; no fresh opt-in needed (May 15 announcement = required notice).
        </p>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-2 pr-4">Date</th>
                <th className="text-left py-2 pr-4">Audience</th>
                <th className="text-left py-2 pr-4">Goal</th>
                <th className="text-left py-2 pr-4">From</th>
                <th className="text-left py-2 pr-4">CSV</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map((c, i) => {
                const past = c.date < today;
                const isUpswellDomain = c.from?.includes("Upswell domain");
                return (
                  <tr key={i} className={`border-b border-black/5 ${past ? "opacity-50" : ""}`}>
                    <td className="py-2 pr-4 whitespace-nowrap font-medium">{formatDate(c.date)}</td>
                    <td className="py-2 pr-4">{c.audience}</td>
                    <td className="py-2 pr-4">{c.goal}</td>
                    <td className="py-2 pr-4 text-xs">
                      <span className={`inline-block px-2 py-0.5 rounded ${
                        isUpswellDomain
                          ? "bg-amber-50 text-amber-900"
                          : c.from?.includes("Sway domain")
                            ? "bg-emerald-50 text-emerald-900"
                            : "opacity-70"
                      }`}>
                        {c.from || "—"}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-xs font-mono opacity-60">{c.csv}</td>
                    <td className="py-2">
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-[#4A776D]/15 text-[#113D33] font-medium">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

/* ---- Segments tab ---- */
function SegmentsTab() {
  const total = SEGMENTS.reduce((sum, s) => sum + s.count, 0);
  return (
    <div className="space-y-6">
      <Section title="13 segmented CSVs">
        <p className="text-xs opacity-60 mb-3">
          All exports in <code className="bg-black/5 px-1.5 py-0.5 rounded">docs/upswell-conversion/data/</code> · Generated from Mariana Tek May 11 2026 export · {total.toLocaleString()} row-count across all segments (with overlap)
        </p>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-2 pr-4">Segment</th>
                <th className="text-right py-2 pr-4">Count</th>
                <th className="text-left py-2 pr-4">Use for</th>
                <th className="text-left py-2 pr-4">Opt-in?</th>
                <th className="text-left py-2">CSV</th>
              </tr>
            </thead>
            <tbody>
              {SEGMENTS.map((s) => (
                <tr key={s.csv} className="border-b border-black/5">
                  <td className="py-3 pr-4 font-medium">{s.name}</td>
                  <td className="py-3 pr-4 text-right font-mono tabular-nums">{s.count.toLocaleString()}</td>
                  <td className="py-3 pr-4 opacity-80">{s.useFor}</td>
                  <td className="py-3 pr-4 text-xs opacity-70">{s.optIn}</td>
                  <td className="py-3 text-xs font-mono opacity-60">{s.csv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

/* ---- Pricing tab ---- */
function PricingTab() {
  const totalPaying = PRICING.filter((p) => !p.rate.startsWith("$0")).reduce((s, p) => s + p.count, 0);
  const totalAll = PRICING.reduce((s, p) => s + p.count, 0);
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <BigStat label="Active membership contracts" value={totalAll.toString()} accent="#113D33" />
        <BigStat label="Paying members" value={totalPaying.toString()} accent="#4A776D" />
        <BigStat label="Free / partner / comp" value={(totalAll - totalPaying).toString()} accent="#9ABFB3" />
      </div>

      <Section title="Active rate distribution (from Mariana Tek)">
        <div className="space-y-3">
          {PRICING.map((p) => {
            const pct = (p.count / totalAll) * 100;
            return (
              <div key={p.rate}>
                <div className="flex items-baseline justify-between mb-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-bold tabular-nums text-lg">{p.rate}</span>
                    <span className="text-xs opacity-60">{p.note}</span>
                  </div>
                  <span className="text-sm font-mono tabular-nums">{p.count}</span>
                </div>
                <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#113D33] rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="What this changes about strategy">
        <ul className="text-sm space-y-2 opacity-90 list-disc list-inside">
          <li>The "$149 founders" framing was wrong — actual founders are at $99 / $129 / $159 in 3 cohorts</li>
          <li>Only 2 members ever paid the $189 retail rate currently active — almost everyone got onto discounted tiers</li>
          <li>Cost of honoring every grandfathered rate indefinitely: ~$13K/month retained revenue. Cheap loyalty investment.</li>
          <li>Recommended <b>Sway Unlimited price: $189</b> — matches the existing retail list, doesn't undercut grandfathered members</li>
          <li>Only 1 annual prepay member ($1,599/yr) — minimal annual liability</li>
        </ul>
      </Section>
    </div>
  );
}

function BigStat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="bg-white rounded-xl border border-[#113D33]/10 p-6">
      <div className="text-xs uppercase tracking-wider opacity-60">{label}</div>
      <div className="text-4xl font-bold tabular-nums mt-2" style={{ color: accent }}>
        {value}
      </div>
    </div>
  );
}

/* ---- Blockers tab ---- */
function BlockersTab() {
  return (
    <div className="space-y-6">
      <Section title="🚨 P0 — Resolve before May 15">
        <ul className="text-sm space-y-2">
          {BLOCKERS_P0.map((b, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="text-red-600 mt-0.5">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="🟧 P1 — Resolve before May 22 (segmented email)">
        <ul className="text-sm space-y-2">
          {BLOCKERS_P1.map((b, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="text-orange-600 mt-0.5">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="🟨 P2 — Resolve before May 30">
        <ul className="text-sm space-y-2">
          {BLOCKERS_P2.map((b, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="text-yellow-600 mt-0.5">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Quick-pass questions for Heather (15-min version)">
        <ol className="text-sm space-y-2 list-decimal list-inside opacity-90">
          {QUESTIONS_QUICK.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

/* ---- Docs tab ---- */
function DocsTab() {
  return (
    <div className="space-y-6">
      <Section title="All planning docs">
        <ul className="text-sm space-y-2">
          {DOCS.map((d) => (
            <li key={d.path} className="flex items-center justify-between gap-4 border-b border-black/5 pb-2 last:border-b-0">
              <span className="font-medium">{d.title}</span>
              <code className="text-xs opacity-60 font-mono">{d.path}</code>
            </li>
          ))}
        </ul>
        <p className="text-xs opacity-60 mt-4">
          All files live in <code className="bg-black/5 px-1.5 py-0.5 rounded">docs/upswell-conversion/</code> — gitignored, won&apos;t deploy. Open in your editor / IDE.
        </p>
      </Section>

      <Section title="Email drafts">
        <ul className="text-sm space-y-2">
          {EMAILS.map((e) => (
            <li key={e.n} className="flex items-center justify-between gap-4 border-b border-black/5 pb-2 last:border-b-0">
              <span>
                <span className="font-mono text-xs opacity-50">{e.n}</span>
                <span className="ml-3 font-medium">{e.title}</span>
                <span className="ml-2 text-xs opacity-60">· {e.date}</span>
              </span>
              <code className="text-xs opacity-60 font-mono">{e.path}</code>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Memory file (persists across Claude sessions)">
        <code className="text-xs opacity-70 font-mono break-all">
          ~/.claude/projects/-Users-John-sway-website/memory/project_upswell_conversion.md
        </code>
      </Section>
    </div>
  );
}
