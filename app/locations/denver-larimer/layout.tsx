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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where should I park when visiting Sway Larimer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway Larimer is located on Larimer Square in downtown Denver. We validate parking for the 1st hour at the Larimer Square Parking Garage (1422 Market Street, Denver CO 80202). After the first hour, the rate is $2 every 10 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Sway different from a traditional spa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway is a modern wellness club that combines expert-led massage and advanced facials with recovery technology: infrared sauna, cold plunge, Normatec compression, and AI-powered Aescape robot massage. Everything is under one roof and designed for consistent care, not one-off visits.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book a massage or facial at Sway Larimer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book online through swaywellnessspa.com, by phone at (303) 476-6150, or walk in. We recommend booking ahead during evenings and weekends.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a membership to book at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, anyone can book at Sway. Memberships start at $99/month and unlock savings on every visit, but they're completely optional.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Remedy Room at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Remedy Room is a guided 40-minute recovery circuit combining infrared sauna, cold plunge, Normatec compression therapy, and LED light therapy. It's $49 per session ($25 for members).",
      },
    },
    {
      "@type": "Question",
      name: "Is Sway Larimer walkable from Union Station?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway is a short walk from Union Station and centrally located in Larimer Square in downtown Denver.",
      },
    },
    {
      "@type": "Question",
      name: "When should I arrive for my appointment at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Please arrive about 15 minutes early to check in and settle into the space.",
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
      item: "https://swaywellnessspa.com/locations",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Denver Larimer",
      item: "https://swaywellnessspa.com/locations/denver-larimer",
    },
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
