import { Metadata } from "next";
import AescapeBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "AI-Powered Aescape Massage in Denver | Sway Wellness Spa",
  description:
    "Experience Colorado’s first AI-powered robot massage with Aescape at Sway Wellness Spa. Designed for coders, designers, and tech professionals needing recovery.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/aescape",
  },
  openGraph: {
    title: "AI-Powered Aescape Massage in Denver | Sway Wellness Spa",
    description:
      "Discover Aescape at Sway Wellness Spa — the world’s first AI-powered robot massage, exclusive to Denver. Perfect for coders, engineers, and designers.",
    url: "https://swaywellnessspa.com/blog/aescape",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog22.png",
        width: 1200,
        height: 630,
        alt: "Aescape Robot Massage at Sway Wellness Spa",
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
    headline: "AI Meets Recovery: Reset with Aescape",
    description:
      "Explore Aescape at Sway Wellness Spa — the world’s first AI-powered robot massage, designed to help tech professionals recover smarter.",
    image: "https://swaywellnessspa.com/assets/blog22.png",
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
    datePublished: "2025-01-20",
    dateModified: "2025-01-20",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/aescape",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AescapeBlogLayout />
    </main>
  );
}
