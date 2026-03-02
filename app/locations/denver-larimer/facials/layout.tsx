import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facials in Denver | Sway Wellness Spa Larimer Square",
  description:
    "Book advanced facials at Sway Wellness Spa in Larimer Square, Denver. Anti-aging, hydration, acne, sensitive skin, and Vitamin C treatments.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-larimer/facials",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/facials",
    title: "Facials in Denver | Sway Wellness Spa Larimer Square",
    description:
      "Advanced facial treatments in Denver at Sway Wellness Spa (Larimer Square). Anti-aging, hydration, acne, and Vitamin C facials.",
    images: [
      {
        url: "/assets/OG/og-facials.jpg",
        width: 1200,
        height: 630,
        alt: "Facial treatment at Sway Wellness Spa Denver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facials in Denver | Sway Wellness Spa Larimer Square",
    description:
      "Advanced facial treatments in Denver at Sway Wellness Spa (Larimer Square).",
    images: ["/assets/OG/og-facials.jpg"],
  },
  robots: { index: true, follow: true },
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
      name: "Denver – Larimer Square",
      item: "https://swaywellnessspa.com/locations/denver-larimer/",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Facials",
      item: "https://swaywellnessspa.com/locations/denver-larimer/facials",
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Facial Treatment",
  provider: {
    "@type": "LocalBusiness",
    name: "Sway Wellness Spa",
    url: "https://swaywellnessspa.com",
    image: "https://swaywellnessspa.com/assets/OG/og-facials.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1428 Larimer St.",
      addressLocality: "Denver",
      addressRegion: "CO",
      addressCountry: "US",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Denver",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "647",
    bestRating: "5",
  },
  description:
    "Advanced facial treatments at Sway Wellness Spa in Larimer Square, Denver. Six signature facials including anti-aging, hydration, acne, sensitive skin, and Vitamin C treatments by Eminence Organics and Dr. Dennis Gross.",
};

export default function LarimerFacialsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
