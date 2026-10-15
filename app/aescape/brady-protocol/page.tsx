// app/aescape/brady-protocol/page.tsx
//
// The Brady Protocol launch page (Aescape x Tom Brady, launched 2026-10-15,
// embargo 9 AM ET). Mindbody session type 2951, $69, booked through the
// existing Aescape flow via ?session=brady.
//
// COPY RULE (partner Terms): every sentence about the Brady Protocol, Tom
// Brady, or Alex Guerrero is Aescape's approved wording from the Partner
// Launch Social Playbook, used as written. Our own words are limited to
// practical facts (price, length, location, what to expect). Don't add new
// claims about Brady or the session without checking the Copy Guidelines.
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SwayCurve } from "../../components/SwayCurve";
import { LarimerParkingNote } from "../../components/LarimerParkingNote";
import { BRADY_BOOK_HREF } from "../../components/BradyProtocolBanner";

const URL = "https://swaywellnessspa.com/aescape/brady-protocol/";
const TITLE = "The Brady Protocol in Denver | Aescape at Sway Larimer";
const DESCRIPTION =
  "Introducing the Brady Protocol, a new 30-minute session co-developed by Tom Brady and Aescape. Now available at Sway Wellness Spa on Larimer Square in Denver. $69.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/assets/brady-protocol-hero.jpg",
        width: 1920,
        height: 1280,
        alt: "Tom Brady seated on the Aescape table",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/brady-protocol-hero.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const DETAILS = [
  { k: "Length", v: "30 minutes" },
  { k: "Price", v: "$69" },
  { k: "Where", v: "Sway Larimer, 1428 Larimer St., Denver" },
  { k: "What to wear", v: "Compression apparel, provided at check-in" },
];

const FAQS = [
  {
    q: "Where can I get the Brady Protocol in Denver?",
    a: "At Sway Wellness Spa on Larimer Square, 1428 Larimer St., Denver, CO 80202. You can book it online or call (303) 476-6150.",
  },
  {
    q: "How long is the Brady Protocol and how much is it?",
    a: "It's a 30-minute session and it's $69.",
  },
  {
    q: "What should I wear?",
    a: "Compression apparel is provided at check-in. Please arrive 15 minutes early so you have time to change and get set up on the table.",
  },
  {
    q: "Is there an age requirement?",
    a: "Aescape sessions, including the Brady Protocol, are for guests 18 and older.",
  },
];

export default function BradyProtocolPage() {
  return (
    <div className="w-full bg-[#F7F4E9] text-[#113D33] font-vance">
      {/* HERO: text left, photo right (no overlay on the photo) */}
      <section className="px-6 pt-28 sm:pt-32 md:pt-36 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#4A776D]">
              New at Sway Larimer · Aescape
            </p>
            <SwayCurve
              width={150}
              strokeWidth={2.2}
              animate
              className="text-[#4A776D]/85 block mt-5 mb-4"
            />
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.04]">
              Introducing the Brady Protocol.
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[#113D33]/80">
              Co-developed with seven-time Super Bowl champion Tom Brady and
              Aescape recovery experts, the Brady Protocol is a new 30-minute
              deep-tissue session powered by Adaptive Body Therapy, inspired by
              more than two decades of Brady&rsquo;s work with his longtime body
              coach, Alex Guerrero.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-[#113D33]/80">
              Combining deeper pressure, faster strokes, and purposeful
              repetition, the session targets accumulated tension from calves to
              traps to help the body feel looser, lighter, and ready for
              what&apos;s next.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={BRADY_BOOK_HREF}
                className="group relative inline-flex items-center justify-center rounded-full bg-[#113D33] text-white px-8 py-3.5 text-base font-semibold hover:bg-[#0d2f28] transition"
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
                  <SwayCurve width={40} strokeWidth={1.4} className="text-[#4A776D]" />
                </span>
                Book the Brady Protocol
              </Link>
              <span className="text-sm text-[#113D33]/65">30 min · $69</span>
            </div>
          </div>

          <div className="relative w-full aspect-[3/2] overflow-hidden rounded-3xl shadow-[0_18px_45px_-22px_rgba(17,61,51,0.28)]">
            <Image
              src="/assets/brady-protocol-hero.jpg"
              alt="Tom Brady seated on the Aescape table"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* APPROVED TAGLINE BAND */}
      <section className="bg-[#113D33] text-white px-6 py-14 md:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[#A9D2C5]">
            Aescape x Tom Brady
          </p>
          <SwayCurve
            width={120}
            strokeWidth={2}
            className="text-[#A9D2C5] mx-auto block mt-4 mb-5"
          />
          <p className="text-2xl md:text-4xl font-semibold tracking-tight leading-snug">
            For 23 seasons, Tom Brady made recovery part of the work, every day.
            Now that routine is yours.
          </p>
          <p className="mt-6 text-base md:text-lg text-white/80">
            Built for athletes. Built for everyday demands. Built for every body.
          </p>
          <p className="mt-2 text-base md:text-lg text-white/80">
            Now available at Sway Larimer.
          </p>
        </div>
      </section>

      {/* THE DETAILS (our facts) */}
      <section className="px-6 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            Book your session
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DETAILS.map((d) => (
              <div
                key={d.k}
                className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_-18px_rgba(17,61,51,0.18)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#4A776D]">
                  {d.k}
                </p>
                <p className="mt-2 font-semibold">{d.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-2xl mx-auto space-y-4">
            <p className="text-center text-[#113D33]/75">
              Please arrive 15 minutes early. New to Aescape?{" "}
              <Link href="/aescape/" className="underline underline-offset-4">
                Here&apos;s how a session works
              </Link>
              .
            </p>
            <LarimerParkingNote />
          </div>

          <div className="mt-10 text-center">
            <Link
              href={BRADY_BOOK_HREF}
              className="inline-flex items-center justify-center rounded-full bg-[#113D33] text-white px-8 py-3.5 text-base font-semibold hover:bg-[#0d2f28] transition"
            >
              Book the Brady Protocol
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            Questions
          </h2>
          <div className="mt-8 space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl bg-[#F7F4E9] p-5 md:p-6">
                <p className="font-semibold">{f.q}</p>
                <p className="mt-2 text-[#113D33]/75 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
                { "@type": "ListItem", position: 2, name: "Aescape", item: "https://swaywellnessspa.com/aescape/" },
                { "@type": "ListItem", position: 3, name: "The Brady Protocol", item: URL },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "The Brady Protocol",
              serviceType: "Robotic massage",
              description:
                "A new 30-minute deep-tissue session co-developed by Tom Brady and Aescape, powered by Adaptive Body Therapy.",
              url: URL,
              image: "https://swaywellnessspa.com/assets/brady-protocol-hero.jpg",
              provider: {
                "@type": "DaySpa",
                name: "Sway Wellness Spa Larimer",
                telephone: "+1-303-476-6150",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "1428 Larimer St.",
                  addressLocality: "Denver",
                  addressRegion: "CO",
                  postalCode: "80202",
                  addressCountry: "US",
                },
              },
              areaServed: { "@type": "City", name: "Denver" },
              offers: {
                "@type": "Offer",
                price: "69.00",
                priceCurrency: "USD",
                url: "https://swaywellnessspa.com/locations/denver-larimer/book-aescape/?session=brady",
                availability: "https://schema.org/InStock",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]),
        }}
      />
    </div>
  );
}
