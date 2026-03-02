import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treatments | Sway Wellness Spa",
  description:
    "Explore treatments at Sway, a modern wellness club in Denver. Facials, massages, Remedy Room recovery, and Aescape robot massage. Designed to restore body and mind.",
  alternates: {
    canonical: "https://swaywellnessspa.com/treatments",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/treatments",
    title: "Treatments | Sway Wellness Spa",
    description:
      "Facials, massages, Remedy Room recovery, and Aescape robot massage. Explore treatments designed for total wellness.",
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
    title: "Treatments | Sway Wellness Spa",
    description:
      "Explore Sway treatments including facials, massages, Remedy Room recovery, and Aescape robot massage.",
    images: ["/assets/OG/og-treatments.jpg"],
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
      name: "Treatments",
      item: "https://swaywellnessspa.com/treatments",
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
        text: "Sway offers four treatment categories: massage therapy (Deep Tissue, Sports, CBD, Salt Stone, Lymphatic), advanced facials (Forever Young, Glow Getter, Pore Perfection, Vitamin C), the Remedy Room recovery circuit (sauna, cold plunge, Normatec compression, LED light therapy), and Aescape AI-powered robot massage.",
      },
    },
    {
      "@type": "Question",
      name: "How long are treatments at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Massages and facials are 50 minutes each, with the option to extend to 80 minutes. The Remedy Room is a 40-minute guided circuit. Aescape robot massage sessions run 15 to 60 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Can I combine treatments at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many guests pair a massage or facial with a Remedy Room session for a complete wellness experience. You can also add boosts like LED light therapy, microcurrent, cupping, or infrared PEMF to any treatment.",
      },
    },
    {
      "@type": "Question",
      name: "How much do treatments cost at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Massages and facials start at $129 ($99 for members). The Remedy Room is $49 ($25 for members). Aescape starts at $49. Members save on every visit with monthly pricing from $99/month.",
      },
    },
  ],
};

export default function TreatmentsLayout({
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
    </>
  );
}
