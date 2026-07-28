import Link from "next/link";
import { LOCATION_NAMES } from "@/lib/locationNames";

type GiveawayBannerProps = {
  location: "dallas" | "georgetown";
  /** Set on pages that already clear the fixed nav themselves. */
  offsetNav?: boolean;
};

/**
 * Pre-opening giveaway banner for coming-soon location pages.
 *
 * Shared so Dallas and DC can't drift apart (the markup was previously
 * duplicated across two Dallas pages).
 *
 * DESIGN NOTE: this used to be a #113D33 band, the same colour as the fixed
 * NavBar, and its background filled the nav-clearance padding too. The result
 * read as one continuous dark header, so the giveaway registered as site
 * chrome and got banner-blindness. The nav clearance is now a separate dark
 * spacer and the banner itself is sage, so it lands as its own band between
 * the nav and the hero.
 */
export default function GiveawayBanner({
  location,
  offsetNav = true,
}: GiveawayBannerProps) {
  const brand = LOCATION_NAMES[location];

  return (
    <div className={offsetNav ? "bg-[#113D33] pt-20 md:pt-24" : undefined}>
      <Link
        href={`/locations/${location}/enter-to-win`}
        className="group block w-full bg-[#A9D2C5] text-[#113D33] hover:bg-[#9ABFB3] transition-colors"
      >
        <div className="max-w-6xl mx-auto px-6 py-3.5 md:py-4 flex items-center justify-center gap-x-3 gap-y-1.5 text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold bg-[#113D33] text-white rounded-full px-3 py-1">
            <span aria-hidden="true">✦</span> Giveaway
          </span>

          <span className="text-sm md:text-lg font-semibold">
            Win a year of wellness at {brand}
          </span>

          <span className="inline-flex items-center gap-1 text-xs md:text-sm font-bold bg-[#113D33] text-white rounded-full px-4 py-1.5 group-hover:gap-2 transition-all">
            Enter free
            <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </Link>
    </div>
  );
}
