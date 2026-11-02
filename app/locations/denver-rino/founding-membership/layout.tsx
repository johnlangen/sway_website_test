import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Founding Membership | Sway RiNo" },
  description: "Massage and facials are coming to Sway RiNo in the RiNo Art District. Join now for a monthly treatment at an exclusive founding rate, locked in.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-rino/founding-membership/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-rino/founding-membership/",
    title: "Founding Membership | Sway RiNo",
    description: "Massage and facials are coming to Sway RiNo. Only 50 founding memberships.",
    images: [{ url: "/assets/homepage-massage.jpg", width: 2400, height: 1600, alt: "A candlelit hallway of treatment rooms at Sway" }],
    siteName: "Sway Wellness Spa",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
