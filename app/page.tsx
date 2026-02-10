import { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Sway Wellness Spa | Modern Wellness Experiences",
  description:
    "Sway Wellness Spa is a modern wellness club offering massage therapy, facials, sauna, cold plunge, and AI-powered Aescape massage. Now open on Larimer Square in Denver. Book online today.",
  openGraph: {
    title: "Sway Wellness Spa | Modern Wellness Experiences",
    description:
      "A modern wellness club offering massage therapy, facials, sauna, cold plunge, and AI-powered Aescape massage. Now open on Larimer Square in Denver.",
    url: "https://swaywellnessspa.com/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Sway Wellness Spa",
    image: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
    "@id": "https://swaywellnessspa.com/",
    url: "https://swaywellnessspa.com/",
    telephone: "+1-303-476-6150",

    // IMPORTANT:
    // Keep headquarters address here for trust.
    // Future locations get their own Location schema on location pages.
    address: {
      "@type": "PostalAddress",
      streetAddress: "1428 Larimer St.",
      addressLocality: "Denver",
      addressRegion: "CO",
      postalCode: "80202",
      addressCountry: "US",
    },

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "18:00",
      },
    ],

    sameAs: [
      "https://www.instagram.com/swaywellnessclub/",
      "https://www.facebook.com/swaywellnessspa",
    ],

    termsOfService: "https://swaywellnessspa.com/terms-and-conditions",

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "111",
      bestRating: "5",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </main>
  );
}
