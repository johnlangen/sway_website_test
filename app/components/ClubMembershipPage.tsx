"use client";

/**
 * ClubMembershipPage — shared membership page for the Sway Wellness Club
 * locations (RiNo + Central Park).
 *
 * The clubs sell exactly ONE membership online: unlimited Remedy Lounge,
 * $129/month (Mindbody contract 143 on each club site — same id on both,
 * verified live 2026-07-04 via scripts/probe-club-membership-contract.mjs).
 * Purchase runs through the same native MembershipJoinFlow the Larimer page
 * uses, pointed at the club's own Mindbody site via the `site` prop.
 *
 * Styling follows the club pages (cream #F7F4E9 / deep green #113D33,
 * rounded-3xl cards), not the dark Larimer membership page.
 */

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Check, Phone } from "lucide-react";
import { SwayCurve } from "./SwayCurve";
import MembershipJoinFlow, {
  type MembershipPlan,
  type MembershipSite,
} from "./MembershipJoinFlow";
import {
  CLUB_LOCATIONS,
  type ClubLocationKey,
} from "@/lib/clubLocations";

/* ------------------------------------------------------------------
   PER-CLUB MARKETING CONFIG (Mindbody config lives in lib/clubLocations)
------------------------------------------------------------------ */

type ClubMembershipConfig = {
  shortName: string; // "Sway RiNo"
  areaLine: string; // hero eyebrow
  analyticsKey: string; // membership_location GA4 param
  bookHref: string; // lounge booking flow
  heroImage: string;
  heroImageAlt: string;
  /** What the Remedy Lounge includes at this club (real modalities only). */
  included: string[];
  otherClubName: string;
  otherClubHref: string;
};

const CLUB_CONFIG: Record<ClubLocationKey, ClubMembershipConfig> = {
  "denver-rino": {
    shortName: "Sway RiNo",
    areaLine: "Sway Wellness Club · RiNo Art District, Denver",
    analyticsKey: "rino",
    bookHref: "/locations/denver-rino/book-remedy-lounge",
    heroImage: "/assets/rino1.jpeg",
    heroImageAlt: "Cold plunge and recovery pool at Sway RiNo",
    included: [
      "Traditional dry sauna",
      "Infrared sauna cabins",
      "Cold plunge",
      "Compression therapy",
      "Lounge access",
    ],
    otherClubName: "Sway Central Park",
    otherClubHref: "/locations/denver-central-park",
  },
  "denver-central-park": {
    shortName: "Sway Central Park",
    areaLine: "Sway Wellness Club · Central Park, Denver",
    analyticsKey: "central_park",
    bookHref: "/locations/denver-central-park/book-remedy-lounge",
    heroImage: "/assets/centralpark1.jpg",
    heroImageAlt: "Recovery pools at Sway Central Park",
    included: [
      "Traditional dry sauna",
      "Infrared sauna cabins",
      "Cold plunges",
      "Warm soak",
      "Compression therapy",
      "Lounge access",
    ],
    otherClubName: "Sway RiNo",
    otherClubHref: "/locations/denver-rino",
  },
};

// Contract 143 = "Premier Remedy Lounge Membership" on BOTH club sites.
// $129/mo, monthly auto-renew, first payment on the day you join.
const CLUB_CONTRACT_ID = 143;
const MONTHLY_PRICE = 129;
const DROP_IN_PRICE = 49;

const MEMBER_PERKS = [
  "Unlimited Remedy Lounge visits",
  "One 75-minute session every day",
  "Member-only promos and retail offers",
  "Freeze up to 3 months a year",
];

