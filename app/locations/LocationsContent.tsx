"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// --- Dynamic imports for react-leaflet (client-only) ---
const MapContainer: any = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer: any = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker: any = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup: any = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

export type Location = {
  slug: string;
  name: string;
  city: string;
  state: string;
  status: "open" | "coming-soon";
  coords: [number, number];
  address?: string;
  phone?: string;
  hours?: string[];
  mindbody?: { siteId?: string };
  imageUrl?: string;
};

const LOCATIONS: Location[] = [
  {
    slug: "denver-larimer",
    name: "Sway Larimer",
    city: "Denver",
    state: "CO",
    status: "open",
    coords: [39.74794, -104.99844],
    address: "1428 Larimer St, Denver, CO 80202",
    phone: "+1 303-476-6150",
    hours: [
      "Mon–Fri: 10:00 AM – 8:00 PM",
      "Sat: 9:00 AM – 6:00 PM",
      "Sun: 11:00 AM – 6:00 PM",
    ],
    mindbody: { siteId: "DENVER_SITE_ID" },
    imageUrl: "/assets/homepage_photo_outside.jpg",
  },
  {
    slug: "denver-rino",
    name: "Sway RiNo",
    city: "Denver",
    state: "CO",
    status: "open",
    coords: [39.7665, -104.9839],
    address: "3636 Blake St, Denver, CO 80205",
    phone: "+1 303-476-6150",
    imageUrl: "/assets/rino-card.jpg",
  },
  {
    slug: "denver-central-park",
    name: "Sway Central Park",
    city: "Aurora",
    state: "CO",
    status: "open",
    coords: [39.7494, -104.8688],
    address: "2271 Clinton St, Aurora, CO 80010",
    phone: "+1 303-476-6150",
    imageUrl: "/assets/centralpark-card.jpg",
  },
  {
    slug: "dallas",
    name: "Sway Dallas",
    city: "Dallas",
    state: "TX",
    status: "coming-soon",
    coords: [32.8008, -96.7847],
    address: "2323 Henderson Ave, Dallas, TX",
    imageUrl: "/assets/SWAY.jpg",
  },
  {
    slug: "georgetown",
    name: "Sway Georgetown",
    city: "Washington",
    state: "DC",
    status: "coming-soon",
    coords: [38.9072, -77.0723],
    imageUrl: "/assets/SWAY.jpg",
  },
];

// Full state names for group headings (extend as new states come online)
const STATE_NAMES: Record<string, string> = {
  CO: "Colorado",
  TX: "Texas",
  DC: "Washington, D.C.",
  CA: "California",
  FL: "Florida",
  NY: "New York",
  IL: "Illinois",
  WA: "Washington",
  AZ: "Arizona",
  GA: "Georgia",
  NC: "North Carolina",
  VA: "Virginia",
  MA: "Massachusetts",
};
const fullStateName = (code: string) => STATE_NAMES[code] ?? code;

// --- Filter helper ---
function filterLocations(q: string, list: Location[]) {
  const s = q.trim().toLowerCase();
  if (!s) return list;
  return list.filter((l) =>
    [l.name, l.city, l.state, l.address]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(s)
  );
}

// Group coming-soon by state. Returns ordered entries (alphabetical by state name).
function groupByState(list: Location[]) {
  const buckets: Record<string, Location[]> = {};
  for (const l of list) {
    if (!buckets[l.state]) buckets[l.state] = [];
    buckets[l.state].push(l);
  }
  return Object.entries(buckets).sort(([a], [b]) =>
    fullStateName(a).localeCompare(fullStateName(b))
  );
}

// --- Distance helper ---
function distanceKm(a: [number, number], b: [number, number]) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const aa =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R * c;
}

const cream = "#F7F4E9";
const deepGreen = "#113D33";

