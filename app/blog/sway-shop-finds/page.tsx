import { Metadata } from "next";
import SwayShopFindsBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Best Wellness Products at The Sway Shop in Larimer Square | Sway Wellness Spa",
  description:
    "Explore top skincare, fragrance, and luxury wellness products at the Sway Shop. Featuring Eminence, DedCool, Dr. Dennis Gross & more.",
  keywords: [
    "Sway Shop Denver",
    "wellness products Larimer Square",
    "Eminence skincare Denver",
    "DedCool fragrances",
    "Dr. Dennis Gross products",
    "luxury spa retail",
    "best spa shop Denver"
  ],
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/sway-shop-finds",
  },
  openGraph: {
    title: "Best Wellness Products at The Sway Shop in Larimer Square",
    description:
      "From Eminence skincare to DedCool fragrances, discover luxury wellness products curated at Sway Shop in Denver.",
    url: "https://swaywellnessspa.com/blog/sway-shop-finds",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog19.png",
        width: 1200,
        height: 630,
        alt: "Best products at the Sway Shop in Larimer Square",
      },
    ],
    locale: "en_US",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Best Wellness Products at The Sway Shop in Larimer Square",
    description:
      "Explore top skincare, fragrance, and luxury wellness products at the Sway Shop. Featuring Eminence, DedCool, Dr. Dennis Gross & more.",
    image: "https://swaywellnessspa.com/assets/blog19.png",
    author: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
    },
    publisher: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
      logo: {
        "@type": "ImageObject",
        url: "https://swaywellnessspa.com/assets/homepage_photo_outside.png",
      },
    },
    datePublished: "2025-06-10",
    dateModified: "2025-06-10",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/sway-shop-finds",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SwayShopFindsBlogLayout />
    </main>
  );
}
