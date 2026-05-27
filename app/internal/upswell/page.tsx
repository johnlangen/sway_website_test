"use client";

import { useEffect, useState } from "react";
import { EMAIL_DRAFTS } from "./emails-data";
import { SOCIAL_POSTS, WEBSITE_TASKS } from "./content-data";

/* ---------------------------------------------
   DATA — kept inline so dashboard is self-contained
--------------------------------------------- */

const KEY_DATES = {
  today: "2026-05-27",
  announce: "2026-05-15",
  launch: "2026-06-01",
  systemCutover: "2026-06-15",
};

// DAILY_STATUS — top-of-dashboard daily update. Edit this every working day.
const DAILY_STATUS = {
  date: "Wednesday May 27 2026",
  headline: "Stripe migration in motion. MT bridge confirmed. Awaiting Mindbody (Michael Calderon) on PGP vs destination account ID.",
  framing: [
    "🟢 June 1 = brand-only flip (Sway signage, website, comms). Mariana Tek keeps running for bookings + payments.",
    "🎯 June 15 = target Mindbody cutover (with Stripe credit-card migration complete).",
    "🛟 July = backstop if migration slips. MT can extend through end of month.",
  ],
  pending: [
    {
      label: "Mindbody (Michael Calderon): PGP file vs destination account ID?",
      detail: "Email sent 12:19 PM today. Heather's MT rep is holding pending Mindbody's answer. Follow-up trigger: Thursday EOD.",
      owner: "Awaiting Mindbody",
    },
    {
      label: "Mindbody Payments onboarding at RiNo + Central Park",
      detail: "Other Spavia accounts show in payments.mindbody.io. RiNo + CP don't — confirm with Michael whether they're fully onboarded. Gating item for either migration option.",
      owner: "Awaiting Mindbody",
    },
    {
      label: "Heather: redirect Stripe Connect payouts to Sway bank effective June 1",
      detail: "5-min config in her Stripe dashboard (Settings → Payouts → Bank). Independent of migration. Required so MT-collected revenue flows to Sway during the bridge period.",
      owner: "Heather",
    },
    {
      label: "Heather: confirm Stripe Connect login access",
      detail: "Many merchants haven't logged into Stripe in years. Recover credentials via stripe.com/support if needed. Don't discover lost access on June 1.",
      owner: "Heather",
    },
    {
      label: "Sway entity bank account ready to receive Stripe payouts",
      detail: "LLC banking — if not done, becomes the new gating item.",
      owner: "John",
    },
  ],
  decisionsLockedToday: [
    "🛋️ Lounge model FINAL: 75-min slot (85-min MB backend), cap 15 RiNo / 18 CP, two bookable add-ons (infrared 25-min + sauna 25-min), open-floor for plunge/compression/lounge",
    "💰 Pricing FINAL: $99/mo Founding (through Aug 31) → $129/mo Standard. $49 drop-in / 75 min. $25 first-time intro.",
    "🕐 Hours FINAL: Phase 1 Mon closed, Tue-Fri 7am-8pm, Sat-Sun 8am-6pm. Phase 2 expands to Mon 12-8, Tue-Thu 7-9pm.",
    "♾️ Unlimited stipulations: no per-day cap, max 5 active future bookings, back-to-back allowed, 3 no-shows/quarter = $20 fee.",
    "💳 Stripe migration path REOPENED (was killed May 25): Heather's MT contact confirmed feasibility. Awaiting Mindbody's preferred method.",
    "📅 Timeline reframed: June 1 = brand-only, June 15 = system cutover, July = backstop.",
  ],
  whatsNext: [
    "Thursday May 28 EOD: follow up Michael Calderon if no response",
    "Friday May 29: Heather redirects Stripe payouts (5 min)",
    "Weekend May 30-31: Mindbody session-type setup at both new sites (Sway Remedy Lounge, 85-min, cap 15/18, 2 resource types)",
    "June 1: Brand flip. Email 07 sends. MT continues. Sway website live for both new locations.",
    "June 10-14: Stripe migration target completion",
    "June 15: Target Mindbody cutover",
  ],
};


const SEGMENTS = [
  { name: "Active members (transactional)", csv: "01-members-transactional-155.csv", count: 159, useFor: "Membership-affecting emails", optIn: "No (transactional)" },
  { name: "All marketing-opted-in", csv: "02-announce-may15-all-4628.csv", count: 4628, useFor: "Main announcement send", optIn: "Yes" },
  { name: "Opted-in · RiNo", csv: "02a-announce-may15-rino-3865.csv", count: 3865, useFor: "Location-specific marketing", optIn: "Yes" },
  { name: "Opted-in · Central Park", csv: "02b-announce-may15-central-park-760.csv", count: 760, useFor: "Location-specific marketing", optIn: "Yes" },
  { name: "VIPs · Champion + Loyal", csv: "03-vip-champions-loyal-277.csv", count: 277, useFor: "High-touch personal outreach", optIn: "Mixed" },
  { name: "VIPs · opted-in", csv: "03b-vip-marketing-opted-in-211.csv", count: 211, useFor: "VIP marketing campaigns", optIn: "Yes" },
  { name: "Re-engagement · Lost (all)", csv: "04-reengagement-lost-1406.csv", count: 1406, useFor: "Cold re-engagement (broad)", optIn: "Yes" },
  { name: "🆕 Lost (recovery-loyal)", csv: "04a-reengagement-lost-recovery-1017.csv", count: 1017, useFor: "HIGH-VALUE recovery-loyal churners — Sway is what they want", optIn: "Yes" },
  { name: "Re-engagement · At Risk (all)", csv: "04b-reengagement-at-risk-3519.csv", count: 3519, useFor: "Warmer re-engagement", optIn: "Yes" },
  { name: "🆕 At Risk (recovery-loyal)", csv: "04c-reengagement-atrisk-recovery-575.csv", count: 575, useFor: "At-risk recovery-loyal — re-engage with urgency", optIn: "Yes" },
  { name: "ClassPass converters", csv: "05-classpass-converters-314.csv", count: 314, useFor: "Convert to Sway membership", optIn: "Yes" },
  { name: "Frozen memberships", csv: "06-frozen-memberships-3.csv", count: 3, useFor: "Phone, don't email", optIn: "No" },
  { name: "Payment failure", csv: "07-payment-failure-27.csv", count: 27, useFor: "Resolve before transition", optIn: "No" },
  { name: "Unredeemed credits liability", csv: "08-unredeemed-credits-liability-74.csv", count: 74, useFor: "Must honor in Mindbody", optIn: "No" },
  { name: "Employees (internal)", csv: "09-employees-internal-81.csv", count: 81, useFor: "Internal comms only", optIn: "—" },
  { name: "🆕 Yoga loyalists — graceful offboarding", csv: "10-yoga-loyalists-offboarding-357.csv", count: 360, useFor: "Graceful offboarding ONLY — Sway has no yoga. Email 12 is classified TRANSACTIONAL (service wind-down notice), so legally could be sent to all yoga-only/yoga-heavy regardless of marketing opt-in (~890). We chose the conservative path: opted-in only.", optIn: "Yes (filtered) — but transactional, so widening allowed if needed" },
  { name: "🆕 Sway Unlimited prime targets", csv: "12-sway-unlimited-prime-targets-782.csv", count: 782, useFor: "Recovery-heavy customers — perfect Sway Unlimited candidates", optIn: "Yes" },
];

const BEHAVIOR_BUCKETS = [
  { bucket: "Recovery heavy (>70%)", count: 533, checkins: 21542, avgVisits: 40.4, note: "★ CORE BASE — top Sway Unlimited candidates", color: "emerald" },
  { bucket: "Recovery only", count: 1325, checkins: 11150, avgVisits: 8.4, note: "Casual recovery — Sway Unlimited prospects", color: "emerald" },
  { bucket: "Mixed (30-70% yoga)", count: 446, checkins: 7214, avgVisits: 16.2, note: "Use both — recovery message works, soften yoga loss", color: "amber" },
  { bucket: "Yoga heavy (>70%)", count: 41, checkins: 950, avgVisits: 23.2, note: "Small but loyal — call them personally, offer partner studio referral", color: "rose" },
  { bucket: "Yoga only", count: 809, checkins: 1585, avgVisits: 2.0, note: "Mostly casual — easy graceful offboarding", color: "rose" },
];

const ACTIVE_MEMBER_BUCKETS = [
  { bucket: "Recovery heavy", count: 71, action: "Standard May 22 email — they're perfect Sway customers", color: "emerald" },
  { bucket: "Recovery only", count: 49, action: "Standard May 22 email", color: "emerald" },
  { bucket: "Mixed (use both)", count: 21, action: "May 22 email with softer yoga-winddown language — they'll miss yoga but will keep recovery", color: "amber" },
  { bucket: "No check-in history", count: 14, action: "Standard May 22 email (likely recent signups or comp accounts)", color: "amber" },
  { bucket: "Yoga heavy / Yoga only", count: 4, action: "⚠️ PERSONAL CALL FROM HEATHER — don't send them the standard email. 4 names listed below.", color: "rose" },
];

const YOGA_HEAVY_ACTIVE_MEMBERS = [
  { name: "Jessica Blackwell", location: "RiNo Station", yoga: 12, recovery: 0, email: "jessilynne85@yahoo.com", rate: "$159/mo PAYING", contract: "All Access - Core (signed up 4/24/2026 — only 19 days ago)", flag: "⚠️ HIGHEST RISK — paid for yoga 3 weeks ago, lead the call with a refund offer" },
  { name: "Gregory Anderson", location: "RiNo Station", yoga: 50, recovery: 1, email: "thegregory@usa.net", rate: "$129/mo PAYING", contract: "Broadway Legacy (since Sept 2023 — transferred from closed South Broadway)", flag: "Long relationship — softer touch, 'we tried' acceptable" },
  { name: "Christina Aguila", location: "Central Park", yoga: 113, recovery: 26, email: "xtina.aguila@gmail.com", rate: "$99/mo PAYING", contract: "Hayes partnership tier", flag: "Partner-tier — coordinate with Hayes brand decision" },
  { name: "Nathan Khomutov", location: "RiNo Station", yoga: 12, recovery: 5, email: "nathan.khomutov@gmail.com", rate: "🆓 $0/mo (Gravity Haus comp)", contract: "Gravity Haus | All Access Monthly Membership", flag: "Free via Gravity Haus reciprocal — courtesy call, no refund needed" },
];

// Top mixed-use members worth a personal touch from Heather (yoga + recovery mixed, sorted by yoga visits, paying-only)
const MIXED_PERSONAL_TOUCH_TARGETS = [
  { name: "Nicole Doty", location: "Central Park", yoga: 148, recovery: 103, yogaPct: 59, rate: "$159/mo" },
  { name: "Anne Brown", location: "Central Park", yoga: 116, recovery: 85, yogaPct: 58, rate: "$129/mo" },
  { name: "Sam Sylar", location: "Central Park", yoga: 73, recovery: 113, yogaPct: 39, rate: "$159/mo" },
  { name: "Leslie Gamache", location: "Central Park", yoga: 63, recovery: 46, yogaPct: 58, rate: "$99/mo" },
  { name: "Kendal Nattinger", location: "RiNo Station", yoga: 61, recovery: 62, yogaPct: 50, rate: "$159/mo" },
];

const ACTIVE_MEMBER_FREE_VS_PAYING = [
  { bucket: "Recovery heavy", free: 14, paying: 57, total: 71 },
  { bucket: "Recovery only", free: 17, paying: 32, total: 49 },
  { bucket: "Mixed (both)", free: 5, paying: 16, total: 21 },
  { bucket: "Yoga heavy", free: 1, paying: 2, total: 3 },
  { bucket: "Yoga only", free: 0, paying: 1, total: 1 },
  { bucket: "No check-in data", free: 14, paying: 0, total: 14 },
];

// CAMPAIGNS — May 20 revision (campaign strategy reshape)
// Phase 1 (Heather goodwill, pre-takeover): May 15 announce (sent) + May 22 details + Jun 1 welcome. That's it.
// Phase 2 (June 1 → massage+facials open): quiet operational period, no marketing.
// Phase 3 (when massage+facials open, mid-to-late June): public reveal + re-engagement cascade.
const CAMPAIGNS = [
  { date: "2026-05-15 noon", audience: "Active members (155)", channel: "Email 01a", goal: "Member announcement + $99 drop + auto-enroll", from: "Heather · Upswell domain", csv: "01-members-transactional-155.csv", status: "Sent" },
  { date: "2026-05-15 noon", audience: "Non-members deduped (4,146)", channel: "Email 01b", goal: "Positive new chapter + $99 lock-in CTA + $40 off Larimer bridge", from: "Heather · Upswell domain", csv: "02c-may15-general-optin-deduped-4146.csv", status: "Sent" },
  { date: "2026-05-15 noon", audience: "Yoga loyalists (357)", channel: "Email 12", goal: "Graceful offboarding + River Yoga $59 offer", from: "Heather · Upswell domain", csv: "10-yoga-loyalists-offboarding-357.csv", status: "Sent" },
  { date: "2026-05-22", audience: "Active members (155)", channel: "Email × 4 versions", goal: "Member details + first-week guide (03)", from: "Heather · Upswell domain", csv: "01 split (A / A-MIXED / B / C)", status: "Drafted" },
  { date: "2026-06-01", audience: "Active members (155)", channel: "Email", goal: "Launch day welcome — short, Heather voice (07)", from: "Heather · Sway domain", csv: "01", status: "Drafted" },
  { date: "When massage + facials open", audience: "Opted-in non-members (4,470)", channel: "Email", goal: "Phase 3 public launch · $40 off first visit (08)", from: "Sway · Sway domain", csv: "02 minus 01", status: "Drafted — defers from June 2" },
  { date: "~1 week after Email 08", audience: "Lost (1,406)", channel: "Email", goal: "Re-engagement #1 (09)", from: "Sway · Sway domain", csv: "04", status: "Drafted — defers from June 8" },
  { date: "~2 weeks after Email 08", audience: "At Risk (~2,500)", channel: "Email", goal: "Re-engagement #2 / urgency (10)", from: "Sway · Sway domain", csv: "04b minus 04", status: "Drafted — defers from June 17" },
  { date: "~3 weeks after Email 08", audience: "ClassPass users (314)", channel: "Email", goal: "Convert to Sway membership (11)", from: "Sway · Sway domain", csv: "05", status: "Drafted — defers from June 22" },
];

const PRICING = [
  { rate: "$0/mo", count: 72, note: "Comp / partner / employee / family (50 customer-facing + 22 employees)" },
  { rate: "$99/mo", count: 36, note: "Early Central Park founders + partner tiers" },
  { rate: "$129/mo", count: 36, note: "Mid-period founders + Broadway Legacy" },
  { rate: "$159/mo", count: 29, note: "RiNo late founders" },
  { rate: "$189/mo", count: 2, note: "Retail All Access (list price)" },
  { rate: "$1,599/yr", count: 1, note: "Single annual prepay" },
  { rate: "$59-$89/mo", count: 5, note: "Discounted contracts" },
];

const FREE_BREAKDOWN = [
  { count: 22, contract: "Affiliate | All Access Membership", note: "Broad reciprocal arrangement — needs Heather to identify the actual partner" },
  { count: 22, contract: "Upswell Team Membership", note: "Employees (not customer-facing)" },
  { count: 16, contract: "Gravity Haus | All Access Monthly Membership", note: "Peer Denver wellness club — KEEP recommended" },
  { count: 3, contract: "Central Park Founding Membership", note: "Comp founders" },
  { count: 2, contract: "Creator Crew | All Access Creator Membership", note: "Content creators" },
  { count: 2, contract: "All Access Monthly Membership", note: "Comp — needs Heather context" },
  { count: 1, contract: "RiNo Station Founding Membership", note: "Comp founder" },
  { count: 1, contract: "Friends & Family | All Access Monthly Membership", note: "Staff family discount" },
  { count: 1, contract: "Household | All Access Monthly Membership", note: "Comp household tier" },
  { count: 1, contract: "Junior Membership", note: "Youth tier comp" },
  { count: 1, contract: "LT Buddy | All Access Membership", note: "Brand partnership" },
];

const ANNUAL_PREPAYS = [
  {
    name: "Terry Wei",
    contract: "1 Year | All Access Membership",
    rate: "$1,599/yr",
    purchased: "Dec 29, 2025",
    termEnds: "Dec 29, 2026",
    status: "Active",
    note: "ONLY active annual prepay. Honored as-is through end of term. ⭐ Personal note from Heather/Marty before Friday noon send — see Overview tab for framing. Renews Jan 2027 at $99/mo member rate."
  },
];

const COMMITMENT_FULFILLED = [
  { name: "Sean Astrup", contract: "RiNo Station Founding Membership", rate: "$129/mo", term: "9-month commitment", status: "Fulfilled, now month-to-month" },
  { name: "Jenny Chau", contract: "RiNo Station Founding Membership", rate: "$129/mo", term: "9-month commitment", status: "Fulfilled, now month-to-month" },
  { name: "Sara Lopez", contract: "Broadway Legacy Membership", rate: "$99/mo", term: "15-month commitment", status: "Fulfilled, now month-to-month" },
  { name: "Austin Outhavong", contract: "The Edit | All Access Monthly", rate: "$99/mo", term: "2-month commitment", status: "Fulfilled, now month-to-month" },
  { name: "joanna ross", contract: "The Edit | All Access Monthly", rate: "$99/mo", term: "2-month commitment", status: "Fulfilled, now month-to-month" },
];

const TERMINATED_ANNUALS = [
  { name: "Mark Scalercio", contract: "1 Year | All Access Membership", rate: "$1,899/yr", purchased: "May 2025", status: "Terminated" },
  { name: "Colby Walters", contract: "Year of Wellness | All Access", rate: "$0 (comp)", purchased: "Jan 2025", status: "Terminated" },
  { name: "Ashley Carrigan", contract: "Year of Wellness | All Access", rate: "$0 (comp)", purchased: "Jan 2025", status: "Terminated" },
  { name: "Emily Beirne", contract: "Year of Wellness | All Access", rate: "$0 (comp)", purchased: "Jan 2025", status: "Terminated" },
  { name: "Terry Wei (prior)", contract: "Year of Wellness | All Access", rate: "$0 (comp)", purchased: "Jan 2025", status: "Done — upgraded to paid 1-year above" },
];

// PAYMENT_MIGRATION_PLAN — May 25 reshape after Stripe path was abandoned.
// Stripe Data Migration Request was never initiated; with 6 days to June 1 it's not viable.
// Path forward: front-desk re-add at first Sway visit, bridged by MT extension.
const PAYMENT_MIGRATION_PLAN = {
  status: "REOPENED May 27 — Stripe PGP migration in progress. MT bridges June 1 → June 15. Cards never re-added by members.",
  whyChanged:
    "Researched May 27: Mindbody Payments is built on Stripe Connect (confirmed via Stripe's published customer story). Mariana Tek is also Stripe Connect. Both ends are Stripe — making cross-platform customer + payment-method migration technically straightforward via Stripe's documented PAN Import process (PGP-encrypted file OR direct destination account ID transfer). Heather's MT rep confirmed they can execute it. Revised path: MT keeps running as POS through June 15, Stripe migration runs in parallel (~2-3 weeks), then clean cutover with member cards already in Mindbody. June 1 becomes brand-only flip (signage, website, comms). Worst case: extend MT bridge through July if Stripe slips.",
  thePath: [
    {
      step: "1",
      label: "John → Michael Calderon at Mindbody: confirm migration method + destination info",
      detail: "Email sent 12:19 PM May 27. Ask: (a) PGP file or destination account ID? (b) Are RiNo + CP fully onboarded in payments.mindbody.io? (c) If destination-ID path: provide acct_XXXXXXXXXX IDs for both locations.",
    },
    {
      step: "2",
      label: "Heather → MT (via Stripe contact): pass Mindbody's answer",
      detail: "Once Mindbody confirms, Heather forwards method + destination details to her MT contact who is holding pending this answer.",
    },
    {
      step: "3",
      label: "Heather: redirect MT/Stripe Connect payouts to Sway bank, effective June 1",
      detail: "5-min config in her Stripe dashboard (Settings → Payouts → Bank account). Independent of migration. After June 1, all MT-collected revenue flows to Sway directly.",
    },
    {
      step: "4",
      label: "June 1: Brand-only flip. MT continues as POS.",
      detail: "Sway signage, website, GBP rename submitted, Email 07 sends. New-location pages on swaywellnessspa.com link to MT booking site for actual bookings. Mindbody Payments and Lounge session types set up in background.",
    },
    {
      step: "5",
      label: "June 1-14: MT runs the business, Stripe migration runs in parallel",
      detail: "Members book and pay through MT as usual. Revenue flows MT → Stripe Connect → Sway bank. Stripe imports the encrypted card data (PGP file) or directly transfers tokens (destination account ID) to Mindbody.",
    },
    {
      step: "6",
      label: "~June 10-14: Verify Stripe migration complete, test cards in Mindbody",
      detail: "Confirm member cards are visible in Mindbody Payments. Run 3-5 test charges against real member cards (small refunded amounts) to verify token validity end-to-end.",
    },
    {
      step: "7",
      label: "June 15: Mindbody cutover",
      detail: "MT shuts down. Mindbody becomes the sole POS. Members never re-entered a card. Booking URL on Sway website flips from MT to Mindbody.",
    },
    {
      step: "8",
      label: "June 15+: Mid-June reminder email to active members",
      detail: "Soft email: 'We've upgraded our system — your card is already on file. Here's your new booking URL. Come in!' Recovers any dormant members.",
    },
  ],
  revenueImpact: [
    { window: "June 1 → June 14", expectedPctOfMonthly: 100, note: "MT continues collecting. Payouts redirected to Sway bank. Full revenue continuity." },
    { window: "June 15 cutover", expectedPctOfMonthly: 100, note: "Mindbody takes over with cards already migrated. No re-add gauntlet, no double-bill." },
    { window: "June 16+", expectedPctOfMonthly: 100, note: "Standard ongoing operations" },
  ],
  risks: [
    "🟡 Stripe migration timeline slip: if MT or Stripe is slow, push cutover to late June or early July. MT can extend.",
    "🟡 Mindbody Payments onboarding at RiNo + CP not yet complete (per payments.mindbody.io screenshot showing other Spavia accounts but not these two). Critical gating item — push Michael Calderon on this.",
    "🟡 Heather may have lost Stripe Connect login from inactivity. Recover NOW before June 1, not on June 1.",
    "🟡 Sway entity bank account may not be ready to receive Stripe payouts. If LLC banking incomplete, becomes new gating item.",
    "🟢 Member experience risk = LOW (vs HIGH under the cut-card plan). Cards transfer silently; members never know there was a migration.",
  ],
  asks: [
    "🔥 Michael Calderon @ Mindbody: PGP file or destination account ID? Provide RiNo + CP Stripe Connect account IDs if option B. Confirm RiNo + CP fully onboarded in payments.mindbody.io. (Email sent 12:19 PM May 27.)",
    "Heather: confirm Stripe Connect dashboard login. Redirect payout bank to Sway effective June 1.",
    "John: confirm Sway entity bank account ready to receive Stripe payouts.",
    "John: weekend May 30-31: configure Sway Remedy Lounge session type at both Mindbody sites (85-min backend, cap 15/18, 2 resource types).",
    "Mackenzie: front desk script for the bridge period — 'we're on Upswell's system through June 15, then we transition. Your card is staying on file.'",
  ],
  oldPlanArchived:
    "PREVIOUS PLAN (killed May 27): Members re-add card at front desk on first Sway visit after a June 1 hard cut. Killed because (a) Stripe migration was researched and confirmed feasible, (b) cut-card approach would have lost 20-40% of members to re-add friction, (c) MT bridge preserves revenue continuity with zero member-facing change.",
};

