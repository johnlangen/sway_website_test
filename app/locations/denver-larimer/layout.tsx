import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sway Larimer | Spa in Downtown Denver on Larimer Square",
  description:
    "Visit Sway Wellness Spa on Larimer Square in downtown Denver. Massage therapy, facials, sauna, cold plunge, LED light therapy, and AI-powered Aescape massage. Book online today.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-larimer",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer",
    title: "Sway Larimer | Spa in Downtown Denver on Larimer Square",
    description:
      "Massage, facials, sauna, cold plunge & Aescape robot massage on Larimer Square in downtown Denver.",
    images: [
      {
        url: "/assets/homepage_photo_outside.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Larimer wellness spa on Larimer Square in Denver",
      },
    ],
    siteName: "Sway Wellness Spa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sway Larimer | Spa in Downtown Denver",
    description:
      "Massage, facials, sauna & cold plunge at Sway Wellness Spa on Larimer Square in downtown Denver.",
    images: ["/assets/homepage_photo_outside.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  name: "Sway Wellness Spa – Larimer Square",
  image: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
  "@id": "https://swaywellnessspa.com/locations/denver-larimer",
  url: "https://swaywellnessspa.com/locations/denver-larimer",
  telephone: "+1-303-476-6150",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1428 Larimer St.",
    addressLocality: "Denver",
    addressRegion: "CO",
    postalCode: "80202",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.74794,
    longitude: -104.99844,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "111",
    bestRating: "5",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Spa Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Massage Therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Facial Treatments" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sauna Therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cold Plunge Therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aescape Robot Massage" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LED Light Therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Compression Therapy" } },
    ],
  },
  sameAs: [
    "https://www.instagram.com/swaywellnessclub/",
    "https://www.facebook.com/swaywellnessspa",
  ],
};

export default function DenverLarimerLayout({
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
      {children}
    </>
  );
}
