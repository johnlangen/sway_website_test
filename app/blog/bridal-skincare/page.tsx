import { Metadata } from "next";
import BridalSkincareBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Bridal Skincare: Wedding-Ready Facials at Sway Wellness Spa",
  description:
    "Get glowing, photo-ready skin for your big day with customized bridal facials at Sway. Explore treatments, timelines, and skincare tips for brides.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/bridal-skincare",
  },
  openGraph: {
    title: "Bridal Skincare: Wedding-Ready Facials at Sway Wellness Spa",
    description:
      "Discover bridal skincare facials in Denver. From Forever Young to Glow Getter facials, Sway helps brides achieve radiant, wedding-ready skin.",
    url: "https://swaywellnessspa.com/blog/bridal-skincare",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog3.jpg",
        width: 1200,
        height: 630,
        alt: "Bridal Skincare at Sway Wellness Spa Denver",
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
    headline: "Bridal Skincare: Get Wedding-Ready Skin with Sway Facials",
    description:
      "Bridal facials at Sway Wellness Spa prepare your skin for the big day. Explore treatment timelines, membership perks, and esthetician-backed skincare tips.",
    image: "https://swaywellnessspa.com/assets/blog3.jpg",
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
    datePublished: "2025-03-20",
    dateModified: "2025-03-20",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/bridal-skincare",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BridalSkincareBlogLayout />
    </main>
  );
}
