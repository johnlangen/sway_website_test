"use client";

import { useEffect } from "react";

/**
 * Hides third-party floating widgets while a booking flow is mounted:
 * - Attentive's offer chip / signup overlay ("Get $40 Off") — #attentive_overlay
 * - Bowtie's chat bubble — #bowtie-widget-container
 * Both render bottom-fixed at very high z-index and cover the flow's sticky
 * CTA bar on mobile. Scoped: the style tag is removed on unmount, so the
 * widgets come back everywhere else on the site.
 *
 * attentiveOnly: hides just the Attentive chip, leaving Bowtie chat visible.
 * For the club location layouts once RiNo/CP get their own Bowtie widgets —
 * the Attentive offer is Larimer-specific but the chat belongs on club pages.
 * (See docs/bowtie-club-chat-activation.md.)
 */
export function HideFloatingWidgets({ attentiveOnly = false }: { attentiveOnly?: boolean }) {
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-hide-floating-widgets", "true");
    style.textContent = `
      #attentive_overlay, #attentive_creative, iframe[id^="attentive"] { display: none !important; }
      ${attentiveOnly ? "" : "#bowtie-widget-container { display: none !important; }"}
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, [attentiveOnly]);
  return null;
}
