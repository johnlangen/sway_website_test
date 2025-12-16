import { Metadata } from "next";
import SpringResetBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Spring Detox Treatments for Skin & Body | Sway Wellness Spa",
  description:
    "Refresh your skin and body this spring with detoxifying spa treatments from Sway. Featuring sauna, cold plunge, lymphatic massage, and more.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/spring-reset",
  },
  openGraph: {
    title: "Spring Detox Treatments for Skin & Body | Sway Wellness Spa",
    description:
      "Rejuvenate with Sway’s spring reset spa therapies: sauna, cold plunge, lymphatic massage, and facials that detoxify, refresh, and energize your body.",
    url: "https://swaywellnessspa.com/blog/spring-reset",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog15.png",
        width: 1200,
        height: 630,
        alt: "Spring spa detox and reset treatments at Sway Wellness Spa",
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
    headline: "Spring Reset: Detox Your Skin & Body with Sway",
    description:
      "Refresh your skin and body this spring with detoxifying spa treatments including sauna, cold plunge, lymphatic massage, and pore-clearing facials.",
    image: "https://swaywellnessspa.com/assets/blog15.png",
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
    datePublished: "2025-03-15",
    dateModified: "2025-03-15",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/spring-reset",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpringResetBlogLayout />
    </main>
  );
}
