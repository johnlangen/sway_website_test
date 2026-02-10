import { Metadata } from "next";
import PostSummerSkinRecoveryBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Post-Summer Skin Recovery | Sway Wellness Spa",
  description:
    "Repair sun damage with Sway's post-summer facial treatments. Hydrating facials, LED therapy, and expert skincare to restore your glow.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/post-summer-skin-recovery",
  },
  openGraph: {
    title: "Post-Summer Skin Recovery | Sway Wellness Spa",
    description:
      "Undo sun damage and refresh your skin with Sway's post-summer facials, LED therapy, and hydrating treatments tailored for healthy, glowing skin.",
    url: "https://swaywellnessspa.com/blog/post-summer-skin-recovery",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog20.jpg",
        width: 1200,
        height: 630,
        alt: "Post-Summer Skin Recovery at Sway Wellness Spa",
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
    headline: "Repair & Refresh: Post-Summer Skin Recovery Starts Now",
    description:
      "After sun, chlorine, and sweat take a toll, restore your glow with Sway's facials, LED therapy, and oxygen boosts. Expert post-summer skincare in Denver.",
    image: "https://swaywellnessspa.com/assets/blog20.jpg",
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
    datePublished: "2025-09-15",
    dateModified: "2025-09-15",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/post-summer-skin-recovery",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostSummerSkinRecoveryBlogLayout />
    </main>
  );
}
