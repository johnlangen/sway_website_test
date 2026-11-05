"use client";

/**
 * Location page for the Sway clubs (RiNo + Central Park). The Remedy Lounge is what's open now and it is
 * all about contrast, so temperature is the organizing idea: ClubLoungeStrip draws a session to scale,
 * and the list of what's inside runs from hottest to coldest. Founding membership gets its own section
 * while massage and facials are on the way. JSON-LD lives in each club's layout.tsx.
 */

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import ArrowMark from "./ArrowMark";
import ClubHoursChart from "./ClubHoursChart";
import ClubLoungeStrip from "./ClubLoungeStrip";
import LocationExperienceNav from "./LocationExperienceNav";
import { SwayCurve } from "./SwayCurve";
import { CLUB_FOUNDING, FOUNDING_RATES } from "@/lib/clubFounding";
import { CLUB_LOCATIONS, type ClubLocationKey } from "@/lib/clubLocations";
import { CLUB_PAGES, getClubStatus } from "@/lib/clubLocationPages";
import { useFoundingSpots } from "@/lib/useFoundingSpots";

const WaitlistForm = dynamic(() => import("./WaitlistForm"));

const DROP_IN = 49;
const UNLIMITED = 129;
const VISIT_CHOICES = [1, 2, 3, 4, 6, 8, 12];

