"use client";

import { useEffect, useState } from "react";
import { HideFloatingWidgets } from "@/app/components/HideFloatingWidgets";
import { getSelectedLocation } from "@/app/components/LocationAwareHref";
import { popupMatchesLocation } from "@/lib/locationPopups";
import { trackStep } from "@/lib/ops/client";

/**
 * For shared pages (the homepage): hides the sign-up popup when the guest has picked a location
 * that has no popup of its own, so a Union Market or RiNo guest is not offered Larimer's deal.
 * Chat is left alone. Counted once per page view, by location (lib/locationPopups.ts).
 */
export default function LocationPopupGate() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const slug = getSelectedLocation()?.slug;
    if (popupMatchesLocation(slug)) return;
    setHide(true);
    trackStep("lead", "popup-hidden", slug);
  }, []);
  return hide ? <HideFloatingWidgets attentiveOnly /> : null;
}
