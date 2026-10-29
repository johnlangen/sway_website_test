import Image from "next/image";
import { SwayCurve } from "../components/SwayCurve";
import { CAREER_LOCATIONS, HIRING_SITE, type OpenJob } from "@/lib/careers";
import CareersLocationPicker from "./CareersLocationPicker";

/**
 * Careers, laid out like the Spavia site's careers page (John 10/29: "make it much more like the
 * spavia. we actually have 3 locations now. more coming soon") in Sway's colors and type: hero with
 * a location picker, open roles (live from Discovered, lib/careers.ts) beside the roles we hire for,
 * why work at Sway, and a closing band with the picker again.
 */
const ROLES = [
  {
    title: "Licensed Massage Therapist",
    body: "From our light-to-medium Signature Massage to deep tissue, salt stone and sports massage. Flexible scheduling, competitive pay and gratuity.",
  },
  {
    title: "Licensed Esthetician",
    body: "Facials featuring Eminence Organics, plus our Dr. Dennis Gross Vitamin C facial. Professional-grade products and ongoing education.",
  },
  {
    title: "Wellness Coordinator",
    body: "Be the first face guests see. Welcome them, book their visits, share our memberships and make every visit start and end beautifully.",
  },
  {
    title: "Spa Manager",
    body: "Lead daily operations and a great team, and create an exceptional guest experience at your location.",
  },
];

const WHY = [
  { title: "Competitive compensation", body: "Pay per treatment, more for advanced work, plus gratuity, bonuses, commissions and membership earnings." },
  { title: "Flexible scheduling", body: "Full-time or part-time schedules that fit your life while you build a rewarding career." },
  { title: "Training and growth", body: "Paid in-house training, continuing education, and room to grow as Sway opens new locations." },
  { title: "A premium environment", body: "Larimer Square's spa with the Remedy Room and Aescape, and our RiNo and Central Park clubs with saunas and cold plunges." },
  { title: "Team perks", body: "Discounts on treatments and products, for you and your friends and family. Wellness should be part of your life, too." },
  { title: "A supportive culture", body: "A team that genuinely cares about each other and the guests we serve, built on respect and collaboration." },
];

const eyebrow = "text-xs font-semibold uppercase tracking-[0.3em] text-[#D7E5DD]";

export default function CareersContent({ jobs }: { jobs: OpenJob[] | null }) {
  return (
    <div className="font-vance text-[#113D33]">
      {/* ===== Hero: photo bleeding in from the right ===== */}
      <section className="sway-page-hero relative overflow-hidden bg-[#113D33] text-white">
        <div className="absolute inset-y-0 right-0 hidden w-[55%] md:block">
          <Image src="/assets/massage2.jpg" alt="" fill priority sizes="55vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#113D33] via-[#113D33]/55 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="max-w-xl">
            <p className={eyebrow}>Join our team</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">Build a career in wellness</h1>
            <SwayCurve width={110} strokeWidth={2.2} className="my-7 block text-[#9CB7A9]" />
            <p className="text-lg leading-relaxed text-white/85">
              Do work that leaves people lighter than you found them. Join the team at our three Denver-area locations, with Washington, DC
              and Dallas coming soon.
            </p>
            <a
              href="#open-roles"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#D7E5DD] px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#113D33] transition hover:bg-white"
            >
              View open positions
            </a>
            <div className="mt-5">
              <CareersLocationPicker locations={CAREER_LOCATIONS} id="careers-location" />
            </div>
          </div>
        </div>
        <div className="relative h-64 md:hidden">
          <Image src="/assets/massage2.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </div>
      </section>

      {/* ===== Open roles ===== */}
      <section id="open-roles" className="scroll-mt-24 bg-[#F7F4E9] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4A776D]">Open roles</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">Roles at Sway</h2>
            <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-3xl lg:block">
              <Image src="/assets/J2.jpg" alt="" fill sizes="40vw" className="object-cover" />
            </div>
          </div>
          <div>
            {jobs && jobs.length > 0 && (
              <div className="mb-10">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4A776D]">Hiring now</h3>
                <ul className="mt-4 space-y-3">
                  {jobs.map((j) => (
                    <li
                      key={j.id}
                      className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)] sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-xl font-semibold">{j.title}</p>
                        <p className="mt-1 text-sm text-[#113D33]/75">
                          Sway Larimer · {j.city}, {j.state}
                        </p>
                      </div>
                      <a
                        href={j.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#113D33] px-7 py-3 font-semibold text-white transition hover:bg-[#0c2a23]"
                      >
                        Apply<span className="sr-only"> for {j.title} (opens in new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4A776D]">Roles we hire for</h3>
            <ul className="mt-2">
              {ROLES.map((r) => (
                <li key={r.title} className="border-b border-[#113D33]/15 py-7">
                  <p className="text-2xl font-semibold tracking-tight md:text-3xl">{r.title}</p>
                  <p className="mt-3 max-w-xl leading-relaxed text-[#113D33]/80">{r.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-[#113D33]/80">
              See every opening on{" "}
              <a className="font-semibold underline underline-offset-4" href={HIRING_SITE} target="_blank" rel="noopener noreferrer">
                our hiring site<span className="sr-only"> (opens in new tab)</span>
              </a>
              , or email{" "}
              <a className="font-semibold underline underline-offset-4" href="mailto:contact@swaywellnessspa.com?subject=Careers%20at%20Sway">
                contact@swaywellnessspa.com
              </a>{" "}
              and tell us about yourself.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Why Sway ===== */}
      <section className="bg-[#EBE4D1] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4A776D]">Why Sway</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">What makes Sway different</h2>
            <p className="mt-6 max-w-xl text-xl italic leading-relaxed text-[#113D33]/85">
              A place where good people are looked after as well as the guests they serve.
            </p>
            <div className="mt-12 grid gap-x-10 sm:grid-cols-2">
              {WHY.map((w) => (
                <div key={w.title} className="border-t border-[#113D33]/20 py-7">
                  <h3 className="text-xl font-semibold tracking-tight">{w.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#113D33]/80">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden aspect-[3/5] self-start overflow-hidden rounded-3xl lg:mt-24 lg:block">
            <Image src="/assets/rino1.jpeg" alt="Sway RiNo's cold plunge pool" fill sizes="30vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* ===== Closing band ===== */}
      <section className="relative overflow-hidden bg-[#113D33] text-white">
        <Image src="/assets/remedy-room.jpg" alt="" fill sizes="100vw" className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-[#0d2f27]/60" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center md:py-32">
          <p className={eyebrow}>Your next chapter</p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">Ready to join the team?</h2>
          <p className="mt-5 max-w-lg text-lg text-white/85">Browse current openings at Sway and apply today.</p>
          <a
            href={jobs?.length ? "#open-roles" : HIRING_SITE}
            {...(jobs?.length ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#D7E5DD] px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#113D33] transition hover:bg-white"
          >
            View open positions
          </a>
          <div className="mt-5 flex w-full justify-center">
            <CareersLocationPicker locations={CAREER_LOCATIONS} id="careers-location-cta" />
          </div>
        </div>
      </section>
    </div>
  );
}
