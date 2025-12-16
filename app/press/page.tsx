import { Metadata } from "next";
import PressContent from "./PressContent";

export const metadata: Metadata = {
  title: "Press | Sway Wellness Spa in the Media",
  description:
    "See what the press is saying about Sway — featured in 5280, Denver Post, Yoga + Life, and more. Discover how we’re redefining wellness with AI, robots, and spa innovation.",
  alternates: {
    canonical: "https://swaywellnessspa.com/press",
  },
  openGraph: {
    title: "Press | Sway Wellness Spa in the Media",
    description:
      "See what the press is saying about Sway — featured in 5280, Denver Post, Yoga + Life, and more. Discover how we’re redefining wellness with AI, robots, and spa innovation.",
    url: "https://swaywellnessspa.com/press",
    siteName: "Sway Wellness Spa",
    type: "website",
  },
};

export default function Page() {
  // JSON-LD for multiple press mentions
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sway Wellness Spa Press Coverage",
    description:
      "Press features and media articles covering Sway Wellness Spa, Denver’s next-generation wellness club.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: "https://www.bluetoad.com/publication/?i=854210&p=8&view=issueViewer",
        name: "A Demographic-Built Wellness Spa — Salon Today (Modern Spa & Wellness)",
      },
      {
        "@type": "ListItem",
        position: 2,
        url: "https://www.denverpost.com/2025/03/08/wellness-club-sway-larimer-square-ai-robot-massage/",
        name: "AI, Robot Massages & More at Sway — The Denver Post",
      },
      {
        "@type": "ListItem",
        position: 3,
        url: "https://athletechnews.com/built-by-gen-z-for-gen-z-sway-redefines-the-wellness-club/",
        name: "Built by Gen Z for Gen Z — Athletech",
      },
      {
        "@type": "ListItem",
        position: 4,
        url: "https://milehighcre.com/revolutionary-wellness-club-coming-to-larimer-square/",
        name: "Revolutionary Wellness Club Coming to Larimer Square — Mile High CRE",
      },
      {
        "@type": "ListItem",
        position: 5,
        url: "https://www.bizjournals.com/denver/news/2024/11/20/wellness-club-opening-in-denvers-larimer-square.html",
        name: "Sway Wellness Club Opening in Denver’s Larimer Square — Denver Business Journal",
      },
      {
        "@type": "ListItem",
        position: 6,
        url: "https://www.5280.com/i-tried-colorados-first-robot-massage/",
        name: "I Tried Colorado’s First Robot Massage — 5280 Magazine",
      },
      {
        "@type": "ListItem",
        position: 7,
        url: "https://yogalifelive.com/this-new-denver-wellness-club-is-using-robots-to-rethink-self-care/",
        name: "Robots Rethink Self-Care — Yoga+Life",
      },
    ],
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PressContent />
    </>
  );
}
