import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treatments | Massage, Facials, Recovery & Aescape at Sway",
  description:
    "6 massages, 6 facials, Remedy Room recovery circuit, and Aescape AI robot massage — plus 10+ boost add-ons. Member pricing from $99. Sway Wellness Spa, Denver.",
  alternates: {
    canonical: "https://swaywellnessspa.com/treatments",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/treatments",
    title: "Treatments | Massage, Facials, Recovery & Aescape at Sway",
    description:
      "6 massages, 6 facials, Remedy Room recovery, and Aescape AI robot massage. 10+ boosts. Member pricing from $99 at Sway in Denver.",
    images: [
      {
        url: "/assets/OG/og-treatments.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Treatments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Treatments | Massage, Facials, Recovery & Aescape at Sway",
    description:
      "6 massages, 6 facials, Remedy Room recovery, and Aescape AI robot massage at Sway Wellness Spa in Denver.",
    images: ["/assets/OG/og-treatments.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function TreatmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        name: "Treatments",
        item: "https://swaywellnessspa.com/treatments",
      },
    ],
  };

  const offerCatalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Sway Wellness Spa Treatments",
    url: "https://swaywellnessspa.com/treatments",
    description:
      "All treatment categories at Sway Wellness Spa: massage therapy, facial treatments, Remedy Room recovery, and Aescape AI-powered robot massage.",
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Massage Therapy",
        description:
          "6 massage experiences: Deep Tissue, Sports, CBD, Himalayan Salt Stone, Lymphatic Drainage, and Relaxation. 50 or 80 minutes.",
        url: "https://swaywellnessspa.com/massages",
        numberOfItems: 6,
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Massage Therapy",
              provider: {
                "@type": "DaySpa",
                name: "Sway Wellness Spa",
              },
            },
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                price: "99.00",
                priceCurrency: "USD",
                name: "Member",
              },
              {
                "@type": "UnitPriceSpecification",
                price: "139.00",
                priceCurrency: "USD",
                name: "Drop-In",
              },
            ],
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Facial Treatments",
        description:
          "6 facials: Forever Young, Glow Getter, Pore Perfection, Vitamin C, Sensitive Silk, and Express. Powered by Eminence Organics and Dr. Dennis Gross.",
        url: "https://swaywellnessspa.com/facials",
        numberOfItems: 6,
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Facial Treatment",
              provider: {
                "@type": "DaySpa",
                name: "Sway Wellness Spa",
              },
            },
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                price: "99.00",
                priceCurrency: "USD",
                name: "Member",
              },
              {
                "@type": "UnitPriceSpecification",
                price: "139.00",
                priceCurrency: "USD",
                name: "Drop-In",
              },
            ],
          },
        ],
      },
      {
        "@type": "Offer",
        name: "Remedy Room Recovery Circuit",
        description:
          "A guided 40-minute recovery circuit combining sauna, cold plunge, Normatec compression therapy, and LED light therapy.",
        url: "https://swaywellnessspa.com/remedy-tech",
        itemOffered: {
          "@type": "Service",
          name: "Remedy Room",
          provider: {
            "@type": "DaySpa",
            name: "Sway Wellness Spa",
          },
        },
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
      {
        "@type": "Offer",
        name: "Aescape AI Robot Massage",
        description:
          "AI-powered autonomous robot massage with real-time 3D body mapping and personalized pressure zones. 15, 30, or 60 minutes.",
        url: "https://swaywellnessspa.com/aescape",
        itemOffered: {
          "@type": "Service",
          name: "Aescape Robot Massage",
          provider: {
            "@type": "DaySpa",
            name: "Sway Wellness Spa",
          },
        },
        price: "49.00",
        priceCurrency: "USD",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What treatments does Sway Wellness Spa offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sway offers four treatment categories: 6 massage types (Deep Tissue, Sports, CBD, Himalayan Salt Stone, Lymphatic Drainage, Relaxation), 6 facial treatments (Forever Young, Glow Getter, Pore Perfection, Vitamin C, Sensitive Silk, Express), the Remedy Room recovery circuit (sauna, cold plunge, Normatec compression, LED light therapy), and Aescape AI-powered robot massage. Plus 10+ boost add-ons.",
        },
      },
      {
        "@type": "Question",
        name: "How long are treatments at Sway?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Massages and facials are 50 minutes each, with the option to extend to 80 minutes. The Remedy Room is a guided 40-minute circuit. Aescape robot massage sessions run 15, 30, or 60 minutes.",
        },
      },
      {
        "@type": "Question",
        name: "How much do treatments cost at Sway?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Members pay $99 for massages and facials (regularly $139), $25 for the Remedy Room (regularly $49), and Aescape starts at $49. Memberships are $99/month and include 50% off boosts and recovery sessions.",
        },
      },
      {
        "@type": "Question",
        name: "Can I combine treatments or add boosts at Sway?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many guests pair a massage or facial with a Remedy Room session for a complete experience. You can also add 10+ boost options like LED light therapy, microcurrent, cupping, infrared PEMF mat, oxygen infusion, chemical peel, and more. Members save 50% on all boosts.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(offerCatalogJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
