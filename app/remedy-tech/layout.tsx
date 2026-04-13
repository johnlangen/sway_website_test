import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Remedy Room | Sauna & Cold Plunge at Sway",
  description:
    "Sauna, cold plunge, compression therapy, and LED light therapy in one 40-minute recovery session. Experience the Remedy Room at Sway, a modern wellness club in Denver.",
  alternates: {
    canonical: "https://swaywellnessspa.com/remedy-tech/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/remedy-tech/",
    title: "Sauna, Cold Plunge & Recovery | The Remedy Room at Sway Wellness Spa",
    description:
      "Sauna, cold plunge, compression therapy, and LED light therapy in one 40-minute recovery session at Sway Wellness Spa.",
    images: [
      {
        url: "/assets/OG/og-remedy-room.jpg",
        width: 1200,
        height: 630,
        alt: "Remedy Room recovery experience at Sway Wellness Spa"
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sauna, Cold Plunge & Recovery | The Remedy Room at Sway Wellness Spa",
    description:
      "Sauna, cold plunge, compression therapy, and LED light therapy in one recovery session at Sway Wellness Spa.",
    images: ["/assets/OG/og-remedy-room.jpg"],
  },
  robots: { index: true, follow: true },
};

// Breadcrumb JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Remedy Room", item: "https://swaywellnessspa.com/remedy-tech" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Remedy Room?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Remedy Room is a guided 40-minute recovery circuit at Sway that combines four modalities: sauna, cold plunge, Normatec compression therapy, and LED light therapy.",
      },
    },
    {
      "@type": "Question",
      name: "Who is the Remedy Room for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anyone. Athletes use it for post-workout recovery. Remote workers use it to reset after long days. No experience needed, no special clothing required.",
      },
    },
    {
      "@type": "Question",
      name: "What's included in a Remedy Room session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every session follows a guided circuit: 15 minutes of Normatec compression therapy with LED light therapy, 20 minutes of sauna, and 5 minutes of cold plunge. Total time is 40 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Can I combine the Remedy Room with a massage or facial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, many Sway members pair a Remedy Room session with a massage or facial for a complete wellness experience. Recovery before a massage can help your muscles release tension more effectively.",
      },
    },
    {
      "@type": "Question",
      name: "How much does the Remedy Room cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Remedy Room is $49 per session for drop-in guests and $25 for Sway members. Memberships start at $99/month.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How the Remedy Room Recovery Circuit Works",
  description:
    "A step-by-step guide to the Remedy Room at Sway Wellness Spa — a guided 40-minute recovery circuit combining 4 modalities: Normatec compression, LED light therapy, sauna, and cold plunge.",
  totalTime: "PT40M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "25",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Check In and Get Set Up",
      text: "Arrive at Sway Wellness Spa on Larimer Square. Check in at the front desk and your guide will walk you through the circuit. No special clothing or experience required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Normatec Compression Therapy (15 Minutes)",
      text: "Start with 15 minutes of Normatec compression therapy. Pneumatic leg sleeves use sequential pulse technology to boost circulation, reduce muscle soreness, and support lymphatic drainage.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "LED Light Therapy (During Compression)",
      text: "While in the Normatec compression sleeves, you also receive LED light therapy. Medical-grade LED panels emit red and near-infrared wavelengths to support skin health, cellular repair, and recovery.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Sauna (20 Minutes)",
      text: "Move into the sauna for 20 minutes. Heat therapy promotes detoxification, relaxation, pain relief, and improved circulation.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Cold Plunge (5 Minutes)",
      text: "Finish with a 5-minute cold plunge. Cold water immersion elevates energy, improves mood, reduces inflammation, relieves muscle soreness, and supports immune function.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Recover and Continue Your Visit",
      text: "After completing the circuit, relax in the lounge. Many guests pair the Remedy Room with a 50-minute massage or facial for a complete wellness experience. Members enjoy the private lounge with robes, snacks, and lockers.",
    },
  ],
  tool: [
    { "@type": "HowToTool", name: "Normatec Compression Boots" },
    { "@type": "HowToTool", name: "Medical-Grade LED Light Panels" },
    { "@type": "HowToTool", name: "Sauna" },
    { "@type": "HowToTool", name: "Cold Plunge Pool" },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Remedy Room Recovery Circuit at Sway Wellness Spa",
  description:
    "A guided 40-minute recovery circuit combining 4 evidence-based modalities: sauna (20 min), cold plunge (5 min), Normatec compression therapy (15 min), and LED light therapy. Available at Sway Wellness Spa in Denver.",
  provider: {
    "@type": "HealthAndBeautyBusiness",
    name: "Sway Wellness Spa",
    url: "https://swaywellnessspa.com",
  },
  areaServed: { "@type": "City", name: "Denver" },
  serviceType: "Recovery Therapy",
  offers: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Remedy Room Recovery Circuit",
      description:
        "40-minute guided circuit: 15 min Normatec compression + LED light therapy, 20 min sauna, 5 min cold plunge.",
    },
    price: "49.00",
    priceCurrency: "USD",
    priceSpecification: [
      {
        "@type": "UnitPriceSpecification",
        price: "25.00",
        priceCurrency: "USD",
        name: "Member",
      },
      {
        "@type": "UnitPriceSpecification",
        price: "49.00",
        priceCurrency: "USD",
        name: "Drop-In",
      },
    ],
  },
};

export default function RemedyRoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
