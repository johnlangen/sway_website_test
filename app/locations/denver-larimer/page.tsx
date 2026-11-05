"use client";

/**
 * Sway Larimer location page. Time is the organizing idea: LarimerTimePicker puts every session length
 * on one scale, LarimerHours shows the week on one clock, and the membership section draws drop-in and
 * member prices to scale. JSON-LD lives in layout.tsx and is unchanged by page design.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowMark from "@/app/components/ArrowMark";
import GoogleReviews, { ReviewBadge, ClassPassBadge } from "@/app/components/GoogleReviews";
import BookingPeek from "@/app/components/BookingPeek";
import { SwayCurve } from "@/app/components/SwayCurve";
import BradyProtocolBanner from "@/app/components/BradyProtocolBanner";
import { getOpenStatus } from "@/lib/larimerHours";
import LarimerHero from "./LarimerHero";
import LarimerHours from "./LarimerHours";
import LarimerTimePicker from "./LarimerTimePicker";

/* ---------------------------------------------
   LOCATION CONFIG
--------------------------------------------- */

const loc = {
  slug: "denver-larimer",
  name: "Sway Larimer",
  street: "1428 Larimer St.",
  city: "Denver",
  state: "CO",
  zip: "80202",
  phone: "+1 303-476-6150",
  phoneDigits: "13034766150",
  heroImage: "/assets/homepage_photo_outside.jpg",
  mapUrl: "https://www.google.com/maps?q=1428+Larimer+St,+Denver,+CO+80202",
};

/* ---------------------------------------------
   TREATMENTS
--------------------------------------------- */

const MASSAGE = {
  title: "Massage",
  tagline: "Deep Tissue, Sports, Salt Stone & more",
  description:
    "Licensed massage therapists and 13 massages, from our Signature (light to medium pressure) to Deep Tissue. Add boosts like cupping or PEMF.",
  minutes: "50, 70 or 90 min",
  price: "From $139",
  memberPrice: "From $99",
  image: "/assets/founding-massage-stone.jpg",
  alt: "A massage therapist working with a warm salt stone",
  bookHref: "/locations/denver-larimer/book/?category=massage",
  bookLabel: "Book a massage",
  learnHref: "/massages",
};

const FACIALS = {
  title: "Facials",
  tagline: "Forever Young, Glow Getter & more",
  description:
    "Clean, organic Eminence Organics skincare, plus dedicated Dr. Dennis Gross Vitamin C facials. Add LED, microcurrent, or oxygen infusion boosts.",
  minutes: "50 to 60 min",
  price: "From $139",
  memberPrice: "From $99",
  image: "/assets/facialExperiences.jpg",
  alt: "Skincare on a guest's cheek, seen through green leaves",
  bookHref: "/locations/denver-larimer/book/?category=facial",
  bookLabel: "Book a facial",
  learnHref: "/facials",
};

const REMEDY = {
  title: "Remedy Room",
  tagline: "Sauna + cold plunge recovery",
  description: "Four modalities in one guided circuit.",
  minutes: "40 min",
  price: "$49",
  memberPrice: "$25",
  image: "/assets/remedy-room.jpg",
  alt: "A guest in a robe under LED light therapy in the Remedy Room",
  bookHref: "/locations/denver-larimer/book-remedy-room",
  bookLabel: "Book the Remedy Room",
  learnHref: "/remedy-tech",
};

const AESCAPE = {
  title: "Aescape Robot Massage",
  tagline: "AI-powered precision recovery",
  description: "AI body mapping with dual robotic arms delivers personalized pressure and real-time muscle detection.",
  minutes: "15, 30, 45 or 60 min",
  price: "From $49",
  memberPrice: null as string | null,
  image: "/assets/aescapeblog6.jpg",
  alt: "Aescape robotic arms working on a guest's calf",
  bookHref: "/locations/denver-larimer/book-aescape",
  bookLabel: "Book Aescape",
  learnHref: "/aescape",
};

const REMEDY_STEPS = ["Sauna", "Cold plunge", "Compression", "LED"];

// Drawn to scale against the most expensive bar
const PRICE_SCALE = 139;
const SAVINGS = [
  { label: "Massage or facial", dropIn: 139, member: 99, note: "From, across 3 tiers" },
  { label: "Remedy Room", dropIn: 49, member: 25, note: "Per session" },
];

