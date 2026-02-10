// app/aescape/page.tsx
import { Metadata } from "next";
import AescapeContent from "../components/AescapeContent";

export const metadata: Metadata = {
  title: "Aescape Robot Massage | AI-Powered Massage at Sway Wellness Spa",
  description:
    "Experience Aescape, the world's first AI-powered robot massage — available at Sway Wellness Spa. Personalized pressure, zero awkwardness. Book your session today.",
  alternates: { canonical: "https://swaywellnessspa.com/aescape" },

  openGraph: {
    type: "article",
    url: "https://swaywellnessspa.com/aescape",
    title: "Aescape Robot Massage | AI-Powered Massage at Sway Wellness Spa",
    description:
      "Experience Aescape, the world's first AI-powered robot massage at Sway Wellness Spa.",
    images: [
      {
        url: "/assets/OG/og-aescape.jpg",
        width: 1200,
        height: 630,
        alt: "Aescape Robot Massage at Sway Wellness Spa Denver",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aescape Robot Massage | AI-Powered Massage at Sway Wellness Spa",
    description:
      "Experience Aescape, the world's first AI-powered robot massage at Sway Wellness Spa.",
    images: ["/assets/OG/og-aescape.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function Page() {
  return (
    <main>
      <AescapeContent />

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Aescape Robot Massage",
            provider: {
              "@type": "LocalBusiness",
              name: "Sway Wellness Spa",
              image: "https://swaywellnessspa.com/assets/OG/og-aescape.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "1430 Larimer St",
                addressLocality: "Denver",
                addressRegion: "CO",
                postalCode: "80202",
                addressCountry: "US",
              },
              telephone: "+1-303-476-6150", // 🔧 replace with real number
              url: "https://swaywellnessspa.com/aescape/",
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How does the Aescape massage work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Aescape is a fully interactive massage robot that adapts to your body and preferences. Before starting, you adjust the bolster, headrest, and armrest, then use the touchscreen (Aerview) to set pressure, target areas, music, and lighting.",
                },
              },
              {
                "@type": "Question",
                name: "Are there different massage programs to choose from?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Aescape at Sway offers programs focused on the upper body and glutes. Sessions run 15–60 minutes, with longer programs rolling out in the future.",
                },
              },
              {
                "@type": "Question",
                name: "Can I control the massage settings?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. You can control pressure, music, ambience, and visuals directly from the Aerview console. Preferences are saved for your next visit.",
                },
              },
              {
                "@type": "Question",
                name: "Is the Aescape massage experience safe?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Aescape includes real-time pressure sensors, emergency stop, and advanced safety logic. Guests should review contraindications before booking.",
                },
              },
              {
                "@type": "Question",
                name: "What steps do I need to take for an optimal massage experience?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Guests must wear Aerwear compression apparel (sizes 2XS–4XL provided) and tie up long hair for safety.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