export default function ClubLocationPage({ clubKey }: { clubKey: ClubLocationKey }) {
  const cfg = CLUB_PAGES[clubKey];
  const club = CLUB_LOCATIONS[clubKey];
  const founding = CLUB_FOUNDING[clubKey];
  const short = founding.shortName;
  const base = `/locations/${clubKey}`;
  const bookHref = `${base}/book`;
  const spotsLeft = useFoundingSpots(clubKey);

  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);
  const [visits, setVisits] = useState(4);

  useEffect(() => {
    localStorage.setItem(
      "sway_selected_location",
      JSON.stringify({ slug: clubKey, name: short, city: cfg.city, state: "CO" }),
    );
    document.cookie = `sway_loc=${clubKey}; path=/; max-age=31536000`;
    setStatus(getClubStatus(cfg.week));
  }, [clubKey, short, cfg.city, cfg.week]);

  const inside = [
    { name: "Traditional sauna", line: "Dry heat, in a 25-minute window you book.", color: "#C8552B" },
    { name: "Infrared sauna cabins", line: "A gentler heat, also in a 25-minute window.", color: "#E2A25A" },
    ...(cfg.hasWarmSoak ? [{ name: "Warm soak", line: "One tub runs warm instead of cold.", color: "#EBCB9B" }] : []),
    { name: "PEMF mats", line: "Included with every session.", color: "#EBE4D1" },
    { name: "Compression therapy", line: "Included with every session.", color: "#CFE0DF" },
    {
      name: cfg.plungeLabel,
      line: cfg.hasWarmSoak ? "Three tubs run cold, at different temperatures." : "One big plunge, ready when you are.",
      color: "#7DBAD3",
    },
  ];

  const dropInTotal = visits * DROP_IN;
  const scale = Math.max(dropInTotal, UNLIMITED);
  const saves = dropInTotal - UNLIMITED;

  const faqs = [
    {
      q: "Is this the old Upswell?",
      a: "Yes. Sway took over both Upswell locations in June 2026 and now operates them as Sway Wellness Spa. Same recovery space, with new treatments and experiences on the way.",
    },
    {
      q: "What's included in the Sway Remedy Lounge?",
      a: `Access to the traditional dry sauna, infrared sauna cabins, ${cfg.hasWarmSoak ? "cold plunges, a warm soak" : "cold plunge"}, PEMF mats, and compression therapy.`,
    },
    {
      q: "How much is my first visit?",
      a: "Local first-time guests get their first 75-minute Remedy Lounge session for $25 (regularly $49). Book online, then mention code FTVORL at check-in. Locals only, any day.",
    },
    {
      q: "Do I need a membership?",
      a: "No. Drop-ins are welcome. For unlimited access, the Remedy Lounge Membership is $129/month and you can join online in about 2 minutes.",
    },
    {
      q: "When can I book a massage?",
      a: `Massage and facial treatments start ${founding.opensLabel}. Founding memberships are open now, or leave your name on this page and we'll keep you posted.`,
    },
    {
      q: "What about my Upswell membership?",
      a: "Existing Upswell members were carried over automatically, so no action is needed. Current members roll into Sway at the Founding rate.",
    },
  ];

  return (
    <div className="club-founding bg-[#F7F4E9] text-[#113D33]">
      {/* ================================ HERO ================================ */}
      <section className="sway-page-hero bg-[#E9EDDF] pb-8 pt-24 md:pb-12 md:pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-7 px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-14">
          <div>
            <p className="sway-eyebrow text-[#2F5D50]">{cfg.eyebrow}</p>
            <h1 className="mt-3 md:mt-5">{short}</h1>
            <p className="sr-only">{cfg.srSummary}</p>
            <p className="mt-2 text-base md:text-lg">Formerly Upswell Studio. New ownership, same recovery space.</p>
            <div className="mt-3 flex min-h-6 items-center gap-2 text-sm md:mt-4">
              {status && (
                <>
                  <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 rounded-full ${status.open ? "bg-[#C8552B] shadow-[0_0_10px_2px_rgba(200,85,43,0.55)]" : "bg-[#113D33]/35"}`} />
                  <span>{status.label} · Drop-ins welcome</span>
                </>
              )}
            </div>
            <SwayCurve width={120} strokeWidth={2} animate className="my-4 block text-[#4A776D] md:my-6" />
            <p className="max-w-lg text-base text-[#113D33]/85 md:text-lg">{cfg.intro}</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row md:mt-7">
              <a href={bookHref} className="sway-button">
                Book Your Experience <span aria-hidden="true"><ArrowMark /></span>
              </a>
              <Link href={`${base}/membership`} className="sway-button !bg-transparent !text-[#113D33] hover:!bg-[#113D33]/5">
                Membership <span aria-hidden="true"><ArrowMark /></span>
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#113D33]/85">
              <a href={cfg.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {cfg.street}, {cfg.city}, CO {cfg.zip} <span className="sr-only">(opens in new tab)</span>
              </a>
              <span aria-hidden="true" className="mx-2">·</span>
              <a href={`tel:${club.phone.replace(/[^\d+]/g, "")}`} className="whitespace-nowrap hover:underline">{club.phone}</a>
            </p>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[2px] md:aspect-[5/4]">
            <Image src={cfg.hero.src} alt={cfg.hero.alt} fill priority sizes="(min-width: 768px) 620px, 100vw" className="object-cover" style={{ objectPosition: cfg.hero.position }} />
          </div>
        </div>
      </section>

      <LocationExperienceNav location={clubKey} />

      {/* ========================= FIRST VISIT OFFER: a ticket with a tear line ========================= */}
      <section className="pb-12 md:pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <Link href={`${base}/offers`} className="group relative grid overflow-hidden rounded-[4px] bg-[#EBE4D1] md:grid-cols-[minmax(0,1fr)_260px]">
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-8 md:p-10">
              <p className="cf-num shrink-0 text-7xl md:text-8xl">$25</p>
              <div>
                <p className="sway-eyebrow text-[#2F5D50]">First Visit Offer · Locals Only</p>
                <h2 className="mt-1 text-2xl leading-tight md:text-4xl">Your first Remedy Lounge visit, $25.</h2>
                <p className="mt-2 text-sm text-[#113D33]/85 md:text-base">Regularly $49 · Any day · Locals only</p>
              </div>
            </div>
            <div className="relative flex items-center justify-between gap-4 border-t-2 border-dashed border-[#113D33]/30 p-6 md:flex-col md:items-start md:justify-center md:border-l-2 md:border-t-0 md:p-8">
              <span aria-hidden="true" className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[#F7F4E9]" />
              <span aria-hidden="true" className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-[#F7F4E9] md:-bottom-3 md:-left-3 md:right-auto md:top-auto" />
              <div>
                <p className="text-xs text-[#113D33]/80">Use code at check-in</p>
                <p className="cf-num mt-1 text-3xl md:text-4xl">FTVORL</p>
              </div>
              <span className="inline-flex items-center gap-3 text-sm font-semibold">
                View Offer
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1"><ArrowMark /></span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================= THE SESSION ========================= */}
      <ClubLoungeStrip hasWarmSoak={cfg.hasWarmSoak} plungeLabel={cfg.plungeLabel} />

      {/* ========================= WHAT'S INSIDE, HOTTEST TO COLDEST ========================= */}
      <section className="py-12 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-7 px-6 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] md:aspect-[4/5]">
            <Image src={cfg.loungePhoto.src} alt={cfg.loungePhoto.alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" style={{ objectPosition: cfg.loungePhoto.position }} />
          </div>
          <div>
            <p className="sway-eyebrow text-[#4A776D]">What&apos;s inside · Hottest to coldest</p>
            <h2 className="mt-3 text-[34px] leading-[1.08] md:mt-4 md:text-5xl">From ember to ice.</h2>
            {/* A thermometer: the rail's color is the temperature of each row */}
            <ul className="mt-5 md:mt-8">
              {inside.map((item, i) => (
                <li key={item.name} className="relative pb-4 pl-7 last:pb-0 md:pb-5">
                  {i < inside.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-[6px] top-2 w-[3px]"
                      style={{ background: `linear-gradient(${item.color}, ${inside[i + 1].color})` }}
                    />
                  )}
                  <span aria-hidden="true" className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border border-[#113D33]/25" style={{ background: item.color }} />
                  <p className="cf-label text-lg md:text-xl">{item.name}</p>
                  <p className="text-[15px] leading-snug text-[#113D33]/85">{item.line}</p>
                </li>
              ))}
            </ul>
            <a href={bookHref} className="sway-button mt-6 w-full sm:w-auto md:mt-8">
              Book Your Experience <span aria-hidden="true"><ArrowMark /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================= HOW OFTEN WILL YOU COME? ========================= */}
      <section className="bg-[#EBE4D1] py-12 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="sway-eyebrow text-[#2F5D50]">Drop in, or go unlimited</p>
          <h2 className="mt-3 text-[38px] leading-[1.05] md:mt-4 md:text-7xl">How often will you come?</h2>
          <fieldset className="mt-6 md:mt-9">
            <legend className="sr-only">Choose your visits per month</legend>
            <div className="grid grid-cols-4 gap-1.5 sm:flex md:gap-2">
              {VISIT_CHOICES.map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={visits === v}
                  onClick={() => setVisits(v)}
                  className={`min-h-11 rounded-[3px] border px-3 py-2 text-sm transition sm:min-w-[64px] md:text-base ${
                    visits === v ? "border-[#113D33] bg-[#113D33] font-semibold text-white" : "border-[#113D33]/35 hover:border-[#113D33]"
                  }`}
                >
                  {v}<span className="sr-only"> {v === 1 ? "visit" : "visits"} a month</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-[#113D33]/80">Visits a month</p>
          </fieldset>

          <div className="mt-6 grid gap-6 md:mt-10 md:gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
            <div className="space-y-1.5" aria-hidden="true">
              <div
                className="flex h-14 items-center whitespace-nowrap rounded-[2px] bg-[#113D33]/15 px-3 text-sm transition-[width] duration-300 motion-reduce:transition-none md:h-16 md:text-base"
                style={{ width: `${(dropInTotal / scale) * 100}%`, minWidth: "150px" }}
              >
                Drop-in ${dropInTotal}
              </div>
              <div
                className="flex h-14 items-center whitespace-nowrap rounded-[2px] bg-[#113D33] px-3 text-sm font-semibold text-white transition-[width] duration-300 motion-reduce:transition-none md:h-16 md:text-base"
                style={{ width: `${(UNLIMITED / scale) * 100}%`, minWidth: "150px" }}
              >
                Unlimited ${UNLIMITED}
              </div>
            </div>
            <div aria-live="polite">
              <p className="cf-title text-[28px] leading-tight md:text-4xl">
                {saves > 0
                  ? `${visits} visits: unlimited saves you $${saves} a month.`
                  : `${visits} ${visits === 1 ? "visit" : "visits"}: drop-in is your best deal at $${dropInTotal}.`}
              </p>
              <p className="mt-2 text-[15px] text-[#113D33]/85 md:text-base">Unlimited pays for itself at 3 visits a month.</p>
              <Link href={`${base}/membership`} className="sway-text-link mt-3">
                See the Remedy Lounge membership <span aria-hidden="true"><ArrowMark /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= WHAT'S COMING: founding membership ========================= */}
      <section className="bg-[#113D33] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-7 px-6 py-12 md:grid-cols-2 md:gap-16 md:py-28">
          <div>
            <p className="sway-eyebrow text-[#D7E5DD]">Founding membership · Ends {founding.closesLabel}</p>
            <h2 className="mt-3 text-[38px] leading-[1.05] md:mt-4 md:text-6xl">Massage and facials start {founding.opensLabel}.</h2>
            <p className="mt-3 max-w-md text-base text-white/85 md:mt-5 md:text-lg">
              A monthly treatment from ${FOUNDING_RATES.essential.founding} a month, for the first {founding.cap} founders at {short}.{spotsLeft && !spotsLeft.startsWith("All") ? ` ${spotsLeft}.` : ""}
            </p>
            <Link href={`${base}/founding-membership`} className="sway-button sway-button-light mt-5 w-full sm:w-auto md:mt-8">
              See founding rates <span aria-hidden="true"><ArrowMark /></span>
            </Link>
            <div className="mt-7 rounded-[4px] bg-[#F7F4E9] p-5 text-[#113D33] md:mt-10 md:p-6">
              <p className="cf-title text-2xl">Not ready today?</p>
              <p className="mb-4 mt-1 text-[15px] leading-snug text-[#113D33]/85">Leave your name and we&apos;ll keep you posted.</p>
              <WaitlistForm location={clubKey} source="location-page" variant="full" submitLabel="Keep Me Posted" />
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] md:aspect-[4/5]">
            <Image src={founding.hero.src} alt={founding.hero.alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" style={{ objectPosition: founding.hero.position }} />
            {founding.hero.caption && (
              <p className="absolute bottom-2 right-2 rounded-[2px] bg-black/60 px-2 py-0.5 text-[11px] leading-normal text-white">{founding.hero.caption}</p>
            )}
          </div>
        </div>
      </section>

      {/* ======================= VISIT ========================= */}
      <section className="py-12 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-[38px] leading-[1.05] md:text-6xl">Visit us</h2>
          <div className="mt-6 grid gap-10 md:mt-12 md:gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              <h3 className="text-xl md:text-2xl">Hours</h3>
              <div className="mt-3 md:mt-4">
                <ClubHoursChart week={cfg.week} />
              </div>
              <p className="mt-3 text-sm text-[#113D33]/85">
                Last session starts 75 minutes before close. Booking always shows live availability.{" "}
                <a href={bookHref} className="whitespace-nowrap underline underline-offset-4">See available times</a>
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl">Location</h3>
                <p className="mt-2 text-[15px] leading-snug md:text-base">
                  {cfg.street}, {cfg.city}, CO {cfg.zip}
                </p>
                <p className="mt-1 text-[15px] leading-snug text-[#113D33]/85">{cfg.whereNote}</p>
                <a href={cfg.mapUrl} target="_blank" rel="noopener noreferrer" className="sway-text-link mt-1">
                  Get Directions <span className="sr-only">(opens in new tab)</span>
                </a>
              </div>
              <div className="border-t border-[#113D33]/20 pt-5">
                <h3 className="text-xl md:text-2xl">Get in touch</h3>
                <p className="mt-2 flex flex-col gap-1 text-[15px] md:text-base">
                  <a href={`mailto:${club.contactEmail}`} className="break-all underline underline-offset-4">{club.contactEmail}</a>
                  <a href={`tel:${club.phone.replace(/[^\d+]/g, "")}`} className="underline underline-offset-4">{club.phone}</a>
                  <a href={cfg.reviewsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    Read our Google reviews <span className="sr-only">(opens in new tab)</span>
                  </a>
                </p>
              </div>
              <div className="border-t border-[#113D33]/20 pt-5">
                <h3 className="text-xl md:text-2xl">Bringing a group?</h3>
                <p className="mt-2 text-[15px] leading-snug md:text-base">
                  Run clubs, birthdays, and private events.{" "}
                  <Link href={`${base}/events`} className="underline underline-offset-4">See events at {short}</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== UPSWELL MEMBER REASSURANCE ===================== */}
      <section className="bg-[#BFD3C6] py-8 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-2 px-6 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:items-center md:gap-10">
          <div>
            <p className="sway-eyebrow text-[#113D33]/80">Current Upswell Members</p>
            <h2 className="mt-1 text-[32px] leading-tight md:text-5xl">You&apos;re already in.</h2>
          </div>
          <p className="text-[15px] leading-snug md:text-lg md:leading-normal">
            Existing Upswell members were carried over to Sway automatically, so there&apos;s no action needed. Current members roll into Sway at their exclusive member rate for unlimited Sway Remedy Lounge access.
          </p>
        </div>
      </section>

      {/* ============================= FAQ =============================== */}
      <section className="py-12 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 md:gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <h2 className="text-[32px] leading-[1.1] md:text-5xl">Frequently Asked Questions</h2>
          <div>
            {faqs.map((item) => (
              <details key={item.q} className="group border-t border-[#113D33]/25 py-1 last:border-b">
                <summary className="cf-label flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-2 text-base md:min-h-14 md:py-3 md:text-lg [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="text-2xl leading-none transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-4 text-[15px] leading-normal text-[#113D33]/85 md:pb-5 md:text-base md:leading-relaxed">{item.a}</p>
              </details>
            ))}
            <p className="mt-6 text-sm leading-relaxed text-[#113D33]/85">
              New to cold plunging? Read our{" "}
              <Link href="/blog/cold-plunge-denver-guide/" className="underline underline-offset-4">guide to the best cold plunges in Denver</Link>
              , with temps, first-timer tips, and how to pair it with the sauna. Curious about the PEMF mats in every session? Here&apos;s{" "}
              <Link href="/blog/infrared-pemf-mat/" className="underline underline-offset-4">what PEMF mats do</Link>
              , and how our{" "}
              <Link href="/infrared-sauna/" className="underline underline-offset-4">infrared sauna cabins</Link>{" "}
              compare to the traditional sauna.
            </p>
          </div>
        </div>
      </section>

      {/* ========================== FINAL CTA ============================ */}
      <section className="bg-[#113D33] py-14 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SwayCurve width={160} strokeWidth={2} animate className="mb-5 block text-[#A9D2C5] md:mb-8" />
          <h2 className="max-w-3xl text-[40px] leading-[1.05] md:text-7xl">Recover at {short}.</h2>
          <p className="mt-3 max-w-lg text-base text-white/85 md:mt-5 md:text-lg">
            Book a Sway Remedy Lounge recovery session. {founding.lounge}
          </p>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-2 sm:flex-row sm:items-center md:mt-8">
            <a href={bookHref} className="sway-button sway-button-light">
              Book Your Experience <span aria-hidden="true"><ArrowMark /></span>
            </a>
            <Link href="/gift-cards" className="sway-text-link self-start sm:self-auto">Gift Cards</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
