// app/gift-cards/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa Gift Cards | Buy Wellness Gifts Online at Sway Wellness Spa",
  description:
    "Give the gift of wellness. Purchase a Sway Wellness Spa gift card online for massages, facials, and Remedy Room experiences.",
  alternates: {
    canonical: "https://swaywellnessspa.com/gift-cards/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Spa Gift Cards | Sway Wellness Spa",
    description:
      "Give the ultimate gift of relaxation. Buy Sway Wellness Spa gift cards online for massages, facials, and Remedy Room treatments.",
    url: "https://swaywellnessspa.com/gift-cards/",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do Sway Wellness Spa gift cards work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway gift cards are available in any dollar amount and can be purchased online for instant digital delivery. They can be used for any service at Sway including massages, facials, Remedy Room sessions, and Aescape robot massage.",
      },
    },
    {
      "@type": "Question",
      name: "Do Sway gift cards expire?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, Sway gift cards do not expire. They can be redeemed at any time for any service or product at Sway Wellness Spa.",
      },
    },
    {
      "@type": "Question",
      name: "Can I buy a Sway gift card online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway gift cards can be purchased online at swaywellnessspa.com/gift-cards with instant digital delivery via email. You can also purchase physical gift cards in-spa.",
      },
    },
    {
      "@type": "Question",
      name: "What can I use a Sway gift card for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gift cards can be applied to any Sway service: massage therapy, facial treatments, Remedy Room recovery sessions, Aescape robot massage, boosts and add-ons, and retail products.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Gift Cards", item: "https://swaywellnessspa.com/gift-cards" },
  ],
};

export default function GiftCardsLayout({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
