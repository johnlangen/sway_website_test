// app/membership/page.tsx
"use client";

/**
 * The membership hub: a location picker (John 11/23/2026: "right now this page is really
 * confusing imo. you dont selecte a location. there are sections with different locations";
 * "rebuild it as a location picker only if that is seo optimized").
 *
 * Who sees it: only visitors with no location saved (or who tapped "Change location"). Anyone
 * with a location goes straight to that location's page (middleware.ts, with the effect below as
 * the fallback). So the page asks one question, "which Sway?", and each card says what you can
 * join there and for how much.
 *
 * SEO, on purpose:
 *  - Same URL, title and canonical (app/membership/layout.tsx). Search Console, 8/22 to 11/20/2026:
 *    684 impressions, 8 clicks, mostly brand searches plus "what membership structures do denver
 *    day spas use for monthly facials or massages?". So the tier names and prices stay in plain
 *    text ("How Sway memberships work"), not behind a click.
 *  - One H1 that says what the page is, an H2 per section, an H3 per location, real <a href> links
 *    to every location's membership page with the location in the link text.
 *  - The FAQ in the JSON-LD is now on the page too (./faq.ts feeds both).
 *  - Rendered on the server like every page here; the picker needs no JavaScript to read or follow.
 *
 * Prices, caps and dates are read from the same config the location pages and checkouts use
 * (lib/membershipOffers.ts, lib/clubFounding.ts, lib/clubLocations.ts, lib/launchSites.ts), so
 * this page can't go stale the way its old hand-written lines did.
 *
 * Tracking: shown = the page view of /membership/. Clicked = hub-loc-<slug> (the location's main
 * link), hub-loc-<slug>-founding (a club's founding rates), hub-choose (the hero's jump link),
 * hub-offers. Read: node scripts/ops.mjs --clicks /membership/
 */

import ArrowMark from "@/app/components/ArrowMark";
import { SwayCurve } from "@/app/components/SwayCurve";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { CLUB_LOCATIONS, type ClubLocationKey } from "@/lib/clubLocations";
import { CLUB_FOUNDING, FOUNDING_RATES } from "@/lib/clubFounding";
import { CLUB_LOUNGE, LARIMER_JOIN_PLANS } from "@/lib/membershipOffers";
import { LAUNCH_SITES } from "@/lib/launchSites";
import { MEMBERSHIP_FAQ } from "./faq";

type HubLocation = {
  slug: string;
  name: string;
  /** "Larimer Square, Denver" */
  where: string;
  status: "open" | "coming-soon";
  /** The small label over the name. */
  chip: string;
  image: string;
  alt: string;
  /** Where a visitor with this location saved is sent (and the card's main link). */
  href: string;
  /** What you can join here, with prices. */
  lines: string[];
  links: { href: string; label: string; track: string }[];
};

const L = LARIMER_JOIN_PLANS;
const UM = LAUNCH_SITES["union-market"];
const FROM_FOUNDING = FOUNDING_RATES.essential.founding;

function club(slug: ClubLocationKey, where: string, image: string, alt: string): HubLocation {
  const f = CLUB_FOUNDING[slug];
  const founding = `Founding memberships for massage and facials from $${FROM_FOUNDING} a month. Only ${f.cap}, through ${f.closesLabel}.`;
  return {
    slug,
    name: f.shortName,
    where,
    status: "open",
    chip: "Open",
    image,
    alt,
    href: `/locations/${slug}/membership`,
    lines: [
      `Remedy Lounge membership: unlimited visits for $${CLUB_LOUNGE.price} a month, one 75-minute session a day.`,
      CLUB_LOCATIONS[slug].servicesLive ? founding : `Massage and facials start ${f.opensLabel}. ${founding}`,
    ],
    links: [
      { href: `/locations/${slug}/membership`, label: `${f.place} memberships`, track: `hub-loc-${slug}` },
      { href: `/locations/${slug}/founding-membership`, label: `${f.place} founding rates`, track: `hub-loc-${slug}-founding` },
    ],
  };
}

