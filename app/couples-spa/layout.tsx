import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Couples Spa in Denver | Massage for Two on Larimer Square",
  description:
    "Book a couples massage, facial, or spa experience at Sway Wellness Spa on Larimer Square in Denver. Perfect for anniversaries, Valentine's Day, birthdays, and date nights.",
  alternates: {
    canonical: "https://swaywellnessspa.com/couples-spa",
  },
  openGraph: {
    title: "Couples Spa in Denver | Sway Wellness Spa",
    description:
      "Couples massage, facials, and spa experiences at Sway on Larimer Square. For anniversaries, Valentine's Day, birthdays, and date nights.",
    url: "https://swaywellnessspa.com/couples-spa",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "/assets/homepage_photo_outside.jpg",
        width: 1200,
        height: 630,
        alt: "Couples spa experience at Sway Wellness Spa in Denver",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Couples Spa in Denver | Sway Wellness Spa",
    description:
      "Couples massage, facials, and recovery on Larimer Square. Perfect for anniversaries, Valentine's Day, and date nights.",
    images: ["/assets/homepage_photo_outside.jpg"],
  },
  robots: { index: true, follow: true },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does Sway offer couples massage in Denver?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway Wellness Spa on Larimer Square in Denver offers couples massage in side-by-side treatment rooms. Choose from Basic Massage ($89 member / $129 drop-in), Deep Tissue, Salt Stone, Sports, Hot Stone, or CBD massage ($99 member / $139 drop-in). All sessions are 50 minutes. Book at swaywellnessspa.com.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a couples massage cost at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Couples massage at Sway starts at $89 per person for members or $129 per person for drop-ins (50-minute Basic Massage). Specialty massages (Deep Tissue, Salt Stone, Sports, CBD) are $99 member / $139 drop-in per person. Memberships start at $99/month.",
      },
    },
    {
      "@type": "Question",
      name: "What couples spa experiences does Sway offer besides massage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beyond couples massage, Sway offers couples facials (HydraFacial, Forever Young, Glow Getter, and more), the Remedy Room recovery circuit (sauna, cold plunge, Normatec compression, LED light therapy at $25 member / $49 drop-in), and Aescape AI-powered robot massage starting at $49. Boost add-ons like LED therapy and scalp massage are also available.",
      },
    },
    {
      "@type": "Question",
      name: "Is Sway good for anniversary or Valentine's Day gifts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway is voted #4 Best Day Spa in America by USA Today 10Best and is located on Larimer Square, making it ideal for special occasions. Gift cards are available in any amount and never expire. You can also book couples treatments directly at swaywellnessspa.com.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Sway Wellness Spa located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway is at 1428 Larimer St. on Larimer Square in downtown Denver, CO 80202. Parking is validated for the first hour at the Larimer Square Parking Garage (1422 Market Street). The spa is walkable from Union Station and surrounded by fine dining and cocktail bars.",
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
      name: "Couples Spa",
      item: "https://swaywellnessspa.com/couples-spa",
    },
  ],
};

export default function CouplesSpaLayout({
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
