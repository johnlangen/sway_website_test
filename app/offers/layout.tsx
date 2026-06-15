// app/offers/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa Offers & Deals | Sway Wellness Spa",
  description:
    "Explore current spa offers and promotions at Sway Wellness Spa. Offers vary by location — select your spa to view available deals.",
  alternates: {
    canonical: "https://swaywellnessspa.com/offers/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/offers/",
    title: "Spa Offers & Deals | Sway Wellness Spa",
    description:
      "Explore current spa offers and promotions at Sway Wellness Spa. Offers vary by location.",
    images: [
      {
        url: "/assets/OG/og-offers.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Offers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spa Offers & Deals | Sway Wellness Spa",
    description:
      "Explore current spa offers and promotions at Sway Wellness Spa. Offers vary by location.",
    images: ["/assets/OG/og-offers.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
            name: "Offers",
            item: "https://swaywellnessspa.com/offers/",
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Sway Wellness Spa Offers",
        url: "https://swaywellnessspa.com/offers/",
        description:
          "Current spa offers and promotions at Sway Wellness Spa. Offers vary by location.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does Sway have a first-time visitor offer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. New local guests at Sway Denver can use code FTVO40 for $40 off a first massage, facial, or 60-minute Aescape robot massage at any tier (Mon-Fri, locals only). Or use code FTVORR for a $25 first Remedy Room visit (any day, locals only, regularly $49). No membership required.",
            },
          },
          {
            "@type": "Question",
            name: "What spa deals does Sway currently offer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sway regularly offers promotions for new guests, seasonal specials, and location-specific deals. Visit swaywellnessspa.com/offers or select your location to see current promotions.",
            },
          },
          {
            "@type": "Question",
            name: "Can I combine Sway offers with a membership?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Intro offers are designed for non-members. Once you join the Sway club ($99/month), you unlock ongoing member pricing: $99 massages and facials, 50% off boosts, and $25 Remedy Room sessions.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
