import { Metadata } from "next";
import MavenHotelBlogLayout from "./layout";

export const metadata: Metadata = {
  title:
    "Maven Hotel + Sway: AI-Powered Massage Near Dairy Block Denver | Sway Blog",
  description:
    "Staying at The Maven Hotel in Denver? Book a 60-minute Aescape robot massage at Sway Wellness Spa on Larimer Square — just 0.6 miles from Dairy Block.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/maven-hotel-denver-spa",
  },
  keywords: [
    "Maven Hotel spa",
    "Maven Hotel Denver massage",
    "Dairy Block spa",
    "Dairy Block wellness",
    "Larimer Square massage",
    "Aescape robot massage Denver",
    "things to do near Maven Hotel",
    "Denver hotel spa",
    "Sway Wellness Spa",
  ],
  openGraph: {
    title: "Maven Hotel + Sway: AI-Powered Massage Near Dairy Block Denver",
    description:
      "Book a 60-minute Aescape robot massage at Sway Wellness Spa — a short trip from The Maven Hotel at Dairy Block in Denver.",
    url: "https://swaywellnessspa.com/blog/maven-hotel-denver-spa",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/maven-hotel.jpg",
        width: 1200,
        height: 630,
        alt: "The Maven Hotel at Dairy Block, Denver — partner of Sway Wellness Spa",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maven Hotel + Sway: AI-Powered Massage Near Dairy Block",
    description:
      "60-minute Aescape robot massage at Sway, minutes from The Maven Hotel in Denver.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline:
      "The Maven Hotel + Sway: AI-Powered Massage Steps from Dairy Block",
    description:
      "A guide for Maven Hotel guests and Dairy Block visitors looking for a spa experience on Larimer Square. Book a 60-minute Aescape robot massage at Sway Wellness Spa in Denver.",
    image: "https://swaywellnessspa.com/assets/maven-hotel.jpg",
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
    datePublished: "2026-03-11",
    dateModified: "2026-03-11",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/maven-hotel-denver-spa",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MavenHotelBlogLayout />
    </main>
  );
}
