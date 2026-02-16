"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

const TREATMENTS = [
  {
    title: "Massage",
    tagline: "Deep Tissue, Sports, CBD & more",
    description:
      "From deep tissue to CBD-infused recovery, every massage is customized to your body. 50 minutes of targeted relief.",
    price: "From $129",
    memberPrice: "From $89",
    image: "/assets/massage3.jpg",
    bookHref: "/locations/denver-larimer/book-service?category=massage",
    learnHref: "/massage",
  },
  {
    title: "Facials",
    tagline: "Forever Young, Glow Getter & more",
    description:
      "Results-driven facials with Eminence Organics and Dr. Dennis Gross — anti-aging, hydration, and deep pore care.",
    price: "From $129",
    memberPrice: "From $89",
    image: "/assets/facial5.jpg",
    bookHref: "/locations/denver-larimer/book-service?category=facial",
    learnHref: "/facials",
  },
  {
    title: "Remedy Room",
    tagline: "Sauna + cold plunge recovery",
    description:
      "Infrared sauna, cold plunge, red light therapy, and Normatec compression — all in one 40-minute recovery session.",
    price: "$49",
    memberPrice: "$25",
    image: "/assets/remedy-room2.jpg",
    bookHref: "/locations/denver-larimer/book-remedy-room",
    learnHref: "/remedy-tech",
  },
  {
    title: "Aescape Robot Massage",
    tagline: "AI-powered precision recovery",
    description:
      "Personalized pressure mapping, real-time muscle detection — the future of massage. Sessions from 15 to 60 minutes.",
    price: "From $49",
    memberPrice: null,
    image: "/assets/aescapeblog6.jpg",
    bookHref: "/locations/denver-larimer/book-aescape",
    learnHref: "/aescape",
  },
] as const;

/* ---------------------------------------------
   TIME HELPERS (MOUNTAIN TIME SAFE)
--------------------------------------------- */

function getDenverTimeParts() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    weekday: "short",
  }).formatToParts(new Date());

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return {
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    weekday: get("weekday"),
  };
}

