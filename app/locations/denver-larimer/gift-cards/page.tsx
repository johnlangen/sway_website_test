import { Metadata } from "next";
import LarimerGiftCardsPage from "./LarimerGiftCardsPage";

export const metadata: Metadata = {
  title: "Spa Gift Cards Larimer | Buy Wellness Gifts Online at Sway Denver",
  description:
    "Give the gift of wellness in Denver. Buy Sway Larimer gift cards online — instant delivery. Redeemable for massages, facials, Remedy Room, and Aescape. Never expires.",
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
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I buy a Sway Larimer gift card?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sway Larimer gift cards can be purchased online at swaywellnessspa.com/locations/denver-larimer/gift-cards with instant digital delivery via email. You can choose any dollar amount. Physical gift cards are also available in-spa at 1428 Larimer St., Denver, CO.",
        },
      },
      {
        "@type": "Question",
        name: "What can a Sway gift card be used for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sway gift cards can be redeemed for any service at Sway Wellness Spa including massage therapy (6 types), facial treatments (6 types), Remedy Room recovery circuit (sauna, cold plunge, Normatec, LED), Aescape AI robot massage, boost add-ons, and retail products.",
        },
      },
      {
        "@type": "Question",
        name: "Do Sway gift cards expire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Sway gift cards never expire and have no dormancy fees. They can be redeemed at any Sway or Spavia branded spa in the United States at any time.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use a Sway gift card at other locations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Sway gift cards are valid at any Sway or Spavia branded spa in the United States. Sway currently has locations in Denver (Larimer Square), with Georgetown (Washington, D.C.) and Dallas coming soon.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LarimerGiftCardsPage />
    </>
  );
}
