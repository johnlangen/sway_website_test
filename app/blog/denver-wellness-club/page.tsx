import { Metadata } from "next";
import DenverWellnessClubBlogLayout from "./layout";

export const metadata: Metadata = {
  title: "Denver’s Most Anticipated Wellness Club | Sway Wellness Spa",
  description:
    "Discover Sway—Denver’s modern wellness club with facials, massages, sauna, cold plunge & more. Affordable luxury for a new generation of self-care.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/denver-wellness-club",
  },
  openGraph: {
    title: "Denver’s Most Anticipated Wellness Club | Sway Wellness Spa",
    description:
      "Experience Sway Wellness Spa in Denver: facials, massages, Remedy Room with sauna, cold plunge, LED therapy, and more. Affordable luxury for the next generation.",
    url: "https://swaywellnessspa.com/blog/denver-wellness-club",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
        width: 1200,
        height: 630,
        alt: "Exterior of Sway Wellness Spa in Denver",
      },
    ],
    locale: "en_US",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Denver’s Most Anticipated Wellness Club",
    description:
      "Sway is Denver’s modern wellness club offering facials, massages, sauna, cold plunge, and a high-tech Remedy Room. Discover affordable luxury for today’s generation.",
    image: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
    author: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
    },
    publisher: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
      logo: {
        "@type": "ImageObject",
        url: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
      },
    },
    datePublished: "2025-01-15",
    dateModified: "2025-01-15",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/denver-wellness-club",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DenverWellnessClubBlogLayout />
    </main>
  );
}
