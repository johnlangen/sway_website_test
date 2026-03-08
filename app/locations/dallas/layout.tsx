import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sway Dallas | Spa & Wellness Club in Knox/Henderson | Coming Soon",
  description:
    "Sway Wellness Spa is coming to Knox/Henderson in Dallas, TX. Massage, facials, sauna, cold plunge, and the Remedy Room. Founding memberships from $89/month.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/dallas",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/dallas",
    title: "Sway Dallas | Spa & Wellness Club in Knox/Henderson | Coming Soon",
    description:
      "Targeted facials, deeply effective massage, sauna, cold plunge, and the Remedy Room recovery circuit. Sway Wellness Spa opening soon in Dallas, TX.",
    images: [
      {
        url: "/assets/SWAY.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Dallas Coming Soon – Wellness Spa in Knox/Henderson",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sway Dallas | Spa & Wellness Club in Knox/Henderson | Coming Soon",
    description:
      "Massage, facials, sauna, cold plunge, and the Remedy Room. Sway Wellness Spa opening soon in Dallas. Founding memberships from $89/month.",
    images: ["/assets/SWAY.jpg"],
  },
  robots: { index: true, follow: true },
};

const daySpaJsonLd = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  name: "Sway Dallas",
  url: "https://swaywellnessspa.com/locations/dallas",
  image: ["https://swaywellnessspa.com/assets/SWAY.jpg"],
  priceRange: "$$",
  sameAs: [
    "https://www.instagram.com/swaywellnessclub/",
    "https://www.tiktok.com/@swaywellnessclub",
    "https://www.facebook.com/swaywellnessspa",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "2323 Henderson Ave",
    addressLocality: "Dallas",
    addressRegion: "TX",
    postalCode: "75206",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "City",
    name: "Dallas",
    address: { "@type": "PostalAddress", addressRegion: "TX", addressCountry: "US" },
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
      item: "https://swaywellnessspa.com/locations",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Dallas",
      item: "https://swaywellnessspa.com/locations/dallas",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When is Sway Dallas opening?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway Dallas is coming soon to Knox/Henderson at 2323 Henderson Ave. Sign up as a Founding Member at swaywellnessspa.com/locations/dallas/founding-membership to get early access, exclusive pricing, and opening-day perks.",
      },
    },
    {
      "@type": "Question",
      name: "What services will Sway Dallas offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway Dallas will offer expert-led massage therapy (deep tissue, sports recovery, CBD, salt stone), advanced facials (Pore Perfection, Forever Young, Glow Getter, Vitamin C), and the Remedy Room recovery circuit featuring infrared sauna, cold plunge, Normatec compression therapy, and LED light therapy.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Founding Member at Sway Dallas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Founding Members lock in exclusive pricing starting at $89/month before Sway Dallas opens. Benefits include priority booking access, VIP opening-day perks, and guaranteed rates that won't increase. Sign up at swaywellnessspa.com/locations/dallas/founding-membership.",
      },
    },
    {
      "@type": "Question",
      name: "Where in Dallas will Sway be located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway Dallas will be located at 2323 Henderson Ave in the Knox/Henderson neighborhood, one of Dallas's most vibrant dining and lifestyle districts. The spa will be easily accessible from Highland Park, Uptown, Lower Greenville, and Lakewood.",
      },
    },
    {
      "@type": "Question",
      name: "Does Sway Dallas have a sauna and cold plunge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway Dallas will feature the Remedy Room, which includes an infrared sauna, cold plunge pool, Normatec compression boots, LED light therapy, and a lymphatic drainage mat. Remedy Room sessions can be booked individually or included with a membership.",
      },
    },
    {
      "@type": "Question",
      name: "How much are Sway Dallas memberships?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Founding Member pricing at Sway Dallas starts at $89/month. Two membership tiers will be available: Spa Club (monthly massage or facial) and Remedy Room (unlimited recovery circuit access). Founding rates are locked in and will not increase.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Sway gift cards at the Dallas location?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway gift cards are valid at all participating Sway locations. Gift cards purchased now can be redeemed at Sway Dallas once the Knox/Henderson location opens. Purchase gift cards at swaywellnessspa.com/gift-cards.",
      },
    },
  ],
};

export default function DallasLayout({ children }: { children: React.ReactNode }) {
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
