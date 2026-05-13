"use client";

import { useEffect, useState } from "react";
import { EMAIL_DRAFTS } from "./emails-data";

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
  { name: "Re-engagement · Lost (all)", csv: "04-reengagement-lost.csv", count: 1406, useFor: "Cold re-engagement (broad)", optIn: "Yes" },
  { name: "🆕 Lost (recovery-loyal)", csv: "04a-reengagement-lost-recovery.csv", count: 1017, useFor: "HIGH-VALUE recovery-loyal churners — Sway is what they want", optIn: "Yes" },
  { name: "Re-engagement · At Risk (all)", csv: "04b-reengagement-at-risk.csv", count: 3519, useFor: "Warmer re-engagement", optIn: "Yes" },
  { name: "🆕 At Risk (recovery-loyal)", csv: "04c-reengagement-atrisk-recovery.csv", count: 575, useFor: "At-risk recovery-loyal — re-engage with urgency", optIn: "Yes" },
  { name: "ClassPass converters", csv: "05-classpass-converters.csv", count: 314, useFor: "Convert to Sway membership", optIn: "Yes" },
  { name: "Frozen memberships", csv: "06-frozen-memberships.csv", count: 3, useFor: "Phone, don't email", optIn: "No" },
  { name: "Payment failure", csv: "07-payment-failure.csv", count: 27, useFor: "Resolve before transition", optIn: "No" },
  { name: "Unredeemed credits liability", csv: "08-unredeemed-credits-liability.csv", count: 74, useFor: "Must honor in Mindbody", optIn: "No" },
  { name: "Employees (internal)", csv: "09-employees-internal.csv", count: 81, useFor: "Internal comms only", optIn: "—" },
  { name: "🆕 Yoga loyalists — graceful offboarding", csv: "10-yoga-loyalists-offboarding.csv", count: 360, useFor: "Graceful offboarding ONLY — Sway has no yoga", optIn: "Yes" },
  { name: "🆕 Sway Unlimited prime targets", csv: "12-sway-unlimited-prime-targets.csv", count: 782, useFor: "Recovery-heavy customers — perfect Sway Unlimited candidates", optIn: "Yes" },
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

