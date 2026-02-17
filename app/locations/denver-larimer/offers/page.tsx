// app/locations/denver-larimer/offers/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function LarimerOffersPage() {
  return (
    <main className="min-h-screen font-vance bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a] text-white">
      {/* HERO */}
      <section className="px-6 pt-28 md:pt-36 pb-8 text-center max-w-5xl mx-auto">
        <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#9ABFB3] mb-4">
          Sway Larimer — Denver, CO
        </p>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Offers &amp; Pricing
        </h1>

        <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto">
          Introductory pricing, memberships, and recovery sessions at Sway
          Wellness Spa in Larimer Square.
        </p>
      </section>

      {/* OFFER CARDS */}
      <section className="px-4 sm:px-6 pt-10 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {/* Remedy Room */}
          <div className="relative bg-white text-[#113D33] rounded-2xl p-6 md:p-7 shadow-xl flex flex-col text-center border border-[#113D33]/8">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.15em] text-[#4A776D] mb-1">
                Recovery circuit
              </p>
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-[#113D33]">
                Remedy Room
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Sauna + cold plunge recovery
              </p>
            </div>

            <div className="mb-5">
              <span className="text-5xl font-bold text-[#113D33]">$49</span>
              <span className="text-sm text-gray-500 ml-1">/ session</span>
            </div>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
              Sauna, cold plunge, red light therapy, and Normatec
              compression — all in one 40-minute session.
            </p>

            <Link
              href="/locations/denver-larimer/book-remedy-room"
              className="block w-full rounded-full font-semibold py-3 px-6 transition mb-4 bg-[#113D33] hover:bg-[#0a2b23] text-white"
            >
              Book Remedy Room
            </Link>

            <p className="text-xs text-gray-400">
              Members pay just $25/session
            </p>
          </div>

          {/* First Visit Offer — center card */}
          <div className="relative bg-white text-[#113D33] rounded-2xl p-6 md:p-7 shadow-xl flex flex-col text-center border ring-2 ring-[#4A776D] border-[#4A776D]/20">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-[#113D33] text-white px-4 py-1 rounded-full font-semibold tracking-wide whitespace-nowrap">
              MOST POPULAR
            </span>

            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.15em] text-[#4A776D] mb-1">
                First-time guests
              </p>
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-[#113D33]">
                First Visit Offer
              </h2>
            </div>

            <div className="mb-5">
              <span className="text-5xl font-bold text-[#113D33]">$40 OFF</span>
            </div>

            <p className="text-sm text-gray-600 mb-1 leading-relaxed">
              Enjoy a 50-minute massage or facial for just{" "}
              <strong>$99</strong>
            </p>
            <p className="text-xs text-gray-500 mb-6 flex-grow">(regularly $139)</p>

            <Link
              href="/locations/denver-larimer/book"
              className="block w-full rounded-full font-semibold py-3 px-6 transition mb-4 bg-[#113D33] hover:bg-[#0a2b23] text-white"
            >
              Book Your First Visit
            </Link>

            <p className="text-xs text-gray-400">
              Available for first-time guests only
            </p>
          </div>

          {/* Membership */}
          <div className="relative bg-white text-[#113D33] rounded-2xl p-6 md:p-7 shadow-xl flex flex-col text-center border border-[#113D33]/8">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.15em] text-[#4A776D] mb-1">
                Best ongoing value
              </p>
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-[#113D33]">
                Membership
              </h2>
              <p className="text-sm text-gray-500 mt-1">Starting at $99/month</p>
            </div>

            <div className="mb-5">
              <span className="text-5xl font-bold text-[#113D33]">$99</span>
              <span className="text-sm text-gray-500 ml-1">/ month</span>
            </div>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
              Unlimited massages & facials at $99 each, 50% off boosts & Remedy
              Room, private lounge, and more.
            </p>

            <Link
              href="/locations/denver-larimer/membership"
              className="block w-full rounded-full font-semibold py-3 px-6 transition mb-4 bg-[#113D33] hover:bg-[#0a2b23] text-white"
            >
              View Memberships
            </Link>

            <p className="text-xs text-gray-400">Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* IMAGE BAND */}
      <section className="relative h-[45vh] min-h-[320px]">
        <Image
          src="/assets/membership_background_logo.jpg"
          alt="Sway Wellness Spa interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            A Different Kind of Spa
          </h2>
          <p className="max-w-2xl text-base md:text-lg text-gray-200">
            Modern recovery technology, thoughtful design, and personalized care
            — all on Larimer Square in downtown Denver.
          </p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 px-6 text-center">
        <p className="text-gray-400 mb-6">
          Questions? Call us at{" "}
          <a href="tel:13034766150" className="underline text-white">
            (303) 476-6150
          </a>
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/locations/denver-larimer"
            className="text-sm underline underline-offset-4 text-gray-300 hover:text-white transition"
          >
            View Location
          </Link>
          <Link
            href="/locations/denver-larimer/book"
            className="text-sm underline underline-offset-4 text-gray-300 hover:text-white transition"
          >
            Book Now
          </Link>
          <Link
            href="/gift-cards"
            className="text-sm underline underline-offset-4 text-gray-300 hover:text-white transition"
          >
            Gift Cards
          </Link>
        </div>
      </section>
    </main>
  );
}
