import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memberships | Sway Larimer (Denver, CO)",
  description:
    "3 memberships, all $99/month: Spa Club (massages & facials at $99), Remedy Room (4 recovery visits), Aescape Robot (2 AI massage sessions). Rollover credits. Larimer Square, Denver.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-larimer/membership",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/membership",
    title: "Memberships | Sway Larimer (Denver, CO)",
    description:
      "3 memberships, all $99/month: Spa Club, Remedy Room, and Aescape Robot Massage. Exclusive perks and rollover credits at Sway on Larimer Square.",
    images: [
      {
        url: "/assets/OG/og-join-the-club.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Larimer Denver Memberships",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Memberships | Sway Larimer (Denver, CO)",
    description:
      "3 memberships, all $99/month: Spa Club, Remedy Room, and Aescape Robot Massage at Sway on Larimer Square in Denver.",
    images: ["/assets/OG/og-join-the-club.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://swaywellnessspa.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Denver – Larimer Square",
        item: "https://swaywellnessspa.com/locations/denver-larimer/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Memberships",
        item: "https://swaywellnessspa.com/locations/denver-larimer/membership",
      },
    ],
  };

  const offersJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Sway Larimer Memberships",
    url: "https://swaywellnessspa.com/locations/denver-larimer/membership",
    description:
      "Three wellness club memberships at Sway Wellness Spa on Larimer Square in Denver, CO. All plans $99/month.",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "Offer",
        name: "Spa Club Membership",
        description:
          "1 facial or massage included monthly, unlimited additional treatments at $99 each (reg. $139), 50% off Remedy Room and boosts, private member lounge, bring a friend once a month at member pricing, 10% off retail, rollover credits.",
        price: "99.00",
        priceCurrency: "USD",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/membership",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer",
        },
      },
      {
        "@type": "Offer",
        name: "Remedy Room Membership",
        description:
          "4 monthly recovery circuit visits (sauna, cold plunge, Normatec compression, LED light therapy), additional visits $25 each, $99 massages and facials, 50% off boosts.",
        price: "99.00",
        priceCurrency: "USD",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/membership",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer",
        },
      },
      {
        "@type": "Offer",
        name: "Aescape Robot Massage Membership",
        description:
          "2 monthly 60-minute AI-powered robot massage sessions with real-time muscle mapping and personalized pressure zones.",
        price: "99.00",
        priceCurrency: "USD",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/membership",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer",
        },
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What membership plans does Sway Larimer offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sway Larimer offers three memberships, all $99/month: Spa Club (1 massage or facial monthly, unlimited at $99 each, 50% off boosts and Remedy Room), Remedy Room (4 monthly recovery circuit visits with sauna, cold plunge, Normatec, and LED), and Aescape Robot (2 monthly 60-minute AI-powered massage sessions).",
        },
      },
      {
        "@type": "Question",
        name: "What perks do Sway Spa Club members get?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Spa Club members get: 1 facial or massage included monthly, unlimited additional treatments at $99 each (reg. $139), 50% off boosts and super boosts, Remedy Room at $25 (reg. $49), private member lounge with robes, sandals, neck pillows and snacks, bring a friend once a month at member pricing, 10% off retail, and rollover credits.",
        },
      },
      {
        "@type": "Question",
        name: "Do Sway membership credits roll over?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Unused monthly credits roll over so you never lose a treatment. Use them whenever works best for your schedule.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a membership to visit Sway?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Sway is open to everyone — no membership required. Drop-in pricing starts at $129 for massages. Memberships are optional but save members $40 per massage or facial and 50% on recovery and boosts.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
