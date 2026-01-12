import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sauna in Denver | Sway Wellness Spa Larimer Square",
  description:
    "Relax and recover with sauna therapy at Sway Wellness Spa in Larimer Square, Denver. Support circulation, reduce stress, and enhance recovery.",
  alternates: {
    canonical: "/locations/denver-larimer/sauna/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/sauna/",
    title: "Sauna in Denver | Sway Wellness Spa Larimer Square",
    description:
      "Sauna therapy in Denver at Sway Wellness Spa (Larimer Square). Relax, recover, and reset.",
    images: [
      {
        url: "/assets/OG/og-sauna.jpg",
        width: 1200,
        height: 630,
        alt: "Sauna at Sway Wellness Spa Denver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sauna in Denver | Sway Wellness Spa Larimer Square",
    description:
      "Sauna therapy in Denver at Sway Wellness Spa (Larimer Square).",
    images: ["/assets/OG/og-sauna.jpg"],
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
      name: "Sauna",
      item: "https://swaywellnessspa.com/locations/denver-larimer/sauna/",
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Sauna Therapy",
  provider: {
    "@type": "LocalBusiness",
    name: "Sway Wellness Spa",
    url: "https://swaywellnessspa.com",
    image: "https://swaywellnessspa.com/assets/OG/og-sauna.jpg",
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
    "Sauna therapy in Denver at Sway Wellness Spa (Larimer Square) to support relaxation, circulation, and recovery.",
};

export default function LarimerSaunaLayout({
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