const VISIT_STEPS = [
  { title: "Park or walk", body: "Larimer Square Garage, 1422 Market St. We validate the 1st hour on weekdays. Or it's a short walk from Union Station." },
  { title: "Arrive 15 minutes early", body: "Check in and settle into the space." },
  { title: "Take your time", body: "Massage, facial, recovery, or all three." },
  { title: "Step back out on Larimer Square", body: "Dinner and drinks are right outside the door." },
];

const FAQS = [
            {
              q: "Where should I park when visiting Sway Larimer?",
              a: "Park at the Larimer Square Parking Garage, 1422 Market Street, open 24/7. The entrance is on Market Street, on the right as you pass 14th and Market. We validate the 1st hour on weekdays. Full rates are on our FAQ page.",
            },
            {
              q: "What makes Sway different from a traditional spa?",
              a: "Sway is a modern wellness club that combines expert-led massage and advanced facials with recovery technology: sauna, cold plunge, compression therapy, and AI-powered Aescape robot massage. Everything is under one roof and designed for consistent care, not one-off visits.",
            },
            {
              q: "How do I book a massage or facial?",
              a: "You can book online through our website, by phone at (303) 476-6150, or walk in. We recommend booking ahead during evenings and weekends.",
            },
            {
              q: "Do I need a membership to book?",
              a: "No, anyone can book at Sway. Memberships start at $99/month and unlock savings on every visit, but they're completely optional.",
            },
            {
              q: "What is the Remedy Room?",
              a: "The Remedy Room is a guided 40-minute recovery circuit combining sauna, cold plunge, compression therapy, and LED light therapy. It's $49 per session ($25 for members).",
            },
            {
              q: "Is Sway Larimer walkable from Union Station?",
              a: "Yes. We're a short walk from Union Station and centrally located in Larimer Square.",
            },
            {
              q: "When should I arrive for my appointment?",
              a: "Please arrive about 15 minutes early to check in and settle into the space.",
            },
];

