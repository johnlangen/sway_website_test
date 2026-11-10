/**
 * Events pages for each Sway location: /locations/{slug}/events (Larimer, RiNo, Central Park), plus the
 * /group-events page that helps guests pick a location. Copy comes from Mackenzie's "Sway Event
 * Structure" doc, Emily's 10/23 brief and the inquiry form. Keep the option names matched to the form.
 *
 * Larimer is the full spa, so its page leads with Spalebrations and has treatments now. The clubs have
 * the Remedy Lounge now and massage and facials soon, plus Community Events. Larimer has no Community
 * Events section: its Remedy Room is a small shared circuit, not a lounge for a run club.
 *
 * UPCOMING: add a real, dated event here and an "On the calendar" section appears on that location's
 * page. It stays hidden while the list is empty, so the page never shows an empty calendar. Member
 * and public rates are only shown once the team has set them for that event.
 */

import type { Metadata } from "next";
import { CLUB_FOUNDING } from "./clubFounding";
import { CLUB_LOCATIONS, type ClubLocationKey } from "./clubLocations";
import type { EventFormLocation } from "./eventInquiry";

export type EventsKey = ClubLocationKey | "denver-larimer";

export const isClubEvents = (key: EventsKey): key is ClubLocationKey => key !== "denver-larimer";

export type UpcomingEvent = {
  /** How the date reads on the page, like "Thursday, December 4, 6:30 PM". */
  date: string;
  title: string;
  blurb: string;
  memberRate?: string;
  publicRate?: string;
  /** Where to sign up. Without one, the button goes to the inquiry form. */
  href?: string;
};

type Photo = { src: string; alt: string; position: string; width: number; height: number };

type EventsConfig = {
  shortName: string;
  formLocation: EventFormLocation;
  neighborhood: string;
  /** "in the neighborhood" wording for search titles. */
  seoPlace: string;
  address: string;
  phone: string;
  email: string;
  /** One line about the space, under "The space". */
  spaceLine: string;
  hero: Photo;
  space: Photo;
  upcoming: UpcomingEvent[];
};

const club = (key: ClubLocationKey) => ({
  shortName: CLUB_FOUNDING[key].shortName,
  phone: CLUB_LOCATIONS[key].phone,
  email: CLUB_LOCATIONS[key].contactEmail,
  spaceLine: CLUB_FOUNDING[key].lounge,
});

export const CLUB_EVENTS: Record<EventsKey, EventsConfig> = {
  "denver-larimer": {
    shortName: "Sway Larimer",
    formLocation: "Sway Larimer",
    neighborhood: "Larimer Square",
    seoPlace: "Larimer Square, Denver",
    address: "1428 Larimer St., Denver, CO 80202",
    phone: "(303) 476-6150",
    email: "contact@swaywellnessspa.com",
    spaceLine:
      "Massage, facials, the Remedy Room and Aescape, all under one roof on Larimer Square. Dinner and drinks are right outside the door.",
    hero: {
      src: "/assets/homepage_photo_outside.jpg",
      alt: "The lantern-lit hallway at Sway Larimer on Larimer Square",
      position: "48% 50%",
      width: 1070,
      height: 788,
    },
    space: {
      src: "/assets/founding-massage-lamp.jpg",
      alt: "A massage in a warm, lamp-lit treatment room",
      position: "50% 50%",
      width: 2200,
      height: 1466,
    },
    upcoming: [],
  },
  "denver-rino": {
    ...club("denver-rino"),
    formLocation: "Sway RiNo",
    neighborhood: "the RiNo Art District",
    seoPlace: "RiNo, Denver",
    address: "3636 Blake St, Denver, CO 80205",
    hero: {
      src: "/assets/rino1.jpeg",
      alt: "The recovery pool at Sway RiNo, with sheer curtains and tall plants",
      position: "50% 76%",
      width: 959,
      height: 1640,
    },
    space: {
      src: "/assets/rino2.jpeg",
      alt: "The traditional sauna at Sway RiNo",
      position: "50% 62%",
      width: 1093,
      height: 1438,
    },
    upcoming: [],
  },
  "denver-central-park": {
    ...club("denver-central-park"),
    formLocation: "Sway Central Park",
    neighborhood: "Central Park",
    seoPlace: "Central Park, Denver",
    address: "2271 Clinton St, Aurora, CO 80010",
    hero: {
      src: "/assets/centralpark2.jpg",
      alt: "The arched sauna and cold plunges at Sway Central Park",
      position: "62% 50%",
      width: 1086,
      height: 1448,
    },
    space: {
      src: "/assets/centralpark1.jpg",
      alt: "Cold plunges set in warm wood at Sway Central Park",
      position: "50% 100%",
      width: 1086,
      height: 1448,
    },
    upcoming: [],
  },
};

