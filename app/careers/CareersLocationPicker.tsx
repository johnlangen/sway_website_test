"use client";
import { useState } from "react";

/** "Find jobs at your Sway" (the Spavia careers page's spa picker): each location's hiring site, or its email */
export default function CareersLocationPicker({
  locations,
  id,
}: {
  locations: { slug: string; label: string; href: string }[];
  id: string;
}) {
  const [slug, setSlug] = useState("");
  const loc = locations.find((l) => l.slug === slug);
  const external = loc?.href.startsWith("http");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!loc) return;
        if (external) window.open(loc.href, "_blank", "noopener");
        else window.location.assign(loc.href);
      }}
      className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <label htmlFor={id} className="sr-only">
        Choose your Sway location
      </label>
      <select
        id={id}
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
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
        {external && <span className="sr-only"> (opens in new tab)</span>}
      </button>
    </form>
  );
}
