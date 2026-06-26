"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/* ---------------------------------------------
   LOCATION CONFIG
--------------------------------------------- */

const loc = {
  slug: "denver-rino",
  name: "Sway Wellness Spa · RiNo",
  shortName: "Sway RiNo",
  street: "3636 Blake St",
  city: "Denver",
  state: "CO",
  zip: "80205",
  neighborhood: "RiNo Art District",
  email: "contact@swayrino.com",
  heroImage: "/assets/rino1.jpeg",
  bookHref: "/locations/denver-rino/book",
  mapUrl: "https://www.google.com/maps?q=3636+Blake+St,+Denver,+CO+80205",
};

const FAQS = [
  {
    q: "Is this the old Upswell?",
    a: "Yes. We recently took over both Upswell locations and are now operating them as Sway Wellness Spa. Same recovery space, with new treatments and experiences coming this summer.",
  },
  {
    q: "What's included in the Sway Remedy Lounge?",
    a: "Access to the traditional dry sauna, infrared sauna cabins, cold plunge, compression therapy, and lounge.",
  },
  {
    q: "Do I need a membership?",
    a: "No. Drop-ins are welcome. Unlimited Sway Remedy Lounge memberships are available at an exclusive member rate. Ask in club or call us for details.",
  },
  {
    q: "When can I book a massage?",
    a: "Massage and facial treatments are coming this summer. Join our email list to be the first to know when booking opens.",
  },
  {
    q: "What about my Upswell membership?",
    a: "Existing Upswell members were carried over automatically, so no action is needed. Current members roll into Sway at the Founding rate.",
  },
];

/* ---------------------------------------------
   PAGE
--------------------------------------------- */

export default function SwayRinoPage() {
  useEffect(() => {
    localStorage.setItem(
      "sway_selected_location",
      JSON.stringify({
        slug: loc.slug,
        name: loc.shortName,
        city: loc.city,
        state: loc.state,
      })
    );
    document.cookie = `sway_loc=${loc.slug}; path=/; max-age=31536000`;
  }, []);

  return (
    <main className="bg-[#F7F4E9] text-[#113D33] font-vance">
      {/* ================================ HERO ================================ */}
      <section className="px-6 pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* LEFT */}
          <div>
            <div className="mb-3 text-xs tracking-wide uppercase opacity-70">
              Massage &amp; Recovery · RiNo, Denver
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
              {loc.name}
            </h1>

            <p className="mt-3 text-lg sm:text-xl font-medium">
              Formerly Upswell Studio. New ownership, same recovery space.
            </p>

            <p className="sr-only">
              Sway Wellness Spa RiNo is a recovery-led wellness club at 3636
              Blake St. in Denver&apos;s RiNo Art District, CO 80205, formerly
              Upswell Studio. The Sway Remedy Lounge is open daily with sauna,
              cold plunge, infrared, compression therapy, and lounge access.
              Massage and facial treatments are coming this summer. Memberships are available for unlimited Sway Remedy Lounge access. Existing Upswell members were
              carried over automatically.
            </p>

            {/* Open badge */}
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span>Sway Remedy Lounge open daily · Drop-ins welcome</span>
            </div>

            <p className="mt-5 text-base leading-relaxed max-w-lg opacity-90">
              A recovery-led wellness club in the heart of RiNo. Traditional and infrared saunas, cold plunge, and compression therapy in the Sway Remedy Lounge. Massage and facial treatments coming this summer.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={loc.bookHref}
                className="bg-[#113D33] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0c2a23] transition shadow-sm"
              >
                Book Your Experience
              </a>

              <Link
                href="/membership"
                className="border-2 border-[#113D33] text-[#113D33] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#113D33] hover:text-white transition"
              >
                Membership
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
                {loc.street}, {loc.city}, {loc.state} {loc.zip} <span className="sr-only">(opens in new tab)</span>
              </a>
              <span className="mx-2">·</span>
              <span>{loc.neighborhood}</span>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <Image
              src={loc.heroImage}
              alt="Cold plunge and recovery pool at Sway Wellness Spa RiNo"
              width={959}
              height={1640}
              priority
              className="rounded-3xl shadow-lg w-full h-[300px] sm:h-[360px] md:h-[460px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ========================= WHAT YOU CAN BOOK ========================= */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-black/10 bg-white/50 p-7 sm:p-10 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/assets/rino2.jpeg"
                  alt="Traditional sauna at Sway Wellness Spa RiNo"
                  width={1093}
                  height={1438}
                  className="w-full h-[240px] sm:h-[300px] md:h-[340px] object-cover"
                />
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider opacity-50 mb-2">
                  Open Daily
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
                  Sway Remedy Lounge
                </h2>
                <p className="text-sm sm:text-base leading-relaxed opacity-80 mb-5 max-w-md">
                  Traditional and infrared saunas, cold plunge, compression therapy, and lounge access.
                </p>
                <p className="text-sm sm:text-base font-medium mb-6">
                  Massage and facial treatments coming this summer.
                </p>
                <a
                  href={loc.bookHref}
                  className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#0c2a23] transition"
                >
                  Book Your Experience
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== UPSWELL MEMBER REASSURANCE ===================== */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl bg-[#113D33] text-white p-6 sm:p-8 md:p-10">
            <div className="text-xs uppercase tracking-wider text-white/60 mb-1.5">
              Current Upswell Members
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              You&apos;re already in.
            </h2>
            <p className="mt-2 text-white/80 text-sm sm:text-base max-w-2xl">
              Existing Upswell members were carried over to Sway automatically,
              so there&apos;s no action needed. Current members roll into Sway at
              their exclusive member rate for unlimited Sway Remedy Lounge access.
            </p>
          </div>
        </div>
      </section>

      {/* ======================= HOURS + LOCATION ========================= */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">Visit Us</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Hours */}
            <div className="border border-black/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Open daily for Sway Remedy Lounge sessions. Book online to see
                the times available this week.
              </p>
              <p className="text-xs opacity-60 mt-3">
                Regular and extended hours coming this summer.
              </p>
              <a
                href={loc.bookHref}
                className="inline-block mt-4 text-sm font-medium underline underline-offset-4"
              >
                See available times
              </a>
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
                {loc.neighborhood}. Walkable from the 38th &amp; Blake light
                rail station.
              </p>
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium underline underline-offset-4"
              >
                Get Directions <span className="sr-only">(opens in new tab)</span>
              </a>
            </div>

            {/* Contact */}
            <div className="border border-black/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              <p className="text-sm opacity-80 mb-3">
                Questions about your visit or membership?
              </p>
              <div className="space-y-2 text-sm">
                <a
                  href={`mailto:${loc.email}`}
                  className="block font-medium hover:underline"
                >
                  {loc.email}
                </a>
                <p className="text-xs opacity-60">A dedicated phone line is coming soon.</p>
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

          {FAQS.map((item) => (
            <details key={item.q} className="border-b border-black/10 py-4 group">
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
            Recover at Sway RiNo.
          </h3>
          <p className="text-white/75 max-w-lg mx-auto mb-7">
            Book a Sway Remedy Lounge recovery session. Traditional and infrared saunas, cold plunge, and compression therapy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={loc.bookHref}
              className="bg-white text-[#113D33] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
            >
              Book Your Experience
            </a>
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
