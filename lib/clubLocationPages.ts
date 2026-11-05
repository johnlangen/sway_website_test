/**
 * Per-club content for the RiNo and Central Park location pages (app/components/ClubLocationPage.tsx).
 *
 * Hours mirror the Google Business Profile. If they change, update them here, in the JSON-LD in each
 * club's layout.tsx, and on Google together.
 */

import { getDenverTimeParts } from "./larimerHours";
import type { ClubLocationKey } from "./clubLocations";

export type HoursSegment = { opens: number; closes: number };
export type WeekHours = Record<string, HoursSegment[]>;

const t = (h: number, m = 0) => h * 60 + m;

const hours = (opens: number, closes: number): HoursSegment => ({ opens, closes });

export type LoungeStep = { label: string; minutes: number; heat: "hot" | "warm" | "rest" | "cold" };

export type ClubPageConfig = {
  city: string;
  street: string;
  zip: string;
  eyebrow: string;
  intro: string;
  srSummary: string;
  mapUrl: string;
  reviewsUrl: string;
  /** Hero split: the sauna on one side, the plunge on the other. */
  hot: { src: string; alt: string; position: string };
  cold: { src: string; alt: string; position: string };
  loungePhoto: { src: string; alt: string; position: string };
  whereNote: string;
  hasWarmSoak: boolean;
  plungeLabel: string;
  week: WeekHours;
};

const RINO_WEEKDAY = [hours(t(6, 30), t(10)), hours(t(16), t(20))];
const CP_MIDWEEK = [hours(t(8), t(11)), hours(t(16), t(20))];

export const CLUB_PAGES: Record<ClubLocationKey, ClubPageConfig> = {
  "denver-rino": {
    city: "Denver",
    street: "3636 Blake St",
    zip: "80205",
    eyebrow: "Sauna, Cold Plunge & Recovery · RiNo, Denver",
    intro:
      "A recovery-led wellness club in the heart of RiNo. Traditional and infrared saunas, cold plunge, and compression therapy in the Remedy Lounge.",
    srSummary:
      "Sway Wellness Spa RiNo is a recovery-led wellness club at 3636 Blake St. in Denver's RiNo Art District, CO 80205, formerly Upswell Studio. The Sway Remedy Lounge is open daily with sauna, cold plunge, infrared, compression therapy, and PEMF. Massage and facial treatments are coming soon. Memberships are available for unlimited Sway Remedy Lounge access. Existing Upswell members were carried over automatically.",
    mapUrl: "https://www.google.com/maps?q=3636+Blake+St,+Denver,+CO+80205",
    reviewsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJSYpObGF5bIcRFVlb08RlL8I",
    hot: {
      src: "/assets/rino2.jpeg",
      alt: "Traditional sauna at Sway Wellness Spa RiNo",
      position: "50% 58%",
    },
    cold: {
      src: "/assets/rino1.jpeg",
      alt: "Cold plunge and recovery pool at Sway Wellness Spa RiNo",
      position: "50% 76%",
    },
    loungePhoto: {
      src: "/assets/rino2.jpeg",
      alt: "Traditional sauna at Sway Wellness Spa RiNo",
      position: "50% 62%",
    },
    whereNote: "RiNo Art District. Walkable from the 38th & Blake light rail station.",
    hasWarmSoak: false,
    plungeLabel: "Cold plunge",
    week: {
      Mon: [hours(t(16), t(20))],
      Tue: RINO_WEEKDAY,
      Wed: RINO_WEEKDAY,
      Thu: RINO_WEEKDAY,
      Fri: RINO_WEEKDAY,
      Sat: [hours(t(11), t(17))],
      Sun: [hours(t(11), t(17))],
    },
  },
  "denver-central-park": {
    city: "Aurora",
    street: "2271 Clinton St",
    zip: "80010",
    eyebrow: "Sauna, Cold Plunge & Recovery · Central Park, Denver",
    intro:
      "A recovery-led wellness club serving Central Park, Stapleton, and northwest Aurora. Traditional and infrared saunas, cold plunges, a warm soak, and compression therapy in the Remedy Lounge.",
    srSummary:
      "Sway Wellness Spa Central Park is a recovery-led wellness club at 2271 Clinton St. in Aurora, CO 80010, on the edge of Denver's Central Park neighborhood, formerly Upswell Studio. The Sway Remedy Lounge is open daily with traditional and infrared saunas, cold plunges, a warm soak, compression therapy, and PEMF. Massage and facial treatments are coming soon. Memberships are available for unlimited Sway Remedy Lounge access. Existing Upswell members were carried over automatically.",
    mapUrl: "https://www.google.com/maps?q=2271+Clinton+St,+Aurora,+CO+80010",
    reviewsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJw3MZ6UZ9bIcRmE9mIeK__KU",
    hot: {
      src: "/assets/centralpark2.jpg",
      alt: "The arched sauna at Sway Wellness Spa Central Park",
      position: "85% 45%",
    },
    cold: {
      src: "/assets/centralpark1.jpg",
      alt: "Cold plunge tubs set in warm wood at Sway Wellness Spa Central Park",
      position: "50% 92%",
    },
    loungePhoto: {
      src: "/assets/centralpark1.jpg",
      alt: "Cold plunge tubs set in warm wood at Sway Wellness Spa Central Park",
      position: "50% 100%",
    },
    whereNote: "Serving the Central Park, Stapleton, and northwest Aurora communities.",
    hasWarmSoak: true,
    plungeLabel: "Cold plunges",
    week: {
      Mon: [hours(t(16), t(20))],
      Tue: CP_MIDWEEK,
      Wed: CP_MIDWEEK,
      Thu: CP_MIDWEEK,
      Fri: [hours(t(8), t(14))],
      Sat: [hours(t(8), t(14))],
      Sun: [hours(t(8), t(18))],
    },
  },
};

/** "6:30 AM", "4 PM" */
export function clockLabel(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h < 12 ? "AM" : "PM"}`;
}

/** Clubs close midday on some days, so a day can have two windows to check. */
export function getClubStatus(week: WeekHours): { open: boolean; label: string } {
  const { hour, minute, weekday } = getDenverTimeParts();
  const mins = hour * 60 + minute;
  const today = week[weekday] ?? [];

  if (today.some((s) => mins >= s.opens && mins < s.closes)) {
    return { open: true, label: "Open now" };
  }
  const laterToday = today.find((s) => mins < s.opens);
  if (laterToday) {
    return { open: false, label: `Closed · Opens at ${clockLabel(laterToday.opens)}` };
  }
  const order = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const nextDay = order[(order.indexOf(weekday) + 1) % 7];
  const next = week[nextDay]?.[0];
  return { open: false, label: next ? `Closed · Opens ${nextDay} at ${clockLabel(next.opens)}` : "Closed" };
}
