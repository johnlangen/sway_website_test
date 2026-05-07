import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mother's Day Spa Gift Cards | Sway Wellness Spa Denver",
  description:
    "Last-minute Mother's Day gift? Sway spa gift cards delivered instantly to Mom's inbox. Any amount. Redeemable on massage, facials, sauna, and more at Sway Wellness Spa Denver.",
  alternates: {
    canonical: "https://swaywellnessspa.com/mothers-day-gift-cards/",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Mother's Day Spa Gift Cards | Sway Wellness Spa",
    description:
      "Give Mom the gift of real rest. Sway spa gift cards delivered instantly. Massage, facials, sauna, cold plunge, and more.",
    url: "https://swaywellnessspa.com/mothers-day-gift-cards/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "/assets/giftcard.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Mother's Day Gift Cards",
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
      name: "How fast is Sway's Mother's Day gift card delivery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway gift cards are delivered instantly by email. You can purchase right up to Mother's Day morning and your gift will arrive in seconds — no shipping required.",
      },
    },
    {
      "@type": "Question",
      name: "What can a Sway gift card be used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any service at Sway Wellness Spa: massage therapy, facials, Remedy Room recovery (sauna, cold plunge, compression, LED), Aescape robot massage, boosts, and retail products.",
      },
    },
    {
      "@type": "Question",
      name: "Do Sway gift cards expire?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Sway gift cards never expire and can be used for any service at Sway Wellness Spa, located at 1428 Larimer St., Denver, CO 80202.",
      },
    },
  ],
};

export default function MothersDayGiftCardsLayout({
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
