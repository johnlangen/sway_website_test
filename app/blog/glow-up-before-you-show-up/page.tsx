import { Metadata } from "next";
import GlowUpBeforeYouShowUpLayout from "./layout";

export const metadata: Metadata = {
  title: "Glow Up Before You Show Up: Spa Treatments for Students",
  description:
    "Recharge, refocus, and reset with facials, massages, and student-friendly spa treatments at Sway Wellness Spa. Special offers with student ID!",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/glow-up-before-you-show-up",
  },
  openGraph: {
    title: "Glow Up Before You Show Up: Spa Treatments for Students",
    description:
      "Discover facials, massages, Remedy Room therapies, and student-exclusive offers at Sway Wellness Spa. Recharge, refocus, and thrive.",
    url: "https://swaywellnessspa.com/blog/glow-up-before-you-show-up",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog21.png",
        width: 1200,
        height: 630,
        alt: "Glow Up Before You Show Up Spa Treatments",
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
    headline: "Glow Up Before You Show Up: Spa for Students",
    description:
      "Recharge and reset with student-friendly spa treatments at Sway Wellness Spa. Explore massages, facials, Remedy Room therapies, and exclusive student offers.",
    image: "https://swaywellnessspa.com/assets/blog21.png",
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
    datePublished: "2025-02-15",
    dateModified: "2025-02-15",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/glow-up-before-you-show-up",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GlowUpBeforeYouShowUpLayout />
    </main>
  );
}