// CAPACITY_DECISION — Sway Remedy Lounge booking model
// SUPERSEDED May 26: See the "🛋️ Lounge Decision" tab for final locked model
// Original locked May 25 (Option C). Iterated May 26 with MT data → final model with 2 bookable resources.
const CAPACITY_DECISION = {
  status: "SUPERSEDED — see Lounge Decision tab for final (75-min slot, 15/18 cap, infrared + sauna bookable, $99/$129 pricing)",
  question: "How members access the Sway Remedy Lounge at the new locations — individual modality bookings (current Upswell), unlimited walk-in (Larimer model), or hybrid time-slot booking?",
  options: [
    {
      label: "Option A — Individual modality booking (current Upswell model)",
      pros: "Familiar to Upswell members · guaranteed slots · highest utilization data per modality",
      cons: "Complex booking UX · Mindbody needs session-type-per-modality workaround · blocks spontaneous walk-ins · members can hoard slots inefficiently",
      verdict: "Rejected — too complex for Day 1, doesn't match $99 Unlimited marketing message",
    },
    {
      label: "Option B — Unlimited walk-in (Larimer Remedy Room model)",
      pros: "Simple ops · one Mindbody session type · spontaneous · matches '$99 Unlimited' marketing",
      cons: "No guarantee of availability at peak (5-7pm) · possible crowding · less per-modality data",
      verdict: "Considered — workable but no capacity signal, risky for bigger space with multiple rooms",
    },
    {
      label: "Option C — Hybrid lounge time-slot bookings ★ LOCKED",
      pros: "Members book a 60 or 90 min Lounge window, drop-in to any modality within. Capacity = concurrent guests, not modality slots. Familiar (Upswell users booked time too). Simple Mindbody setup (one session type with capacity). Self-regulating: empty = stay longer, busy = soft nudge.",
      cons: "Members might overrun their window — but with multiple rooms / bigger space, soft enforcement only. Not a hard kick-out.",
      verdict: "★ LOCKED — book a window as capacity signal, soft enforcement",
    },
  ],
  implementation: [
    "New Mindbody session type at each new location: 'Sway Remedy Lounge' — 90 minute slot",
    "★ Capacity per slot: 15 concurrent guests at each location. Sauna is the bottleneck — see capacity table below for sauna math.",
    "Archive / disable the legacy 40-min 'Remedy Room' session at RiNo + CP (carried over from Larimer setup — doesn't match Option C)",
    "Keep Remedy membership tier but link it to the new 90-min Lounge sessions",
    "Members can book back-to-back slots if availability allows",
    "Front-desk check-in: time-of-arrival noted; visual cue (wristband / time card) for self-management",
    "Soft enforcement only — bigger space + multiple rooms = no hard kick-out at 90 min unless at cap with others waiting",
    "Walk-ins welcome when capacity is open (auto-book on the spot)",
    "Peak hours (5-7pm) may warrant a 60-min slot (decision pending)",
  ],
  openItems: [
    "✓ Space plans: pulled from both architectural permit sets (May 25 PM)",
    "Peak vs off-peak slot length — 60 min at 5-7pm? Or same 90 min?",
    "Capacity cap when massage + facials launch — same staff awareness model",
    "Treatments (massage + facials): ALREADY in Mindbody at both locations ✓ — only Lounge session types need new config",
    "Sauna terminology — RiNo has 3 Clearlight infrared cabins + 1 B Saunas cube sauna. Marketing says 'traditional sauna' — verify which is the customer-facing description.",
  ],
  capacityTable: [
    {
      location: "RiNo (3636 Blake St)",
      totalSF: "4,000 SF",
      loungeSF: "1,786 SF",
      codeMax: 36,
      recommendedCap: 15,
      equipment: "Big cold plunge (4-6 people) · Big sauna (4-6) · Infrared standalone (3-4) · Mixed room w/ infrared + Normatec (6-8)",
    },
    {
      location: "Central Park (2271 Clinton St, Aurora)",
      totalSF: "3,500 SF",
      loungeSF: "1,900 SF",
      codeMax: 38,
      recommendedCap: 15,
      equipment: "Smaller cold plunge (4-6) · Big sauna (4-6) · Infrared (3-4) · Two sections w/ infrared + Normatec (8-10)",
    },
  ],
  capacityContext: "Sauna is the bottleneck — and most members come for sauna. Code max from IBC table 1004.1.2 (50 SF/gross occupant for exercise rooms) is 36-38, but code max isn't the right number — sauna throughput is. RiNo simultaneous sauna seats ≈ 8-12, CP ≈ 9-14. At 15 booked guests with ~25-30% in sauna at any moment, that's 4-5 sauna users at peak (within capacity), leaving 9-10 in plunges/normatec/transition. 20 was too high — peak hour sauna would queue and the experience would suffer. Mindbody capacity is adjustable slot-by-slot, so start at 15, monitor first 2 weeks, raise to 18 or drop to 12 based on actual peak feel.",
};

// LOUNGE_FINAL — Final locked Sway Remedy Lounge model (data-backed, May 26 2026)
// All numbers derived from Upswell MT data Nov 2025 → May 2026
// Source: report-reservations.csv, report-average-attendance-by-time-slot.csv, report-customer-frequency.csv
const LOUNGE_FINAL = {
  status: "LOCKED · May 26 2026",
  oneLiner:
    "75-min Sway Remedy Lounge slot (85-min Mindbody backend = 75 member-facing + 10 cleanup), cap 15 RiNo / 18 CP. Two optional add-on reservations within the slot: 25-min infrared cabin (150-175°F) AND 25-min traditional sauna seat (200°F) — both with 3 rotation windows each. Cold plunge, compression, and lounge stay open-floor (biology and timers enforce rotation). Heat-modality single-user/seat reservations clean up the only real friction points and match every social recovery brand's hybrid pattern. $99/mo Founding (existing members + launch window through Aug 31) → $129/mo Standard. $49 drop-in, $25 first-time intro. Unlimited = no per-day cap, max 5 active future bookings.",
  decisionTable: [
    { row: "Booking product", rino: "One: 75-min Sway Remedy Lounge slot", cp: "Same" },
    { row: "Member-facing slot length", rino: "75 minutes", cp: "75 minutes" },
    { row: "Mindbody backend slot length", rino: "85 min (75 + 10 min cleanup)", cp: "Same" },
    { row: "Slot cap (concurrent members)", rino: "15", cp: "18", bold: true },
    { row: "Bookable add-on #1: Infrared cabin", rino: "25-min reservation, 3 cabins × 3 rotations", cp: "25-min reservation, 4 cabins × 3 rotations" },
    { row: "Infrared seats per slot", rino: "9 (3 × 3 × 25-min @ 150-175°F)", cp: "12 (4 × 3 × 25-min @ 150-175°F)" },
    { row: "Bookable add-on #2: Sauna seat", rino: "25-min reservation, 4 seats × 3 rotations", cp: "25-min reservation, 4 seats × 3 rotations" },
    { row: "Sauna seats per slot", rino: "12 (4 × 3 × 25-min @ 200°F)", cp: "12 (4 × 3 × 25-min @ 200°F)" },
    { row: "Open-floor (no booking)", rino: "Cold plunge, compression, lounge", cp: "Same" },
    { row: "Membership — Founding (through Aug 31)", rino: "$99/mo unlimited", cp: "$99/mo unlimited" },
    { row: "Membership — Standard (post-Aug 31)", rino: "$129/mo unlimited", cp: "$129/mo unlimited" },
    { row: "Drop-in (75 min)", rino: "$49", cp: "$49" },
    { row: "First-time intro", rino: "$25", cp: "$25" },
    { row: "5-pack / 10-pack", rino: "$220 ($44/visit) / $399 ($40/visit)", cp: "Same" },
    { row: "Phase 1 hours (June 1, recovery only)", rino: "Mon closed · Tue-Fri 7am-8pm · Sat-Sun 8am-6pm", cp: "Same" },
    { row: "Phase 2 hours (mid-June, treatments live)", rino: "Mon 12-8 · Tue-Thu 7-9 · Fri 7-8 · Sat-Sun 8-6", cp: "Same" },
  ],
  // Throughput math — the why behind the model
  throughputRiNo: [
    { mod: "★ Sauna (200°F, 25-min booked seat) — BOOKABLE", seats: "4 capped (of 4-6)", session: "25 min", per75: "12", demand: "5-6 (40%×14)", used: "42-50%", flag: "bookable" },
    { mod: "Cold plunge (38°F forces 2-5 min exits)", seats: "4-6", session: "3 min avg", per75: "100-150", demand: "5 (35%×14)", used: "3-5%", flag: "ok" },
    { mod: "★ Infrared (150-175°F, 25-min cabin) — BOOKABLE", seats: "3 cabins", session: "25 min", per75: "9", demand: "7 (50%×14)", used: "78%", flag: "tight" },
    { mod: "Compression (30-min program timer)", seats: "4-6", session: "30 min", per75: "10-15", demand: "3-4 (25%×14)", used: "23-40%", flag: "ok" },
  ],
  throughputCP: [
    { mod: "★ Sauna (BOOKABLE)", seats: "4 capped (of 4-6)", session: "25 min", per75: "12", demand: "7 (40%×17)", used: "58%", flag: "bookable" },
    { mod: "Cold plunge", seats: "4-6", session: "3 min avg", per75: "100-150", demand: "6 (35%×17)", used: "4-6%", flag: "ok" },
    { mod: "★ Infrared (4 cabins) — BOOKABLE", seats: "4 cabins", session: "25 min", per75: "12", demand: "8-9 (50%×17)", used: "67-75%", flag: "tight" },
    { mod: "Compression", seats: "6-8", session: "30 min", per75: "15-20", demand: "4 (25%×17)", used: "20-27%", flag: "ok" },
  ],
  coldPlungeInsight:
    'Cold plunge looks like it "only fits a few" — but each person stays only 3 minutes. So during a 75-min slot, a single plunge tub serves 25 different people. Multiply by 4-6 simultaneous seats, and you\'re at 100-150 plunge sessions per slot. With only 5 people wanting plunge in that slot, you\'d use 3-5% of capacity. Members never queue. This is why "small footprint" doesn\'t mean "needs booking" — body cold-shock enforces rotation automatically.',
  // Slot length rationale
  slotLengthOptions: [
    { length: "40 min (Larimer)", pro: "Fast turnover", con: "Too short for multi-room flow at our larger spaces" },
    { length: "60 min", pro: "Matches median visit", con: "No slack — anyone running over creates conflicts" },
    { length: "75 min ★ LOCKED", pro: "Median + 25% slack. Fits a full circuit. Enables exactly 3 infrared rotations.", con: "None significant", locked: true },
    { length: "90 min", pro: "Generous", con: "Wastes slot density; only 25% of members need more than 75" },
    { length: "Day pass", pro: "Bathhouse model", con: "Requires per-modality enforcement; can't run with our equipment" },
  ],
  slotLengthData: [
    { label: "Upswell median visit duration", value: "60 min" },
    { label: "p75 visit duration", value: "90 min" },
    { label: "p90 visit duration", value: "120 min (only 10%)" },
    { label: "Infrared rotations in 75 min", value: "3 × 25 min" },
    { label: "Full circuit time", value: "15 sauna + 5 plunge + 25 infrared + 15 compression + 15 lounge = 75 min" },
  ],
  // Cap rationale
  capRationale: [
    { col: "Recovery area SF", rino: "1,786", cp: "1,900" },
    { col: "IBC code max occupancy", rino: "36", cp: "38" },
    { col: "Our cap", rino: "15", cp: "18", bold: true },
    { col: "% of code max", rino: "42%", cp: "47%" },
    { col: "Median demand / slot (last 6 mo)", rino: "2", cp: "3" },
    { col: "p95 demand", rino: "7", cp: "8" },
    { col: "Max concurrent observed", rino: "14", cp: "17" },
    { col: "Slots rejected at our cap (last 6 mo)", rino: "0 of 1,291", cp: "0 of 1,633" },
  ],
  // Hours
  hours: [
    { day: "Monday", p1: "Closed", p2: "12pm – 8pm" },
    { day: "Tuesday", p1: "7am – 8pm", p2: "7am – 9pm" },
    { day: "Wednesday", p1: "7am – 8pm", p2: "7am – 9pm" },
    { day: "Thursday", p1: "7am – 8pm", p2: "7am – 9pm" },
    { day: "Friday", p1: "7am – 8pm", p2: "7am – 8pm" },
    { day: "Saturday", p1: "8am – 6pm", p2: "8am – 6pm" },
    { day: "Sunday", p1: "8am – 6pm", p2: "8am – 6pm" },
    { day: "Total hrs/week", p1: "62 hrs", p2: "83 hrs", bold: true },
  ],
  hoursData: [
    "Weekday-before-9am traffic: 6-7% (justifies 7am open)",
    "Weekday-after-8pm: 4% recovery-only (lifts in Phase 2 for treatments)",
    "Weekend-before-10am at CP: 20% of weekend traffic (must open 8am Sat-Sun)",
    "Mon-before-noon: dead at both locations",
    "Larimer reference: 50 hrs/wk (treatment-first); new locations are recovery-first = longer windows",
  ],
  // Member personas
  personas: [
    {
      label: "The Planner (17-20% infrared-only)",
      pct: "20% RiNo · 15% CP",
      flow: "Books slot + reserves infrared 6:00-6:25 → arrives 5:55, does cabin, leaves 6:30",
      experience: "25-min focused session, guaranteed cabin, zero wait",
    },
    {
      label: "The Heat Stacker (~30% sauna + infrared)",
      pct: "Sauna lovers who also do infrared",
      flow: "Books slot + sauna 6:00-6:25 + infrared 6:50-7:15 → arrives 6:00, sauna → plunge → lounge → infrared → leave",
      experience: "Two guaranteed heat sessions bookended around plunge / cool-down",
    },
    {
      label: "The Full Experience (~50% multi-modality)",
      pct: "~50%",
      flow: "Books slot + sauna 6:00-6:25 OR infrared 6:25-6:50 → flexible flow around the anchor",
      experience: "Full circuit with one or both heat sessions anchored",
    },
    {
      label: "The Chill Visit (~30% open-floor)",
      pct: "~30%",
      flow: "Books slot, skips both add-ons → walks in, flows wherever feels right (cold plunge, compression, lounge always open)",
      experience: "Zero booking friction, social recovery lounge feel",
    },
  ],
  // Visit composition (last 6 months, both locations, 4,916 visits)
  visitComposition: [
    { type: "Open-floor only (no specific modality)", visits: 1451, pct: "29.5%" },
    { type: "Single modality: sauna/plunge", visits: 1074, pct: "21.8%" },
    { type: "Two modalities", visits: 938, pct: "19.1%" },
    { type: "Single modality: INFRARED", visits: 828, pct: "16.8%", highlight: true },
    { type: "Single modality: compression", visits: 379, pct: "7.7%" },
    { type: "All three modalities", visits: 246, pct: "5.0%" },
  ],
  infraredOnlyShare: {
    rino: { num: 381, total: 1898, pct: "20.1%" },
    cp: { num: 447, total: 3018, pct: "14.8%" },
  },
  peakHours: [
    { loc: "RiNo", peak: "Sunday 3pm", avg: 7, max: 16 },
    { loc: "Central Park", peak: "Sunday 10am", avg: 11, max: 17 },
  ],
  infraredCrunch: [
    { loc: "RiNo (3 cabins)", atCap: "16% of slots", worst: "Sat 12pm — 43% at cap", checkins: "755 over 6 months" },
    { loc: "Central Park (4 cabins)", atCap: "3% of slots", worst: "Sun 10am — 16% at cap", checkins: "806 over 6 months" },
  ],
  // Competitors
  competitors: [
    { brand: "Bathhouse Brooklyn", model: "All-day open-floor day pass", books: "Nothing", why: "High redundancy (8-10 saunas, 3-4 plunges)" },
    { brand: "Othership (NYC, Toronto)", model: "Class-paced 75-min experience", books: "Slot only", why: "One big sauna, class-paced" },
    { brand: "Aire Ancient Baths", model: "90-min timed entry", books: "Slot only", why: "8+ pools, no contention" },
    { brand: "Korean / Russian bathhouses", model: "All-day pass", books: "Nothing", why: "Massive equipment redundancy" },
    { brand: "HigherDose", model: "Per-cabin booking", books: "Infrared cabin (their whole product)", why: "Single capacity-constrained modality" },
    { brand: "Restore Hyper Wellness", model: "Per-treatment booking", books: "Every modality", why: "Clinical/medical positioning" },
    { brand: "Pause Studio", model: "Per-treatment booking", books: "Every modality", why: "Clinical positioning" },
    { brand: "Sway Larimer Remedy Room", model: "Private 40-min, max 3", books: "Whole room", why: "Tiny single-room space" },
    { brand: "★ Sway new (THIS MODEL)", model: "75-min open-floor + optional infrared cabin", books: "Slot + infrared only", why: "Multi-room space, only infrared is capacity-constrained", locked: true },
  ],
  // Pricing comparison — Denver-local + national benchmarks (May 26 2026)
  pricingCompare: [
    { brand: "Embrace North (1-2 mi from RiNo)", drop: "$25", unlimited: "$50/mo", breakeven: "2.0 visits/mo", why: "Budget anchor — 3 saunas + 1 cold plunge only, no infrared/compression/treatments" },
    { brand: "Denver Sports Recovery", drop: "$35-45", unlimited: "$120/mo (Basic)", breakeven: "2.7-3.4 visits/mo", why: "Direct multi-modality comp — same modality menu" },
    { brand: "Sway Larimer Remedy Room", drop: "$49 / 40 min", unlimited: "$99/mo for 4 visits (credit-based, not unlimited)", breakeven: "n/a — credit pack", why: "Downtown private suite, different market" },
    { brand: "Bathhouse Brooklyn", drop: "$60", unlimited: "$200/mo", breakeven: "3.3 visits/mo", why: "National open-floor benchmark" },
    { brand: "Othership", drop: "$35-55", unlimited: "$295/mo", breakeven: "6-8 visits/mo", why: "Class-paced experience" },
    { brand: "HigherDose", drop: "$50-75", unlimited: "$295/mo", breakeven: "4-6 visits/mo", why: "Single-modality (infrared only)" },
    { brand: "★ Sway new (Founding)", drop: "$49 / 75 min", unlimited: "$99/mo", breakeven: "2.0 visits/mo", why: "Launch tier — existing Upswell + signups through Aug 31", locked: true },
    { brand: "★ Sway new (Standard)", drop: "$49 / 75 min", unlimited: "$129/mo", breakeven: "2.6 visits/mo", why: "Post-Aug 31 standard rate", locked: true },
  ],
  // Phase plan
  phases: [
    {
      phase: "Phase 1 (June 1 → mid-June)",
      label: "Recovery lounge only",
      items: [
        "Sway Remedy Lounge live",
        "Membership + drop-in pricing live",
        "No treatments bookable (clearly communicated as 'coming June 15+')",
        "Online drop-ins OFF (members + walk-ins only)",
        "Hours: Mon closed, Tue-Fri 7-8, Sat-Sun 8-6",
      ],
    },
    {
      phase: "Phase 2 (mid-June → early July)",
      label: "Facials open",
      items: [
        "Facial booking goes live in Mindbody",
        "Hours expand: Tue-Thu close 9pm",
        "Online drop-ins ON",
        "Member discount applies (15% off treatments)",
      ],
    },
    {
      phase: "Phase 3 (early July+)",
      label: "Massage open",
      items: [
        "Massage booking goes live",
        "Full hours schedule active",
        "Aescape decision still TBD",
      ],
    },
    {
      phase: "Phase 4 (TBD)",
      label: "Aescape evaluation",
      items: [
        "Wait for 4-6 weeks of member behavior data",
        "If demand justifies the equipment cost, add it",
      ],
    },
  ],
  // Why these modalities are bookable, why others aren't
  whyNotAll: [
    {
      modality: "★ INFRARED — BOOKABLE",
      reason: "78% peak utilization at RiNo, 67-75% at CP. One member's use blocks another's for 25 min. No biological exit cue. Reservation guarantees the 17-20% infrared-only segment never has a wasted trip. Cabins are private 1-person rooms — perfect match for resource booking.",
      locked: true,
    },
    {
      modality: "★ TRADITIONAL SAUNA — BOOKABLE",
      reason: "42-58% peak utilization. While biology forces rotation (200°F = 10-15 min body tolerance), members who specifically want sauna at a specific time deserve guaranteed access. Capped at 4 simultaneous seats per 25-min window keeps the room social, not crowded. Solves the predictability concern without adding member friction. Both heat-modalities now follow the same booking pattern = consistent UX.",
      locked: true,
    },
    {
      modality: "Cold plunge — open-floor",
      reason: "Booking 1 of 4-6 seats with 95%+ slack. Absurd: member books a 3-min plunge slot. Body forces 2-5 min rotation. A single tub serves 100-150 sessions per 75-min slot vs demand of 5. Throughput utterly destroys demand.",
    },
    {
      modality: "Compression / Normatec — open-floor",
      reason: "30-min program timer self-rotates. 4-6 chairs with 60%+ slack at peak demand. Could add later if patterns shift, but not needed at launch.",
    },
    {
      modality: "Lounge / chill space — open-floor",
      reason: "Not a constrained resource. Just space.",
    },
  ],
  // Operational rules + Unlimited membership stipulations
  operations: [
    { rule: "Member booking window", detail: "7 days ahead" },
    { rule: "Drop-in booking window", detail: "48 hours ahead (Phase 2+)" },
    { rule: "Cancellation", detail: "6 hours ahead, no penalty" },
    { rule: "No-show policy", detail: "3 free/quarter, then $20 fee (matches Larimer)" },
    { rule: "Guest pass", detail: "1 free guest/month per member, must accompany member" },
    { rule: "Front desk view", detail: "Mindbody surfaces Lounge slot manifest + infrared schedule + sauna schedule" },
    { rule: "Unlimited: per-day cap", detail: "None — true unlimited. Members can do morning + evening." },
    { rule: "Unlimited: max active future bookings", detail: "5 (prevents slot hoarding 30+ days out)" },
    { rule: "Unlimited: back-to-back bookings", detail: "Allowed. Member can book 6:00 + 7:25 slots = 150 min on premises with 10-min cleanup gap." },
    { rule: "Add-ons per slot", detail: "Up to 2 (1 infrared + 1 sauna, different rotation windows recommended for circuit flow)" },
    { rule: "Mindbody backend", detail: "Each booking = master 85-min Lounge slot + (optional) 25-min infrared resource + (optional) 25-min sauna resource. Cancellation of master auto-releases resources." },
  ],
};

// MEETING_525_AGENDA — May 25 1pm with Heather + Emily (COMPLETED)
const MEETING_525_AGENDA = {
  date: "✅ COMPLETED · May 25 · 1:00 PM (historical record)",
  attendees: "John + Heather + Emily",
  title: "Pre-launch alignment: Lounge capacity, comms strategy, week-of plan",
  context: "OUTCOMES (logged May 27): Lounge Option C locked → iterated May 26 with MT data into final 2-bookable-resource model (see Lounge Decision tab). Capacity decision (15/18) backed by Upswell utilization data. Stripe migration path was killed in this meeting, then REOPENED May 27 when researched and confirmed feasible. Email 03 confirmed killed. Email 07 rewrite needed (now updated for bridge framing, not card re-add). $99 drop audit pending.",
  decisionsToLock: [
    "Sway Remedy Lounge — concurrent-guest capacity per location. Need Emily's space plan / room sketch with modality stations marked (saunas, plunges, compression chairs, red light) to set the cap.",
    "Peak vs off-peak slot length (5-7pm = 60 min? otherwise 90 min?) — informed by the capacity number",
    "Email 07 (June 1 welcome) rewrite: pull the card-re-add line into the body instead of a P.S. — sets expectations more clearly since Email 03 didn't go",
    "Killing Email 03 officially — confirmed; Heather sticks to one more touch (Email 07)",
    "Handling Heather's $99 last-chance offer new members in the migration (they're additional rows in the import)",
    "Final June 1 day-one operating hours both locations",
  ],
  asks: [
    "Emily: bring a space plan / sketch with modality stations + dimensions for both RiNo + Central Park",
    "Emily: confirm what 'comfortable max concurrent guests' looks like in each location based on her on-the-ground experience",
    "Heather: any concerns with Email 07 being the only remaining Heather-domain touch before June 1?",
    "Heather: confirm count of new members captured via her $99 last-chance offer — add to the import list",
    "Heather: did the $99 drop actually CHARGE $99 (not the old rate) in MT for May billing cycles? John will audit but worth confirming if she already knows",
  ],
  followups: [
    "John: pull MT data this week — last billed date + cycle + 90-day visits per member",
    "John: $99 drop audit in MT — if not charged correctly, identify owed credits",
    "John: set up Sway Remedy Lounge session types (one per location, 90-min, capacity per locked decision)",
    "John: archive or disable the legacy 40-min Remedy Room session at the new locations",
    "John: build /book routes for new locations on swaywellnessspa.com + test booking end-to-end",
    "John: rewrite Email 07 with card-re-add in the body (not P.S.)",
    "Heather: front-desk training session for Mackenzie + crew before June 1",
  ],
};

