import { Metadata } from "next";
import Massage80MinBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Why an 80-Minute Massage at Sway Wellness Spa Is Worth It",
  description:
    "Relax fully with an 80-minute massage at Sway Wellness Spa in Denver. Extra time, specialty techniques, and total rejuvenation. Your body will thank you.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/80-minute-massage",
  },
  openGraph: {
    title: "Why an 80-Minute Massage at Sway Wellness Spa Is Worth It",
    description:
      "Discover why an 80-minute massage at Sway Wellness Spa provides the ultimate reset — extra time, personalized techniques, and deeper rejuvenation.",
    url: "https://swaywellnessspa.com/blog/80-minute-massage",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog25.jpg",
        width: 1200,
        height: 630,
        alt: "80-Minute Massage at Sway Wellness Spa",
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
    headline: "Why an 80-Minute Massage at Sway Wellness Spa Is Worth It",
    description:
      "Discover why upgrading to an 80-minute massage at Sway Wellness Spa is the ultimate reset — with specialty techniques and deeper rejuvenation.",
    image: "https://swaywellnessspa.com/assets/blog25.jpg",
    author: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
    },
    publisher: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
      logo: {
        "@type": "ImageObject",
        url: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
      },
    },
    datePublished: "2025-01-10",
    dateModified: "2025-01-10",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/80-minute-massage",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Massage80MinBlogLayout />
    </main>
  );
}