const locations: HubLocation[] = [
  {
    slug: "denver-larimer",
    name: "Sway Larimer",
    where: "1428 Larimer St, Denver",
    status: "open",
    chip: "Open",
    image: "/assets/homepage_photo_outside.jpg",
    alt: "The front of Sway Larimer on Larimer Square in Denver",
    href: "/locations/denver-larimer/membership",
    lines: [
      `Massage and facial memberships: Essential $${L.essential.price}, Premier $${L.premier.price} or Ultimate $${L.ultimate.price} a month, with one treatment every month.`,
      `Aescape robot massage and Remedy Room memberships, $${L.remedy.price} a month.`,
    ],
    links: [{ href: "/locations/denver-larimer/membership", label: "Larimer memberships", track: "hub-loc-denver-larimer" }],
  },
  club("denver-rino", "3636 Blake St, Denver", "/assets/rino1.jpeg", "Cold plunge and recovery space at Sway RiNo"),
  club("denver-central-park", "2271 Clinton St, Aurora", "/assets/centralpark1.jpg", "Sway Central Park"),
  {
    slug: "union-market",
    name: UM.shortName,
    where: "Washington, DC",
    status: "coming-soon",
    chip: UM.founding.salesOpen ? "Coming soon · Founding memberships open" : "Coming soon",
    image: "/assets/SWAY.jpg",
    alt: "The Sway sign",
    href: "/locations/union-market/founding-membership",
    lines: UM.founding.salesOpen
      ? [
          `Founding memberships are open now: $${UM.founding.tiers.essential.price}, $${UM.founding.tiers.premier.price} or $${UM.founding.tiers.ultimate.price} a month, for the first ${UM.founding.cap} members.`,
          ...(UM.remedyRoom ? [`Remedy Room membership: ${UM.remedyRoom.visits} visits a month for $${UM.remedyRoom.price}.`] : []),
        ]
      : ["Opening in Washington, DC. Join the waitlist for founding member pricing."],
    links: [{ href: "/locations/union-market/founding-membership", label: "Union Market founding memberships", track: "hub-loc-union-market" }],
  },
  {
    slug: "knox-henderson",
    name: "Sway Knox/Henderson",
    where: "Dallas, TX",
    status: "coming-soon",
    chip: "Coming soon",
    image: "/assets/SWAY.jpg",
    alt: "The Sway sign",
    href: "/locations/knox-henderson/founding-membership",
    lines: ["Opening in Dallas. Reserve a founding membership spot for founding pricing and first access."],
    links: [{ href: "/locations/knox-henderson/founding-membership", label: "Knox/Henderson founding membership", track: "hub-loc-knox-henderson" }],
  },
];

function saveLocation(slug: string, name: string) {
  try {
    localStorage.setItem(
      "sway_selected_location",
      JSON.stringify({ slug, name }),
    );
    document.cookie = `sway_loc=${slug}; path=/; max-age=${60 * 60 * 24 * 365}`;
  } catch {}
}

