import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Sway Larimer | Wellness Spa Denver",
  description:
    "Frequently asked questions for Sway Larimer in Denver. Booking, parking, cancellation policies, Remedy Room, Aescape robot massage, pregnancy services, and celebrations.",
  alternates: {
    canonical: "https://swaywellnessspa.com/faq/larimer/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/faq/larimer/",
    title: "FAQ – Sway Larimer | Wellness Spa Denver",
    description:
      "Find answers about booking, parking, cancellation policies, the Remedy Room, Aescape robot massage, and more at Sway Larimer on Larimer Square in Denver.",
    images: [
      {
        url: "/assets/homepage_photo_outside.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Larimer FAQ",
      },
    ],
  },
  robots: { index: true, follow: true },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What's unique about Sway Wellness Spa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drawing from cultural hubs like Barcelona and NYC, Sway blends innovative technology with traditional treatments to offer a fresh, modern wellness club. We believe in total body health for long-term optimization — a luxurious yet accessible wellness club you can rejuvenate amid the city hustle.",
      },
    },
    {
      "@type": "Question",
      name: "What product lines does Sway use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use high-quality, in-demand products such as Eminence Organics, Dr. Dennis Gross, and CauseMedic.",
      },
    },
    {
      "@type": "Question",
      name: "How can I schedule a treatment at Sway Larimer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can schedule an appointment online at swaywellnessspa.com, or directly by phone at 303-476-6150. We also welcome walk-ins, but due to high demand, we recommend scheduling in advance.",
      },
    },
    {
      "@type": "Question",
      name: "What is Sway's cancellation policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We require at least 24 hours' notice for cancellations or rescheduling. Cancellations within 24 hours or no-shows will be subject to a cancellation fee of 50% of the scheduled treatment price.",
      },
    },
    {
      "@type": "Question",
      name: "Where is the best place to park at Sway Larimer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway is located in Larimer Square, Denver's most historic block. We validate parking for the 1st hour at the Larimer Square Parking Garage at 1422 Market Street, Denver CO 80202. After the first hour, the rate is $2 every 10 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "When should I arrive for my appointment at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Please arrive at least 15 minutes prior to your treatment time. Enjoy lemon water or our signature wellness tea. As a member, your locker, spa robe, spa sandals, warm aromatherapy neck pillow, and snacks will be waiting for you in our member lounge.",
      },
    },
    {
      "@type": "Question",
      name: "Will I share the Remedy Room with other guests?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Remedy Room is a communal space that can accommodate 3-4 guests at a time. If you are interested in a private option, please call the Spa for further details.",
      },
    },
    {
      "@type": "Question",
      name: "What should I wear to the Remedy Room?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As the Remedy Room is a communal space, we ask that all guests wear a swimsuit or athletic wear.",
      },
    },
    {
      "@type": "Question",
      name: "What do I need to bring for the Aescape robot massage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "During the Aescape Treatment, you will be provided with compression apparel that allows the Aescape technology to perform at its best. Please ensure your Aescape profile is updated with your smallest fit size.",
      },
    },
    {
      "@type": "Question",
      name: "Can I receive services at Sway if I'm pregnant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Expectant mothers in their first trimester can enjoy pregnancy-safe facials. Those in their second trimester may book our 50-minute Maternity Massage and also receive pregnancy-safe facials.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book a Spalebration or office party at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For booking a Spalebration or office party, please reach out to us at contact@swaywellnessspa.com. We would love to host you and your guests!",
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
      name: "FAQ",
      item: "https://swaywellnessspa.com/faq/",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Sway Larimer",
      item: "https://swaywellnessspa.com/faq/larimer/",
    },
  ],
};

export default function FAQLarimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
