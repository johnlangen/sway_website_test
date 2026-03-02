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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Sway's holiday gift card bonus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "During the holiday season (typically December 12–25), buy a $150 Sway gift card and receive a $25 bonus card. The bonus card is valid for any service at Sway Wellness Spa.",
      },
    },
    {
      "@type": "Question",
      name: "Can I buy Sway holiday gift cards online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway holiday gift cards can be purchased online at swaywellnessspa.com with instant digital delivery via email, making them a perfect last-minute gift.",
      },
    },
    {
      "@type": "Question",
      name: "What services can a Sway gift card be used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway gift cards work for all services: massage therapy, facials, Remedy Room recovery (sauna, cold plunge, compression, LED), Aescape robot massage, boosts, and retail products.",
      },
    },
  ],
};

export default function HolidayGiftCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
