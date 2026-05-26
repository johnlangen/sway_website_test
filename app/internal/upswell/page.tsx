"use client";

import { useEffect, useState } from "react";
import { EMAIL_DRAFTS } from "./emails-data";
import { SOCIAL_POSTS, WEBSITE_TASKS } from "./content-data";

/* ---------------------------------------------
   DATA — kept inline so dashboard is self-contained
--------------------------------------------- */

const KEY_DATES = {
  today: "2026-05-11",
  announce: "2026-05-15",
  launch: "2026-06-01",
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
  status: "Revised May 25 — Stripe migration out, front-desk re-add in",
  whyChanged:
    "Stripe Data Migration Request was never initiated. Stripe Support typically takes 2-4 weeks once you ask, and we have 6 days to June 1. Even if we'd started: Mindbody Payments isn't Stripe-based — so 'transfer Stripe tokens to Mindbody' was never a real path. The only true migration option was per-member consent re-tokenization, which needs signed paperwork from each member. Not viable in this window.",
  thePath: [
    {
      step: "1",
      label: "Members re-add card at front desk on first Sway visit",
      detail: "Mindbody POS flow targets <60 seconds per add. Front desk handles it during normal check-in. First visit is on us as a thank-you for the friction (already promised in Email 03's 'first visit on us' language).",
    },
    {
      step: "2",
      label: "Extend Mariana Tek admin access 2-3 weeks past May 31",
      detail: "Heather raised this as the May 14 fallback. MT keeps billing existing members via Heather's Stripe during the runway. Members trickle in to Sway, re-add card to Mindbody, and we migrate one-by-one in-person. ASK HEATHER TODAY.",
    },
    {
      step: "3",
      label: "Front desk training: tight Mindbody card-add flow",
      detail: "Part of Mackenzie's 4-part training. Verify the team can do it in <60 seconds. Standard script: 'Welcome to Sway. Your membership rolled over at $99 — let's just get a card on file real quick. First visit's on us.'",
    },
    {
      step: "4",
      label: "Soft email reminder mid-June to members who haven't visited",
      detail: "Around June 15, send a brief 'we haven't seen you yet — come in for your free first visit and we'll get you set up' note to active members who haven't checked in since June 1. Recovers the long tail.",
    },
  ],
  revenueImpact: [
    { window: "June 1", expectedPctOfMonthly: 0, note: "No cards on file in Mindbody yet — auto-bills run on $0" },
    { window: "End of week 1 (~June 7)", expectedPctOfMonthly: 50, note: "Recovery-heavy members come in for their usual sauna/plunge routine, re-add at front desk" },
    { window: "End of week 3 (~June 21)", expectedPctOfMonthly: 80, note: "Massage + facials open mid-to-late June drives an additional wave of in-person visits" },
    { window: "Mid-July", expectedPctOfMonthly: 100, note: "Long-tail members captured via mid-June reminder" },
  ],
  risks: [
    "Members who NEVER come in are lost revenue. Mitigation: mid-June email reminder + a 'haven't seen you in a while?' follow-up at 30 days.",
    "Email 01a promised 'no card to update' — front-desk re-add is technically a contradiction. Mitigation: handle in person ('your first visit's on us, just need to get a card on file') and lean on Email 03's 'first visit on us' framing.",
    "Mariana Tek extension is up to Heather's goodwill. If she says no, we lose the billing bridge and the ramp gets harder.",
    "Front desk capacity in the first week — extra friction per visit. Mitigation: staffing slightly heavier the first two weeks.",
  ],
  asks: [
    "Heather: extend Mariana Tek admin access by 2-3 weeks past May 31 (the May 14 fallback Marty raised).",
    "Confirm Email 03 (May 22 segmented member details) actually sent. If not, send this week. Its 'first visit on us' framing IS the soft correction to Email 01a's promise.",
    "Mindbody site provisioning status — are both RiNo + Central Park sites live and ready for card capture by June 1?",
    "Mackenzie: time the Mindbody card-add flow end-to-end. Target <60 seconds. Train all front-desk staff before June 1.",
  ],
};

