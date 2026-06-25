import { Metadata } from "next";
import { HideFloatingWidgets } from "@/app/components/HideFloatingWidgets";

export const metadata: Metadata = {
  title:
    "Sway Wellness Spa · RiNo (formerly Upswell Studio) | Denver Recovery",
  description:
    "Sway Wellness Spa RiNo (formerly Upswell Studio) at 3636 Blake St, Denver. The Sway Remedy Lounge is open daily: traditional and infrared saunas, cold plunge, and compression therapy. Massage and facial treatments coming this summer.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-rino/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-rino/",
    title: "Sway Wellness Spa · RiNo (formerly Upswell Studio)",
    description:
      "Traditional and infrared saunas, cold plunge, and compression therapy in the Sway Remedy Lounge. Open daily in Denver's RiNo Art District. Massage and facials coming this summer.",
    images: [
      {
        url: "/assets/SWAY.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa RiNo recovery lounge in Denver's RiNo Art District",
      },
    ],
    siteName: "Sway Wellness Spa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sway Wellness Spa · RiNo (formerly Upswell Studio)",
    description:
      "Traditional and infrared saunas, cold plunge, and compression therapy in the Sway Remedy Lounge. Open daily in RiNo. Massage and facials coming this summer.",
    images: ["/assets/SWAY.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  name: "Sway Wellness Spa · RiNo",
  alternateName: "Upswell Studio",
  description:
    "A recovery-led wellness club in Denver's RiNo Art District, formerly Upswell Studio. The Sway Remedy Lounge is open daily with traditional sauna, infrared, cold plunge, and compression therapy. Massage and facial treatments are coming this summer.",
  image: "https://swaywellnessspa.com/assets/rino1.jpeg",
  "@id": "https://swaywellnessspa.com/locations/denver-rino/",
  url: "https://swaywellnessspa.com/locations/denver-rino/",
  telephone: "+1-303-476-6150",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3636 Blake St",
    addressLocality: "Denver",
    addressRegion: "CO",
    postalCode: "80205",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.7665,
    longitude: -104.9839,
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Sway Remedy Lounge",
        description:
          "A recovery session with traditional and infrared saunas, cold plunge, compression therapy, and lounge access.",
      },
    },
  ],
  priceRange: "$$",
  sameAs: [
    "https://www.instagram.com/swaywellnessclub/",
    "https://www.facebook.com/swaywellnessspa",
    "https://www.tiktok.com/@swaywellnessclub",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this the old Upswell?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We recently took over both Upswell locations and are now operating them as Sway Wellness Spa. Same recovery space, with new treatments and experiences coming this summer.",
      },
    },
    {
      "@type": "Question",
      name: "What's included in the Sway Remedy Lounge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Access to the traditional dry sauna, infrared sauna cabins, cold plunge, compression therapy, and lounge.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a membership?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Drop-ins are welcome. Unlimited Sway Remedy Lounge memberships are available at an exclusive member rate. Ask in club or call us for details.",
      },
    },
    {
      "@type": "Question",
      name: "When can I book a massage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Massage and facial treatments are coming this summer. Join our email list to be the first to know when booking opens.",
      },
    },
    {
      "@type": "Question",
      name: "What about my Upswell membership?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Existing Upswell members were carried over automatically, so no action is needed. Current members roll into Sway at the Founding rate.",
      },
    },
  ],
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
      name: "Denver RiNo",
      item: "https://swaywellnessspa.com/locations/denver-rino/",
    },
  ],
};

export default function DenverRinoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* The global Bowtie chat + Attentive offer are Larimer-specific. Hide
          them on all RiNo pages until the clubs get their own widgets. */}
      <HideFloatingWidgets />
      {children}
    </>
  );
}
