import { Metadata } from "next";
import SwaySpaMembershipBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Sway Spa Membership: Your 2025 Wellness Transformation | Sway Wellness Spa",
  description:
    "Make 2025 your healthiest year yet with a Sway Spa membership. Enjoy monthly facials or massages, exclusive perks, and wellness that fits your lifestyle.",
  keywords: [
    "Sway Spa membership",
    "Denver spa membership",
    "wellness transformation 2025",
    "monthly facials Denver",
    "massage membership Denver",
    "Sway Wellness Spa"
  ],
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/sway-spa-membership",
  },
  openGraph: {
    title: "Sway Spa Membership: Your 2025 Wellness Transformation",
    description:
      "Commit to wellness this year with Sway’s $99/month membership—monthly facials or massages, member perks, and a healthier you.",
    url: "https://swaywellnessspa.com/blog/sway-spa-membership",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog2.png",
        width: 1200,
        height: 630,
        alt: "Sway Spa Membership wellness experience",
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
    headline: "Sway Spa Membership: Your 2025 Wellness Transformation",
    description:
      "Make 2025 your healthiest year yet with a Sway Spa membership. Monthly facials or massages, exclusive perks, and consistent wellness.",
    image: "https://swaywellnessspa.com/assets/blog2.png",
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
    datePublished: "2025-01-02",
    dateModified: "2025-01-02",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/sway-spa-membership",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SwaySpaMembershipBlogLayout />
    </main>
  );
}
