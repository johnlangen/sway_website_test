import { Metadata } from "next";
import { HideFloatingWidgets } from "@/app/components/HideFloatingWidgets";

export const metadata: Metadata = {
  title: { absolute: "Massage, Facials, Sauna & Cold Plunge in RiNo, Denver | Sway" },
  description:
    "Sway RiNo (formerly Upswell), 3636 Blake St, Denver: massage, facials, infrared and traditional saunas, and a cold plunge. Book online. $25 first Lounge visit, locals only.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-rino/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-rino/",
    title: "Sway RiNo · Massage, Facials, Sauna & Cold Plunge (formerly Upswell Studio)",
    description:
      "Hot, cold, still. Saunas and a cold plunge in the Remedy Lounge, plus massage and facials, open daily in Denver's RiNo Art District.",
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
    title: "Sway RiNo · Massage, Facials, Sauna & Cold Plunge (formerly Upswell Studio)",
    description:
      "Hot, cold, still. Saunas and a cold plunge in the Remedy Lounge, plus massage and facials, open daily in RiNo.",
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
    "A recovery-led wellness club in Denver's RiNo Art District, formerly Upswell Studio. The Sway Remedy Lounge is open daily with traditional sauna, infrared, cold plunge, and compression therapy, plus massage and facials with licensed massage therapists and estheticians.",
  image: "https://swaywellnessspa.com/assets/rino1.jpeg",
  "@id": "https://swaywellnessspa.com/locations/denver-rino/",
  telephone: "+1-303-225-0480",
  url: "https://swaywellnessspa.com/locations/denver-rino/",
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
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Massage",
        description:
          "Signature (light to medium pressure), deep tissue, sports, salt stone, lymphatic drainage and maternity massage in 50, 70 and 90 minute lengths, with a licensed massage therapist.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Facial",
        description:
          "Signature, anti-aging, acne, sensitive-skin and hydration facials, plus oxygen infusion, microcurrent and Hydraderm, with a licensed esthetician.",
      },
    },
  ],
  // Hours from 11/19/2026 (John 11/18, matches Mindbody). Change together with
  // CLUB_PAGES["denver-rino"].week, lib/locationHours.ts and the Google Business Profile.
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Friday"],
      opens: "10:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
      opens: "06:30",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "11:00",
      closes: "18:00",
    },
  ],
  hasMap: "https://www.google.com/maps/place/?q=place_id:ChIJSYpObGF5bIcRFVlb08RlL8I",
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
        text: "Yes. Sway took over both Upswell locations in June 2026 and now operates them as Sway Wellness Spa. Same recovery space, now with massage and facials too.",
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
        text: "No. Drop-ins are welcome. For unlimited access, the Remedy Lounge Membership is $129/month and you can join online in about 2 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "When can I book a massage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Now. Massage and facials are open at Sway RiNo and you can book online. Choose Massage or Facial on the booking page, pick your treatment, then your massage therapist or esthetician and time. Founding memberships are open too.",
      },
    },
    {
      "@type": "Question",
      name: "What massages can I book at Sway RiNo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Signature Massage (light to medium pressure), Deep Tissue, Sports, Salt Stone, Lymphatic Drainage and Maternity, in 50, 70 and 90 minute lengths with a licensed massage therapist. Drop-in from $139.",
      },
    },
    {
      "@type": "Question",
      name: "What facials does Sway RiNo offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Signature, Forever Young, Pore Perfection, Sensitive Silk and Glow Getter facials, plus Oxygen Infusion, Sculpt & Lift Microcurrent and Hydraderm, 50 to 60 minutes with a licensed esthetician. Drop-in from $139.",
      },
    },
    {
      "@type": "Question",
      name: "Can I pair a massage with the Remedy Lounge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Book them as two appointments on the same day, back to back in either order. A 50-minute massage plus a 75-minute Lounge session is about two hours.",
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
          them on all RiNo pages until the clubs get their own widgets.
          ACTIVATION (docs/bowtie-club-chat-activation.md): change to
          <HideFloatingWidgets attentiveOnly /> so RiNo's own Bowtie chat
          (token sway_rino) shows while Attentive stays hidden. */}
      <HideFloatingWidgets />
      {children}
    </>
  );
}
