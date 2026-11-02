import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Founding Membership | Sway Central Park" },
  description: "Massage and facials are coming to Sway Central Park in the Central Park. Join now for a monthly treatment at an exclusive founding rate, locked in.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-central-park/founding-membership/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-central-park/founding-membership/",
    title: "Founding Membership | Sway Central Park",
    description: "Massage and facials are coming to Sway Central Park. Only 50 founding memberships.",
    images: [{ url: "/assets/central-park-treatment-rendering.jpg", width: 1618, height: 956, alt: "Rendering of the treatment area at Sway Central Park" }],
    siteName: "Sway Wellness Spa",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
