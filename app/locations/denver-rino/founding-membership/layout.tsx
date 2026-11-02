import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Founding Membership | Sway RiNo" },
  description: "Massage and facials are coming to Sway RiNo in the RiNo Art District. Founding members get a lower monthly rate and first access to book.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-rino/founding-membership/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-rino/founding-membership/",
    title: "Founding Membership | Sway RiNo",
    description: "Massage and facials are coming to Sway RiNo. Only 50 founding memberships.",
    images: [{ url: "/assets/founding-massage-lamp.jpg", width: 2200, height: 1466, alt: "A massage therapist working on a guest's back in lamplight" }],
    siteName: "Sway Wellness Spa",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
