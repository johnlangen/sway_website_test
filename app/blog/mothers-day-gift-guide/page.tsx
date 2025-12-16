import { Metadata } from "next";
import MothersDayGiftGuideLayout from "./layout";

export const metadata: Metadata = {
  title: "Mother’s Day Spa Gift Guide | Sway Wellness Spa",
  description:
    "Celebrate Mom with the perfect spa gift. Explore Sway’s Mother’s Day gift cards, memberships, and self-care experiences for the wellness she deserves.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/mothers-day-gift-guide",
  },
  openGraph: {
    title: "Mother’s Day Spa Gift Guide | Sway Wellness Spa",
    description:
      "Find the perfect gift for Mom at Sway Wellness Spa. Explore gift cards, memberships, and spa day packages designed for ultimate relaxation and self-care.",
    url: "https://swaywellnessspa.com/blog/mothers-day-gift-guide",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog16.png",
        width: 1200,
        height: 630,
        alt: "Mother’s Day Spa Gift Guide at Sway",
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
    headline: "Moms Deserve Sway More: A Mother’s Day Spa Day Gift Guide",
    description:
      "This Mother’s Day, treat Mom to the gift of wellness. Explore Sway Wellness Spa gift cards, memberships, and relaxing spa treatments designed for self-care.",
    image: "https://swaywellnessspa.com/assets/blog16.png",
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
    datePublished: "2025-05-05",
    dateModified: "2025-05-05",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/mothers-day-gift-guide",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MothersDayGiftGuideLayout />
    </main>
  );
}
