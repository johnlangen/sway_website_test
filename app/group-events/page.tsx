"use client";

import Image from "next/image";
import Link from "next/link";

export default function GroupEventsPage() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Hero */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="/assets/homepage_photo_outside.jpg"
          alt="Group spa event at Sway Wellness Spa on Larimer Square in Denver"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Group Events &amp; Spa Parties
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Bachelorettes, birthdays, team outings, and celebrations —
            on Larimer Square.
          </p>
          <div className="mt-8">
            <a
              href="mailto:contact@swaywellnessspa.com?subject=Group Event Inquiry"
              className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Inquire About Group Events
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12 text-[17px] leading-relaxed">
        {/* Event Types */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Events We Host</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-6 space-y-3">
              <h3 className="text-lg font-bold">Bachelorette Parties</h3>
              <p className="text-sm text-gray-700">
                Treat the bridal crew to massages, facials, or the Remedy Room
                recovery circuit. Then walk straight to Larimer Square&apos;s
                best restaurants and bars. Read our{" "}
                <Link
                  href="/blog/bachelorette-spa-day"
                  className="underline text-[#113D33] font-semibold"
                >
                  bachelorette planning guide
                </Link>
                .
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-6 space-y-3">
              <h3 className="text-lg font-bold">Birthday Celebrations</h3>
              <p className="text-sm text-gray-700">
                Give the birthday person what they actually want: a spa day with
                friends. Choose from{" "}
                <Link
                  href="/massages"
                  className="underline text-[#113D33] font-semibold"
                >
                  massage
                </Link>
                ,{" "}
                <Link
                  href="/facials"
                  className="underline text-[#113D33] font-semibold"
                >
                  facials
                </Link>
                , and{" "}
                <Link
                  href="/aescape"
                  className="underline text-[#113D33] font-semibold"
                >
                  Aescape robot massage
                </Link>
                .
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-6 space-y-3">
              <h3 className="text-lg font-bold">Corporate Wellness</h3>
              <p className="text-sm text-gray-700">
                Team outings, offsite wellness days, and employee appreciation
                events. Sway offers massage, facials, recovery tech, and a
                modern space on Larimer Square — pair with a team dinner nearby.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-6 space-y-3">
              <h3 className="text-lg font-bold">Friends &amp; Family</h3>
              <p className="text-sm text-gray-700">
                No occasion needed. Grab your people, book treatments, and spend
                the afternoon on Larimer Square. The{" "}
                <Link
                  href="/remedy-tech"
                  className="underline text-[#113D33] font-semibold"
                >
                  Remedy Room
                </Link>{" "}
                is great for groups — sauna, cold plunge, and recovery tech at
                just $25/person for members.
              </p>
            </div>
          </div>
        </section>

        {/* What's Available */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">What Your Group Can Book</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="bg-[#113D33] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                1
              </span>
              <div>
                <p className="font-semibold">
                  <Link
                    href="/massages"
                    className="underline text-[#113D33]"
                  >
                    Massage
                  </Link>
                </p>
                <p className="text-sm text-gray-700">
                  50–90 min · From $99/person member · $139/person drop-in
                  (Essential). Premier and Ultimate tiers available.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#113D33] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </span>
              <div>
                <p className="font-semibold">
                  <Link
                    href="/facials"
                    className="underline text-[#113D33]"
                  >
                    Facials
                  </Link>
                </p>
                <p className="text-sm text-gray-700">
                  30–60 min · From $99/person member · $139/person drop-in
                  (Essential). 13 treatments across 3 tiers.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#113D33] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                3
              </span>
              <div>
                <p className="font-semibold">
                  <Link
                    href="/remedy-tech"
                    className="underline text-[#113D33]"
                  >
                    Remedy Room
                  </Link>
                </p>
                <p className="text-sm text-gray-700">
                  40 min circuit · $25 member / $49 drop-in · Sauna, cold
                  plunge, Normatec, LED
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#113D33] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                4
              </span>
              <div>
                <p className="font-semibold">
                  <Link
                    href="/aescape"
                    className="underline text-[#113D33]"
                  >
                    Aescape Robot Massage
                  </Link>
                </p>
                <p className="text-sm text-gray-700">
                  30 or 60 min · Starting at $49 · AI-powered autonomous massage
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#113D33] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                +
              </span>
              <div>
                <p className="font-semibold">
                  <Link
                    href="/treatments"
                    className="underline text-[#113D33]"
                  >
                    Boosts
                  </Link>
                </p>
                <p className="text-sm text-gray-700">
                  Add LED, microcurrent, oxygen infusion, scalp massage — members
                  save 50%
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">Plan Your Group Event</p>
          <p className="text-sm opacity-90">
            Contact us to coordinate group bookings, timing, and treatment
            selection. We&apos;ll handle the logistics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:contact@swaywellnessspa.com?subject=Group Event Inquiry"
              className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Email Us
            </a>
            <a
              href="tel:+13034766150"
              className="inline-block border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              Call (303) 476-6150
            </a>
          </div>
        </div>

        {/* Gift Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Gift Cards for Your Group</h2>
          <p>
            <Link
              href="/gift-cards"
              className="underline text-[#113D33] font-semibold"
            >
              Sway gift cards
            </Link>{" "}
            are available in any amount and never expire. Buy them for your
            group so everyone can book their own preferred treatment and time.
          </p>
        </section>

        {/* After the Spa */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">After the Spa</h2>
          <p>
            Sway is on{" "}
            <Link
              href="/locations/denver-larimer"
              className="underline text-[#113D33] font-semibold"
            >
              Larimer Square
            </Link>{" "}
            — Denver&apos;s best block for dining and nightlife. Walk out the
            front door and your group is steps from Rioja, Tamayo, Corridor 44,
            and more. No rideshare coordination needed.
          </p>
          <p>
            Read our guide to{" "}
            <Link
              href="/blog/things-to-do-in-denver-at-night"
              className="underline text-[#113D33] font-semibold"
            >
              things to do in Denver at night
            </Link>{" "}
            for more ideas on where to go after.
          </p>
        </section>

        {/* Location Info */}
        <section className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
          <h2 className="text-xl font-bold">Location &amp; Hours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Location</p>
              <p>1428 Larimer St., Denver, CO 80202</p>
              <p>On Larimer Square in downtown Denver</p>
              <p>(303) 476-6150</p>
              <p>contact@swaywellnessspa.com</p>
            </div>
            <div>
              <p className="font-semibold">Hours</p>
              <p>Mon–Fri: 10 AM – 8 PM</p>
              <p>Saturday: 9 AM – 6 PM</p>
              <p>Sunday: 11 AM – 6 PM</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            1st hour parking validated at Larimer Square Garage (1422 Market St.)
          </p>
        </section>
      </div>
    </div>
  );
}
