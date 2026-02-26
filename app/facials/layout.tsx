import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facial Treatments | Anti-Aging, Hydration & Acne | Sway Wellness Spa",
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
        text: "Sway offers six facial experiences: Basic Facial, Forever Young (anti-aging), Glow Getter (brightening), Pore Perfection (deep pore cleansing), Sensitive Silk (calming), and Dr. Dennis Gross Vitamin C (clinical-grade brightening).",
      },
    },
    {
      "@type": "Question",
      name: "What high-tech boosts can I add to my facial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose from six boosts: LED Light Therapy, Microcurrent, Hydraderm, Dermaflash, Chemical Peel, or Oxygen Infusion. Members save 50% on all boosts.",
      },
    },
    {
      "@type": "Question",
      name: "How long is a facial session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All facial sessions at Sway are 50 minutes. Your esthetician customizes the treatment based on your skin type, concerns, and goals.",
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
    </>
  );
}
