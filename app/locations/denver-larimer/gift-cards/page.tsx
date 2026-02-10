import { Metadata } from "next";
import LarimerGiftCardsPage from "./LarimerGiftCardsPage";

export const metadata: Metadata = {
  title: "Spa Gift Cards Larimer | Buy Wellness Gifts Online at Sway Denver",
  description:
    "Give the gift of wellness in Denver. Purchase Sway Larimer gift cards online for facials, massage, and Remedy Room recovery experiences in the heart of Larimer Square.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-larimer/gift-cards",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/gift-cards",
    title: "Spa Gift Cards Larimer | Buy Wellness Gifts Online at Sway Denver",
    description:
      "Give the gift of wellness in Denver. Purchase Sway Larimer gift cards online for facials, massage, and Remedy Room recovery experiences.",
    images: [
      {
        url: "/assets/OG/og-gift-cards.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Gift Cards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spa Gift Cards Larimer | Buy Wellness Gifts Online at Sway Denver",
    description:
      "Give the gift of wellness in Denver. Purchase Sway Larimer gift cards online for facials, massage, and Remedy Room recovery experiences.",
    images: ["/assets/OG/og-gift-cards.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LarimerGiftCardsPage />;
}
