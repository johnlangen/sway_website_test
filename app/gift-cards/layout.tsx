// app/gift-cards/layout.tsx
import type { Metadata } from "next";
import { giftFaqJsonLd, giftFaqs } from "@/lib/giftCards/faq";

export const metadata: Metadata = {
  title: { absolute: "Spa Gift Cards | Buy Wellness Gifts Online at Sway Wellness Spa" },
  description:
    "Give the gift of wellness. Purchase a Sway Wellness Spa gift card online for massages, facials, and Remedy Room experiences.",
  alternates: {
    canonical: "https://swaywellnessspa.com/gift-cards/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Spa Gift Cards | Sway Wellness Spa",
    description:
      "Give the ultimate gift of relaxation. Buy Sway Wellness Spa gift cards online for massages, facials, and Remedy Room treatments.",
    url: "https://swaywellnessspa.com/gift-cards/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "/assets/OG/og-gift-cards.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Spa Gift Cards",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// The questions shown on the page (GiftFaq in page.tsx), so the data matches what a visitor reads
const faqJsonLd = giftFaqJsonLd(giftFaqs());

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Gift Cards", item: "https://swaywellnessspa.com/gift-cards/" },
  ],
};

export default function GiftCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
