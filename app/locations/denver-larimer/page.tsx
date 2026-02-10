"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
    weekday: get("weekday"), // Mon, Tue, etc
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
    label: `Closed • Opens at ${labelOpen}`,
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
      {/* -------------------------------- HERO -------------------------------- */}
      <section className="px-6 pt-24 sm:pt-28 md:pt-36 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            <div className="mb-3 text-xs tracking-wide uppercase opacity-70">
              Massage, Facials & Recovery in Downtown Denver
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight">
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
              A modern wellness club on historic Larimer Square — offering massage,
              facials, recovery, and personalized experiences designed for real life.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href="/locations/denver-larimer/book"
                className="bg-[#113D33] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#0c2a23] transition"
              >
                Book Now
              </Link>

              <Link
                href="/membership"
                className="text-sm underline underline-offset-4 hover:opacity-70"
              >
                Join the Club
              </Link>

              <Link
                href="/gift-cards"
                className="text-sm underline underline-offset-4 hover:opacity-70"
              >
                Gift Cards
              </Link>
            </div>

            {/* ADDRESS */}
            <div className="mt-7 text-sm opacity-80 leading-relaxed">
              <div>{loc.street}</div>
              <div>
                {loc.city}, {loc.state} {loc.zip}
              </div>
              <a href={`tel:${loc.phoneDigits}`} className="underline">
                {loc.phone}
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <img
              src={loc.heroImage}
              alt="Sway Larimer wellness spa interior in Larimer Square, Denver"
              className="rounded-3xl shadow-lg w-full h-[300px] sm:h-[360px] md:h-[460px] object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* -------------------------- SERVICES --------------------------- */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Services at Sway Larimer
          </h2>
          <p className="mt-3 opacity-80 max-w-xl">
            Massage, facials, and modern recovery — all under one roof in downtown Denver.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Massage",
                desc: "Deep relief or pure relaxation.",
                href: "/massage",
              },
              {
                title: "Facials",
                desc: "Results-driven, customized care.",
                href: "/facials",
              },
              {
                title: "Remedy Room",
                desc: "Sauna, cold plunge, LED.",
                href: "/remedy-tech",
              },
              {
                title: "Aescape",
                desc: "Personalized robot massage.",
                href: "/aescape",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-black/10 p-6 hover:border-[#113D33]/40 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm opacity-75">{item.desc}</p>
                <span className="mt-4 inline-block text-sm underline underline-offset-4">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- HOURS + DETAILS ---------------------------- */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="border border-black/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3">Hours</h3>
            <ul className="text-sm space-y-1 opacity-80">
              <li>Mon–Fri: 10:00 AM – 8:00 PM</li>
              <li>Saturday: 9:00 AM – 6:00 PM</li>
              <li>Sunday: 11:00 AM – 6:00 PM</li>
            </ul>
          </div>

          <div className="border border-black/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3">Location Details</h3>
            <ul className="text-sm space-y-2 opacity-80">
              <li>Larimer Square, Downtown Denver</li>
              <li>
                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  View on Google Maps
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href={`tel:${loc.phoneDigits}`} className="underline">
                  {loc.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ----------------------------- FAQ ------------------------------ */}
      <section className="px-6 pb-28">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
            Frequently Asked Questions
          </h2>

          {[
            {
              q: "Where should I park when visiting Sway Larimer?",
              a: "Sway Larimer is located on Larimer Square in downtown Denver. Nearby parking garages and street parking are available throughout the area. We recommend allowing a few extra minutes during evenings and weekends."
            },            
            {
              q: "What makes Sway Larimer different?",
              a: "Sway blends modern wellness technology with traditional treatments in a calm, urban setting designed for consistency and real life.",
            },
            {
              q: "How do I book a massage or facial?",
              a: "You can book online, by phone, or walk in. We recommend booking ahead during evenings and weekends.",
            },
            {
              q: "Is Sway Larimer walkable from Union Station?",
              a: "Yes. We’re a short walk from Union Station and centrally located in Larimer Square.",
            },
            {
              q: "When should I arrive?",
              a: "Please arrive about 15 minutes early to check in and settle into the space.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="border-b border-black/10 py-4"
            >
              <summary className="cursor-pointer font-medium">
                {item.q}
              </summary>
              <p className="mt-3 text-sm opacity-80">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ----------------------------- FINAL CTA ------------------------------ */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto rounded-3xl border border-black/10 p-10 sm:p-12 text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Reset in the heart of Denver.
          </h3>
          <p className="mt-3 opacity-80">
            Book your massage, facial, or recovery session at Sway Larimer.
          </p>

          <div className="mt-6">
            <Link
              href="/locations/denver-larimer/book"
              className="inline-block bg-[#113D33] text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-[#0c2a23] transition"
            >
              Book Your Session
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
