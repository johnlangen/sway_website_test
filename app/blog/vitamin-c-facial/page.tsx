import { Metadata } from "next";
import VitaminCFacialBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Vitamin C Facial in Denver | Brighten Winter Skin at Sway Spa",
  description:
    "Combat winter dullness with Sway’s Dr. Dennis Vitamin C Facial in Denver. Brighten, hydrate, and protect your skin with expert-led, science-backed care.",
  keywords: [
    "Vitamin C facial Denver",
    "brightening facial Denver",
    "Dr. Dennis Gross Skincare",
    "winter skincare Denver",
    "anti-aging facial Denver",
    "Sway Wellness Spa"
  ],
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/vitamin-c-facial",
  },
  openGraph: {
    title: "Vitamin C Facial in Denver | Brighten Winter Skin at Sway Spa",
    description:
      "Restore your glow this winter with the Dr. Dennis Vitamin C Facial at Sway. Brighten, hydrate, and protect your skin with science-backed skincare.",
    url: "https://swaywellnessspa.com/blog/vitamin-c-facial",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog4.png",
        width: 1200,
        height: 630,
        alt: "Vitamin C Facial at Sway Spa",
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
    headline: "Vitamin C Facial in Denver | Brighten Winter Skin at Sway Spa",
    description:
      "Combat winter dullness with Sway’s Dr. Dennis Vitamin C Facial in Denver. Brighten, hydrate, and protect your skin with expert-led, science-backed care.",
    image: "https://swaywellnessspa.com/assets/blog4.png",
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
    datePublished: "2025-01-10",
    dateModified: "2025-01-10",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/vitamin-c-facial",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VitaminCFacialBlogLayout />
    </main>
  );
}