function getOpenStatus() {
  const { hour, minute, weekday } = getDenverTimeParts();
  const mins = hour * 60 + minute;

  let opens = 0;
  let closes = 0;
  let labelOpen = "";

  if (["Mon", "Tue", "Wed", "Thu", "Fri"].includes(weekday)) {
    opens = 10 * 60;
    closes = 20 * 60;
    labelOpen = "10:00 AM";
  } else if (weekday === "Sat") {
    opens = 9 * 60;
    closes = 18 * 60;
    labelOpen = "9:00 AM";
  } else {
    opens = 11 * 60;
    closes = 18 * 60;
    labelOpen = "11:00 AM";
  }

  if (mins >= opens && mins < closes) {
    return { open: true, label: "Open now" };
  }

  return {
    open: false,
    label: `Closed · Opens at ${labelOpen}`,
  };
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
    <main className="bg-[#F7F4E9] text-[#113D33] font-vance">
      {/* ================================ HERO ================================ */}
      <section className="px-6 pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* LEFT */}
          <div>
            <div className="mb-3 text-xs tracking-wide uppercase opacity-70">
              Massage, Facials & Recovery — Larimer Square, Denver
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
              {loc.name}
            </h1>

            {status && (
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    status.open ? "bg-green-600" : "bg-red-500"
                  }`}
                />
                <span>{status.label}</span>
              </div>
            )}

            <p className="mt-5 text-base leading-relaxed max-w-lg opacity-90">
              A modern wellness club on historic Larimer Square — offering
              massage, facials, recovery, and technology-forward experiences
              designed for real life.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/locations/denver-larimer/book"
                className="bg-[#113D33] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0c2a23] transition shadow-sm"
              >
                Book Now
              </Link>

              <Link
                href="/locations/denver-larimer/membership"
                className="border-2 border-[#113D33] text-[#113D33] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#113D33] hover:text-white transition"
              >
                Join the Club — $99/mo
              </Link>
            </div>

            {/* ADDRESS */}
            <div className="mt-7 text-sm opacity-75 leading-relaxed">
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {loc.street}, {loc.city}, {loc.state} {loc.zip}
              </a>
              <span className="mx-2">·</span>
              <a href={`tel:${loc.phoneDigits}`} className="hover:underline">
                (303) 476-6150
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <Image
              src={loc.heroImage}
              alt="Sway Larimer wellness spa on Larimer Square in Denver"
              width={720}
              height={520}
              priority
              className="rounded-3xl shadow-lg w-full h-[300px] sm:h-[360px] md:h-[460px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ========================= FIRST VISIT OFFER ========================= */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/locations/denver-larimer/book"
            className="group block rounded-2xl bg-[#113D33] text-white p-6 sm:p-8 md:p-10 hover:bg-[#0c2a23] transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/60 mb-1.5">
                  First-Time Guest Offer
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  $40 Off Your First Visit
                </h2>
                <p className="mt-2 text-white/80 text-sm sm:text-base max-w-lg">
                  Enjoy a 50-minute massage or facial for just $99 (regularly
                  $139). No membership required.
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 bg-white text-[#113D33] px-6 py-3 rounded-full text-sm font-semibold group-hover:gap-3 transition-all">
                  Book Now
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================= TREATMENTS ========================= */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
            Our Services
          </h2>
          <p className="opacity-75 max-w-xl mb-10 md:mb-14">
            Massage, facials, and modern recovery — all under one roof in
            downtown Denver.
          </p>

          <div className="space-y-8 md:space-y-10">
            {TREATMENTS.map((t, i) => (
              <div
                key={t.title}
                className={`group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center ${
                  i % 2 !== 0 ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* IMAGE */}
                <div className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}>
                  <Link href={t.bookHref}>
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image
                        src={t.image}
                        alt={t.title}
                        width={640}
                        height={420}
                        className="w-full h-[240px] sm:h-[280px] md:h-[340px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {/* Price badge */}
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#113D33] text-xs font-semibold px-3 py-1.5 rounded-full">
                        {t.price}
                      </div>
                    </div>
                  </Link>
                </div>

                {/* TEXT */}
                <div className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}>
                  <div className="text-xs uppercase tracking-wider opacity-50 mb-2">
                    {t.tagline}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3">
                    {t.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed opacity-80 mb-4 max-w-md">
                    {t.description}
                  </p>

                  {/* Pricing line */}
                  <div className="flex items-baseline gap-3 mb-5 text-sm">
                    <span className="font-semibold">{t.price}</span>
                    {t.memberPrice && (
                      <>
                        <span className="opacity-40">|</span>
                        <span className="text-[#4A776D] font-semibold">
                          {t.memberPrice} for members
                        </span>
                      </>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={t.bookHref}
                      className="bg-[#113D33] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0c2a23] transition"
                    >
                      Book {t.title === "Aescape Robot Massage" ? "Aescape" : t.title}
                    </Link>
                    <Link
                      href={t.learnHref}
                      className="text-sm font-medium underline underline-offset-4 opacity-70 hover:opacity-100 transition"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== MEMBERSHIP TEASER ======================== */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl bg-[#113D33] text-white overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              {/* IMAGE */}
              <div className="relative h-[240px] md:h-full md:min-h-[380px]">
                <Image
                  src="/assets/membership_background_logo.jpg"
                  alt="Sway Wellness Club membership"
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-8 sm:p-10 md:p-12">
                <div className="text-xs uppercase tracking-wider text-white/50 mb-2">
                  The Sway Club
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                  $99/month. Cancel anytime.
                </h2>
                <ul className="space-y-2 text-sm text-white/80 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#9ABFB3]">✓</span>
                    Unlimited massages & facials at $99 each
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#9ABFB3]">✓</span>
                    50% off Boosts, Super Boosts & Remedy Room
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#9ABFB3]">✓</span>
                    Private lounge, bring-a-friend, rollover credits
                  </li>
                </ul>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/locations/denver-larimer/membership"
                    className="bg-white text-[#113D33] px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
                  >
                    View Memberships
                  </Link>
                  <a
                    href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium underline underline-offset-4 text-white/70 hover:text-white transition"
                  >
                    Join Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= HOURS + LOCATION ========================= */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
            Visit Us
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Hours */}
            <div className="border border-black/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <ul className="text-sm space-y-2 opacity-80">
                <li className="flex justify-between">
                  <span>Mon – Fri</span>
                  <span>10:00 AM – 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM – 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>11:00 AM – 6:00 PM</span>
                </li>
              </ul>
            </div>

            {/* Location */}
            <div className="border border-black/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Location</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-3">
                {loc.street}
                <br />
                {loc.city}, {loc.state} {loc.zip}
              </p>
              <p className="text-sm opacity-60 mb-4">
                Larimer Square, Downtown Denver
              </p>
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium underline underline-offset-4"
              >
                Get Directions
              </a>
            </div>

            {/* Contact */}
            <div className="border border-black/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm opacity-80 mb-3">
                Questions? We&apos;re here to help.
              </p>
              <div className="space-y-2">
                <a
                  href={`tel:${loc.phoneDigits}`}
                  className="flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  <svg
                    className="w-4 h-4 opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  (303) 476-6150
                </a>
                <Link
                  href="/locations/denver-larimer/book"
                  className="flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  <svg
                    className="w-4 h-4 opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Book Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= FAQ =============================== */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
            Frequently Asked Questions
          </h2>

          {[
            {
              q: "Where should I park when visiting Sway Larimer?",
              a: "Sway Larimer is located on Larimer Square in downtown Denver. Nearby parking garages and street parking are available throughout the area. We recommend allowing a few extra minutes during evenings and weekends.",
            },
            {
              q: "What makes Sway different from a traditional spa?",
              a: "Sway blends modern wellness technology — like AI-powered massage and infrared recovery — with traditional treatments in a calm, design-forward space built for consistency and real life.",
            },
            {
              q: "How do I book a massage or facial?",
              a: "You can book online through our website, by phone at (303) 476-6150, or walk in. We recommend booking ahead during evenings and weekends.",
            },
            {
              q: "Do I need a membership to book?",
              a: "No — anyone can book at Sway. Memberships start at $99/month and unlock savings on every visit, but they're completely optional.",
            },
            {
              q: "What is the Remedy Room?",
              a: "The Remedy Room is a 40-minute recovery circuit that includes infrared sauna, cold plunge, red light therapy, and Normatec compression — all for $49 per session ($25 for members).",
            },
            {
              q: "Is Sway Larimer walkable from Union Station?",
              a: "Yes. We're a short walk from Union Station and centrally located in Larimer Square.",
            },
            {
              q: "When should I arrive for my appointment?",
              a: "Please arrive about 15 minutes early to check in and settle into the space.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="border-b border-black/10 py-4 group"
            >
              <summary className="cursor-pointer font-medium flex items-center justify-between gap-4">
                <span>{item.q}</span>
                <svg
                  className="w-4 h-4 shrink-0 opacity-40 transition-transform duration-200 group-open:rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </summary>
              <p className="mt-3 text-sm opacity-80 leading-relaxed pr-8">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ========================== FINAL CTA ============================ */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto rounded-3xl bg-[#113D33] text-white p-10 sm:p-14 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Reset in the heart of Denver.
          </h3>
          <p className="text-white/75 max-w-lg mx-auto mb-7">
            Book your massage, facial, or recovery session at Sway Larimer on
            Larimer Square.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/locations/denver-larimer/book"
              className="bg-white text-[#113D33] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
            >
              Book Your Session
            </Link>
            <Link
              href="/gift-cards"
              className="border-2 border-white/40 text-white px-6 py-3 rounded-full text-sm font-semibold hover:border-white transition"
            >
              Gift Cards
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
