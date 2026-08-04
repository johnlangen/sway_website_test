/**
 * Google Ads click-id capture (browser side).
 *
 * Why: Google Ads can tell us a click converted, but not whether the person
 * actually walked in. Persisting the gclid at landing and carrying it through
 * to the booking lets us later upload an OFFLINE conversion keyed to a
 * *completed* appointment — real attendance, not a form submit. It also
 * survives the gap between clicking today and booking three weeks later,
 * which same-session tracking misses entirely.
 *
 * Stored in a first-party cookie so it survives across pages and visits.
 * 90 days matches Google's maximum click-conversion lookback window.
 */

const COOKIE = "sway_gclid";
const MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

// gclid is the standard web click id; gbraid/wbraid replace it on iOS app
// and privacy-restricted traffic, so capture whichever arrived.
const PARAMS = ["gclid", "gbraid", "wbraid"] as const;

export function readGclid(): string | null {
  if (typeof document === "undefined") return null;
  try {
    const hit = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${COOKIE}=`));
    return hit ? decodeURIComponent(hit.split("=").slice(1).join("=")) : null;
  } catch {
    return null;
  }
}

/**
 * Reads a click id off the current URL and persists it. Called on every page
 * load; a page with no click id leaves any previously stored value intact, so
 * an ad click followed by organic browsing still attributes to the ad.
 */
export function captureGclid(): void {
  if (typeof window === "undefined") return;
  try {
    const qs = new URLSearchParams(window.location.search);
    for (const p of PARAMS) {
      const v = qs.get(p);
      if (v) {
        document.cookie =
          `${COOKIE}=${encodeURIComponent(v)}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
        return;
      }
    }
  } catch {
    // Never let attribution break a page render.
  }
}
