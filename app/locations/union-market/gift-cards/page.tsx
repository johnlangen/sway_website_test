import { Metadata } from "next";
import GeorgetownGiftCardsPage from "./GeorgetownGiftCardsPage";

export const metadata: Metadata = {
  title: "Spa Gift Cards Union Market | Coming Soon at Sway Wellness Spa",
  description:
    "Sway Union Market is coming soon. Spa gift cards for facials, massage, and Remedy Room recovery will be available once we open in Washington, DC.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/union-market/gift-cards/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/union-market/gift-cards/",
    title: "Spa Gift Cards Union Market | Coming Soon at Sway Wellness Spa",
    description:
      "Sway Union Market is coming soon. Spa gift cards for facials, massage, and Remedy Room recovery will be available once we open in Washington, DC.",
    images: [
      {
        url: "/assets/OG/og-gift-cards.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Union Market Gift Cards Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spa Gift Cards Union Market | Coming Soon at Sway Wellness Spa",
    description:
      "Sway Union Market is coming soon. Spa gift cards for facials, massage, and Remedy Room recovery will be available once we open in Washington, DC.",
    images: ["/assets/OG/og-gift-cards.jpg"],
  },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <GeorgetownGiftCardsPage />;
}
