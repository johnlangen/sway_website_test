"use client";
// The dashboard's day, range and location pickers: each change opens the matching /ops/ address.
export default function OpsControls({
  day,
  today,
  days,
  loc,
  ranges,
  locs,
}: {
  day: string;
  today: string;
  days: number;
  loc: string;
  ranges: { days: number; label: string }[];
  locs: { slug: string; name: string }[];
}) {
  const go = (params: Record<string, string>) => {
    const next = new URLSearchParams(
      Object.entries({ to: day === today ? "" : day, days: days === 1 ? "" : String(days), loc, ...params }).filter(([, v]) => v)
    );
    // A full load: the report is read fresh on the server
    window.location.href = `/ops/${next.toString() ? `?${next.toString()}` : ""}`;
  };
  const field =
    "h-10 rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-white [color-scheme:dark] focus:border-[#C9D8B6] focus:outline-none";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="sr-only" htmlFor="ops-day">Day</label>
      <input
        id="ops-day"
        type="date"
        className={field}
        value={day}
        max={today}
        onChange={(e) => e.target.value && go({ to: e.target.value === today ? "" : e.target.value })}
      />
      <label className="sr-only" htmlFor="ops-range">Range</label>
      <select id="ops-range" className={field} value={days} onChange={(e) => go({ days: e.target.value === "1" ? "" : e.target.value })}>
        {ranges.map((r) => (
          <option key={r.days} value={r.days} className="text-black">
            {r.label}
          </option>
        ))}
      </select>
      <label className="sr-only" htmlFor="ops-loc">Location</label>
      <select id="ops-loc" className={`${field} max-w-[14rem]`} value={loc} onChange={(e) => go({ loc: e.target.value })}>
        <option value="" className="text-black">All locations</option>
        {locs.map((l) => (
          <option key={l.slug} value={l.slug} className="text-black">
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
