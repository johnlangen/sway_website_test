import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infrared Sauna | Sway Wellness Spa",
  description:
    "Boost recovery, burn calories, build immunity, and reduce stress with infrared sauna therapy at Sway Wellness Spa in Denver.",
  alternates: {
    canonical: "https://swaywellnessspa.com/sauna",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/sauna",
    title: "Infrared Sauna | Sway Wellness Spa",
    description:
      "Experience the health benefits of infrared sauna: calorie burn, detox, stress relief, better sleep, and immune support.",
    images: [
      {
        url: "/assets/OG/og-sauna.jpg",
        width: 1200,
        height: 630,
        alt: "Infrared Sauna at Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infrared Sauna | Sway Wellness Spa",
    description:
      "Science-backed infrared sauna therapy to recharge body and mind at Sway Wellness Spa.",
    images: ["/assets/OG/og-sauna.jpg"],
  },
  robots: { index: true, follow: true },
};

// ✅ Breadcrumb JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Sauna", item: "https://swaywellnessspa.com/sauna" },
  ],
};

// ✅ Service Schema JSON-LD
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Infrared Sauna Therapy",
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
    "Infrared sauna therapy to boost recovery, burn calories, strengthen immunity, and reduce stress at Sway Wellness Spa.",
};

export default function SaunaLayout({ children }: { children: React.ReactNode }) {
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
