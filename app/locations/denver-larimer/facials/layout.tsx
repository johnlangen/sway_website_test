import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facials in Denver | Sway Wellness Spa Larimer Square",
  description:
    "Book advanced facials at Sway Wellness Spa in Larimer Square, Denver. Anti-aging, hydration, acne, sensitive skin, and Vitamin C treatments.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-larimer/facials",
  },
  robots: { index: true, follow: true },
};

export default function LarimerFacialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
