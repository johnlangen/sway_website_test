"use client";

/**
 * ClubOffersPage — shared offers page for the Sway Wellness Club
 * locations (RiNo + Central Park).
 *
 * One first-visit offer per club: $25 first Remedy Lounge visit
 * (code FTVORL, regularly $49, locals only). Mirrors the Larimer
 * FTVORR redemption model: the booking flow doesn't capture promo
 * codes, so guests book online and mention the code at check-in.
 * Membership ($129/mo, contract 143) is the upsell anchor below,
 * not an intro offer.
 *
 * Styling follows the club pages (cream #F7F4E9 / deep green #113D33,
 * rounded-3xl cards), not the dark Larimer offers page.
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SwayCurve } from "./SwayCurve";

export const CLUB_OFFER_CODE = "FTVORL";
export const CLUB_OFFER_PRICE = 25;
export const CLUB_LOUNGE_DROP_IN = 49;
export const CLUB_MEMBERSHIP_PRICE = 129;

type ClubOffersConfig = {
  shortName: string; // "Sway RiNo"
  areaLine: string; // hero eyebrow
  bookHref: string; // lounge booking flow
  membershipHref: string;
  locationHref: string;
  phone: string;
  phoneDigits: string;
  offerImage: string;
  offerImageAlt: string;
  /** Real modalities at this club only. */
  loungeLine: string;
  /** FTVORL-CP-PAUSE: hides the first-visit offer while an amenity is
      down (one-shot first impressions shouldn't land on a degraded
      Lounge). Remove the flag to restore the offer. */
  offerPaused?: boolean;
};

const CLUB_CONFIG: Record<"denver-rino" | "denver-central-park", ClubOffersConfig> = {
  "denver-rino": {
    shortName: "Sway RiNo",
    areaLine: "Sway Wellness Club · RiNo Art District, Denver",
    bookHref: "/locations/denver-rino/book-remedy-lounge",
    membershipHref: "/locations/denver-rino/membership",
    locationHref: "/locations/denver-rino",
    phone: "(303) 225-0480",
    phoneDigits: "13032250480",
    offerImage: "/assets/rino1.jpeg",
    offerImageAlt: "Cold plunge and recovery pool at Sway RiNo",
    loungeLine:
      "Traditional dry sauna, infrared sauna cabins, cold plunge, and compression therapy.",
  },
  "denver-central-park": {
    shortName: "Sway Central Park",
    areaLine: "Sway Wellness Club · Central Park, Denver",
    bookHref: "/locations/denver-central-park/book-remedy-lounge",
    membershipHref: "/locations/denver-central-park/membership",
    locationHref: "/locations/denver-central-park",
    phone: "(303) 293-5501",
    phoneDigits: "13032935501",
    offerImage: "/assets/centralpark1.jpg",
    offerImageAlt: "Recovery pools at Sway Central Park",
    loungeLine:
      "Traditional dry sauna, infrared sauna cabins, cold plunges, a warm soak, and compression therapy.",
    // FTVORL-CP-PAUSE (Sept 2026): cold plunge down for maintenance.
    offerPaused: true,
  },
};

