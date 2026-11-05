"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import type { Location } from "./LocationsContent";

/**
 * The Find your Sway map, in Sway's colors (tile tint and pin styles: .location-map in editorial.css).
 * Solid pin = open, outlined pin = coming soon. Locations too close to tell apart at the current zoom
 * (the three Denver spas on the national view) become one numbered pin that zooms in when tapped.
 * Client only: Leaflet needs the browser, so LocationsContent loads this file with ssr: false.
 */

const CLUSTER_DISTANCE_PX = 38;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function pinIcon(loc: Location, active: boolean) {
  const open = loc.status === "open";
  return L.divIcon({
    className: "",
    iconSize: [34, 44],
    iconAnchor: [17, 42],
    popupAnchor: [0, -40],
    html: `<span class="sway-map-pin${active ? " is-active" : ""}">
      <svg viewBox="0 0 34 44" width="34" height="44" aria-hidden="true">
        <path d="M17 2C8.7 2 2 8.7 2 17c0 11 15 25 15 25s15-14 15-25C32 8.7 25.3 2 17 2z" fill="${open ? "#113D33" : "#F7F4E9"}" stroke="${open ? "#F7F4E9" : "#113D33"}" stroke-width="2.5"/>
        <circle cx="17" cy="17" r="5" fill="${open ? "#F7F4E9" : "#113D33"}"/>
      </svg>
      <span class="sr-only">${loc.name}, ${loc.city}. ${open ? "Open" : "Coming soon"}.</span>
    </span>`,
  });
}

function clusterIcon(group: Location[], active: boolean) {
  return L.divIcon({
    className: "",
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    html: `<span class="sway-map-cluster${active ? " is-active" : ""}">
      <span aria-hidden="true">${group.length}</span>
      <span class="sr-only">${group.length} Sway locations here. Zoom in to see them.</span>
    </span>`,
  });
}

/** Groups locations whose pins would overlap at this zoom. */
function groupForZoom(map: L.Map, zoom: number, locations: Location[]) {
  const groups: { at: L.Point; locs: Location[] }[] = [];
  for (const loc of locations) {
    const at = map.project(loc.coords, zoom);
    const near = groups.find((g) => g.at.distanceTo(at) < CLUSTER_DISTANCE_PX);
    if (near) near.locs.push(loc);
    else groups.push({ at, locs: [loc] });
  }
  return groups.map((g) => g.locs);
}

function Pins({
  locations,
  activeSlug,
  onOpen,
}: {
  locations: Location[];
  activeSlug: string | null;
  onOpen: (loc: Location) => void;
}) {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());
  useMapEvents({ zoomend: () => setZoom(map.getZoom()) });
  const groups = useMemo(() => groupForZoom(map, zoom, locations), [map, zoom, locations]);

  const zoomInto = (group: Location[]) => {
    const bounds = L.latLngBounds(group.map((l) => l.coords));
    const options = { padding: [60, 60] as [number, number], maxZoom: 14 };
    if (reducedMotion()) map.fitBounds(bounds, options);
    else map.flyToBounds(bounds, { ...options, duration: 0.9 });
  };

  return (
    <>
      {groups.map((group) => {
        const active = group.some((l) => l.slug === activeSlug);
        if (group.length > 1) {
          const key = group.map((l) => l.slug).join("+");
          return (
            <Marker
              key={key}
              position={group[0].coords}
              icon={clusterIcon(group, active)}
              title={`${group.length} Sway locations`}
              zIndexOffset={active ? 1000 : 0}
              eventHandlers={{ click: () => zoomInto(group) }}
            />
          );
        }
        const loc = group[0];
        return (
          <Marker key={loc.slug} position={loc.coords} icon={pinIcon(loc, active)} title={loc.name} zIndexOffset={active ? 1000 : 0}>
            <Popup>
              <div className="location-map-popup">
                <p className="location-map-popup-name">{loc.name}</p>
                <p>{loc.status === "open" ? `Open · ${loc.city}, ${loc.state}` : `Coming soon · ${loc.city}, ${loc.state}`}</p>
                <button type="button" onClick={() => onOpen(loc)}>
                  View page
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

/** Keeps the view on what matters: every location shown, or the guest and their nearest spa. */
function View({
  locations,
  userCenter,
  nearest,
}: {
  locations: Location[];
  userCenter: [number, number] | null;
  nearest: Location | null;
}) {
  const map = useMap();
  const slugs = locations.map((l) => l.slug).join(",");
  const firstFit = useRef(true);

  useEffect(() => {
    if (userCenter || locations.length === 0) return;
    // The first view just appears. After that the map flies, so guests see where it's taking them.
    const fly = !firstFit.current && !reducedMotion();
    firstFit.current = false;
    const bounds = L.latLngBounds(locations.map((l) => l.coords));
    const options = { padding: [50, 50] as [number, number], maxZoom: 12 };
    if (fly) map.flyToBounds(bounds, { ...options, duration: 1.2 });
    else map.fitBounds(bounds, options);
    // slugs stands in for the list: refit only when the shown locations change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, slugs, userCenter]);

  useEffect(() => {
    if (!userCenter) return;
    const points = nearest ? [userCenter, nearest.coords] : [userCenter];
    const options = { padding: [60, 60] as [number, number], maxZoom: 11 };
    if (reducedMotion()) map.fitBounds(L.latLngBounds(points), options);
    else map.flyToBounds(L.latLngBounds(points), { ...options, duration: 1.4 });
  }, [map, userCenter, nearest]);

  return null;
}

export default function LocationsMap({
  locations,
  activeSlug,
  userCenter,
  nearest,
  onOpen,
}: {
  locations: Location[];
  activeSlug: string | null;
  userCenter: [number, number] | null;
  nearest: Location | null;
  onOpen: (loc: Location) => void;
}) {
  return (
    <MapContainer center={[39.8283, -98.5795]} zoom={4} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        // Carto requires a key since 2026 or it watermarks the map. Free up to 1M requests a month; sent by the
        // browser so it isn't secret. Requested 11/4/2026 by john@spaviadayspa.com, managed at dashboard.basemaps.carto.com
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=cb1_5267_1_6226aab21cd2478932e18836"
      />
      <View locations={locations} userCenter={userCenter} nearest={nearest} />
      {/* Pins are named for screen readers; each one is also in the location list (WCAG 2.5.8 equivalent control). */}
      <Pins locations={locations} activeSlug={activeSlug} onOpen={onOpen} />
      {userCenter && (
        <CircleMarker center={userCenter} radius={7} pathOptions={{ color: "#F7F4E9", weight: 2, fillColor: "#4A776D", fillOpacity: 1 }} />
      )}
    </MapContainer>
  );
}