const CAMPAIGNS = [
  { date: "2026-05-15", audience: "All members + opted-in", channel: "Email", goal: "Announcement (Heather voice)", from: "Heather · Upswell domain", csv: "01 + 02 deduped", status: "Drafted" },
  { date: "2026-05-15", audience: "Public", channel: "Press + blog + social + banner", goal: "Public announcement", from: "Sway brand", csv: "—", status: "Drafted" },
  { date: "2026-05-21", audience: "VIPs (211)", channel: "Email", goal: "Founding Ambassador early access", from: "Heather · Upswell domain", csv: "03b", status: "Drafted" },
  { date: "2026-05-22", audience: "Active members", channel: "Email × 3 versions", goal: "Segmented details by tier", from: "Sway team · Upswell domain", csv: "01 split", status: "Drafted" },
  { date: "2026-05-26", audience: "Active members", channel: "Email", goal: "Logistics + first visit", from: "Sway team · Upswell domain", csv: "01", status: "Drafted" },
  { date: "2026-05-27", audience: "All opted-in", channel: "Email", goal: "General pre-launch + first visit offer", from: "Sway · Upswell domain", csv: "02", status: "Drafted" },
  { date: "2026-05-30", audience: "VIPs", channel: "Email", goal: "Final priority booking link", from: "Heather · Upswell domain", csv: "03b", status: "Drafted" },
  { date: "2026-06-01", audience: "Active members", channel: "Email", goal: "Launch day welcome", from: "Heather · Sway domain", csv: "01", status: "Drafted" },
  { date: "2026-06-02", audience: "All opted-in", channel: "Email", goal: "Public brand reveal — Sway is here (massage coming late June)", from: "Sway brand · Sway domain", csv: "02", status: "Drafted" },
  { date: "2026-06-08", audience: "Lost segment", channel: "Email", goal: "Re-engagement #1", from: "Sway · Sway domain", csv: "04", status: "Drafted" },
  { date: "2026-06-17", audience: "At Risk segment", channel: "Email", goal: "Re-engagement #2 / urgency", from: "Sway · Sway domain", csv: "04b", status: "Drafted" },
  { date: "2026-06-22", audience: "ClassPass users", channel: "Email", goal: "Convert to Sway membership", from: "Sway · Sway domain", csv: "05", status: "Drafted" },
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
    note: "ONLY active annual prepay. Honor through end of term."
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

const BLOCKERS_P0 = [
  "Press contact info (name, email, phone) — blocks press release boilerplate",
  "Heather photo (high-res) — blocks LinkedIn / press / blog",
  "Email send platform decision — use whatever Heather already has for Upswell (recommend)",
  "Update /membership page to show both Sway Membership + Sway Unlimited side-by-side — emails reference these tiers, page needs to land them somewhere",
  "Mindbody: set up Sway Unlimited as a Membership contract with unlimited bookings of the Remedy Room session type (session 96 at Larimer; equivalent at new locations). Mindbody supports this natively. Not a feasibility blocker — a setup task.",
  "GBP — confirm Heather has admin access on Upswell GBPs. If YES, can update listings today (preserves Upswell reviews + local rank). If NO, file claims now (1-2 week wait).",
  "Permit applications for Phase 2 buildout — START NOW. 2-3 month lead.",
];

const BLOCKERS_P1 = [
  "Partnership decisions (Wellhub auto, ClassPass confirm listings, EGYM Wellpass evaluate, plus 14 brand partners)",
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

const MEETINGS = [
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
    title: "THE PLAN — brand transitions June 1, massage opens late June",
    color: "emerald",
    description: "June 1 is a brand transition, not a launch. Recovery space continues operating as it has — same equipment, same rooms — under Sway branding. Members migrate to Mindbody at their grandfathered rates. Massage suites open late June when license, hires, and treatment rooms are unambiguously ready. The actual NEW thing at the new locations is massage in late June.",
    pros: [
      "Realistic against the FBI license timeline (mid-to-late June arrival)",
      "Gives Emily three more weeks of breathing room on buildout",
      "Covers Jocelyn's absence cleanly — she's back ~May 26, full hiring restart possible",
      "Two PR waves instead of one (June 1 brand + late June massage) = more sustained press + paid acquisition arc",
      "One clean message, no walkbacks: 'massage opens late June' said once",
      "Members never lose recovery access; revenue continues throughout",
    ],
    cons: [
      "Public launch on June 1 is recovery-only (less complete menu)",
      "Less revenue Day 1 (no massage bookings)",
      "Requires deliberate comms across two launch moments",
    ],
    verdict: "★ COMMITTED PLAN as of May 13.",
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
    item: "Massage establishment license — STUCK at FBI background check",
    owner: "Marty",
    leadTime: "4-8 weeks standard · Standard FBI fingerprint clearance is the bottleneck · Expedited processing may be available for a fee",
    impact: "GATES massage launch. Larimer's license is location-specific and cannot cover the new addresses. Plan B target (June 7-14) likely slips to Plan C (June 21+). Marty should call CO DORA today to ask about expedited processing.",
  },
  {
    item: "EIN obtained ✓",
    owner: "Marty",
    leadTime: "Done May 13",
    impact: "Unblocks bank, payroll, vendor accounts. ✓",
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

const STAFFING_QUESTIONS = [
  {
    role: "Front desk",
    question: "Keep current Upswell front desk staff, or replace?",
    context: "Upswell pay rate: Denver minimum wage (FD reps), $24/hr (manager). They know the members and the space — member trust + continuity favor keeping. Heather/Jocelyn need to decide retention list before Jocelyn leaves Friday May 16.",
    decision: "Decision needed at Thursday May 14 site visit",
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
    "ACCESS: Heather grants John access to (a) Upswell email marketing platform, (b) upswellstudio.com domain registrar",
    "Physical infrastructure walkthrough: cameras installed? sound system in place? payment terminals — what hardware?",
    "Confirm Upswell's payment processor (Mariana Tek = Stripe — what about retail / gift card processing?)",
  ],
};

const OPERATIONAL_CHECKLIST = [
  {
    category: "Brand / digital cleanup",
    items: [
      { task: "Get domain access (upswellstudio.com) from Heather → set up redirect to swaywellnessspa.com OR transition banner saying 'we are now Sway'", owner: "John (needs Heather access)" },
      { task: "Turn off Upswell's existing marketing automations so they don't fire conflicting messages during transition", owner: "John (needs platform access)" },
      { task: "Take over Google Business Profile listings at 3636 Blake + 2271 Clinton — rename Upswell → Sway, preserve reviews. Same-day update IF Heather has admin access.", owner: "Heather (if admin) / John" },
      { task: "Confirm Sway GBP categories are set up correctly for the recovery-led format", owner: "John" },
    ],
  },
  {
    category: "Member experience setup (Mindbody)",
    items: [
      { task: "Set up Sway Unlimited as a Mindbody Pricing Option (unlimited bookings of session type 96 + new individual modality session types — cold plunge, sauna, infrared, compression)", owner: "Mindbody admin" },
      { task: "Honor existing Upswell gift cards in Mindbody — pull balances + set up redemption flow", owner: "John + Mindbody admin" },
      { task: "Pull Upswell's existing discount / promo code list from POS — decide which carry over to Sway", owner: "John" },
      { task: "Front desk training on Mindbody POS — gift cards, member lookup, discounts, walk-in flow", owner: "Jocelyn (or Heather while Jocelyn out)" },
    ],
  },
  {
    category: "Physical infrastructure (confirm at Thursday site visit)",
    items: [
      { task: "Cameras already installed? Functional? Coverage map?", owner: "Heather (walk the space)" },
      { task: "Sound system — what's in place, can it be repurposed for Sway audio?", owner: "Heather (walk the space)" },
      { task: "Payment terminals — current setup, can existing hardware work with Mindbody?", owner: "John + Heather" },
      { task: "Wi-Fi / networking / point-of-sale infrastructure — does Mindbody connect cleanly?", owner: "John + Mindbody admin" },
    ],
  },
  {
    category: "Partnerships",
    items: [
      { task: "ClassPass listing migration — KEEP with individual-modality offerings (decided May 12)", owner: "Heather" },
      { task: "Wellhub (Gympass) — SUNSET with 30+ day notice (decided May 12)", owner: "Heather" },
      { task: "Local brand partnerships review (Gravity Haus, Mach 983, Hayes, Lululemon, F45, etc.) — keep / sunset / negotiate per partnership-decisions.md", owner: "Heather + Marty" },
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
  const [tab, setTab] = useState<"overview" | "emails" | "campaigns" | "segments" | "pricing" | "blockers" | "docs">("overview");
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
            {(["overview", "emails", "campaigns", "segments", "pricing", "blockers", "docs"] as const).map((t) => (
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
        {tab === "emails" && <EmailsTab />}
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
        Of the 159 active paying members, almost all are recovery users — but <b>4 are yoga-heavy or yoga-only</b>. They need a personal call from Heather, not the standard email arc.
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
            &quot;Hey {`{name}`}, this is Heather from Upswell. Two reasons I&apos;m calling: we&apos;re becoming Sway on June 1, and I wanted you to hear that from me directly. Second — I know you joined for yoga, and Sway doesn&apos;t have yoga classes. So I want to be honest about that and figure out what would actually work for you. Options: (1) keep your membership at your current rate and use the recovery space (cold plunge, sauna, compression, red light) which all stays the same. (2) I can refund the rest of your prepaid time. (3) I&apos;m happy to introduce you to CorePower or a partner studio if you&apos;d rather continue yoga. What feels right?&quot;
          </div>
          <p className="mt-2 text-[11px] opacity-70 italic">
            Goal: not retention at any cost — it&apos;s respect. Even if they cancel, they leave feeling respected. That&apos;s 4 people who don&apos;t become public complaints.
          </p>
        </details>
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
          <b className="text-rose-900">Yoga-loyalist offboarding:</b> 360 opted-in yoga-loyalists (yoga-only + yoga-heavy) saved to <code className="bg-white px-1 rounded">10-yoga-loyalists-offboarding.csv</code>. Graceful offboarding email only — no re-engagement spam.
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
      <LaunchScenarios />
      <CriticalGating />
      <ThursdaySiteVisit />
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
        <Stat label="Marketing-opted-in" value="4,628" sublabel="51% of list — Friday email audience" />
        <Stat label="Active paying members" value="109" sublabel="excluding employees + $0 partner tiers" />
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
          <li>✓ <b>ClassPass continues</b> at new locations (same circuit-based listings as Larimer)</li>
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

/* ---- Emails tab ---- */
function EmailsTab() {
  return (
    <div className="space-y-4">
      <Section title="11 email drafts — full content">
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

      {EMAIL_DRAFTS.map((e) => {
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