// --- Small pin icon (no external deps) ---
function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export default function LocationsContent() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [userCenter, setUserCenter] = useState<[number, number] | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [map, setMap] = useState<any>(null);

  // Fix Leaflet icons
  useEffect(() => {
    (async () => {
      if (typeof window === "undefined") return;
      const leaflet = await import("leaflet");
      // @ts-ignore
      delete leaflet.Icon.Default.prototype._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    })();
  }, []);

  // Fit to markers on load
  useEffect(() => {
    if (!map) return;
    if (userCenter) return;
    const pts = LOCATIONS.map((l) => l.coords);
    if (pts.length > 0 && typeof (map as any).fitBounds === "function") {
      map.fitBounds(pts, { padding: [80, 80] });
    }
  }, [map, userCenter]);

  const visible = useMemo(() => filterLocations(query, LOCATIONS), [query]);
  const openLocs = useMemo(
    () => visible.filter((l) => l.status === "open"),
    [visible]
  );
  const comingSoonByState = useMemo(
    () => groupByState(visible.filter((l) => l.status === "coming-soon")),
    [visible]
  );

  const goToLocation = (loc: Location) => {
    setSelectedSlug(loc.slug);

    try {
      localStorage.setItem("sway_selected_location", JSON.stringify(loc));
      document.cookie = `sway_loc=${loc.slug}; path=/; max-age=${60 * 60 * 24 * 365}`;
    } catch (e) {
      console.error("Error saving location to storage", e);
    }

    router.push(`/locations/${loc.slug}`);
    window.location.href = `/locations/${loc.slug}`;
  };

  const useMyLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const me: [number, number] = [pos.coords.latitude, pos.coords.longitude];
      setUserCenter(me);
      if (map && typeof map.setView === "function") {
        map.setView(me, 8);
      }
      let best = LOCATIONS[0];
      let bestD = Infinity;
      for (const loc of LOCATIONS) {
        const d = distanceKm(me, loc.coords);
        if (d < bestD) {
          best = loc;
          bestD = d;
        }
      }
      setSelectedSlug(best.slug);
    });
  };

  // Featured "Open" card (full-width inside its column)
  const OpenCard = ({ loc }: { loc: Location }) => (
    <div
      onClick={() => goToLocation(loc)}
      className={[
        "rounded-3xl p-5 md:p-6 bg-white shadow transition cursor-pointer",
        "hover:shadow-lg",
        selectedSlug === loc.slug ? "ring-2 ring-[#113D33]/50" : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-4">
        <div className="h-20 w-28 shrink-0 rounded-2xl overflow-hidden bg-[#eae7db]">
          {loc.imageUrl ? (
            <img
              src={loc.imageUrl}
              alt={loc.name}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-xl md:text-2xl font-bold">{loc.name}</div>
            <span className="inline-block text-[11px] md:text-xs px-2.5 py-0.5 rounded-full bg-emerald-200 text-[#113D33] font-semibold">
              Open
            </span>
          </div>
          <div className="opacity-80">
            {loc.city}, {loc.state}
          </div>
          {loc.address && (
            <div className="mt-1 text-sm opacity-70">{loc.address}</div>
          )}
        </div>
        <div className="hidden md:block text-[#113D33]/40 text-2xl">&rarr;</div>
      </div>
    </div>
  );

  // Compact "Coming soon" card (no photo, denser, fits 2-up grid)
  const ComingSoonCard = ({ loc }: { loc: Location }) => (
    <div
      onClick={() => goToLocation(loc)}
      className={[
        "rounded-2xl p-4 bg-white shadow-sm transition cursor-pointer",
        "hover:shadow-md hover:-translate-y-0.5",
        selectedSlug === loc.slug ? "ring-2 ring-[#113D33]/40" : "",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 rounded-xl bg-[#113D33]/8 flex items-center justify-center text-[#113D33]/70">
          <PinIcon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[#113D33] truncate">{loc.name}</div>
          <div className="text-sm opacity-70 truncate">
            {loc.city}, {loc.state}
          </div>
          {loc.address && (
            <div className="text-xs opacity-60 truncate mt-0.5">
              {loc.address}
            </div>
          )}
          <span className="inline-block mt-2 text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
            Coming soon
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen font-vance"
      style={{ backgroundColor: cream, color: deepGreen }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">Find Your Sway</h1>
            <p className="mt-2 text-sm md:text-base opacity-80 max-w-xl">
              Explore Sway Wellness Spa locations across the U.S., with our Denver
              Larimer Square spa open now and more cities coming soon.
            </p>
          </div>

          <button
            onClick={useMyLocation}
            className="hidden md:inline-flex rounded-full px-4 py-2 bg-[#113D33] text-white hover:opacity-90 shadow"
          >
            Use my location
          </button>
        </div>

        {/* Search */}
        <div className="flex gap-3 md:gap-4 mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city or ZIP"
            aria-label="Search locations by city or ZIP"
            className="w-full rounded-2xl px-5 py-4 text-base md:text-lg bg-white shadow focus:outline-none focus:ring-2 focus:ring-[#113D33]/40"
          />
          <button
            onClick={useMyLocation}
            className="md:hidden rounded-2xl px-4 py-4 bg-[#113D33] text-white shadow"
            aria-label="Use my location"
          >
            Use
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* List */}
          <div className="space-y-8">
            {/* Open Now */}
            {openLocs.length > 0 && (
              <section>
                <h2 className="text-xs md:text-sm uppercase tracking-[0.18em] opacity-60 mb-3">
                  Open Now
                </h2>
                <div className="space-y-3">
                  {openLocs.map((loc) => (
                    <OpenCard key={loc.slug} loc={loc} />
                  ))}
                </div>
              </section>
            )}

            {/* Coming Soon, grouped by state */}
            {comingSoonByState.length > 0 && (
              <section>
                <h2 className="text-xs md:text-sm uppercase tracking-[0.18em] opacity-60 mb-3">
                  Coming Soon
                </h2>
                <div className="space-y-5">
                  {comingSoonByState.map(([state, locs]) => (
                    <div key={state}>
                      <h3 className="text-base font-semibold mb-2">
                        {fullStateName(state)}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {locs.map((loc) => (
                          <ComingSoonCard key={loc.slug} loc={loc} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {visible.length === 0 && (
              <div className="text-sm opacity-80">
                No locations match your search.
              </div>
            )}
          </div>

          {/* Map */}
          <div className="h-[360px] md:h-[520px] rounded-3xl overflow-hidden border border-black/5 bg-white shadow md:sticky md:top-24">
            <MapContainer
              center={[39.8283, -98.5795]}
              zoom={4}
              scrollWheelZoom={false}
              className="h-full w-full"
              whenCreated={(m: any) => setMap(m)}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />

              {LOCATIONS.map((loc) => (
                <Marker key={loc.slug} position={loc.coords}>
                  <Popup>
                    <div className="space-y-1">
                      <div className="font-bold">{loc.name}</div>
                      <div className="text-sm opacity-80">
                        {loc.city}, {loc.state}
                      </div>
                      {loc.status === "open" ? (
                        <button
                          onClick={() => goToLocation(loc)}
                          className="mt-2 text-[#113D33] bg-emerald-200 hover:bg-emerald-300 rounded px-2 py-1"
                        >
                          View page
                        </button>
                      ) : (
                        <button
                          onClick={() => goToLocation(loc)}
                          className="mt-2 text-[#113D33] bg-gray-200 hover:bg-gray-300 rounded px-2 py-1"
                        >
                          View page
                        </button>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Crawlable SEO links, grouped by state */}
        <div className="mt-12 pt-8 border-t border-black/10">
          <h2 className="text-xs uppercase tracking-[0.18em] opacity-60 mb-4">
            All Locations
          </h2>
          <div className="space-y-5">
            {groupByState(LOCATIONS).map(([state, locs]) => (
              <div key={state}>
                <h3 className="text-sm font-semibold mb-2 opacity-80">
                  {fullStateName(state)}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {locs.map((loc) => (
                    <a
                      key={loc.slug}
                      href={`/locations/${loc.slug}`}
                      className="rounded-xl bg-white px-4 py-3 shadow-sm transition hover:shadow-md flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{loc.name}</div>
                        <div className="text-xs opacity-70 truncate">
                          {loc.address || `${loc.city}, ${loc.state}`}
                        </div>
                      </div>
                      {loc.status === "open" ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-[#113D33] font-semibold shrink-0">
                          Open
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium shrink-0">
                          Soon
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
