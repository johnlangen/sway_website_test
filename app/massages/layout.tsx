import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Massage Therapy | Deep Tissue, Sports, CBD & More | Sway Wellness Spa",
  description:
    "Explore massage therapy at Sway, a modern wellness club in Denver. Choose from Deep Tissue, Sports, CBD, Salt Stone, and Lymphatic Drainage — customized by expert therapists.",
  alternates: {
    canonical: "https://swaywellnessspa.com/massages",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/massages",
    title: "Massage Therapy | Sway Wellness Spa",
    description:
      "Discover expert-led massage experiences designed to relax, recover, and restore balance.",
    images: [
      {
        url: "/assets/OG/og-massages.jpg",
        width: 1200,
        height: 630,
        alt: "Massage experiences at Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Massage Therapy | Sway Wellness Spa",
    description:
      "Explore massage experiences including Deep Tissue, Sports, CBD, and more at Sway Wellness Spa.",
    images: ["/assets/OG/og-massages.jpg"],
  },
  robots: { index: true, follow: true },
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
      name: "Massages",
      item: "https://swaywellnessspa.com/massages",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes Sway's massages different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway's massage therapists combine traditional hands-on techniques with modern wellness technology. You can add science-backed boosts like infrared PEMF mats for deeper recovery or cupping for targeted tension release. After your session, the Remedy Room — sauna, cold plunge, Normatec compression — and results-driven facials with Eminence Organics are all available under one roof.",
      },
    },
    {
      "@type": "Question",
      name: "What types of massage does Sway offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway offers six massage experiences: Basic Massage, Deep Tissue, Salt Stone, CBD CauseMedic, Sports Massage, and Lymphatic Drainage. Each is 50 minutes and fully customized by your therapist.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add anything to my massage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway offers four add-on boosts: extend your session to 80 minutes, add Lymphatic Drainage Massage, lie on an Infrared PEMF Mat for deeper recovery, or add Cupping for targeted tension release. Members save 50% on all boosts.",
      },
    },
    {
      "@type": "Question",
      name: "How long is a massage session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard massage sessions are 50 minutes. You can extend to 80 minutes by adding the 80-Minute Super Boost.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a membership to book a massage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — anyone can book a massage at Sway. Drop-in pricing starts at $129. Members pay as low as $89 per session and save 50% on boosts. Memberships start at $99/month.",
      },
    },
  ],
};

export default function MassagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