function Service({
  s,
  aspect,
  sizes,
  children,
}: {
  s: typeof MASSAGE | typeof AESCAPE;
  aspect: string;
  sizes: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="group">
      <Link href={s.bookHref} tabIndex={-1} aria-hidden="true" className="block">
        <div className={`relative overflow-hidden rounded-[2px] ${aspect}`}>
          <Image src={s.image} alt={s.alt} fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />
        </div>
      </Link>
      <p className="sway-eyebrow mt-4 text-[#4A776D] md:mt-5">{s.tagline}</p>
      <h3 className="mt-1 text-[28px] leading-tight md:text-4xl">{s.title}</h3>
      <p className="mt-2 max-w-md text-[15px] leading-normal text-[#113D33]/85 md:text-base md:leading-relaxed">{s.description}</p>
      {children}
      <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 border-t border-[#113D33]/20 pt-3 text-sm">
        <div className="flex gap-1.5"><dt className="sr-only">Length</dt><dd>{s.minutes}</dd></div>
        <div className="flex gap-1.5"><dt className="sr-only">Drop-in price</dt><dd className="font-semibold">{s.price}</dd></div>
        {s.memberPrice && (
          <div className="flex gap-1.5"><dt className="sr-only">Member price</dt><dd className="text-[#2F5D50]">{s.memberPrice} for members</dd></div>
        )}
      </dl>
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 md:mt-4">
        <Link href={s.bookHref} className="sway-button w-full sm:w-auto">
          {s.bookLabel} <span aria-hidden="true"><ArrowMark /></span>
        </Link>
        <Link href={s.learnHref} className="sway-text-link">
          Learn more<span className="sr-only"> about {s.title}</span>
        </Link>
      </div>
    </article>
  );
}

/* ---------------------------------------------
   PAGE
--------------------------------------------- */

export default function SwayLarimerPage() {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(
    null
  );

  useEffect(() => {
    localStorage.setItem(
      "sway_selected_location",
      JSON.stringify({
        slug: loc.slug,
        name: loc.name,
        city: loc.city,
        state: loc.state,
      })
    );
    document.cookie = `sway_loc=${loc.slug}; path=/; max-age=31536000`;

    setStatus(getOpenStatus());
  }, []);

  return (
    <div className="club-founding bg-[#F7F4E9] text-[#113D33]">
      {/* ================================ HERO ================================ */}
      <section className="sway-page-hero bg-[#E9EDDF] pb-8 md:pb-10">
        <LarimerHero
          intro={
            <>
              <p className="sway-eyebrow text-[#2F5D50]">Massage, Facials &amp; Recovery · Larimer Square, Denver</p>
              <h1 className="mt-3 md:mt-4">{loc.name}</h1>
              <p className="sr-only">
              Sway Wellness Spa is located at 1428 Larimer St. on Larimer Square
              in downtown Denver, CO 80202. Voted #4 Best Day Spa in America by
              USA Today 10Best and Best U.S. Day Spa by TZR. Sway offers 13
              massage types across 3 tiers (from $99 member, $139 drop-in),
              11 facial treatments across 3 tiers using Eminence Organics and
              Dr. Dennis Gross (from $99 member, $139 drop-in), the Remedy Room
              40-minute recovery circuit with 4 modalities: sauna,
              cold plunge, compression therapy, and LED light therapy (from
              $25), and AI-powered Aescape robot massage (from $49, 15, 30, 45,
              or 60 min). 7 boost add-ons across services. Open Mon–Fri 10
              AM–8 PM, Sat 9 AM–6 PM, Sun 11 AM–6 PM. Memberships from
              $99/month. 1st hour parking validated on weekdays at Larimer Square Garage.
              Book at swaywellnessspa.com or call (303) 476-6150.
            </p>

              <div className="mt-2 flex min-h-6 items-center gap-2 text-sm md:mt-3">
                {status && (
                  <>
                    <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 rounded-full ${status.open ? "bg-[#D9822B] shadow-[0_0_10px_2px_rgba(217,130,43,0.6)]" : "bg-[#113D33]/35"}`} />
                    <span>{status.label}</span>
                  </>
                )}
              </div>
              <p className="mt-3 text-[15px] leading-snug text-[#113D33]/85 md:mt-4 md:text-base md:leading-normal">
                A modern wellness club on historic Larimer Square offering massage, facials, recovery, and technology-forward experiences designed for real life.
              </p>
            </>
          }
          actions={
            <>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="/locations/denver-larimer/book" className="sway-button">
                  Book Now <span aria-hidden="true"><ArrowMark /></span>
                </Link>
                <Link href="/locations/denver-larimer/membership" className="sway-button !bg-transparent !text-[#113D33] hover:!bg-[#113D33]/5">
                  Join the Club · $99/mo <span aria-hidden="true"><ArrowMark /></span>
                </Link>
              </div>
              <div className="mt-3">
                <BookingPeek />
              </div>
              <p className="mt-2 text-sm text-[#113D33]/85">
                <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {loc.street}, {loc.city}, {loc.state} {loc.zip} <span className="sr-only">(opens in new tab)</span>
                </a>
                <span aria-hidden="true" className="mx-2">·</span>
                <a href={`tel:${loc.phoneDigits}`} className="whitespace-nowrap hover:underline">(303) 476-6150</a>
              </p>
            </>
          }
        />

        {/* Proof, then the Brady news, as quiet lines that belong to the hero */}
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-x-8 gap-y-2 border-t border-[#113D33]/20 pt-4 text-sm md:flex-row md:items-center md:justify-between">
            <a
              href="https://10best.usatoday.com/awards/sway-denver-colorado/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Voted #4 Best Day Spa in America · USA Today 10Best <span className="sr-only">(opens in new tab)</span>
            </a>
            <ReviewBadge />
            <ClassPassBadge />
          </div>
          <div className="mt-4 border-t border-[#113D33]/20 pt-4">
            <BradyProtocolBanner quiet />
          </div>
        </div>
      </section>

      {/* ========================= FIRST VISIT OFFER: a ticket with a tear line ========================= */}
      <section className="py-10 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Link href="/locations/denver-larimer/book" className="group relative grid overflow-hidden rounded-[4px] bg-[#EBE4D1] md:grid-cols-[minmax(0,1fr)_260px]">
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-8 md:p-10">
              <p className="cf-num shrink-0 text-7xl md:text-8xl">$99</p>
              <div>
                <p className="sway-eyebrow text-[#2F5D50]">For Our Denver Neighbors</p>
                <h2 className="mt-1 text-2xl leading-tight md:text-4xl">$99 First Visit Massage or Facial</h2>
                <p className="mt-2 max-w-xl text-sm leading-snug text-[#113D33]/85 md:text-base">
                  Regularly $139. Same $40 off every tier: Premier $129, Ultimate $159. Mon-Fri. Locals only, first-time guests.
                </p>
              </div>
            </div>
            <div className="relative flex items-center justify-between gap-4 border-t-2 border-dashed border-[#113D33]/30 p-6 md:flex-col md:items-start md:justify-center md:border-l-2 md:border-t-0 md:p-8">
              {/* The notches where a ticket tears */}
              <span aria-hidden="true" className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[#F7F4E9] md:-left-3 md:-top-3" />
              <span aria-hidden="true" className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-[#F7F4E9] md:-bottom-3 md:-left-3 md:right-auto md:top-auto" />
              <div>
                <p className="text-xs text-[#113D33]/80">Use code</p>
                <p className="cf-num mt-1 text-3xl md:text-4xl">FTVO40</p>
              </div>
              <span className="inline-flex items-center gap-3 text-sm font-semibold">
                Book Now
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1"><ArrowMark /></span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================= HOW MUCH TIME ========================= */}
      <LarimerTimePicker />

      {/* ========================= THE FOUR SERVICES ========================= */}
      <section className="py-12 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-12 md:gap-x-10 md:gap-y-24">
            <div className="md:col-span-5">
              <Service s={MASSAGE} aspect="aspect-[16/10] md:aspect-[4/5]" sizes="(min-width: 768px) 460px, 100vw" />
            </div>
            <div className="md:col-span-6 md:col-start-7 md:mt-32">
              <Service s={FACIALS} aspect="aspect-[16/10] md:aspect-[3/2]" sizes="(min-width: 768px) 560px, 100vw" />
            </div>
            <div className="md:col-span-7">
              <Service s={REMEDY} aspect="aspect-[16/10] md:aspect-[3/2]" sizes="(min-width: 768px) 660px, 100vw">
                {/* The circuit is a sequence, so it reads as one */}
                <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
                  {REMEDY_STEPS.map((step, i) => (
                    <li key={step} className="flex items-center gap-1.5">
                      <span className="rounded-full border border-[#113D33]/30 px-3 py-1">{step}</span>
                      {i < REMEDY_STEPS.length - 1 && <span aria-hidden="true" className="scale-75 opacity-70"><ArrowMark /></span>}
                    </li>
                  ))}
                </ol>
              </Service>
            </div>
            <div className="md:col-span-4 md:col-start-9 md:mt-20">
              <Service s={AESCAPE} aspect="aspect-[16/10] md:aspect-square" sizes="(min-width: 768px) 360px, 100vw" />
            </div>
          </div>

          <p className="mt-10 border-t border-[#113D33]/20 pt-4 text-[15px] md:mt-20 md:text-base">
            Planning a celebration? See our{" "}
            <Link href="/blog/bachelorette-spa-day" className="underline underline-offset-4">
              bachelorette and group spa packages
            </Link>{" "}
            or{" "}
            <Link href="/group-events" className="underline underline-offset-4">
              plan a group event
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ======================== REVIEWS ======================== */}
      <section className="bg-[#EBE4D1] py-12 md:py-24">
        <GoogleReviews />
      </section>

      {/* ======================== MEMBERSHIP: the math, to scale ======================== */}
      <section className="bg-[#113D33] py-12 text-white md:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center">
          <div>
            <p className="sway-eyebrow text-[#D7E5DD]">Membership</p>
            <h2 className="cf-num mt-3 text-[64px] md:mt-4 md:text-8xl">$99/month.</h2>
            <ul className="mt-5 space-y-2 text-[15px] text-white/90 md:mt-7 md:text-base">
              <li>Massages &amp; facials from $99 across 3 tiers</li>
              <li>50% off Boosts, Super Boosts &amp; Remedy Room</li>
              <li>Private lounge, bring-a-friend, rollover credits</li>
            </ul>
            <Link href="/locations/denver-larimer/membership" className="sway-button sway-button-light mt-6 w-full sm:w-auto md:mt-8">
              View Memberships <span aria-hidden="true"><ArrowMark /></span>
            </Link>
          </div>
          <div className="space-y-7 md:space-y-9">
            {SAVINGS.map((row) => (
              <div key={row.label}>
                <p className="flex items-baseline justify-between gap-3">
                  <span className="cf-label text-lg md:text-xl">{row.label}</span>
                  <span className="text-xs text-white/75">{row.note}</span>
                </p>
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex h-10 items-center rounded-[2px] bg-white/15 px-3 text-sm" style={{ width: `${(row.dropIn / PRICE_SCALE) * 100}%`, minWidth: "148px" }}>
                    Drop-in ${row.dropIn}
                  </div>
                  <div className="flex h-10 items-center rounded-[2px] bg-[#A9D2C5] px-3 text-sm font-semibold text-[#113D33]" style={{ width: `${(row.member / PRICE_SCALE) * 100}%`, minWidth: "148px" }}>
                    Member ${row.member}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= HOURS + YOUR VISIT ========================= */}
      <section className="py-12 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-[38px] leading-[1.05] md:text-6xl">Visit us</h2>
          <div className="mt-6 grid gap-10 md:mt-12 md:gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              <h3 className="text-xl md:text-2xl">Hours</h3>
              <div className="mt-3 md:mt-4">
                <LarimerHours />
              </div>
              <div className="mt-6 grid gap-x-8 gap-y-1 border-t border-[#113D33]/20 pt-4 text-sm sm:grid-cols-3">
                <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center underline underline-offset-4">
                  Get Directions <span className="sr-only">(opens in new tab)</span>
                </a>
                <a href={`tel:${loc.phoneDigits}`} className="flex min-h-11 items-center underline underline-offset-4">(303) 476-6150</a>
                <Link href="/faq/larimer" className="flex min-h-11 items-center underline underline-offset-4">Parking details</Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl">Your visit</h3>
              <ol className="mt-3 md:mt-4">
                {VISIT_STEPS.map((step, i) => (
                  <li key={step.title} className="relative pb-5 pl-7 last:pb-0">
                    {i < VISIT_STEPS.length - 1 && (
                      <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-3 border-l-2 border-dotted border-[#113D33]/35" />
                    )}
                    <span aria-hidden="true" className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-[#113D33]" />
                    <p className="cf-label text-base md:text-lg">{step.title}</p>
                    <p className="mt-0.5 text-[15px] leading-snug text-[#113D33]/85">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= FAQ =============================== */}
      <section className="bg-[#EBE4D1] py-12 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 md:gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <h2 className="text-[32px] leading-[1.1] md:text-5xl">Frequently Asked Questions</h2>
          <div>
            {FAQS.map((item) => (
              <details key={item.q} className="group border-t border-[#113D33]/25 py-1 last:border-b">
                <summary className="cf-label flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-2 text-base md:min-h-14 md:py-3 md:text-lg [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="text-2xl leading-none transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-4 text-[15px] leading-normal text-[#113D33]/85 md:pb-5 md:text-base md:leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== FINAL CTA ============================ */}
      <section className="bg-[#113D33] py-14 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SwayCurve width={160} strokeWidth={2} animate className="mb-5 block text-[#A9D2C5] md:mb-8" />
          <h2 className="max-w-3xl text-[40px] leading-[1.05] md:text-7xl">Reset in the heart of Denver.</h2>
          <p className="mt-3 max-w-lg text-base text-white/85 md:mt-5 md:text-lg">
            Book your massage, facial, or recovery session at Sway Larimer on Larimer Square.
          </p>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-2 sm:flex-row sm:items-center md:mt-8">
            <Link href="/locations/denver-larimer/book" className="sway-button sway-button-light">
              Book Your Session <span aria-hidden="true"><ArrowMark /></span>
            </Link>
            <Link href="/gift-cards" className="sway-text-link self-start sm:self-auto">Gift Cards</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
