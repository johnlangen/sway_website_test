import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sway Dallas – Coming Soon | Wellness Club in Dallas, TX",
  description:
    "Sway Wellness Spa is coming soon to Dallas, TX. Monthly facials, massage, and Remedy Room recovery — sign up for Founding Member updates.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/dallas",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/dallas",
    title: "Sway Dallas – Coming Soon | Wellness Club in Dallas, TX",
    description:
      "Targeted facials, deeply effective massage, and the Remedy Room are on their way to Dallas, TX. Sway Wellness Spa opening soon.",
    images: [
      {
        url: "/assets/SWAY.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Dallas Coming Soon – Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sway Dallas – Coming Soon | Wellness Club in Dallas, TX",
    description:
      "Sway Wellness Spa is opening soon in Dallas. Explore facials, massage, and Remedy Room recovery coming to Texas.",
    images: ["/assets/SWAY.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function DallasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
