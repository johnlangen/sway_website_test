import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sway RiNo | Modern Wellness Club in Denver's RiNo District — Opening 2026",
  description:
    "Sway RiNo is opening in Denver's RiNo Art District at 3636 Blake St. Massage therapy, sauna, cold plunge, infrared sauna, compression therapy, and a recovery-focused wellness club. Join the waitlist.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-rino/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-rino/",
    title: "Sway RiNo | Modern Wellness Club in Denver's RiNo District",
    description:
      "Massage, sauna, cold plunge, compression, and red light recovery in Denver's RiNo Art District. Opening 2026 — join the waitlist.",
    images: [
      {
        url: "/assets/SWAY.jpg",
        width: 1200,
        height: 630,
        alt: "Sway RiNo wellness club in Denver's RiNo Art District",
      },
    ],
    siteName: "Sway Wellness Spa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sway RiNo | Modern Wellness Club in Denver's RiNo District",
    description:
      "Massage, sauna, cold plunge, compression, and red light recovery in RiNo. Opening 2026.",
    images: ["/assets/SWAY.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  name: "Sway Wellness Spa – RiNo",
  description:
    "A modern wellness club opening in Denver's RiNo Art District. Sway RiNo offers massage therapy and an expansive recovery suite — traditional sauna, infrared sauna, cold plunge, compression therapy, and red light therapy — with advanced facials and Aescape robot massage planned for later in 2026.",
  image: "https://swaywellnessspa.com/assets/SWAY.jpg",
  "@id": "https://swaywellnessspa.com/locations/denver-rino/",
  url: "https://swaywellnessspa.com/locations/denver-rino/",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3636 Blake St",
    addressLocality: "Denver",
    addressRegion: "CO",
    postalCode: "80205",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.7665,
    longitude: -104.9839,
  },
  priceRange: "$$",
  sameAs: [
    "https://www.instagram.com/swaywellnessclub/",
    "https://www.facebook.com/swaywellnessspa",
    "https://www.tiktok.com/@swaywellnessclub",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When does Sway RiNo open?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway RiNo is opening in June 2026 at 3636 Blake St in Denver's RiNo Art District. Phase 1 services — massage and the Remedy Room recovery circuit — are available at launch. Facials and Aescape robot massage will follow later in 2026.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Sway RiNo located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway RiNo is located at 3636 Blake Street in Denver, CO 80205, in the heart of the RiNo Art District — walkable from the 38th & Blake light rail station.",
      },
    },
    {
      "@type": "Question",
      name: "What services will Sway RiNo offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway RiNo will offer expert massage therapy and a full recovery suite including traditional sauna, infrared sauna, cold plunge, compression therapy, and red light therapy. Advanced facials and AI-powered Aescape robot massage will be added later in 2026.",
      },
    },
    {
      "@type": "Question",
      name: "What memberships will be available at Sway RiNo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two memberships will be offered at Sway RiNo: standard Sway membership at $99/month (unlimited massages and facials at $99 each, 50% off recovery), and Sway Unlimited at $189/month (unlimited Remedy Room and recovery sessions, available only at Sway RiNo and Sway Central Park).",
      },
    },
    {
      "@type": "Question",
      name: "Is Sway taking over Upswell at this location?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway is converting the former Upswell RiNo Station into Sway RiNo. Existing Upswell members will have their memberships honored under their current terms. Details will be communicated directly to all current Upswell members.",
      },
    },
  ],
};

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
      name: "Locations",
      item: "https://swaywellnessspa.com/locations/",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Denver RiNo",
      item: "https://swaywellnessspa.com/locations/denver-rino/",
    },
  ],
};

export default function DenverRinoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
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
