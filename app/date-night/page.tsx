"use client";

import Image from "next/image";
import Link from "next/link";

export default function DateNightPage() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Hero */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="/assets/homepage_photo_outside.jpg"
          alt="Sway Wellness Spa on Larimer Square — date night in Denver"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Date Night in Denver
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Start with a couples massage on Larimer Square. Finish with dinner
            steps away.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/locations/denver-larimer/book-service"
              className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Book a Couples Treatment
            </Link>
            <Link
              href="/gift-cards"
              className="inline-block border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              Gift a Date Night
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12 text-[17px] leading-relaxed">
        {/* Why Sway */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            The Easiest Date Night in Denver
          </h2>
          <p>
            Sway Wellness Spa is on Larimer Square — Denver&apos;s most iconic
            block. Book a couples{" "}
            <Link
              href="/massages"
              className="underline text-[#113D33] font-semibold"
            >
              massage
            </Link>{" "}
            or{" "}
            <Link
              href="/facials"
              className="underline text-[#113D33] font-semibold"
            >
              facial
            </Link>
            , walk out the front door, and you&apos;re surrounded by the best
            restaurants and cocktail bars in the city. No driving between stops.
            No planning headaches.
          </p>
          <p>
            Voted{" "}
            <Link
              href="/blog/best-day-spa-in-america"
              className="underline text-[#113D33] font-semibold"
            >
              #4 Best Day Spa in America
            </Link>{" "}
            by USA Today 10Best. Open Monday–Friday 10 AM–8 PM, Saturday 9 AM–6
            PM, Sunday 11 AM–6 PM.
          </p>
        </section>

        {/* Treatment Options */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">
            Couples Treatment Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-6 space-y-3">
              <h3 className="text-lg font-bold">Massage</h3>
              <p className="text-sm text-gray-700">
                Side-by-side 50-minute sessions. Choose from Basic, Deep Tissue,
                Salt Stone, Sports, Hot Stone, or CBD massage.
              </p>
              <p className="text-sm font-semibold">
                $89/person member · $129/person drop-in
              </p>
              <Link
                href="/locations/denver-larimer/book-service"
                className="inline-block text-[#113D33] font-semibold text-sm underline"
              >
                Book Massage
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-6 space-y-3">
              <h3 className="text-lg font-bold">Facial</h3>
              <p className="text-sm text-gray-700">
                50-minute facials for two. Options include Forever Young, Glow
                Getter, Pore Perfection, Sensitive Silk, and HydraFacial.
              </p>
              <p className="text-sm font-semibold">
                $99/person member · $139/person drop-in
              </p>
              <Link
                href="/locations/denver-larimer/book-service"
                className="inline-block text-[#113D33] font-semibold text-sm underline"
              >
                Book Facial
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-6 space-y-3">
              <h3 className="text-lg font-bold">Remedy Room</h3>
              <p className="text-sm text-gray-700">
                40-minute guided recovery circuit together: infrared sauna, cold
                plunge, Normatec compression, LED light therapy.
              </p>
              <p className="text-sm font-semibold">
                $25/person member · $49/person drop-in
              </p>
              <Link
                href="/locations/denver-larimer/book-remedy-room"
                className="inline-block text-[#113D33] font-semibold text-sm underline"
              >
                Book Remedy Room
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-6 space-y-3">
              <h3 className="text-lg font-bold">Aescape Robot Massage</h3>
              <p className="text-sm text-gray-700">
                AI-powered autonomous massage — 15, 30, 45, or 60 minutes. No
                conversation required (if that&apos;s your vibe).
              </p>
              <p className="text-sm font-semibold">Starting at $49</p>
              <Link
                href="/locations/denver-larimer/book-aescape"
                className="inline-block text-[#113D33] font-semibold text-sm underline"
              >
                Book Aescape
              </Link>
            </div>
          </div>
        </section>

        {/* Boost add-ons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Make It Extra</h2>
          <p>
            Add a{" "}
            <Link
              href="/treatments"
              className="underline text-[#113D33] font-semibold"
            >
              boost
            </Link>{" "}
            to any treatment — LED light therapy, microcurrent, oxygen infusion,
            scalp massage, and more. Members save 50% on all boosts.
          </p>
        </section>

        {/* Itinerary */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">
            Sample Date Night Itineraries
          </h2>
          <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
            <p className="font-bold text-lg">
              The Classic (Weekday Evening)
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                5:30 PM — Couples massage at{" "}
                <Link
                  href="/locations/denver-larimer/book-service"
                  className="underline text-[#113D33] font-semibold"
                >
                  Sway
                </Link>
              </li>
              <li>6:30 PM — Walk to dinner on Larimer Square (Rioja, Tamayo, or Corridor 44)</li>
              <li>8:30 PM — Cocktails at The Cooper Lounge at Union Station</li>
            </ol>
          </div>
          <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
            <p className="font-bold text-lg">
              The Weekend Reset
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                10:00 AM —{" "}
                <Link
                  href="/locations/denver-larimer/book-remedy-room"
                  className="underline text-[#113D33] font-semibold"
                >
                  Remedy Room
                </Link>{" "}
                recovery circuit (sauna + cold plunge)
              </li>
              <li>11:00 AM — Brunch at Rioja or The Dairy Block</li>
              <li>1:00 PM — Explore Larimer Square shops</li>
            </ol>
          </div>
          <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
            <p className="font-bold text-lg">
              The Low-Key First Date
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Try{" "}
                <Link
                  href="/aescape"
                  className="underline text-[#113D33] font-semibold"
                >
                  Aescape robot massage
                </Link>{" "}
                — unique, memorable, zero awkward small talk
              </li>
              <li>Walk to Dairy Block for dinner and drinks</li>
            </ol>
          </div>
        </section>

        {/* Gift Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Surprise Your Partner</h2>
          <p>
            <Link
              href="/gift-cards"
              className="underline text-[#113D33] font-semibold"
            >
              Sway gift cards
            </Link>{" "}
            are available in any amount and never expire. Give the gift of a date
            night they&apos;ll actually want — no guessing on size, color, or
            taste.
          </p>
        </section>

        {/* Membership */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Make Date Night a Habit</h2>
          <p>
            <Link
              href="/membership"
              className="underline text-[#113D33] font-semibold"
            >
              Sway memberships
            </Link>{" "}
            start at $99/month and include a monthly treatment, member pricing on
            every visit, 50% off boosts, and Remedy Room access. Two memberships
            means regular date nights at member prices.
          </p>
        </section>

        {/* Parking / Hours */}
        <section className="bg-[#113D33] text-white rounded-xl p-8 space-y-4">
          <h2 className="text-xl font-bold">Planning Your Visit</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">Hours</p>
              <p>Mon–Fri: 10 AM – 8 PM</p>
              <p>Saturday: 9 AM – 6 PM</p>
              <p>Sunday: 11 AM – 6 PM</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Location & Parking</p>
              <p>1428 Larimer St., Denver, CO 80202</p>
              <p>1st hour parking validated at Larimer Square Garage</p>
              <p>(303) 476-6150</p>
            </div>
          </div>
          <div className="pt-2">
            <Link
              href="/locations/denver-larimer/book"
              className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Book Your Date Night
            </Link>
          </div>
        </section>

        {/* First Visit Offer */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">First Time?</h2>
          <p>
            Denver-area locals get $40 off their first massage or facial — just
            $99 for a 50-minute treatment. Check out our{" "}
            <Link
              href="/locations/denver-larimer/offers"
              className="underline text-[#113D33] font-semibold"
            >
              current offers
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
