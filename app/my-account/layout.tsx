import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | Sway Wellness",
  description:
    "Sign in to your Sway account to view upcoming visits, reschedule, or cancel a reservation at Sway Larimer Square, Sway RiNo, or Sway Central Park.",
  alternates: {
    canonical: "https://swaywellnessspa.com/my-account/",
  },
  // Thin utility chooser that routes out to Mindbody's consumer portal. No
  // SEO value, and we don't want it competing with the location pages.
  robots: { index: false, follow: true },
};

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
