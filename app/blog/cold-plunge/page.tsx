import { Metadata } from "next";
import ColdPlungeBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Why Cold Plunges Are the Hottest Wellness Trend | Sway Wellness Spa",
  description:
    "Discover the benefits of cold plunges at Sway Wellness Spa—from improved circulation and mood to faster recovery and immune support.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/cold-plunge",
  },
  openGraph: {
    title: "Why Cold Plunges Are the Hottest Wellness Trend | Sway Wellness Spa",
    description:
      "Explore how cold plunge therapy boosts recovery, reduces stress, improves immunity, and enhances wellness at Sway’s Remedy Room in Denver.",
    url: "https://swaywellnessspa.com/blog/cold-plunge",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog7.png",
        width: 1200,
        height: 630,
        alt: "Cold Plunge Remedy Room at Sway Wellness Spa",
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
    headline: "Cold Plunges: The Hot New Trend in Wellness",
    description:
      "Cold plunge therapy at Sway boosts circulation, sleep, mood, and immunity. Discover why it’s the ultimate recovery tool this winter.",
    image: "https://swaywellnessspa.com/assets/blog7.png",
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
      "@id": "https://swaywellnessspa.com/blog/cold-plunge",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColdPlungeBlogLayout />
    </main>
  );
}