// WEEK_PLAN — May 25 → June 1 critical path (7 days)
const WEEK_PLAN = [
  {
    day: "Wed May 27 (TODAY)",
    items: [
      "✅ DONE: Lounge model + pricing + hours FINAL (75-min slot, 15/18 cap, 2 bookable resources, $99/$129, $49 drop-in)",
      "✅ DONE: Stripe migration path researched + confirmed feasible (Mindbody = Stripe Connect)",
      "✅ DONE: Email to Michael Calderon @ Mindbody asking PGP vs destination account ID (12:19 PM)",
      "✅ DONE: Heather's MT rep is on hold pending Mindbody's answer",
      "Heather: confirm Stripe Connect dashboard login access (recover via stripe.com/support if needed)",
      "John: confirm Sway entity bank account is ready to receive Stripe payouts",
    ],
  },
  {
    day: "Thu May 28",
    items: [
      "🔥 Follow up with Michael Calderon if no Mindbody response by EOD",
      "Heather: log into Stripe dashboard, redirect Connect payouts to Sway bank effective June 1 (5-min task)",
      "Pull final MT data: per-member last billed date + cycle + visit frequency (still useful for analytics + dormant re-engagement campaigns)",
      "Build /book routes on swaywellnessspa.com for new locations — links to MT booking site for now",
      "Rewrite Email 07 for the new bridge framing (NOT card re-add)",
    ],
  },
  {
    day: "Fri May 29",
    items: [
      "Once Mindbody responds: pass migration method to Heather → MT, kick off the actual data transfer",
      "Verify RiNo + CP onboarding status in payments.mindbody.io",
      "End-to-end test: book a slot on swaywellnessspa.com that links to MT booking site",
      "Front desk training: Mackenzie on the bridge-period flow ('we're on Upswell's system through June 15')",
    ],
  },
  {
    day: "Sat-Sun May 30-31",
    items: [
      "Configure Sway Remedy Lounge session type at both Mindbody sites (85-min backend, cap 15/18, infrared + sauna as resources, 3 rotation windows each)",
      "Archive legacy 40-min Remedy Room session at the new locations",
      "Configure Sway Unlimited Founding ($99/mo) and Standard ($129/mo) as Mindbody Membership contracts",
      "Configure drop-in product ($49 / 75 min) and first-time intro ($25)",
      "Photo media kit final pass for Phase 3 press push",
    ],
  },
  {
    day: "Mon Jun 1 — BRAND FLIP DAY",
    items: [
      "6 AM: Send Email 07 (Heather launch-day welcome — bridge framing, not cutover)",
      "Flip LocationsContent.tsx to 'open' for both locations",
      "Signage swap on both buildings",
      "GBP rename submission (Upswell → Sway)",
      "MT keeps running as POS — members book/pay through MT as before (URL linked from Sway site)",
      "Stripe payouts now flow to Sway bank, not Heather",
    ],
  },
  {
    day: "Tue-Fri Jun 2-12",
    items: [
      "Stripe migration runs in parallel: MT sends encrypted card data → Stripe imports to Mindbody Connect accounts (10 business days)",
      "Monitor MT operations: revenue capture, member experience, any tech issues",
      "Prep Mindbody site: bookings, treatments, gift cards, retail",
      "Phase 2 prep: facial booking ready to flip live mid-June",
    ],
  },
  {
    day: "~Jun 10-14",
    items: [
      "Verify Stripe migration complete in Mindbody Payments portal",
      "Run 3-5 test charges against real member cards (small, refunded) to verify tokens work",
      "Front desk training: full Mindbody flow for the June 15 cutover",
      "Send pre-cutover heads-up email: 'New system goes live June 15, your card is already on file'",
    ],
  },
  {
    day: "Mon Jun 15 — SYSTEM CUTOVER",
    items: [
      "🔥 MT shuts down. Mindbody becomes the sole POS.",
      "Booking URLs on swaywellnessspa.com flip from MT to Mindbody",
      "Members never re-entered a card — cards already in MB via Stripe migration",
      "Facials go live (Phase 2)",
      "Send Email 08: 'We're fully on the new system. Book a 75-min Sway Remedy Lounge slot here.'",
    ],
  },
  {
    day: "Backstop: extend MT through July if needed",
    items: [
      "If Stripe migration slips past June 14, push cutover to June 22 / June 29 / July 6 in 1-week increments",
      "MT extension is on the table per Heather",
      "Don't force a hard cutover with incomplete migration — preserve member experience",
    ],
  },
];

const BLOCKERS_P0 = [
  "🔥 AWAITING: Michael Calderon @ Mindbody — PGP file vs destination account ID? Confirm RiNo + CP onboarded in payments.mindbody.io. Email sent 12:19 PM May 27. Follow-up trigger Thursday May 28 EOD.",
  "🔥 Heather: Stripe Connect dashboard login (recover if lost) + redirect payouts to Sway bank effective June 1. Independent of migration. 5-min task.",
  "🔥 Sway entity bank account ready to receive Stripe payouts. If LLC banking not complete, becomes the new gating item.",
  "Insurance (GL + workers' comp) for both new locations — required by June 1. Commercial policies typically 2-3 weeks via broker.",
  "Email 07 rewrite — new bridge framing (NOT card re-add). 'We're transitioning systems mid-June, your card stays on file.' Send June 1.",
  "Update /membership page to show Sway Unlimited tier — emails reference $99/mo, page needs to land them somewhere. Founding vs Standard split.",
  "Sway Remedy Lounge session-type setup in Mindbody at both sites (85-min backend, cap 15/18, infrared + sauna resources × 3 rotation windows). Weekend May 30-31.",
  "GBP — Heather has access. Add John as OWNER on both listings this week. Submit Upswell → Sway rename request June 1 AM (Google approval 3-5 days). Preserves review history.",
  "Permit applications for Phase 2 buildout — START NOW. 2-3 month lead.",
];

const BLOCKERS_P1 = [
  "ClassPass: confirm individual-modality listings (cold plunge / sauna / infrared as separate listings) at new locations",
  "EGYM Wellpass: post-June 3 partnership evaluation",
  "Brand partner decisions (Mach 983, Hayes, Lululemon, F45, etc.) — keep / sunset / negotiate per partnership-decisions.md",
  "First Visit Offer policy at the new locations — $40 off / $99 same as Larimer for Phase 3?",
  "Mindbody site provisioning — Two sites needed: RiNo + Central Park. Status check needed (last checked May 20). Required for member card add at front desk on June 1.",
  "Member migration mechanics: customer records export from Mariana Tek + import to Mindbody",
  "Gift card migration: Loopz export needed from Heather + Mariana Tek report. Build mapping CSV — issue as Mindbody gift cards (NOT 'on account').",
  "74 customers with unredeemed credits/gift cards not in any of the 3 May 15 lists — decide whether to send them a separate transactional notice.",
];

const BLOCKERS_P2 = [
  "Temp partition designer assigned (visual quality critical)",
  "Massage therapist hires + first-week schedules",
  "Hours decision for both locations (currently framed loosely: 'similar through June, extended this summer')",
  "Rollover form for Mindbody gap (May 15 → ~May 25) — optional capture for engaged members; simple Typeform",
  "Soft member referral incentive for quiet period (June 1 → mid-summer PR push) — costs nothing, seeds word-of-mouth before public push",
  "Sway Larimer team comms documentation + dedicated phone line for migration questions",
  "📞 Phone numbers for RiNo + Central Park — decide: take over Heather's existing Upswell numbers (cleanest for Google/SEO/legacy referral continuity, LNP portable) vs. provision new Sway numbers with forwarding from old vs. brand new numbers no forwarding. Lean: take over. Affects website location pages, GBP listings, front desk routing, voicemail-to-email, customer service. Needs to land before June 1 brand transition. Flagged May 15.",
];

const QUESTIONS_QUICK = [
  "Reply-to address for May 15 sends: Heather's inbox, Sway-monitored inbox (members@swaywellnessclub.com?), or location-specific?",
  "Heather photo: existing file or do we shoot this week?",
  "Press contact: who handles inbound press inquiries?",
  "Free-tier cohort decisions (Heather running keep/sunset recs per partner category — when ready?)",
  "74 unredeemed-credits holders: send them a separate transactional notice tomorrow, or fold into 01b?",
  "Mindbody site provisioning: who owns? when ready (~May 25 target)?",
  "Phase 2 sequencing (facials + Aescape) — together or separate? Fall timing TBD.",
];

const MEETINGS = [
  {
    date: "2026-05-25 1:00 PM",
    title: "Pre-launch alignment with Heather + Emily (IN PROGRESS)",
    status: "active",
    attendees: "John + Heather + Emily",
    topics: [
      "Sway Remedy Lounge booking model — locked Option C (hybrid 90-min time slots, soft cap)",
      "Concurrent-guest capacity per location (Emily walks through dimensions)",
      "Peak-hour slot length (60 vs 90 min for 5-7pm)",
      "MT data pull this week (per-member last billed + visit frequency)",
      "$99 drop verification in MT for $129/$159/$189 members",
      "Treatment list — what ports from Larimer vs new at RiNo/CP",
      "June 1 operating hours decision",
    ],
    decisions: [
      "★ LOCKED OPTION C — Sway Remedy Lounge bookings = 90-min time-slot windows, soft cap. Members book a slot, drop-in to any modality within. Self-regulating — empty = stay, busy = courtesy nudge. Bigger space + multiple rooms = no hard kick-out enforcement.",
    ],
    openQuestions: [
      "Pending 1pm: concurrent-guest capacity per location",
      "Pending 1pm: peak hour shorter slots?",
      "Pending 1pm: treatment list confirmation from Emily",
      "Pending 1pm: $99 MT drop verification status",
    ],
  },
  {
    date: "2026-05-25 AM",
    title: "Stripe migration KILLED — pivot to Mindbody-only POS",
    status: "completed",
    attendees: "John",
    topics: [
      "Stripe Data Migration Request — never initiated",
      "MT extension bridge as fallback (rejected — two POS systems = bad ops)",
      "Mindbody-only POS June 1 (locked path)",
      "Front desk re-add flow",
      "June revenue ramp expectations",
    ],
    decisions: [
      "Stripe migration is OUT. No request was initiated; Stripe Support typically takes 2-4 weeks. With 6 days to June 1, it's not viable. Also: Mindbody Payments isn't Stripe — there was never a clean token-transfer path anyway.",
      "MT extension as a billing bridge — REJECTED. Two POS systems mean reconciliation hell, Heather collecting on Sway's behalf post-takeover creates accounting/tax complexity, and front desk juggles MT for billing + Mindbody for everything else. Not worth the operational drag.",
      "Clean cut: Mindbody is the only POS June 1. MT shuts down May 31 midnight. Members re-add card at front desk on first Sway visit. Mindbody first-bill-date = (last MT bill date + cycle length) so no double-bill, no gap.",
      "Billing edge case rule: if a member's MT cycle already ended before they re-add, comp the gap and start fresh from re-add date. ~$1-2K total cost across 155 members; eliminates 'you're already late!' front-desk awkwardness.",
      "June revenue ramp: ~$0 on June 1 auto-bill (no cards on file yet), ~50% by end of week 1, ~80% by week 3, 100% by mid-July as members trickle in.",
    ],
    openQuestions: [
      "Did Email 03 (May 22 segmented member details) actually go out?",
      "Mindbody site provisioning status — both sites live, ready for member import by Tue May 26?",
      "Did the $99 drop actually execute in MT for members at $129/$159/$189?",
    ],
  },
  {
    date: "2026-05-18",
    title: "Plan shift: Stripe migration pushed to Wednesday May 20 (since killed — see May 25)",
    status: "completed",
    attendees: "John (Mon AM update)",
    topics: [
      "Stripe Data Migration Request timing",
      "Mindbody site provisioning status check",
      "Heather's Squarespace banner + landing page (already done by her over weekend)",
    ],
    decisions: [
      "Stripe migration kickoff shifted from Mon May 18 → Wed May 20. Today and tomorrow focused on other priorities.",
      "Mindbody site provisioning to be CHECKED Wednesday before kicking off Stripe — Katie said earliest Mon May 18 but we need to verify both RiNo + Central Park sites are live and get Stripe Connect account IDs from Mindbody.",
      "Heather went above and beyond over the weekend — built a transition banner AND a landing page on upswellstudio.com herself with the announcement info. No Squarespace Contributor invite or content work needed from Sway side. Big help.",
    ],
    openQuestions: [
      "Are the Mindbody sites actually provisioned by Wed May 20? Email Katie / Michael Mon-Tue to confirm.",
      "How many MT signups did Heather close over the weekend with her banner + landing page driving traffic? (Counts toward the Stripe snapshot.)",
    ],
  },
  {
    date: "2026-05-14",
    title: "Heather's response doc + operational alignment",
    status: "completed",
    attendees: "John + Heather (async via doc)",
    topics: [
      "APA execution status (both ready for signature)",
      "Headcount target (14-17 wellness associates + 1 lead)",
      "Mackenzie as Transition Lead + 4-part training plan",
      "Member renewal approach (Option 2: drop to $99 proactively)",
      "Send timing for May 15 (noon, not AM)",
      "Wellpass event June 3 + The River Yoga $59 offer",
    ],
    decisions: [
      "Central Park APA exists, both ready for signature. Sign May 14 before comms go out.",
      "All members get proactively dropped to $99/mo Sway Unlimited (Option 2 from Heather's doc). ~$3K/mo revenue cost vs. simpler operations + stronger retention. Update Email 01a to lead with the rate reduction.",
      "Send time shifted from AM to NOON on Friday May 15. Heather sends team FAQs Thursday eve so Upswell team has them before Friday shift.",
      "Mariana Tek admin access scheduled to end May 31. Marty raised that we might want to extend as insurance against Stripe migration running late — Heather is open if needed but no automatic offer. IDEAL: get it all done by May 31. FALLBACK: ask for ~2 more weeks if migration is mid-flight.",
      "Yes to Wellpass private event June 3 at RiNo — aligns with quiet-launch B2B sneak-peek strategy, gives Marty/Heather face time to evaluate Wellpass partnership.",
      "The River Yoga $59 unlimited month offer added to Email 12 (yoga offboarding) — specific, real partner offering.",
      "BrandBot: Heather turns off all Upswell marketing automations at 11 PM Thursday 5/14.",
      "Ring + Sonos: new accounts under Sway entities (hardware stays). Joel contacts Comcast about Wi-Fi account transfer.",
      "Mackenzie + all 6 Wellness Crew offered retention. Hiring lift for the other 8-11 positions begins immediately.",
    ],
    openQuestions: [
      "Gift card mapping: build CSV with original_card_id, source_system, customer details, original_balance, new_sway_card_id, etc. Maintained permanently for audit. Most cards in Loopz, some in Mariana Tek. Reconcile by migration date and load to Mindbody as gift cards (NOT 'on account').",
      "RiNo lease assignment consent — Heather requested correct version from JLL; awaiting today (May 14).",
    ],
  },
  {
    date: "2026-05-13",
    title: "Strategy + phased launch decisions",
    status: "completed",
    attendees: "John + Heather",
    topics: [
      "Phased launch (June 1 brand / massage later)",
      "Transactional vs marketing email clarification",
      "Hours expansion as a member value story (not just re-engagement)",
      "Yoga vs recovery member analysis needed",
    ],
    decisions: [
      "Phased launch (Plan B): brand June 1, massage suites open week of June 7-14 when treatment rooms are presentable.",
      "Hours expansion is a member-facing story too, not just re-engagement. Members who stayed get more access/reliability. Use in member emails as value-add.",
      "Unlimited at Upswell was Remedy + Yoga combined — not just Remedy. Some churn was caused by insufficient yoga classes. This changes the re-engagement story: yoga-churners are NOT a recapture target. Recovery-churners are.",
      "CAN-SPAM consent transfers in a business handover. The May 15 announcement is the legal notice. NO fresh opt-in needed for the 4,628 marketing-opted-in folks. First-visit offer is a pure conversion tool, not an opt-in gate.",
    ],
    openQuestions: [
      "Yoga vs recovery visit frequency from Mariana Tek (next POS pull — John to grab Class Session + Reservations reports)",
      "Massage license timing in Denver — 2-4 weeks typical. Gates the massage launch date.",
      "Front desk staffing: keep current Upswell staff or replace? What were their wage rates?",
      "Massage therapist + esthetician pipeline: who's interviewing/onboarding, target headcount per location for opening week?",
      "Construction timing: build curtain/partition structures during current operating hours, off-hours, or hybrid?",
    ],
  },
  {
    date: "2026-05-12",
    title: "Pricing meeting",
    status: "completed",
    attendees: "John + Heather + Emily + Marty",
    topics: [
      "Sway Unlimited final price",
      "Member migration approach (opt-in vs automatic)",
      "Wellhub continuation",
      "Hours expansion as messaging asset",
      "Local employer / building partnership discounts",
      "Card migration mechanics (Mariana Tek Stripe → Mindbody Payments)",
      "May 31 in-person sign-up event idea",
      "Back-to-school campaign idea (Aug/Sept)",
    ],
    decisions: [
      "Wellhub: SUNSET. Wellhub users consume capacity without converting to paid memberships. On capacity-constrained recovery-led locations, opportunity cost > the low-margin Wellhub revenue. Notify users with 30+ day notice.",
      "Sway Unlimited at new locations = $99/mo (matches Sway Larimer $99 membership price, but unlimited recovery instead of $25/session). $129 possible if needed — RiNo/CP has more cold plunge + sauna capacity than Larimer's single room.",
      "Member migration is OPT-IN. Initial May 15 email transactional, includes 'sign up to roll over your membership' CTA. Lock in their existing rate for minimum 12 months — customer chooses term length.",
      "Rollover perk: members who roll over get massage/facial at $99 each as Sway member benefit.",
      "Yoga: dropped (confirmed). Need data on yoga-heavy vs recovery-heavy members for graceful offboarding.",
      "Sway Unlimited capacity-gated — no hard cap now, monitor.",
    ],
    openQuestions: [
      "Katie: Mariana Tek uses Stripe; Mindbody Payments has its own gateway. Card transfer with consent + signature, or members re-add at first visit?",
      "May 31 event: space presentable by then or push?",
      "Phone outreach for migration: call members or email only?",
      "Sway Larimer team comms documentation",
    ],
  },
];

const LAUNCH_SCENARIOS = [
  {
    plan: "A",
    title: "THE PLAN — quiet member-only transition + mid-Aug PR push",
    color: "emerald",
    description: "REVISED May 14: this is a QUIET June 1 launch. Members-only comms until the space is finished and beautiful. Big Sway PR + social push held for MID-JULY (week of July 13-17, green wall in but retail not yet) OR MID-AUGUST (week of Aug 17 or 24, both green wall + retail in). Leaning mid-August because 'this is finished' framing matters more than tight cadence. Three phases: (1) May 15 → June 1: members hear from Heather on her voice + segmented member emails. NO Sway-channel public posts. (2) June 1 → mid-July or mid-August: quiet operational launch. Brand transition happens, recovery continues, massage opens mid-to-late June (intentionally vague — license + buildout). Word-of-mouth only. (3) Mid-July or Mid-August: BIG public PR push when everything looks finished. Sway social goes live with announcement, press distribution, paid ads. Main strategic goal throughout: keep existing members happy.",
    pros: [
      "Realistic against the FBI license timeline (mid-to-late June arrival)",
      "Gives Emily breathing room on buildout — green wall 6-8 weeks, retail 8-10 weeks",
      "Covers Jocelyn's absence cleanly — she's back ~May 26, full hiring restart possible",
      "Two PR waves instead of one (June 1 brand + mid-summer big push) = more sustained press + paid acquisition arc",
      "One clean message, no walkbacks: 'massage opens mid-to-late June' said once, vague enough to absorb slip",
      "Members never lose recovery access; revenue continues throughout",
      "Going public with a half-built space (no green wall, no retail) creates a 'soft opening' perception that's hard to dislodge — wait until camera-ready",
    ],
    cons: [
      "Public launch on June 1 is recovery-only (less complete menu)",
      "Less revenue Day 1 (no massage bookings)",
      "Requires deliberate comms across two launch moments",
    ],
    verdict: "★ COMMITTED PLAN as of May 13, PR timing refined May 14 (leaning mid-August).",
  },
  {
    plan: "B",
    title: "Considered: Phased early June (massage June 7-14)",
    color: "amber",
    description: "Brand transition June 1, massage suites open mid-June. Compressed but split timeline.",
    pros: [
      "Compressed timeline kept momentum across one launch arc",
      "Brand launched with confidence",
    ],
    cons: [
      "License stuck at FBI background check — June 7-14 no longer realistic",
      "Jocelyn out May 16-25 covers half the pre-launch hiring window",
      "Emily already overwhelmed; compression made it worse",
      "Heather + Jocelyn still not aligned on hiring/retention basics",
      "Any slip would force a walk-back",
    ],
    verdict: "ABANDONED May 13 — license + Jocelyn timing made this unviable.",
  },
  {
    plan: "C",
    title: "Considered: Big bang — full launch June 1",
    color: "rose",
    description: "Everything ready by June 1: brand, recovery, massage in finished suites, members migrated, booking live.",
    pros: [
      "Single launch moment, maximum PR impact, clean narrative",
    ],
    cons: [
      "Massage license in Denver = 2-4 weeks minimum; not in hand by June 1",
      "Sister's curtain/structure work compressed to 19 days",
      "Mindbody provisioning timing tight",
      "Any piece slipping = whole launch looks unfinished",
    ],
    verdict: "REJECTED early May — too high risk for a brand launch this important.",
  },
];

const CURTAIN_DESIGN = {
  doneWell: {
    description: "Heavy linen drapery on real curtain tracks. Intentional lighting (warm + dim, no fluorescent). Design-considered pillars. Reads as 'curated pop-up' or 'speakeasy spa.' Brand asset.",
    references: [
      "Equinox Hotels spa interiors",
      "the Well NYC treatment rooms",
      "Heyday Skin pop-ups",
      "Drybar's first locations (curtained intimacy thing)",
      "Soho House's Soho Beach pop-up rooms",
    ],
  },
  donePoorly: {
    description: "Thin fabric over PVC frames. Fluorescent overheads. Drywall partitions you can hear through. Reads as 'trade show booth.' Brand damage.",
    references: [],
  },
  context: "Sister is doing this alongside Spavia marketing — stretched thin. Mom helping. If she's not confident she can hit the 'done well' bar in 19 days, default to Plan C (push massage to June 21+) instead of trying to force it.",
};

const NO_CLOSURE_REASONING = [
  "Revenue continues — members keep paying grandfathered rates, walk-ins continue. Recovery suite doesn't need any changes during transition.",
  "Google local algorithm punishes closures — even a few weeks of 'temporarily closed' status loses local search rank and takes weeks/months to recover.",
  "Member confidence — closing then reopening tests trust at exactly the moment you need to build it. Staying open is the loudest reassurance you can give them.",
];

const CRITICAL_GATING = [
  {
    item: "Massage establishment license — application in flight, FBI fingerprint pending",
    owner: "Marty",
    leadTime: "Marty's call (May 13): submit application + expedite the FBI fingerprint, but proceed with massage launch mid-to-late June even if full approval hasn't landed",
    impact: "Real risk: operating massage with the application in process but not approved means any DORA complaint or insurance issue carries exposure. Marty owns this lane and is choosing to accept the gap. Massage target = mid-to-late June (intentionally vague to absorb any slip).",
  },
  {
    item: "EIN obtained ✓",
    owner: "Marty",
    leadTime: "Done May 13",
    impact: "Unblocks bank, payroll, vendor accounts. ✓",
  },
  {
    item: "Insurance — add new locations to existing Sway policies or issue new",
    owner: "Marty",
    leadTime: "Days to a week depending on carrier",
    impact: "Required by June 1 operational launch. Coverage needed: general liability, workers' comp (Colorado-required for the 6 inherited staff + new hires), property (saunas, plunge, equipment), cyber liability (customer data migration). Massage malpractice / professional liability adds when MTs come online mid-to-late June. ⚠️ Commercial GL + workers' comp typically 2-3 weeks via broker — if not in motion by mid-May, June 1 deadline is at risk.",
  },
  {
    item: "Jocelyn (Spa Director) out of town May 16–25 (10 days)",
    owner: "Heather steps in for hiring decisions during absence",
    leadTime: "Coverage gap covers MOST of the pre-launch hiring window",
    impact: "Must finalize headcount target, wage bands, in-flight candidates, and Upswell-staff retention decisions at Thursday's (May 14) site visit BEFORE she leaves. Heather covers hiring decisions while Jocelyn's out.",
  },
  {
    item: "Curtain / temp structure design quality",
    owner: "Allison (mom) leading visual identity + signage. Emily (sister) on curtains/partitions. Allison stepping in harder to take signage off Emily's plate.",
    leadTime: "Material lead times real — order this week or push to Plan C",
    impact: "Gates Plan B viability. Done well = brand asset. Done poorly = brand damage. No middle ground.",
  },
  {
    item: "Mindbody site provisioning",
    owner: "TBD (Sway Mindbody admin)",
    leadTime: "1-2 weeks",
    impact: "Blocks member import, booking, and pricing setup. Needs to be done by May 22 to be safe.",
  },
];