export default function ClubOffersPage({
  clubKey,
}: {
  clubKey: "denver-rino" | "denver-central-park";
}) {
  const cfg = CLUB_CONFIG[clubKey];

  return (
    <div className="min-h-screen bg-[#F7F4E9] text-[#113D33] font-vance">
      {/* HERO */}
      <section className="px-6 pt-28 md:pt-36 pb-8 text-center max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#4A776D] mb-4"
        >
          {cfg.areaLine}{" "}
          &middot;{" "}
          <Link href="/offers?choose=1" className="underline underline-offset-4 hover:text-[#113D33] transition normal-case tracking-normal">
            Change location
          </Link>
        </motion.p>

        <SwayCurve
          width={150}
          strokeWidth={2.2}
          animate
          className="text-[#4A776D] mx-auto block mb-6"
        />

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-semibold tracking-tight mb-4 leading-tight"
        >
          Offers &amp; Pricing
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base md:text-lg opacity-80 max-w-xl mx-auto"
        >
          {cfg.offerPaused ? (
            <>
              Remedy Lounge sessions at {cfg.shortName}: $
              {CLUB_LOUNGE_DROP_IN} drop-in, unlimited with membership.
            </>
          ) : (
            <>
              Your first Remedy Lounge visit at {cfg.shortName} for $
              {CLUB_OFFER_PRICE}. Regularly ${CLUB_LOUNGE_DROP_IN}.
            </>
          )}
        </motion.p>

        <p className="sr-only">
          {cfg.shortName} offers and pricing:{" "}
          {cfg.offerPaused
            ? `Remedy Lounge sessions are $${CLUB_LOUNGE_DROP_IN} drop-in. The first-visit offer is temporarily paused while the cold plunge is under maintenance. `
            : `First Remedy Lounge Visit (code FTVORL): $${CLUB_OFFER_PRICE} for your first 75-minute Remedy Lounge session (regularly $${CLUB_LOUNGE_DROP_IN}), any day, local first-time guests only (locals only). `}
          {cfg.loungeLine} Remedy Lounge Membership:
          ${CLUB_MEMBERSHIP_PRICE}/month for unlimited Remedy Lounge access,
          one 75-minute session every day, month-to-month with no enrollment
          fee. Book at swaywellnessspa.com or call {cfg.phone}.
        </p>
      </section>

      {/* HOW IT WORKS: the booking flow doesn't capture promo codes, so
          set the expectation that the code is mentioned at check-in. */}
      {!cfg.offerPaused && (
        <section className="px-6 pt-2 pb-2">
          <p className="max-w-3xl mx-auto text-center text-sm md:text-base opacity-75">
            Book online · Mention your code at check-in · We apply your
            first-visit pricing at checkout.
          </p>
        </section>
      )}

      {/* FTVORL-CP-PAUSE: maintenance notice replaces the offer card */}
      {cfg.offerPaused && (
        <section className="px-4 sm:px-6 pt-8 pb-10">
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-[#113D33]/8 p-6 md:p-8 text-center">
              <p className="text-xs uppercase tracking-[0.15em] text-[#4A776D] mb-2">
                A quick heads-up
              </p>
              <h2 className="text-xl md:text-2xl font-bold mb-3">
                Plunge maintenance in progress
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                One of our cold plunges and the warm soak at {cfg.shortName}{" "}
                are temporarily down while we get them back to their best. The
                $25 first-visit offer is paused until everything returns, so
                your first visit is everything it should be. The saunas, the
                remaining cold plunges, and compression therapy are open as
                usual for ${CLUB_LOUNGE_DROP_IN} drop-in sessions.
              </p>
              <Link
                href={cfg.bookHref}
                className="inline-block rounded-full font-semibold py-3 px-7 bg-[#113D33] hover:bg-[#0c2a23] text-white transition"
              >
                Book Remedy Lounge
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* OFFER CARD */}
      {!cfg.offerPaused && (
      <section className="px-4 sm:px-6 pt-8 pb-10">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative bg-white rounded-3xl shadow-xl flex flex-col text-center overflow-hidden border border-[#113D33]/8 ring-2 ring-[#4A776D]"
          >
            <span className="absolute top-3 left-1/2 -translate-x-1/2 z-10 text-xs bg-[#113D33] text-white px-4 py-1 rounded-full font-semibold tracking-wide whitespace-nowrap shadow-md">
              FIRST VISIT OFFER
            </span>

            {/* Image */}
            <div className="relative w-full h-48 md:h-56 bg-[#113D33]/5">
              <Image
                src={cfg.offerImage}
                alt={cfg.offerImageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.15em] text-[#4A776D] mb-1">
                  Remedy Lounge
                </p>
                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide">
                  First Visit
                </h2>
              </div>

              <div className="mb-4">
                <span className="text-5xl font-bold">${CLUB_OFFER_PRICE}</span>
                <span className="text-sm text-gray-500 ml-1">/ 75 min</span>
              </div>

              <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
                {cfg.loungeLine} A full 75-minute recovery session, half off
                for your first visit.
              </p>

              <Link
                href={cfg.bookHref}
                className="block w-full rounded-full font-semibold py-3 px-6 transition mb-4 bg-[#113D33] hover:bg-[#0c2a23] text-white"
              >
                Book Remedy Lounge
              </Link>

              {/* Redemption block: code is the anchor, instruction is
                  the action, constraints are secondary. */}
              <div className="mt-1 pt-4 border-t border-[#113D33]/10 text-left">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#4A776D] font-semibold">
                    Use code
                  </span>
                  <span className="font-mono text-base font-bold tracking-wider bg-[#4A776D]/10 px-2.5 py-0.5 rounded">
                    {CLUB_OFFER_CODE}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1.5">
                  Mention at the front desk
                </p>
                <p className="text-sm font-bold uppercase tracking-wide mb-1">
                  Locals only
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Any day · First-time guests only · Regularly $
                  {CLUB_LOUNGE_DROP_IN}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* MEMBERSHIP BANNER: upsell anchor below the first-visit offer */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-[#113D33] text-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center md:justify-between gap-5 md:gap-8"
          >
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9ABFB3] mb-2">
                Love your first visit? Make it every day.
              </p>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Remedy Lounge Membership
              </h3>
              <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-xl">
                Unlimited Remedy Lounge access. One 75-minute session every
                day. Month-to-month with no enrollment fee, and you can join
                online in about 2 minutes.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <div>
                <span className="text-4xl md:text-5xl font-bold">
                  ${CLUB_MEMBERSHIP_PRICE}
                </span>
                <span className="text-sm text-white/60 ml-1">/ month</span>
              </div>
              <Link
                href={cfg.membershipHref}
                className="inline-block rounded-full font-semibold py-3 px-7 bg-white hover:bg-gray-100 text-[#113D33] transition whitespace-nowrap"
              >
                View Membership
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="pb-20 px-6 text-center">
        <p className="opacity-70 mb-6">
          Questions? Call us at{" "}
          <a href={`tel:+${cfg.phoneDigits}`} className="underline">
            {cfg.phone}
          </a>
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={cfg.locationHref}
            className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100 transition"
          >
            View Location
          </Link>
          <Link
            href={cfg.bookHref}
            className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100 transition"
          >
            Book Now
          </Link>
          <Link
            href="/gift-cards"
            className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100 transition"
          >
            Gift Cards
          </Link>
        </div>
      </section>
    </div>
  );
}
