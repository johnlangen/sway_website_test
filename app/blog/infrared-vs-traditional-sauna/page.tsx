import { Metadata } from "next";
import SaunaComparisonBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Infrared vs. Traditional Sauna | Sway Wellness Spa",
  description:
    "Discover the difference between traditional and infrared saunas. Learn why Sway’s traditional sauna offers deeper detox and timeless relaxation.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/infrared-vs-traditional-sauna",
  },
  openGraph: {
    title: "Infrared vs. Traditional Sauna | Sway Wellness Spa",
    description:
      "Compare infrared and traditional saunas. See why Sway’s traditional sauna provides deeper detox, stress relief, and recovery benefits.",
    url: "https://swaywellnessspa.com/blog/infrared-vs-traditional-sauna",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog8.png",
        width: 1200,
        height: 630,
        alt: "Traditional Sauna at Sway Wellness Spa",
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
    headline:
      "Infrared Sauna vs. Traditional Sauna: The Boom of Saunas in the U.S.",
    description:
      "Learn the difference between infrared and traditional saunas and why Sway’s traditional sauna remains the gold standard for detox and relaxation.",
    image: "https://swaywellnessspa.com/assets/blog8.png",
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
    datePublished: "2025-03-10",
    dateModified: "2025-03-10",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/infrared-vs-traditional-sauna",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SaunaComparisonBlogLayout />
    </main>
  );
}
