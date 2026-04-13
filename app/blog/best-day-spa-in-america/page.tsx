import { Metadata } from "next";
import BestDaySpaLayout from "./layout";

export const metadata: Metadata = {
  title: "#4 Best Day Spa in America: Sway's First Year | Sway Wellness Spa",
  description:
    "USA Today 10Best voted Sway #4 Best Day Spa in America. A look at year one on Larimer Square and what's inside Denver's modern wellness club.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/best-day-spa-in-america/",
  },
  openGraph: {
    title: "#4 Best Day Spa in America: Sway's First Year",
    description:
      "USA Today 10Best voted Sway #4 Best Day Spa in America. A look at year one on Larimer Square and what's inside Denver's modern wellness club.",
    url: "https://swaywellnessspa.com/blog/best-day-spa-in-america",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa on Larimer Square in Denver",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "#4 Best Day Spa in America: Sway's First Year",
    description:
      "USA Today 10Best voted Sway #4 Best Day Spa in America. Year one on Larimer Square and what's inside Denver's modern wellness club.",
    images: ["https://swaywellnessspa.com/assets/homepage_photo_outside.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: "#4 Best Day Spa in America: Sway's First Year",
        description:
          "USA Today 10Best voted Sway #4 Best Day Spa in America. A look at year one on Larimer Square and what's inside Denver's modern wellness club.",
        image:
          "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
        author: {
          "@type": "Organization",
          name: "Sway Wellness Spa",
          url: "https://swaywellnessspa.com",
          logo: "https://swaywellnessspa.com/assets/swaylogo3.png",
        },
        publisher: {
          "@type": "Organization",
          name: "Sway Wellness Spa",
          logo: {
            "@type": "ImageObject",
            url: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
          },
        },
        datePublished: "2026-02-27",
        dateModified: "2026-02-27",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id":
            "https://swaywellnessspa.com/blog/best-day-spa-in-america",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Sway Wellness Spa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sway is a modern wellness club on Larimer Square in downtown Denver, Colorado. It offers massage, facials, a recovery circuit called the Remedy Room (sauna, cold plunge, Normatec compression, LED light therapy), and Aescape AI-powered robot massage. Sway was voted #4 Best Day Spa in America by USA Today 10Best.",
            },
          },
          {
            "@type": "Question",
            name: "What does #4 Best Day Spa in America mean?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "USA Today 10Best is a nationally recognized travel and lifestyle awards program. A panel of experts nominates the top contenders, then readers across the country vote. Sway was ranked #4 Best Day Spa in the United States for 2025.",
            },
          },
          {
            "@type": "Question",
            name: "What treatments does Sway offer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sway offers four treatment categories: massage (Basic, Deep Tissue, Salt Stone, CBD, Sports, and Lymphatic), facials (Basic, Forever Young, Glow Getter, Pore Perfection, Sensitive Silk, and Dr. Dennis Gross Vitamin C), the Remedy Room recovery circuit (sauna, cold plunge, Normatec compression, LED light therapy), and Aescape autonomous AI-powered robot massage.",
            },
          },
          {
            "@type": "Question",
            name: "Does Sway offer memberships?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Sway offers monthly memberships that include treatments, member pricing on boosts and add-ons, and Remedy Room access. Membership details are available at swaywellnessspa.com/membership.",
            },
          },
          {
            "@type": "Question",
            name: "Where is Sway located?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sway Wellness Spa is located on Larimer Square in downtown Denver, Colorado. Walk-ins are welcome and booking is recommended at swaywellnessspa.com.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BestDaySpaLayout />
    </main>
  );
}
