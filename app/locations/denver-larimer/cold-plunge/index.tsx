import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Plunge in Denver | Sway Wellness Spa Larimer Square",
  description:
    "Experience cold plunge therapy at Sway Wellness Spa in Larimer Square, Denver. Support recovery, reduce inflammation, and boost energy.",
  alternates: {
    canonical:
      "https://swaywellnessspa.com/locations/denver-larimer/cold-plunge/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/cold-plunge/",
    title: "Cold Plunge in Denver | Sway Wellness Spa Larimer Square",
    description:
      "Cold plunge therapy in Denver at Sway Wellness Spa (Larimer Square) to support recovery, resilience, and energy.",
    images: [
      {
        url: "/assets/OG/og-cold-plunge.jpg",
        width: 1200,
        height: 630,
        alt: "Cold plunge therapy at Sway Wellness Spa Denver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold Plunge in Denver | Sway Wellness Spa Larimer Square",
    description:
      "Cold plunge therapy in Denver at Sway Wellness Spa (Larimer Square).",
    images: ["/assets/OG/og-cold-plunge.jpg"],
  },
  robots: { index: true, follow: true },
};

// Breadcrumb JSON-LD
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
      name: "Cold Plunge",
      item: "https://swaywellnessspa.com/locations/denver-larimer/cold-plunge/",
    },
  ],
};

// Service JSON-LD
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Cold Plunge Therapy",
  provider: {
    "@type": "LocalBusiness",
    name: "Sway Wellness Spa",
    url: "https://swaywellnessspa.com",
    image:
      "https://swaywellnessspa.com/assets/OG/og-cold-plunge.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Larimer St",
      addressLocality: "Denver",
      addressRegion: "CO",
      addressCountry: "USA",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Denver",
  },
  description:
    "Cold plunge therapy in Denver at Sway Wellness Spa (Larimer Square) designed to support recovery, reduce inflammation, and improve resilience.",
};

export default function LarimerColdPlungeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