export default function MembershipHubPage() {
  useEffect(() => {
    try {
      // ?choose (from the in-page "Change location" links) shows the picker
      // instead of bouncing straight back to the saved location.
      const choosing = new URLSearchParams(window.location.search).has(
        "choose",
      );
      const ls = localStorage.getItem("sway_selected_location");
      if (ls) {
        const loc = JSON.parse(ls);
        // Backfill the cookie so middleware.ts redirects server-side next
        // time (no picker flash) for visitors who only have localStorage.
        if (loc?.slug) document.cookie = `sway_loc=${loc.slug}; path=/; max-age=${60 * 60 * 24 * 365}`;
        // Open locations go to their membership page, coming-soon ones to their founding
        // membership page (each location's href above). Same rule as middleware.ts.
        const match = locations.find((l) => l.slug === loc?.slug);
        if (match && !choosing) {
          window.location.replace(match.href);
          return;
        }
      }
    } catch {}
  }, []);

  const open = locations.filter((l) => l.status === "open");
  const soon = locations.filter((l) => l.status === "coming-soon");

  const card = (loc: HubLocation) => (
    <li key={loc.slug} className="flex">
      <article className="flex w-full flex-col overflow-hidden rounded-[4px] border border-[#113D33]/15 bg-[#FBF8EE]">
        <div className="relative aspect-[16/10]">
          <Image src={loc.image} alt={loc.alt} fill sizes="(max-width: 760px) 100vw, 32vw" className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <p className="sway-eyebrow text-[#4A776D]">{loc.chip}</p>
          <h3 className="mt-2 text-[26px] leading-tight md:text-[30px]">{loc.name}</h3>
          <p className="mt-1 text-[13px] text-[#113D33]/75">{loc.where}</p>
          <ul className="mt-4 flex-1 space-y-2.5 border-t border-[#113D33]/15 pt-4 text-[14px] leading-relaxed">
            {loc.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2.5">
            {loc.links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => saveLocation(loc.slug, loc.name)}
                data-track={link.track}
                className={i === 0 ? "sway-button w-full" : "sway-text-link self-start"}
              >
                {link.label}{" "}
                <span aria-hidden="true">
                  <ArrowMark />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </li>
  );

  return (
    <div className="sway-offers-page">
      <section className="sway-campaign-intro">
        <div>
          <p className="sway-eyebrow">Sway memberships</p>
          <h1>
            Find your Sway
            <br />
            membership.
          </h1>
          <p>
            Good for you, more often. A membership is joined at the Sway you visit, so start with your
            location: three are open in Denver, with Washington, DC and Dallas on the way.
          </p>
          <a href="#locations" data-track="hub-choose" className="sway-text-link">
            Choose your location
          </a>
        </div>
        <div className="sway-campaign-photo">
          <Image
            src="/assets/membership_background_logo.jpg"
            alt="A quiet place to unwind in Sway’s member lounge"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* id="membership-options" kept: older links jump to it */}
      <section className="sway-offers-section" id="locations" aria-labelledby="locations-title">
        <span id="membership-options" />
        <p className="sway-eyebrow text-[#4A776D]">Step one</p>
        <SwayCurve width={120} strokeWidth={2} className="my-4 block text-[#B6CFBF]" />
        <h2 id="locations-title" className="text-[34px] leading-[1.05] md:text-[52px]">
          Choose your location.
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#113D33]/85">
          Each Sway has its own memberships and prices. Pick yours to see the details and join online.
        </p>

        <p className="sway-eyebrow mt-10 text-[#113D33]">Open now · Denver</p>
        <ul className="mt-4 grid gap-5 md:grid-cols-3">{open.map(card)}</ul>

        <p className="sway-eyebrow mt-12 text-[#113D33]">A new Sway is on the way</p>
        <ul className="mt-4 grid gap-5 md:grid-cols-3">{soon.map(card)}</ul>
      </section>

      <section className="sway-offers-section" aria-labelledby="how-title">
        <div className="border-t border-[#113D33]/15 pt-12">
          <h2 id="how-title" className="text-[30px] leading-[1.08] md:text-[44px]">
            How Sway memberships work.
          </h2>
          <div className="mt-8 grid gap-8 text-[14px] leading-relaxed md:grid-cols-3 md:gap-10">
            <div>
              <h3 className="text-[20px] leading-snug">Massage and facial memberships</h3>
              <p className="mt-3">
                One massage or facial every month from your tier: Essential (${L.essential.price}), Premier (${L.premier.price}) or
                Ultimate (${L.ultimate.price}) at Sway Larimer, with member pricing on additional visits. Founding
                memberships at Sway RiNo, Central Park and Union Market start at ${FROM_FOUNDING} a month.
              </p>
            </div>
            <div>
              <h3 className="text-[20px] leading-snug">Remedy Lounge membership</h3>
              <p className="mt-3">
                Make the Remedy Lounge part of your routine at Sway RiNo and Central Park: traditional and
                infrared saunas, cold plunge, compression therapy, and space to slow down. Unlimited visits for
                ${CLUB_LOUNGE.price} a month, one 75-minute session per day.
              </p>
            </div>
            <div>
              <h3 className="text-[20px] leading-snug">Aescape and Remedy Room memberships</h3>
              <p className="mt-3">
                At Sway Larimer, ${L.aescape30.price} a month each: four 30-minute or two 60-minute Aescape robot
                massage sessions, or four Remedy Room visits.
                {UM.remedyRoom && UM.founding.salesOpen ? " The Remedy Room membership is also open at Sway Union Market ahead of its opening." : ""}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sway-offers-section" aria-labelledby="faq-title">
        <div className="border-t border-[#113D33]/15 pt-12">
          <h2 id="faq-title" className="text-[30px] leading-[1.08] md:text-[44px]">
            Membership questions.
          </h2>
          <dl className="mt-6 max-w-3xl">
            {MEMBERSHIP_FAQ.map((item) => (
              <div key={item.q} className="border-b border-[#113D33]/15 py-5">
                <dt className="text-[17px] leading-snug">{item.q}</dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-[#113D33]/85">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sway-offer-close">
        <p className="sway-eyebrow">Not ready to join?</p>
        <h2>Try a session first.</h2>
        <p className="mt-2 text-sm">
          Denver locals can start with a first-visit offer.{" "}
          <Link href="/offers?choose=1" data-track="hub-offers" className="underline">
            Explore first-visit offers (locals only).
          </Link>
        </p>
      </section>
    </div>
  );
}
