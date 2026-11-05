"use client";

/**
 * Events page for the Sway clubs (RiNo + Central Park). The four event types run from an open door
 * to a private event, so the page shows that directly: each section has a floor plan of who is in
 * the room (EventRoomDiagram), and the background deepens from cream to forest as it gets more private.
 *
 * "Member Access Events" from the team's doc: the people who attend them see the "On the calendar"
 * section (lib/clubEvents.ts, hidden until there is a real date). The inquiry form only serves people
 * who want to run one, which is why that option is called Host or Partner With Sway.
 */

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowMark from "./ArrowMark";
import EventInquiryForm from "./EventInquiryForm";
import EventRoomDiagram, { type EventKind } from "./EventRoomDiagram";
import { SwayCurve } from "./SwayCurve";
import { CLUB_EVENTS, clubEventFaqs } from "@/lib/clubEvents";
import { CLUB_FOUNDING } from "@/lib/clubFounding";
import { CLUB_LOCATIONS, type ClubLocationKey } from "@/lib/clubLocations";

const eyebrow = "sway-eyebrow";

function trackContact(method: "call" | "email", clubKey: ClubLocationKey) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "group_contact_click",
    contact_method: method,
    contact_source: "club_events_page",
    booking_location: clubKey,
  });
}

type Chapter = {
  id: string;
  kind: EventKind;
  name: string;
  tileNote: string;
  tagline: string;
  body: string;
  tagsLabel: string;
  tags: string[];
  facts: { label: string; value: ReactNode }[];
  cta: string;
  /** Page section colors, deepening from public to private. */
  section: string;
  tile: string;
  muted: string;
  rule: string;
  eyebrowColor: string;
  accent: string;
};

