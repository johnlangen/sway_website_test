"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureGclid } from "@/lib/gclid";

/**
 * Persists the Google Ads click id (gclid / gbraid / wbraid) on landing so a
 * booking made later can be attributed to the ad that produced it. Renders
 * nothing. Re-runs on navigation because a paid landing can be any page.
 *
 * Deliberately reads window.location.search rather than useSearchParams(),
 * which would force a Suspense boundary around the whole layout.
 */
export default function AdAttribution() {
  const pathname = usePathname();
  useEffect(() => {
    captureGclid();
  }, [pathname]);
  return null;
}
