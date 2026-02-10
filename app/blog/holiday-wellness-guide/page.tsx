import { Metadata } from "next";
import HolidayWellnessGuideLayout from "./layout";

export const metadata: Metadata = {
  title: "Holiday Wellness Gift Guide | Sway Wellness Spa",
  description:
    "Discover Sway’s Holiday Wellness Gift Guide—thoughtful spa experiences, modern self-care, and restorative gifts designed to elevate the season.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/holiday-wellness-guide",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Holiday Wellness Gift Guide",
    description:
      "A modern holiday wellness gift guide featuring restorative spa experiences and thoughtful self-care at Sway Wellness Spa.",
    image: "https://swaywellnessspa.com/assets/blog26.jpg",
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/holiday-wellness-guide",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HolidayWellnessGuideLayout />
    </main>
  );
}