export default function ClubMembershipPage({
  clubKey,
}: {
  clubKey: ClubLocationKey;
}) {
  const club = CLUB_LOCATIONS[clubKey];
  const cfg = CLUB_CONFIG[clubKey];
  const [joinOpen, setJoinOpen] = useState(false);

  const plan: MembershipPlan = {
    key: "club_lounge",
    contractId: CLUB_CONTRACT_ID,
    name: "Remedy Lounge",
    price: MONTHLY_PRICE,
    blurb: `Unlimited Remedy Lounge access at ${cfg.shortName}. One 75-minute recovery session every day.`,
    perks: MEMBER_PERKS,
  };

  const site: MembershipSite = {
    siteId: club.siteId,
    locationLabel: cfg.shortName,
    analyticsKey: cfg.analyticsKey,
    bookHref: cfg.bookHref,
  };

  const faqs = [
    {
      q: "What does the membership include?",
      a: `Unlimited Remedy Lounge visits at ${cfg.shortName}, one 75-minute session per day. Every session includes ${cfg.included
        .slice(0, -1)
        .join(", ")
        .toLowerCase()}, and ${cfg.included[cfg.included.length - 1].toLowerCase()}.`,
    },
    {
      q: "How does billing work?",
      a: "Your first month is charged the day you join, then monthly on that same date. The membership is month-to-month and renews automatically until you cancel. No enrollment fee.",
    },
    {
      q: "Can I pause my membership?",
      a: "Yes. You can freeze your membership for up to 3 months per calendar year. Billing and access pause, then resume automatically when your freeze ends.",
    },
    {
      q: "How do I cancel?",
      a: `Reach out to the club by email at ${club.contactEmail} or by phone at ${club.phone} at least 5 business days before your next billing date. Your membership stays active through the end of the period you've paid for.`,
    },
    {
      q: "Do I need a membership to visit?",
      a: `No. Drop-ins are always welcome at $${DROP_IN_PRICE} per session. The membership pays for itself if you come 3 or more times a month.`,
    },
    {
      q: "I was an Upswell member. Do I need this?",
      a: "No. Existing Upswell members were carried over automatically at their Founding rate and already have unlimited Remedy Lounge access. If you try to join again online, we'll recognize your membership and stop you before you're charged twice.",
    },
    {
      q: "How do I book my sessions?",
      a: "Book online like any guest. Once you're a member, your sessions show as included at checkout, so you'll never see a charge for lounge visits.",
    },
  ];

  return (
    <main className="bg-[#F7F4E9] text-[#113D33] font-vance">
      {/* ================================ HERO ================================ */}
      <section className="px-6 pt-24 sm:pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <div className="mb-3 text-xs tracking-wide uppercase opacity-70">
              {cfg.areaLine}
            </div>

            <SwayCurve
              width={130}
              strokeWidth={2.2}
              animate
              className="text-[#4A776D] block mb-5"
            />

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
              The Remedy Lounge Membership
            </h1>

            <p className="mt-4 text-lg sm:text-xl font-medium">
              Unlimited recovery for ${MONTHLY_PRICE} a month.
            </p>

            <p className="mt-3 text-base leading-relaxed max-w-lg opacity-90">
              One membership, one price. Come in every day for a 75-minute
              recovery session: sauna, cold plunge, compression, and more.
            </p>

            <p className="sr-only">
              {cfg.shortName} Remedy Lounge Membership: unlimited Sway Remedy
              Lounge access for ${MONTHLY_PRICE} per month. One 75-minute
              recovery session per day including{" "}
              {cfg.included.join(", ").toLowerCase()}. Month-to-month with no
              enrollment fee, freeze up to 3 months per year. Drop-ins welcome
              at ${DROP_IN_PRICE} per session. Join online in about 2 minutes.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setJoinOpen(true)}
                className="bg-[#113D33] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0c2a23] transition shadow-sm"
              >
                Become a Member · ${MONTHLY_PRICE}/mo
              </button>
              <a
                href={cfg.bookHref}
                className="border-2 border-[#113D33] text-[#113D33] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#113D33] hover:text-white transition"
              >
                Try a Drop-In First
              </a>
            </div>

            <p className="mt-4 text-sm opacity-70">
              No enrollment fee · Month-to-month · Join online in 2 minutes
            </p>
          </div>

          <div className="relative">
            <Image
              src={cfg.heroImage}
              alt={cfg.heroImageAlt}
              width={959}
              height={1640}
              priority
              className="rounded-3xl shadow-lg w-full h-[300px] sm:h-[360px] md:h-[460px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ====================== WHAT'S INCLUDED / PRICE CARD ====================== */}
      <section className="px-6 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl bg-[#113D33] text-white p-7 sm:p-10 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/60 mb-2">
                  One Membership. Everything Inside.
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
                  Unlimited Remedy Lounge
                </h2>
                <p className="text-white/80 text-sm sm:text-base mb-6 max-w-md">
                  One 75-minute recovery session every day, whenever it fits
                  your schedule. Book online and walk in. Your visits are
                  included, always.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-7">
                  {cfg.included.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-white/90"
                    >
                      <Check className="w-4 h-4 text-[#9ABFB3] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold">${MONTHLY_PRICE}</span>
                  <span className="text-white/60 text-sm">/ month</span>
                  <span className="text-white/50 text-sm">
                    · drop-ins ${DROP_IN_PRICE}/session
                  </span>
                </div>
                <button
                  onClick={() => setJoinOpen(true)}
                  className="bg-white text-[#113D33] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
                >
                  Become a Member
                </button>
              </div>
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={club.loungeImages[1] ?? club.loungeImages[0]}
                  alt={`Sway Remedy Lounge at ${cfg.shortName}`}
                  width={1093}
                  height={1438}
                  className="w-full h-[240px] sm:h-[300px] md:h-[380px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ VALUE MATH ============================ */}
      <section className="px-6 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-black/10 bg-white/50 p-7 sm:p-10">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold">${DROP_IN_PRICE}</p>
                <p className="mt-1 text-sm opacity-70">per drop-in session</p>
              </div>
              <div>
                <p className="text-3xl font-bold">3 visits</p>
                <p className="mt-1 text-sm opacity-70">
                  a month and membership already wins
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">Every day</p>
                <p className="mt-1 text-sm opacity-70">
                  is included once you&apos;re a member
                </p>
              </div>
            </div>
            <p className="mt-6 text-center text-sm opacity-70 max-w-xl mx-auto">
              Three drop-ins cost ${DROP_IN_PRICE * 3}. The membership is $
              {MONTHLY_PRICE} for as many days as you want to come. Recovery
              works best as a habit, and this makes the habit the cheap option.
            </p>
          </div>
        </div>
      </section>

      {/* =========================== HOW IT WORKS =========================== */}
      <section className="px-6 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Join online",
                body: "Takes about 2 minutes. Your first month is charged today, then monthly on the same date. No enrollment fee.",
              },
              {
                step: "2",
                title: "Book your sessions",
                body: "Reserve your 75-minute Remedy Lounge session online. As a member, checkout shows your visit as included, no charge.",
              },
              {
                step: "3",
                title: "Show up and recover",
                body: "Sauna, plunge, compress, repeat. Come once a week or every single day. It's all the same price.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="border border-black/10 rounded-2xl p-6 bg-white/40"
              >
                <div className="w-9 h-9 rounded-full bg-[#113D33] text-white flex items-center justify-center text-sm font-bold mb-4">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FOUNDING MEMBER REASSURANCE ===================== */}
      <section className="px-6 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl bg-[#113D33] text-white p-6 sm:p-8 md:p-10">
            <div className="text-xs uppercase tracking-wider text-white/60 mb-1.5">
              Founding &amp; Upswell Members
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              You&apos;re already in.
            </h2>
            <p className="mt-2 text-white/80 text-sm sm:text-base max-w-2xl">
              Existing members were carried over automatically at their
              Founding rate and already have unlimited Remedy Lounge access.
              There&apos;s nothing to buy here. If you join again by accident,
              we&apos;ll catch it and warn you before any charge.
            </p>
          </div>
        </div>
      </section>

      {/* ============================= FAQ =============================== */}
      <section className="px-6 pb-14 md:pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
            Membership Questions
          </h2>
          {faqs.map((item) => (
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
          <SwayCurve
            width={130}
            strokeWidth={2}
            animate
            className="text-white/80 mx-auto block mb-5"
          />
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Make recovery a habit.
          </h3>
          <p className="text-white/75 max-w-lg mx-auto mb-7">
            Unlimited Remedy Lounge access at {cfg.shortName} for $
            {MONTHLY_PRICE} a month.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setJoinOpen(true)}
              className="bg-white text-[#113D33] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
            >
              Become a Member
            </button>
            <a
              href={cfg.bookHref}
              className="border-2 border-white/40 text-white px-6 py-3 rounded-full text-sm font-semibold hover:border-white transition"
            >
              Book a Drop-In
            </a>
          </div>
          <p className="mt-6 text-sm text-white/60">
            Questions? Call{" "}
            <a href={`tel:${club.phone.replace(/[^\d+]/g, "")}`} className="underline">
              {club.phone}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${club.contactEmail}`} className="underline">
              {club.contactEmail}
            </a>
            <Phone className="inline-block w-3.5 h-3.5 ml-1.5 align-[-2px]" />
          </p>
        </div>
      </section>

      {/* Sticky mobile Join bar (mirrors the Larimer membership page). */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <button
        onClick={() => setJoinOpen(true)}
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-center justify-between gap-3 border-t border-[#113D33]/10 bg-[#F7F4E9]/95 backdrop-blur pl-4 pr-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-left"
      >
        <span className="leading-tight min-w-0">
          <span className="block text-[10px] uppercase tracking-[0.15em] text-[#4A776D]">
            Remedy Lounge Membership
          </span>
          <span className="block text-[#113D33] font-semibold text-sm">
            ${MONTHLY_PRICE}
            <span className="text-[#113D33]/50 font-normal"> / month · unlimited</span>
          </span>
        </span>
        <span className="shrink-0 rounded-full bg-[#113D33] text-white px-7 py-2.5 text-sm font-semibold">
          Join
        </span>
      </button>

      {/* NATIVE JOIN FLOW MODAL (club-site-aware) */}
      <AnimatePresence>
        {joinOpen && (
          <MembershipJoinFlow
            plan={plan}
            site={site}
            onClose={() => setJoinOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
