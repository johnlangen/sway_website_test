/**
 * Social media + website content plan for the Upswell → Sway transition.
 *
 * Two channels: Sway-owned (post freely) and Upswell-cooperative (Heather posts
 * from her voice, we draft + assist). Per APA Exhibit E §7, Sway-as-entity
 * can't directly post AS Upswell — but Heather (still CEO of Upswell Studio
 * Inc.) can cooperate openly, including content drafted by Sway.
 */

export type SocialPost = {
  date: string;
  channel: "Sway IG" | "Sway FB" | "Sway TikTok" | "Sway LinkedIn" | "Upswell IG (Heather)" | "Upswell FB (Heather)" | "Upswell TikTok (Heather)";
  format: string;
  hook: string;
  body: string;
  status: "drafted" | "in-progress" | "scheduled" | "posted";
  notes?: string;
};

export type WebsiteTask = {
  date: string;
  type: "new page" | "page update" | "blog post" | "banner" | "redirect" | "JSON-LD";
  page: string;
  goal: string;
  status: "drafted" | "in-progress" | "shipped";
  notes?: string;
};

export const SOCIAL_POSTS: SocialPost[] = [
  // ============ MAY 15: ANNOUNCEMENT DAY ============
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Feed carousel · 5 slides",
    hook: "Big news, Denver. 🌿 Sway is expanding to RiNo + Central Park.",
    body: `Slide 1: "We're expanding." (Sway logo + RiNo + Central Park · June 1, 2026)
Slide 2: Map of Denver with all 3 pins · "Three Denver locations"
Slide 3: Heather Holland photo · "Led by Heather Holland — Upswell founder, ex-CorePower COO, now Sway COO"
Slide 4: Treatment suite + Sway Remedy Lounge photo · "Expert massage and advanced facials in newly-built suites. Plus the Sway Remedy Lounge."
Slide 5: "Book your first visit · $40 off" CTA · swaywellnessspa.com

Caption: Sway is now open at RiNo (3636 Blake) and Central Park (2271 Clinton). The Sway Remedy Lounge (sauna, cold plunge, revive) stays exactly the same. What's new: expert massage therapy and advanced facials, in brand-new treatment suites. Led by Heather Holland — Upswell founder, former CorePower Yoga COO, now Spavia's COO. Existing Upswell members → your membership is honored at $99/mo. Everyone else → first visit is $40 off. Link in bio. 📍 Sway RiNo · 3636 Blake St 📍 Sway Central Park · 2271 Clinton St #SwayWellness #DenverWellness #RiNoDenver #CentralParkDenver #DenverSpa`,
    status: "drafted",
    notes: "Same content as in public-announcement-may15.md. Post early AM Friday before press cycle.",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Story sequence · 6 frames",
    hook: "Live story drop right after the carousel goes up",
    body: `Frame 1: "Sway is open at RiNo + Central Park."
Frame 2: "The Sway Remedy Lounge you know."
Frame 3: "Plus expert massage + advanced facials in newly-built suites."
Frame 4: "Upswell members — your membership is honored at $99/mo."
Frame 5: "Everyone else — first visit is $40 off."
Frame 6: "Book now." (with link sticker)`,
    status: "drafted",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway FB",
    format: "Feed post",
    hook: "Same carousel as IG, slightly longer caption",
    body: "Use IG carousel + caption. Facebook tolerates a bit more text — can include the press release subhead or a short Heather quote.",
    status: "drafted",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway TikTok",
    format: "15-30 second video",
    hook: "If you've been to Sway Larimer, you know the vibe...",
    body: `Opening: walking through Larimer Square Sway entrance
"If you've been to Sway Larimer..."
Cut to: sauna interior
"...you know the vibe."
Cut to: Denver map, pins drop on RiNo + Central Park
"Now we're at RiNo. And Central Park."
Cut to: cold plunge, sauna, revive quick cuts
"The Sway Remedy Lounge you already love."
Cut to: massage room + facial chair
"Plus expert massage and advanced facials in newly-built suites."
End card: "First visit $40 off. Book at swaywellnessspa.com"`,
    status: "drafted",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway LinkedIn",
    format: "Long-form post · tag Heather",
    hook: "Sway Wellness Spa is expanding into Denver's RiNo and Central Park...",
    body: `Today we're announcing that Sway Wellness Spa is now open at our two new Denver locations — RiNo Art District (3636 Blake St) and Central Park (2271 Clinton St) — and we're thrilled to have Heather Holland join Spavia as our Chief Operating Officer.

Heather brings deep operating experience from her time as COO at CorePower Yoga and her work founding Upswell. The two locations Sway has taken over were built by her team and represent some of the most thoughtfully designed recovery infrastructure in the Denver wellness market.

What's most exciting: this expansion isn't about replacing what these locations did well. The Sway Remedy Lounge at each — sauna, cold plunge, revive — stays exactly the same. We're adding what's been missing: expert massage therapy and advanced facials, in brand-new treatment suites.

Existing Upswell members are protected — all moved to our $99/mo Sway Remedy Lounge Unlimited tier.

Sway Larimer was voted #4 Best Day Spa in America (USA Today 10Best) and Best U.S. Day Spa (The Zoe Report 2026). With RiNo and Central Park joining the family, plus franchise locations in Dallas and Washington, DC, we're building something genuinely new in the wellness category.

First visit is $40 off at swaywellnessspa.com.`,
    status: "drafted",
    notes: "Tag Heather Holland's LinkedIn profile. Tag Spavia International.",
  },
  {
    date: "May 15 AM",
    channel: "Upswell IG (Heather)",
    format: "Feed post (Heather's voice)",
    hook: "A note from me, written by me, about what's next for Upswell at RiNo and Central Park.",
    body: `Caption: I have news. After pouring myself into building Upswell, I've made a decision that's hard and exciting in equal measure: Upswell at RiNo and Central Park is becoming Sway on June 1, 2026, and I'm joining Sway as COO to lead the chapter ahead.

Why now: these locations deserve more than I could give them solo. Sway brings the operations depth, the brand backbone, and the service expansion (massage now, facials + Aescape this summer) that I've wanted to add for a while.

What stays the same: the recovery space you know — saunas, cold plunge, compression, red light. The front desk team. The vibe. Your membership at your current rate.

What's new: a fuller, more reliable schedule. Professional massage. Eventually facials and AI-powered Aescape robot massage.

If you came for yoga or Pilates — those classes are winding down. I'm working personally on landing each of you somewhere good (CorePower, The River, Yoga Pod). Reply to me and I'll make an introduction.

I'll keep posting here on @upswellstudio about my next chapter — I'm not done building.

— Heather

📍 RiNo: 3636 Blake St → swaywellnessspa.com/locations/denver-rino
📍 Central Park: 2271 Clinton St → swaywellnessspa.com/locations/denver-central-park`,
    status: "posted",
    notes: "Heather's voice. Posted May 15 on @upswellstudio.",
  },
  {
    date: "May 15 AM",
    channel: "Upswell IG (Heather)",
    format: "Story sequence",
    hook: "Personal story drop after feed post",
    body: `Frame 1: "Some news from me."
Frame 2: "Upswell at RiNo + Central Park is becoming Sway on June 1."
Frame 3: "I'm joining Sway as COO."
Frame 4: "Same recovery space. Massage added. Your membership honored."
Frame 5: "Yoga is winding down — DM me, I'll help you find a studio you'll love."
Frame 6: "Read the full note on my feed ↓"`,
    status: "posted",
  },
  {
    date: "May 15 AM",
    channel: "Upswell FB (Heather)",
    format: "Feed post (same content as IG)",
    hook: "Use the IG caption",
    body: "Same as Upswell IG feed post.",
    status: "posted",
  },

  // ============ MAY 16-31: BUILD-UP ============
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Feed post + reel",
    hook: "Meet the recovery space",
    body: "Tour video / carousel of one of the new locations (RiNo first). Saunas, cold plunge, compression. Caption: 'A peek at Sway RiNo before doors open June 1.' Music: chill, brand-aligned.",
    status: "drafted",
    notes: "Requires photos / video from the spaces. User mentioned they have great content.",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Reel / story takeover",
    hook: "Heather Q&A or 'a day with Heather'",
    body: "Short interview reel: 'Why I joined Sway,' 'What I'm most excited about,' '60 seconds in the recovery space.' Builds personal connection before launch.",
    status: "drafted",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Feed post",
    hook: "Sway Unlimited — exclusive to RiNo + Central Park",
    body: "Visual carousel explaining the new Sway Unlimited tier: $99/mo, unlimited recovery access, member rate on massage. 'Built for the recovery-led locations.' CTA: waitlist + booking links.",
    status: "drafted",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Stories",
    hook: "Behind the scenes — the buildout",
    body: "Sister/mom on signage progress, treatment room buildout, curtains arriving. Authentic behind-the-scenes content builds anticipation.",
    status: "drafted",
    notes: "Only if the work is camera-ready — don't show messy buildout that undermines brand.",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Member spotlight reel",
    hook: "What Larimer members say about Sway",
    body: "Quick member testimonials from Larimer — 'why I joined,' 'what I get from my membership.' Helps incoming RiNo/CP customers visualize the experience.",
    status: "drafted",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Story countdown sticker",
    hook: "48 hours",
    body: "Countdown sticker to June 1 launch. Daily stories until launch day.",
    status: "drafted",
  },

  // ============ JUNE 1: LAUNCH DAY ============
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Feed + multiple stories",
    hook: "Today.",
    body: "Phase 3 launch day post: photo of either space at opening hour. Caption: 'Sway is open at RiNo and Central Park — with expert massage and advanced facials in brand-new treatment suites. Plus the Sway Remedy Lounge you may already know. First visit $40 off. We can't wait to see you.' (Fires on the day massage + facials open — not June 1.)",
    status: "drafted",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Story takeover",
    hook: "All day live coverage from both locations",
    body: "Live stories from both locations all day — Heather on-site at one, possibly Allison or designated team member at the other. First members walking in, the team welcoming people, recovery sessions in progress.",
    status: "drafted",
    notes: "Plan the on-the-ground photographer / videographer this week.",
  },
  {
    date: "June 1 AM",
    channel: "Upswell IG (Heather)",
    format: "Final post",
    hook: "From me, on the last day of Upswell at these locations.",
    body: `A thank you + a handoff post. Caption: 'Today is the last day of Upswell at RiNo and Central Park. Tomorrow they open as Sway. Thank you for everything — you made these spaces what they were. I'll keep posting here as I figure out what's next for the Upswell name. — Heather'`,
    status: "drafted",
    notes: "Heather's voice. Last Upswell-branded post about these locations.",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway TikTok",
    format: "Launch video",
    hook: "Same as IG launch — short doc-style cut",
    body: "Photo/video montage with simple text overlay. 'Day 1' style content.",
    status: "drafted",
  },

  // ============ JUNE 2-7: LAUNCH WEEK ============
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Reel",
    hook: "What people booked first",
    body: "Quick stat reel: 'In our first 48 hours: X recovery sessions booked, Y new members joined, Z first-visit offers redeemed.' Real numbers if available.",
    status: "drafted",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Member stories",
    hook: "Faces of opening week",
    body: "Photos + short captions of members who came in opening week. Permission first. Real social proof from real people.",
    status: "drafted",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Massage preview",
    hook: "Massage + facials coming soon",
    body: "Photo of one of the finished treatment suites + caption: 'Expert massage and advanced facials open later this month at RiNo + Central Park. Booking link comes when reservations open.'",
    status: "drafted",
  },

  // ============ JUNE 15: MASSAGE LAUNCH ============
  {
    date: "Late Jun · PR push",
    channel: "Sway IG",
    format: "Feed + stories",
    hook: "Massage and facials are here.",
    body: "Treatment suite reveal. Multiple frames showing the curtains, lighting, massage table, facial chair. Caption: 'Massage and facials are open at Sway RiNo and Sway Central Park. Member rate $99 / 50 min for both. Book at swaywellnessspa.com.'",
    status: "drafted",
  },
  {
    date: "Late Jun · PR push",
    channel: "Sway TikTok",
    format: "60-second video",
    hook: "Step inside our new treatment suites",
    body: "Walkthrough video of one of the new treatment rooms (massage + facial). Show the design intent — heavy linen curtains, warm lighting, the speakeasy-spa aesthetic. End card: 'Book your first visit · $40 off · swaywellnessspa.com'.",
    status: "drafted",
  },
];

