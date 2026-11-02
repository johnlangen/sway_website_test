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
    images: [{ url: "/assets/founding-massage-lamp.jpg", width: 2200, height: 1466, alt: "A massage therapist working on a guest's back in lamplight" }],
    siteName: "Sway Wellness Spa",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
