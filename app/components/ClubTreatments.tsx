/**
 * Massage + facial sections for a club location page once club.servicesLive (RiNo since 11/18/2026).
 *
 * The club page's idea is temperature. The Remedy Lounge is contrast (hot, then cold, you move between
 * them); massage and facials are the third state, still (someone else does the work). So:
 * - ClubThreeWays: the page's front door, drawn as one rail running hot -> cold -> still -> glow.
 * - ClubTreatmentMenu: the menu as two ladders, each tier's length drawn to scale, plus a to-scale
 *   "make it an afternoon" strip pairing a massage with a Lounge session.
 *
 * Menu facts mirror ClubServiceFlow (session lengths, $139/$169/$199 drop-in) minus the club's
 * hiddenServiceIds (RiNo: no Vitamin C or Illuminate LED facials yet). Signature is light to medium
 * pressure; deep pressure is Deep Tissue. Keep both in step with the booking flow.
 */

import Image from "next/image";
import Link from "next/link";
import ArrowMark from "./ArrowMark";
import { SwayCurve } from "./SwayCurve";

// The four states, shared with the hero panels (ClubHeroPanels) so the colors mean the same thing everywhere.
// Dark enough for white label text at AA (>= 4.5:1).
export const HOT = "#B4471F";
export const COLD = "#2F7099";
export const STILL = "#4A776D";
export const GLOW = "#A8653A";

type Props = { short: string; base: string; loungePhoto: { src: string; alt: string; position: string } };