const ACCESS_TRACKER = [
  { platform: "Google Analytics (upswellstudio.com)", type: "Add user", status: "Pending Heather", note: "Add john@swaywellnessspa.com as Admin on the Analytics property" },
  { platform: "Google Business Profile (3636 Blake)", type: "Add John as OWNER", status: "Heather confirmed access", note: "Plan: (1) Heather adds John as OWNER (not Manager) this week — Owner can't be revoked. (2) NO new listing — rebrand the existing one to preserve review history + local rank. (3) Submit Upswell → Sway rename request June 1 AM (Google approval can take 3-5 days). Update categories for recovery-led format at same time." },
  { platform: "Google Business Profile (2271 Clinton)", type: "Add John as OWNER", status: "Heather confirmed access", note: "Same plan as RiNo GBP — Owner role this week, rename request June 1 AM." },
  { platform: "Google Ads", type: "Skip", status: "N/A", note: "Heather confirmed no active campaigns since Q3 2025" },
  { platform: "Google Search Console", type: "Skip", status: "N/A", note: "Heather confirmed Upswell never had one" },
  { platform: "Instagram @upswellstudio", type: "Coordination only", status: "✓ N/A", note: "Don't ask for admin. Heather owns the brand voice + account. Pattern: she drafts with John in shared doc → she posts → John verifies by following public account." },
  { platform: "Facebook (Upswell page)", type: "Coordination only", status: "✓ N/A", note: "Same — Heather posts, John verifies publicly" },
  { platform: "TikTok @upswellstudio", type: "Coordination only", status: "✓ N/A", note: "Same — Heather posts, John verifies publicly" },
  { platform: "Loopz (gift cards)", type: "Add user OR send report", status: "Pending Heather", note: "If access not granted, request export: card ID + customer email + original $ + balance + issue date" },
  { platform: "BrandBot (email)", type: "Add user (optional)", status: "Pending Heather", note: "Heather sends emails herself. Sway access useful for stats + coordination but not blocking." },
  { platform: "upswellstudio.com — Squarespace", type: "Banner + landing page (done by Heather)", status: "✓ Done by Heather May 16-17", note: "Heather went above and beyond — added a transition banner to upswellstudio.com AND built a landing page on her site with the announcement info. No Contributor invite needed for Sway side; can revisit if we want to update content later." },
  { platform: "Mariana Tek", type: "Already have access", status: "✓ Done", note: "Marty granted access earlier" },
  { platform: "Stripe (Heather's account)", type: "Out of scope", status: "✓ N/A", note: "May 25 update: Stripe Data Migration Request was never initiated and is now off the table — too late before June 1. Front-desk re-add is the path (see Payment Migration Plan). Heather's Stripe stays as-is through Mariana Tek's extended runway." },
  { platform: "Ring cameras", type: "New Sway account", status: "Joel/Emily", note: "Hardware stays. New Sway-owned account on existing devices." },
  { platform: "Sonos", type: "New Sway account", status: "Joel/Emily", note: "Hardware stays. New Sway-owned account." },
  { platform: "Xfinity (Wi-Fi)", type: "New account via Sway Larimer rep", status: "Emily", note: "Existing hardware. Emily reaches out to Larimer Xfinity rep." },
];

const STAFFING_QUESTIONS = [
  {
    role: "Wellness Associates (RiNo + Central Park combined)",
    question: "Target headcount: 14-17 hourly Wellness Associates + 1 Wellness Team Lead at Larimer hours. 6 retained from Upswell — need to hire 8-11 more.",
    context: "Per Heather's May 14 doc. Existing 6: Mackenzie Miller (Operations Lead → Transition Lead, $24/hr) + 5 Wellness Crew at $20/hr (George Jay Mayberry, Madeleine Medley, Kyana Cook, Sarah Hathaway, Halle Nicholas). All retained. Heather + Jocelyn agreed; Heather will help fill schedule by Jocelyn's return.",
    decision: "RETAIN ALL 6 ✓ · Hire 8-11 more by ~mid-to-late June to cover Larimer-equivalent hours",
  },
  {
    role: "Transition Lead (Mackenzie Miller)",
    question: "4-part Sway training plan during quiet launch May 18-26 — covers Jocelyn's absence",
    context: "(1) SpaStream — Jess identifies modules; (2) Mindbody training — Whitney; (3) Front Desk scripting — Emily; (4) Sway Shadow Shifts — Heavon. Mackenzie up to speed when Jocelyn returns, can help train new hires.",
    decision: "Locked May 14",
  },
  {
    role: "Massage therapists",
    question: "How many to hire per location for opening week, and what's the pipeline status?",
    context: "Going from yoga instructors → massage therapists is a different hire entirely. Cross-staffing from Sway Larimer is NOT viable — Larimer already running thin. Emily interviewed someone today but didn't know Upswell's existing team might be inherited (Jocelyn hadn't communicated this). Pipeline status to be reviewed at Thursday's site visit. Realistic minimum: 2-3 MTs per location for a 6-day operating schedule.",
    decision: "Pipeline review Thursday May 14",
  },
  {
    role: "Estheticians",
    question: "Hire for Phase 2 (facials launch) or wait until closer to Phase 2 open?",
    context: "Sway has 2 facial chairs at the new locations. Phase 2 launches Aug/Sept. Estheticians have a different hiring cycle than MTs.",
    decision: "Likely Phase 2 prep starting July",
  },
];

const KNOWN_WAGES = [
  { role: "Front desk reps", upswellRate: "Denver minimum wage" },
  { role: "Front desk manager", upswellRate: "$24/hr" },
  { role: "Massage therapists", upswellRate: "N/A (Upswell had no MTs)" },
  { role: "Estheticians", upswellRate: "N/A (Upswell had no estheticians)" },
];

const THURSDAY_SITE_VISIT_AGENDA = {
  date: "Thursday May 14",
  why: "Last in-person window before Jocelyn leaves Friday. Must lock down hiring + buildout decisions today.",
  attendees: "Heather, Jocelyn, Allison (mom), Emily (sister) — note: keep agenda focused, Emily is stretched thin",
  agenda: [
    "Headcount target per location (FD reps, FD manager, MTs)",
    "Wage bands locked (use Upswell base rates: min wage for FD, $24/hr for manager)",
    "Decision: keep which existing Upswell FD staff vs. replace?",
    "Hand off any in-flight candidate interviews to Heather for the next 10 days while Jocelyn is out",
    "Walk Emily through the physical space (gentle — she's working from photos and is stretched)",
    "Punch list for buildout: signage, curtains, partitions, drywall, pillars — what physically must happen by which date?",
    "Confirm Allison takes signage + visual identity lead (off Emily's plate)",
    "🔑 IP scope verification: Marty says agreement gives us Upswell IP for 6 months — pull the exact schedule from the purchase agreement to confirm (domain, trademarks, social handles all in scope?). Decide what happens at end of 6 months.",
    "ACCESS Heather grants John: (a) Upswell email marketing platform, (b) upswellstudio.com domain registrar, (c) @upswellstudio social handles (IG / FB / TikTok), (d) Upswell's Google Ads account if it exists, (e) Upswell's Google Analytics, (f) Upswell's Google Search Console",
    "Confirm: did Upswell run Google Ads? If yes — those campaigns need to be PAUSED before May 15 so they don't keep spending against a dying brand",
    "Ring camera account: who owns it? Does it transfer with the business / lease, or do we take over the account?",
    "Sound system walkthrough — what's in place, can it be repurposed?",
    "Payment terminals — current hardware, can it work with Mindbody?",
    "Confirm Upswell's payment processor (Mariana Tek = Stripe — what about retail / gift card processing?)",
    "Mariana Tek shutdown date — when do we fully turn it off post-migration?",
    "Did Upswell run Google Ads? If yes, we need to PAUSE those campaigns before May 15 so they don't keep spending against a dying brand. Also: who has the ad account access?",
    "Does Upswell have Google Analytics set up on upswellstudio.com? Historical traffic data is gold for transition planning. Grant Sway analytics access if so.",
    "Does Upswell have Google Search Console set up? Take ownership so we can manage SEO migration cleanly.",
  ],
};

// John's personal task list — organized by week
// John's personal task list — May 20 revision (Phase 1 done, Phase 2 holding, Phase 3 fires when massage+facials open)
const MY_LIST = [
  {
    phase: "Phase 0 — Already done (May 15)",
    color: "emerald",
    tasks: [
      { task: "Send Email 01a (Heather member announcement · $99 Sway Remedy Lounge Unlimited) — May 15 noon ✓", status: "done", dep: "" },
      { task: "Send Email 01b (Heather non-member announcement · $99 lock-in CTA) — May 15 noon ✓", status: "done", dep: "" },
      { task: "Send Email 12 (Yoga graceful offboarding · 357 yoga loyalists) — May 15 PM ✓", status: "done", dep: "" },
      { task: "Homepage announcement banner deployed ✓", status: "done", dep: "" },
      { task: "Blog post: A New Chapter for Sway ✓", status: "done", dep: "" },
      { task: "Upswell social posts (Heather voice) — May 15 ✓", status: "done", dep: "" },
      { task: "Transition banner + landing page on upswellstudio.com — DONE by Heather May 16-17", status: "done", dep: "" },
    ],
  },
  {
    phase: "Phase 1 — This week (May 25 → June 1) · Mindbody-only POS cutover",
    color: "rose",
    tasks: [
      { task: "🔥 TODAY 1PM: Heather + Emily meeting — get space plan from Emily for capacity, align on Email 07 rewrite, lock final June 1 plan", status: "in-progress", dep: "" },
      { task: "✓ Status confirmed (May 25 AM): Mindbody site is UP. Treatments already set up at both RiNo + CP. John has MT access. Email 03 did NOT send (officially killed).", status: "done", dep: "" },
      { task: "🔥 MT DATA — John pulls this week: per-member last billed date + cycle + 90-day visit frequency. Also: include any new members from Heather's $99 last-chance offer.", status: "pending", dep: "" },
      { task: "🔥 $99 DROP AUDIT — Verify MT actually charged $99 in late-May cycles for members previously at $129/$159/$189. Email 01a promised effective May 16. If old rates ran, owe credits.", status: "pending", dep: "MT data pull" },
      { task: "🔥 LOUNGE SESSION TYPE — Set up new 'Sway Remedy Lounge' session type at both locations (90 min, capacity per locked decision from 1pm meeting). Archive the legacy 40-min Remedy Room session that's currently there (carried over from Larimer site setup).", status: "pending", dep: "1pm capacity decision" },
      { task: "🔥 MEMBER IMPORT — Import all 155 active members + Heather's $99 last-chance offer members. For each, set first-bill-date = (last MT bill + cycle length). Card-on-file empty until they visit.", status: "pending", dep: "MT data pulled" },
      { task: "🔥 BOOKING SITE — Build /book routes for new locations on swaywellnessspa.com (clone Larimer pattern, swap Mindbody site IDs). Treatments already exist in Mindbody.", status: "pending", dep: "Mindbody session types live" },
      { task: "🔥 BOOKING SITE — Build /book-remedy-lounge route at both new locations for the new 90-min Lounge bookings", status: "pending", dep: "Lounge session type live" },
      { task: "🔥 EMAIL 07 REWRITE — Pull the card-re-add line from P.S. into the body. Email 03 didn't go, so Email 07 has to do that work alone.", status: "pending", dep: "" },
      { task: "🔥 FRONT DESK — Mackenzie: time the Mindbody card-add flow end-to-end. Target <60 sec. Train all front-desk before June 1.", status: "pending", dep: "" },
      { task: "🔥 END-TO-END TEST — Booking flows on the live site (Lounge + massage + facial). Thu/Fri May 28-29.", status: "pending", dep: "Booking routes live" },
      { task: "Heather completes 4 personal calls to yoga-heavy active members (Jessica, Gregory, Christina, Nathan)", status: "pending", dep: "" },
      { task: "Build /membership page — Sway Unlimited tier ($99) alongside standard Sway Membership ($99). Both tiers visible on new location pages + main /membership.", status: "pending", dep: "" },
      { task: "Real RiNo + Central Park photos into the two location pages (replace SWAY.jpg placeholder)", status: "pending", dep: "photos from John" },
      { task: "Photo media kit folder ready for the Phase 3 PR moment", status: "pending", dep: "photos available" },
      { task: "GBP — get added as OWNER (not Manager) on both 3636 Blake + 2271 Clinton listings. Heather has access.", status: "pending", dep: "" },
      { task: "Soften homepage banner copy — remove any 'massage at launch' implication; lead with 'expanding to RiNo + Central Park'", status: "pending", dep: "" },
      { task: "🔥 SUN MAY 31 MIDNIGHT — MT shutdown. Hard cut. Data reconciliation: all members in Mindbody, all May MT charges recorded.", status: "pending", dep: "Mindbody import complete" },
    ],
  },
  {
    phase: "June 1 — Logo swap day",
    color: "emerald",
    tasks: [
      { task: "Send Email 07 (Heather launch-day welcome, light) Mon June 1 at 6 AM — short note, no booking promise", status: "pending", dep: "" },
      { task: "Flip LocationsContent.tsx status from 'coming-soon' → 'open' for both locations", status: "pending", dep: "" },
      { task: "Remove 'Opening June 2026' badges from location pages", status: "pending", dep: "" },
      { task: "Add 'Open now' indicator + current hours to location pages (mirror Larimer pattern)", status: "pending", dep: "hours decided" },
      { task: "Signage swap on both buildings (Upswell → Sway)", status: "pending", dep: "signage delivered" },
      { task: "Daily monitoring: member reply volume, deliverability, walk-in foot traffic", status: "pending", dep: "" },
    ],
  },
  {
    phase: "Phase 2 — Holding pattern (June 1 → massage + facials open)",
    color: "amber",
    tasks: [
      { task: "💳 Daily monitoring: how many members visited + re-added card. Target ~50% by end of week 1, ~80% by week 3.", status: "pending", dep: "" },
      { task: "💳 Mid-June reminder email to active members who haven't visited yet — 'come in for your free first visit, we'll get you set up.'", status: "pending", dep: "" },
      { task: "💳 Mid-July dormant-active-member re-engagement email — for members who STILL haven't visited 30+ days post-launch. Last nudge before evaluating churn.", status: "pending", dep: "" },
      { task: "💳 Billing edge case rule applied at front desk: if member's MT cycle already ended before they re-add, comp the gap and start billing from re-add date (~$1-2K total cost across 155 members, eliminates 'you're already late!' awkwardness)", status: "pending", dep: "" },
      { task: "Massage establishment license — track FBI fingerprint clearance progress with Marty", status: "pending", dep: "" },
      { task: "Curtain + treatment-suite buildout completion (Emily + Allison)", status: "pending", dep: "" },
      { task: "Massage therapist hiring — at least 2-3 per location for opening week", status: "pending", dep: "Jocelyn return" },
      { task: "Esthetician hiring for facials launch (paired with massage)", status: "pending", dep: "" },
      { task: "NO marketing campaigns during this window. Sway Remedy Lounge operates as usual. Word-of-mouth only.", status: "pending", dep: "" },
    ],
  },
  {
    phase: "Phase 3 — Real launch (when massage + facials open, mid-to-late June)",
    color: "emerald",
    tasks: [
      { task: "Send Email 08 (Phase 3 public launch · $40 off) to 4,470 opted-in non-members — ON THE DAY booking opens", status: "pending", dep: "massage + facials bookable" },
      { task: "Update location pages — swap waitlist mailto for real booking links on massage + facial cards", status: "pending", dep: "Mindbody live" },
      { task: "Publish Phase 3 blog post on /blog (Sway is open at RiNo + CP with massage + facials)", status: "pending", dep: "" },
      { task: "Press distribution — Tier 1 reporters (CPR, Denverite, BusinessDen, Denver Post, 5280, Athletech, Salon Today)", status: "pending", dep: "press contacts confirmed" },
      { task: "Launch paid Google Ads geo-targeted to RiNo / Central Park zips (80205, 80238, 80045, 80010)", status: "pending", dep: "ad budget approved" },
      { task: "Launch paid Meta Ads — same geo targeting", status: "pending", dep: "ad budget approved" },
      { task: "Send Email 09 (Lost re-engagement) ~1 week after Email 08", status: "pending", dep: "" },
      { task: "Send Email 10 (At Risk re-engagement) ~2 weeks after Email 08", status: "pending", dep: "" },
      { task: "Send Email 11 (ClassPass conversion) ~3 weeks after Email 08", status: "pending", dep: "" },
      { task: "Sway-channel social push begins — IG / FB / TikTok carousel + Heather Q&A reel", status: "pending", dep: "" },
    ],
  },
  {
    phase: "Post-launch (July+)",
    color: "amber",
    tasks: [
      { task: "Set up 301 redirects: upswellstudio.com → swaywellnessspa.com (after 30-60 day soft transition)", status: "pending", dep: "Heather approval" },
      { task: "Mariana Tek full POS shutdown — verify all members in Mindbody, then cut over", status: "pending", dep: "30 days clean Mindbody data" },
      { task: "SEO migration monitoring — Search Console + Analytics for both old and new domain", status: "pending", dep: "GSC + GA access" },
      { task: "Pull first reviews into Mindbody/GBP for both new locations", status: "pending", dep: "" },
      { task: "Add aggregateRating + reviews to DaySpa JSON-LD on location pages (once 10+ Google reviews)", status: "pending", dep: "" },
      { task: "GA4 funnel exploration for new locations (per CLAUDE.md TODO)", status: "pending", dep: "post-launch data" },
      { task: "Decide on Aescape — when/if to bring to the new locations (or skip)", status: "pending", dep: "" },
    ],
  },
];

const OPERATIONAL_CHECKLIST = [
  {
    category: "Brand + digital channels (cooperative with Heather)",
    items: [
      { task: "Posts on @upswellstudio social — Heather posts in her voice, drafted with Sway team. See Content tab for the May 15 drafts.", owner: "Heather (posts) + John (drafts)" },
      { task: "Customer email lists imported into Sway's email platform. Heather has shared POS access; segmented CSVs are in /docs/upswell-conversion/data/.", owner: "John" },
      { task: "Physical signage at the Store stays 'Upswell' during the transition; convert to 'Sway by Spavia' branding within the ~6-month window.", owner: "John + Allison (signage timing)" },
      { task: "30-60 days post-launch, coordinate with Heather on website redirect from upswellstudio.com → swaywellnessspa.com.", owner: "John + Heather" },
    ],
  },
  {
    category: "Brand / digital cleanup",
    items: [
      { task: "Turn off Upswell's marketing automations BEFORE May 15 announcement so they don't fire conflicting messages during transition", owner: "John (needs platform access)" },
      { task: "Pause any active Upswell Google Ads campaigns before May 15. If Sway has ad account access (likely via the IP transfer), pause from there. Otherwise Heather pauses.", owner: "John or Heather" },
      { task: "Get access to Upswell's Google Analytics property on upswellstudio.com. Historical traffic data is valuable for transition planning + helps inform paid media targeting.", owner: "John (needs Heather to grant)" },
      { task: "Take ownership of Upswell's Google Search Console property for upswellstudio.com. Critical for managing the SEO migration cleanly.", owner: "John (needs Heather to grant)" },
      { task: "Plan Mariana Tek FULL SHUTDOWN date — May 25 revision: MT acts as billing bridge through ~mid-June while members re-add cards to Mindbody at front desk. Hard cutover when Mindbody coverage hits ~80% of active members. Depends on Heather extending MT admin past May 31.", owner: "John + Heather" },
      { task: "Submit GBP rename request (Upswell → Sway) June 1 AM at both listings. Google approval typically 3-5 days. Preserves reviews + local rank. Update categories for recovery-led format.", owner: "John (Owner role granted by Heather this week)" },
      { task: "Confirm Sway GBP categories are set up correctly for the recovery-led format", owner: "John" },
    ],
  },
  {
    category: "Member experience setup (Mindbody)",
    items: [
      { task: "Set up Sway Unlimited as a Mindbody Pricing Option (unlimited bookings of session type 96 + new individual modality session types — cold plunge, sauna, infrared, compression)", owner: "Mindbody admin" },
      { task: "Honor existing Upswell gift cards: most recent ones in Loopz (need Heather access), older ones in Mariana Tek (have access). Combine into one mapping CSV: original_card_id, source, customer email, original_balance, new_sway_card_id, issued_date. Re-issue in Mindbody as gift cards (NOT 'on account' — Heather is firm on this). Maintain the mapping permanently for audit.", owner: "John (needs Loopz access from Heather)" },
      { task: "Pull Upswell's existing discount / promo code list from POS — decide which carry over to Sway", owner: "John" },
      { task: "Front desk training on Mindbody POS — gift cards, member lookup, discounts, walk-in flow", owner: "Jocelyn (or Heather while Jocelyn out)" },
    ],
  },
  {
    category: "Physical infrastructure — Sway sets up its own",
    items: [
      { task: "Wi-Fi: new Sway-owned Xfinity (Comcast) account at both locations. Emily reaches out to Sway Larimer's Xfinity rep to get the new service set up. Hardware can stay; account is fresh.", owner: "Emily" },
      { task: "Ring cameras: new Sway Ring account from scratch. Existing hardware works with any Ring account — set up new Sway login, claim the devices.", owner: "John" },
      { task: "Sonos: new Sway Sonos account. Sonos hardware persists across accounts — set up + claim.", owner: "John" },
      { task: "Payment terminals — current hardware, can it work with Mindbody Payments? Or new terminals needed?", owner: "John + Mindbody / Katie" },
      { task: "Point-of-sale infrastructure — Mindbody connects to printers / barcode scanners / cash drawer cleanly?", owner: "John + Mindbody admin" },
    ],
  },
  {
    category: "Partnerships",
    items: [
      { task: "ClassPass listing migration — KEEP with individual-modality offerings (decided May 12)", owner: "Heather" },
      { task: "Wellhub (Gympass) — SUNSET with 30+ day notice (decided May 12)", owner: "Heather" },
      { task: "Gravity Haus — CONTRACTUALLY LOCKED per Schedule 1.C of APA: Sway must offer $99/mo membership to qualifying GH members through July 31, 2026. GH pays Seller $50/qualifying-member/mo in May-June. Re-evaluate after July 31.", owner: "Heather + Marty" },
      { task: "Other local brand partnerships (Mach 983, Hayes, Lululemon, F45, etc.) review — keep / sunset / negotiate per partnership-decisions.md. Wellhub remains 'sunset' per earlier decision.", owner: "Heather + Marty" },
      { task: "Pitch EGYM Wellpass — net-new B2B channel different from Wellhub's audience", owner: "Marty" },
    ],
  },
];

const CONSTRUCTION_TIMING = {
  question: "When do we install curtains, partitions, signage — during open hours, off-hours, or hybrid?",
  options: [
    {
      label: "During open hours",
      pros: "Cheap labor, normal workday schedule",
      cons: "Loud, disruptive to current members in the recovery space, members notice the chaos and lose confidence",
      verdict: "Bad for member experience during the transition window — when retention matters most",
    },
    {
      label: "Off-hours only (overnight / early AM)",
      pros: "Zero member-facing disruption",
      cons: "Overtime labor cost, slower if same crew (fatigue)",
      verdict: "Safe but slow — risks the timeline",
    },
    {
      label: "Hybrid: light prep daytime, heavy construction at night",
      pros: "Best of both. Curtain track mounting + signage placement can be done midday (low-impact). Drywall, sanding, electrical at night.",
      cons: "Requires coordination between sister, contractor, and operations",
      verdict: "RECOMMENDED. Standard retail-conversion playbook.",
    },
  ],
};

const LOCAL_PARTNERSHIPS_TO_PURSUE = [
  { name: "Xcel Energy", type: "Major Denver employer", note: "Corporate wellness benefit discount tier" },
  { name: "Davis Graham", type: "Law firm", note: "Professional services partnership" },
  { name: "Catbird Hotel", type: "Hospitality / hotel", note: "Guest day-pass partnership or perks" },
  { name: "Volo Sports", type: "Social/recreational league", note: "Member discount, sponsorship?" },
  { name: "Nearby apartment buildings", type: "Resident perks", note: "RiNo & Stapleton/Central Park residential. Lots of new buildings nearby — concierge tier." },
];

