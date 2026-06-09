import { Metadata } from "next";
import InfraredPemfMatBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "PEMF Mat Benefits: How Infrared Heat Speeds Recovery | Sway",
  description:
    "What does a PEMF mat do? See how infrared heat and pulsed electromagnetic fields ease pain, calm inflammation, and speed muscle recovery, paired with massage at Sway in Denver.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/infrared-pemf-mat/",
  },
  openGraph: {
    title: "PEMF Mat Benefits: How Infrared Heat Speeds Recovery | Sway",
    description:
      "What does a PEMF mat do? Infrared heat and PEMF ease pain, improve circulation, and speed recovery, paired with massage at Sway Wellness Spa in Denver.",
    url: "https://swaywellnessspa.com/blog/infrared-pemf-mat/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog12.jpg",
        width: 1200,
        height: 630,
        alt: "Infrared PEMF Mat at Sway Wellness Spa",
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
    headline: "Supercharge Your Massage: The Benefits of Infrared PEMF Mats",
    description:
      "At Sway Wellness Spa, the Infrared PEMF Mat enhances massage therapy by reducing inflammation, relieving pain, and accelerating recovery.",
    image: "https://swaywellnessspa.com/assets/blog12.jpg",
    author: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
      url: "https://swaywellnessspa.com",
      logo: "https://swaywellnessspa.com/assets/swaylogo3.png",
    },
    publisher: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
      logo: {
        "@type": "ImageObject",
        url: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
      },
    },
    datePublished: "2025-03-05",
    dateModified: "2025-03-05",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/infrared-pemf-mat/",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InfraredPemfMatBlogLayout />
    </main>
  );
}
