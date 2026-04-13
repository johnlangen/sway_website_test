import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Plunge Therapy in Denver | Remedy Room at Sway Wellness Spa",
  description:
    "Cold plunge therapy at Sway, a modern wellness club in Denver. Part of the Remedy Room recovery circuit with sauna, Normatec compression, and LED light therapy. Member $25, Drop-In $49.",
  alternates: {
    canonical: "https://swaywellnessspa.com/cold-plunge/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/cold-plunge",
    title: "Cold Plunge Therapy in Denver | Sway Wellness Spa",
    description:
      "Cold plunge therapy as part of the Remedy Room recovery circuit at Sway, a modern wellness club on Larimer Square in Denver.",
    images: [
      {
        url: "/assets/OG/og-cold-plunge.jpg",
        width: 1200,
        height: 630,
        alt: "Cold plunge pool at Sway Wellness Spa in Denver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold Plunge Therapy in Denver | Sway Wellness Spa",
    description:
      "Cold plunge for recovery, energy, and resilience at Sway, a modern wellness club in Denver. Part of the Remedy Room circuit.",
    images: ["/assets/OG/og-cold-plunge.jpg"],
  },
  robots: { index: true, follow: true },
};

// Breadcrumb JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Cold Plunge", item: "https://swaywellnessspa.com/cold-plunge" },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Cold Plunge Therapy",
  provider: {
    "@type": "LocalBusiness",
    name: "Sway Wellness Spa",
    url: "https://swaywellnessspa.com",
    image: "https://swaywellnessspa.com/assets/OG/og-cold-plunge.jpg",
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
  description:
    "Cold plunge therapy at Sway Wellness Spa in Denver. Part of the Remedy Room, a 40-minute recovery circuit combining sauna, cold plunge, Normatec compression, and LED light therapy.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How cold is the cold plunge at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway's cold plunge is maintained at approximately 50°F (10°C). It's designed to be challenging but tolerable, even for first-timers.",
      },
    },
    {
      "@type": "Question",
      name: "How long should I stay in the cold plunge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cold plunge portion of the Remedy Room circuit is 5 minutes. This follows 20 minutes of sauna, which primes your body for the contrast therapy benefits.",
      },
    },
    {
      "@type": "Question",
      name: "What are the benefits of cold plunge therapy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cold plunge therapy can reduce inflammation, improve circulation, boost mood and energy, support muscle recovery, and strengthen immune response. Combined with sauna in the Remedy Room, it creates a powerful contrast therapy effect.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to book the cold plunge separately?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The cold plunge is part of the Remedy Room, a guided 40-minute circuit that also includes sauna, Normatec compression, and LED light therapy. Book the Remedy Room to access all four modalities. $49 drop-in, $25 for members.",
      },
    },
  ],
};

export default function ColdPlungeLayout({ children }: { children: React.ReactNode }) {
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
