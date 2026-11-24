"use client";
import { useId, useState } from "react";
import type { GiftDesign } from "@/lib/giftCards/artwork";
import { holidaySeason } from "@/lib/giftCards/season";
import { trackStep } from "@/lib/ops/client";
import GiftOccasionIcon from "./GiftOccasionIcon";

const OCCASIONS = ["Birthday", "Thank You", "Love", "Anniversary", "Congratulations", "Self-Care", "Mother’s Day", "Holiday", "Everyday"];
/** Designs shown before "View all" (the Spavia site's number; John 11/24/2026) */
const FIRST = 8;

/**
 * Occasion filter + design grid (the Spavia site's GiftDesignPicker, in Sway's style).
 * Orderly on purpose (John 11/24/2026): one row of occasions with the rest under "More occasions",
 * the first eight designs with "View all", and each design in a frame with its name.
 */
export default function GiftDesignPicker({
  designs,
  selected,
  onChange,
}: {
  designs: GiftDesign[];
  selected: number;
  onChange: (id: number) => void;
}) {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const [moreOccasions, setMoreOccasions] = useState(false);
  const moreId = useId();
  const available = OCCASIONS.filter((o) => designs.some((d) => d.occasions.includes(o)));
  // Holiday season (Nov 1 to Dec 25): Holiday right after All
  const primary = ["All", ...(holidaySeason() ? ["Holiday"] : []), "Birthday", "Thank You", "Love"].filter((o) => o === "All" || available.includes(o));
  const additional = available.filter((o) => !primary.includes(o));
  // A filter picked under "More occasions" stays visible after that row is closed
  const row = !moreOccasions && additional.includes(filter) ? [...primary, filter] : primary;
  const shown = designs.filter((d) => filter === "All" || d.occasions.includes(filter));
  const chosen = designs.find((d) => d.id === selected);
  const limited = filter === "All" && !expanded && shown.length > FIRST;

  const occasionButton = (o: string) => (
    <button
      key={o}
      type="button"
      aria-pressed={filter === o}
      onClick={() => {
        setFilter(o);
        setExpanded(false);
        if (o !== filter) trackStep("gift", "occasion", o);
      }}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
        filter === o ? "border-[#113D33] bg-[#113D33] text-white" : "border-[#113D33]/20 bg-white text-[#113D33] hover:border-[#113D33]/60"
      }`}
    >
      <GiftOccasionIcon occasion={o} />
      {o}
    </button>
  );

  return (
    <fieldset>
      <legend className="text-xl font-semibold tracking-tight">Choose a design</legend>
      <p className="mt-1 text-sm text-[#113D33]/75">Pick an image to see it on your gift.</p>
      <div className="mt-4" role="group" aria-label="Filter designs by occasion">
        <div className="flex flex-wrap items-center gap-2">
          {row.map(occasionButton)}
          {!!additional.length && (
            <button
              type="button"
              aria-expanded={moreOccasions}
              aria-controls={moreId}
              onClick={() => {
                if (!moreOccasions) trackStep("gift", "occasions-more");
                setMoreOccasions(!moreOccasions);
              }}
              className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm font-semibold underline-offset-4 hover:underline"
            >
              {moreOccasions ? "Fewer occasions" : "More occasions"}
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false" className={`h-4 w-4 ${moreOccasions ? "rotate-180" : ""}`}>
                <path d="m5 7.5 5 5 5-5" />
              </svg>
            </button>
          )}
        </div>
        <div id={moreId} hidden={!moreOccasions} className="mt-3 rounded-xl border border-[#113D33]/10 bg-white/60 p-3">
          <div className="flex flex-wrap gap-2">{additional.map(occasionButton)}</div>
        </div>
      </div>
      <p className="mt-4 text-sm text-[#113D33]/75" role="status">
        {shown.length} {shown.length === 1 ? "design" : "designs"}
        {filter === "All" ? "" : ` for ${filter}`}
        {chosen && !shown.includes(chosen) ? `. Your pick: ${chosen.name}` : ""}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {shown.map((d, i) => {
          // Past the first eight only the chosen design stays in view until "View all"
          if (limited && i >= FIRST && d.id !== selected) return null;
          return (
            <label key={d.id} className="relative flex cursor-pointer">
              <input type="radio" name="gift-design" value={d.id} checked={d.id === selected} onChange={() => onChange(d.id)} className="peer sr-only" />
              <span className="flex w-full flex-col overflow-hidden rounded-xl border border-[#113D33]/15 bg-white p-1.5 shadow-sm transition hover:border-[#113D33]/50 peer-checked:border-[#113D33] peer-checked:ring-2 peer-checked:ring-[#113D33] peer-focus-visible:ring-2 peer-focus-visible:ring-[#113D33] peer-focus-visible:ring-offset-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.thumbnail} alt="" loading="lazy" width={240} height={240} className="block aspect-square w-full rounded-lg object-cover" />
                <span className="flex min-h-10 flex-1 items-start justify-between gap-2 px-1.5 pb-1 pt-2 text-xs font-semibold leading-snug">
                  {d.name}
                  {d.id === selected && (
                    <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#113D33] text-[10px] text-white">
                      ✓
                    </span>
                  )}
                </span>
              </span>
            </label>
          );
        })}
      </div>
      {filter === "All" && shown.length > FIRST && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => {
            if (!expanded) trackStep("gift", "designs-all");
            setExpanded(!expanded);
          }}
          className="mt-4 min-h-11 text-sm font-semibold underline underline-offset-4"
        >
          {expanded ? "Show fewer designs" : `View all ${shown.length} designs`}
        </button>
      )}
    </fieldset>
  );
}
