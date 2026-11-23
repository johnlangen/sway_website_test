/**
 * The membership hub's questions, in ONE place: app/membership/layout.tsx puts them in the FAQPage
 * JSON-LD and app/membership/page.tsx shows them on the page. Google only honors FAQ markup whose
 * questions and answers are visible on the page, so the two must never drift apart.
 *
 * Member perks differ by location (lounge access, boosts and Remedy Room pricing are Larimer's;
 * the clubs' membership is the unlimited Remedy Lounge), so answers name the location they describe.
 */
export const MEMBERSHIP_FAQ: { q: string; a: string }[] = [
  {
    q: "How much is a Sway Wellness Spa membership?",
    a: "Sway memberships start at $99/month with three tiers: Essential ($99), Premier ($129), and Ultimate ($159). Each tier includes monthly facials and massages, 50% off boosts, private lounge access, and rollover credits. At Sway RiNo and Central Park, the Remedy Lounge membership is $129 a month, and founding memberships at RiNo, Central Park and Union Market start at $89.",
  },
  {
    q: "What's included in a Sway membership?",
    a: "At Sway Larimer, members enjoy monthly facials and massages at member pricing, 50% off boosts, private member lounge access, rollover credits, and a bring-a-friend benefit. Higher tiers unlock enhanced products, extended sessions, and tech-enhanced treatments. At Sway RiNo and Central Park, the Remedy Lounge membership is unlimited visits, one 75-minute session a day.",
  },
  {
    q: "Do Sway membership credits roll over?",
    a: "Yes. Unused massage and facial treatments roll over and stay good for 12 months while your membership is active. Aescape and Remedy Room sessions don't roll over.",
  },
  {
    q: "Can I use my Sway membership at any location?",
    a: "Yes. Sway memberships work across all open Sway locations. Currently Sway is open on Larimer Square in Denver and at Sway Wellness Club in RiNo and Central Park, with Union Market (DC) and Knox/Henderson (Dallas) coming soon.",
  },
  {
    q: "Do I need a membership to book at Sway?",
    a: "No, anyone can book at Sway. Memberships are optional but offer significant savings on massages, facials, boosts, and recovery sessions.",
  },
];
