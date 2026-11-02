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
    images: [{ url: "/assets/rino-treatment-rendering.jpg", width: 2000, height: 861, alt: "Rendering of the treatment area at Sway RiNo" }],
    siteName: "Sway Wellness Spa",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
