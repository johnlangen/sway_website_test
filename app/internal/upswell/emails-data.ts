/**
 * Email campaign drafts — synced with docs/upswell-conversion/email-*.md
 *
 * NOTE: This is hand-maintained. If the .md files change, update here too.
 * The dashboard renders these for at-a-glance review.
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
    to: "Active members (159) — regardless of marketing opt-in",
    toCount: 159,
    csv: "01-members-transactional.csv",
    subjectOptions: [
      "A letter from Heather — and a thank-you",
      "Upswell is becoming Sway · your new $99 rate",
      "Your rate is going down",
    ],
    previewText: "We're moving every current member to $99/month — exclusive to you. Read on.",
    classification: "transactional",
    body: `Hi {first_name},

I have news, and it's the kind I want you to hear from me directly: **Upswell RiNo and Upswell Central Park are becoming Sway** — Denver's modern wellness club — on **June 1, 2026**.

And before anything else: **a benefit for you.**

**We're proactively moving every existing member to our new $99/month Sway Unlimited rate** — exclusive to you. If you were already at $99 or less, you stay where you are. If you were at $129, $159, or $189, your rate is going DOWN starting with your next billing cycle. This rate is exclusive to current members during the transition — new members signing up later won't get it.

**Your membership auto-rolls over. No action needed on your part.** No re-signing, no re-confirming, no card to update.

**The recovery space is the same space.** Saunas, cold plunge, compression, red light therapy — same rooms, same equipment. On a fuller, more reliable schedule than we've been able to maintain in the last few months.

**What's new at your location:** Sway brings expert massage therapy in newly-finished treatment suites — opening **June 15**. Advanced facials and AI-powered Aescape robot massage come later this summer. As a member, you'll have access to massage at **$99 per 50-minute session** (regularly $139) — that's a real perk on top of everything you already have.

**Why this move:** after pouring myself into building Upswell, I came on as COO at Sway because I believe in what they're building. These locations deserve more services, more capacity, and the operational backbone I couldn't deliver solo.

**One optional thing you can do today:** if you want to lock in some launch-week perks, **tell us a few things about how you use the space → [Confirm here]**. We'll use it to pre-build your account in the new system, save your therapist preferences, and put your first complimentary massage on the calendar for the week of June 15. Not required — just nice to have.

**If you'd rather not continue**, just reply to this email and we'll take care of it gracefully — pro-rata refund, no hard feelings.

That's the news. The rest of the details — what's coming, what's different at your specific tier, how the transition unfolds — comes in a follow-up next week.

— Heather

P.S. Reply to this directly with anything. I read every one.`,
    notes: "May 14 PM revision per Heather's response doc: now the $99 proactive drop (Option 2). All members move to $99/mo Sway Unlimited regardless of historical rate. ~$3K/mo revenue decrease (~$36K/yr) but stronger retention + cleaner Mindbody setup. Auto-enroll continues. Optional 'Confirm here' CTA gets engagement + perks. Send time shifted from AM to NOON Friday 5/15 (so Upswell team has FAQs Thursday eve + Friday AM before public message).",
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
    csv: "02-announce-may15-all.csv MINUS 01-members-transactional.csv",
    subjectOptions: [
      "A new chapter at RiNo + Central Park",
      "Upswell is becoming Sway",
      "What's next for your wellness space",
    ],
    previewText: "A positive new chapter — everything you came for, plus what's been missing.",
    classification: "marketing",
    body: `Hi {first_name},

A new chapter, and one I want you to hear about from me: **Upswell RiNo and Upswell Central Park are becoming Sway** — Denver's modern wellness club — on **June 1, 2026**.

The recovery space stays exactly the same. Saunas, cold plunge, compression, red light therapy — same rooms, same equipment, on a fuller and more reliable schedule.

**What's new:**
- **Massage therapy** in newly-finished suites — opens **June 15**
- **Advanced facials** with Eminence Organics + Dr. Dennis Gross protocols — late summer
- **AI-powered Aescape robot massage** — the only one in Denver outside Sway's Larimer location — late summer
- **More days open. More hours.** A reliable schedule.

**Sway's track record:** voted #4 Best Day Spa in America by USA Today 10Best, Best U.S. Day Spa by The Zoe Report 2026. Now in three Denver locations.

**Why me:** after pouring myself into building Upswell, I came on as COO at Sway because I believe in what they're building. These locations deserve more services, more capacity, and the operational backbone I couldn't deliver solo.

**Want to be there from day one?** [See what's coming + join the waitlist →]

— Heather

P.S. If you came to Upswell for yoga, I want you to know it's winding down at these locations. If you want a personal introduction to CorePower, Yoga Pod, The River, or a partner studio, reply — I'll make it.`,
    notes: "May 14 revision — SPLIT email-01 into 01a (members, auto-enroll) and 01b (opt-in non-members, marketing). This sends to opt-in non-members only — those who consented to Upswell marketing. Frames the change as a positive new chapter. Soft yoga handoff at the end for the small subset that came for movement classes.",
  },
  {
    n: "02",
    date: "May 21",
    dateISO: "2026-05-21",
    title: "VIP early access — Founding Ambassadors",
    from: "Heather Holland · heather@upswellstudio.com",
    fromDomain: "upswell",
    to: "VIPs · Champion + Loyal, marketing-opted-in",
    toCount: 211,
    csv: "03b-vip-marketing-opted-in.csv",
    subjectOptions: [
      "You're getting first access",
      "Founding Ambassadors of Sway — that's you",
      "Before we open the doors",
    ],
    previewText: "A small thank-you to the people who made this place what it is.",
    classification: "transactional-with-marketing",
    body: `Hi {first_name},

I'm sending this to a small group of people — about 200 of you — who showed up for Upswell more than anyone else over the last two years.

You're the people who came in three times a week. Who brought your friends. Who told us when something wasn't working and stuck around while we fixed it. You're the reason this place became a place at all.

When we open as **Sway** on June 1, I want you to walk in first.

**Here's what that looks like:**

- **Priority booking for opening week.** Starting Friday May 30, you'll get a link to book before public reservations open. First pick of times, first pick of therapists.
- **Founding Ambassador status** in your member profile. We'll honor it through every future change to the brand — and it'll mean something when Phase 2 services (facials, Aescape robot massage) launch later this summer.
- **A first-week perk** I'm still finalizing — could be a complimentary upgrade, could be a private lounge hour, depends on what you want. Reply and tell me what would matter most to you.

**A note on your membership:**

Whatever you're paying now stays the same. No re-signing, no surprise rate changes. Founding members at $99, $129, or $159 — you're locked at your rate.

The grandfather is permanent. We're treating it like the loyalty it is, not a promo to sunset.

**One ask in return:**

When we open, tell your friends. Bring them to the Remedy Room. Try the new massage suites. Be loud about what's good and louder about what's not. I want the version of Sway RiNo and Sway Central Park that you'd actually want to spend your weekly hours in.

Watch your inbox Friday May 30 — that's when the priority booking link comes through.

Until then: thank you. For real.

— Heather

P.S. Reply with what you want as the Founding Ambassador first-week perk. I'm reading every one.`,
  },
  {
    n: "03",
    date: "May 22",
    dateISO: "2026-05-22",
    title: "Segmented member details (3 versions: paying / partner / annual)",
    from: "Sway team · heather@upswellstudio.com",
    fromDomain: "upswell",
    to: "Active members, segmented by tier",
    toCount: 159,
    csv: "01-members-transactional.csv (further split by rate)",
    subjectOptions: [
      "Your Sway membership: every detail",
      "Your Upswell partner access — what changes on June 1",
      "A personal note about your membership (annual)",
    ],
    previewText: "Your rate. Your access. Your timeline. Everything you need.",
    classification: "transactional",
    body: `[VERSION A — Recovery-focused paying member · ~87 recipients]

Hi {first_name},

Last week we shared the news: Upswell RiNo and Upswell Central Park become Sway on **June 1**.

This email is the specifics — what your membership becomes, what you get, what's not changing.

**Your rate stays exactly where it is.** You're currently at \${current_rate}/month. That rate is locked. No re-signing, no surprise increase, no sunset window. We honor it as long as you stay a member.

**Your access stays exactly where it is.** Sauna (traditional + infrared), cold plunge, compression therapy, red light therapy — all open. Same rooms, same equipment.

**More hours, more open days.** Sway operates on a fuller schedule than Upswell did toward the end. More reliable hours, more days open.

**What's new at your location:**
- **Massage therapy** — expert therapists in newly-built treatment suites. Your member rate is **$99 per 50-minute session** (regularly $139). Coming the week of {massage_open_date}.
- **The Sway app** — bookings, member info, easier check-in. Login info coming May 28.

**What's coming this summer:** Advanced facials at $99 member rate. AI-powered Aescape robot massage.

**Your founding rate stays as long as you stay.** When Phase 2 launches, you can add those services at member rates without changing your underlying membership.

**One note on cards:** for security, we can't directly transfer your card info from Upswell's system. The app will prompt you to re-add (30 seconds), or do it at the front desk on your first Sway visit (first visit comped as a thank-you for the friction).

— The Sway team

P.S. Watch for Heather's note around opening day. She's writing a personal welcome to every member.

---

[VERSION A-MIXED — Paying member who used yoga AND recovery · ~16 recipients]

Hi {first_name},

Last week we shared the news: Upswell becomes Sway on **June 1**. I want to write to you specifically because the records show you used both the recovery space AND yoga classes here. Some of this email is good news, some of it isn't, and I want to be direct about both.

**Good news first — your rate stays exactly where it is.** \${current_rate}/month. Locked. No re-signing, no surprise increase. Honored as long as you stay.

**Your recovery access stays exactly where it is.** Sauna (traditional + infrared), cold plunge, compression, red light — all open. Same rooms, same equipment, on a fuller schedule than Upswell ran toward the end.

**The hard part: yoga and Pilates classes are winding down.** Sway is a wellness club focused on massage, facials, and recovery. We don't have yoga in the brand. I know that's part of what you came for, and I don't want to gloss over it.

**Three things I want to make available to you:**

1. **Stay** at your current rate, keep using the recovery side, and get the new Sway services at member pricing (massage is **$99/50 min** for members; facials and Aescape coming this summer at member pricing too).
2. **Move to a yoga studio** — Heather has personal recommendations and is happy to make introductions. CorePower (multiple Denver locations), The River Yoga (RiNo), Yoga Pod, Kindness Yoga.
3. **Refund the rest of your time** if you'd rather not continue — pro-rata refund through your next billing date, no hard feelings.

Reply to this email with what works for you. If we don't hear from you, we'll keep your current membership active at your rate — which is the right choice for most of the recovery side, but I want it to be your choice.

— The Sway team

P.S. Heather is personally calling our heaviest yoga users this week. If you're one of them, expect a call.

---

[VERSION B — Partner / comp tier ($0) · ~73 recipients]

Hi {first_name},

You currently have Upswell access through {partner_program_name}. On **June 1**, the locations become Sway. Your access continues — we're working with each partner program to confirm exactly how it maps. You'll get a specific note from us within 2 weeks. Don't book until then.

— The Sway team

---

[VERSION C — Annual prepay ($1,599/year) · 1 recipient: Terry Wei]

Hi Terry,

You're our only active annual prepay member, which means I wanted to write you personally.

Your annual term — purchased Dec 29, 2025, runs through Dec 29, 2026 — is honored in full. Same access, no changes.

The records show you've used yoga as part of your time here. Yoga is winding down at our locations. Two options if that changes the math for you:
1. Continue through your term, use the recovery side + new massage (we'll honor the $99 member rate)
2. Pro-rata refund for the remaining term — say the word

When your term ends, we'll reach out with options. Reply anytime.

— Heather`,
    notes: "FOUR versions now: A (recovery-focused paying members, ~87), A-MIXED (members who used both yoga + recovery, ~21 — softer yoga-winddown language + explicit 3 options), B (partner/comp), C (annual prepay Terry Wei who is mixed-use). Per May 12 meeting: members who roll over get $99 massage/facial as a perk on top of grandfathered rate. The 4 yoga-heavy members (Christina Aguila, Gregory Anderson, Jessica Blackwell, Nathan Khomutov) get a PERSONAL CALL from Heather and do NOT receive this email.",
  },
  {
    n: "04",
    date: "May 26",
    dateISO: "2026-05-26",
    title: "Member logistics + first-week guide",
    from: "Sway team · heather@upswellstudio.com",
    fromDomain: "upswell",
    to: "Active members (159)",
    toCount: 159,
    csv: "01-members-transactional.csv",
    subjectOptions: ["Sway opens Monday — your first-week guide"],
    previewText: "Hours, parking, the app, and what to expect on day one.",
    classification: "transactional",
    body: `Hi {first_name},

Sway opens at your location in six days. Here's the practical info you need.

**📅 Opening hours**
- Mon–Fri: 10:00 AM – 8:00 PM
- Saturday: 9:00 AM – 6:00 PM
- Sunday: 11:00 AM – 6:00 PM
*(Confirm with Heather — placeholder above mirrors Larimer hours)*

**📱 The Sway app**
Tomorrow you'll get a separate email with login instructions. Same email and phone you used at Upswell — your account is migrated.

**💳 About your card**
For security, we couldn't transfer card data directly. Two options:
- **Update now (preferred):** the Sway app will prompt you the first time you log in. 30 seconds.
- **Update at first visit:** stop at the front desk. We'll comp that first visit.

**🚗 Parking**
Same as Upswell — nothing changes.

**🧘 What to expect on Day 1**
The space is the space you know. Same saunas, same cold plunge, same recovery equipment. New signage. New massage suites bookable through the app. Same front-desk team you know.

The yoga and Pilates studios are being repurposed — that's the transition in progress.

**🌿 What we're NOT changing**
Your membership rate. Your access to the recovery suite. The team. The vibe.

**Booking opens Friday May 30** — opening week booking link comes to your inbox.

See you next week.

— The Sway team`,
  },
  {
    n: "05",
    date: "May 27",
    dateISO: "2026-05-27",
    title: "General audience pre-launch (with first-visit offer)",
    from: "Sway · heather@upswellstudio.com",
    fromDomain: "upswell",
    to: "All marketing-opted-in non-members (~4,470 after dedup)",
    toCount: 4470,
    csv: "02-announce-may15-all.csv MINUS 01-members-transactional.csv",
    subjectOptions: [
      "Sway opens Monday — and you're invited",
      "5 days. New massage suites, full recovery, $40 off your first visit.",
      "Doors open Monday at RiNo and Central Park",
    ],
    previewText: "$40 off your first 50-minute massage or facial. For our Denver neighbors only.",
    classification: "marketing",
    body: `Hi {first_name},

In **5 days**, Sway opens at your neighborhood: **RiNo** (3636 Blake St) and **Central Park** (2271 Clinton St).

We're a modern wellness club. Same recovery space you may already know — saunas, cold plunge, compression, red light. Plus what we're best known for at our Larimer location: expert massage therapy in newly-built treatment suites.

**For Denver locals, your first visit is $40 off.**

50-minute Essential Signature Massage or Facial — just **$99** (regularly $139). One-time intro pricing, no membership required.

[Book your first visit →]

**Why Sway**
Voted **#4 Best Day Spa in America** by USA Today 10Best in our first year. **Best U.S. Day Spa** by The Zoe Report 2026.

**Memberships at the new locations:**
- **Sway Membership · $99/mo** — massages + facials at $99 each, 50% off recovery (all locations)
- **Sway Unlimited · $99/mo** — unlimited Remedy Room recovery, exclusive to RiNo + Central Park

Coming this summer: advanced facials + AI-powered Aescape robot massage.

[Book at RiNo →] [Book at Central Park →]

See you soon.

— Sway`,
    notes: "Per May 12 meeting: Sway Unlimited locked at $99/mo. Marketing send requires Sway opt-in — but recipients on this list ARE already opted in (came from Upswell's marketing list, transferred under CAN-SPAM).",
  },
  {
    n: "06",
    date: "May 30",
    dateISO: "2026-05-30",
    title: "VIP final priority booking link",
    from: "Heather Holland · heather@upswellstudio.com",
    fromDomain: "upswell",
    to: "VIPs (211)",
    toCount: 211,
    csv: "03b-vip-marketing-opted-in.csv",
    subjectOptions: [
      "Your priority booking link (as promised)",
      "48 hours before everyone else",
      "The door's open for you, {first_name}",
    ],
    previewText: "First pick of times. First pick of therapists. Public booking opens Monday.",
    classification: "transactional-with-marketing",
    body: `{first_name} —

Two days until Sway opens at RiNo and Central Park. Per the note I sent earlier this month, you have priority booking access starting today, **48 hours before public reservations open**.

[Book your first Sway visit →]

**Your Founding Ambassador perk:** Your first massage at Sway is complimentary. One per person, our gift. Book the time that works for you — no code needed, it's already on your account.
*(Heather to confirm — depends on final perk decision)*

**What's bookable now:**
- 50, 60, 75, or 90-minute massage in our new treatment suites
- Remedy Room recovery circuit
- (Facials + Aescape coming later this summer)

**A small ask:** Tell us after your visit what worked and what didn't. The whole point of doing this is to get the experience right for you specifically. Reply to this email and I'll read it.

When you walk in Monday, you'll see most of the team you know. New name on the building, mostly the same people inside.

— Heather`,
  },
  {
    n: "07",
    date: "Jun 1",
    dateISO: "2026-06-01",
    title: "Launch day member welcome",
    from: "Heather Holland · heather@swaywellnessspa.com",
    fromDomain: "sway",
    to: "Active members (159)",
    toCount: 159,
    csv: "01-members-transactional.csv",
    subjectOptions: ["Today is the day", "Welcome to Sway", "We're open"],
    previewText: "A short note from Heather on opening day.",
    classification: "transactional",
    body: `{first_name} —

It's official. **As of today, you're a member of Sway** at {home_location}.

This took a year of work and a lot of decisions I wasn't sure about. The reason any of it went right is because you stayed. So before today gets busy: **thank you.**

**Walk in whenever you want.** Saunas, cold plunge, compression, red light — all open, all yours. Your member rate applies. We're also open more days and more hours than Upswell was at the end — full schedule, more reliably.

**Massage suites open the week of {massage_open_date}.** We're finishing the treatment rooms with the care you'd expect from Sway. Booking opens in the app once they're ready. Member rate will be $99 for a 50-minute session.

**Coming this summer:** advanced facials and Aescape AI-powered robot massage.

**If anything feels off** — system, scheduling, signage, vibe, literally anything — tell us. Reply or grab a team member at the front desk.

— Heather

P.S. If you haven't updated your card on file yet, the app will prompt you on first booking. Or do it at the front desk on your way in.`,
    notes: "Phased launch: brand opens June 1 with recovery uninterrupted; massage suites open week of June 7-14 (or June 21+ depending on license + curtain readiness). The {massage_open_date} merge tag fills with the actual date once locked. Hours-expansion language added as member value-add.",
  },
  {
    n: "08",
    date: "Jun 2",
    dateISO: "2026-06-02",
    title: "Public brand reveal — Sway is here",
    from: "Sway · hello@swaywellnessspa.com",
    fromDomain: "sway",
    to: "All marketing-opted-in non-members (~4,470)",
    toCount: 4470,
    csv: "02-announce-may15-all.csv MINUS 01-members-transactional.csv",
    subjectOptions: [
      "Sway is here — at RiNo and Central Park",
      "The doors that used to say Upswell now say Sway",
      "Three Denver locations. Recovery you know. Massage coming late June.",
    ],
    previewText: "Same recovery space you may know — now under Sway. Massage suites open late June.",
    classification: "marketing",
    body: `Hi {first_name},

As of yesterday, **Sway operates at RiNo (3636 Blake St) and Central Park (2271 Clinton St).** The buildings that used to say Upswell now say Sway.

**The recovery space is the same space.** Saunas, cold plunge, compression, red light therapy — same rooms, same equipment. What's changed: a fuller, more reliable operating schedule than Upswell ran in its last months, and a new brand on the door.

**Massage suites open late June.** We're finishing the new treatment rooms with the care you'd expect from Sway. Pre-booking opens that week — we'll let you know.

### Sway Unlimited — $99/month, exclusive to these locations

Unlimited Remedy Room access at $99/mo. The only Sway location where unlimited makes sense, because RiNo and Central Park were built for recovery. Membership unlocks massage and (soon) facials at $99 each as a member perk.

[See memberships →]

### What's coming this summer
- Advanced facials with Eminence Organics + Dr. Dennis Gross
- **Aescape AI-powered robot massage** — the only one in Denver outside our Larimer location

We were voted **#4 Best Day Spa in America** by USA Today 10Best and **Best U.S. Day Spa** by The Zoe Report 2026. Now you can find us in three Denver neighborhoods.

— Sway`,
    notes: "Phased launch update: opens with recovery only on Day 1, massage week-of date noted. First-visit offer removed from this email until massage is available (the offer doesn't apply to recovery-only sessions — those are $49 drop-in for the Remedy Room). Sway Unlimited at $99/mo is the lead offer.",
  },
  {
    n: "09",
    date: "Jun 8",
    dateISO: "2026-06-08",
    title: "Re-engagement — Lost segment",
    from: "Sway · hello@swaywellnessspa.com",
    fromDomain: "sway",
    to: "Retention 'Lost,' marketing-opted-in (1,406)",
    toCount: 1406,
    csv: "04-reengagement-lost.csv",
    subjectOptions: [
      "It's not the same place. Come back and see.",
      "We changed. Worth a re-visit?",
      "Your old wellness club, evolved",
    ],
    previewText: "Sway is here. Massage, recovery, a fresh start — and $40 off your first visit.",
    classification: "marketing",
    body: `Hi {first_name},

Last week, Upswell at {home_location} became **Sway**.

You used to come here. Then you didn't. We don't know exactly why — schedule, life, the space stopped fitting.

But something changed last week worth telling you about.

**What's the same:** The saunas, cold plunge, compression, and red light recovery suite you remember. Same rooms, same equipment.

**What's new:**
- **Expert massage therapy** in brand-new treatment suites. Member rate $99 (drop-in $139).
- **Advanced facials** and **AI-powered Aescape robot massage** coming this summer.
- **More open days.** Upswell was open 3 days a week with limited hours by the end. Sway is open 7 days. Recovery when you actually want it.

[**Welcome back. $40 off your first Sway visit.** →]

50-minute massage or facial — $99. No membership required.

We'd love to have you in.

— Sway`,
    notes: "Per May 12 meeting: lean into 'more days open, more reliable hours' — Upswell's biggest weakness was unpredictable schedule. Re-engagement story writes itself.",
  },
  {
    n: "10",
    date: "Jun 17",
    dateISO: "2026-06-17",
    title: "Re-engagement — At Risk (urgency)",
    from: "Sway · hello@swaywellnessspa.com",
    fromDomain: "sway",
    to: "Activity 'At Risk,' marketing-opted-in (after dedupe from June 8 send)",
    toCount: 2500,
    csv: "04b-reengagement-at-risk.csv MINUS 04-reengagement-lost.csv",
    subjectOptions: [
      "Last chance: $40 off your first Sway visit",
      "2 weeks open. We'd love to see you.",
      "Your intro offer is still here (but not forever)",
    ],
    previewText: "$40 off ends soon. Use it before it's gone.",
    classification: "marketing",
    body: `Hi {first_name},

We've been open at {home_location} for about two weeks. The first wave has come in. Before our intro pricing wraps, circling back.

**Your first visit at Sway is still $40 off.**
50-minute massage or facial — **$99** (regularly $139). Available through end of June.

[Book at RiNo →] [Book at Central Park →]

**Coming soon:** Advanced facials this summer. AI-powered Aescape robot massage shortly after.

[See what's at your location →]

— Sway`,
  },
  {
    n: "12",
    date: "May 15 PM",
    dateISO: "2026-05-15",
    title: "Yoga loyalist graceful offboarding",
    from: "Heather Holland · heather@upswellstudio.com",
    fromDomain: "upswell",
    to: "Yoga-only + yoga-heavy buckets, marketing-opted-in",
    toCount: 360,
    csv: "10-yoga-loyalists-offboarding.csv",
    subjectOptions: [
      "A direct note about yoga at Upswell",
      "We have to be straight with you about yoga",
      "Yoga at Upswell — what's happening",
    ],
    previewText: "We're not continuing yoga classes. Here's the honest version of what that means for you.",
    classification: "transactional",
    body: `Hi {first_name},

I'm writing because you came to yoga at Upswell, and I owe you the direct version of what's happening today.

**Upswell is becoming Sway on June 1.** Sway doesn't have yoga or Pilates — they're a wellness club focused on massage, facials, recovery, and Aescape robot massage. **We're winding down all movement classes at RiNo Station and Central Park.**

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
    notes: "Sent the SAME DAY as the May 15 announcement but separately, so yoga loyalists hear the news from Heather directly rather than via the general announcement or press. Studio recommendations are placeholders — Heather should substitute her real picks. Tone is direct + accountable, not apologetic. The 'try recovery sometime' line is intentionally soft (opt-in-respecting), not a marketing CTA.",
  },
  {
    n: "11",
    date: "Jun 22",
    dateISO: "2026-06-22",
    title: "ClassPass conversion — the math",
    from: "Sway · hello@swaywellnessspa.com",
    fromDomain: "sway",
    to: "ClassPass users, opted-in (314)",
    toCount: 314,
    csv: "05-classpass-converters.csv",
    subjectOptions: [
      "The math on your ClassPass: a comparison",
      "You're spending more on ClassPass than you'd pay as a member",
      "Sway membership vs. your ClassPass habit",
    ],
    previewText: "You've been visiting via ClassPass. Membership is a better deal — here's the math.",
    classification: "marketing",
    body: `Hi {first_name},

You've been visiting us at {home_location} through **ClassPass**.

Quick math on something worth considering:

**Your ClassPass spend:** typically 7-10 credits per visit = **$40-$60**. At 4 visits/month = $160-$240.

**What that same spend gets as a Sway member:**

**Sway Membership · $99/month:**
- 50% off the Remedy Room (visits drop to $25 each)
- Massage and facials at $99 per session (vs $139 drop-in)

**Sway Unlimited · $99/month** *(RiNo + Central Park only):*
- **Unlimited** Remedy Room access
- Plus member rates on massage and facials

At 4 visits/month, **Sway Unlimited pays for itself** vs ClassPass. At 6+, you're way ahead.

[Compare memberships →]

Switching is one form. Cancel anytime.

— Sway`,
    notes: "Per May 12 meeting: Sway Unlimited at $99 — this email pencils out beautifully at that price. Average Upswell unlimited remedy member visited ~7×/mo, so $99 is genuinely strong value.",
  },
];
