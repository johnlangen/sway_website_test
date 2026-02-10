import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holiday Spa Gift Cards | Sway Wellness Spa Denver",
  description:
    "Give the gift of wellness this holiday season. Buy a $150 spa gift card at Sway and receive a $25 bonus card. Instant digital delivery.",
  alternates: {
    canonical: "https://swaywellnessspa.com/holiday-gift-cards",
  },
  openGraph: {
    title: "Holiday Spa Gift Cards | Sway Wellness Spa",
    description:
      "Holiday bonus: Buy a $150 spa gift card at Sway and get a $25 bonus card. Perfect for massages, facials, sauna, cold plunge, and Aescape.",
    url: "https://swaywellnessspa.com/holiday-gift-cards",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "/assets/holidaygcdesktop.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Holiday Gift Cards",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function HolidayGiftCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
