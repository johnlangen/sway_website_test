/**
 * A launch site's Remedy Room membership, sold before the spa opens (lib/launchSites.ts
 * `remedyRoom`; Union Market since 11/23/2026).
 *
 * It is NOT a founding membership (Emily 11/23/2026: "it isn't a founding membership? It's just
 * the remedy room membership, with a different start date"): the regular price, no founding rate,
 * not one of the founding spots. It is the spa's regular Remedy Room contract with its start set
 * to the spa's start date until opening. So it never sits among the founding tiers. It gets its own
 * cream box (John 11/23/2026: "maybe it gets a creme color or gold or something to differentiate.
 * in a box below actually since its not founding"):
 *   - RemedyRoomBox: the small box under the founding card on the location page.
 *   - RemedyRoomSection: the section under the founding tiers on the founding page (it replaces
 *     the old "Pricing announced closer to opening" card).
 *
 * What it sells on: four visits a month, each a 40-minute circuit, and what those four visits
 * would cost one at a time (the spa's own single-visit price). No scarcity is claimed: there is
 * no cap on it. Both link to the website checkout, /locations/<slug>/founding-membership/join/
 * ?tier=remedy, which re-reads the price, start date and agreement from Mindbody.
 *
 * Tracking: shown = the page view (the box is always on the page while memberships are on sale);
 * clicked = remedy-box-join / remedy-section-join (remedy-section-reserve when Mindbody says the
 * contract is off sale and the button falls back to the interest form). The checkout records its
 * screens in flow "membership" under variant "remedy" and the server records the sale with
 * item "remedy" (extra.founding = false). Read: node scripts/ops.mjs --funnel membership --loc <slug>.
 */

import Image from "next/image";
import Link from "next/link";
import ArrowMark from "./ArrowMark";
import { SwayCurve } from "./SwayCurve";
import { REMEDY_ROOM_CIRCUIT } from "@/lib/membershipOffers";

export type RemedyRoomOffer = { price: number; visits: number; visitMinutes: number; visit?: number };
/** The live answer from /api/membership/founding/ (`remedy`), when it has loaded. */
export type RemedyRoomLive = { available: boolean; price: number; startLabel: string | null; fixedStart: boolean; nextChargeLabel: string | null };

const PHOTO = { src: "/assets/remedy-room3.jpg", alt: "A guest in the cold plunge while another rests in compression boots in a Sway Remedy Room" };
const joinHref = (base: string, from: string) => `${base}/founding-membership/join/?tier=remedy&from=${from}`;
const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
const word = (n: number) => WORDS[n] ?? String(n);
const visitWord = (n: number) => word(n).charAt(0).toUpperCase() + word(n).slice(1);
/** "Sauna, cold plunge, LED light therapy and compression therapy" (an acronym keeps its capitals). */
const circuitSentence = () => {
  const c = REMEDY_ROOM_CIRCUIT.map((s, i) => (i === 0 || /^[A-Z]{2}/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1)));
  return `${c.slice(0, -1).join(", ")} and ${c[c.length - 1]}`;
};
/**
 * The monthly price put against single visits, without rounding in our favour: "for about the price
 * of two single visits" only when it is within a few dollars of that, otherwise "for less than the
 * price of three single visits".
 */
function againstSingleVisits(price: number, visit: number | undefined, visits: number): string | null {
  if (visit === undefined || visit <= 0 || price >= visit * visits) return null;
  const ratio = price / visit;
  const near = Math.round(ratio);
  if (near >= 1 && Math.abs(price - near * visit) <= 3) return `for about the price of ${word(near)} single visit${near === 1 ? "" : "s"}`;
  const over = Math.floor(ratio) + 1;
  return `for less than the price of ${word(over)} single visits`;
}

/** The small box under the founding card on the location page. */
export function RemedyRoomBox({ base, offer }: { base: string; offer: RemedyRoomOffer }) {
  const separately = offer.visit !== undefined ? offer.visit * offer.visits : null;
  return (
    <div className="mt-4 rounded-2xl border border-[#D8CDB0] bg-[#F7F4E9] p-6 text-[#113D33] md:p-7">
      <p className="text-xs uppercase tracking-widest text-[#4A776D]">Remedy Room membership · Also open now</p>
      <Link
        href={joinHref(base, "location")}
        data-track="remedy-box-join"
        className="mt-2 flex items-center justify-between gap-4 transition hover:opacity-80"
      >
        <span>
          <span className="block text-lg font-bold md:text-xl">Remedy Room</span>
          <span className="block text-xs opacity-80">
            {visitWord(offer.visits)} {offer.visitMinutes}-minute recovery visits, every month
          </span>
        </span>
        <span className="flex items-center gap-3 whitespace-nowrap text-right">
          <span>
            <span className="text-xl font-bold">${offer.price}</span>
            <span className="text-xs opacity-80"> a month</span>
            {separately !== null && (
              <span className="block text-xs opacity-80">
                <s>${separately}</s> for {offer.visits} single visits
              </span>
            )}
          </span>
          <span aria-hidden="true">&rarr;</span>
        </span>
      </Link>
      <p className="mt-3 text-xs opacity-80">
        {circuitSentence()} in one circuit. A regular membership, not a founding one. Your first month is charged when you join.
      </p>
    </div>
  );
}

