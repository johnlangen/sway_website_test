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
              ],
            },
            headline: "The Sway Way",
            description:
              "Discover The Sway Way — a modern evolution of wellness. Where spa tradition meets innovation, built by the founders of Spavia.",
            image: "https://swaywellnessspa.com/assets/OG/og-sway-way.jpg",
          }),
        }}
      />
      {children}
    </>
  );
}
