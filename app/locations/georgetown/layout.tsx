import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sway Georgetown | Spa & Wellness Club in Washington, DC | Coming Soon",
  description:
    "Sway Wellness Spa is coming to Georgetown in Washington, DC. Massage, facials, sauna, cold plunge, and the Remedy Room. Join the waitlist for founding member pricing.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/georgetown/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/georgetown/",
    title: "Sway Georgetown | Spa & Wellness Club in Washington, DC | Coming Soon",
    description:
      "Targeted facials, deeply effective massage, sauna, cold plunge, and the Remedy Room. Sway Wellness Spa opening soon in Georgetown, Washington, DC.",
    images: [
      {
        url: "/assets/SWAY.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Georgetown Coming Soon – Wellness Spa in Washington, DC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sway Georgetown | Spa & Wellness Club in Washington, DC | Coming Soon",
    description:
      "Massage, facials, sauna, cold plunge, and the Remedy Room. Sway Wellness Spa opening soon in Georgetown, DC. Join the waitlist for founding member pricing.",
    images: ["/assets/SWAY.jpg"],
  },
  robots: { index: true, follow: true },
};

const daySpaJsonLd = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  name: "Sway Georgetown",
  url: "https://swaywellnessspa.com/locations/georgetown/",
  image: ["https://swaywellnessspa.com/assets/SWAY.jpg"],
  priceRange: "$$",
  sameAs: [
    "https://www.instagram.com/swaywellnessclub/",
    "https://www.tiktok.com/@swaywellnessclub",
    "https://www.facebook.com/swaywellnessspa",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Washington",
    addressRegion: "DC",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "City",
    name: "Washington",
    address: { "@type": "PostalAddress", addressRegion: "DC", addressCountry: "US" },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://swaywellnessspa.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Locations",
      item: "https://swaywellnessspa.com/locations/",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Georgetown",
      item: "https://swaywellnessspa.com/locations/georgetown/",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When is Sway Georgetown opening?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway Georgetown in Washington, DC is coming soon. Sign up as a Founding Member at swaywellnessspa.com/locations/georgetown/founding-membership to receive early access, exclusive pricing, and opening-day perks.",
      },
    },
    {
      "@type": "Question",
      name: "What services will Sway Georgetown offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway Georgetown will offer expert-led massage therapy (deep tissue, sports recovery, CBD, salt stone), advanced facials (Pore Perfection, Forever Young, Glow Getter, Vitamin C), and the Remedy Room recovery circuit featuring sauna, cold plunge, LED light therapy, and lymphatic drainage compression boots.",
      },
    },
    {
      "@type": "Question",
      name: "Where in Georgetown will Sway be located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway's Georgetown location will be in the heart of the Georgetown neighborhood in Washington, DC. The exact address will be announced closer to opening. Georgetown is easily accessible from Dupont Circle, Foggy Bottom, and the greater DC metro area.",
      },
    },
    {
      "@type": "Question",
      name: "Does Sway Georgetown have a sauna and cold plunge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway Georgetown will feature the Remedy Room — our signature recovery circuit with sauna, cold plunge, LED light therapy, and lymphatic drainage compression boots. Remedy Room sessions can be booked individually or included with a membership.",
      },
    },
    {
      "@type": "Question",
      name: "How much are Sway Georgetown memberships?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Four membership tiers will be available: Essential (signature treatments), Premier (enhanced treatments and extended durations), Ultimate (technology-infused treatments and extended durations), and The Remedy Room (recovery circuit access). Founding member pricing will be announced before we open — join the waitlist to be notified.",
      },
    },
    {
      "@type": "Question",
      name: "Can I become a founding member at Sway Georgetown?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Founding Members receive exclusive pricing and priority booking before Sway Georgetown opens. Benefits include VIP opening-day perks and guaranteed rates. Sign up at swaywellnessspa.com/locations/georgetown/founding-membership.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Sway gift cards at the Georgetown location?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway gift cards are valid at all participating Sway locations. Gift cards purchased now can be redeemed at Sway Georgetown once the DC location opens. Purchase gift cards at swaywellnessspa.com/gift-cards.",
      },
    },
  ],
};

export default function GeorgetownLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(daySpaJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