export function clubEventFaqs(key: EventsKey): { q: string; a: string }[] {
  if (!isClubEvents(key)) {
    return [
      {
        q: "Can I host a group spa day at Sway Larimer?",
        a: "Yes. Spalebrations are our group spa celebrations for 4 or more guests, and Luxury Buyouts give groups of 20 or more private or exclusive use of designated spaces. Send us the details on the inquiry form, or call (303) 476-6150.",
      },
      {
        q: "How much does a group spa day cost?",
        a: "Spalebrations use standard treatment pricing. Massage and facials start at $139 per person ($99 for members), the Remedy Room is $49 ($25 for members), and Aescape robot massage starts at $49. Luxury Buyouts are priced for your event.",
      },
      {
        q: "How long does a group visit take?",
        a: "Everyone gets a treatment, and we rotate small groups through the treatment rooms and the Remedy Room. A party of 8 to 9 usually takes about 2 to 3 hours.",
      },
      {
        q: "Do you have a bridal party package?",
        a: "Most bridal groups book one treatment each plus the Remedy Room together. Our suggested menu is on this page, and we'll tailor it to your group.",
      },
      {
        q: "Where do we park?",
        a: "Park at the Larimer Square Garage, 1422 Market St. We validate the 1st hour on weekdays. Sway is also a short walk from Union Station.",
      },
      {
        q: "I run sound baths, workshops or talks. Can I host one at Sway?",
        a: "We'd love to hear about it. Choose Host or Partner With Sway on the inquiry form, and tell us the topic and who would lead it.",
      },
    ];
  }
  const { shortName, opensLabel } = CLUB_FOUNDING[key];
  return [
    {
      q: `Can I host a private event at ${shortName}?`,
      a: `Yes. Spalebrations are for groups of 4 to 19, and Luxury Buyouts give groups of 20 or more private or exclusive use of designated spaces. Send us the details on the inquiry form and our team will follow up.`,
    },
    {
      q: "How much does an event cost?",
      a: "It depends on the event. Community Events have accessible entry pricing, including a $25 first Remedy Lounge visit (locals only, regularly $49). Member Access Events have a member rate and a public drop-in rate. Spalebrations use standard treatment and service pricing, and Luxury Buyouts are priced for your event.",
    },
    {
      q: "Can we bring food and drinks?",
      a: "Community groups may bring their own snacks and drinks. Member Access Events include light bites and nonalcoholic drinks. Luxury Buyouts can add catering and a mocktail or cocktail bar.",
    },
    {
      q: `Can my group book massage and facials at ${shortName}?`,
      a: `Massage and facials start ${opensLabel}. ${shortName} is already open for the Remedy Lounge, so your group can gather there now.`,
    },
    {
      q: "I run sound baths, workshops or talks. Can I host one at Sway?",
      a: `We'd love to hear about it. Choose Host or Partner With Sway on the inquiry form, and tell us the topic and who would lead it.`,
    },
    {
      q: "Do I need to be a member?",
      a: "No. You don't need a membership to attend or plan an event. Sway members get a lower rate at Member Access Events.",
    },
  ];
}

/** /group-events: the questions people ask before they've picked a location. */
export function groupHubFaqs(): { q: string; a: string }[] {
  return [
    {
      q: "Can I host a group event at Sway?",
      a: "Yes, at all three Denver locations: Sway Larimer on Larimer Square, Sway RiNo and Sway Central Park. Each has its own events page and an inquiry form that goes straight to that location's team.",
    },
    {
      q: "Which Sway location is best for a group spa day?",
      a: `Sway Larimer has massage, facials, the Remedy Room and Aescape robot massage today. Sway RiNo and Sway Central Park have the Remedy Lounge (saunas, cold plunge and compression therapy) now, with massage and facials starting ${CLUB_FOUNDING["denver-rino"].opensLabel} at RiNo and ${CLUB_FOUNDING["denver-central-park"].opensLabel} at Central Park.`,
    },
    {
      q: "How much does a group spa day cost?",
      a: "Group spa days use standard pricing. At Sway Larimer, massage and facials start at $139 per person ($99 for members) and the Remedy Room is $49. A Remedy Lounge session at RiNo or Central Park is $49 drop-in. Private events and buyouts are priced for your event.",
    },
    {
      q: "Do you host corporate events?",
      a: "Yes. Luxury Buyouts give corporate groups, executive retreats and client appreciation events private or exclusive use of designated spaces, with options like chair massage, sound baths, live music, catering and a mocktail or cocktail bar.",
    },
  ];
}

const pageUrl = (key: EventsKey) => `https://swaywellnessspa.com/locations/${key}/events/`;

export function clubEventsMetadata(key: EventsKey): Metadata {
  const { shortName, seoPlace, hero } = CLUB_EVENTS[key];
  const title = isClubEvents(key)
    ? `Private Events & Group Spa Parties in ${seoPlace} | ${shortName}`
    : `Group Spa Days, Bridal Parties & Private Events on ${seoPlace} | ${shortName}`;
  const description = isClubEvents(key)
    ? `Host a run club, a workshop, a birthday, a bridal party or a private corporate event at ${shortName}. Four ways to gather, from community nights to luxury buyouts.`
    : `Plan a birthday, bridal party, bachelorette or corporate event at ${shortName}. Massage, facials, the Remedy Room and Aescape for groups, steps from dinner on Larimer Square.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: pageUrl(key) },
    openGraph: {
      type: "website",
      url: pageUrl(key),
      title,
      description,
      siteName: "Sway Wellness Spa",
      images: [{ url: hero.src, width: hero.width, height: hero.height, alt: hero.alt }],
    },
  };
}

export function clubEventsJsonLd(key: EventsKey): string {
  const { shortName } = CLUB_EVENTS[key];
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
        { "@type": "ListItem", position: 2, name: "Locations", item: "https://swaywellnessspa.com/locations/" },
        { "@type": "ListItem", position: 3, name: shortName, item: `https://swaywellnessspa.com/locations/${key}/` },
        { "@type": "ListItem", position: 4, name: "Events", item: pageUrl(key) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: clubEventFaqs(key).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
