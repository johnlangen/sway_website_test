import { Metadata } from "next";
import FathersDayGiftGuideLayout from "./layout";

export const metadata: Metadata = {
  title: "Father's Day Spa Gift Guide | Sway Wellness Spa Denver",
  description:
    "Skip the tie. A real Father's Day gift guide for Denver dads: cold plunge, sauna, deep tissue, Aescape AI massage, and a full Sway-anchored itinerary on Larimer Square.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/fathers-day-gift-guide/",
  },
  openGraph: {
    title: "Father's Day Spa Gift Guide | Sway Wellness Spa Denver",
    description:
      "He has enough ties. A Denver Father's Day guide: cold plunge, sauna, massage, and a Sway-anchored itinerary on Larimer Square.",
    url: "https://swaywellnessspa.com/blog/fathers-day-gift-guide/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/cold_plunge.jpg",
        width: 1200,
        height: 630,
        alt: "Father's Day Spa Gift Guide at Sway Wellness Spa Denver",
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
    headline:
      "Father's Day Gift Guide: The Best Spa & Recovery Gifts for Dad in Denver",
    description:
      "From cold plunge and sauna to deep tissue massage and Aescape AI, here are the best Father's Day gifts for Dad at Sway Wellness Spa in Denver.",
    image: "https://swaywellnessspa.com/assets/cold_plunge.jpg",
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
    datePublished: "2026-05-20",
    dateModified: "2026-05-20",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/fathers-day-gift-guide/",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FathersDayGiftGuideLayout />
    </div>
  );
}
