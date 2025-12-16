import { Metadata } from "next";
import ScienceOfRelaxationBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "How Spa Treatments Reduce Stress & Anxiety | Sway Wellness Spa",
  description:
    "Explore the science of relaxation with Sway’s spa treatments. Learn how massage, cold plunge, and sauna reduce stress, anxiety, and improve sleep.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/science-of-relaxation",
  },
  openGraph: {
    title: "How Spa Treatments Reduce Stress & Anxiety | Sway Wellness Spa",
    description:
      "Discover how massage, sauna, cold plunge, and facials backed by science help reduce stress, regulate the nervous system, and improve overall wellness.",
    url: "https://swaywellnessspa.com/blog/science-of-relaxation",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog11.png",
        width: 1200,
        height: 630,
        alt: "A flow chart to test if Sway can help reduce your stress",
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
    headline: "Science of Relaxation: How Spa Treatments Ease Stress & Anxiety",
    description:
      "Stress relief backed by science — massage, cold plunge, sauna, and mindful facials proven to reduce cortisol, improve sleep, and restore balance.",
    image: "https://swaywellnessspa.com/assets/blog11.png",
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
    datePublished: "2025-09-20",
    dateModified: "2025-09-20",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/science-of-relaxation",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScienceOfRelaxationBlogLayout />
    </main>
  );
}
