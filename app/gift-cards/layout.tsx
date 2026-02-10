// app/gift-cards/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa Gift Cards | Buy Wellness Gifts Online at Sway Wellness Spa",
  description:
    "Give the gift of wellness. Purchase a Sway Wellness Spa gift card online for massages, facials, and Remedy Room experiences.",
  alternates: {
    canonical: "https://swaywellnessspa.com/gift-cards",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Spa Gift Cards | Sway Wellness Spa",
    description:
      "Give the ultimate gift of relaxation. Buy Sway Wellness Spa gift cards online for massages, facials, and Remedy Room treatments.",
    url: "https://swaywellnessspa.com/gift-cards",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "/assets/OG/og-gift-cards.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Spa Gift Cards",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function GiftCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
