import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facial Treatments in Denver | Sway Wellness Spa",
  description:
    "Explore advanced facial treatments at Sway, a modern wellness club in Denver. Anti-aging, hydration, acne, and Vitamin C facials with high-tech boosts like LED and microcurrent.",
  alternates: {
    canonical: "https://swaywellnessspa.com/facials",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/facials",
    title: "Facial Treatments | Sway Wellness Spa",
    description:
      "Science-backed facials using cutting-edge skincare and technology. Anti-aging, hydration, acne, and Vitamin C treatments.",
    images: [
      {
        url: "/assets/OG/og-facials.jpg",
        width: 1200,
        height: 630,
        alt: "Facial Treatments at Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facial Treatments | Sway Wellness Spa",
    description:
      "Explore advanced facials at Sway, including anti-aging, hydration, acne, sensitive skin, and Vitamin C treatments.",
    images: ["/assets/OG/og-facials.jpg"],
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Facials", item: "https://swaywellnessspa.com/facials" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes Sway's facials different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway pairs clean, organic Eminence Organics skincare with clinical-grade Dr. Dennis Gross protocols, then layers on science-backed boosts like LED light therapy for acne, microcurrent for lifting and toning, and oxygen infusion for deep hydration. Every session is customized by your esthetician.",
      },
    },
    {
      "@type": "Question",
      name: "What types of facials does Sway offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway offers facials across three tiers: Essential (Signature Facial), Premier (Forever Young, Glow Getter, Pore Perfection, Sensitive Silk), and Ultimate (Illuminate LED, Oxygen Infusion, Sculpt & Lift Microcurrent, Hydraderm, Dr. Dennis Gross Vitamin C w/ LED).",
      },
    },
    {
      "@type": "Question",
      name: "What high-tech boosts can I add to my facial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway offers three boost tiers: Boost ($20), Boost Plus ($40), and Boost Pro ($50). Members save 50% on all boosts.",
      },
    },
    {
      "@type": "Question",
      name: "How long is a facial session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Essential and Premier facials are 50 minutes. Ultimate facials are 60 minutes. Your esthetician customizes the treatment based on your skin type, concerns, and goals.",
      },
    },
    {
      "@type": "Question",
      name: "What skincare brands does Sway use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway uses Eminence Organics, a leader in organic, results-driven skincare, and Dr. Dennis Gross, known for clinical-grade formulas including the Alpha Beta peel.",
      },
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Facial Treatments at Sway Wellness Spa",
  description:
    "Advanced facial treatments at Sway Wellness Spa in Denver using Eminence Organics and Dr. Dennis Gross protocols. Choose from Essential (Signature Facial), Premier (Forever Young, Glow Getter, Pore Perfection, Sensitive Silk), and Ultimate (Illuminate LED, Oxygen Infusion, Sculpt & Lift Microcurrent, Hydraderm, Dr. Dennis Gross Vitamin C w/ LED) facials. Add boosts at three tiers.",
  provider: {
    "@type": "HealthAndBeautyBusiness",
    name: "Sway Wellness Spa",
    url: "https://swaywellnessspa.com",
  },
  areaServed: { "@type": "City", name: "Denver" },
  serviceType: "Facial Treatment",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Facial Services",
    itemListElement: [
      // Essential tier
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Essential Signature Facial",
          description: "A 50-minute customized facial for a quick refresh and glow.",
        },
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: "99.00", priceCurrency: "USD", name: "Member" },
          { "@type": "UnitPriceSpecification", price: "139.00", priceCurrency: "USD", name: "Drop-In" },
        ],
      },
      // Premier tier
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Forever Young Facial",
          description: "A 50-minute anti-aging facial with advanced techniques for skin rejuvenation using Eminence Organics.",
        },
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: "129.00", priceCurrency: "USD", name: "Member" },
          { "@type": "UnitPriceSpecification", price: "169.00", priceCurrency: "USD", name: "Drop-In" },
        ],
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Glow Getter Facial",
          description: "A 50-minute brightening facial for luminous, even-toned skin.",
        },
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: "129.00", priceCurrency: "USD", name: "Member" },
          { "@type": "UnitPriceSpecification", price: "169.00", priceCurrency: "USD", name: "Drop-In" },
        ],
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pore Perfection Facial",
          description: "A 50-minute deep pore cleansing facial for clearer, refined skin.",
        },
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: "129.00", priceCurrency: "USD", name: "Member" },
          { "@type": "UnitPriceSpecification", price: "169.00", priceCurrency: "USD", name: "Drop-In" },
        ],
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sensitive Silk Facial",
          description: "A 50-minute calming facial for sensitive and reactive skin types.",
        },
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: "129.00", priceCurrency: "USD", name: "Member" },
          { "@type": "UnitPriceSpecification", price: "169.00", priceCurrency: "USD", name: "Drop-In" },
        ],
      },
      // Ultimate tier
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Illuminate LED Facial",
          description: "A 60-minute facial with LED light therapy for enhanced skin rejuvenation.",
        },
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: "159.00", priceCurrency: "USD", name: "Member" },
          { "@type": "UnitPriceSpecification", price: "199.00", priceCurrency: "USD", name: "Drop-In" },
        ],
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Oxygen Infusion Facial",
          description: "A 60-minute facial with oxygen infusion for deep hydration and radiance.",
        },
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: "159.00", priceCurrency: "USD", name: "Member" },
          { "@type": "UnitPriceSpecification", price: "199.00", priceCurrency: "USD", name: "Drop-In" },
        ],
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sculpt & Lift Microcurrent Facial",
          description: "A 60-minute facial with microcurrent technology for lifting and toning.",
        },
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: "159.00", priceCurrency: "USD", name: "Member" },
          { "@type": "UnitPriceSpecification", price: "199.00", priceCurrency: "USD", name: "Drop-In" },
        ],
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hydraderm Facial",
          description: "A 60-minute advanced hydration facial for plump, dewy skin.",
        },
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: "159.00", priceCurrency: "USD", name: "Member" },
          { "@type": "UnitPriceSpecification", price: "199.00", priceCurrency: "USD", name: "Drop-In" },
        ],
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dr. Dennis Gross Vitamin C w/ LED Facial",
          description: "A 60-minute clinical-grade brightening facial using Dr. Dennis Gross Alpha Beta peel technology with LED light therapy.",
        },
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: "159.00", priceCurrency: "USD", name: "Member" },
          { "@type": "UnitPriceSpecification", price: "199.00", priceCurrency: "USD", name: "Drop-In" },
        ],
      },
    ],
  },
};

export default function FacialsLayout({ children }: { children: React.ReactNode }) {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
