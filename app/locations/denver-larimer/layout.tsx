import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sway Larimer | Modern Wellness Club on Larimer Square, Denver",
  description:
    "Visit Sway on Larimer Square in downtown Denver. A modern wellness club offering massage therapy, advanced facials, infrared sauna, cold plunge, Normatec compression, and AI-powered Aescape robot massage. Book online today.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-larimer",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer",
    title: "Sway Larimer | Modern Wellness Club on Larimer Square, Denver",
    description:
      "Massage, facials, sauna, cold plunge, Normatec compression, and Aescape robot massage at Sway on Larimer Square in downtown Denver.",
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
    title: "Sway Larimer | Modern Wellness Club in Denver",
    description:
      "Massage, facials, sauna, cold plunge, and Aescape robot massage at Sway on Larimer Square in downtown Denver.",
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
  description:
    "A modern wellness club on Larimer Square in Denver offering massage therapy, advanced facials, infrared sauna, cold plunge, Normatec compression, LED light therapy, and AI-powered Aescape robot massage.",
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
    name: "Wellness Club Services",
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
