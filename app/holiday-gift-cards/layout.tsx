import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Holiday Spa Gift Cards | Sway Wellness Spa Denver" },
  description:
    "Holiday bonus, Nov 26 to Dec 25: give a $200+ Sway gift card and get a free 30-minute express facial or massage. Emailed now or on a date you pick.",
  alternates: {
    canonical: "https://swaywellnessspa.com/holiday-gift-cards/",
  },
  openGraph: {
    title: "Holiday Spa Gift Cards | Sway Wellness Spa",
    description:
      "Holiday bonus, Nov 26 to Dec 25: give a $200+ Sway gift card and get a free 30-minute express facial or massage. Good for massages, facials, sauna, cold plunge, and Aescape.",
    url: "https://swaywellnessspa.com/holiday-gift-cards/",
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
        text: "From November 26 through December 25, 2026, each single Sway gift card of $200 or more bought on swaywellnessspa.com comes with one free 30-minute express facial or massage. The bonus can be used January 1 through April 30, 2027, only at the Sway location that sold the gift card (Sway Larimer, Sway RiNo or Sway Central Park). The gift card itself works at any Sway or Spavia spa.",
      },
    },
    {
      "@type": "Question",
      name: "Can I buy Sway holiday gift cards online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway gift cards can be purchased online at swaywellnessspa.com and are emailed right after purchase or on a date you pick, making them a perfect last-minute gift. A gift card is ready to use 24 hours after purchase.",
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