/** The section under the founding tiers on the founding page. */
export function RemedyRoomSection({
  base,
  shortName,
  offer,
  live,
  onReserve,
}: {
  base: string;
  shortName: string;
  offer: RemedyRoomOffer;
  live: RemedyRoomLive | null;
  onReserve: () => void;
}) {
  const price = live?.available ? live.price : offer.price;
  const separately = offer.visit !== undefined ? offer.visit * offer.visits : null;
  // Sold unless Mindbody has said the contract no longer matches (the checkout re-checks either way).
  const available = live ? live.available : true;
  const against = againstSingleVisits(price, offer.visit, offer.visits);
  return (
    <section id="remedy-room" className="club-founding scroll-mt-20 bg-[#F7F4E9] px-5 pb-20 pt-4 text-[#113D33] md:px-6 md:pb-28" aria-labelledby="remedy-room-title">
      <div className="mx-auto max-w-6xl">
        <article className="overflow-hidden rounded-[4px] border border-[#D8CDB0] bg-[#FBF8EE] md:grid md:grid-cols-[1.05fr_1fr]">
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[440px]">
            <Image src={PHOTO.src} alt={PHOTO.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A23]/85 via-[#0B2A23]/15 to-transparent" aria-hidden="true" />
            <p className="absolute inset-x-6 bottom-5 text-[#F7F4E9]">
              <span className="flex items-baseline gap-2">
                <span className="cf-num text-6xl md:text-7xl">{offer.visits}</span>
                <span className="text-sm">visits a month, {offer.visitMinutes} minutes each</span>
              </span>
            </p>
          </div>

          <div className="flex flex-col p-6 md:p-10">
            <p className="sway-eyebrow text-[#4A776D]">Remedy Room membership · {shortName}</p>
            <SwayCurve width={100} strokeWidth={2} className="my-4 block text-[#D8CDB0]" />
            <h2 id="remedy-room-title" className="cf-title text-[34px] leading-[1.04] md:text-5xl">
              {visitWord(offer.visits)} recovery visits, every month.
            </h2>
            <p className="mt-4 text-[15px] leading-snug text-[#113D33]/90 md:text-base">
              {circuitSentence()}, in one {offer.visitMinutes}-minute circuit. Come {word(offer.visits)} times a month
              {against ? `, ${against}.` : "."}
            </p>

            {/* What the same four visits cost one at a time */}
            <dl className="mt-6 space-y-1.5 border-y border-[#113D33]/15 py-4 text-sm">
              {separately !== null && (
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[#113D33]/80">
                    {visitWord(offer.visits)} single visits, ${offer.visit} each
                  </dt>
                  <dd className="text-[#113D33]/80 line-through decoration-[#113D33]/50">${separately}</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between gap-3 pt-1">
                <dt className="font-semibold">Remedy Room membership</dt>
                <dd>
                  <span className="cf-num text-5xl">${price}</span>
                  <span className="text-xs text-[#113D33]/80"> a month</span>
                </dd>
              </div>
            </dl>

            <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-[#4A776D]">Every visit</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm leading-snug">
              {REMEDY_ROOM_CIRCUIT.map((c) => (
                <li key={c} className="flex gap-2.5">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#4A776D]" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>

            {available ? (
              <Link href={joinHref(base, "founding")} data-track="remedy-section-join" className="sway-button mt-7 w-full md:w-auto md:self-start">
                Start my Remedy Room membership <span aria-hidden="true"><ArrowMark /></span>
              </Link>
            ) : (
              <button type="button" onClick={onReserve} data-track="remedy-section-reserve" className="sway-button mt-7 w-full !bg-transparent !text-[#113D33] md:w-auto md:self-start">
                Reserve this membership <span aria-hidden="true"><ArrowMark direction="down" /></span>
              </button>
            )}

            <p className="mt-5 text-xs leading-relaxed text-[#113D33]/80">
              {live?.available && live.fixedStart && live.startLabel
                ? `Your first month is charged when you join. Your membership starts ${live.startLabel}, and your next charge is ${live.nextChargeLabel}.`
                : "Your first month is charged when you join."}{" "}
              This is the regular Remedy Room membership, separate from the founding memberships. Visits are for the month they are issued and do not roll over. Three-month minimum.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
