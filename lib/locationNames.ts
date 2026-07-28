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
 * NOTE: slugs are routes AND lead-data keys, so renaming one is a breaking
 * change. Renaming a NAME here is always safe.
 */

export const LOCATION_NAMES: Record<string, string> = {
  "denver-larimer": "Sway Larimer",
  "denver-rino": "Sway RiNo",
  "denver-central-park": "Sway Central Park",
  "knox-henderson": "Sway Knox/Henderson",
  "union-market": "Sway Union Market",
};

/**
 * Slugs were renamed on 2026-07-28 (dallas -> knox-henderson, georgetown ->
 * union-market). Lead records already in Upstash carry the OLD value in their
 * `location` field, and those rows are deliberately NOT rewritten: mutating
 * production lead data in place risks losing entries for no real gain.
 *
 * Read paths must therefore match a location against every key it has ever
 * had. New submissions write the current slug, so this map only ever needs
 * to grow if a slug changes again.
 */
export const LOCATION_KEY_ALIASES: Record<string, string[]> = {
  "knox-henderson": ["knox-henderson", "dallas"],
  "union-market": ["union-market", "georgetown"],
};

/** Every `location` value that should count as this location. */
export function locationKeysFor(slug: string): string[] {
  return LOCATION_KEY_ALIASES[slug] ?? [slug];
}

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
