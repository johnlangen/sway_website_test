import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sauna Therapy | Relax & Recover at Sway Wellness Spa",
  description:
    "Relax, recover, and reset with sauna therapy at Sway Wellness Spa. Improve circulation, reduce stress, and support muscle recovery.",
  alternates: {
    canonical: "https://swaywellnessspa.com/sauna",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/sauna",
    title: "Sauna Therapy | Relax & Recover at Sway Wellness Spa",
    description:
      "Sauna therapy at Sway Wellness Spa for recovery, relaxation, and overall wellness.",
    images: [
      {
        url: "/assets/OG/og-sauna.jpg",
        width: 1200,
        height: 630,
        alt: "Sauna at Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sauna Therapy | Relax & Recover at Sway Wellness Spa",
    description:
      "Sauna therapy to support recovery, circulation, and stress relief at Sway Wellness Spa.",
    images: ["/assets/OG/og-sauna.jpg"],
  },
  robots: { index: true, follow: true },
};

// Breadcrumb schema
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
      name: "Sauna",
      item: "https://swaywellnessspa.com/sauna",
    },
  ],
};

// Service schema (NOT infrared)
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Sauna Therapy",
  provider: {
    "@type": "LocalBusiness",
    name: "Sway Wellness Spa",
    image: "https://swaywellnessspa.com/assets/OG/og-sauna.jpg",
    url: "https://swaywellnessspa.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Larimer St",
      addressLocality: "Denver",
      addressRegion: "CO",
      addressCountry: "USA",
    },
  },
  description:
    "Traditional sauna therapy at Sway Wellness Spa to support relaxation, circulation, muscle recovery, and overall wellness.",
};

export default function SaunaLayout({
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
