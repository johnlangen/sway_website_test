import { Metadata } from "next";
import DateNightDenverLayout from "./layout";

export const metadata: Metadata = {
  title:
    "Best Date Night Ideas in Denver | Sway Wellness Spa",
  description:
    "The best date night ideas in Denver: spa treatments at Sway on Larimer Square, romantic restaurants, rooftop bars, live jazz, Meow Wolf, and more.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/best-date-night-ideas-denver/",
  },
  openGraph: {
    title: "Best Date Night Ideas in Denver",
    description:
      "The best date night ideas in Denver: spa treatments at Sway, Larimer Square dining, rooftop bars, live jazz, and more.",
    url: "https://swaywellnessspa.com/blog/best-date-night-ideas-denver/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog40.jpg/",
        width: 1200,
        height: 630,
        alt: "Best date night ideas in Denver — Sway Wellness Spa on Larimer Square",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Date Night Ideas in Denver",
    description:
      "The best date night ideas in Denver: spa treatments at Sway, Larimer Square dining, rooftop bars, live jazz, Meow Wolf, and more.",
    images: ["https://swaywellnessspa.com/assets/blog40.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Best Date Night Ideas in Denver",
    description:
      "The best date night ideas in Denver: spa treatments at Sway Wellness Spa on Larimer Square, romantic restaurants, rooftop bars, live jazz, and outdoor experiences.",
    image: "https://swaywellnessspa.com/assets/blog40.jpg",
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
        url: "https://swaywellnessspa.com/assets/blog40.jpg/",
      },
    },
    datePublished: "2026-03-19",
    dateModified: "2026-03-19",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        "https://swaywellnessspa.com/blog/best-date-night-ideas-denver",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DateNightDenverLayout />
    </main>
  );
}
