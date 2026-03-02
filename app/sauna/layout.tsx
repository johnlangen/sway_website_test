import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sauna Therapy in Denver | Remedy Room at Sway Wellness Spa",
  description:
    "Sauna therapy at Sway, a modern wellness club in Denver. Part of the Remedy Room recovery circuit with cold plunge, Normatec compression, and LED light therapy. Member $25, Drop-In $49.",
  alternates: {
    canonical: "https://swaywellnessspa.com/sauna",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/sauna",
    title: "Sauna Therapy in Denver | Sway Wellness Spa",
    description:
      "Sauna therapy as part of the Remedy Room recovery circuit at Sway, a modern wellness club on Larimer Square in Denver.",
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
    title: "Sauna Therapy in Denver | Sway Wellness Spa",
    description:
      "Sauna therapy for recovery, circulation, and stress relief at Sway, a modern wellness club in Denver. Part of the Remedy Room circuit.",
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
      streetAddress: "1428 Larimer St.",
      addressLocality: "Denver",
      addressRegion: "CO",
      addressCountry: "US",
    },
  },
  description:
    "Sauna therapy at Sway Wellness Spa in Denver. Part of the Remedy Room, a 40-minute recovery circuit combining sauna, cold plunge, Normatec compression, and LED light therapy.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What type of sauna does Sway have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway features a traditional sauna as part of the Remedy Room recovery circuit. Heat therapy supports circulation, recovery, and deep relaxation.",
      },
    },
    {
      "@type": "Question",
      name: "How long is the sauna session at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The sauna is part of a guided 40-minute Remedy Room circuit: 15 minutes of Normatec compression with LED light therapy, 20 minutes of sauna, and 5 minutes of cold plunge.",
      },
    },
    {
      "@type": "Question",
      name: "How much does the sauna cost at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Remedy Room (which includes the sauna) is $49 per session for drop-in guests and $25 for Sway members. Memberships start at $99/month.",
      },
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
