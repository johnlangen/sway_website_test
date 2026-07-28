/**
 * Canonical slug -> display-name map for every Sway location.
 *
 * Single source of truth for the customer-facing name. Import this rather
 * than hardcoding a location name anywhere.
 *
 * WHY THIS EXISTS: the NavBar location chip reads the whole location object
 * out of localStorage (`sway_selected_location`), which caches the name at
 * the moment the guest picked it. When the DC location was rebranded
 * "Sway Georgetown" -> "Sway Union Market" (2026-07-27), every returning
 * guest who had already chosen DC kept seeing the old name indefinitely,
 * because nothing ever refreshed the cached copy.
 *
 * Resolving the name from the slug at render time makes any future rename
 * self-healing: change it here and stale caches correct themselves.
 *
 * NOTE: slugs are routes and lead-data keys. Renaming a SLUG is a breaking
 * change (see gotcha: DC is branded Union Market but its slug stays
 * "georgetown" on purpose). Renaming a NAME here is always safe.
 */

export const LOCATION_NAMES: Record<string, string> = {
  "denver-larimer": "Sway Larimer",
  "denver-rino": "Sway RiNo",
  "denver-central-park": "Sway Central Park",
  dallas: "Sway Knox/Henderson",
  georgetown: "Sway Union Market",
};

/**
 * Display name for a slug. Falls back to the passed-in name (e.g. a cached
 * localStorage value) so an unknown slug degrades gracefully instead of
 * rendering blank.
 */
export function locationDisplayName(
  slug: string | undefined,
  fallback?: string
): string {
  if (slug && LOCATION_NAMES[slug]) return LOCATION_NAMES[slug];
  return fallback ?? "";
}
