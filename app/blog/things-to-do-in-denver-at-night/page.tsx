import { Metadata } from "next";
import ThingsToDoAtNightLayout from "./layout";

export const metadata: Metadata = {
  title:
    "Best Things to Do in Denver at Night | Sway Wellness Spa",
  description:
    "14 of the best things to do in Denver at night — from Larimer Square dining and Red Rocks concerts to rooftop bars, Meow Wolf, and evening spa treatments at Sway.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/things-to-do-in-denver-at-night/",
  },
  openGraph: {
    title: "Best Things to Do in Denver at Night",
    description:
      "14 of the best things to do in Denver at night — Larimer Square dining, Red Rocks concerts, rooftop bars, Meow Wolf, and evening spa treatments at Sway.",
    url: "https://swaywellnessspa.com/blog/things-to-do-in-denver-at-night",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/background.png",
        width: 1200,
        height: 630,
        alt: "Best things to do in Denver at night — Larimer Square and downtown Denver",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Things to Do in Denver at Night",
    description:
      "14 of the best things to do in Denver at night — Larimer Square, Red Rocks, rooftop bars, Meow Wolf, and evening spa at Sway Wellness Spa.",
    images: ["https://swaywellnessspa.com/assets/background.png"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Best Things to Do in Denver at Night",
    description:
      "14 of the best things to do in Denver at night — from Larimer Square dining and Red Rocks concerts to rooftop bars, Meow Wolf, and evening spa treatments at Sway Wellness Spa.",
    image: "https://swaywellnessspa.com/assets/background.png",
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
    datePublished: "2026-03-01",
    dateModified: "2026-03-01",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        "https://swaywellnessspa.com/blog/things-to-do-in-denver-at-night",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ThingsToDoAtNightLayout />
    </main>
  );
}