const NEW_CAMPAIGNS = [
  {
    date: "Mid-July (~July 15)",
    title: "🆕 Dormant active-member re-engagement",
    audience: "Active members who have NOT visited in their first 30+ days of Sway (segmented from MT visit data + Mindbody check-ins post-June 1)",
    goal: "Active members paying $99 who never came in to re-add their card / use the space. They're the easiest revenue saves — already paying, just disengaged. Single send (Heather voice from Sway domain): 'You're a member but we haven't seen you in a while. Sway is open with new massage + facials. Come use what you're paying for. First visit is on us.' If still no visit by 60 days, evaluate for soft churn / proactive cancellation outreach.",
    status: "Plan — fires after Phase 3 launch when massage + facials are open (mid-to-late June + 30 days)",
  },
  {
    date: "2026-05-31",
    title: "In-person membership sign-up event",
    audience: "Active members + interested locals",
    goal: "Live demo of the space + on-the-spot membership sign-ups",
    status: "Idea — confirm space readiness or push to later date",
  },
  {
    date: "2026-06-15",
    title: "🆕 Soft member referral (quiet-period growth)",
    audience: "Existing Sway Wellness Club members",
    goal: "Member refers a friend → friend gets first recovery session free (or first month $49). Member gets a Larimer credit or comparable perk. Costs nothing, seeds word-of-mouth before the mid-July/mid-Aug public PR push. Not aggressive — just present in the dashboard / welcome email.",
    status: "Idea added May 14 — confirm exact perk + build into member welcome flow",
  },
  {
    date: "2026-06-05",
    title: "🆕 June: take over Upswell email list at Sway",
    audience: "Inherited 4,628 marketing-opted-in (Upswell) + segmented sub-lists",
    goal: "On June 1, Sway entity owns the email list per APA. Run June campaigns directly from Sway email infrastructure (Klaviyo or BrandBot or whatever the choice is). Highest-priority segments to re-engage: (1) opted-in non-members who didn't claim the $99 founding rate before June 1 (now standard $129 pitch), (2) Lost / At Risk recovery-loyal segments (1,406 + 3,519, filtered to recovery-heavy for highest convert rate), (3) ClassPass converters (314), (4) the 357 yoga loyalists with a soft re-engagement framed around recovery now that they've had time to process. Plus founding-member list from /sway-club + MT signups as a nurture audience.",
    status: "Plan in concept — design specific campaigns post-launch when we have baseline metrics from the May 15 send",
  },
  {
    date: "2026-08-15",
    title: "Back-to-school re-engagement",
    audience: "Lost + At Risk + dormant members",
    goal: "Membership offer starting when school starts. Hits the September routine-reset moment.",
    status: "Idea — draft in early August",
  },
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
  { n: "01a", date: "May 15 (sent)", title: "Member announcement — $99 Sway Remedy Lounge Unlimited (FINAL from Heather)", to: "Active members · 155 (transactional)", path: "email-01a-may15-members.md" },
  { n: "01b", date: "May 15 (sent)", title: "Non-member announcement — Reserve $99 rate via Mariana Tek (FINAL from Heather)", to: "Marketing-opted-in deduped · 4,146", path: "email-01b-may15-nonmembers.md" },
  { n: "12", date: "May 15 PM (sent)", title: "Yoga loyalist offboarding + River Yoga offer", to: "Yoga loyalists · 357", path: "email-12-may15-yoga-offboarding.md" },
  { n: "03", date: "May 22", title: "Member details + first-week guide (4 versions)", to: "Active members · split by tier · 155", path: "email-03-may22-members-segmented.md" },
  { n: "07", date: "Jun 1", title: "Launch day member welcome (Heather, light)", to: "Active members · 155", path: "email-07-june01-member-welcome.md" },
  { n: "08", date: "When massage + facials open", title: "Public launch — Phase 3 kickoff", to: "Opted-in non-members · 4,470", path: "email-08-june02-public-launch.md" },
  { n: "09", date: "~1 wk after Email 08", title: "Re-engagement (Lost)", to: "Lost · 1,406", path: "email-09-june08-reengagement-lost.md" },
  { n: "10", date: "~2 wks after Email 08", title: "Re-engagement (At Risk)", to: "At Risk · ~2,500", path: "email-10-june17-reengagement-atrisk.md" },
  { n: "11", date: "~3 wks after Email 08", title: "ClassPass conversion", to: "ClassPass users · 314", path: "email-11-june22-classpass-conversion.md" },
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

/* ---------------------------------------------
   DATE SORT HELPER — turns any of our date string
   formats into an ISO-ish sort key
--------------------------------------------- */

const MONTH_MAP: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

function dateToSortKey(date: string): string {
  if (!date) return "9999-12-31";
  if (date === "Done") return "2024-01-01";
  if (date.startsWith("By ")) return dateToSortKey(date.substring(3));
  if (date.includes("Late Jun") || date.includes("PR push")) return "2026-06-25";
  if (date.includes("Mid-July") || date.includes("July")) return "2026-07-15";
  if (date.includes("Aug/Sept") || date.includes("August")) return "2026-09-01";
  if (date.includes("Post-launch")) return "2026-08-01";
  if (date.includes("After 30-60 days")) return "2026-07-15";

  const months = Object.keys(MONTH_MAP).join("|");
  const re = new RegExp(`^(${months})\\s+(\\d+)`, "i");
  const match = date.match(re);
  if (match) {
    const monthStr = match[1].charAt(0).toUpperCase() + match[1].slice(1, 3).toLowerCase();
    const month = MONTH_MAP[monthStr];
    if (month) {
      const day = match[2].padStart(2, "0");
      let sub = "00";
      if (date.match(/AM/i)) sub = "06";
      else if (date.match(/noon/i)) sub = "12";
      else if (date.match(/PM/i)) sub = "16";
      return `2026-${month}-${day} ${sub}`;
    }
  }

  if (date.match(/^\d{4}-\d{2}-\d{2}/)) return date;
  return "9999-12-31";
}

export default function UpswellDashboard() {
  const [tab, setTab] = useState<"overview" | "lounge" | "calendar" | "mylist" | "emails" | "content" | "campaigns" | "segments" | "pricing" | "blockers" | "docs">("overview");
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
            {(["overview", "lounge", "calendar", "mylist", "emails", "content", "campaigns", "segments", "pricing", "blockers", "docs"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition border-b-2 ${
                  tab === t
                    ? "border-[#113D33] text-[#113D33]"
                    : "border-transparent text-[#113D33]/50 hover:text-[#113D33]"
                }`}
              >
                {t === "mylist" ? "My List" : t === "lounge" ? "🛋️ Lounge Decision" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {tab === "overview" && <OverviewTab />}
        {tab === "lounge" && <LoungeTab />}
        {tab === "calendar" && <CalendarTab today={today} />}
        {tab === "mylist" && <MyListTab today={today} />}
        {tab === "emails" && <EmailsTab />}
        {tab === "content" && <ContentTab />}
        {tab === "campaigns" && <CampaignsTab today={today} />}
        {tab === "segments" && <SegmentsTab />}
        {tab === "pricing" && <PricingTab />}
        {tab === "blockers" && <BlockersTab />}
        {tab === "docs" && <DocsTab />}
      </div>

      <footer className="border-t border-[#113D33]/10 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-xs opacity-50">
          Internal dashboard · noindex · Last updated May 27 2026 · Source: <code className="bg-black/5 px-1.5 py-0.5 rounded">docs/upswell-conversion/</code>
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

/* ---- Sender timeline (visual) ---- */
function SenderTimeline() {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border border-[#113D33]/10 p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-60 mb-4">Email sender strategy</h2>

      <div className="relative">
        {/* Bar */}
        <div className="flex h-12 rounded-lg overflow-hidden border border-black/10">
          <div className="flex-1 bg-amber-100 flex items-center justify-center px-4">
            <span className="text-xs md:text-sm font-semibold text-amber-900">
              May 15 → May 30 · Upswell domain (Heather / warm sender)
            </span>
          </div>
          <div className="flex-1 bg-emerald-100 flex items-center justify-center px-4">
            <span className="text-xs md:text-sm font-semibold text-emerald-900">
              June 1 → onward · Sway domain (transition complete)
            </span>
          </div>
        </div>

        {/* Switchover marker */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex flex-col items-center justify-center pointer-events-none">
          <div className="w-0.5 h-full bg-[#113D33]/40 absolute" />
          <div className="bg-[#113D33] text-white text-xs px-2 py-0.5 rounded font-semibold relative -top-7">
            Launch · June 1
          </div>
        </div>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-3 text-xs opacity-80">
        <div className="border-l-2 border-amber-400 pl-3">
          <b>Pre-launch (5 emails)</b> from a warm, recognized sender. List opted in to Upswell, knows Heather&apos;s voice. Maximum trust, best deliverability.
        </div>
        <div className="border-l-2 border-emerald-400 pl-3">
          <b>Post-launch (6 emails)</b> from Sway sender. By June 1 recipients have received 5+ messages from Heather about Sway — Sway brand is no longer cold.
        </div>
      </div>

      <p className="text-[11px] opacity-60 mt-4">
        Legal note: CAN-SPAM marketing consent transfers in a business handover. The May 15 announcement is the required notice of the change. No fresh opt-in needed.
      </p>
    </div>
  );
}

/* ---- Daily status — top of dashboard (edit DAILY_STATUS constant each day) ---- */
function DailyStatus() {
  return (
    <div className="md:col-span-2 bg-gradient-to-br from-emerald-50 to-sky-50 rounded-xl border-2 border-emerald-500 p-6">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
        <h2 className="text-sm uppercase tracking-wider font-bold text-emerald-900">📅 Daily Status · {DAILY_STATUS.date}</h2>
        <span className="text-[10px] font-mono opacity-60 bg-white px-2 py-0.5 rounded border border-emerald-300">Updated daily</span>
      </div>
      <p className="text-base font-medium leading-snug mb-4">{DAILY_STATUS.headline}</p>

      <div className="bg-white rounded-lg p-4 border border-emerald-200 mb-4">
        <h3 className="text-xs uppercase tracking-wider opacity-70 mb-2">Timeline framing</h3>
        <ul className="space-y-1.5 text-sm">
          {DAILY_STATUS.framing.map((f, i) => (
            <li key={i} className="opacity-90">{f}</li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-lg p-4 border border-amber-300">
          <h3 className="text-xs uppercase tracking-wider font-bold text-amber-900 mb-2">⏳ Pending / awaiting</h3>
          <ul className="space-y-2.5 text-xs">
            {DAILY_STATUS.pending.map((p, i) => (
              <li key={i} className="border-b border-amber-100 last:border-b-0 pb-2 last:pb-0">
                <div className="font-bold">{p.label}</div>
                <div className="opacity-80 mt-0.5">{p.detail}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider font-mono inline-block bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">{p.owner}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg p-4 border border-emerald-300">
          <h3 className="text-xs uppercase tracking-wider font-bold text-emerald-900 mb-2">✅ Decisions locked today</h3>
          <ul className="space-y-1.5 text-xs">
            {DAILY_STATUS.decisionsLockedToday.map((d, i) => (
              <li key={i} className="opacity-90">{d}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-sky-300">
        <h3 className="text-xs uppercase tracking-wider font-bold text-sky-900 mb-2">🚀 What's next</h3>
        <ul className="space-y-1 text-xs">
          {DAILY_STATUS.whatsNext.map((w, i) => (
            <li key={i} className="flex gap-2"><span className="text-sky-600 mt-0.5">→</span><span className="opacity-90">{w}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---- Historical: May 25 meeting prep (kept for record) ---- */
function MeetingPrep525() {
  return (
    <div className="md:col-span-2 bg-gray-50 rounded-xl border border-gray-300 p-6 opacity-90">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
        <h2 className="text-sm uppercase tracking-wider text-gray-700">{MEETING_525_AGENDA.date}</h2>
        <span className="text-xs font-mono opacity-70 bg-white px-2 py-0.5 rounded border border-gray-300">{MEETING_525_AGENDA.attendees}</span>
      </div>
      <h3 className="text-lg font-bold mb-2">{MEETING_525_AGENDA.title}</h3>
      <p className="text-xs italic opacity-80 mb-4 bg-white p-3 rounded border border-gray-200">{MEETING_525_AGENDA.context}</p>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-4 border border-amber-300">
          <h4 className="text-xs uppercase tracking-wider font-bold text-amber-900 mb-2">✓ Decisions to lock</h4>
          <ul className="text-xs space-y-1.5">
            {MEETING_525_AGENDA.decisionsToLock.map((d, i) => (
              <li key={i} className="flex gap-2"><span className="text-amber-700 mt-0.5">·</span><span className="opacity-90">{d}</span></li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg p-4 border border-amber-300">
          <h4 className="text-xs uppercase tracking-wider font-bold text-amber-900 mb-2">📋 Asks of Heather + Emily</h4>
          <ul className="text-xs space-y-1.5">
            {MEETING_525_AGENDA.asks.map((a, i) => (
              <li key={i} className="flex gap-2"><span className="text-amber-700 mt-0.5">→</span><span className="opacity-90">{a}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-3 bg-white rounded-lg p-4 border border-amber-300">
        <h4 className="text-xs uppercase tracking-wider font-bold text-amber-900 mb-2">Follow-ups (post-meeting, this week)</h4>
        <ul className="text-xs space-y-1.5">
          {MEETING_525_AGENDA.followups.map((f, i) => (
            <li key={i} className="flex gap-2"><span className="text-amber-700 mt-0.5">·</span><span className="opacity-90">{f}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---- Week-of-launch critical path (May 25 → Jun 1) ---- */
function WeekPlan() {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border-2 border-[#113D33] p-6">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
        <h2 className="text-sm uppercase tracking-wider opacity-60">📆 Week of launch — daily critical path</h2>
        <span className="text-xs opacity-70">May 25 → June 1 · 7 days to go</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {WEEK_PLAN.map((d, i) => {
          const isToday = d.day.includes("TODAY");
          const cardClass = isToday
            ? "bg-amber-50 border-2 border-amber-500"
            : i < 4
              ? "bg-white border border-black/10"
              : "bg-emerald-50 border border-emerald-300";
          return (
            <div key={i} className={`rounded-lg p-3 ${cardClass}`}>
              <h3 className={`text-xs font-bold mb-2 ${isToday ? "text-amber-900" : "text-[#113D33]"}`}>{d.day}</h3>
              <ul className="space-y-1.5">
                {d.items.map((item, j) => (
                  <li key={j} className="text-[11px] leading-snug flex gap-1.5">
                    <span className="opacity-40 shrink-0">·</span>
                    <span className="opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Sway Remedy Lounge booking model decision ---- */
function CapacityDecision() {
  return (
    <div className="md:col-span-2 bg-gray-50 rounded-xl border border-gray-300 p-6 opacity-90">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
        <h2 className="text-sm uppercase tracking-wider opacity-60">🛋️ Lounge booking model (historical decision log — see Lounge Decision tab for FINAL)</h2>
        <span className="text-xs font-mono opacity-70 bg-gray-200 text-gray-800 px-2 py-0.5 rounded">{CAPACITY_DECISION.status}</span>
      </div>
      <div className="bg-emerald-50 border-2 border-emerald-500 rounded-lg p-3 mb-4">
        <p className="text-sm font-bold text-emerald-900">⚠️ This section is the historical decision path. The FINAL model (75-min slot, infrared + sauna bookable, $99/$129 pricing) is in the &quot;🛋️ Lounge Decision&quot; tab.</p>
      </div>
      <p className="text-sm opacity-80 mb-4">{CAPACITY_DECISION.question}</p>

      <div className="grid lg:grid-cols-3 gap-3 mb-4">
        {CAPACITY_DECISION.options.map((o, i) => {
          const isLocked = o.label.includes("LOCKED");
          const bg = isLocked
            ? "bg-emerald-50 border-2 border-emerald-500 ring-2 ring-emerald-300 ring-offset-2"
            : o.verdict.toLowerCase().includes("rejected")
              ? "bg-rose-50 border border-rose-200 opacity-70"
              : "bg-gray-50 border border-gray-200 opacity-80";
          return (
            <div key={i} className={`rounded-lg p-4 ${bg}`}>
              <h3 className="font-bold text-xs mb-2">{o.label}</h3>
              <div className="text-[11px] space-y-1.5 mb-2">
                <div><b className="text-emerald-700">+</b> <span className="opacity-90">{o.pros}</span></div>
                <div><b className="text-rose-700">−</b> <span className="opacity-90">{o.cons}</span></div>
              </div>
              <p className="text-[11px] italic font-semibold pt-2 border-t border-black/10">{o.verdict}</p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-300">
          <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-900 mb-2">Implementation (Option C)</h4>
          <ul className="text-xs space-y-1.5">
            {CAPACITY_DECISION.implementation.map((i, idx) => (
              <li key={idx} className="flex gap-2"><span className="text-emerald-600 mt-0.5">·</span><span className="opacity-90">{i}</span></li>
            ))}
          </ul>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-300">
          <h4 className="text-xs uppercase tracking-wider font-bold text-amber-900 mb-2">Open items for 1pm meeting</h4>
          <ul className="text-xs space-y-1.5">
            {CAPACITY_DECISION.openItems.map((i, idx) => (
              <li key={idx} className="flex gap-2"><span className="text-amber-700 mt-0.5">?</span><span className="opacity-90">{i}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 bg-emerald-50 rounded-lg p-4 border-2 border-emerald-300">
        <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-900 mb-2">📐 Capacity numbers — from architectural permit sets</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider opacity-60 border-b border-emerald-200">
                <th className="text-left py-1.5 pr-3">Location</th>
                <th className="text-right py-1.5 pr-3">Total SF</th>
                <th className="text-right py-1.5 pr-3">Lounge SF</th>
                <th className="text-right py-1.5 pr-3">Code Max</th>
                <th className="text-right py-1.5 pr-3">Recommended Cap</th>
                <th className="text-left py-1.5">Equipment</th>
              </tr>
            </thead>
            <tbody>
              {CAPACITY_DECISION.capacityTable.map((row, i) => (
                <tr key={i} className="border-b border-emerald-100 last:border-b-0 align-top">
                  <td className="py-2 pr-3 font-medium">{row.location}</td>
                  <td className="py-2 pr-3 text-right font-mono">{row.totalSF}</td>
                  <td className="py-2 pr-3 text-right font-mono">{row.loungeSF}</td>
                  <td className="py-2 pr-3 text-right font-mono">{row.codeMax}</td>
                  <td className="py-2 pr-3 text-right font-mono font-bold text-emerald-900">{row.recommendedCap}</td>
                  <td className="py-2 text-[11px] opacity-90">{row.equipment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-[11px] italic opacity-70 mt-3 bg-black/[0.03] p-3 rounded">
        <b>Capacity rationale:</b> {CAPACITY_DECISION.capacityContext}
      </p>
    </div>
  );
}

/* ---- Payment Migration Plan (May 25 revision — Mindbody-only POS) ---- */
function PaymentMigrationPlan() {
  return (
    <div className="md:col-span-2 bg-rose-50 rounded-xl border-2 border-rose-400 p-6">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
        <h2 className="text-sm uppercase tracking-wider text-rose-900">💳 Payment migration plan</h2>
        <span className="text-xs font-mono opacity-70 bg-white px-2 py-0.5 rounded border border-rose-200">{PAYMENT_MIGRATION_PLAN.status}</span>
      </div>

      <div className="bg-white rounded-lg p-4 border border-rose-200 mb-4">
        <h3 className="text-xs uppercase tracking-wider font-bold text-rose-900 mb-2">Why the plan changed</h3>
        <p className="text-sm leading-relaxed opacity-90">{PAYMENT_MIGRATION_PLAN.whyChanged}</p>
      </div>

      <div className="bg-white rounded-lg p-4 border border-rose-200 mb-4">
        <h3 className="text-xs uppercase tracking-wider font-bold text-rose-900 mb-3">The path forward</h3>
        <ol className="space-y-3">
          {PAYMENT_MIGRATION_PLAN.thePath.map((p, i) => (
            <li key={i} className="flex gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-200 text-rose-900 font-bold text-xs shrink-0">{p.step}</span>
              <div className="flex-1">
                <div className="font-semibold text-sm">{p.label}</div>
                <div className="text-xs opacity-80 mt-0.5">{p.detail}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-white rounded-lg p-4 border border-rose-200 mb-4">
        <h3 className="text-xs uppercase tracking-wider font-bold text-rose-900 mb-3">Revenue ramp (target: ~$15K/mo from members)</h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider opacity-60 border-b border-rose-200">
              <th className="text-left py-1.5 pr-3">Window</th>
              <th className="text-right py-1.5 pr-3">% of monthly</th>
              <th className="text-left py-1.5">Why</th>
            </tr>
          </thead>
          <tbody>
            {PAYMENT_MIGRATION_PLAN.revenueImpact.map((r, i) => (
              <tr key={i} className="border-b border-rose-100 last:border-b-0">
                <td className="py-1.5 pr-3 font-medium">{r.window}</td>
                <td className="py-1.5 pr-3 text-right font-mono font-bold">{r.expectedPctOfMonthly}%</td>
                <td className="py-1.5 text-xs opacity-80">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-4 border border-rose-200">
          <h3 className="text-xs uppercase tracking-wider font-bold text-rose-900 mb-2">⚠️ Risks</h3>
          <ul className="text-xs space-y-1.5">
            {PAYMENT_MIGRATION_PLAN.risks.map((r, i) => (
              <li key={i} className="flex gap-2"><span className="text-rose-600 mt-0.5">·</span><span className="opacity-90">{r}</span></li>
            ))}
          </ul>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-300">
          <h3 className="text-xs uppercase tracking-wider font-bold text-amber-900 mb-2">📋 Asks (this week)</h3>
          <ul className="text-xs space-y-1.5">
            {PAYMENT_MIGRATION_PLAN.asks.map((a, i) => (
              <li key={i} className="flex gap-2"><span className="text-amber-700 mt-0.5">→</span><span className="opacity-90">{a}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---- Strategic priorities (May 13 PM revision) ---- */
function StrategicPriorities() {
  return (
    <div className="md:col-span-2 bg-[#113D33] text-white rounded-xl p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-70 mb-3">⭐ Strategic priorities (May 13 PM revision)</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-sm font-bold mb-2">🤫 Quiet June 1 launch</h3>
          <p className="text-xs opacity-95 leading-relaxed">
            Members-only comms May 15 → June 1. No Sway-channel public posts. June 1 = quiet operational launch (members notice; public doesn&apos;t). Massage opens mid-to-late June, also quietly. <b>Big PR + social push held for mid-July or mid-August</b> (leaning mid-Aug) when both green wall + retail are in and the space is camera-ready. The story we want when we go public: &quot;the thing you&apos;ve been hearing about is open, and it&apos;s exactly what they said it would be.&quot;
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-sm font-bold mb-2">💎 $99 proactive drop (Option 2)</h3>
          <p className="text-xs opacity-95 leading-relaxed">
            All members move to $99/mo Sway Unlimited regardless of current rate. Members at $129/$159/$189 get a rate DECREASE. Auto-enroll with reply-based opt-out — no &quot;click to confirm&quot; required. <b>This exclusive rate is for current members during transition; new signups later get standard pricing.</b> ~$3K/mo revenue decrease for cleaner ops + stronger loyalty narrative.
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-sm font-bold mb-2">💚 Keep current members happy</h3>
          <p className="text-xs opacity-95 leading-relaxed">
            Main strategic goal through June. Member retention &gt; new acquisition during the transition. Heather&apos;s personal calls to 4 yoga-leaning members + personal note to Terry Wei (annual prepay). All rates drop to $99. Reliable hours. Soft handoff into massage mid-to-late June. Acquisition campaigns wait until the experience is dialed.
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-sm font-bold mb-2">📝 Rollover form (Mindbody gap)</h3>
          <p className="text-xs opacity-95 leading-relaxed">
            Mindbody site won&apos;t be provisioned until <b>~May 25</b>. Gap between May 15 announcement and May 25 Mindbody-ready = members have nowhere to sign up for rollover. Solution: <b>simple form (Typeform / Google Form / hosted page)</b> captures rollover intent + preferences. Imported into Mindbody once provisioned. Build this before May 15.
          </p>
        </div>

        <div className="md:col-span-2 bg-amber-50/15 rounded-lg p-4 border border-white/20">
          <h3 className="text-sm font-bold mb-2">🤝 Brand narrative — &quot;joining forces&quot; not &quot;acquisition&quot;</h3>
          <p className="text-xs opacity-95 leading-relaxed">
            <b>The story we tell:</b> The Upswell wellness clubs at RiNo and Central Park are <b>joining forces with Sway</b>. The locations become <b>Sway Wellness Club</b>. Upswell itself isn&apos;t going away — Heather keeps the brand and is going back to its roots: outdoor yoga, pop-ups, the original Upswell. Summer break, then Upswell returns outside. The two brands coexist naturally — different formats, different teams, friendly handoff. Some Upswell teachers may still use the brand in pop-up settings going forward. This is the framing for every email, every social post, every conversation.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---- Launch scenarios (A / B / C) ---- */
function LaunchScenarios() {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border-2 border-[#113D33]/20 p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-60 mb-2">Launch plan</h2>
      <p className="text-sm opacity-80 mb-5">
        Plan A is the committed plan as of May 13. B and C below were considered earlier and are kept here as a history of the decision — anyone arriving on the dashboard can see what we considered and why we landed where we did.
      </p>

      <div className="grid lg:grid-cols-3 gap-4">
        {LAUNCH_SCENARIOS.map((s) => {
          const bg =
            s.color === "rose" ? "bg-rose-50 border-rose-300" :
            s.color === "emerald" ? "bg-emerald-50 border-emerald-400" :
            "bg-amber-50 border-amber-300";
          const badge =
            s.color === "rose" ? "bg-rose-200 text-rose-900" :
            s.color === "emerald" ? "bg-emerald-300 text-emerald-900" :
            "bg-amber-200 text-amber-900";
          const isRecommended = s.plan === "A";
          return (
            <div key={s.plan} className={`rounded-xl border-2 ${bg} p-4 flex flex-col ${isRecommended ? "ring-2 ring-emerald-500 ring-offset-2" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${badge}`}>
                  {s.plan}
                </span>
                {isRecommended && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-white px-2 py-0.5 rounded">
                    ★ Committed
                  </span>
                )}
              </div>
              <h3 className="font-bold text-sm mb-2">{s.title}</h3>
              <p className="text-xs opacity-80 mb-3">{s.description}</p>

              <div className="mb-2">
                <div className="text-[10px] uppercase tracking-wider opacity-60 mb-1">Pros</div>
                <ul className="text-xs space-y-0.5">
                  {s.pros.map((p, i) => (
                    <li key={i} className="flex gap-1"><span className="text-emerald-600">+</span><span>{p}</span></li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <div className="text-[10px] uppercase tracking-wider opacity-60 mb-1">Cons</div>
                <ul className="text-xs space-y-0.5">
                  {s.cons.map((c, i) => (
                    <li key={i} className="flex gap-1"><span className="text-rose-600">−</span><span>{c}</span></li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-2 border-t border-black/10">
                <div className="text-[10px] uppercase tracking-wider opacity-60 mb-1">Verdict</div>
                <p className="text-xs font-semibold">{s.verdict}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Critical gating items ---- */
function CriticalGating() {
  return (
    <div className="md:col-span-2 bg-rose-50 rounded-xl border-2 border-rose-300 p-6">
      <h2 className="text-sm uppercase tracking-wider text-rose-900 mb-3">🚨 Critical gating items (these set the timeline)</h2>
      <div className="space-y-3">
        {CRITICAL_GATING.map((g, i) => (
          <div key={i} className="bg-white rounded-lg p-4 border border-rose-200">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
              <h3 className="font-bold">{g.item}</h3>
              <span className="text-xs opacity-70"><b>Owner:</b> {g.owner}</span>
            </div>
            <p className="text-xs opacity-80"><b>Lead time:</b> {g.leadTime}</p>
            <p className="text-sm mt-2 font-medium text-rose-900">{g.impact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Curtain design framework ---- */
function CurtainDesign() {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border border-[#113D33]/10 p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-60 mb-3">🎨 Curtain & temp structure design framework</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-emerald-50 rounded-lg p-4 border-2 border-emerald-300">
          <div className="text-xs uppercase tracking-wider font-bold text-emerald-900 mb-2">✓ DONE WELL = brand asset</div>
          <p className="text-sm mb-3 opacity-90">{CURTAIN_DESIGN.doneWell.description}</p>
          <div className="text-[10px] uppercase tracking-wider opacity-60 mb-1">References for sister</div>
          <ul className="text-xs space-y-1">
            {CURTAIN_DESIGN.doneWell.references.map((r, i) => (
              <li key={i} className="flex gap-2"><span className="opacity-50">·</span><span>{r}</span></li>
            ))}
          </ul>
        </div>

        <div className="bg-rose-50 rounded-lg p-4 border-2 border-rose-300">
          <div className="text-xs uppercase tracking-wider font-bold text-rose-900 mb-2">✗ DONE POORLY = brand damage</div>
          <p className="text-sm opacity-90">{CURTAIN_DESIGN.donePoorly.description}</p>
        </div>
      </div>

      <p className="text-xs italic opacity-80 bg-amber-50 border border-amber-200 rounded p-3">
        <b>Important context:</b> {CURTAIN_DESIGN.context}
      </p>
    </div>
  );
}

/* ---- Active member buckets — who needs what ---- */
function ActiveMemberBuckets() {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border-2 border-rose-400 p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-60 mb-2">⚠️ Active members by behavior — who needs special handling</h2>
      <p className="text-sm opacity-80 mb-4">
        Of the 159 active paying members, almost all are recovery users — but <b>4 are yoga-heavy or yoga-only</b> and need a personal call from Heather, not the standard email arc. Plus a 5th personal touch: <b>Terry Wei</b> — single annual prepay — gets a personal note (see below).
      </p>

      <div className="overflow-x-auto -mx-6 px-6 mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider opacity-60 border-b border-black/10">
              <th className="text-left py-2 pr-4">Bucket</th>
              <th className="text-right py-2 pr-4">Count</th>
              <th className="text-left py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {ACTIVE_MEMBER_BUCKETS.map((b, i) => {
              const bg = b.color === "emerald" ? "bg-emerald-50" : b.color === "amber" ? "bg-amber-50" : "bg-rose-50";
              return (
                <tr key={i} className={`border-b border-black/5 ${bg}`}>
                  <td className="py-2 pr-4 font-medium">{b.bucket}</td>
                  <td className="py-2 pr-4 text-right font-mono tabular-nums">{b.count}</td>
                  <td className="py-2 text-xs">{b.action}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 border border-black/10">
        <h3 className="text-sm font-bold mb-2">Free vs paying breakdown across all 159 active members</h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider opacity-60 border-b border-black/10">
              <th className="text-left py-1 pr-3">Bucket</th>
              <th className="text-right py-1 pr-3">Free</th>
              <th className="text-right py-1 pr-3">Paying</th>
              <th className="text-right py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {ACTIVE_MEMBER_FREE_VS_PAYING.map((b, i) => (
              <tr key={i} className="border-b border-black/5">
                <td className="py-1.5 pr-3 font-medium">{b.bucket}</td>
                <td className="py-1.5 pr-3 text-right font-mono">{b.free}</td>
                <td className="py-1.5 pr-3 text-right font-mono">{b.paying}</td>
                <td className="py-1.5 text-right font-mono font-bold">{b.total}</td>
              </tr>
            ))}
            <tr className="font-bold border-t-2 border-black/20">
              <td className="py-1.5 pr-3">TOTAL</td>
              <td className="py-1.5 pr-3 text-right font-mono">51</td>
              <td className="py-1.5 pr-3 text-right font-mono">108</td>
              <td className="py-1.5 text-right font-mono">159</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-rose-50 border-2 border-rose-300 rounded-lg p-4">
        <h3 className="text-sm font-bold text-rose-900 mb-2">📞 The 4 yoga-leaning active members — sorted by call priority</h3>
        <div className="space-y-3">
          {YOGA_HEAVY_ACTIVE_MEMBERS.map((m, i) => {
            const isHighRisk = m.flag.includes("HIGHEST RISK");
            return (
              <div key={i} className={`p-3 rounded ${isHighRisk ? "bg-rose-100 border-2 border-rose-400" : "bg-white border border-rose-200"}`}>
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
                  <h4 className="font-bold text-sm">{m.name} <span className="opacity-60 text-xs">· {m.location}</span></h4>
                  <span className="text-xs font-semibold">{m.rate}</span>
                </div>
                <div className="text-[11px] opacity-80">
                  <div><b>Contract:</b> {m.contract}</div>
                  <div><b>Visits:</b> {m.yoga} yoga / {m.recovery} recovery · <b>Email:</b> <span className="font-mono">{m.email}</span></div>
                </div>
                <div className={`text-xs mt-2 font-medium ${isHighRisk ? "text-rose-900" : ""}`}>{m.flag}</div>
              </div>
            );
          })}
        </div>
        <details className="mt-3">
          <summary className="text-xs font-bold text-rose-900 cursor-pointer">Suggested call script (click to expand)</summary>
          <div className="mt-3 p-3 bg-white rounded text-xs leading-relaxed italic border border-rose-200">
            &quot;Hey {`{name}`}, this is Heather from Upswell. Two reasons I&apos;m calling: we&apos;re becoming Sway on June 1, and I wanted you to hear that from me directly. Second — I know you joined for yoga, and Sway doesn&apos;t have yoga classes. So I want to be honest about that and figure out what would actually work for you. Options: (1) keep your membership — we&apos;re moving everyone to $99/mo Sway Unlimited — and use the recovery space (cold plunge, sauna, compression, red light) which all stays the same. (2) I can refund the rest of your prepaid time. (3) The River Yoga is offering Upswell students $59 for an unlimited month — I&apos;ll send you the private link. CorePower, Yoga Pod, and Kindness are other great options I can introduce you to. What feels right?&quot;
          </div>
          <p className="mt-2 text-[11px] opacity-70 italic">
            Goal: not retention at any cost — it&apos;s respect. Even if they cancel, they leave feeling respected. That&apos;s 4 people who don&apos;t become public complaints.
          </p>
        </details>
      </div>

      <div className="mt-4 bg-emerald-50 border-2 border-emerald-300 rounded-lg p-4">
        <h3 className="text-sm font-bold text-emerald-900 mb-1">📧 Terry Wei — annual prepay edge case (5th personal touch)</h3>
        <p className="text-xs opacity-80 mb-3">
          Single active annual prepay. $1,599 paid upfront (~$133/mo effective) for term ending <b>12/29/2026</b>. Not a yoga member — recovery user — but a unique enough contract that she warrants a personal note so she doesn&apos;t feel like an afterthought when the &quot;everyone gets $99&quot; framing lands.
        </p>
        <div className="bg-white border border-emerald-200 rounded p-3 text-xs leading-relaxed">
          <div className="font-semibold mb-1">Framing (email, from Heather or Marty Thursday eve / Friday AM):</div>
          <p className="italic opacity-90">
            &quot;Terry — wanted to reach out personally before the wider news goes out tomorrow. Your annual membership through Dec 29, 2026 is honored exactly as-is. You&apos;ll have full access to the new Sway Wellness Club locations at no additional cost through the end of your term. When you renew in January 2027, you&apos;ll roll into our member rate of $99/mo. Nothing changes for you in the meantime — we just wanted to make sure you heard it from us directly. Reach out anytime.&quot;
          </p>
        </div>
        <p className="mt-2 text-[11px] opacity-70 italic">
          Lower urgency than the 4 yoga members — recovery user, paid upfront, not a churn flight risk. But the personal note is cheap insurance against confusion.
        </p>
      </div>

      <div className="mt-4 bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
        <h3 className="text-sm font-bold text-amber-900 mb-1">📞 Top mixed members worth a personal note (optional)</h3>
        <p className="text-xs opacity-80 mb-3">
          These 5 mixed-use members use yoga heavily within their mix. They&apos;ll get the May 22 segmented &quot;Mixed&quot; email automatically — but a personal text or note from Heather adds ~15 min and could save high-LTV relationships. All paying, all heavy users.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider opacity-60 border-b border-amber-200">
                <th className="text-left py-1 pr-3">Name</th>
                <th className="text-left py-1 pr-3">Location</th>
                <th className="text-left py-1 pr-3">Rate</th>
                <th className="text-right py-1 pr-3">Yoga</th>
                <th className="text-right py-1 pr-3">Rec</th>
                <th className="text-right py-1">% Yoga</th>
              </tr>
            </thead>
            <tbody>
              {MIXED_PERSONAL_TOUCH_TARGETS.map((m, i) => (
                <tr key={i} className="border-b border-amber-100">
                  <td className="py-1.5 pr-3 font-medium">{m.name}</td>
                  <td className="py-1.5 pr-3">{m.location}</td>
                  <td className="py-1.5 pr-3 font-mono">{m.rate}</td>
                  <td className="py-1.5 pr-3 text-right font-mono">{m.yoga}</td>
                  <td className="py-1.5 pr-3 text-right font-mono">{m.recovery}</td>
                  <td className="py-1.5 text-right font-mono">{m.yogaPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] opacity-70 italic">
          Suggested text: &quot;{`{name}`} — wanted to make sure you saw the news. We&apos;re wrapping yoga but recovery + new massage continues at your rate. Reply if you want to chat about what works for you. — Heather&quot;
        </p>
      </div>
    </div>
  );
}

/* ---- Behavior buckets (yoga vs recovery) ---- */
function BehaviorBuckets() {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border-2 border-emerald-300 p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-60 mb-2">🧘 Yoga vs recovery — customer behavior analysis</h2>
      <p className="text-sm opacity-80 mb-4">
        From 43,927 check-ins (3,408 unique customers) at Upswell. <b>74% of all check-ins were recovery; only 6% were yoga-dominant.</b> The yoga-loyalist backlash risk is smaller than feared — but the recovery loyalty is enormous.
      </p>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider opacity-60 border-b border-black/10">
              <th className="text-left py-2 pr-4">Bucket</th>
              <th className="text-right py-2 pr-4">People</th>
              <th className="text-right py-2 pr-4">Check-ins</th>
              <th className="text-right py-2 pr-4">Avg/person</th>
              <th className="text-left py-2">Strategy</th>
            </tr>
          </thead>
          <tbody>
            {BEHAVIOR_BUCKETS.map((b, i) => {
              const colorClass =
                b.color === "emerald" ? "bg-emerald-50" :
                b.color === "amber" ? "bg-amber-50" :
                "bg-rose-50";
              return (
                <tr key={i} className={`border-b border-black/5 ${colorClass}`}>
                  <td className="py-2 pr-4 font-medium">{b.bucket}</td>
                  <td className="py-2 pr-4 text-right font-mono tabular-nums">{b.count.toLocaleString()}</td>
                  <td className="py-2 pr-4 text-right font-mono tabular-nums">{b.checkins.toLocaleString()}</td>
                  <td className="py-2 pr-4 text-right font-mono tabular-nums">{b.avgVisits.toFixed(1)}</td>
                  <td className="py-2 text-xs opacity-90">{b.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-3 text-xs">
        <div className="bg-emerald-50 border border-emerald-200 rounded p-3">
          <b className="text-emerald-900">★ Top user:</b> 1,016 check-ins (95% recovery) over the years. At ~4-5 visits/week. Sway Unlimited at $99 is a steal for users like this.
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded p-3">
          <b className="text-rose-900">Yoga-loyalist offboarding:</b> 360 opted-in yoga-loyalists (yoga-only + yoga-heavy) saved to <code className="bg-white px-1 rounded">10-yoga-loyalists-offboarding-357.csv</code>. Graceful offboarding email only — no re-engagement spam.
        </div>
      </div>
    </div>
  );
}

/* ---- Staffing questions ---- */
function StaffingQuestions() {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border border-[#113D33]/10 p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-60 mb-3">👥 Staffing — open decisions</h2>

      <div className="bg-amber-50 border border-amber-200 rounded p-3 mb-4">
        <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">Known Upswell wage rates (reference for Sway offers)</h3>
        <table className="w-full text-xs">
          <tbody>
            {KNOWN_WAGES.map((w, i) => (
              <tr key={i} className="border-b border-amber-100 last:border-b-0">
                <td className="py-1.5 pr-3 font-medium">{w.role}</td>
                <td className="py-1.5 font-mono">{w.upswellRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3">
        {STAFFING_QUESTIONS.map((s, i) => (
          <div key={i} className="border-l-2 border-[#4A776D] pl-4 py-1">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <h3 className="font-semibold">{s.role}</h3>
              <span className="text-xs font-mono opacity-60 bg-amber-50 px-2 py-0.5 rounded">{s.decision}</span>
            </div>
            <p className="text-sm font-medium mt-1">{s.question}</p>
            <p className="text-xs opacity-80 mt-1.5">{s.context}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Operational checklist (tactical to-dos) ---- */
function OperationalChecklist() {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border border-[#113D33]/10 p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-60 mb-2">🔧 Operational checklist</h2>
      <p className="text-sm opacity-80 mb-4">
        Tactical items beyond the main plan. Most are small individually but they add up — losing track of any of these creates friction at launch.
      </p>

      <div className="space-y-5">
        {OPERATIONAL_CHECKLIST.map((cat, i) => (
          <div key={i}>
            <h3 className="text-xs uppercase tracking-wider font-bold text-[#4A776D] mb-2">{cat.category}</h3>
            <ul className="space-y-1.5">
              {cat.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-sm border-l-2 border-black/10 pl-3 py-1">
                  <span className="text-black/30 text-xs mt-1">☐</span>
                  <div className="flex-1">
                    <span>{item.task}</span>
                    <div className="text-[11px] opacity-60 mt-0.5"><b>Owner:</b> {item.owner}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Access tracker (what to get from Heather) ---- */
function AccessTracker() {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border border-[#113D33]/10 p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-60 mb-2">🔑 Access tracker — what to get from Heather</h2>
      <p className="text-xs opacity-80 mb-4">
        Patterns: <b>Google products</b> = she adds you as a user (most secure). <b>Social accounts</b> = no access needed; she posts in her voice from her account, you verify publicly. She owns the brand. <b>Loopz / domain registrar</b> = run a report or share credentials via password manager (1Password / Bitwarden), never plain text.
      </p>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider opacity-60 border-b border-black/10">
              <th className="text-left py-2 pr-3">Platform</th>
              <th className="text-left py-2 pr-3">Access type</th>
              <th className="text-left py-2 pr-3">Status</th>
              <th className="text-left py-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {ACCESS_TRACKER.map((a, i) => {
              const statusColor =
                a.status === "✓ Done" || a.status === "✓ N/A" ? "bg-emerald-100 text-emerald-900" :
                a.status === "N/A" ? "bg-gray-100 text-gray-700" :
                a.status.startsWith("Pending") ? "bg-amber-100 text-amber-900" :
                "bg-blue-100 text-blue-900";
              return (
                <tr key={i} className="border-b border-black/5 align-top">
                  <td className="py-2 pr-3 font-medium">{a.platform}</td>
                  <td className="py-2 pr-3">{a.type}</td>
                  <td className="py-2 pr-3">
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${statusColor}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="py-2 opacity-80">{a.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---- Thursday May 14 site visit agenda ---- */
function ThursdaySiteVisit() {
  return (
    <div className="md:col-span-2 bg-emerald-50 rounded-xl border-2 border-emerald-400 p-6">
      <h2 className="text-sm uppercase tracking-wider text-emerald-900 mb-2">📋 {THURSDAY_SITE_VISIT_AGENDA.date} site visit — agenda</h2>
      <p className="text-sm font-semibold mb-1">{THURSDAY_SITE_VISIT_AGENDA.why}</p>
      <p className="text-xs opacity-80 mb-4"><b>Attendees:</b> {THURSDAY_SITE_VISIT_AGENDA.attendees}</p>

      <div className="bg-white rounded-lg p-4 border border-emerald-200">
        <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">Lock these down before Jocelyn leaves Friday</h3>
        <ul className="space-y-1.5 text-sm">
          {THURSDAY_SITE_VISIT_AGENDA.agenda.map((a, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-emerald-600 mt-1 text-xs">☐</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---- Construction timing ---- */
function ConstructionTiming() {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border border-[#113D33]/10 p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-60 mb-2">🔨 Construction timing</h2>
      <p className="text-sm font-medium opacity-90 mb-4">{CONSTRUCTION_TIMING.question}</p>

      <div className="grid md:grid-cols-3 gap-3">
        {CONSTRUCTION_TIMING.options.map((o, i) => {
          const isRecommended = o.verdict.toLowerCase().includes("recommended");
          return (
            <div key={i} className={`rounded-lg p-4 ${isRecommended ? "bg-emerald-50 border-2 border-emerald-400" : "bg-gray-50 border border-gray-200"}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm">{o.label}</h3>
                {isRecommended && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-white px-2 py-0.5 rounded">★</span>
                )}
              </div>
              <div className="text-xs space-y-1.5">
                <div><b className="text-emerald-700">+</b> <span className="opacity-90">{o.pros}</span></div>
                <div><b className="text-rose-700">−</b> <span className="opacity-90">{o.cons}</span></div>
              </div>
              <p className="text-xs italic mt-2 pt-2 border-t border-black/10 font-medium">{o.verdict}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Why we're NOT closing ---- */
function NoClosureReasoning() {
  return (
    <div className="md:col-span-2 bg-[#113D33] text-white rounded-xl p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-70 mb-2">✓ Why we're not closing during the transition</h2>
      <ol className="space-y-3 text-sm">
        {NO_CLOSURE_REASONING.map((r, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-[#9ABFB3] font-bold tabular-nums">{i + 1}.</span>
            <span className="opacity-95">{r}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---- Meetings & decisions log ---- */
function MeetingsLog() {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border-2 border-emerald-300 p-6">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-sm uppercase tracking-wider opacity-60">Meetings & decisions log</h2>
      </div>

      {MEETINGS.map((m, i) => {
        const inProgress = m.status === "in-progress";
        return (
          <div key={i} className="space-y-4">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold">{m.title}</h3>
                {inProgress ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    IN PROGRESS
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full">
                    ✓ COMPLETED
                  </span>
                )}
              </div>
              <div className="text-xs opacity-70">
                {m.date} · {m.attendees}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider opacity-60 mb-2">Decisions made</div>
              {m.decisions.length === 0 ? (
                <p className="text-sm italic opacity-50">— Add decisions as they land. Tell Claude and they&apos;ll be logged here.</p>
              ) : (
                <ul className="text-sm space-y-2">
                  {m.decisions.map((d, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-emerald-600 mt-0.5">✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {m.openQuestions && m.openQuestions.length > 0 && (
              <div>
                <div className="text-xs uppercase tracking-wider opacity-60 mb-2 mt-3">Still open from this meeting</div>
                <ul className="text-sm space-y-2">
                  {m.openQuestions.map((q, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-amber-600 mt-0.5">?</span>
                      <span className="opacity-90">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <details className="mt-2">
              <summary className="text-xs uppercase tracking-wider opacity-50 cursor-pointer">Topics discussed</summary>
              <ul className="text-sm space-y-1 mt-2 opacity-80">
                {m.topics.map((t, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="opacity-40">·</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        );
      })}
    </div>
  );
}

/* ---- Local partnerships to pursue ---- */
function LocalPartnerships() {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border border-[#113D33]/10 p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-60 mb-3">Local partnership pursuit list (new from May 12 meeting)</h2>
      <p className="text-xs opacity-70 mb-4">
        Heather called out specific Denver employers, hospitality, and apartment buildings within walking distance of RiNo + Central Park to pursue for corporate / resident / guest perks. Recovery is becoming commoditized; bundled access via partner orgs is a real growth lever.
      </p>
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider opacity-60 border-b border-black/10">
              <th className="text-left py-2 pr-4">Partner</th>
              <th className="text-left py-2 pr-4">Type</th>
              <th className="text-left py-2">Opportunity</th>
            </tr>
          </thead>
          <tbody>
            {LOCAL_PARTNERSHIPS_TO_PURSUE.map((p, i) => (
              <tr key={i} className="border-b border-black/5">
                <td className="py-2 pr-4 font-medium">{p.name}</td>
                <td className="py-2 pr-4 text-xs opacity-80">{p.type}</td>
                <td className="py-2 text-xs opacity-80">{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] opacity-60 mt-3 italic">
        Strategic context: tons of free recovery offered at Denver fitness places — pricing pressure on Remedy Room alone. Massage + facial is more luxury, harder to commoditize, where margin lives.
      </p>
    </div>
  );
}

/* ---- New campaigns from meeting ---- */
function NewCampaigns() {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border border-[#113D33]/10 p-6">
      <h2 className="text-sm uppercase tracking-wider opacity-60 mb-3">New campaigns added from May 12 meeting</h2>
      <div className="space-y-3">
        {NEW_CAMPAIGNS.map((c, i) => (
          <div key={i} className="border-l-2 border-[#4A776D] pl-4 py-1">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <h3 className="font-semibold">{c.title}</h3>
              <span className="text-xs opacity-70">{formatDate(c.date)}</span>
            </div>
            <p className="text-xs opacity-80 mt-1"><b>Audience:</b> {c.audience}</p>
            <p className="text-xs opacity-80"><b>Goal:</b> {c.goal}</p>
            <p className="text-xs italic opacity-60 mt-1">{c.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Overview tab ---- */
function OverviewTab() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <DailyStatus />
      <WeekPlan />
      <PaymentMigrationPlan />
      <MeetingPrep525 />
      <CapacityDecision />
      <StrategicPriorities />
      <LaunchScenarios />
      <CriticalGating />
      <ThursdaySiteVisit />
      <AccessTracker />
      <OperationalChecklist />
      <ActiveMemberBuckets />
      <BehaviorBuckets />
      <StaffingQuestions />
      <ConstructionTiming />
      <CurtainDesign />
      <NoClosureReasoning />
      <MeetingsLog />
      <NewCampaigns />
      <LocalPartnerships />
      <SenderTimeline />
      <Section title="Member economics">
        <Stat label="Total Mariana Tek contacts" value="9,094" />
        <Stat label="Marketing-opted-in" value="4,628" sublabel="total list — Friday May 15 deduped audience: 4,146" />
        <Stat label="Active paying members" value="109" sublabel="excluding employees + $0 partner tiers" />
        <Stat label="Total active membership contracts" value="181" />
        <Stat label="Revenue impact of $99 drop" value="~-$3K/mo" sublabel="vs. original honor-all-rates plan (Option 2 locked May 14)" />
        <Stat label="Annual prepay holders" value="1" sublabel="Terry Wei · $1,599/yr through 12/29/2026 — personal touch" />
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
          <li>✓ <b>Wellhub SUNSET</b> with 30+ day notice (decided May 12)</li>
          <li>✓ <b>ClassPass continues</b> at new locations with individual-modality offerings (cold plunge / sauna / infrared as separate listings)</li>
          <li>✓ <b>All members drop to $99/mo Sway Unlimited</b> (Option 2, locked May 14) — ~$3K/mo revenue decrease, cleaner Mindbody setup, stronger retention narrative</li>
          <li>✓ <b>Auto-enroll w/ reply-based opt-out</b> — no "click to confirm" required for the rate drop</li>
          <li>✓ <b>Gravity Haus</b> contractually locked per APA — Sway must offer $99/mo to qualifying GH members through July 31, 2026</li>
          <li>✓ <b>Wellpass private event June 3 at RiNo</b> — B2B sneak-peek + partnership evaluation</li>
          <li>✓ <b>$40 off Sway Larimer bridge offer</b> — added to emails 01a + 01b for existing customers to experience Sway today while their location transitions (drives Larimer revenue during gap)</li>
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

/* ---- My List tab (John's personal checklist) ---- */
function MyListTab({ today }: { today: string }) {
  const totalTasks = MY_LIST.reduce((sum, p) => sum + p.tasks.length, 0);
  const inProgress = MY_LIST.reduce((sum, p) => sum + p.tasks.filter(t => t.status === "in-progress").length, 0);

  return (
    <div className="space-y-5">
      <Section title="My list — John's lane">
        <p className="text-xs opacity-80 mb-1">
          Everything <b>I'm</b> responsible for during the conversion. Grouped by week / phase. Use this as a working list — others can see it but the ownership is mine.
        </p>
        <p className="text-xs opacity-60">
          {totalTasks} tasks total · {inProgress} in progress · color-coded by phase
        </p>
      </Section>

      {MY_LIST.map((phase, i) => {
        const phaseColor =
          phase.color === "rose" ? "border-rose-300 bg-rose-50" :
          phase.color === "amber" ? "border-amber-300 bg-amber-50" :
          phase.color === "emerald" ? "border-emerald-300 bg-emerald-50" :
          "border-black/10 bg-white";

        return (
          <div key={i} className={`rounded-xl border-2 ${phaseColor} p-5`}>
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
              <h3 className="font-bold text-base">{phase.phase}</h3>
              <span className="text-xs opacity-60">{phase.tasks.length} tasks</span>
            </div>
            <ul className="space-y-2 bg-white rounded-lg p-4 border border-black/5">
              {phase.tasks.map((t, j) => {
                const statusColor =
                  t.status === "in-progress" ? "text-amber-600" :
                  t.status === "done" ? "text-emerald-600 line-through opacity-60" :
                  "text-black/30";
                const statusIcon =
                  t.status === "in-progress" ? "◐" :
                  t.status === "done" ? "✓" :
                  "☐";
                return (
                  <li key={j} className="flex gap-3 text-sm border-b border-black/5 last:border-b-0 pb-2 last:pb-0">
                    <span className={`${statusColor} text-base shrink-0 mt-0.5`}>{statusIcon}</span>
                    <div className="flex-1">
                      <span className={t.status === "done" ? "line-through opacity-60" : ""}>{t.task}</span>
                      {t.dep && (
                        <div className="text-[11px] opacity-60 mt-0.5"><b>Depends on:</b> {t.dep}</div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ---- Calendar tab — unified timeline across emails + social + website ---- */
type CalEvent = {
  date: string;
  sortKey: string;
  dayKey: string;        // ISO YYYY-MM-DD for day-level grouping
  timeLabel: string;     // 'noon' / 'AM' / 'PM' / '' — shown inside each event
  kind: "email" | "social" | "website";
  title: string;
  audience: string;
  status: string;
  detail?: string;
};

function extractDayInfo(date: string, sortKey: string): { dayKey: string; timeLabel: string } {
  // dayKey is the first 10 chars of sortKey if it looks like a date
  const dayKey = sortKey.match(/^\d{4}-\d{2}-\d{2}/) ? sortKey.substring(0, 10) : "9999-12-31";
  let timeLabel = "";
  if (date.match(/noon/i)) timeLabel = "noon";
  else if (date.match(/AM/i)) timeLabel = "AM";
  else if (date.match(/PM/i)) timeLabel = "PM";
  return { dayKey, timeLabel };
}

function buildCalendar(): CalEvent[] {
  const events: CalEvent[] = [];

  for (const e of EMAIL_DRAFTS) {
    const sortKey = dateToSortKey(e.date);
    const { dayKey, timeLabel } = extractDayInfo(e.date, sortKey);
    events.push({
      date: e.date, sortKey, dayKey, timeLabel,
      kind: "email",
      title: e.title,
      audience: `${e.to} · ${e.toCount.toLocaleString()} recipients`,
      status: "drafted",
      detail: `From: ${e.from}`,
    });
  }
  for (const p of SOCIAL_POSTS) {
    const sortKey = dateToSortKey(p.date);
    const { dayKey, timeLabel } = extractDayInfo(p.date, sortKey);
    events.push({
      date: p.date, sortKey, dayKey, timeLabel,
      kind: "social",
      title: p.hook,
      audience: p.channel,
      status: p.status,
      detail: p.format,
    });
  }
  for (const w of WEBSITE_TASKS) {
    const sortKey = dateToSortKey(w.date);
    const { dayKey, timeLabel } = extractDayInfo(w.date, sortKey);
    events.push({
      date: w.date, sortKey, dayKey, timeLabel,
      kind: "website",
      title: w.goal,
      audience: w.page,
      status: w.status,
      detail: w.type,
    });
  }

  events.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  return events;
}

/* ---- Month grid renderer ---- */
function MonthGrid({
  year, month, today, eventsByDay,
}: {
  year: number; month: number; today: string;
  eventsByDay: Map<string, CalEvent[]>;
}) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = firstDay.getDay();

  const cells: ({ day: number; iso: string; weekday: number } | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const weekday = new Date(year, month, d).getDay();
    cells.push({ day: d, iso, weekday });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-white rounded-xl border border-[#113D33]/10 overflow-hidden">
      <div className="bg-[#113D33] text-white px-5 py-3">
        <h3 className="text-lg font-bold">{monthNames[month]} <span className="opacity-60 font-normal">{year}</span></h3>
      </div>
      <div className="grid grid-cols-7 border-b border-black/10 bg-[#F7F4E9]/40">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
          <div
            key={d}
            className={`text-[10px] uppercase tracking-wider font-bold text-center py-2 ${
              i === 0 || i === 6 ? "opacity-50" : "opacity-70"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((c, i) => {
          if (!c) return <div key={i} className="min-h-[88px] bg-gray-50/40 border-r border-b border-black/5 last:border-r-0" />;
          const dayEvents = eventsByDay.get(c.iso) || [];
          const isToday = c.iso === today;
          const isPast = c.iso < today;
          const isWeekend = c.weekday === 0 || c.weekday === 6;
          const counts = {
            email: dayEvents.filter((e) => e.kind === "email").length,
            social: dayEvents.filter((e) => e.kind === "social").length,
            website: dayEvents.filter((e) => e.kind === "website").length,
          };
          const hasEvents = dayEvents.length > 0;

          const titles = dayEvents.slice(0, 3).map((e) => e.title);
          const tooltipText = dayEvents.map((e) => `${e.kind === "email" ? "📧" : e.kind === "social" ? "📱" : "💻"} ${e.title}`).join("\n");

          let cellClass = "min-h-[88px] p-2 flex flex-col text-left transition border-r border-b border-black/5 last:border-r-0";
          if (isToday) {
            cellClass += " bg-[#113D33] text-white";
          } else if (hasEvents) {
            cellClass += " bg-white hover:bg-[#F7F4E9]/50 cursor-pointer";
          } else if (isWeekend) {
            cellClass += " bg-gray-50/60";
          } else {
            cellClass += " bg-white";
          }
          if (isPast && !isToday) cellClass += " opacity-50";

          const dayNumClass = isToday
            ? "text-base font-bold"
            : hasEvents
              ? "text-base font-bold text-[#113D33]"
              : "text-sm font-medium text-black/60";

          return (
            <a
              key={i}
              href={hasEvents ? `#day-${c.iso}` : undefined}
              className={cellClass}
              title={tooltipText || undefined}
            >
              <div className="flex items-baseline justify-between">
                <span className={dayNumClass}>{c.day}</span>
                {isToday && <span className="text-[8px] uppercase tracking-widest font-bold opacity-80">Today</span>}
              </div>

              {hasEvents && (
                <>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {counts.email > 0 && (
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${isToday ? "bg-white/25 text-white" : "bg-blue-100 text-blue-900"}`}>
                        📧 {counts.email}
                      </span>
                    )}
                    {counts.social > 0 && (
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${isToday ? "bg-white/25 text-white" : "bg-pink-100 text-pink-900"}`}>
                        📱 {counts.social}
                      </span>
                    )}
                    {counts.website > 0 && (
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${isToday ? "bg-white/25 text-white" : "bg-emerald-100 text-emerald-900"}`}>
                        💻 {counts.website}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex-1 overflow-hidden">
                    {titles.map((t, ti) => (
                      <div
                        key={ti}
                        className={`text-[9px] leading-tight truncate ${isToday ? "opacity-90" : "opacity-65"}`}
                        title={t}
                      >
                        · {t}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className={`text-[9px] italic ${isToday ? "opacity-70" : "opacity-50"}`}>
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function CalendarTab({ today }: { today: string }) {
  const events = buildCalendar();

  // Index events by dayKey for grid rendering
  const eventsByDay = new Map<string, CalEvent[]>();
  for (const e of events) {
    const existing = eventsByDay.get(e.dayKey) || [];
    existing.push(e);
    eventsByDay.set(e.dayKey, existing);
  }

  // Group events into day blocks for timeline view (events with same dayKey grouped together)
  const dayGroups: { dayKey: string; displayDate: string; events: CalEvent[] }[] = [];
  for (const e of events) {
    const last = dayGroups[dayGroups.length - 1];
    if (last && last.dayKey === e.dayKey) {
      last.events.push(e);
    } else {
      // Pretty display date from dayKey if it's a real date
      let displayDate = e.date;
      if (e.dayKey !== "9999-12-31") {
        const d = new Date(e.dayKey + "T12:00:00");
        const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
        const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()];
        displayDate = `${dayName}, ${monthName} ${d.getDate()}`;
      }
      dayGroups.push({ dayKey: e.dayKey, displayDate, events: [e] });
    }
  }

  const kindBadge = (k: string) =>
    k === "email" ? "bg-blue-100 text-blue-900 border-blue-300" :
    k === "social" ? "bg-pink-100 text-pink-900 border-pink-300" :
    "bg-emerald-100 text-emerald-900 border-emerald-300";

  const kindIcon = (k: string) => k === "email" ? "📧" : k === "social" ? "📱" : "💻";

  const statusColor = (s: string) =>
    s === "shipped" || s === "posted" || s === "✓ Done" ? "bg-emerald-100 text-emerald-900" :
    s === "scheduled" ? "bg-blue-100 text-blue-900" :
    s === "in-progress" ? "bg-amber-100 text-amber-900" :
    "bg-gray-100 text-gray-700";

  return (
    <div className="space-y-4">
      <Section title="📅 Unified calendar — emails · social · website">
        <p className="text-xs opacity-80 mb-2">
          Every transition activity in one timeline. Month grid shows where activity clusters; click any day to jump to details.{" "}
          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900">📧 Email</span>{" "}
          <span className="px-1.5 py-0.5 rounded bg-pink-100 text-pink-900">📱 Social</span>{" "}
          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900">💻 Website</span>
        </p>
        <p className="text-xs opacity-60">
          {events.length} total activities · sorted chronologically · today highlighted in green
        </p>
      </Section>

      {/* MONTH GRIDS */}
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <MonthGrid year={2026} month={4} today={today} eventsByDay={eventsByDay} />
          <MonthGrid year={2026} month={5} today={today} eventsByDay={eventsByDay} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <MonthGrid year={2026} month={6} today={today} eventsByDay={eventsByDay} />
          <div className="bg-amber-50 rounded-xl border-2 border-amber-300 p-5 flex flex-col justify-center">
            <h3 className="text-base font-bold text-amber-900 mb-2">📌 Approximate-date activity</h3>
            <p className="text-xs opacity-80 leading-relaxed">
              Some items don&apos;t have a fixed calendar day yet — they cluster in &quot;Late June PR push&quot;, &quot;Mid-July blog&quot;, &quot;Post-launch redirects&quot;, etc. These appear at the bottom of the timeline below in an &quot;Approximate&quot; bucket. They&apos;ll move to real calendar cells once dates lock in.
            </p>
          </div>
        </div>
      </div>

      {/* TIMELINE — day blocks */}
      <h2 className="text-sm uppercase tracking-wider opacity-60 pt-4">Day-by-day detail</h2>
      {dayGroups.map((g, i) => {
        const isPast = g.dayKey < today;
        const isToday = g.dayKey === today;
        const isFuture = g.dayKey !== "9999-12-31" && g.dayKey > today;
        const isApprox = g.dayKey === "9999-12-31";
        const dateColor = isToday
          ? "bg-[#113D33] text-white"
          : isPast
            ? "bg-gray-100 text-gray-700"
            : isApprox
              ? "bg-amber-50 text-amber-900"
              : "bg-[#F7F4E9] text-[#113D33]";

        return (
          <div
            key={i}
            id={`day-${g.dayKey}`}
            className={`rounded-xl border-2 ${isToday ? "border-[#113D33]" : "border-black/10"} overflow-hidden ${isPast ? "opacity-70" : ""}`}
          >
            <div className={`px-5 py-3 ${dateColor}`}>
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <h3 className="text-base font-bold">
                  {g.displayDate}
                  {isToday && <span className="ml-2 text-xs font-semibold uppercase tracking-wider opacity-80">· Today</span>}
                  {isApprox && <span className="ml-2 text-xs font-semibold uppercase tracking-wider opacity-70">· Approximate</span>}
                </h3>
                <span className="text-xs opacity-70">{g.events.length} {g.events.length === 1 ? "item" : "items"}</span>
              </div>
            </div>
            <div className="bg-white divide-y divide-black/5">
              {g.events.map((e, j) => (
                <div key={j} className="p-4">
                  <div className="flex items-start gap-3 flex-wrap">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border ${kindBadge(e.kind)} shrink-0`}>
                      <span>{kindIcon(e.kind)}</span>
                      <span>{e.kind.toUpperCase()}</span>
                    </span>
                    {e.timeLabel && (
                      <span className="text-[10px] font-mono uppercase tracking-wider opacity-60 shrink-0 mt-1">
                        {e.timeLabel}
                      </span>
                    )}
                    <div className="flex-1 min-w-[200px]">
                      <div className="text-sm font-medium leading-snug">{e.title}</div>
                      <div className="text-xs opacity-75 mt-0.5">
                        <span className="font-mono">{e.audience}</span>
                        {e.detail && <span className="opacity-60"> · {e.detail}</span>}
                      </div>
                    </div>
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${statusColor(e.status)}`}>
                      {e.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---- Content tab (social media + website) ---- */
function ContentTab() {
  // Sort chronologically using the shared helper
  const sortedPosts = [...SOCIAL_POSTS].sort((a, b) =>
    dateToSortKey(a.date).localeCompare(dateToSortKey(b.date))
  );
  const sortedTasks = [...WEBSITE_TASKS].sort((a, b) =>
    dateToSortKey(a.date).localeCompare(dateToSortKey(b.date))
  );

  const channelBadge = (ch: string) => {
    if (ch.startsWith("Upswell")) return "bg-amber-100 text-amber-900 border-amber-300";
    if (ch.includes("IG")) return "bg-pink-100 text-pink-900 border-pink-300";
    if (ch.includes("FB")) return "bg-blue-100 text-blue-900 border-blue-300";
    if (ch.includes("TikTok")) return "bg-purple-100 text-purple-900 border-purple-300";
    if (ch.includes("LinkedIn")) return "bg-sky-100 text-sky-900 border-sky-300";
    return "bg-gray-100 text-gray-900 border-gray-300";
  };

  const statusBadge = (s: string) => {
    if (s === "shipped" || s === "posted") return "bg-emerald-100 text-emerald-900";
    if (s === "scheduled") return "bg-blue-100 text-blue-900";
    if (s === "in-progress") return "bg-amber-100 text-amber-900";
    return "bg-gray-100 text-gray-700";
  };

  const typeBadge = (t: string) => {
    if (t === "new page") return "bg-emerald-100 text-emerald-900 border-emerald-300";
    if (t === "page update") return "bg-amber-100 text-amber-900 border-amber-300";
    if (t === "blog post") return "bg-pink-100 text-pink-900 border-pink-300";
    if (t === "banner") return "bg-purple-100 text-purple-900 border-purple-300";
    if (t === "redirect") return "bg-sky-100 text-sky-900 border-sky-300";
    return "bg-gray-100 text-gray-900 border-gray-300";
  };

  return (
    <div className="space-y-6">
      <Section title="Content plan — social + website">
        <p className="text-xs opacity-80 mb-2">
          <b>Quiet-launch strategy:</b> Sway-channel posts about this transition all hold for the <span className="bg-emerald-100 text-emerald-900 px-1 rounded font-semibold">late-June PR push</span> when the space is finished and beautiful. May 15 → mid-June, the only social activity is on <span className="bg-amber-100 text-amber-900 px-1 rounded font-semibold">Heather&apos;s Upswell channels in her voice</span>. Sway IG continues normal Sway Larimer content; no mention of new locations until PR push.
        </p>
        <p className="text-xs opacity-60">
          {SOCIAL_POSTS.length} social posts planned · {WEBSITE_TASKS.length} website tasks · click any item to see full draft below
        </p>
      </Section>

      {/* SOCIAL */}
      <Section title="📱 Social posts">
        <div className="space-y-3">
          {sortedPosts.map((p, i) => (
            <details key={i} className="group rounded-lg border border-black/10 bg-white overflow-hidden">
              <summary className="cursor-pointer p-4 hover:bg-black/[0.02] transition list-none">
                <div className="flex items-start gap-3 flex-wrap">
                  <div className="text-xs font-mono shrink-0 opacity-60 w-24">{p.date}</div>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${channelBadge(p.channel)} shrink-0`}>
                    {p.channel}
                  </span>
                  <span className="text-xs opacity-70 shrink-0">{p.format}</span>
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-sm font-medium">{p.hook}</div>
                  </div>
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded shrink-0 ${statusBadge(p.status)}`}>
                    {p.status}
                  </span>
                  <svg className="w-4 h-4 shrink-0 opacity-50 group-open:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </summary>
              <div className="px-4 pb-4 pt-2 border-t border-black/10 bg-[#F7F4E9]/40">
                <div className="text-xs whitespace-pre-wrap leading-relaxed mt-3">{p.body}</div>
                {p.notes && (
                  <div className="mt-3 text-[11px] italic opacity-70 border-l-2 border-amber-300 pl-3">
                    <b>Note:</b> {p.notes}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* WEBSITE */}
      <Section title="💻 Website tasks">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-2 pr-3">Date</th>
                <th className="text-left py-2 pr-3">Type</th>
                <th className="text-left py-2 pr-3">Page</th>
                <th className="text-left py-2 pr-3">Goal</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((t, i) => (
                <tr key={i} className="border-b border-black/5 align-top">
                  <td className="py-2 pr-3 whitespace-nowrap font-mono text-xs opacity-70">{t.date}</td>
                  <td className="py-2 pr-3">
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded border ${typeBadge(t.type)}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="py-2 pr-3 font-mono text-xs">{t.page}</td>
                  <td className="py-2 pr-3 text-xs leading-relaxed">
                    {t.goal}
                    {t.notes && <div className="text-[11px] opacity-60 mt-1 italic">{t.notes}</div>}
                  </td>
                  <td className="py-2">
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${statusBadge(t.status)}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

/* ---- Emails tab ---- */
function EmailsTab() {
  return (
    <div className="space-y-4">
      <Section title="9 email drafts — full content">
        <p className="text-xs opacity-70 mb-3">
          Every email in send order. <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">Amber</span> = Upswell domain (pre-launch, warm sender).{" "}
          <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold">Emerald</span> = Sway domain (post-launch).
          Click any email to expand the full draft.
        </p>
        <div className="text-xs opacity-80 bg-blue-50 border border-blue-200 rounded p-3 leading-relaxed">
          <b>Transactional vs Marketing:</b>{" "}
          <span className="inline-block px-2 py-0.5 rounded-full border bg-blue-100 text-blue-900 border-blue-300 font-semibold text-[10px] mx-1">TRANSACTIONAL</span>
          informs about the existing relationship (membership change, billing, account details) — no opt-in required.{" "}
          <span className="inline-block px-2 py-0.5 rounded-full border bg-purple-100 text-purple-900 border-purple-300 font-semibold text-[10px] mx-1">MARKETING</span>
          is promotional — requires CAN-SPAM opt-in (transferred from Upswell consent).{" "}
          <span className="inline-block px-2 py-0.5 rounded-full border bg-indigo-100 text-indigo-900 border-indigo-300 font-semibold text-[10px] mx-1">TRANSACTIONAL + MARKETING</span>
          hybrid — primary purpose is transactional, with secondary marketing content (legally classifies as transactional).
        </div>
      </Section>

      {[...EMAIL_DRAFTS].sort((a, b) => dateToSortKey(a.date).localeCompare(dateToSortKey(b.date))).map((e) => {
        const domainColor =
          e.fromDomain === "upswell"
            ? "bg-amber-50 border-amber-200"
            : e.fromDomain === "sway"
              ? "bg-emerald-50 border-emerald-200"
              : "bg-gray-50 border-gray-200";
        const badgeColor =
          e.fromDomain === "upswell"
            ? "bg-amber-200 text-amber-900"
            : e.fromDomain === "sway"
              ? "bg-emerald-200 text-emerald-900"
              : "bg-gray-200 text-gray-700";

        const classColor =
          e.classification === "transactional"
            ? "bg-blue-100 text-blue-900 border-blue-300"
            : e.classification === "marketing"
              ? "bg-purple-100 text-purple-900 border-purple-300"
              : "bg-indigo-100 text-indigo-900 border-indigo-300";

        const classLabel =
          e.classification === "transactional"
            ? "TRANSACTIONAL"
            : e.classification === "marketing"
              ? "MARKETING"
              : "TRANSACTIONAL + MARKETING";

        return (
          <details
            key={e.n}
            className={`group rounded-xl border-2 ${domainColor} overflow-hidden`}
          >
            <summary className="cursor-pointer p-5 hover:bg-black/[0.02] transition list-none">
              <div className="flex items-start gap-4 flex-wrap">
                <div className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold ${badgeColor}`}>
                  {e.n}
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-xs font-semibold opacity-60">{e.date}</span>
                    <h3 className="text-base md:text-lg font-bold">{e.title}</h3>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${classColor}`}>
                      {classLabel}
                    </span>
                  </div>
                  <div className="text-xs opacity-80 mt-1.5 space-y-0.5">
                    <div>
                      <b>FROM</b> <span className="font-mono">{e.from}</span>
                    </div>
                    <div>
                      <b>TO</b> {e.to} <span className="font-mono opacity-60">· {e.toCount.toLocaleString()} recipients</span>
                    </div>
                    <div className="opacity-70">
                      <b>CSV</b> <span className="font-mono">{e.csv}</span>
                    </div>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 shrink-0 opacity-50 transition-transform group-open:rotate-90 mt-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </summary>

            <div className="px-5 pb-6 pt-2 border-t border-black/10 bg-white space-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Subject line options</div>
                {e.subjectOptions.map((s, i) => (
                  <div key={i} className="text-sm font-medium">
                    {i === 0 ? "▶ " : "   "}{s}
                  </div>
                ))}
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Preview text</div>
                <div className="text-sm italic opacity-80">{e.previewText}</div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Body</div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap bg-[#F7F4E9]/60 p-4 rounded-lg border border-[#113D33]/10">
                  {e.body}
                </div>
              </div>

              {e.notes && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Notes</div>
                  <div className="text-xs opacity-80 leading-relaxed bg-amber-50/50 p-3 rounded border border-amber-200">
                    {e.notes}
                  </div>
                </div>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}

/* ---- Campaigns tab ---- */
function CampaignsTab({ today }: { today: string }) {
  return (
    <div className="space-y-6">
      <Section title="9 emails drafted">
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

      <Section title="⭐ Pricing strategy — LOCKED May 14 (Option 2)">
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-4 mb-3">
          <p className="text-sm font-bold text-emerald-900 mb-2">All existing members proactively drop to $99/mo Sway Unlimited.</p>
          <p className="text-xs opacity-80">
            Was originally going to be "grandfather all existing rates indefinitely." Heather proposed the proactive drop in her May 14 response doc; aligned and approved. Cleaner Mindbody setup (one tier, not many historical rates) + stronger member loyalty narrative ("your rate is going down").
          </p>
        </div>
        <ul className="text-sm space-y-2 opacity-90 list-disc list-inside">
          <li>Members at <b>$99</b> → no change (36 people)</li>
          <li>Members at <b>$129 / $159 / $189</b> → rate goes DOWN (67 people)</li>
          <li><b>$0</b> partner / comp tiers → stay (separate decisions per partnership)</li>
          <li>Net revenue impact: <b>~$3K/mo decrease (~$36K/yr)</b> vs. the original honor-all-rates plan</li>
          <li>Exclusive to current members during transition — new signups later get standard Sway Unlimited pricing</li>
          <li>Auto-enroll model: membership rolls over automatically. No "click to confirm" required. Heather's locked 01a uses reply-based opt-out for changes — no "Confirm here" CTA in the sent version. First Sway visit is on the house as a small thank-you for the friction of re-adding card at the front desk.</li>
          <li>The "$149 founders" framing was wrong — actual founders were at $99 / $129 / $159 in 3 cohorts. Only 2 members ever paid the $189 retail rate.</li>
          <li>Terry Wei's annual prepay ($1,599/yr term ending 12/29/2026) is honored as-is through end of term. She gets access to Sway Wellness Club locations at no additional cost. Renewal in Jan 2027 at the $99 member rate. Personal note from Heather/Marty Thursday eve or Friday AM.</li>
        </ul>
      </Section>

      <Section title="🆓 Free membership breakdown (72 total)">
        <p className="text-xs opacity-60 mb-3">
          50 customer-facing + 22 employees. The 38 partnership-tier free memberships need Heather/Marty keep-or-sunset decisions (see Partnership Decisions doc).
        </p>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-right py-2 pr-4">Count</th>
                <th className="text-left py-2 pr-4">Contract</th>
                <th className="text-left py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {FREE_BREAKDOWN.map((f, i) => (
                <tr key={i} className="border-b border-black/5">
                  <td className="py-2 pr-4 text-right font-bold tabular-nums">{f.count}</td>
                  <td className="py-2 pr-4 font-medium">{f.contract}</td>
                  <td className="py-2 text-xs opacity-70">{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="📅 Annual prepays — actual humans (1 active)">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-2 pr-4">Name</th>
                <th className="text-left py-2 pr-4">Contract</th>
                <th className="text-left py-2 pr-4">Rate</th>
                <th className="text-left py-2 pr-4">Purchased</th>
                <th className="text-left py-2 pr-4">Term ends</th>
                <th className="text-left py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {ANNUAL_PREPAYS.map((a, i) => (
                <tr key={i} className="border-b border-black/5 bg-emerald-50/30">
                  <td className="py-2 pr-4 font-medium">{a.name}</td>
                  <td className="py-2 pr-4 text-xs">{a.contract}</td>
                  <td className="py-2 pr-4 font-mono">{a.rate}</td>
                  <td className="py-2 pr-4 text-xs">{a.purchased}</td>
                  <td className="py-2 pr-4 text-xs font-semibold">{a.termEnds}</td>
                  <td className="py-2 text-xs opacity-70">{a.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs opacity-60 mt-3">
          <b>Verify with Heather:</b> Are there other prepaid annuals that don&apos;t show as Payment Interval=YR in Mariana Tek? Possibly someone who paid 12 months upfront but is billed as monthly in the system.
        </p>
      </Section>

      <Section title="⏱️ Members with prior commitment terms (now month-to-month)">
        <p className="text-xs opacity-60 mb-3">
          These joined under fixed-term commitments at signup. Their terms are already fulfilled, so they&apos;re NOT prepaid annuals — just standard monthly members at the grandfathered rate. Listing them in case your Marty was thinking of one of these.
        </p>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-2 pr-4">Name</th>
                <th className="text-left py-2 pr-4">Contract</th>
                <th className="text-left py-2 pr-4">Rate</th>
                <th className="text-left py-2 pr-4">Original term</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {COMMITMENT_FULFILLED.map((c, i) => (
                <tr key={i} className="border-b border-black/5">
                  <td className="py-2 pr-4 font-medium">{c.name}</td>
                  <td className="py-2 pr-4 text-xs">{c.contract}</td>
                  <td className="py-2 pr-4 font-mono text-xs">{c.rate}</td>
                  <td className="py-2 pr-4 text-xs">{c.term}</td>
                  <td className="py-2 text-xs opacity-70">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="🪦 Terminated annual contracts (historical reference)">
        <p className="text-xs opacity-60 mb-3">
          Past annual or year-long memberships that are no longer active. Listed in case your Marty remembers one of these — verify with Heather.
        </p>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-2 pr-4">Name</th>
                <th className="text-left py-2 pr-4">Contract</th>
                <th className="text-left py-2 pr-4">Rate</th>
                <th className="text-left py-2 pr-4">Purchased</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {TERMINATED_ANNUALS.map((t, i) => (
                <tr key={i} className="border-b border-black/5 opacity-60">
                  <td className="py-2 pr-4 font-medium">{t.name}</td>
                  <td className="py-2 pr-4 text-xs">{t.contract}</td>
                  <td className="py-2 pr-4 font-mono text-xs">{t.rate}</td>
                  <td className="py-2 pr-4 text-xs">{t.purchased}</td>
                  <td className="py-2 text-xs">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
/* ---- LoungeTab — Final locked Sway Remedy Lounge model (May 26 2026) ---- */
function LoungeTab() {
  return (
    <div className="space-y-6">
      {/* Header / TL;DR */}
      <div className="bg-emerald-50 rounded-xl border-2 border-emerald-500 p-6">
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
          <h2 className="text-base uppercase tracking-wider font-bold text-emerald-900">🛋️ Sway Remedy Lounge — Final Locked Decisions</h2>
          <span className="text-xs font-mono opacity-70 bg-white px-2 py-0.5 rounded border border-emerald-300">{LOUNGE_FINAL.status}</span>
        </div>
        <p className="text-xs italic opacity-80 mb-4">Data from Upswell MT (Nov 2025 → May 2026, 4,916 visits across both locations). Every number defensible.</p>
        <div className="bg-white rounded-lg p-4 border border-emerald-300 text-sm leading-relaxed">
          <b>The single defensible sentence:</b> {LOUNGE_FINAL.oneLiner}
        </div>
      </div>

      {/* Decision Table */}
      <Section title="Decision table">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-2 px-2"></th>
                <th className="text-left py-2 px-2">RiNo</th>
                <th className="text-left py-2 px-2">Central Park</th>
              </tr>
            </thead>
            <tbody>
              {LOUNGE_FINAL.decisionTable.map((row, i) => (
                <tr key={i} className="border-b border-black/5 last:border-b-0">
                  <td className="py-2 px-2 font-medium text-xs">{row.row}</td>
                  <td className={`py-2 px-2 text-xs ${row.bold ? "font-bold text-emerald-900 text-lg tabular-nums" : ""}`}>{row.rino}</td>
                  <td className={`py-2 px-2 text-xs ${row.bold ? "font-bold text-emerald-900 text-lg tabular-nums" : ""}`}>{row.cp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* The Cold Plunge Insight — featured */}
      <div className="bg-sky-50 rounded-xl border-2 border-sky-400 p-6">
        <h2 className="text-sm uppercase tracking-wider font-bold text-sky-900 mb-3">❄️ The Cold Plunge Insight — why throughput beats seat count</h2>
        <blockquote className="text-sm leading-relaxed border-l-4 border-sky-400 pl-4 italic opacity-90">
          {LOUNGE_FINAL.coldPlungeInsight}
        </blockquote>
      </div>

      {/* Throughput Math */}
      <Section title="Throughput math — RiNo (peak 14 concurrent)">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-1.5 px-2">Modality</th>
                <th className="text-right py-1.5 px-2">Seats</th>
                <th className="text-right py-1.5 px-2">Session</th>
                <th className="text-right py-1.5 px-2">Per 75-min slot</th>
                <th className="text-right py-1.5 px-2">Demand</th>
                <th className="text-right py-1.5 px-2">Capacity used</th>
              </tr>
            </thead>
            <tbody>
              {LOUNGE_FINAL.throughputRiNo.map((r, i) => (
                <tr key={i} className={`border-b border-black/5 last:border-b-0 ${r.flag === "tight" ? "bg-rose-50" : r.flag === "bookable" ? "bg-emerald-50" : ""}`}>
                  <td className="py-2 px-2 font-medium">{r.mod}</td>
                  <td className="py-2 px-2 text-right font-mono">{r.seats}</td>
                  <td className="py-2 px-2 text-right font-mono">{r.session}</td>
                  <td className="py-2 px-2 text-right font-mono font-bold text-emerald-900">{r.per75}</td>
                  <td className="py-2 px-2 text-right font-mono">{r.demand}</td>
                  <td className={`py-2 px-2 text-right font-mono font-bold ${r.flag === "tight" ? "text-rose-700" : r.flag === "bookable" ? "text-emerald-700" : "text-emerald-700"}`}>{r.used}{r.flag === "tight" ? " ⚠️" : r.flag === "bookable" ? " 📅" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Throughput math — Central Park (peak 17 concurrent)">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-1.5 px-2">Modality</th>
                <th className="text-right py-1.5 px-2">Seats</th>
                <th className="text-right py-1.5 px-2">Session</th>
                <th className="text-right py-1.5 px-2">Per 75-min slot</th>
                <th className="text-right py-1.5 px-2">Demand</th>
                <th className="text-right py-1.5 px-2">Capacity used</th>
              </tr>
            </thead>
            <tbody>
              {LOUNGE_FINAL.throughputCP.map((r, i) => (
                <tr key={i} className={`border-b border-black/5 last:border-b-0 ${r.flag === "tight" ? "bg-rose-50" : r.flag === "bookable" ? "bg-emerald-50" : ""}`}>
                  <td className="py-2 px-2 font-medium">{r.mod}</td>
                  <td className="py-2 px-2 text-right font-mono">{r.seats}</td>
                  <td className="py-2 px-2 text-right font-mono">{r.session}</td>
                  <td className="py-2 px-2 text-right font-mono font-bold text-emerald-900">{r.per75}</td>
                  <td className="py-2 px-2 text-right font-mono">{r.demand}</td>
                  <td className={`py-2 px-2 text-right font-mono font-bold ${r.flag === "tight" ? "text-rose-700" : r.flag === "bookable" ? "text-emerald-700" : "text-emerald-700"}`}>{r.used}{r.flag === "tight" ? " ⚠️" : r.flag === "bookable" ? " 📅" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] opacity-70 mt-3 italic">
          <b>Pattern (📅 = bookable, ⚠️ = capacity-constrained):</b> Infrared at 67-78% peak utilization is the genuine bottleneck — bookable to guarantee the 17-20% infrared-only segment never has a wasted trip. Sauna at 42-58% utilization is bookable not because of math but for member predictability and UX consistency (both heat modalities follow the same pattern). Cold plunge + compression stay open-floor: cold plunge has 95%+ throughput slack (body forces 2-5 min rotation), compression has 60%+ slack with built-in 30-min program timer.
        </p>
      </Section>

      {/* Why NOT bookings for every modality */}
      <Section title="What's bookable, what's not — and why">
        <div className="space-y-2">
          {LOUNGE_FINAL.whyNotAll.map((w, i) => (
            <div key={i} className={`rounded-lg p-3 border ${w.locked ? "bg-emerald-50 border-emerald-400 border-2" : "bg-gray-50 border-gray-200"}`}>
              <div className={`font-bold text-sm mb-1 ${w.locked ? "text-emerald-900" : ""}`}>{w.modality}</div>
              <div className="text-xs opacity-80">{w.reason}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Slot length */}
      <Section title="Why 75 minutes (slot length)">
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs uppercase tracking-wider opacity-60 mb-2">Options considered</h4>
            <div className="space-y-2">
              {LOUNGE_FINAL.slotLengthOptions.map((o, i) => (
                <div key={i} className={`rounded-lg p-3 ${o.locked ? "bg-emerald-50 border-2 border-emerald-500" : "bg-gray-50 border border-gray-200 opacity-80"}`}>
                  <div className="font-bold text-xs mb-1">{o.length}</div>
                  <div className="text-[11px] mb-0.5"><b className="text-emerald-700">+</b> {o.pro}</div>
                  <div className="text-[11px]"><b className="text-rose-700">−</b> {o.con}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider opacity-60 mb-2">Data behind 75</h4>
            <div className="space-y-1.5">
              {LOUNGE_FINAL.slotLengthData.map((d, i) => (
                <div key={i} className="flex justify-between gap-3 border-b border-black/5 pb-1.5 text-xs">
                  <span className="opacity-80">{d.label}</span>
                  <span className="font-mono font-bold text-emerald-900">{d.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-emerald-50 rounded p-3 border border-emerald-200 text-[11px] italic opacity-90">
              <b>Larimer&apos;s 40 min</b> works for a single tiny room (max 3). RiNo/CP are 6-10× larger with multi-room separation. <b>75 enables exactly 3 infrared rotations per cabin</b> (3 × 25 = 75), perfectly matching the booking math.
            </div>
          </div>
        </div>
      </Section>

      {/* Cap rationale */}
      <Section title="Why these caps: 15 RiNo / 18 CP">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-2 px-2"></th>
                <th className="text-right py-2 px-2">RiNo</th>
                <th className="text-right py-2 px-2">Central Park</th>
              </tr>
            </thead>
            <tbody>
              {LOUNGE_FINAL.capRationale.map((r, i) => (
                <tr key={i} className="border-b border-black/5 last:border-b-0">
                  <td className="py-2 px-2 text-xs">{r.col}</td>
                  <td className={`py-2 px-2 text-right font-mono ${r.bold ? "font-bold text-emerald-900 text-base" : "text-xs"}`}>{r.rino}</td>
                  <td className={`py-2 px-2 text-right font-mono ${r.bold ? "font-bold text-emerald-900 text-base" : "text-xs"}`}>{r.cp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] italic opacity-70 mt-3 bg-black/[0.03] p-3 rounded">
          <b>Why CP gets a higher cap:</b> larger footprint, ~50% busier overall, Sunday 10am peaked at 17 concurrent (within 18 cap), 4 infrared cabins vs RiNo&apos;s 3, more plunge/sauna seats. <b>Why we don&apos;t cap higher:</b> sauna physical capacity is 4-6 seats — at 25+ people, queue forms. <b>Why not match Larimer&apos;s 3:</b> Larimer is one small room. RiNo/CP are multi-room spaces 6-10× larger.
        </p>
      </Section>

      {/* Member personas */}
      <Section title="The member experience — your 75 minutes, your way">
        <div className="grid lg:grid-cols-3 gap-3">
          {LOUNGE_FINAL.personas.map((p, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-[11px] uppercase tracking-wider opacity-60 mb-1">{p.pct}</div>
              <h4 className="font-bold text-sm mb-2">{p.label}</h4>
              <p className="text-[11px] opacity-80 mb-2">{p.flow}</p>
              <p className="text-[11px] italic font-medium pt-2 border-t border-black/10">{p.experience}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-emerald-50 rounded-lg p-4 border border-emerald-300">
          <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-900 mb-2">Booking flow (frontend)</h4>
          <ol className="text-xs space-y-1.5 list-decimal pl-5">
            <li>Pick a 75-min slot (e.g. Tuesday 6:00-7:15pm)</li>
            <li>Two optional add-ons:
              <ul className="list-none mt-1 space-y-0.5 text-[11px] opacity-80">
                <li>☐ Reserve <b>infrared cabin</b>? Pick rotation: 6:00-6:25 / 6:25-6:50 / 6:50-7:15</li>
                <li>☐ Reserve <b>sauna seat</b>? Pick rotation: 6:00-6:25 / 6:25-6:50 / 6:50-7:15</li>
              </ul>
            </li>
            <li>Confirm</li>
          </ol>
          <div className="mt-3 pt-3 border-t border-emerald-300">
            <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-900 mb-2">Mindbody mechanics (backend)</h4>
            <ul className="text-[11px] space-y-1 opacity-90">
              <li>· <b>Master booking:</b> 85-min Sway Remedy Lounge session (75 member-facing + 10 cleanup)</li>
              <li>· <b>Resource #1 (if infrared chosen):</b> 25-min infrared cabin appointment, paired</li>
              <li>· <b>Resource #2 (if sauna chosen):</b> 25-min sauna seat appointment, paired</li>
              <li>· Cancelling master auto-releases paired resources</li>
              <li>· Cold plunge, compression, lounge: walk-in access during the slot window</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Hours */}
      <Section title="Hours — Phase 1 vs Phase 2">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-2 px-2"></th>
                <th className="text-left py-2 px-2">Phase 1 (June 1, recovery only)</th>
                <th className="text-left py-2 px-2">Phase 2 (mid-June+, treatments live)</th>
              </tr>
            </thead>
            <tbody>
              {LOUNGE_FINAL.hours.map((h, i) => (
                <tr key={i} className={`border-b border-black/5 last:border-b-0 ${h.bold ? "bg-emerald-50 font-bold" : ""}`}>
                  <td className="py-2 px-2 text-xs font-medium">{h.day}</td>
                  <td className={`py-2 px-2 text-xs ${h.bold ? "text-emerald-900" : ""}`}>{h.p1}</td>
                  <td className={`py-2 px-2 text-xs ${h.bold ? "text-emerald-900" : ""}`}>{h.p2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 bg-gray-50 rounded p-3 border border-gray-200">
          <h4 className="text-[11px] uppercase tracking-wider opacity-70 mb-2">Data backing the hours</h4>
          <ul className="text-[11px] space-y-1 opacity-90">
            {LOUNGE_FINAL.hoursData.map((d, i) => (
              <li key={i} className="flex gap-2"><span className="opacity-50">·</span><span>{d}</span></li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Demand data */}
      <Section title="Demand composition (last 6 months, 4,916 visits, both locations)">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-1.5 px-2">Visit type</th>
                <th className="text-right py-1.5 px-2">Visits</th>
                <th className="text-right py-1.5 px-2">%</th>
              </tr>
            </thead>
            <tbody>
              {LOUNGE_FINAL.visitComposition.map((v, i) => (
                <tr key={i} className={`border-b border-black/5 last:border-b-0 ${v.highlight ? "bg-amber-50" : ""}`}>
                  <td className={`py-2 px-2 text-xs ${v.highlight ? "font-bold" : ""}`}>{v.type}</td>
                  <td className="py-2 px-2 text-right font-mono text-xs">{v.visits.toLocaleString()}</td>
                  <td className={`py-2 px-2 text-right font-mono text-xs ${v.highlight ? "font-bold text-amber-900" : ""}`}>{v.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <div className="bg-amber-50 rounded p-3 border border-amber-300">
            <div className="text-[10px] uppercase tracking-wider font-bold text-amber-900 mb-1">Infrared-only share — RiNo</div>
            <div className="text-2xl font-bold text-amber-900 tabular-nums">{LOUNGE_FINAL.infraredOnlyShare.rino.pct}</div>
            <div className="text-[11px] opacity-80">{LOUNGE_FINAL.infraredOnlyShare.rino.num} of {LOUNGE_FINAL.infraredOnlyShare.rino.total} visits — these members get the guaranteed cabin via the reservation option</div>
          </div>
          <div className="bg-amber-50 rounded p-3 border border-amber-300">
            <div className="text-[10px] uppercase tracking-wider font-bold text-amber-900 mb-1">Infrared-only share — Central Park</div>
            <div className="text-2xl font-bold text-amber-900 tabular-nums">{LOUNGE_FINAL.infraredOnlyShare.cp.pct}</div>
            <div className="text-[11px] opacity-80">{LOUNGE_FINAL.infraredOnlyShare.cp.num} of {LOUNGE_FINAL.infraredOnlyShare.cp.total} visits</div>
          </div>
        </div>
      </Section>

      {/* Peak hours + infrared crunch */}
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Peak hours">
          <div className="space-y-2">
            {LOUNGE_FINAL.peakHours.map((p, i) => (
              <div key={i} className="border-b border-black/5 pb-2 last:border-b-0">
                <div className="font-bold text-sm">{p.loc}</div>
                <div className="text-xs opacity-80">Biggest hour: <b>{p.peak}</b> · avg {p.avg} concurrent · max {p.max} observed</div>
              </div>
            ))}
          </div>
          <p className="text-[11px] opacity-70 mt-3 italic">
            Day-of-week: Sunday is the biggest day at both locations. CP runs 2.7× Monday volume on Sundays. Weekday secondary peaks 4-7pm at both.
          </p>
        </Section>

        <Section title="Infrared crunch (the bottleneck)">
          <div className="space-y-2">
            {LOUNGE_FINAL.infraredCrunch.map((c, i) => (
              <div key={i} className="border-b border-black/5 pb-2 last:border-b-0">
                <div className="font-bold text-sm">{c.loc}</div>
                <div className="text-[11px] opacity-80 space-y-0.5">
                  <div>Slots at cap: <b>{c.atCap}</b></div>
                  <div>Worst window: <b>{c.worst}</b></div>
                  <div>Total infrared check-ins: {c.checkins}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Competitors */}
      <Section title="Competitor landscape — where Sway fits">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-1.5 px-2">Brand</th>
                <th className="text-left py-1.5 px-2">Model</th>
                <th className="text-left py-1.5 px-2">Books</th>
                <th className="text-left py-1.5 px-2">Why</th>
              </tr>
            </thead>
            <tbody>
              {LOUNGE_FINAL.competitors.map((c, i) => (
                <tr key={i} className={`border-b border-black/5 last:border-b-0 ${c.locked ? "bg-emerald-50 font-medium" : ""}`}>
                  <td className={`py-2 px-2 ${c.locked ? "text-emerald-900 font-bold" : "font-medium"}`}>{c.brand}</td>
                  <td className="py-2 px-2 opacity-80">{c.model}</td>
                  <td className="py-2 px-2 opacity-80">{c.books}</td>
                  <td className="py-2 px-2 text-[11px] opacity-70">{c.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] opacity-70 mt-3 italic">
          <b>Pattern:</b> social/recovery-lounge brands run open-floor for unconstrained modalities and book only where capacity is tight. Clinical brands book everything. Sway&apos;s positioning is social, so the model is open-floor + targeted reservation for infrared only.
        </p>
      </Section>

      {/* Pricing comparison */}
      <Section title="Pricing — Denver-local + national benchmarks">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider opacity-60 border-b border-black/10">
                <th className="text-left py-1.5 px-2">Brand</th>
                <th className="text-right py-1.5 px-2">Drop-in</th>
                <th className="text-right py-1.5 px-2">Unlimited</th>
                <th className="text-right py-1.5 px-2">Breakeven</th>
                <th className="text-left py-1.5 px-2">Positioning</th>
              </tr>
            </thead>
            <tbody>
              {LOUNGE_FINAL.pricingCompare.map((p, i) => (
                <tr key={i} className={`border-b border-black/5 last:border-b-0 ${p.locked ? "bg-emerald-50" : ""}`}>
                  <td className={`py-2 px-2 ${p.locked ? "font-bold text-emerald-900" : "font-medium"}`}>{p.brand}</td>
                  <td className="py-2 px-2 text-right font-mono whitespace-nowrap">{p.drop}</td>
                  <td className="py-2 px-2 text-right font-mono whitespace-nowrap">{p.unlimited}</td>
                  <td className={`py-2 px-2 text-right font-mono whitespace-nowrap ${p.locked ? "font-bold text-emerald-900" : ""}`}>{p.breakeven}</td>
                  <td className="py-2 px-2 text-[11px] opacity-70">{p.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <div className="bg-emerald-50 rounded p-3 border border-emerald-300 text-[11px]">
            <b className="text-emerald-900">Founding tier (2.0 visits/mo breakeven):</b> Existing Upswell members + launch-window signups through Aug 31. Locked rate for life of membership. Best ratio in the entire competitive set.
          </div>
          <div className="bg-emerald-50 rounded p-3 border border-emerald-300 text-[11px]">
            <b className="text-emerald-900">Standard tier (2.6 visits/mo breakeven):</b> Post-Aug 31 signups at $129/mo. Still beats every full-multi-modality competitor (Denver Sports Recovery 2.7-3.4, Bathhouse 3.3, Othership 6-8, HigherDose 4-6).
          </div>
        </div>
        <p className="text-[11px] opacity-70 mt-3 italic">
          <b>On Embrace North:</b> Their $50/mo / $25 drop-in is a different product (3 saunas + 1 cold plunge, no infrared/compression/treatments). Don&apos;t race to the bottom — Sway is the premium tier above them. <b>$25 first-time intro</b> neutralizes their trial pricing, then the full Sway experience converts to membership. <b>On Larimer:</b> No price overlap concern — Larimer&apos;s $99-159/mo are credit-based (1 treatment/mo) and Larimer Remedy Room membership is $99/mo for 4 visits. Sway new is fundamentally different product (unlimited recovery lounge).
        </p>
      </Section>

      {/* Phase plan */}
      <Section title="Phase plan">
        <div className="grid lg:grid-cols-2 gap-3">
          {LOUNGE_FINAL.phases.map((p, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-[10px] uppercase tracking-wider opacity-60">{p.phase}</div>
              <h4 className="font-bold text-sm mb-2">{p.label}</h4>
              <ul className="text-[11px] space-y-1">
                {p.items.map((item, j) => (
                  <li key={j} className="flex gap-2"><span className="opacity-50 mt-0.5">·</span><span className="opacity-90">{item}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Operational rules */}
      <Section title="Operational rules">
        <div className="space-y-2">
          {LOUNGE_FINAL.operations.map((op, i) => (
            <div key={i} className="flex justify-between gap-4 border-b border-black/5 pb-2 last:border-b-0 last:pb-0 text-sm">
              <span className="font-medium">{op.rule}</span>
              <span className="opacity-80 text-right">{op.detail}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer note */}
      <div className="bg-emerald-50 rounded-xl border-2 border-emerald-500 p-4 text-xs">
        <p className="leading-relaxed">
          <b>Data sources:</b> Upswell Mariana Tek admin (May 26 2026 pull). Reports: <code className="bg-white px-1 rounded">report-reservations.csv</code> (55,616 rows), <code className="bg-white px-1 rounded">report-average-attendance-by-time-slot.csv</code>, <code className="bg-white px-1 rounded">report-customer-frequency.csv</code>, <code className="bg-white px-1 rounded">report-customer-retention-details.csv</code>. Window analyzed: Nov 26 2025 → May 12 2026 (last 6 months). 4,916 recovery visits at RiNo + CP combined.
        </p>
      </div>
    </div>
  );
}

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
