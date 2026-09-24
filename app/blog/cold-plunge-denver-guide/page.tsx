import { Metadata } from "next";
import ColdPlungeDenverLayout from "./Article";

export const metadata: Metadata = {
  // absolute: the root layout template would otherwise append a second
  // "| Sway Wellness Spa" to the SERP title.
  title: { absolute: "Best Cold Plunge in Denver: 9 Spots + Sauna Combos (2026)" },
  description:
    "Where to cold plunge in Denver: 9 spots with prices and temps, from sauna + plunge circuits on Larimer Square and in RiNo to free snowmelt in Golden.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/cold-plunge-denver-guide/",
  },
  openGraph: {
    title: "Best Cold Plunge in Denver: 9 Spots + Sauna Combos (2026)",
    description:
      "Every great place to cold plunge in Denver: guided contrast circuits at Sway, recovery studios around the city, and natural mountain plunges.",
    url: "https://swaywellnessspa.com/blog/cold-plunge-denver-guide/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/coldplunge.jpg",
        width: 1200,
        height: 630,
        alt: "Cold plunge tubs at Sway Wellness in Denver",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Cold Plunge in Denver: 9 Spots + Sauna Combos (2026)",
    description:
      "Every great place to cold plunge in Denver: guided contrast circuits at Sway, recovery studios around the city, and natural mountain plunges.",
    images: ["https://swaywellnessspa.com/assets/coldplunge.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Best Cold Plunge in Denver: 9 Spots + Sauna Combos (2026)",
    description:
      "A complete guide to cold plunging in Denver: guided contrast circuits at Sway Wellness on Larimer Square, the Remedy Lounge plunges in RiNo and Central Park, recovery studios around the city, and natural mountain plunges.",
    image: "https://swaywellnessspa.com/assets/coldplunge.jpg",
    author: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
      url: "https://swaywellnessspa.com",
      logo: "https://swaywellnessspa.com/assets/swaylogo3.png",
    },
    publisher: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
      logo: {
        "@type": "ImageObject",
        url: "https://swaywellnessspa.com/assets/swaylogo3.png",
      },
    },
    datePublished: "2026-09-01",
    dateModified: "2026-09-24",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/cold-plunge-denver-guide/",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColdPlungeDenverLayout />
    </div>
  );
}
