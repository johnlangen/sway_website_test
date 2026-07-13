import { Metadata } from "next";
import ClubGiftCardsPage from "../../../components/ClubGiftCardsPage";
import { CLUB_GIFT_CARDS } from "../../../components/clubGiftCardsConfig";

export const metadata: Metadata = {
  title: "Gift Cards Central Park | Sway Wellness Club Denver",
  description:
    "Give the gift of recovery near Denver's Central Park. Buy Sway Central Park gift cards online with instant delivery. Redeemable for Remedy Lounge sessions with saunas, cold plunge, and warm soak. Never expires.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-central-park/gift-cards/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-central-park/gift-cards/",
    title: "Gift Cards Central Park | Sway Wellness Club Denver",
    description:
      "Give the gift of recovery near Denver's Central Park. Purchase Sway Central Park gift cards online for Remedy Lounge sessions, saunas, cold plunge, and warm soak.",
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
    title: "Gift Cards Central Park | Sway Wellness Club Denver",
    description:
      "Give the gift of recovery near Denver's Central Park. Purchase Sway Central Park gift cards online for Remedy Lounge sessions, saunas, cold plunge, and warm soak.",
    images: ["/assets/OG/og-gift-cards.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ClubGiftCardsPage club={CLUB_GIFT_CARDS["central-park"]} />;
}
