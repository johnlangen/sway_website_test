import { Metadata } from "next";
import AllergySeasonSkincareBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Allergy Season Skincare in Denver | Sway Wellness Spa",
  description:
    "Soothe sensitive skin during allergy season with facials, LED light therapy, and lymphatic drainage at Sway Wellness Spa in Denver.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/allergy-season-skincare",
  },
  openGraph: {
    title: "Allergy Season Skincare in Denver | Sway Wellness Spa",
    description:
      "Discover facials, LED light therapy, and lymphatic drainage treatments to calm and protect your skin during allergy season at Sway Wellness Spa in Denver.",
    url: "https://swaywellnessspa.com/blog/allergy-season-skincare",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/allergy.png",
        width: 1200,
        height: 630,
        alt: "Allergy Season Skincare at Sway Wellness Spa",
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
    headline: "Allergy Season? Best Treatments to Soothe Sensitive Skin",
    description:
      "Soothe sensitive skin during allergy season with facials, LED light therapy, and lymphatic drainage at Sway Wellness Spa in Denver.",
    image: "https://swaywellnessspa.com/assets/allergy.png",
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
      "@id": "https://swaywellnessspa.com/blog/allergy-season-skincare",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AllergySeasonSkincareBlogLayout />
    </main>
  );
}
