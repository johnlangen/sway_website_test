import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sauna, Cold Plunge & Recovery | The Remedy Room at Sway Wellness Spa",
  description:
    "Sauna, cold plunge, compression therapy, and LED light therapy in one 40-minute recovery session. Experience the Remedy Room at Sway, a modern wellness club in Denver.",
  alternates: {
    canonical: "https://swaywellnessspa.com/remedy-tech",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/remedy-tech",
    title: "Sauna, Cold Plunge & Recovery | The Remedy Room at Sway Wellness Spa",
    description:
      "Sauna, cold plunge, compression therapy, and LED light therapy in one 40-minute recovery session at Sway Wellness Spa.",
    images: [
      {
        url: "/assets/OG/og-remedy-room.jpg",
        width: 1200,
        height: 630,
        alt: "Remedy Room recovery experience at Sway Wellness Spa"
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sauna, Cold Plunge & Recovery | The Remedy Room at Sway Wellness Spa",
    description:
      "Sauna, cold plunge, compression therapy, and LED light therapy in one recovery session at Sway Wellness Spa.",
    images: ["/assets/OG/og-remedy-room.jpg"],
  },
  robots: { index: true, follow: true },
};

// Breadcrumb JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Remedy Room", item: "https://swaywellnessspa.com/remedy-tech" },
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
        text: "The Remedy Room is a guided 40-minute recovery circuit at Sway that combines four modalities: infrared sauna, cold plunge, Normatec compression therapy, and LED light therapy.",
      },
    },
    {
      "@type": "Question",
      name: "Who is the Remedy Room for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anyone. Athletes use it for post-workout recovery. Remote workers use it to reset after long days. No experience needed, no special clothing required.",
      },
    },
    {
      "@type": "Question",
      name: "What's included in a Remedy Room session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every session follows a guided circuit: 15 minutes of Normatec compression therapy with LED light therapy, 20 minutes of infrared sauna, and 5 minutes of cold plunge. Total time is 40 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Can I combine the Remedy Room with a massage or facial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — many Sway members pair a Remedy Room session with a massage or facial for a complete wellness experience. Recovery before a massage can help your muscles release tension more effectively.",
      },
    },
    {
      "@type": "Question",
      name: "How much does the Remedy Room cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Remedy Room is $49 per session for drop-in guests and $25 for Sway members. Memberships start at $99/month.",
      },
    },
  ],
};

export default function RemedyRoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
