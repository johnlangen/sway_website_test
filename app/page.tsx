import { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title:
    "Sway Wellness Spa | #4 Best Day Spa in America",
  description:
    "Voted #4 Best Day Spa in America by USA Today 10Best. Sway Wellness Spa is a modern wellness club in Denver offering massage therapy, facials, sauna, cold plunge, and AI-powered Aescape massage on Larimer Square. Book online today.",
  alternates: {
    canonical: "https://swaywellnessspa.com/",
  },
  openGraph: {
    title:
      "Sway Wellness Spa | #4 Best Day Spa in America",
    description:
      "Voted #4 Best Day Spa in America by USA Today 10Best. A modern wellness club offering massage therapy, facials, sauna, cold plunge, and AI-powered Aescape massage on Larimer Square in Denver.",
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
      "https://www.tiktok.com/@swaywellnessclub",
    ],

    termsOfService: "https://swaywellnessspa.com/terms-and-conditions",

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "111",
      bestRating: "5",
    },

    award: [
      "USA Today 10Best: #4 Best Day Spa in the U.S. (2025)",
      "TZR 2026 Readers' Choice Awards: Best U.S. Day Spa",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the Remedy Room?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Remedy Room is a guided 40-minute recovery circuit combining infrared sauna, cold plunge, Normatec compression therapy, and LED light therapy. It's $49 per session or $25 for members.",
        },
      },
      {
        "@type": "Question",
        name: "What is Aescape?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aescape is an AI-powered robot massage that uses body mapping and dual robotic arms to deliver personalized pressure. You control pressure, target zones, and ambience in real time. Sessions run 15–60 minutes.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer memberships?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Memberships start at $99/month and include massages and facials at $99 each (regularly $139), 50% off all boosts and Remedy Room sessions, plus private lounge access and rollover credits.",
        },
      },
      {
        "@type": "Question",
        name: "What should I book for a first visit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most guests start with a 50-minute facial or massage. If you want recovery-focused benefits, the Remedy Room pairs well. Many members do both in one visit.",
        },
      },
      {
        "@type": "Question",
        name: "How do I book at Sway Wellness Spa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Book online anytime at swaywellnessspa.com or call (303) 476-6150. We recommend booking ahead during evenings and weekends.",
        },
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomeContent />
    </main>
  );
}
