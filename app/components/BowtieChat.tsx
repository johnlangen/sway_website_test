"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* ================================================================
   BOWTIE CHAT — route-aware, multi-location loader

   ⚠️ DORMANT — NOT MOUNTED ANYWHERE YET (as of 2026-07-13).
   Larimer chat still runs via the inline script in app/layout.tsx +
   LarimerOnlyChat. This component replaces BOTH once the RiNo and
   Central Park Bowtie phone numbers are provisioned.

   Full activation checklist: docs/bowtie-club-chat-activation.md

   Why a loader component instead of three inline scripts:
   Bowtie sets a single global window.bowtieDataToken per page load,
   so only ONE location identity can exist at a time. This component
   injects the snippet for the FIRST location page the visitor lands
   on ("first location wins") and CSS-hides the widget everywhere the
   route doesn't match that location. Cross-location navigation in one
   session is rare; a hard reload on the new location page picks up
   the right widget. Pages outside any location (homepage, service
   pages, Georgetown, Dallas) never load or show chat — same rule as
   today, and a small perf win (no Bowtie JS on the homepage).
================================================================ */

// Per-location Bowtie tokens. A location's chat goes live by listing
// it here — nothing else in this file changes per location.
const LOCATION_TOKENS: { prefix: string; token: string }[] = [
  { prefix: "/locations/denver-larimer", token: "sway_larimer_square" },
  // ACTIVATION (step 2 in docs/bowtie-club-chat-activation.md):
  // uncomment when Bowtie confirms the club phone numbers are live.
  // { prefix: "/locations/denver-rino", token: "sway_rino" },
  // { prefix: "/locations/denver-central-park", token: "sway_central_park" },
];

const STYLE_ID = "hide-bowtie-off-location";

function tokenForPath(pathname: string | null): string | null {
  if (!pathname) return null;
  const hit = LOCATION_TOKENS.find((l) => pathname.startsWith(l.prefix));
  return hit ? hit.token : null;
}

export function BowtieChat() {
  const pathname = usePathname();
  const loadedToken = useRef<string | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const desired = tokenForPath(pathname);

    // Inject the official Bowtie snippet (async loader), once per page
    // load, keyed to the first location visited.
    if (desired && !loadedToken.current) {
      loadedToken.current = desired;
      const w = window as unknown as Record<string, any>;
      w["bowtieDataToken"] = desired;
      w[desired] =
        w[desired] ||
        function () {
          (w[desired].i = w[desired].i || []).push(arguments);
        };
      w[desired].o = Date.now();
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://s3.amazonaws.com/bowtie.ai/bowtieJS/bowtie_widget.js";
      document.head.appendChild(script);
    }

    // Show the widget only while the route belongs to the location the
    // loaded widget represents; CSS-hide it everywhere else. Booking
    // flows additionally hide it via HideFloatingWidgets — the two
    // style tags are independent and compose.
    const show = !!desired && desired === loadedToken.current;
    const existing = document.getElementById(STYLE_ID);
    if (show) {
      existing?.remove();
    } else if (!existing) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = "#bowtie-widget-container{display:none !important;}";
      document.head.appendChild(el);
    }
  }, [pathname]);

  return null;
}