export default function ClubEventsPage({ clubKey }: { clubKey: ClubLocationKey }) {
  const club = CLUB_LOCATIONS[clubKey];
  const founding = CLUB_FOUNDING[clubKey];
  const cfg = CLUB_EVENTS[clubKey];
  const short = founding.shortName;
  const base = `/locations/${clubKey}`;
  const otherClub = clubKey === "denver-rino" ? "denver-central-park" : "denver-rino";

  const chapters: Chapter[] = [
    {
      id: "community",
      kind: "community",
      name: "Community Events",
      tileNote: "The door’s open",
      tagline: "The door’s open.",
      body: "Easygoing get-togethers that bring the neighborhood in. No big production, just good company in the Remedy Lounge.",
      tagsLabel: "Perfect for",
      tags: ["Run clubs", "Wellness meetups", "Neighborhood hangs", "Teacher appreciation", "Industry nights", "Local business collabs"],
      facts: [
        { label: "How long", value: "90 minutes to 2 hours" },
        {
          label: "Pricing",
          value: (
            <>
              Accessible entry pricing, including a{" "}
              <Link href={`${base}/offers`} className="underline underline-offset-4">
                $25 first Remedy Lounge visit
              </Link>{" "}
              (locals only, regularly $49).
            </>
          ),
        },
        { label: "Food & drinks", value: "Bring your own snacks and drinks if you like." },
      ],
      cta: "Plan a community event",
      section: "bg-[#F7F4E9] text-[#113D33]",
      tile: "bg-[#F7F4E9] text-[#113D33]",
      muted: "text-[#113D33]/85",
      rule: "border-[#113D33]/25",
      eyebrowColor: "text-[#4A776D]",
      accent: "#4A776D",
    },
    {
      id: "host",
      kind: "host",
      name: "Host or Partner With Sway",
      tileNote: "Bring the idea",
      tagline: "Bring the idea.",
      body: "Lead a sound bath, give a talk, run a workshop or team up on a brand collab. You bring the idea, and we bring the space and the community.",
      tagsLabel: "We’re looking for",
      tags: ["Sound baths", "Guided relaxation", "Speakers", "Wellness workshops", "Creative partnerships", "Brand collabs"],
      facts: [
        { label: "How long", value: "About 2 hours" },
        { label: "Who comes", value: "Member Access Events are open to everyone, with a lower rate for Sway members." },
        { label: "Food & drinks", value: "Light bites and nonalcoholic drinks included." },
      ],
      cta: "Pitch us your event",
      section: "bg-[#EBE4D1] text-[#113D33]",
      tile: "bg-[#EBE4D1] text-[#113D33]",
      muted: "text-[#113D33]/85",
      rule: "border-[#113D33]/25",
      eyebrowColor: "text-[#2F5D50]",
      accent: "#2F5D50",
    },
    {
      id: "spalebrations",
      kind: "spalebration",
      name: "Spalebrations",
      tileNote: "Bring the occasion",
      tagline: "Bring the occasion.",
      body: "Time to yourself, then back together. A stress-free way to mark a big moment with your favorite people.",
      tagsLabel: "Perfect for",
      tags: ["Birthdays", "Milestones", "Bridal parties", "Bachelorettes", "Friends’ wellness days"],
      facts: [
        { label: "Group size", value: "4 to 19 guests" },
        { label: "Pricing", value: "Standard treatment and service pricing, tailored to your group." },
        { label: "What’s on", value: `The Remedy Lounge now. Massage and facials start ${founding.opensLabel}.` },
      ],
      cta: "Plan a Spalebration",
      section: "bg-[#BFD3C6] text-[#113D33]",
      tile: "bg-[#BFD3C6] text-[#113D33]",
      muted: "text-[#113D33]/90",
      rule: "border-[#113D33]/30",
      eyebrowColor: "text-[#113D33]/80",
      accent: "#F7F4E9",
    },
    {
      id: "buyouts",
      kind: "buyout",
      name: "Luxury Buyouts",
      tileNote: "Make it all yours",
      tagline: "Make it all yours.",
      body: "Private or exclusive use of designated spaces, built around your event. Every detail is planned with you.",
      tagsLabel: "Build it your way",
      tags: ["Private Remedy Lounge access", "Chair massage", "Guided sound bath", "Live music", "Mocktail or cocktail bar", "Catering"],
      facts: [
        { label: "Group size", value: "20 or more guests" },
        { label: "Perfect for", value: "Corporate events, executive retreats, client appreciation, brand activations and big celebrations." },
        { label: "Pricing", value: "Customized for your event." },
      ],
      cta: "Plan a buyout",
      section: "bg-[#113D33] text-white",
      tile: "bg-[#113D33] text-white",
      muted: "text-white/85",
      rule: "border-white/25",
      eyebrowColor: "text-[#D7E5DD]",
      accent: "#A9D2C5",
    },
  ];

  return (
    <div className="club-founding text-[#113D33]">
      {/* ===== Hero ===== */}
      <section className="sway-page-hero bg-[#F7F4E9] pb-10 pt-24 md:pb-20 md:pt-36">
        <div className="mx-auto grid max-w-6xl items-end gap-8 px-6 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
          <div>
            <p className="text-sm text-[#113D33]/80">
              Events at {short}. Also at{" "}
              <Link href={`/locations/${otherClub}/events`} className="underline underline-offset-4">
                {CLUB_FOUNDING[otherClub].shortName}
              </Link>{" "}
              and{" "}
              <Link href="/group-events" className="underline underline-offset-4">
                Sway Larimer
              </Link>
              .
            </p>
            <h1 className="mt-5 md:mt-8">Bring your people.</h1>
            <SwayCurve width={120} strokeWidth={2} animate className="my-5 block text-[#4A776D] md:my-7" />
            <p className="max-w-lg text-base text-[#113D33]/85 md:text-lg">
              From run clubs to corporate retreats, there are four ways to gather at {short} in {cfg.neighborhood}. Tell us what you have in mind, and we&apos;ll take it from there.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 md:mt-8">
              <a href="#plan" className="sway-button w-full sm:w-auto">
                Plan your event <span aria-hidden="true"><ArrowMark /></span>
              </a>
              <a href="#ways" className="sway-text-link">See the four ways</a>
            </div>
          </div>
          {/* An archway into the club */}
          <div className="relative md:pl-6">
            <div className="relative mx-auto aspect-[3/2] w-full overflow-hidden rounded-t-[999px] md:aspect-[4/5] md:max-w-[440px]">
              <Image
                src={cfg.hero.src}
                alt={cfg.hero.alt}
                fill
                priority
                sizes="(min-width: 768px) 440px, 100vw"
                className="object-cover"
                style={{ objectPosition: cfg.hero.position }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== The four ways, as a strip of the page's own colors ===== */}
      <nav id="ways" aria-label="Four ways to gather" className="scroll-mt-20 bg-[#F7F4E9]">
        <div className="mx-auto max-w-6xl px-6 pb-10 md:pb-20">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-1">
            <p className={`${eyebrow} text-[#4A776D]`}>Four ways to gather</p>
            <p className="text-sm text-[#113D33]/80">From an open door to all yours</p>
          </div>
          <ul className="mt-4 grid grid-cols-2 overflow-hidden rounded-[4px] border border-[#113D33]/15 md:grid-cols-4">
            {chapters.map((c) => (
              <li key={c.id} className={c.tile}>
                <a href={`#${c.id}`} className="group flex h-full flex-col p-4 md:p-6">
                  <EventRoomDiagram kind={c.kind} accent={c.accent} animate={false} className="h-20 w-auto self-start md:h-32" />
                  <span className="cf-label mt-3 block text-[15px] leading-snug md:mt-5 md:text-lg">{c.name}</span>
                  <span className="mt-1 flex items-center justify-between gap-2 text-xs opacity-85 md:text-sm">
                    {c.tileNote}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5"><ArrowMark direction="down" /></span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ===== On the calendar (only with a real date, see lib/clubEvents.ts) ===== */}
      {cfg.upcoming.length > 0 && (
        <section className="bg-[#113D33] py-12 text-white md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className={`${eyebrow} text-[#D7E5DD]`}>On the calendar at {short}</p>
            <h2 className="mt-3 text-[32px] leading-[1.1] md:text-5xl">Come to the next one.</h2>
            <ul className="mt-6 md:mt-10">
              {cfg.upcoming.map((e) => (
                <li key={`${e.date}-${e.title}`} className="grid gap-3 border-t border-white/25 py-5 md:grid-cols-[minmax(0,3fr)_minmax(0,6fr)_auto] md:items-center md:gap-8">
                  <p className="text-sm text-[#D7E5DD]">{e.date}</p>
                  <div>
                    <h3 className="text-xl">{e.title}</h3>
                    <p className="mt-1 text-[15px] leading-snug text-white/85">{e.blurb}</p>
                    {(e.memberRate || e.publicRate) && (
                      <p className="mt-1 text-sm text-white/85">
                        {e.memberRate && `${e.memberRate} members`}
                        {e.memberRate && e.publicRate && " · "}
                        {e.publicRate && `${e.publicRate} drop-in`}
                      </p>
                    )}
                  </div>
                  <a href={e.href ?? "#plan"} className="sway-button sway-button-light w-full sm:w-auto">
                    Save a spot <span aria-hidden="true"><ArrowMark /></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ===== The four chapters ===== */}
      {chapters.map((c, i) => (
        <section key={c.id} id={c.id} className={`scroll-mt-14 py-12 md:py-28 ${c.section}`}>
          <div className="mx-auto grid max-w-6xl items-center gap-6 px-6 md:grid-cols-12 md:gap-10">
            <div className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
              <EventRoomDiagram kind={c.kind} accent={c.accent} className="mx-auto h-52 w-auto md:h-[400px]" />
            </div>
            <div className={`md:col-span-6 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
              <p className={`${eyebrow} ${c.eyebrowColor}`}>0{i + 1} of 04</p>
              <h2 className="mt-3 text-[38px] leading-[1.05] md:mt-4 md:text-6xl">{c.name}</h2>
              <p className="cf-title mt-2 text-2xl md:mt-3 md:text-3xl">{c.tagline}</p>
              <p className={`mt-3 max-w-lg text-base leading-normal md:mt-5 md:text-lg md:leading-relaxed ${c.muted}`}>{c.body}</p>

              <p className={`${eyebrow} mt-6 ${c.eyebrowColor} md:mt-8`}>{c.tagsLabel}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5 md:gap-2">
                {c.tags.map((t) => (
                  <li key={t} className={`rounded-full border px-3 py-1 text-[13px] leading-snug md:text-sm ${c.rule}`}>{t}</li>
                ))}
              </ul>

              <dl className="mt-6 md:mt-8">
                {c.facts.map((f) => (
                  <div key={f.label} className={`grid grid-cols-[92px_minmax(0,1fr)] gap-3 border-t py-2.5 text-[15px] leading-snug md:grid-cols-[120px_minmax(0,1fr)] md:py-3 md:text-base ${c.rule}`}>
                    <dt className="opacity-80">{f.label}</dt>
                    <dd className={c.muted}>{f.value}</dd>
                  </div>
                ))}
              </dl>

              <a href="#plan" className="sway-text-link mt-4 md:mt-6">
                {c.cta} <span aria-hidden="true"><ArrowMark /></span>
              </a>
            </div>
          </div>
        </section>
      ))}

      {/* ===== The space ===== */}
      <section className="bg-[#F7F4E9] py-12 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-6 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-20">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[4px]">
            <Image
              src={cfg.space.src}
              alt={cfg.space.alt}
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className="object-cover"
              style={{ objectPosition: cfg.space.position }}
            />
          </div>
          <div>
            <p className={`${eyebrow} text-[#4A776D]`}>The space</p>
            <h2 className="mt-3 text-[32px] leading-[1.1] md:mt-4 md:text-5xl">Gather somewhere that helps everyone unwind.</h2>
            <p className="mt-3 text-base leading-normal text-[#113D33]/85 md:mt-5 md:text-lg md:leading-relaxed">{founding.lounge}</p>
            <p className="mt-3 text-sm text-[#113D33]/80">{cfg.address}</p>
            <Link href={base} className="sway-text-link mt-3">
              More about {short} <span aria-hidden="true"><ArrowMark /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Plan it: the team's form ===== */}
      <section id="plan" className="scroll-mt-14 bg-[#EBE4D1] py-12 md:py-28">
        <div className="mx-auto grid max-w-6xl items-start gap-6 px-6 md:gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div className="lg:sticky lg:top-24">
            <p className={`${eyebrow} text-[#4A776D]`}>Plan your event</p>
            <h2 className="mt-3 text-[38px] leading-[1.05] md:mt-4 md:text-6xl">Tell us what you&apos;re picturing.</h2>
            <SwayCurve width={100} strokeWidth={2} className="my-4 block text-[#4A776D] md:my-6" />
            <p className="text-base leading-normal text-[#113D33]/85 md:text-lg md:leading-relaxed">
              Fill this out and our team at {short} will follow up. Not sure which one fits? Choose Not Sure and we&apos;ll help you figure it out.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#113D33]/85">
              Rather talk?{" "}
              <a className="underline underline-offset-4" href={`tel:${club.phone.replace(/[^\d+]/g, "")}`} onClick={() => trackContact("call", clubKey)}>
                {club.phone}
              </a>{" "}
              or{" "}
              <a className="break-all underline underline-offset-4" href={`mailto:${club.contactEmail}`} onClick={() => trackContact("email", clubKey)}>
                {club.contactEmail}
              </a>
            </p>
          </div>
          <EventInquiryForm location={cfg.formLocation} />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-[#F7F4E9] py-12 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 md:gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <h2 className="text-[32px] leading-[1.1] md:text-5xl">Good questions</h2>
          <div>
            {clubEventFaqs(clubKey).map((f) => (
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

      {/* ===== Sticky mobile bar ===== */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <a
        href="#plan"
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-[#113D33]/10 bg-[#F7F4E9] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:hidden"
      >
        <span className="min-w-0 leading-tight">
          <span className="block text-[10px] uppercase tracking-[0.15em] text-[#2F5D50]">Events at {short}</span>
          <span className="block text-sm text-[#113D33]">Bring your people</span>
        </span>
        <span className="shrink-0 rounded-[3px] bg-[#113D33] px-7 py-2.5 text-sm text-white">Plan an event</span>
      </a>
    </div>
  );
}
