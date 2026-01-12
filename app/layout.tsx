import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  // Allows relative canonicals + OG URLs
  metadataBase: new URL("https://swaywellnessspa.com"),

  // Site-wide defaults (intentionally generic)
  title: {
    default: "Sway Wellness Spa",
    template: "%s | Sway Wellness Spa",
  },
  description:
    "Sway Wellness Spa is a modern wellness spa and club offering massage therapy, facials, recovery rituals, and technology-forward wellness experiences.",

  icons: {
    icon: "/assets/swaylogo3.png",
    apple: "/assets/swaylogo3.png",
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: "Sway Wellness Spa",
    title: "Sway Wellness Spa",
    description:
      "A modern wellness spa and club offering massage therapy, facials, recovery rituals, and innovative wellness experiences.",
    images: [
      {
        url: "/assets/homepage_photo_outside.png",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sway Wellness Spa",
    description:
      "Modern wellness spa and club offering massage therapy, facials, and recovery-focused experiences.",
    images: [{ url: "/assets/homepage_photo_outside.png" }],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#113D33",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />

        {/* Organization schema (site-wide, non-location specific) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sway Wellness Spa",
              url: "https://swaywellnessspa.com",
              logo: "https://swaywellnessspa.com/assets/swaylogo3.png",
            }),
          }}
        />

        {process.env.NODE_ENV === "production" && (
          <>
            {/* Google Tag Manager */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-KW4TK2DL');
                `,
              }}
            />

            {/* Bowtie AI Chat */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(t,i,o,n,w,a,e){
                    t["bowtieDataToken"]=w;
                    t[w]=t[w]||function(){
                      (t[w].i=t[w].i||[]).push(arguments)
                    };
                    t[w].o=1*new Date;
                    a=i.createElement(o);
                    e=i.getElementsByTagName(o)[0];
                    a.async=1;
                    a.src=n;
                    e.parentNode.insertBefore(a,e)
                  })(window,document,"script","https://s3.amazonaws.com/bowtie.ai/bowtieJS/bowtie_widget.js","sway_larimer_square");
                `,
              }}
            />

            {/* Google Ads */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17421817568"></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'AW-17421817568');
                `,
              }}
            />
          </>
        )}
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7F4E9] text-black font-vance`}
      >
        {process.env.NODE_ENV === "production" && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KW4TK2DL"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <NavBar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
