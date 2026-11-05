/**
 * Events pages for the Sway clubs (RiNo + Central Park). Copy comes from Mackenzie's "Sway Event
 * Structure" doc, Emily's 10/23 brief and the inquiry form. Keep the option names matched to the form.
 *
 * UPCOMING: add a real, dated event here and an "On the calendar" section appears on that club's
 * page. It stays hidden while the list is empty, so the page never shows an empty calendar. Member
 * and public rates are only shown once the team has set them for that event.
 */

import type { Metadata } from "next";
import { CLUB_FOUNDING } from "./clubFounding";
import type { ClubLocationKey } from "./clubLocations";
import type { EventFormLocation } from "./eventInquiry";

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

export const CLUB_EVENTS: Record<
  ClubLocationKey,
  {
    formLocation: EventFormLocation;
    neighborhood: string;
    /** "in the neighborhood" wording for search titles. */
    seoPlace: string;
    address: string;
    hero: Photo;
    space: Photo;
    upcoming: UpcomingEvent[];
  }
> = {
  "denver-rino": {
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

export function clubEventFaqs(clubKey: ClubLocationKey): { q: string; a: string }[] {
  const { shortName, opensLabel } = CLUB_FOUNDING[clubKey];
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

const pageUrl = (clubKey: ClubLocationKey) => `https://swaywellnessspa.com/locations/${clubKey}/events/`;

export function clubEventsMetadata(clubKey: ClubLocationKey): Metadata {
  const { shortName } = CLUB_FOUNDING[clubKey];
  const { seoPlace, hero } = CLUB_EVENTS[clubKey];
  const title = `Private Events & Group Spa Parties in ${seoPlace} | ${shortName}`;
  const description = `Host a run club, a workshop, a birthday, a bridal party or a private corporate event at ${shortName}. Four ways to gather, from community nights to luxury buyouts.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: pageUrl(clubKey) },
    openGraph: {
      type: "website",
      url: pageUrl(clubKey),
      title,
      description,
      siteName: "Sway Wellness Spa",
      images: [{ url: hero.src, width: hero.width, height: hero.height, alt: hero.alt }],
    },
  };
}

export function clubEventsJsonLd(clubKey: ClubLocationKey): string {
  const { shortName } = CLUB_FOUNDING[clubKey];
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
        { "@type": "ListItem", position: 2, name: "Locations", item: "https://swaywellnessspa.com/locations/" },
        { "@type": "ListItem", position: 3, name: shortName, item: `https://swaywellnessspa.com/locations/${clubKey}/` },
        { "@type": "ListItem", position: 4, name: "Events", item: pageUrl(clubKey) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: clubEventFaqs(clubKey).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
