import { Metadata } from "next";
import HimalayanSaltStoneMassageLayout from "./layout";

export const metadata: Metadata = {
  title: "Himalayan Salt Stone Massage | Deep Relaxation at Sway Wellness Spa",
  description:
    "Experience the healing warmth of our Himalayan Salt Stone Massage. Relieve stress, improve circulation, and detox naturally at Sway Wellness Spa.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/himalayan-salt-stone-massage",
  },
  openGraph: {
    title: "Himalayan Salt Stone Massage | Deep Relaxation at Sway Wellness Spa",
    description:
      "Discover the ultimate Himalayan Salt Stone Massage at Sway Wellness Spa. Relieve stress, boost circulation, and absorb healing minerals naturally.",
    url: "https://swaywellnessspa.com/blog/himalayan-salt-stone-massage",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog5.jpg",
        width: 1200,
        height: 630,
        alt: "Himalayan Salt Stone Massage at Sway Spa",
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
    headline: "Himalayan Salt Stone Massage: Ultimate Relaxation at Sway Spa",
    description:
      "Soothe stress, improve circulation, and absorb healing minerals with the Himalayan Salt Stone Massage at Sway Wellness Spa.",
    image: "https://swaywellnessspa.com/assets/blog5.jpg",
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
    datePublished: "2025-02-20",
    dateModified: "2025-02-20",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/himalayan-salt-stone-massage",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HimalayanSaltStoneMassageLayout />
    </main>
  );
}
