import { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Sway Wellness Spa | Modern Wellness Experiences",
  description:
    "Sway Wellness Spa is a modern wellness spa and club offering massage therapy, facials, sauna and cold plunge recovery, and the AI-powered Aescape massage experience. Designed for consistent care and modern recovery.",
  openGraph: {
    title: "Sway Wellness Spa | Modern Wellness Experiences",
    description:
      "Discover Sway Wellness Spa — a modern wellness spa and club offering massage therapy, facials, recovery rituals, and the AI-powered Aescape massage experience.",
    url: "https://swaywellnessspa.com/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/homepage_photo_outside.png",
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
    image: "https://swaywellnessspa.com/assets/homepage_photo_outside.png",
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
