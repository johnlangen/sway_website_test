import { Metadata } from "next";
import GiveWellnessBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Give Wellness, Get Wellness: Sway Spa Referral Program",
  description:
    "Refer your friends to Sway Wellness Spa and earn free Boosts. Enjoy LED therapy, PEMF mats, and more—because wellness is better when shared.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/give-wellness-get-wellness",
  },
  openGraph: {
    title: "Give Wellness, Get Wellness: Sway Spa Referral Program",
    description:
      "Refer a friend to Sway Wellness Spa and both of you earn a free Boost. Share the love of self-care with facials, massages, PEMF mats, and LED therapy.",
    url: "https://swaywellnessspa.com/blog/give-wellness-get-wellness",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog19.png",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Referral Program",
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
    headline: "Give Wellness, Get Wellness: Your Kind of Referral Program",
    description:
      "Join the Sway Wellness Spa referral program: earn free Boosts like LED therapy, PEMF mats, or cupping when you share wellness with friends and family.",
    image: "https://swaywellnessspa.com/assets/blog19.png",
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
    datePublished: "2025-02-01",
    dateModified: "2025-02-01",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/give-wellness-get-wellness",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GiveWellnessBlogLayout />
    </main>
  );
}