const BLOCKERS_P0 = [
  "🔥 TONIGHT: Pull future-reservations report from Mariana Tek before May 15 send. Heather noted someone became a member recently — need to know exactly who has bookings on the books for June 1+ so we can port them or proactively reach out.",
  "🔥 TONIGHT/FRI AM: Heather's 5 personal touches — text-first to the 4 yoga members (Jessica, Gregory, Christina, Nathan), personal email to Terry Wei. Must close before noon Friday so none of them hear from a friend first.",
  "🔥 Heather kills Upswell marketing automations at 11 PM Thursday 5/14 — confirm done so they don't fire after our Friday noon send.",
  "🆕 Payment migration: STRIPE PATH KILLED (May 25). No Stripe Data Migration Request was initiated; can't realistically complete by June 1. Front-desk re-add is the path forward. SEE: Payment Migration Plan section below.",
  "Insurance (GL + workers' comp) for both new locations — required by June 1. Commercial policies typically 2-3 weeks via broker. If not in motion already, urgency.",
  "Email send platform — locked as BrandBot (Heather's existing Upswell platform).",
  "Update /membership page to show Sway Unlimited tier — emails reference $99/mo, page needs to land them somewhere.",
  "Mindbody: set up Sway Unlimited as a Membership contract with unlimited bookings of the Remedy Room session type (session 96 at Larimer; equivalent at new locations).",
  "GBP — Heather has access. She adds John as OWNER (not Manager) on both listings this week. Submit Upswell → Sway rename request June 1 AM (Google approval 3-5 days). Preserves review history.",
  "Reply-to address for May 15 sends — still TBD per John. Decision blocks BrandBot send setup.",
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
    date: "2026-05-25",
    title: "Stripe migration KILLED — front-desk re-add is the path",
    status: "active",
    attendees: "John",
    topics: [
      "Stripe Data Migration Request — never initiated",
      "Realistic payment path for June 1",
      "Mariana Tek admin extension as the bridge",
      "Email 01a's 'no card to update' promise vs. reality",
      "Front desk training + first-visit-on-us framing",
      "June revenue ramp expectations",
    ],
    decisions: [
      "Stripe migration is OUT. No request was initiated; Stripe Support typically takes 2-4 weeks. With 6 days to June 1, it's not viable. Also: Mindbody Payments isn't Stripe — there was never a clean token-transfer path anyway. Per-member consent re-tokenization (the only true migration option) needs paperwork we can't realistically collect in 6 days.",
      "Path forward: members re-add their card at the front desk on first Sway visit. Mindbody POS flow targeted at <60 seconds. First visit on us as a thank-you for the friction (already promised in Email 03).",
      "Ask Heather to extend Mariana Tek admin access by 2-3 weeks past May 31 (per May 14 fallback that Marty raised). MT keeps billing during the runway while members come in and re-add to Mindbody.",
      "Email 01a's locked 'no card to update' promise is now soft. Front-desk re-add is the gentle correction — Email 03 already covers it ('first visit on us'). If Email 03 didn't go May 22, send ASAP. If sent, no extra correction needed — front-desk team handles it in person.",
      "June revenue: expect ~$0 from members on June 1 auto-bill, ~50% by end of week 1, ~80% by week 3, full by mid-July as members trickle in.",
    ],
    openQuestions: [
      "Did Email 03 (May 22 segmented member details) actually go out? If not, send this week — it sets up the front-desk-re-add expectation.",
      "Will Heather extend Mariana Tek access past May 31? Ask today.",
      "Mindbody site provisioning status — are RiNo + Central Park sites live and ready for member imports + card capture?",
      "Front desk Mindbody card-add flow tested + timed? Mackenzie's 4-part training plan should already cover this.",
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
    phase: "Phase 1 — Quiet brand transition (NOW → June 1)",
    color: "rose",
    tasks: [
      { task: "🔥 PAYMENT MIGRATION — ASK HEATHER TODAY: extend Mariana Tek admin access by 2-3 weeks past May 31 (the May 14 fallback Marty raised). MT keeps billing during the runway.", status: "in-progress", dep: "Heather response" },
      { task: "🔥 PAYMENT MIGRATION — Confirm Email 03 (May 22 segmented member details) actually sent. If not, send this week — its 'first visit on us' framing IS the soft correction to Email 01a's 'no card to update' promise.", status: "in-progress", dep: "" },
      { task: "🔥 PAYMENT MIGRATION — Mindbody site provisioning status check. Both RiNo + Central Park sites live and ready for member card capture on June 1?", status: "pending", dep: "Katie / Michael at Mindbody" },
      { task: "🔥 PAYMENT MIGRATION — Mackenzie: time the Mindbody card-add flow end-to-end. Target <60 seconds. Train all front-desk staff before June 1. 'Welcome to Sway. Your membership rolled over at $99 — let's get a card on file. First visit's on us.'", status: "pending", dep: "Mindbody provisioned + Mackenzie's training plan" },
      { task: "Heather completes 4 personal calls to yoga-heavy active members (Jessica, Gregory, Christina, Nathan)", status: "pending", dep: "" },
      { task: "Build /membership page — Sway Unlimited tier ($99) alongside standard Sway Membership ($99). Both tiers visible on the new location pages and main /membership.", status: "pending", dep: "" },
      { task: "Real RiNo + Central Park photos into the two location pages (replace SWAY.jpg placeholder)", status: "pending", dep: "photos from John" },
      { task: "Photo media kit folder ready for the Phase 3 PR moment", status: "pending", dep: "photos available" },
      { task: "GBP — get added as OWNER (not Manager) on both 3636 Blake + 2271 Clinton listings. Heather has access. Owner can't be revoked.", status: "pending", dep: "" },
      { task: "Begin Mindbody member data import (once site is provisioned)", status: "pending", dep: "Mindbody provisioned" },
      { task: "Soften homepage banner copy — remove any 'massage at launch' implication; lead with 'expanding to RiNo + Central Park'", status: "pending", dep: "" },
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
      { task: "💳 Mariana Tek runs in parallel through ~mid-June (extension window). Existing members keep getting billed via MT until they re-add to Mindbody at the front desk.", status: "pending", dep: "MT extension confirmed" },
      { task: "💳 Mid-June reminder email to members who haven't visited yet — 'come in for your free first visit, we'll get you set up.'", status: "pending", dep: "" },
      { task: "💳 Mariana Tek FULL SHUTDOWN — hard cutover once 80%+ of members are in Mindbody. Likely ~mid-to-late June.", status: "pending", dep: "MT extension expires + Mindbody coverage >80%" },
      { task: "Build /book routes for new locations (clone Larimer pattern, swap Mindbody IDs) — ready for Phase 3 launch", status: "pending", dep: "Mindbody IDs" },
      { task: "Mindbody booking flows tested end-to-end at both new locations", status: "pending", dep: "Mindbody provisioned" },
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
  const [tab, setTab] = useState<"overview" | "calendar" | "mylist" | "emails" | "content" | "campaigns" | "segments" | "pricing" | "blockers" | "docs">("overview");
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
            {(["overview", "calendar", "mylist", "emails", "content", "campaigns", "segments", "pricing", "blockers", "docs"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition border-b-2 ${
                  tab === t
                    ? "border-[#113D33] text-[#113D33]"
                    : "border-transparent text-[#113D33]/50 hover:text-[#113D33]"
                }`}
              >
                {t === "mylist" ? "My List" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {tab === "overview" && <OverviewTab />}
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

/* ---- Payment Migration Plan (May 25 revision — Stripe path killed) ---- */
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
      <PaymentMigrationPlan />
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
