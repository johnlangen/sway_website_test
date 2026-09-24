import { Metadata } from "next";
import InfraredPemfMatBlogLayout from "./Article";

export const metadata: Metadata = {
  // absolute: the root layout template would otherwise append a second
  // "| Sway Wellness Spa" to the SERP title.
  title: { absolute: "PEMF Mat Benefits: What It Does, Does It Work + When to Use" },
  description:
    "What is a PEMF mat and does it really work? The benefits, what the research actually shows, when to use one, and who should skip it. Try one with a massage in Denver.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/infrared-pemf-mat/",
  },
  openGraph: {
    title: "PEMF Mat Benefits: What It Does, Does It Work + When to Use",
    description:
      "What does a PEMF mat do? Infrared heat and PEMF ease pain, improve circulation, and speed recovery, paired with massage at Sway Wellness Spa in Denver.",
    url: "https://swaywellnessspa.com/blog/infrared-pemf-mat/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/pemf.jpg",
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
    headline: "PEMF Mat Benefits: What It Does, Whether It Works & When to Use It",
    description:
      "What does a PEMF mat do? How infrared heat and pulsed electromagnetic fields ease pain, calm inflammation, and speed muscle recovery, paired with massage at Sway in Denver.",
    image: "https://swaywellnessspa.com/assets/pemf.jpg",
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
    dateModified: "2026-09-24",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/infrared-pemf-mat/",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InfraredPemfMatBlogLayout />
    </div>
  );
}
