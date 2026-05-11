import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sway Central Park | Modern Wellness Club Near Central Park, Denver — Opening 2026",
  description:
    "Sway Central Park is opening at 2271 Clinton St. Massage therapy, sauna, cold plunge, infrared sauna, compression therapy, and a recovery-focused wellness club near Denver's Central Park neighborhood. Join the waitlist.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-central-park/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-central-park/",
    title:
      "Sway Central Park | Modern Wellness Club Near Central Park, Denver",
    description:
      "Massage, sauna, cold plunge, compression, and red light recovery near Denver's Central Park. Opening 2026 — join the waitlist.",
    images: [
      {
        url: "/assets/SWAY.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Central Park wellness club near Denver's Central Park neighborhood",
      },
    ],
    siteName: "Sway Wellness Spa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sway Central Park | Modern Wellness Club Near Denver",
    description:
      "Massage, sauna, cold plunge, compression, and red light recovery near Central Park. Opening 2026.",
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
  name: "Sway Wellness Spa – Central Park",
  description:
    "A modern wellness club opening near Denver's Central Park neighborhood. Sway Central Park offers massage therapy and an expansive recovery suite — traditional sauna, infrared sauna, cold plunge, compression therapy, and red light therapy — with advanced facials and Aescape robot massage planned for later in 2026.",
  image: "https://swaywellnessspa.com/assets/SWAY.jpg",
  "@id": "https://swaywellnessspa.com/locations/denver-central-park/",
  url: "https://swaywellnessspa.com/locations/denver-central-park/",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2271 Clinton St",
    addressLocality: "Aurora",
    addressRegion: "CO",
    postalCode: "80010",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.7494,
    longitude: -104.8688,
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
      name: "When does Sway Central Park open?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway Central Park is opening in June 2026 at 2271 Clinton St near Denver's Central Park neighborhood. Phase 1 services — massage and the Remedy Room recovery circuit — are available at launch. Facials and Aescape robot massage will follow later in 2026.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Sway Central Park located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway Central Park is located at 2271 Clinton Street, on the border of Denver's Central Park neighborhood and Aurora, CO. It serves the Stapleton, Central Park, and northwest Aurora communities.",
      },
    },
    {
      "@type": "Question",
      name: "What services will Sway Central Park offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway Central Park will offer expert massage therapy and a full recovery suite including traditional sauna, infrared sauna, cold plunge, compression therapy, and red light therapy. Advanced facials and AI-powered Aescape robot massage will be added later in 2026.",
      },
    },
    {
      "@type": "Question",
      name: "What memberships will be available at Sway Central Park?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two memberships will be offered at Sway Central Park: standard Sway membership at $99/month (unlimited massages and facials at $99 each, 50% off recovery), and Sway Unlimited at $189/month (unlimited Remedy Room and recovery sessions, available only at Sway Central Park and Sway RiNo).",
      },
    },
    {
      "@type": "Question",
      name: "Is Sway taking over Upswell at this location?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway is converting the former Upswell Central Park into Sway Central Park. Existing Upswell members will have their memberships honored under their current terms. Details will be communicated directly to all current Upswell members.",
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
      name: "Denver Central Park",
      item: "https://swaywellnessspa.com/locations/denver-central-park/",
    },
  ],
};

export default function DenverCentralParkLayout({
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
