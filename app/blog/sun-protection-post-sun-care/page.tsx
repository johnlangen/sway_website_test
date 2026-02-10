import { Metadata } from "next";
import SunProtectionBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "The Ultimate Guide to Sun Protection & Post-Sun Skin Care | Sway Wellness Spa",
  description:
    "Learn how to protect and restore your skin with SPF and post-sun care tips from Sway Wellness Spa. Featuring Supergoop and Eminence Organics.",
  keywords: [
    "sun protection tips",
    "best sunscreen Denver spa",
    "post-sun skin care",
    "Eminence Organics SPF",
    "Supergoop Unseen Sunscreen",
    "after-sun facial recovery",
    "Sway Wellness Spa Denver"
  ],
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/sun-protection-post-sun-care",
  },
  openGraph: {
    title: "The Ultimate Guide to Sun Protection & Post-Sun Skin Care",
    description:
      "Sway Wellness Spa’s estheticians share SPF essentials and post-sun care routines featuring Supergoop and Eminence Organics.",
    url: "https://swaywellnessspa.com/blog/sun-protection-post-sun-care",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog18.jpg",
        width: 1200,
        height: 630,
        alt: "Sun Protection Essentials from Sway Wellness Spa",
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
    headline: "The Ultimate Guide to Sun Protection & Post-Sun Skin Care",
    description:
      "Protect your skin year-round with SPF and post-sun care routines featuring Supergoop and Eminence Organics. Learn expert tips from Sway Wellness Spa.",
    image: "https://swaywellnessspa.com/assets/blog18.jpg",
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
    datePublished: "2025-06-01",
    dateModified: "2025-06-01",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/sun-protection-post-sun-care",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SunProtectionBlogLayout />
    </main>
  );
}
