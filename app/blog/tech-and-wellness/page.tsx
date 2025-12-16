import { Metadata } from "next";
import TechAndWellnessBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "How Technological Innovation is Transforming Spa Treatments | Sway Wellness",
  description:
    "Explore how Aescape robot massage, microcurrent therapy, and LED light technology are revolutionizing wellness. Discover the future of spa treatments at Sway.",
  keywords: [
    "tech spa treatments",
    "robot massage Denver",
    "Aescape robot spa",
    "LED light therapy Denver",
    "microcurrent facials Denver",
    "Sway Wellness Spa"
  ],
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/tech-and-wellness",
  },
  openGraph: {
    title: "How Technological Innovation is Transforming Spa Treatments",
    description:
      "From Aescape robotic massage to LED light therapy, discover how technology is redefining wellness at Sway Wellness Spa.",
    url: "https://swaywellnessspa.com/blog/tech-and-wellness",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog10.png",
        width: 1200,
        height: 630,
        alt: "Aescape robot massage technology",
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
    headline: "How Technological Innovation is Transforming Spa Treatments",
    description:
      "Explore how Aescape robot massage, microcurrent therapy, and LED light technology are revolutionizing wellness. Discover the future of spa treatments at Sway.",
    image: "https://swaywellnessspa.com/assets/blog10.png",
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
      "@id": "https://swaywellnessspa.com/blog/tech-and-wellness",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TechAndWellnessBlogLayout />
    </main>
  );
}
