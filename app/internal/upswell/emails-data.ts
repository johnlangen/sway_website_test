/**
 * Email campaign drafts — synced with docs/upswell-conversion/email-*.md
 *
 * NOTE: This is hand-maintained. If the .md files change, update here too.
 * The dashboard renders these for at-a-glance review.
 *
 * May 20 revision — campaign strategy reshape:
 *   - Heather's 01a/01b/12 are her FINAL May 15 language and are preserved verbatim.
 *   - Killed Emails 02, 04, 05, 06 (no priority booking, no Sway app, no pre-launch
 *     marketing on a logo-swap day, no complimentary first massage). June 1 is a
 *     logo + signage swap — nothing new is bookable, so no goodwill-emails from
 *     Heather pretending otherwise.
 *   - Heather sends ONLY one more before takeover: Email 03 (May 22). Plus a light
 *     Heather welcome on June 1 (Email 07).
 *   - Sway-domain Phase 3 emails (08-11) defer until massage + facials are actually
 *     bookable (mid-to-late June). No specific dates; relative cadence after Email 08.
 *   - Removed all "Sway app" references — booking is via swaywellnessspa.com or at
 *     the front desk.
 *   - Removed Aescape promises from forward (unsent) emails — uncertain timeline.
 *     Facials stay (open with massage per May 20 decision).
 *   - Recovery space at the new locations = "Sway Remedy Lounge" (Heather's locked
 *     naming). Larimer's = "Remedy Room."
 */

export type EmailDraft = {
  n: string;
  date: string;
  dateISO: string;
  title: string;
  from: string;
  fromDomain: "upswell" | "sway" | "press";
  to: string;
  toCount: number;
  csv: string;
  subjectOptions: string[];
  previewText: string;
  body: string;
  classification: "transactional" | "marketing" | "transactional-with-marketing";
  notes?: string;
};

