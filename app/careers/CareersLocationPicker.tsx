"use client";
import { useState } from "react";

type Loc = { slug: string; label: string; href?: string; email: string; soon?: boolean };

/**
 * "Find jobs at your Sway" (the Spavia careers page's spa picker). A location with an online hiring
 * site opens it; one without shows a short note with its email right here (John 10/29: opening an
 * email by itself felt wrong).
 */
export default function CareersLocationPicker({ locations, id }: { locations: Loc[]; id: string }) {
  const [slug, setSlug] = useState("");
  const [note, setNote] = useState<Loc | null>(null);
  const loc = locations.find((l) => l.slug === slug);
  const name = (l: Loc) => l.label.split(" · ")[0];
  return (
    <div className="w-full max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!loc) return;
          if (loc.href) {
            setNote(null);
            window.open(loc.href, "_blank", "noopener");
          } else setNote(loc);
        }}
        className="flex w-full flex-col gap-3 sm:flex-row"
      >
        <label htmlFor={id} className="sr-only">
          Choose your Sway location
        </label>
        <select
          id={id}
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setNote(null);
          }}
          className="min-h-12 flex-1 rounded-full border border-white/40 bg-[#0d2f27]/70 px-5 text-sm text-white focus:border-[#D7E5DD] focus:outline-none [&_option]:bg-white [&_option]:text-[#113D33]"
        >
          <option value="">Find jobs at your Sway…</option>
          {locations.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!loc}
          className="min-h-12 rounded-full border border-white/40 px-7 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:border-white hover:bg-white/10 disabled:opacity-60"
        >
          See jobs
          {loc?.href && <span className="sr-only"> (opens in new tab)</span>}
        </button>
      </form>
      <div role="status" aria-live="polite">
        {note && (
          <p className="mt-4 rounded-2xl bg-white/10 px-5 py-4 text-left text-sm leading-relaxed text-white">
            {note.soon ? `${name(note)} is opening soon and will post openings here.` : `${name(note)} doesn't have openings posted online yet.`} To introduce
            yourself, email{" "}
            <a className="font-semibold underline underline-offset-4" href={`mailto:${note.email}?subject=${encodeURIComponent(`Careers at ${name(note)}`)}`}>
              {note.email}
            </a>
            .
          </p>
        )}
      </div>
    </div>
  );
}
