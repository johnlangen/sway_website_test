import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memberships from $99/month | Sway Larimer (Denver, CO)",
  description:
    "Spa memberships from $99/month: Essential ($99), Premier ($129), Ultimate ($159), plus Aescape robot massage and Remedy Room recovery. Larimer Square, Denver.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-larimer/membership/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/membership/",
    title: "Memberships from $99/month | Sway Larimer (Denver, CO)",
    description:
      "Three membership tiers — Essential, Premier, and Ultimate — plus Aescape and Remedy Room. Larimer Square, Denver.",
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
    title: "Memberships from $99/month | Sway Larimer (Denver, CO)",
    description:
      "Essential, Premier, and Ultimate membership tiers plus Aescape and Remedy Room at Sway on Larimer Square in Denver.",
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
        item: "https://swaywellnessspa.com/locations/denver-larimer/membership/",
      },
    ],
  };

  const offersJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Sway Larimer Memberships",
    url: "https://swaywellnessspa.com/locations/denver-larimer/membership/",
    description:
      "Wellness club memberships at Sway Wellness Spa on Larimer Square in Denver, CO. Essential ($99/mo), Premier ($129/mo), Ultimate ($159/mo), plus Aescape and Remedy Room.",
    numberOfItems: 6,
    itemListElement: [
      {
        "@type": "Offer",
        name: "Essential Membership",
        description:
          "50-minute signature facials and massages at $99/month (drop-in $139). Includes member lounge, 50% off boosts, and rollover credits.",
        price: "99.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/membership/",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer/",
        },
      },
      {
        "@type": "Offer",
        name: "Premier Membership",
        description:
          "Enhanced facials and massages with targeted products and extended durations at $129/month (drop-in $169). 7 facial and 6 massage options.",
        price: "129.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/membership/",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer/",
        },
      },
      {
        "@type": "Offer",
        name: "Ultimate Membership",
        description:
          "Tech-enhanced premium facials and massages with LED, microcurrent, and oxygen infusion at $159/month (drop-in $199). Maximum duration and results.",
        price: "159.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/membership/",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer/",
        },
      },
      {
        "@type": "Offer",
        name: "Aescape Premier Membership",
        description:
          "AI-powered robot massage membership — choose 4×30 min or 2×60 min sessions per month at $99/month.",
        price: "99.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/membership/",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer/",
        },
      },
      {
        "@type": "Offer",
        name: "Remedy Room Membership",
        description:
          "4 monthly recovery circuit visits — sauna, cold plunge, Normatec compression, LED light therapy at $99/month.",
        price: "99.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/membership/",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer/",
        },
      },
      {
        "@type": "Offer",
        name: "Ultimate Tech Recovery Package",
        description:
          "1×30 min robot massage + 1×40 min Remedy Room recovery experience per month at $99/month.",
        price: "99.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/membership/",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer/",
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
      {children}
    </>
  );
}
