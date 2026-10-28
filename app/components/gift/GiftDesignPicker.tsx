"use client";
import { useState } from "react";
import type { GiftDesign } from "@/lib/giftCards/artwork";

const OCCASIONS = ["All", "Birthday", "Thank You", "Love", "Anniversary", "Congratulations", "Self-Care", "Mother’s Day", "Holiday", "Everyday"];

/** Occasion filter + design grid (the Spavia site's GiftDesignPicker, in Sway's style) */
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
  const available = OCCASIONS.filter((o) => o === "All" || designs.some((d) => d.occasions.includes(o)));
  const shown = designs.filter((d) => filter === "All" || d.occasions.includes(filter));
  const chosen = designs.find((d) => d.id === selected);
  return (
    <fieldset>
      <legend className="text-lg font-semibold">Choose a design</legend>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter designs by occasion">
        {available.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={filter === o}
            onClick={() => setFilter(o)}
            className={`min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              filter === o ? "border-[#113D33] bg-[#113D33] text-white" : "border-[#113D33]/20 bg-white text-[#113D33] hover:border-[#113D33]/50"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-[#113D33]/75" role="status">
        {shown.length} {shown.length === 1 ? "design" : "designs"}
        {filter === "All" ? "" : ` for ${filter}`}
        {chosen && !shown.includes(chosen) ? `. Your pick: ${chosen.name}` : ""}
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {shown.map((d) => (
          <label key={d.id} className="relative block cursor-pointer">
            <input
              type="radio"
              name="gift-design"
              value={d.id}
              checked={d.id === selected}
              onChange={() => onChange(d.id)}
              className="peer sr-only"
              aria-label={d.name}
            />
            <span className="block overflow-hidden rounded-xl border-2 border-transparent bg-white shadow-sm transition peer-checked:border-[#113D33] peer-focus-visible:ring-2 peer-focus-visible:ring-[#113D33] peer-focus-visible:ring-offset-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.thumbnail} alt="" loading="lazy" width={240} height={240} className="block aspect-square w-full object-cover" />
            </span>
            {d.id === selected && (
              <span aria-hidden="true" className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#113D33] text-xs text-white">
                ✓
              </span>
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