export const EMAIL_DRAFTS: EmailDraft[] = [
  {
    n: "01a",
    date: "May 15 noon",
    dateISO: "2026-05-15",
    title: "Member announcement — Heather ($99 proactive drop + auto-enroll)",
    from: "Heather Holland · heather@upswellstudio.com",
    fromDomain: "upswell",
    to: "Active members (155) — regardless of marketing opt-in",
    toCount: 155,
    csv: "01-members-transactional-155.csv",
    subjectOptions: [
      "A letter from Heather: Upswell Studios are transitioning into Sway",
    ],
    previewText: "An important update about Upswell, and a benefit for you.",
    classification: "transactional",
    body: `Hi friends,

I'm reaching out with an important update about Upswell.

Beginning June 1, a new chapter unfolds at RiNo and Central Park.

The Upswell locations will transition into Sway Wellness Club, a modern wellness concept created by Spavia, a Colorado-born, founder-led company with 20 years in wellness and hospitality.

After spending time with the Spavia founders, Marty and Allison, and their team, we discovered kindred partners whose approach to care and hospitality aligns deeply with what we built at Upswell. We shared a vision for creating spaces that help people feel better in their bodies and lives, and believed coming together could help these spaces grow and thrive for years to come.

Beginning June 1, a lot will feel familiar.

The recovery experiences you already know and love — sauna, cold plunge, and revive — are staying exactly the same and will now live under the Sway Remedy Lounge. The team who welcomed you into Upswell will be there to welcome you into Sway. Hours will initially remain the same, then gradually expand into full-day access over time.

I'll also be stepping into the role of COO at Spavia, and will remain closely connected to the team, spaces, and community moving forward.

At the same time, some important things are changing.

Movement classes will not continue under Sway. Our teachers and movement community have always been part of the heartbeat of Upswell, and we're working with trusted friends in the industry to help our teachers and students continue practicing in aligned spaces nearby. We'll share more details and community offers soon.

For current members, here's what to expect:

- Effective immediately, all memberships will move to an exclusive $99 Sway Remedy Lounge Unlimited rate reserved only for the Upswell community
- Through May 31, Upswell will continue operating as usual, including classes
- Beginning June 1, the same friendly faces will welcome you into Sway for the recovery experiences you know and love
- Throughout the summer, the spaces will gradually evolve to include massage therapy, facials, new recovery technologies, and expanded daytime hours

If you'd like to flow forward with us into Sway, there's nothing you need to do — just keep showing up. If you'd like to make a change to your membership or have questions, simply reply to this message. We're here for you.

One more thing…

Upswell isn't disappearing. After a summer rest, Upswell will return to its roots — moving, playing, and gathering in outdoor spaces and beautiful places. I hope you'll continue following along as the journey unfolds.

And finally, thank you.

What we built together in these spaces was special. Thank you for bringing warmth, energy, and life into Upswell over the years. I carry deep gratitude for this community, our team, and all the people who helped shape it.

I hope to see you on the other side :)

Be well & stay vibrant,
Heather`,
    notes: "FINAL version from Heather May 15 (SENT). Frames Sway as Spavia-created (parent brand), Heather stepping into COO at Spavia not Sway. New recovery space name: 'Sway Remedy Lounge.' $99 rate effective immediately for current members. Yoga continues through May 31 then winds down. June 1 brand transition. Reply-based opt-out for changes. NOTE: this version contains em dashes per Heather's draft — John's house style prefers no em dashes but Heather's voice owns this email.",
  },
  {
    n: "01b",
    date: "May 15 noon",
    dateISO: "2026-05-15",
    title: "Non-member announcement — Heather (positive new chapter)",
    from: "Heather Holland · heather@upswellstudio.com",
    fromDomain: "upswell",
    to: "Marketing-opted-in non-members (~4,470 after dedup against members)",
    toCount: 4470,
    csv: "02-announce-may15-all-4628.csv MINUS 01-members-transactional-155.csv",
    subjectOptions: [
      "New Wellness: Upswell is becoming Sway",
      "A Positive New Chapter: Upswell is becoming Sway",
    ],
    previewText: "A new chapter at RiNo and Central Park, and a $99 lock-in rate before June 1.",
    classification: "marketing",
    body: `Hi friends,

A new chapter is coming to RiNo and Central Park, and I wanted you to hear it directly from me: on June 1, 2026, the Upswell wellness clubs will officially become Sway Wellness Club.

Upswell isn't going away. We're returning to our roots and focusing on outdoor experiences and community activations, while the indoor wellness clubs evolve into Sway.

The recovery experiences you already know and love — sauna, cold plunge, and revive — are staying exactly the same and will now live under the Sway Remedy Lounge. The team who welcomed you into Upswell will be there to welcome you into Sway. Hours will initially remain the same, then gradually expand into full-day access over time.

What's coming next:
- Massage therapy in newly finished treatment suites opening mid-to-late June
- Advanced facials featuring Eminence Organics and Dr. Dennis Gross protocols arriving later this summer
- AI-powered Aescape robot massage, the only one in Denver outside Sway's Larimer Square flagship

If you want to experience Sway today, we'd love to welcome you to our Larimer Square flagship location, now fully open with massage, facials, Aescape AI Massage, and the Remedy Room. As a welcome, your first visit is $99 (regularly $139), including $40 off your first experience. Schedule here.

Sway was recently recognized as:
- #4 Best Day Spa in America by USA Today 10Best
- Best U.S. Day Spa by The Zoe Report 2026

If you've been thinking about joining, now is the time to secure exclusive Upswell pricing at $99/month for Unlimited Remedy Lounge access before June 1. Reserve your rate [here].

One more thing…

Upswell isn't disappearing. After a summer rest, Upswell will return to its roots — moving, playing, and gathering in outdoor spaces and beautiful places. I hope you'll continue following along as the journey unfolds.

And finally, thank you.

What we built together in these spaces was special. Thank you for bringing warmth, energy, and life into Upswell over the years. I carry deep gratitude for this community, our team, and all the people who helped shape it.

I hope to see you on the other side :)

Be well & stay vibrant,
Heather`,
    notes: "FINAL version from Heather May 15 (SENT). Hybrid plan: 'Reserve your rate' CTA links to Heather's Mariana Tek signup (not /sway-club) so she can capture $99 memberships during May 16-31 to offset Upswell's operating expenses. Sway gains those members on June 1. Facials still framed as 'later this summer' (NOT mid-to-late June with massage) — leaving room for slippage. /sway-club remains live for anyone who prefers rate-reservation without immediate billing.",
  },
  {
    n: "03",
    date: "May 22",
    dateISO: "2026-05-22",
    title: "Member details + first-week guide (4 versions: A / A-MIXED / B / C)",
    from: "Heather Holland · heather@upswellstudio.com",
    fromDomain: "upswell",
    to: "Active members, segmented by tier + behavior",
    toCount: 155,
    csv: "01-members-transactional-155.csv (split: A ~87, A-MIXED ~21, B ~73, C 1)",
    subjectOptions: [
      "Your Sway membership: what changes (and what doesn't)",
      "The details on your transition — rate is locked at $99",
      "A personal note about yoga and your membership (A-MIXED)",
      "Your Upswell partner access — what changes on June 1 (B)",
    ],
    previewText: "Your rate is locked at $99. Your space is the same. Here's everything you need to know.",
    classification: "transactional",
    body: `[VERSION A — Recovery-focused paying member · ~87 recipients]

Hi {first_name},

Last week I shared the news: on June 1, the Upswell wellness clubs at RiNo and Central Park become Sway Wellness Club, a Spavia concept. This note is the specifics on what your membership becomes.

**Your rate is locked at $99/month.** If you were paying more, your rate drops to $99 starting your next billing cycle. If you were at $99 or less, no change. Exclusive to current members.

**Your Sway Remedy Lounge access is the same.** Sauna, cold plunge, and revive — same rooms, same equipment, same access. Hours stay similar through June; extended hours gradually expand into full-day access over the summer.

**What changes on June 1.** Honestly, not much you'll see day one: new signage, small finishing touches, same friendly faces at the front desk. Recovery operations continue uninterrupted.

**What's coming later in June.** Massage therapy and advanced facials open in newly-built treatment suites later in June. As a member, your rate is $99 per 50-minute session for both (regularly $139). We'll send the booking link as soon as reservations open. Exact date depends on final buildout and licensing.

**About your card.** For security, we can't transfer card information directly from Upswell's system to Sway. The front desk will get you set up in about 30 seconds on your first Sway visit. Your first visit is on us as a thank-you for the friction.

**Parking + hours.** Same as Upswell — nothing changes. Current hours posted at swaywellnessspa.com/locations.

If anything about this transition doesn't feel right, reply. I read every one.

Be well,
Heather

---

[VERSION A-MIXED — Paying member who used yoga AND recovery · ~21 recipients]

Hi {first_name},

Last week I shared the news that Upswell at RiNo and Central Park is becoming Sway Wellness Club on June 1.

I'm writing to you specifically because our records show you used both the recovery space AND yoga classes here. Some of this is good news, some of it isn't, and I want to be direct about both.

**Good news first — your rate is going to $99/month.** If you were paying more, that's a drop. If you were at $99 or less, no change. Locked, no re-signing, no surprise increase.

**Your Sway Remedy Lounge access is the same.** Sauna, cold plunge, and revive — same rooms, same equipment. The team who welcomed you into Upswell will welcome you into Sway.

**The hard part — yoga and Pilates are winding down.** Yoga continues through May 31 at Upswell. After that, the indoor wellness clubs evolve into Sway, which focuses on massage, facials, and recovery — not movement classes. I know yoga is part of what you came for, and I don't want to gloss over it.

**Three things I want to make available to you:**

1. Stay at $99/month, keep using the Sway Remedy Lounge, and add massage + facials at $99/session when they open later in June.
2. Move to a yoga studio you'll love. I have personal recommendations and I'll make introductions. The River Yoga (RiNo) is offering Upswell students $59 for an unlimited month — reply and I'll send the private link. CorePower, Yoga Pod, and Kindness are other good options.
3. Refund the rest of your time — pro-rata refund, no hard feelings.

Reply with what works for you. If we don't hear from you, we'll keep your membership active at the $99 Sway Remedy Lounge rate — but I want it to be your choice.

Be well,
Heather

P.S. About your card — the front desk will get you set up on your first Sway visit, and that first visit is on us.

---

[VERSION B — Partner / comp tier ($0) · ~73 recipients]

Hi {first_name},

You currently have access at our locations through {partner_program_name}.

On June 1, the locations become Sway Wellness Club. Your access continues — we're working with each partner program to confirm exactly how it maps under the Sway brand.

You'll get a specific note from us within 2 weeks with the confirmed details. Please don't try to book before then.

Be well,
Heather

---

[VERSION C — Annual prepay · 1 recipient: Terry Wei]

Hi Terry,

You're our only active annual prepay member, which means I wanted to write you personally.

Your annual term — purchased Dec 29, 2025, runs through Dec 29, 2026 — is honored in full. Same access, no changes.

Our records show you've used yoga as part of your time here. Yoga continues through May 31. After that, two options if the change in offerings affects you:

1. Continue through your term, use the Sway Remedy Lounge plus massage and facials when they open later in June (at the $99 member rate).
2. Pro-rata refund for the remaining term — say the word.

When your term ends, we'll reach out with renewal options. Reply anytime.

Be well,
Heather`,
    notes: "May 20 rewrite: absorbed the useful logistics from killed Email 04 (hours, card, parking, first visit on us). Removed all 'Sway app' references — booking is via swaywellnessspa.com or front desk. No specific massage/facial date — 'later in June.' Uses 'Sway Remedy Lounge' per Heather's locked terminology. Frames Sway as Spavia concept. 4 yoga-heavy active members (Christina, Gregory, Jessica, Nathan) DO NOT get this email — personal calls from Heather instead.",
  },
  {
    n: "07",
    date: "Jun 1",
    dateISO: "2026-06-01",
    title: "Launch day member welcome (Heather, light)",
    from: "Heather Holland · heather@swaywellnessspa.com",
    fromDomain: "sway",
    to: "Active members (155)",
    toCount: 155,
    csv: "01-members-transactional-155.csv",
    subjectOptions: ["Today is the day", "Welcome to Sway", "We're open as Sway"],
    previewText: "A short note from Heather on day one.",
    classification: "transactional",
    body: `{first_name} —

It's official. As of today, you're a member of Sway Wellness Club at {home_location}.

This took a year of work and a lot of decisions I wasn't sure about. The reason any of it went right is because you stayed. Before today gets busy: thank you.

A few quick things:

**Walk in whenever you want.** Same Sway Remedy Lounge — sauna, cold plunge, and revive. Same hours through June, expanding into full-day access over the summer. Your $99 member rate applies.

**Massage suites and facial treatment rooms open later this month.** We're finishing them with the care you'd expect. As soon as we open reservations, you'll get a link in your inbox. Member rate is $99 for a 50-minute session for both.

**If anything feels off** — system, scheduling, signage, vibe, anything — tell us. Reply or grab a team member at the front desk. The first weeks are when we learn.

Come in. Use the space. Feel out the new chapter.

Be well,
Heather

P.S. Your first Sway visit is on the house — a thank-you for re-adding your card at the front desk on the way in. Just stop by.`,
    notes: "May 20 rewrite: short Heather note. No app references. No specific massage/facial date (later this month). No Aescape mention. Uses 'Sway Remedy Lounge.' 6 AM send.",
  },
  {
    n: "08",
    date: "When massage + facials open",
    dateISO: "9999-12-31",
    title: "Public launch — Sway is open, $40 off first visit (Phase 3 kickoff)",
    from: "Sway · contact@swaywellnessspa.com",
    fromDomain: "sway",
    to: "All marketing-opted-in non-members (~4,470)",
    toCount: 4470,
    csv: "02-announce-may15-all-4628.csv MINUS 01-members-transactional-155.csv",
    subjectOptions: [
      "Sway is open at RiNo and Central Park. $40 off your first visit.",
      "Massage and facials are here.",
      "We're open, and bookable.",
    ],
    previewText: "50-minute massage or facial for $99 — for Denver locals, no membership required.",
    classification: "marketing",
    body: `Hi {first_name},

Sway is now open at RiNo (3636 Blake St) and Central Park (2271 Clinton St) — bringing what's been missing to the neighborhood: expert massage therapy and advanced facials, in brand-new treatment suites.

**Your first visit is $40 off.**
50-minute Essential Signature Massage or Facial — just $99 (regularly $139). One-time intro pricing, no membership required. For Denver-area locals.

[Book at RiNo →] [Book at Central Park →]

**What's at your location:**
- Expert massage therapy in newly-built treatment suites
- Advanced facials with Eminence Organics + Dr. Dennis Gross protocols
- The Sway Remedy Lounge — sauna, cold plunge, and revive
- A more reliable operating schedule than these locations had before

**Two membership options:**

**Sway Membership · $99/mo** — massages + facials at $99 each, 50% off recovery, all three Sway locations.

**Sway Unlimited · $99/mo** *(RiNo + Central Park only)* — unlimited Sway Remedy Lounge, plus member rates on massage and facials.

[See memberships →]

Voted #4 Best Day Spa in America by USA Today 10Best and Best U.S. Day Spa by The Zoe Report 2026. Now in three Denver neighborhoods.

— Sway`,
    notes: "May 20 rewrite: deferred from June 2 to fire ONLY when massage + facials are actually bookable (mid-to-late June). Don't burn the 4,470-person warm list on a logo swap. This is the Phase 3 kickoff; emails 09/10/11 follow at +1/+2/+3 weeks. No Aescape promise. Uses 'Sway Remedy Lounge' for the new locations.",
  },
  {
    n: "09",
    date: "~1 week after Email 08",
    dateISO: "9999-12-31",
    title: "Re-engagement — Lost segment",
    from: "Sway · contact@swaywellnessspa.com",
    fromDomain: "sway",
    to: "Retention 'Lost,' marketing-opted-in (1,406)",
    toCount: 1406,
    csv: "04-reengagement-lost-1406.csv",
    subjectOptions: [
      "It's not the same place. Come back and see.",
      "We changed. Worth a re-visit?",
      "Your old wellness club, evolved",
    ],
    previewText: "Massage and facials are new. Recovery is the same. $40 off your first visit.",
    classification: "marketing",
    body: `Hi {first_name},

The wellness club at {home_location} used to be Upswell. Now it's Sway — and there's a real reason to come back.

You used to come here. Then you didn't. We don't know exactly why — schedule, life, the space stopped fitting. Most reasons aren't dramatic.

But something changed worth telling you about.

**What's the same:** the Sway Remedy Lounge — sauna, cold plunge, and revive. Same rooms, same equipment.

**What's new:**
- Expert massage therapy in brand-new treatment suites — never available at Upswell. Member rate $99 (drop-in $139).
- Advanced facials — Eminence Organics + Dr. Dennis Gross protocols. Member rate $99.
- More open days, more reliable hours. Upswell ran a limited schedule by the end. Sway is open 7 days.

**Welcome back. $40 off your first Sway visit.**
50-minute massage or facial — $99. No membership required.

[Book at RiNo →] [Book at Central Park →]

— Sway`,
    notes: "May 20 rewrite: defers from June 8 to ~1 week after Email 08 (so it only fires once massage + facials are actually open). No Aescape mention. 'Sway Remedy Lounge' framing.",
  },
  {
    n: "10",
    date: "~2 weeks after Email 08",
    dateISO: "9999-12-31",
    title: "Re-engagement — At Risk (urgency)",
    from: "Sway · contact@swaywellnessspa.com",
    fromDomain: "sway",
    to: "Activity 'At Risk,' marketing-opted-in (after dedupe from Email 09)",
    toCount: 2500,
    csv: "04b-reengagement-at-risk-3519.csv MINUS 04-reengagement-lost-1406.csv",
    subjectOptions: [
      "Last chance: $40 off your first Sway visit",
      "Two weeks open. We'd love to see you.",
      "Your intro offer is still here",
    ],
    previewText: "$40 off ends soon. Use it before it's gone.",
    classification: "marketing",
    body: `Hi {first_name},

We've been open as Sway at {home_location} for about two weeks. The first wave has come in. Before our intro pricing wraps, circling back.

**Your first visit at Sway is still $40 off.**
50-minute massage or facial — $99 (regularly $139). Available through the end of this month.

[Book at RiNo →] [Book at Central Park →]

**What people are coming for in week 1:**
- Massage in the new treatment suites — the most-asked-about service
- Advanced facials — same suites, $99 member rate
- The Sway Remedy Lounge on a fuller schedule
- Sway Unlimited memberships ($99/mo, exclusive to RiNo + Central Park)

[See what's at your location →]

— Sway`,
    notes: "May 20 rewrite: defers from June 17 to ~2 weeks after Email 08. No Aescape mention. Dedupe against Email 09.",
  },
  {
    n: "11",
    date: "~3 weeks after Email 08",
    dateISO: "9999-12-31",
    title: "ClassPass conversion — the math",
    from: "Sway · contact@swaywellnessspa.com",
    fromDomain: "sway",
    to: "ClassPass users at new locations (314)",
    toCount: 314,
    csv: "05-classpass-converters-314.csv",
    subjectOptions: [
      "The math on your ClassPass: a comparison",
      "You're spending more on ClassPass than you'd pay as a member",
      "Sway membership vs. your ClassPass habit",
    ],
    previewText: "You've been visiting via ClassPass. Membership is a better deal — here's the math.",
    classification: "marketing",
    body: `Hi {first_name},

You've been visiting us at {home_location} through ClassPass.

Quick math worth considering:

**Your ClassPass spend:** typically 7-10 credits per visit = $40-$60. At 4 visits/month = $160-$240.

**What that same spend gets as a Sway member:**

**Sway Membership · $99/month**
- 50% off the Sway Remedy Lounge (visits drop to $25 each)
- Massage and facials at $99 per session (vs $139 drop-in)

**Sway Unlimited · $99/month** *(RiNo + Central Park only)*
- Unlimited Sway Remedy Lounge access
- Plus member rates on massage and facials

At 4 visits/month, Sway Unlimited pays for itself vs. ClassPass. At 6+ visits, you're way ahead.

[Compare memberships →]

If you have questions, reply and we'll answer.

— Sway`,
    notes: "May 20 rewrite: defers from June 22 to ~3 weeks after Email 08. Removed 'cancel anytime' per CLAUDE.md. No Aescape mention. Sway Unlimited at $99 (per May 12 pricing).",
  },
  {
    n: "12",
    date: "May 15 PM",
    dateISO: "2026-05-15",
    title: "Yoga loyalist graceful offboarding",
    from: "Heather Holland · heather@upswellstudio.com",
    fromDomain: "upswell",
    to: "Yoga-only + yoga-heavy buckets, opted-in (excludes 3 active members getting personal calls)",
    toCount: 357,
    csv: "10-yoga-loyalists-offboarding-357.csv",
    subjectOptions: [
      "A direct note about yoga at Upswell",
      "We have to be straight with you about yoga",
      "Yoga at Upswell — what's happening",
    ],
    previewText: "We're not continuing yoga classes. Here's the honest version of what that means for you.",
    classification: "transactional",
    body: `Hi {first_name},

I'm writing because you came to yoga at Upswell, and I owe you the direct version of what's happening.

**On June 1, the Upswell wellness clubs at RiNo and Central Park join forces with Sway** and become Sway Wellness Club. Sway is focused on massage, facials, recovery, and Aescape robot massage — they don't run movement classes. So **yoga and Pilates at the indoor wellness clubs are winding down**.

A note on what's next for Upswell: the brand isn't going away. **We're going back to our roots — outdoor yoga, pop-ups, the original Upswell.** Taking summer off to plan it out, then bringing Upswell back outside where it started. So this isn't really goodbye to Upswell, just goodbye to indoor yoga at these two locations.

I know that's the thing you came for. I want to acknowledge that clearly, not bury it.

**A few things I want to make available to you:**

**If you want to continue yoga locally**, here are studios I'd personally recommend in Denver — I've taught at or worked with most of them and they're good:

- **The River Yoga (RiNo)** — closest to our RiNo location. They're offering **$59 unlimited month** to Upswell students through a private link. → [The River Yoga $59 month link]
- **CorePower Yoga** — multiple Denver locations. *(I was COO there before founding Upswell — they were good to me and they'll be good to you.)*
- **Yoga Pod Cherry Creek + LoHi** — vinyasa, sculpt, gentle
- **Kindness Yoga** — Boulder + Denver, strong restorative + Yin practice

If you'd like an introduction to any of them, reply to this email and I'll make it.

**If you bought a class package or had unused credits**, we'll honor whatever's on your account. Two options:
1. Use the credits toward Sway services after June 1 (massage, recovery, etc.) at a 1:1 dollar conversion
2. Receive a refund for the unused balance — reply and we'll process it

**If you ever want to try the recovery side**, the saunas, cold plunge, compression therapy, and red light are all still there. You won't get a marketing email about it — but if recovery is ever on your radar, the door is open.

This wasn't an easy decision, but I want to be honest with you about it rather than pretend it isn't happening. Thank you for being part of what we built at Upswell. You made the space what it was.

— Heather

P.S. Reply to this directly if you have questions or want any of those studio introductions. I read every one.`,
    notes: "SENT May 15 PM. Historical record. Retains original Aescape mention (in the world, can't unfix). Same day as 01a/01b but separate send so yoga loyalists hear it from Heather directly.",
  },
];
