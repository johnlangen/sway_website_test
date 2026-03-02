// app/swayway/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Sway Way | Modern Wellness Redefined in Denver",
  description:
    "Discover The Sway Way — a modern evolution of wellness. Where spa tradition meets innovation, built by the founders of Spavia. Explore our story.",
  alternates: {
    canonical: "https://swaywellnessspa.com/swayway",
  },
  openGraph: {
    title: "The Sway Way | Modern Wellness Redefined in Denver",
    description:
      "Discover The Sway Way — a modern evolution of wellness. Where spa tradition meets innovation, built by the founders of Spavia. Explore our story.",
    url: "https://swaywellnessspa.com/swayway",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "/assets/OG/og-sway-way.jpg",
        width: 1200,
        height: 630,
        alt: "The Sway Way - Modern Wellness Redefined",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function SwayWayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "Organization",
              name: "Sway Wellness Spa",
              url: "https://swaywellnessspa.com",
              logo: "https://swaywellnessspa.com/assets/OG/og-home.jpg",
              sameAs: [
                "https://www.instagram.com/swaywellnessclub/",
                "https://www.facebook.com/swaywellnessclub",
                "https://www.tiktok.com/@swaywellnessclub",
              ],
            },
            headline: "The Sway Way",
            description:
              "Discover The Sway Way — a modern evolution of wellness. Where spa tradition meets innovation, built by the founders of Spavia.",
            image: "https://swaywellnessspa.com/assets/OG/og-sway-way.jpg",
          }),
        }}
      />
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Sway Wellness Spa?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sway is a modern wellness club in Denver, Colorado, offering massage therapy, advanced facials, the Remedy Room recovery circuit (sauna, cold plunge, Normatec compression, LED light therapy), and Aescape AI-powered robot massage. Voted #4 Best Day Spa in America by USA Today 10Best.",
                },
              },
              {
                "@type": "Question",
                name: "Who founded Sway Wellness Spa?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sway was built by the founders of Spavia, who grew a wellness franchise to over 65 locations before creating Sway as the next evolution of the modern wellness experience.",
                },
              },
              {
                "@type": "Question",
                name: "What makes Sway different from a traditional spa?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sway combines hands-on expertise with science-backed technology under one roof. Beyond traditional massage and facials, Sway offers recovery tech (sauna, cold plunge, Normatec, LED) and AI-powered Aescape robot massage. It's designed as a wellness club for regular use, not just occasional pampering.",
                },
              },
              {
                "@type": "Question",
                name: "Where is Sway located?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sway's flagship location is on Larimer Square in downtown Denver, Colorado. New locations are coming soon to Georgetown (Washington, DC) and Dallas, Texas.",
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
