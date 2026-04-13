import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Own a Sway | Franchise Opportunity by Spavia",
  description:
    "Sway is the premium, next-generation wellness concept within the Spavia franchise system. 60+ locations, proven membership model, and 20+ years of franchise expertise. Explore ownership.",
  alternates: {
    canonical: "https://swaywellnessspa.com/own/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/own",
    title: "Own a Sway | Franchise Opportunity by Spavia",
    description:
      "Sway is the premium wellness concept within the Spavia franchise system. Explore franchise ownership with 60+ locations and 20+ years of industry expertise.",
    images: [
      {
        url: "/assets/OG/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Own a Sway Wellness Spa — Franchise Opportunity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Own a Sway | Franchise Opportunity by Spavia",
    description:
      "Sway is the premium wellness concept within Spavia. 60+ locations, proven model, recovery tech, and AI-powered massage.",
    images: ["/assets/OG/og-home.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function OwnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
