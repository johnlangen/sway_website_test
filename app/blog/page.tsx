import { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "The Sway Edit | Denver Wellness Blog by Sway Spa",
  description:
    "Explore The Sway Edit—our blog filled with expert spa advice, skincare tips, wellness technology, and seasonal self-care insights from Sway Wellness Spa in Denver.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog",
  },
  openGraph: {
    title: "The Sway Edit | Denver Wellness Blog by Sway Spa",
    description:
      "Expert spa tips, skincare advice, and wellness insights from Sway Wellness Spa in Denver. Discover facials, massages, recovery, and more on The Sway Edit.",
    url: "https://swaywellnessspa.com/blog",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/homepage_photo_outside.png",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
