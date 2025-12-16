"use client";

import Head from "next/head";
import Link from "next/link";

export default function SwayGeorgetownComingSoonPage() {
  const loc = {
    name: "Sway Georgetown",
    city: "Washington",
    state: "DC",
    url: "https://swaywellnessspa.com/locations/georgetown",
    heroImage: "/assets/SWAY.jpg",
    sameAs: [
      "https://www.instagram.com/swaywelnessspa",
      "https://www.tiktok.com/@swaywelnessspa",
      "https://www.facebook.com/swaywelnessspa",
    ],
  };

  // LocalBusiness JSON-LD
  const localBizJsonLd = {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    name: loc.name,
    url: loc.url,
    image: [`https://swaywellnessspa.com${loc.heroImage}`],
    priceRange: "$$",
    sameAs: loc.sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: loc.city,
      addressRegion: loc.state,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: "Washington",
      address: { "@type": "PostalAddress", addressRegion: "DC", addressCountry: "US" },
    },
  };

  // Breadcrumbs
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://swaywellnessspa.com/locations" },
      { "@type": "ListItem", position: 3, name: "Georgetown — Coming Soon" },
    ],
  };

  // FAQ JSON-LD
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When is Sway Georgetown opening?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We’re coming soon to Georgetown. Final opening date will be announced here.",
        },
      },
      {
        "@type": "Question",
        name: "Where in DC will Sway be located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The final address will be announced soon.",
        },
      },
      {
        "@type": "Question",
        name: "Can I join as a founding member now?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Founding Member details will be shared closer to opening.",
        },
      },
      {
        "@type": "Question",
        name: "Will gift cards purchased now work in Georgetown?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sway gift cards are valid at participating Sway locations. Georgetown redemption begins when we open.",
        },
      },
    ],
  };

  return (
    <main className="bg-[#F7F4E9] text-[#113D33] min-h-screen font-vance">
      <Head>
        <title>Sway Georgetown – Coming Soon | Wellness Club in Washington, DC</title>
        <meta
          name="description"
          content="Sway Wellness Spa is coming to Georgetown in Washington, DC. Targeted facials, deeply effective massage, and the Remedy Room—launch details coming soon."
        />
        <link rel="canonical" href={loc.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sway Georgetown – Coming Soon | Wellness Club in Washington, DC" />
        <meta
          property="og:description"
          content="Monthly rituals and science-backed recovery—coming soon to Georgetown, Washington, DC."
        />
        <meta property="og:url" content={loc.url} />
        <meta property="og:image" content={`https://swaywellnessspa.com${loc.heroImage}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sway Georgetown – Coming Soon | Wellness Club in Washington, DC" />
        <meta
          name="twitter:description"
          content="Facials, massage, and the Remedy Room—Georgetown opening details coming soon."
        />
        <meta name="twitter:image" content={`https://swaywellnessspa.com${loc.heroImage}`} />

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>

      {/* Hero / Header */}
      <section className="px-6 pt-28 md:pt-36 pb-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">Sway Georgetown</h1>
            <div className="mt-3 text-lg">
              <div>Washington, DC</div>
              <div className="mt-3">
                <span
                  className="inline-block rounded-full px-3 py-1 text-sm shadow"
                  style={{ backgroundColor: "#113D33", color: "#b6cfbf" }}
                >
                  Coming Soon
                </span>
              </div>

              <p className="mt-4 max-w-xl leading-relaxed">
                <strong>Sway Georgetown</strong> is on the way. We’re bringing targeted facials,
                deeply effective massage, and the <strong>Remedy Room</strong> (cold plunge, sauna, LED)
                to one of DC’s favorite neighborhoods.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/treatments"
                className="inline-block bg-[#113D33] text-white px-5 py-3 rounded-full hover:opacity-90"
              >
                Explore Treatments
              </Link>
            </div>

            <div className="mt-6 text-sm">
              <h3 className="text-base font-bold mb-2">What’s coming to Sway Georgetown</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <Link href="/facials" className="underline">
                    Targeted Facials
                  </Link>{" "}
                  (Pore Perfection, Forever Young, Vitamin C)
                </li>
                <li>
                  <Link href="/massages" className="underline">
                    Massage
                  </Link>{" "}
                  (Deep Tissue, Sports, CBD, Salt Stone)
                </li>
                <li>
                  <Link href="/remedy-tech" className="underline">
                    The Remedy Room
                  </Link>{" "}
                  (cold plunge, sauna, LED, lymphatic, compression)
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow border border-black/5 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={loc.heroImage}
              alt="Sway Georgetown coming soon — wellness club concept"
              className="w-full h-[320px] md:h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-bold mb-3">Opening Plans</h2>
            <p className="text-sm">
              Final address and opening date will be announced here. Follow along as we get closer to welcoming our
              first guests in Georgetown.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow md:col-span-2">
            <h2 className="text-xl font-bold mb-4">FAQs</h2>
            <details className="mb-3">
              <summary className="font-semibold">When is Sway Georgetown opening?</summary>
              <p className="mt-2 text-sm">We’ll share the opening date soon. Check back here for updates.</p>
            </details>
            <details className="mb-3">
              <summary className="font-semibold">Where will Sway Georgetown be located?</summary>
              <p className="mt-2 text-sm">The final address is coming soon.</p>
            </details>
            <details className="mb-3">
              <summary className="font-semibold">Can I become a founding member now?</summary>
              <p className="mt-2 text-sm">Founding Member details will be posted closer to opening.</p>
            </details>
            <details>
              <summary className="font-semibold">Are gift cards valid in Georgetown?</summary>
              <p className="mt-2 text-sm">
                Yes—Sway gift cards work at participating Sway locations. Georgetown redemption begins when we open.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
