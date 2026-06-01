import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Father's Day Spa Gift Cards | Sway Wellness Spa Denver",
  description:
    "Last-minute Father's Day gift? Sway spa gift cards delivered instantly to Dad's inbox. Any amount. Redeemable on Aescape robot massage, Remedy Room recovery, massage, sauna, and more at Sway Wellness Spa Denver.",
  alternates: {
    canonical: "https://swaywellnessspa.com/fathers-day-gift-cards/",
  },
  robots: {
    // noindex while running paid traffic only — promote to index next FD if reusing
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Father's Day Spa Gift Cards | Sway Wellness Spa",
    description:
      "Give Dad the gift he'll actually use. Aescape robot massage, Remedy Room recovery, and more. Sway spa gift cards delivered instantly.",
    url: "https://swaywellnessspa.com/fathers-day-gift-cards/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "/assets/aescapeblog7.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Father's Day Gift Cards",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast is Sway's Father's Day gift card delivery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway gift cards are delivered instantly by email. You can purchase right up to Father's Day morning and your gift will arrive in seconds. No shipping required.",
      },
    },
    {
      "@type": "Question",
      name: "What can a Sway gift card be used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any service at Sway Wellness Spa: Aescape robot massage, Remedy Room recovery (sauna, cold plunge, compression, LED), traditional massage, facials, boosts, and retail.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Aescape robot massage at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aescape is an AI-powered, fully personalized full-body robot massage. The guest lies face-down, the machine scans their back, and delivers consistent pressure for 30 to 60 minutes. Sway has the first Aescape in Colorado. The 60-minute session is $99 first visit (Mon-Fri, code FTVO40).",
      },
    },
    {
      "@type": "Question",
      name: "Do Sway gift cards expire?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Sway gift cards never expire and can be used for any service at Sway Wellness Spa, located at 1428 Larimer St., Denver, CO 80202.",
      },
    },
  ],
};

export default function FathersDayGiftCardsLayout({
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
      {children}
    </>
  );
}
