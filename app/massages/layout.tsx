import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Massage Therapy in Denver | Sway Wellness Spa",
  description:
    "Explore massage therapy at Sway, a modern wellness club in Denver. Choose from Deep Tissue, Sports, Salt Stone, and Lymphatic Drainage across Essential, Premier, and Ultimate tiers, all customized by expert therapists.",
  alternates: {
    canonical: "https://swaywellnessspa.com/massages/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/massages",
    title: "Massage Therapy | Sway Wellness Spa",
    description:
      "Discover expert-led massage experiences designed to relax, recover, and restore balance.",
    images: [
      {
        url: "/assets/OG/og-massages.jpg",
        width: 1200,
        height: 630,
        alt: "Massage experiences at Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Massage Therapy | Sway Wellness Spa",
    description:
      "Explore massage experiences including Deep Tissue, Sports, Salt Stone, and more at Sway Wellness Spa.",
    images: ["/assets/OG/og-massages.jpg"],
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
      name: "Massages",
      item: "https://swaywellnessspa.com/massages",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes Sway's massages different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway's massage therapists combine traditional hands-on techniques with modern wellness technology. You can add science-backed boosts like CauseMedic CBD, cupping, and PEMF at Boost and Boost Plus tiers. After your session, the Remedy Room (sauna, cold plunge, Normatec compression) and results-driven facials with Eminence Organics are all available under one roof.",
      },
    },
    {
      "@type": "Question",
      name: "What types of massage does Sway offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway offers massages across three tiers: Essential (Signature Massage, 50 min), Premier (Deep Tissue, Salt Stone, Sports, Lymphatic Drainage — 50–70 min), and Ultimate (Signature 90 min, Deep Tissue 70 min, Salt Stone 70 min, Sports 70 min, Lymphatic Drainage 70 min). All fully customized by your therapist.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add anything to my massage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway offers add-on boosts at three tiers: Boost ($20), Boost Plus ($40), and Boost Pro ($50). Options include CauseMedic CBD, Cupping, and PEMF. Members save 50% on all boosts.",
      },
    },
    {
      "@type": "Question",
      name: "How long is a massage session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Essential massages are 50 minutes. Premier massages range from 50 to 70 minutes. Ultimate massages range from 70 to 90 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a membership to book a massage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, anyone can book a massage at Sway. Drop-in pricing starts at $139. Members pay as low as $99 per session and save 50% on boosts. Memberships start at $99/month.",
      },
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Massage Therapy at Sway Wellness Spa",
  description:
    "Expert-led massage therapy at Sway Wellness Spa in Denver. Choose from Essential (Signature Massage), Premier (Deep Tissue, Salt Stone, Sports, Lymphatic Drainage), and Ultimate (extended sessions up to 90 min) — fully customized by your therapist. Add boosts like CauseMedic CBD, cupping, and PEMF.",
  provider: {
    "@type": "HealthAndBeautyBusiness",
    name: "Sway Wellness Spa",
    url: "https://swaywellnessspa.com",
  },
  areaServed: { "@type": "City", name: "Denver" },
  serviceType: "Massage Therapy",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Massage Services",
    itemListElement: [
      // Essential tier
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Essential Signature Massage",
          description: "A 50-minute relaxation massage focusing on full-body tension relief.",
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
          name: "Deep Tissue Massage",
          description: "A 50-minute deep tissue massage targeting chronic tension and muscle knots.",
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
          name: "Salt Stone Massage",
          description: "A 50-minute Himalayan salt stone massage for deep relaxation and mineral-rich detox.",
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
          name: "Sports Massage",
          description: "A 50-minute sports massage designed for active recovery and athletic performance.",
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
          name: "Lymphatic Drainage Massage",
          description: "A 50-minute lymphatic drainage massage to reduce swelling and support detoxification.",
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
          name: "Signature 90-Minute Massage",
          description: "A 90-minute extended signature massage for full-body relaxation and recovery.",
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
          name: "Deep Tissue 70-Minute Massage",
          description: "A 70-minute deep tissue massage for extended chronic tension and muscle recovery.",
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
          name: "Salt Stone 70-Minute Massage",
          description: "A 70-minute Himalayan salt stone massage for deeper relaxation and mineral-rich detox.",
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
          name: "Sports 70-Minute Massage",
          description: "A 70-minute sports massage for extended active recovery and athletic performance.",
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
          name: "Lymphatic Drainage 70-Minute Massage",
          description: "A 70-minute lymphatic drainage massage for extended detoxification and recovery.",
        },
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: "159.00", priceCurrency: "USD", name: "Member" },
          { "@type": "UnitPriceSpecification", price: "199.00", priceCurrency: "USD", name: "Drop-In" },
        ],
      },
    ],
  },
};

export default function MassagesLayout({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
