import { Metadata } from "next";
import SummerPrepGuideBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Pre-Summer Skin Prep: Massage, Facials & Glow Tips | Sway Wellness",
  description:
    "Get summer-ready with lymphatic massage, microcurrent facials, and hydrating treatments from Sway Wellness Spa in Denver. Your glow-up starts here.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/summer-prep-guide",
  },
  openGraph: {
    title: "Pre-Summer Skin Prep: Massage, Facials & Glow Tips | Sway Wellness",
    description:
      "Get summer-ready with lymphatic drainage massage, microcurrent facials, hydration tips, and soothing treatments at Sway Wellness Spa in Denver.",
    url: "https://swaywellnessspa.com/blog/summer-prep-guide",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog15.jpg",
        width: 1200,
        height: 630,
        alt: "Pre-summer spa prep treatments at Sway Wellness Spa",
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
    headline: "Summer Starts with Skin: Sway’s Pre-Summer Prep Guide",
    description:
      "Discover lymphatic drainage massage, microcurrent facials, hydrating skincare, and relaxing massages to prep your skin and body for summer.",
    image: "https://swaywellnessspa.com/assets/blog15.jpg",
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
    datePublished: "2025-05-01",
    dateModified: "2025-05-01",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/summer-prep-guide",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SummerPrepGuideBlogLayout />
    </main>
  );
}
