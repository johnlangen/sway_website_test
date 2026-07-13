import { Metadata } from "next";
import ClubGiftCardsPage from "../../../components/ClubGiftCardsPage";
import { CLUB_GIFT_CARDS } from "../../../components/clubGiftCardsConfig";

export const metadata: Metadata = {
  title: "Gift Cards RiNo | Sway Wellness Club Denver",
  description:
    "Give the gift of recovery in Denver's RiNo Art District. Buy Sway RiNo gift cards online with instant delivery. Redeemable for Remedy Lounge sessions with infrared sauna and cold plunge. Never expires.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-rino/gift-cards/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-rino/gift-cards/",
    title: "Gift Cards RiNo | Sway Wellness Club Denver",
    description:
      "Give the gift of recovery in Denver's RiNo Art District. Purchase Sway RiNo gift cards online for Remedy Lounge sessions, infrared sauna, and cold plunge.",
    images: [
      {
        url: "/assets/OG/og-gift-cards.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Club Gift Cards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gift Cards RiNo | Sway Wellness Club Denver",
    description:
      "Give the gift of recovery in Denver's RiNo Art District. Purchase Sway RiNo gift cards online for Remedy Lounge sessions, infrared sauna, and cold plunge.",
    images: ["/assets/OG/og-gift-cards.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ClubGiftCardsPage club={CLUB_GIFT_CARDS.rino} />;
}
