import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Founding Membership | Sway Central Park" },
  description: "Massage and facials are coming to Sway Central Park in the Central Park. Founding members get a lower monthly rate and first access to book.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-central-park/founding-membership/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-central-park/founding-membership/",
    title: "Founding Membership | Sway Central Park",
    description: "Massage and facials are coming to Sway Central Park. Only 50 founding memberships.",
    images: [{ url: "/assets/massage2.jpg", width: 1326, height: 1162, alt: "Massage at Sway" }],
    siteName: "Sway Wellness Spa",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
