import { Metadata } from "next";
import ValentinesDayWellnessBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Valentine's Day Wellness at Sway | Spa Dates, Self-Care & Galentines",
  description:
    "Celebrate Valentine's Day with self-love, spa dates, and Galentine’s at Sway. Explore facials, massages, and Remedy Room experiences in Denver.",
  keywords: [
    "Valentine's Day spa Denver",
    "Galentine's Day spa",
    "couples massage Denver",
    "self care Denver",
    "Remedy Room Denver",
    "Sway Wellness Spa"
  ],
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/valentines-day-wellness",
  },
  openGraph: {
    title: "Valentine's Day Wellness at Sway",
    description:
      "Celebrate Valentine's Day with spa dates, Galentine’s, and self-care at Sway Wellness Spa in Denver.",
    url: "https://swaywellnessspa.com/blog/valentines-day-wellness",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog6.png",
        width: 1200,
        height: 630,
        alt: "Valentine's Day wellness treatments at Sway",
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
    headline: "Valentine's Day Wellness at Sway",
    description:
      "Celebrate Valentine's Day with self-love, spa dates, and Galentine’s at Sway Wellness Spa in Denver.",
    image: "https://swaywellnessspa.com/assets/blog6.png",
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
    datePublished: "2025-02-01",
    dateModified: "2025-02-01",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/valentines-day-wellness",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ValentinesDayWellnessBlogLayout />
    </main>
  );
}