export function ClubThreeWays({ short, base, loungePhoto }: Props) {
  const book = `${base}/book`;
  const ways = [
    {
      key: "lounge",
      state: "Hot + cold",
      title: "Remedy Lounge",
      line: "Traditional and infrared saunas, a cold plunge, compression and PEMF. You move between them.",
      meta: "75 min · $49 · $25 first visit, locals only",
      href: `${base}/book-remedy-lounge`,
      cta: "Book the Lounge",
      photo: loungePhoto,
      rail: `linear-gradient(90deg, ${HOT}, ${COLD})`,
      track: "club-ways-lounge",
    },
    {
      key: "massage",
      state: "Still",
      title: "Massage",
      line: "A licensed massage therapist in a private room, from a light to medium Signature to Deep Tissue, Sports and Salt Stone.",
      meta: "50, 70 or 90 min · From $139",
      href: `${book}?category=massage`,
      cta: "Book a massage",
      photo: { src: "/assets/founding-massage-lamp.jpg", alt: `A massage therapist working on a guest's back by lamplight at ${short}`, position: "60% 50%" },
      rail: `linear-gradient(90deg, ${COLD}, ${STILL})`,
      track: "club-ways-massage",
    },
    {
      key: "facial",
      state: "Glow",
      title: "Facials",
      line: "A licensed esthetician and results-driven facials, from Forever Young to Oxygen Infusion and Hydraderm.",
      meta: "50 or 60 min · From $139",
      href: `${book}?category=facial`,
      cta: "Book a facial",
      photo: { src: "/assets/facialExperiences.jpg", alt: "Close-up of a guest's skin with a dab of hydrating treatment", position: "50% 45%" },
      rail: `linear-gradient(90deg, ${STILL}, ${GLOW})`,
      track: "club-ways-facial",
    },
  ];

  return (
    <section className="pb-12 pt-10 md:pb-20 md:pt-16" aria-labelledby="club-ways-title">
      <div className="mx-auto max-w-6xl px-6">
        <p className="sway-eyebrow text-[#4A776D]">Recover your way in RiNo</p>
        <h2 id="club-ways-title" className="mt-3 text-[40px] leading-[1.02] md:mt-4 md:text-7xl">
          <span style={{ color: HOT }}>Hot.</span> <span style={{ color: COLD }}>Cold.</span> <span style={{ color: STILL }}>Still.</span> <span style={{ color: GLOW }}>Glow.</span>
        </h2>
        <p className="mt-3 max-w-xl text-base text-[#113D33]/85 md:mt-5 md:text-lg">
          The Remedy Lounge for heat and cold, massage and facials with licensed pros. Book one, or pair them into an afternoon.
        </p>

        {/* One rail, hot to glow. Continuous on desktop; each card keeps its own segment on mobile. */}
        <div aria-hidden="true" className="relative mt-8 hidden h-[6px] rounded-full md:mt-12 md:block"
          style={{ background: `linear-gradient(90deg, ${HOT} 0%, ${COLD} 33%, ${STILL} 66%, ${GLOW} 100%)` }}>
          {[16.5, 50, 83.5].map((at) => (
            <span key={at} className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#F7F4E9] bg-[#113D33]" style={{ left: `${at}%` }} />
          ))}
        </div>

        <ul className="mt-6 grid gap-8 md:mt-6 md:grid-cols-3 md:gap-6">
          {ways.map((w) => (
            <li key={w.key} className="flex flex-col">
              <span aria-hidden="true" className="mb-4 block h-[6px] rounded-full md:hidden" style={{ background: w.rail }} />
              <p className="sway-eyebrow text-[#4A776D]">{w.state}</p>
              <Link href={w.href} data-track={w.track} className="group mt-3 block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]">
                  <Image src={w.photo.src} alt={w.photo.alt} fill sizes="(min-width: 768px) 360px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                    style={{ objectPosition: w.photo.position }} />
                </div>
                <h3 className="mt-4 text-2xl md:text-3xl">{w.title}</h3>
                <p className="mt-2 text-[15px] leading-snug text-[#113D33]/85 md:text-base">{w.line}</p>
                <p className="mt-2 text-sm font-semibold">{w.meta}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-[15px] font-semibold underline underline-offset-4 group-hover:no-underline">
                  {w.cta} <span aria-hidden="true"><ArrowMark /></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type Tier = { tier: "Essential" | "Premier" | "Ultimate"; price: number; lengths: number[]; items: string };

const MASSAGE_TIERS: Tier[] = [
  { tier: "Essential", price: 139, lengths: [50], items: "Signature Massage (light to medium pressure) · Maternity" },
  { tier: "Premier", price: 169, lengths: [50, 70], items: "Deep Tissue · Sports · Salt Stone · Lymphatic Drainage (50 min) · Signature or Maternity (70 min)" },
  { tier: "Ultimate", price: 199, lengths: [70, 90], items: "Deep Tissue · Sports · Salt Stone · Lymphatic Drainage (70 min) · Signature (90 min)" },
];

const FACIAL_TIERS: Tier[] = [
  { tier: "Essential", price: 139, lengths: [50], items: "Signature Facial, matched to your skin" },
  { tier: "Premier", price: 169, lengths: [50], items: "Forever Young · Pore Perfection · Sensitive Silk · Glow Getter" },
  { tier: "Ultimate", price: 199, lengths: [50, 60], items: "Oxygen Infusion · Sculpt & Lift Microcurrent (60 min) · Hydraderm (50 min)" },
];

const SCALE = 90; // minutes, the longest treatment

function Ladder({ title, color, tiers, href, cta, track }: { title: string; color: string; tiers: Tier[]; href: string; cta: string; track: string }) {
  return (
    <div>
      <h3 className="text-[28px] leading-tight md:text-4xl">{title}</h3>
      <ol className="mt-4 md:mt-6">
        {tiers.map((t) => {
          const longest = Math.max(...t.lengths);
          const label = t.lengths.length === 1 ? `${t.lengths[0]} min` : `${t.lengths.join(" or ")} min`;
          return (
            <li key={t.tier} className="border-t border-[#113D33]/20 py-4 last:border-b md:py-5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="cf-label text-lg md:text-xl">{t.tier}</p>
                <p className="cf-num text-2xl md:text-3xl">${t.price}</p>
              </div>
              {/* Length to scale: fill to the longest option, a notch at each shorter one */}
              <div className="mt-2 flex items-center gap-3">
                <div aria-hidden="true" className="relative h-3 flex-1 rounded-full bg-[#113D33]/[0.08]">
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(longest / SCALE) * 100}%`, background: color }} />
                  {t.lengths.slice(0, -1).map((m) => (
                    <span key={m} className="absolute inset-y-0 w-[2px] bg-[#F7F4E9]" style={{ left: `${(m / SCALE) * 100}%` }} />
                  ))}
                </div>
                <span className="w-24 shrink-0 text-right text-sm text-[#113D33]/85">{label}</span>
              </div>
              <p className="mt-2 text-[15px] leading-snug text-[#113D33]/85">{t.items}</p>
            </li>
          );
        })}
      </ol>
      <Link href={href} data-track={track} className="sway-button mt-6 w-full sm:w-auto">
        {cta} <span aria-hidden="true"><ArrowMark /></span>
      </Link>
    </div>
  );
}

export function ClubTreatmentMenu({ short, base, foundingFrom, regularFrom }: { short: string; base: string; foundingFrom: number; regularFrom: number }) {
  const book = `${base}/book`;
  const massage = 50;
  const lounge = 75;
  const total = massage + lounge;
  return (
    <section id="massage-facials" className="bg-[#EEF2EA] py-12 md:py-28" aria-labelledby="club-menu-title">
      <div className="mx-auto max-w-6xl px-6">
        <p className="sway-eyebrow text-[#2F5D50]">Still &amp; glow</p>
        <SwayCurve width={120} strokeWidth={2} className="my-3 block text-[#4A776D] md:my-4" />
        <h2 id="club-menu-title" className="text-[38px] leading-[1.05] md:text-6xl">Massage and facials in RiNo</h2>
        <p className="mt-3 max-w-2xl text-base text-[#113D33]/85 md:mt-5 md:text-lg">
          Three tiers. Each step up adds time or depth. Licensed massage therapists and estheticians, in private treatment rooms at {short}.
        </p>

        <div className="mt-8 grid gap-12 md:mt-12 md:grid-cols-2 md:gap-16">
          <Ladder title="Massage" color={STILL} tiers={MASSAGE_TIERS} href={`${book}?category=massage`} cta="Book a massage" track="club-page-book-massage" />
          <Ladder title="Facials" color={GLOW} tiers={FACIAL_TIERS} href={`${book}?category=facial`} cta="Book a facial" track="club-page-book-facial" />
        </div>

        {/* Make it an afternoon: a massage plus a Lounge session, drawn to scale */}
        <div className="mt-12 rounded-[4px] bg-[#F7F4E9] p-6 md:mt-16 md:p-10">
          <p className="sway-eyebrow text-[#4A776D]">Make it an afternoon</p>
          <p className="cf-title mt-2 text-[26px] leading-tight md:text-4xl">Massage + Remedy Lounge, about 2 hours.</p>
          <div aria-hidden="true" className="mt-5 flex h-12 gap-1 md:h-14">
            <div className="flex items-center rounded-l-[3px] px-3 text-sm font-semibold text-white" style={{ width: `${(massage / total) * 100}%`, background: STILL }}>
              Massage · {massage} min
            </div>
            <div className="flex items-center rounded-r-[3px] px-3 text-sm font-semibold text-white" style={{ width: `${(lounge / total) * 100}%`, background: `linear-gradient(90deg, ${HOT}, ${COLD})` }}>
              Remedy Lounge · {lounge} min
            </div>
          </div>
          <p className="mt-3 text-[15px] text-[#113D33]/85 md:text-base">
            Book them back to back, in either order. They&apos;re two bookings, so pick your massage time first, then add the Lounge.
          </p>
          <div className="mt-5 flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-center">
            <Link href={`${book}?category=massage`} data-track="club-pair-massage" className="sway-text-link">
              Book a massage <span aria-hidden="true"><ArrowMark /></span>
            </Link>
            <Link href={`${base}/book-remedy-lounge`} data-track="club-pair-lounge" className="sway-text-link">
              Book the Remedy Lounge <span aria-hidden="true"><ArrowMark /></span>
            </Link>
          </div>
        </div>

        <p className="mt-6 text-sm text-[#113D33]/85 md:text-[15px]">
          Want one every month? Membership includes a monthly massage or facial, from ${regularFrom} a month (${foundingFrom} at the founding rate).{" "}
          <Link href={`${base}/founding-membership`} className="underline underline-offset-4">See founding rates</Link>
        </p>
      </div>
    </section>
  );
}
