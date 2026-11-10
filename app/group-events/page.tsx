"use client";

/**
 * /group-events: the page for guests who haven't picked a location yet. Each Sway location has its
 * own events page (/locations/{slug}/events) with the inquiry form already set to that location.
 * The grid shows which ways to gather each location offers, with the same floor plans as those pages.
 *
 * Deliberately no automatic redirect to a saved location here (unlike the gift card and membership
 * hubs): the 10/19 server redirect is still a suspect in the late-October gift card drop.
 */

import Image from "next/image";
import Link from "next/link";
import ArrowMark from "../components/ArrowMark";
import EventRoomDiagram, { type EventKind } from "../components/EventRoomDiagram";
import { SwayCurve } from "../components/SwayCurve";
import { CLUB_FOUNDING } from "@/lib/clubFounding";
import { groupHubFaqs } from "@/lib/clubEvents";

const LOCATIONS = [
  {
    key: "denver-larimer",
    name: "Sway Larimer",
    place: "Larimer Square, Denver",
    line: "Massage, facials, the Remedy Room and Aescape, steps from dinner on Larimer Square.",
    image: "/assets/homepage_photo_outside.jpg",
  },
  {
    key: "denver-rino",
    name: "Sway RiNo",
    place: "RiNo Art District, Denver",
    line: `The Remedy Lounge now, with massage and facials starting ${CLUB_FOUNDING["denver-rino"].opensLabel}.`,
    image: "/assets/rino-card.jpg",
  },
  {
    key: "denver-central-park",
    name: "Sway Central Park",
    place: "Aurora, near Central Park",
    line: `The Remedy Lounge now, with massage and facials starting ${CLUB_FOUNDING["denver-central-park"].opensLabel}.`,
    image: "/assets/centralpark-card.jpg",
  },
] as const;

const WAYS: { kind: EventKind; name: string; line: string; where: Record<string, boolean> }[] = [
  {
    kind: "community",
    name: "Community Events",
    line: "Run clubs, neighborhood meetups and casual Remedy Lounge gatherings.",
    where: { "denver-larimer": false, "denver-rino": true, "denver-central-park": true },
  },
  {
    kind: "host",
    name: "Host or Partner With Sway",
    line: "Sound baths, talks, workshops and brand collabs.",
    where: { "denver-larimer": true, "denver-rino": true, "denver-central-park": true },
  },
  {
    kind: "spalebration",
    name: "Spalebrations",
    line: "Birthdays, bridal parties, bachelorettes and friends’ wellness days.",
    where: { "denver-larimer": true, "denver-rino": true, "denver-central-park": true },
  },
  {
    kind: "buyout",
    name: "Luxury Buyouts",
    line: "Corporate events, retreats and celebrations of 20 or more.",
    where: { "denver-larimer": true, "denver-rino": true, "denver-central-park": true },
  },
];

const placeName = (name: string) => name.replace("Sway ", "");

export default function GroupEventsPage() {
  return (
    <div className="club-founding bg-[#F7F4E9] text-[#113D33]">
      {/* ===== Hero ===== */}
      <section className="sway-page-hero px-6 pb-8 pt-24 md:pb-14 md:pt-36">
        <div className="hero-rise mx-auto max-w-6xl">
          <p className="sway-eyebrow text-[#4A776D]">Group events &amp; spa parties · Denver</p>
          <h1 className="mt-4 max-w-3xl md:mt-6">Bring your people to Sway.</h1>
          <SwayCurve width={120} strokeWidth={2} animate className="my-5 block text-[#4A776D] md:my-7" />
          <p className="max-w-2xl text-base text-[#113D33]/85 md:text-lg">
            Spalebrations for bachelorettes, bridal parties and birthdays, team outings, workshops and private buyouts, at three Denver locations. Pick a location to see what&apos;s possible and send us the details.
          </p>
        </div>
      </section>

      {/* ===== Pick a location ===== */}
      <section className="px-6 pb-12 md:pb-20">
        <ul className="mx-auto max-w-6xl">
          {LOCATIONS.map((loc) => (
            <li key={loc.key} className="border-t border-[#113D33]/20 last:border-b">
              <Link
                href={`/locations/${loc.key}/events`}
                className="group grid grid-cols-[96px_minmax(0,1fr)_auto] items-center gap-4 py-4 sm:grid-cols-[150px_minmax(0,1fr)_auto] md:gap-8 md:py-6"
              >
                <span className="relative block h-[96px] overflow-hidden rounded-[2px] sm:h-[110px]">
                  <Image src={loc.image} alt="" fill sizes="150px" className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
                </span>
                <span className="min-w-0">
                  <span className="cf-title block text-[28px] leading-[1.05] md:text-5xl">{loc.name}</span>
                  <span className="mt-1 block text-sm text-[#113D33]/80">{loc.place}</span>
                  <span className="mt-1 block text-[15px] leading-snug text-[#113D33]/85 md:text-base">{loc.line}</span>
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className="hidden sm:inline">Events at {placeName(loc.name)}</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"><ArrowMark /></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== Which ways, where ===== */}
      <section className="bg-[#113D33] py-12 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="sway-eyebrow text-[#D7E5DD]">Ways to gather</p>
          <h2 className="mt-3 text-[34px] leading-[1.08] md:mt-4 md:text-6xl">What each location can host</h2>
          <div className="mt-6 overflow-x-auto md:mt-10">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">Which event types each Sway location offers</caption>
              <thead>
                <tr className="border-b border-white/25 text-sm text-white/85">
                  <th scope="col" className="py-3 pr-4 font-normal">Event</th>
                  {LOCATIONS.map((l) => (
                    <th key={l.key} scope="col" className="w-[110px] py-3 text-center font-normal md:w-[150px]">
                      {placeName(l.name)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WAYS.map((w) => (
                  <tr key={w.name} className="border-b border-white/15">
                    <th scope="row" className="py-4 pr-4 font-normal">
                      <span className="flex items-center gap-4">
                        <EventRoomDiagram kind={w.kind} accent="#A9D2C5" animate={false} className="h-12 w-auto shrink-0 text-white md:h-16" />
                        <span>
                          <span className="cf-label block text-lg md:text-xl">{w.name}</span>
                          <span className="block text-sm text-white/80">{w.line}</span>
                        </span>
                      </span>
                    </th>
                    {LOCATIONS.map((l) => (
                      <td key={l.key} className="py-4 text-center">
                        {w.where[l.key] ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#A9D2C5] text-[#113D33]">
                            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                            <span className="sr-only">Yes</span>
                          </span>
                        ) : (
                          <span className="text-white/70">
                            <span aria-hidden="true">·</span>
                            <span className="sr-only">No</span>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-white/85">
            Planning a bachelorette? Read our{" "}
            <Link href="/blog/bachelorette-spa-day" className="underline underline-offset-4">bachelorette spa day guide</Link>.
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-12 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 md:gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <h2 className="text-[32px] leading-[1.1] md:text-5xl">Good questions</h2>
          <div>
            {groupHubFaqs().map((f) => (
              <details key={f.q} className="group border-t border-[#113D33]/25 py-1 last:border-b">
                <summary className="cf-label flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-2 text-base md:min-h-14 md:py-3 md:text-lg [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="text-2xl leading-none transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-4 text-[15px] leading-normal text-[#113D33]/85 md:pb-5 md:text-base md:leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
