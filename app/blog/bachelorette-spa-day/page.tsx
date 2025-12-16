import { Metadata } from "next";
import BacheloretteSpaDayBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "The Ultimate Bachelorette Spa Day in Denver | Sway Wellness Spa",
  description:
    "Plan a luxurious bachelorette spa day at Sway Wellness Spa. Enjoy massages, facials, cold plunge, sauna & private bookings for your bridal crew.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/bachelorette-spa-day",
  },
  openGraph: {
    title: "The Ultimate Bachelorette Spa Day in Denver | Sway Wellness Spa",
    description:
      "Celebrate your bridal crew with a private spa day at Sway Wellness Spa. Custom treatments, sauna, cold plunge & unforgettable memories for brides-to-be.",
    url: "https://swaywellnessspa.com/blog/bachelorette-spa-day",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog14.png",
        width: 1200,
        height: 630,
        alt: "Bachelorette Spa Day at Sway Wellness Spa Denver",
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
      "The Ultimate Bachelorette Spa Day: Relax, Celebrate, Repeat!",
    description:
      "Plan a luxurious bachelorette spa day at Sway Wellness Spa. Massages, facials, sauna, cold plunge, and private spa bookings for bridal groups in Denver.",
    image: "https://swaywellnessspa.com/assets/blog14.png",
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
    datePublished: "2025-03-20",
    dateModified: "2025-03-20",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/bachelorette-spa-day",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BacheloretteSpaDayBlogLayout />
    </main>
  );
}
