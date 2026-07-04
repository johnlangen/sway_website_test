import { Metadata } from "next";
import { HideFloatingWidgets } from "@/app/components/HideFloatingWidgets";

export const metadata: Metadata = {
  title:
    "Sway Wellness Spa · Central Park (formerly Upswell Studio) | Denver Recovery",
  description:
    "Sway Wellness Spa Central Park (formerly Upswell Studio) at 2271 Clinton St, Aurora. The Sway Remedy Lounge is open daily: traditional and infrared saunas, cold plunges, a warm soak, and compression therapy. Massage and facial treatments coming this summer.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-central-park/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-central-park/",
    title: "Sway Wellness Spa · Central Park (formerly Upswell Studio)",
    description:
      "Traditional and infrared saunas, cold plunges, a warm soak, and compression therapy in the Sway Remedy Lounge. Open daily near Denver's Central Park. Massage and facials coming this summer.",
    images: [
      {
        url: "/assets/SWAY.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Central Park recovery lounge near Denver's Central Park neighborhood",
      },
    ],
    siteName: "Sway Wellness Spa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sway Wellness Spa · Central Park (formerly Upswell Studio)",
    description:
      "Traditional and infrared saunas, cold plunges, a warm soak, and compression therapy in the Sway Remedy Lounge. Open daily near Central Park. Massage and facials coming this summer.",
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
  name: "Sway Wellness Spa · Central Park",
  alternateName: "Upswell Studio",
  description:
    "A recovery-led wellness club near Denver's Central Park neighborhood, formerly Upswell Studio. The Sway Remedy Lounge is open daily with traditional sauna, infrared, cold plunge, and compression therapy. Massage and facial treatments are coming this summer.",
  image: "https://swaywellnessspa.com/assets/centralpark1.jpg",
  "@id": "https://swaywellnessspa.com/locations/denver-central-park/",
  url: "https://swaywellnessspa.com/locations/denver-central-park/",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2271 Clinton St",
    addressLocality: "Aurora",
    addressRegion: "CO",
    postalCode: "80010",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.7494,
    longitude: -104.8688,
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Sway Remedy Lounge",
        description:
          "A recovery session with traditional and infrared saunas, cold plunges, a warm soak, compression therapy, and lounge access.",
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
        text: "Access to the traditional dry sauna, infrared sauna cabins, cold plunges, a warm soak, compression therapy, and lounge.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a membership?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Drop-ins are welcome. For unlimited access, the Remedy Lounge Membership is $129/month and you can join online in about 2 minutes.",
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
      name: "Denver Central Park",
      item: "https://swaywellnessspa.com/locations/denver-central-park/",
    },
  ],
};

export default function DenverCentralParkLayout({
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
          them on all Central Park pages until the clubs get their own widgets. */}
      <HideFloatingWidgets />
      {children}
    </>
  );
}
