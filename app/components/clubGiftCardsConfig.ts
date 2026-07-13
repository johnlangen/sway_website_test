/* Config for the club gift-cards pages. Kept OUT of the "use client"
   component so server pages (metadata + prerender) can import real values —
   data exported from a client module arrives as a client-reference proxy. */

export type ClubGiftCardsConfig = {
  key: "rino" | "central-park";
  name: string;
  cityState: string;
  slug: string;
  studioId: string;
  email: string;
  saunaLabel: string;
  saunaDescription: string;
  plungeLabel: string;
  plungeDescription: string;
  heroBlurb: string;
  productDescription: string;
  breadcrumbName: string;
};

export const CLUB_GIFT_CARDS: Record<string, ClubGiftCardsConfig> = {
  rino: {
    key: "rino",
    name: "Sway RiNo",
    cityState: "Denver, CO",
    slug: "denver-rino",
    studioId: "5754020",
    email: "contact@swayrino.com",
    saunaLabel: "Infrared Saunas",
    saunaDescription: "Private infrared cabins for deep heat",
    plungeLabel: "Cold Plunge",
    plungeDescription: "Contrast therapy that resets everything",
    heroBlurb:
      "Treat someone special to the Sway Wellness Club experience. Redeemable for Remedy Lounge sessions with infrared sauna and cold plunge in Denver's RiNo Art District.",
    productDescription:
      "Give the gift of recovery in Denver's RiNo Art District. Redeemable for Remedy Lounge sessions, infrared sauna, and cold plunge.",
    breadcrumbName: "Denver RiNo",
  },
  "central-park": {
    key: "central-park",
    name: "Sway Central Park",
    cityState: "Aurora, CO",
    slug: "denver-central-park",
    studioId: "5754021",
    email: "contact@swaycentralpark.com",
    saunaLabel: "Infrared & Traditional Saunas",
    saunaDescription: "Two kinds of heat, your choice",
    plungeLabel: "Cold Plunge & Warm Soak",
    plungeDescription: "Contrast therapy that resets everything",
    heroBlurb:
      "Treat someone special to the Sway Wellness Club experience. Redeemable for Remedy Lounge sessions with infrared and traditional saunas, cold plunge, and warm soak near Central Park.",
    productDescription:
      "Give the gift of recovery near Denver's Central Park. Redeemable for Remedy Lounge sessions, saunas, cold plunge, and warm soak.",
    breadcrumbName: "Denver Central Park",
  },
};
