"use client";

import { useEffect } from "react";

/**
 * Embeds the Mariana Tek (MT) booking widget for the former Upswell locations.
 * Bridge solution through the Mindbody cutover. Tenant + view ID are derived
 * from Upswell's production booking URL; only the location ID differs per site.
 *   RiNo Station = 48717 · Central Park = 48718
 *
 * The MT loader is injected in a useEffect (not next/script) so it re-executes
 * on every mount. next/script's afterInteractive strategy runs the loader only
 * once and caches it, so on client-side navigation MT never re-scans the DOM
 * for the booking div and the widget silently fails to render until a full
 * page reload.
 */
export function MarianaBookingWidget({ locationId }: { locationId: number }) {
  useEffect(() => {
    const TENANT_NAME = "upswellstudio";
    const sources = ["polyfills", "js"];
    const added: HTMLScriptElement[] = [];

    sources.forEach((name) => {
      const s = document.createElement("script");
      s.src = `https://${TENANT_NAME}.marianaiframes.com/${name}`;
      // async=false preserves insertion order (polyfills before js).
      s.async = false;
      s.setAttribute("data-timestamp", String(Date.now()));
      (document.head || document.body).appendChild(s);
      added.push(s);
    });

    return () => {
      added.forEach((s) => s.remove());
    };
  }, [locationId]);

  return (
    <div
      data-mariana-integrations={`/schedule/daily/48541?locations=${locationId}`}
      className="min-h-[800px] w-full"
    />
  );
}
