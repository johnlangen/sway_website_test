import { Metadata } from "next";
import TrainLikeAnAthleteBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Train Like an Athlete, Recover Like an Athlete | Sway Wellness Spa",
  description:
    "Discover how strategic recovery—like sports massage, cold plunge, and LED therapy—helps you train smarter and feel your best at Sway Wellness Spa in Denver.",
  keywords: [
    "athlete recovery Denver",
    "sports massage Denver",
    "cold plunge spa",
    "LED light therapy Denver",
    "Remedy Room Denver",
    "Sway Wellness Spa"
  ],
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/train-like-an-athlete",
  },
  openGraph: {
    title: "Train Like an Athlete, Recover Like an Athlete",
    description:
      "Explore how advanced recovery methods like sports massage, sauna, cold plunge, and LED light therapy boost performance and reduce soreness.",
    url: "https://swaywellnessspa.com/blog/train-like-an-athlete",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog20.png",
        width: 1200,
        height: 630,
        alt: "Athlete recovery treatments at Sway",
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
    headline: "Train Like an Athlete, Recover Like an Athlete",
    description:
      "Discover how strategic recovery—like sports massage, cold plunge, and LED therapy—helps you train smarter and feel your best at Sway Wellness Spa in Denver.",
    image: "https://swaywellnessspa.com/assets/blog20.png",
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
      "@id": "https://swaywellnessspa.com/blog/train-like-an-athlete",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrainLikeAnAthleteBlogLayout />
    </main>
  );
}