export const WEBSITE_TASKS: WebsiteTask[] = [
  {
    date: "Done",
    type: "new page",
    page: "/locations/denver-rino",
    goal: "Pre-launch location page with Phase 1 / Phase 2 service tags, waitlist CTA",
    status: "shipped",
    notes: "Live · indexed · in sitemap. Needs real photos when available.",
  },
  {
    date: "Done",
    type: "new page",
    page: "/locations/denver-central-park",
    goal: "Pre-launch location page (mirror of RiNo)",
    status: "shipped",
    notes: "Live · indexed · in sitemap. Needs real photos when available.",
  },
  {
    date: "May 14",
    type: "page update",
    page: "/membership",
    goal: "Show Sway Unlimited tier ($99/mo, RiNo + Central Park only) alongside standard Sway Membership ($99/mo, all locations). Both tiers visually equal-weight.",
    status: "drafted",
    notes: "P0 blocker — all emails reference these tiers but there's no live page to land them. Build before May 15.",
  },
  {
    date: "May 14",
    type: "banner",
    page: "Sitewide homepage banner",
    goal: "Slim band above NavBar: 'Now expanding to RiNo and Central Park — opening June 1. See what's coming →' Links to /locations.",
    status: "drafted",
    notes: "Sitewide. Cookie-dismissable. #113D33 background. Goes live May 15 AM, removed after June 7.",
  },
  {
    date: "May 15",
    type: "blog post",
    page: "/blog/sway-rino-central-park-expansion",
    goal: "Author bio: Sway Wellness Team. Long-form announcement. Drafted in public-announcement-may15.md — needs WordPress / MDX import.",
    status: "drafted",
  },
  {
    date: "By May 15",
    type: "page update",
    page: "/locations/denver-rino + /locations/denver-central-park",
    goal: "Replace placeholder /assets/SWAY.jpg with real hero photos. Add OG images per location.",
    status: "in-progress",
    notes: "Pending photos from John.",
  },
  {
    date: "May 22",
    type: "blog post",
    page: "/blog/meet-heather-holland",
    goal: "Profile of Heather — CorePower COO → Upswell founder → Sway COO. Q&A format. Useful for press follow-up + LinkedIn / SEO.",
    status: "drafted",
  },
  {
    date: "Phase 3 (when massage + facials open)",
    type: "page update",
    page: "/locations/denver-rino/offers + /locations/denver-central-park/offers",
    goal: "Clone Larimer's /offers page. First Visit Offer ($40 off / $99). Sway Unlimited tier shown. Sway Remedy Lounge highlighted. Defers from May 27 — first-visit offer only goes live when massage + facials are bookable.",
    status: "drafted",
    notes: "Mirror of /locations/denver-larimer/offers.",
  },
  {
    date: "June 1",
    type: "page update",
    page: "/locations/denver-rino + /locations/denver-central-park",
    goal: "Flip status from 'coming-soon' → 'open'. Remove 'Opening June 2026' badge. Add 'Open now' live status indicator (clone Larimer pattern).",
    status: "drafted",
  },
  {
    date: "June 1",
    type: "page update",
    page: "/locations (index)",
    goal: "Update LocationsContent.tsx: change status of new locations to 'open'. Map markers update.",
    status: "drafted",
  },
  {
    date: "June 1",
    type: "blog post",
    page: "/blog/welcome-to-sway-rino-central-park",
    goal: "Logo-swap-day blog post. Short, warm: 'Sway is now operating at RiNo + Central Park. Sway Remedy Lounge continues. Massage and facials open later this month.' No first-visit offer prompt (defers to Phase 3 when there's something new to offer).",
    status: "drafted",
  },
  {
    date: "By June 1",
    type: "new page",
    page: "/locations/denver-rino/book + /locations/denver-central-park/book",
    goal: "Booking flow — clone Larimer's /book pattern. Wired up to Mindbody site IDs for new locations.",
    status: "drafted",
    notes: "Blocked on Mindbody site provisioning.",
  },
  {
    date: "By June 1",
    type: "new page",
    page: "/locations/denver-rino/book-remedy-room + similar for CP",
    goal: "Remedy Room booking flow per location. Clone Larimer pattern.",
    status: "drafted",
    notes: "Blocked on Mindbody session type setup.",
  },
  {
    date: "Phase 3 (when massage + facials open)",
    type: "page update",
    page: "Location pages — massage + facial sections",
    goal: "Update massage AND facial service cards together: remove 'Coming June 2026' badges, swap waitlist mailto for real booking links. Both go live together (mid-to-late June).",
    status: "drafted",
  },
  {
    date: "Phase 3 (when massage + facials open)",
    type: "blog post",
    page: "/blog/sway-rino-central-park-massage-facials-open",
    goal: "Phase 3 launch blog post. Photos of finished treatment suites. Coincides with Email 08 and the press push.",
    status: "drafted",
  },
  {
    date: "Mid-July",
    type: "blog post",
    page: "/blog/recovery-led-wellness-sway",
    goal: "Trend / brand piece on the recovery-led format. Positions RiNo + Central Park as a different kind of Sway.",
    status: "drafted",
  },
  {
    date: "TBD (Aescape decision)",
    type: "page update",
    page: "Location pages — Aescape section (if added)",
    goal: "Aescape may or may not come to the new locations. If it does, remove 'Coming' badge and add booking. If not, remove the placeholder cards entirely.",
    status: "drafted",
    notes: "Open decision — see MY_LIST Post-launch tasks.",
  },
  {
    date: "Post-launch",
    type: "JSON-LD",
    page: "Location page layout.tsx files",
    goal: "Add aggregateRating + review[] to DaySpa JSON-LD once each location has 10+ Google reviews. Boosts local SEO rich results.",
    status: "drafted",
  },
  {
    date: "After 30-60 days",
    type: "redirect",
    page: "upswellstudio.com (Heather's site, with permission)",
    goal: "301 redirect upswellstudio.com → swaywellnessspa.com. Coordinated with Heather post-soft-transition. Preserves SEO equity.",
    status: "drafted",
    notes: "Heather's call — she owns the domain. Cooperative move once she's comfortable handing it off.",
  },
];
