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
    imageUrl: "/assets/homepage_photo_outside.png",
  },
  {
    slug: "dallas",
    name: "Sway Dallas",
    city: "Dallas",
    state: "TX",
    status: "coming-soon",
    coords: [32.7767, -96.7970],
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

  const goToLocation = (loc: Location) => {
    if (loc.status === "coming-soon") return;
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

  return (
    <div
      className="min-h-screen font-vance"
      style={{ backgroundColor: cream, color: deepGreen }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex items-center justify-between gap-4">
          <h1 className="text-2xl md:text-4xl font-bold">Find Your Sway</h1>
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
            className="w-full rounded-2xl px-5 py-4 text-base md:text-lg bg-white shadow focus:outline-none"
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
          <div className="space-y-4">
            {visible.map((loc) => (
              <div
                key={loc.slug}
                onClick={() => goToLocation(loc)}
                className={[
                  "w-full text-left rounded-3xl p-5 md:p-6 bg-white shadow transition cursor-pointer",
                  loc.status === "coming-soon" ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg",
                  selectedSlug === loc.slug ? "ring-2 ring-[#113D33]/50" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block h-16 w-24 rounded-2xl overflow-hidden bg-[#eae7db]">
                    {loc.imageUrl ? (
                      <img
                        src={loc.imageUrl}
                        alt={loc.name}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="flex-1">
                    <div className="text-xl md:text-2xl font-bold">
                      {loc.name}
                    </div>
                    <div className="opacity-80">
                      {loc.city}, {loc.state}
                    </div>
                    {loc.address && (
                      <div className="mt-1 text-sm opacity-70">{loc.address}</div>
                    )}
                    <div className="mt-3">
                      {loc.status === "open" ? (
                        <span className="inline-block text-xs md:text-sm px-3 py-1 rounded-full shadow bg-emerald-200 text-[#113D33]">
                          Open
                        </span>
                      ) : (
                        <span className="inline-block text-xs md:text-sm px-3 py-1 rounded-full shadow bg-gray-200 text-gray-600">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {visible.length === 0 && (
              <div className="text-sm opacity-80">
                No locations match your search.
              </div>
            )}
          </div>

          {/* Map */}
          <div className="h-[360px] md:h-[520px] rounded-3xl overflow-hidden border border-black/5 bg-white shadow">
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
                        <span className="mt-2 inline-block text-xs md:text-sm px-2 py-1 rounded bg-gray-200 text-gray-600">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Crawlable SEO links */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {LOCATIONS.map((loc) => (
            <a
              key={loc.slug}
              href={loc.status === "open" ? `/locations/${loc.slug}` : "#"}
              className={[
                "rounded-2xl bg-white p-4 shadow transition",
                loc.status === "coming-soon" ? "opacity-70 pointer-events-none" : "hover:shadow-md",
              ].join(" ")}
            >
              <div className="text-lg font-bold">{loc.name}</div>
              <div className="opacity-80">
                {loc.address || `${loc.city}, ${loc.state}`}

              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
