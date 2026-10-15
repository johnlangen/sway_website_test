import Link from "next/link";

export const BRADY_LANDING_HREF = "/aescape/brady-protocol/";
export const BRADY_BOOK_HREF = "/locations/denver-larimer/book-aescape/?session=brady";

/**
 * Brady Protocol launch band (launched 2026-10-15, embargo 9 AM ET).
 *
 * Larimer-scoped ONLY: Aescape lives at Sway Larimer, so this goes on the
 * homepage, the Larimer location page, /massages and /aescape. Never on
 * RiNo / Central Park / Union Market / Knox-Henderson pages, and never inside
 * a booking flow (it would pull people out mid-booking).
 *
 * Copy is Aescape's approved announcement wording (partner Terms: use the
 * copy as written). Same sage band as GiveawayBanner so it reads as its own
 * announcement rather than site chrome.
 */
export default function BradyProtocolBanner() {
  return (
    <Link
      href={BRADY_LANDING_HREF}
      className="group block w-full bg-[#A9D2C5] text-[#113D33] hover:bg-[#9ABFB3] transition-colors"
    >
      <div className="max-w-6xl mx-auto px-6 py-3.5 md:py-4 flex items-center justify-center gap-x-3 gap-y-1.5 text-center flex-wrap">
        <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold bg-[#113D33] text-white rounded-full px-3 py-1">
          <span aria-hidden="true">✦</span> New
        </span>
        <span className="text-sm md:text-base font-semibold">
          Introducing the Brady Protocol, a new 30-minute session co-developed
          by Tom Brady and Aescape. Now available at Sway Larimer.
        </span>
        <span className="text-sm md:text-base font-semibold underline underline-offset-4 group-hover:no-underline whitespace-nowrap">
          Learn more <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
