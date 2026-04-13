import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "The Maven Hotel × Sway | 60-Min Aescape Robot Massage in Denver",
  description:
    "Book a 60-minute AI-powered Aescape robot massage at Sway Wellness Spa on Larimer Square — a short trip from The Maven Hotel at Dairy Block in Denver.",
  keywords: [
    "Maven Hotel spa",
    "Maven Hotel Denver massage",
    "Dairy Block spa",
    "Larimer Square massage",
    "Aescape robot massage Denver",
    "hotel guest spa Denver",
    "Sway Wellness Spa",
    "LoDo spa Denver",
    "Denver hotel spa experience",
  ],
  alternates: {
    canonical: "https://swaywellnessspa.com/themavenhotel/",
  },
  openGraph: {
    title: "Maven Hotel × Sway Wellness Spa | 60-Min Aescape Massage",
    description:
      "Book a 60-minute AI-powered Aescape massage at Sway on Larimer Square — minutes from The Maven Hotel in Denver.",
    url: "https://swaywellnessspa.com/themavenhotel",
    siteName: "Sway Wellness Spa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maven Hotel × Sway Wellness Spa",
    description:
      "60-minute AI-powered Aescape robot massage at Sway on Larimer Square, minutes from The Maven Hotel in Denver.",
  },
  robots: { index: true, follow: true },
};

export default function MavenHotelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "60-Minute Aescape Robot Massage — The Maven Hotel × Sway",
    description:
      "60-minute AI-powered Aescape robot massage at Sway Wellness Spa on Larimer Square, minutes from The Maven Hotel at Dairy Block, Denver.",
    provider: {
      "@type": "DaySpa",
      name: "Sway Wellness Spa",
      url: "https://swaywellnessspa.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1428 Larimer Street",
        addressLocality: "Denver",
        addressRegion: "CO",
        postalCode: "80202",
        addressCountry: "US",
      },
      telephone: "+1-303-476-6150",
    },
    areaServed: {
      "@type": "Place",
      name: "LoDo / Larimer Square, Denver",
    },
    offers: {
      "@type": "Offer",
      price: "139",
      priceCurrency: "USD",
      description: "60-Minute Full Body Aescape Robot Massage",
      availability: "https://schema.org/InStock",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How far is Sway from The Maven Hotel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sway Wellness Spa is 0.6 miles from The Maven Hotel at Dairy Block — about a 10-minute walk, a 5-minute drive, or a quick scooter ride down Larimer Street. Our address is 1428 Larimer Street, Denver, CO 80202.",
        },
      },
      {
        "@type": "Question",
        name: "What is an Aescape robot massage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aescape is an AI-powered robotic massage system that delivers a precision full-body massage using 3D body-mapping technology. It adjusts pressure in real time based on your body, so every session is personalized. No human therapist needed — just lie down, pick your preferences, and relax for 60 minutes.",
        },
      },
      {
        "@type": "Question",
        name: "How do I book from The Maven Hotel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book directly on this page — just pick a date and time, enter your details, and you're confirmed. The whole process takes under a minute. You'll receive a confirmation email right away.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to be a Maven Hotel guest to book?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nope! This page is available to anyone. The Maven Hotel is a proud partner of Sway, and we welcome all guests — whether you're staying at the Maven, visiting Dairy Block, or exploring Larimer Square.",
        },
      },
      {
        "@type": "Question",
        name: "What should I wear? How do I prepare?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Just show up in comfortable clothing. Compression apparel is provided at check-in — no need to change or prep beforehand. Arrive about 15 minutes early to get settled, and the Aescape system takes care of the rest.",
        },
      },
      {
        "@type": "Question",
        name: "Does Sway offer other treatments besides robot massage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Sway is a full-service wellness spa. We offer massage therapy (salt stone, deep tissue, Swedish, and more), facials (anti-aging, hydration, vitamin C), a private sauna suite, cold plunge, LED light therapy, and compression therapy.",
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
        item: "https://swaywellnessspa.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Maven Hotel Guest Experience",
        item: "https://swaywellnessspa.com/themavenhotel",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
