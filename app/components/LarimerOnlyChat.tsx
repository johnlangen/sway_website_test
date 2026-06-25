"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STYLE_ID = "hide-bowtie-non-larimer";

/**
 * The site-wide Bowtie chat (token "sway_larimer_square") is Larimer-specific,
 * but the script loads globally. Show the chat ONLY on Larimer location pages;
 * hide it everywhere else (homepage, general/service pages, the clubs,
 * Georgetown, Dallas) until those locations get their own chat widgets.
 *
 * CSS-hide (not script removal) so it survives client-side navigation — the
 * global script loads once; we just toggle the widget's visibility per route.
 */
export function LarimerOnlyChat() {
  const pathname = usePathname();
  useEffect(() => {
    const isLarimer = !!pathname && pathname.startsWith("/locations/denver-larimer");
    const existing = document.getElementById(STYLE_ID);
    if (isLarimer) {
      existing?.remove();
      return;
    }
    if (!existing) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = "#bowtie-widget-container{display:none !important;}";
      document.head.appendChild(el);
    }
  }, [pathname]);
  return null;
}
