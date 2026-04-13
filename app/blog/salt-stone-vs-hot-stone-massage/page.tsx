import { Metadata } from "next";
import SaltStoneVsHotStoneLayout from "./layout";

export const metadata: Metadata = {
  title:
    "Salt Stone vs Hot Stone Massage: Why Himalayan Salt Wins | Sway Spa Denver",
  description:
    "Salt stone massage and hot stone massage are not the same. Learn the key differences, benefits of Himalayan salt stones, and why Sway Wellness Spa in Denver chose salt stone.",
  alternates: {
    canonical:
      "https://swaywellnessspa.com/blog/salt-stone-vs-hot-stone-massage",
  },
  openGraph: {
    title: "Salt Stone vs Hot Stone Massage: Why Himalayan Salt Wins",
    description:
      "Salt stone massage and hot stone massage are not the same. Learn the key differences, benefits of Himalayan salt stones, and why Sway Wellness Spa chose salt stone.",
    url: "https://swaywellnessspa.com/blog/salt-stone-vs-hot-stone-massage/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/saltstoneblog.jpg/",
        width: 1200,
        height: 630,
        alt: "Himalayan salt stone massage at Sway Wellness Spa in Denver",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salt Stone vs Hot Stone Massage: Why Himalayan Salt Wins",
    description:
      "They are not the same treatment. Here is why Sway Wellness Spa in Denver uses Himalayan salt stones instead of traditional hot stones.",
    images: ["https://swaywellnessspa.com/assets/saltstoneblog.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline:
          "Salt Stone vs Hot Stone Massage: Why Himalayan Salt Wins",
        description:
          "Salt stone massage and hot stone massage are not the same. Learn the key differences, benefits of Himalayan salt stones, and why Sway Wellness Spa in Denver chose salt stone.",
        image: "https://swaywellnessspa.com/assets/saltstoneblog.jpg",
        author: {
          "@type": "Organization",
          name: "Sway Wellness Spa",
          url: "https://swaywellnessspa.com",
          logo: "https://swaywellnessspa.com/assets/swaylogo3.png",
        },
        publisher: {
          "@type": "Organization",
          name: "Sway Wellness Spa",
          logo: {
            "@type": "ImageObject",
            url: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg/",
          },
        },
        datePublished: "2026-03-08",
        dateModified: "2026-03-08",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id":
            "https://swaywellnessspa.com/blog/salt-stone-vs-hot-stone-massage",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the difference between a salt stone massage and a hot stone massage?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hot stone massage uses basalt (volcanic rock) that retains heat but transfers no minerals. Salt stone massage uses hand-carved Himalayan salt crystals containing 84 trace minerals including magnesium, potassium, calcium, and iron. Salt stones provide gentle exfoliation, mineral absorption through the skin, and natural antimicrobial properties that basalt does not offer. Salt stones are also heated to a milder temperature, making them more comfortable for guests who find traditional hot stones too intense.",
            },
          },
          {
            "@type": "Question",
            name: "What are the benefits of a Himalayan salt stone massage?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Himalayan salt stone massage offers deep stress relief, natural detoxification as salt draws out toxins through the skin, improved circulation from magnesium and potassium, softer and healthier skin from gentle exfoliation and mineral nourishment, and effective muscle tension relief without the intensity of deep tissue work. At Sway Wellness Spa in Denver, the Salt Stone massage is a 50-minute treatment starting at $99 for members.",
            },
          },
          {
            "@type": "Question",
            name: "How much does a salt stone massage cost at Sway Wellness Spa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Salt Stone massage at Sway Wellness Spa is a 50-minute treatment priced at $99 for members and $139 for drop-in guests. Members can also add boosts like an 80-minute extension, infrared PEMF mat, cupping, or lymphatic drainage. Sway is located on Larimer Square in downtown Denver, Colorado.",
            },
          },
          {
            "@type": "Question",
            name: "Is salt stone massage better than hot stone massage?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Salt stone massage offers several advantages over traditional hot stone massage. The Himalayan salt crystals deliver trace minerals through the skin, provide natural exfoliation, and are naturally antimicrobial. The gentler heat is more comfortable for most guests. Many people who search for hot stone massage in Denver discover salt stone massage at Sway and prefer it for the additional wellness benefits beyond heat alone.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SaltStoneVsHotStoneLayout />
    </main>
  );
}
