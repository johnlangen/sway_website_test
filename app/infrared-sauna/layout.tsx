import { Metadata } from "next";

// Clubs-only page. Infrared cabins exist at RiNo and Central Park ONLY.
// Larimer's sauna is traditional (CLAUDE.md content rule): never add Larimer
// to this page, its schema, or its copy. Larimer's sauna lives at /sauna/.

export const metadata: Metadata = {
  title: { absolute: "Infrared Sauna in Denver: RiNo + Central Park | Sway" },
  description:
    "Private infrared sauna cabins at Sway RiNo and Sway Central Park, paired with a traditional sauna, cold plunge, PEMF mats, and compression therapy in one 75-minute Remedy Lounge session. $49 drop-in.",
  alternates: {
    canonical: "https://swaywellnessspa.com/infrared-sauna/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/infrared-sauna/",
    title: "Infrared Sauna in Denver: RiNo + Central Park | Sway",
    description:
      "Infrared sauna cabins plus a traditional sauna, cold plunge, PEMF, and compression in one 75-minute session at Sway's Denver clubs.",
    images: [
      {
        url: "/assets/rino2.jpeg",
        width: 1093,
        height: 1438,
        alt: "Sauna at Sway Wellness Spa RiNo in Denver",
      },
    ],
    siteName: "Sway Wellness Spa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Infrared Sauna in Denver: RiNo + Central Park | Sway",
    description:
      "Infrared cabins, traditional sauna, cold plunge, PEMF, and compression. One 75-minute session.",
    images: ["/assets/rino2.jpeg"],
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Infrared Sauna", item: "https://swaywellnessspa.com/infrared-sauna/" },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Infrared Sauna",
  name: "Infrared sauna in the Sway Remedy Lounge",
  description:
    "Reserved infrared sauna cabin windows inside a 75-minute Remedy Lounge session that also includes a traditional sauna, cold plunge, PEMF mats, compression therapy, and lounge access.",
  areaServed: [
    { "@type": "City", name: "Denver" },
    { "@type": "City", name: "Aurora" },
  ],
  provider: [
    { "@id": "https://swaywellnessspa.com/locations/denver-rino/" },
    { "@id": "https://swaywellnessspa.com/locations/denver-central-park/" },
  ],
  offers: {
    "@type": "Offer",
    price: "49",
    priceCurrency: "USD",
    description: "75-minute Remedy Lounge session, drop-in",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where can I get an infrared sauna session in Denver?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway has infrared sauna cabins at two Denver-area clubs: Sway RiNo at 3636 Blake St in the RiNo Art District, and Sway Central Park at 2271 Clinton St in Aurora, next to Denver's Central Park neighborhood. Infrared is part of every 75-minute Remedy Lounge session.",
      },
    },
    {
      "@type": "Question",
      name: "How much is an infrared sauna session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 75-minute Remedy Lounge session is $49 as a drop-in and includes the infrared cabins, traditional sauna, cold plunge, PEMF mats, and compression therapy. Unlimited membership is $129 a month.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between infrared and traditional sauna?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A traditional sauna heats the air around you, so it feels hotter and more intense. An infrared sauna uses infrared panels that warm your body more directly at a lower air temperature, so many people find they can stay in comfortably for longer. Both clubs have both, so you can try each in one visit.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to book the infrared cabin separately?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you book a Remedy Lounge session online you can reserve up to two 25-minute sauna windows, infrared or traditional. Your cabin is held for that window, and you can step out to cold plunge and come back. The cold plunge, compression, and lounge are open the whole session.",
      },
    },
    {
      "@type": "Question",
      name: "Who should skip the sauna?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you are pregnant, have a heart condition, low or high blood pressure, or any medical condition, check with your doctor before using a sauna or cold plunge. Hydrate before and after, and leave the heat any time you feel dizzy or unwell.",
      },
    },
  ],
};

export default function InfraredSaunaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
