"use client";

import Image from "next/image";
import Link from "next/link";

export default function CouplesSpaPage() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Hero */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="/assets/homepage_photo_outside.jpg"
          alt="Couples spa experience at Sway Wellness Spa on Larimer Square"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Couples Spa in Denver
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Side-by-side massage, facials, and recovery — on Larimer Square.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/locations/denver-larimer/book"
              className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Book for Two
            </Link>
            <Link
              href="/gift-cards"
              className="inline-block border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              Gift Cards
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12 text-[17px] leading-relaxed">
        {/* Perfect For */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Perfect For Every Occasion</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              "Anniversaries",
              "Valentine\u2019s Day",
              "Birthdays",
              "Date Nights",
              "Engagements",
              "Just Because",
              "Mother\u2019s Day",
              "Honeymoons",
            ].map((occasion) => (
              <div
                key={occasion}
                className="bg-white rounded-xl border border-[#d7e2dc] p-4 text-center text-sm font-semibold"
              >
                {occasion}
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Couples Treatment Menu</h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Massage for Two</h3>
            <p>
              Book any two{" "}
              <Link
                href="/massages"
                className="underline text-[#113D33] font-semibold"
              >
                massage
              </Link>{" "}
              treatments at the same time for a side-by-side couples experience.
              You don&apos;t have to pick the same type — one of you can get a
              Deep Tissue while the other gets a Salt Stone.
            </p>
            <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#113D33] text-white">
                  <tr>
                    <th className="text-left p-3">Tier</th>
                    <th className="text-right p-3">Member</th>
                    <th className="text-right p-3">Drop-In</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#d7e2dc]">
                    <td className="p-3">Essential (50 min)</td>
                    <td className="p-3 text-right">$99/person</td>
                    <td className="p-3 text-right">$139/person</td>
                  </tr>
                  <tr className="border-t border-[#d7e2dc]">
                    <td className="p-3">Premier (70 min)</td>
                    <td className="p-3 text-right">$129/person</td>
                    <td className="p-3 text-right">$169/person</td>
                  </tr>
                  <tr className="border-t border-[#d7e2dc]">
                    <td className="p-3">Ultimate (90 min)</td>
                    <td className="p-3 text-right">$159/person</td>
                    <td className="p-3 text-right">$199/person</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Facials for Two</h3>
            <p>
              Side-by-side{" "}
              <Link
                href="/facials"
                className="underline text-[#113D33] font-semibold"
              >
                facials
              </Link>{" "}
              for a shared glow-up. 13 facial treatments across 3 tiers, from
              $99/person member · $139/person drop-in (Essential). Premier and
              Ultimate tiers also available.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Forever Young — anti-aging</li>
              <li>Glow Getter — brightening</li>
              <li>Pore Perfection — deep cleansing</li>
              <li>Sensitive Silk — calming</li>
              <li>And more across Premier and Ultimate tiers</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Remedy Room for Two</h3>
            <p>
              Experience the{" "}
              <Link
                href="/remedy-tech"
                className="underline text-[#113D33] font-semibold"
              >
                Remedy Room
              </Link>{" "}
              recovery circuit together — 40 minutes through{" "}
              <Link
                href="/sauna"
                className="underline text-[#113D33] font-semibold"
              >
                sauna
              </Link>
              ,{" "}
              <Link
                href="/cold-plunge"
                className="underline text-[#113D33] font-semibold"
              >
                cold plunge
              </Link>
              ,{" "}
              <Link
                href="/compression-therapy"
                className="underline text-[#113D33] font-semibold"
              >
                Normatec compression
              </Link>
              , and{" "}
              <Link
                href="/led-light-therapy"
                className="underline text-[#113D33] font-semibold"
              >
                LED light therapy
              </Link>
              . $25/person for members, $49/person for drop-ins.
            </p>
          </div>
        </section>

        {/* Enhance */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Add a Boost</h2>
          <p>
            Enhance any treatment with add-ons: LED light therapy, microcurrent
            lift, oxygen infusion, scalp massage, and more. Members save 50% on
            all{" "}
            <Link
              href="/treatments"
              className="underline text-[#113D33] font-semibold"
            >
              boosts
            </Link>
            .
          </p>
        </section>

        {/* CTA */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">
            Ready to Book?
          </p>
          <p className="text-sm opacity-90">
            Book two treatments at the same time for a couples experience. Walk-ins
            welcome, booking recommended.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/locations/denver-larimer/book"
              className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Book a Couples Treatment
            </Link>
            <Link
              href="/gift-cards"
              className="inline-block border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              Gift Cards
            </Link>
          </div>
        </div>

        {/* Membership */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Make It a Regular Thing</h2>
          <p>
            <Link
              href="/membership"
              className="underline text-[#113D33] font-semibold"
            >
              Memberships
            </Link>{" "}
            start at $99/month per person and include a monthly treatment,
            member pricing on every visit, 50% off boosts, and Remedy Room
            access. Two memberships = regular date nights at the best price.
          </p>
        </section>

        {/* Location Info */}
        <section className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
          <h2 className="text-xl font-bold">Visit Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Location</p>
              <p>1428 Larimer St., Denver, CO 80202</p>
              <p>On Larimer Square in downtown Denver</p>
              <p>(303) 476-6150</p>
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
