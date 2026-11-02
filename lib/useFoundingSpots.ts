"use client";

import { useEffect, useState } from "react";
import { spotsLeftLabel } from "./clubFounding";
import type { ClubLocationKey } from "./clubLocations";

/** The real spots-left line from Mindbody; null until enough are taken to show it. */
export function useFoundingSpots(clubKey: ClubLocationKey) {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    fetch(`/api/founding/count/?club=${clubKey}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setLabel(spotsLeftLabel(d.claimed, d.cap)))
      .catch(() => {});
  }, [clubKey]);
  return label;
}
