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
    images: [{ url: "/assets/founding-massage-hero.jpg", width: 1333, height: 2000, alt: "A guest relaxing during a head and neck massage" }],
    siteName: "Sway Wellness Spa",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
