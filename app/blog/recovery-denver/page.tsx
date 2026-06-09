import { Metadata } from "next";
import RecoveryDenverBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Recovery in Denver: Sauna, Cold Plunge & Robot Massage | Sway",
  description:
    "A complete guide to recovery in Denver: traditional sauna, cold plunge, compression therapy, LED, and Aescape AI robot massage, all in the Remedy Room at Sway Wellness Spa on Larimer Square.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/recovery-denver/",
  },
  openGraph: {
    title: "Recovery in Denver: Sauna, Cold Plunge & Robot Massage | Sway",
    description:
      "Sauna, cold plunge, compression therapy, LED, and AI-powered Aescape robot massage. Denver's complete recovery circuit at Sway Wellness Spa.",
    url: "https://swaywellnessspa.com/blog/recovery-denver/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog7.jpg",
        width: 1200,
        height: 630,
        alt: "Recovery circuit at Sway Wellness Spa in Denver",
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
      "Recovery in Denver: Sauna, Cold Plunge, Compression & Robot Massage",
    description:
      "A complete guide to science-backed recovery in Denver: traditional sauna, cold plunge, compression therapy, LED light therapy, and Aescape AI robot massage in the Remedy Room at Sway Wellness Spa.",
    image: "https://swaywellnessspa.com/assets/blog7.jpg",
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
    datePublished: "2026-06-09",
    dateModified: "2026-06-09",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/recovery-denver/",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where can I do sauna and cold plunge in Denver?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sway Wellness Spa on Larimer Square in downtown Denver offers a traditional sauna and cold plunge together as part of the Remedy Room, a guided 40-minute recovery circuit that also includes compression therapy and LED light therapy. Member access is $25 per session and drop-in is $49.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Remedy Room at Sway?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Remedy Room is Sway's guided 40-minute recovery circuit in Denver. It combines four modalities in one space: traditional sauna, cold plunge, compression therapy, and LED light therapy. It is designed to deliver a complete hot-cold contrast cycle in a single visit.",
        },
      },
      {
        "@type": "Question",
        name: "Does Denver have a robot massage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Sway Wellness Spa was the first in Denver to offer Aescape, a fully autonomous AI-powered robot massage. Aescape maps the body with more than a million data points and delivers customizable pressure, with sessions available in 15, 30, 45, or 60-minute lengths.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best order for a recovery session?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A simple, effective routine is to warm up in the traditional sauna, alternate sauna and cold plunge for a few contrast rounds, then finish with compression therapy and LED light therapy. On training days, add an Aescape robot massage or a therapeutic massage.",
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
      <RecoveryDenverBlogLayout />
    </main>
  );
}
