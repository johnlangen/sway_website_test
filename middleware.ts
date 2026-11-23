import { NextRequest, NextResponse } from "next/server";

/**
 * Saved-location redirect for the location hubs, done on the SERVER so the
 * picker never paints.
 *
 * Before this, /gift-cards, /membership, /offers and /book rendered the
 * location picker and only then (in a client useEffect) read the saved
 * location and redirected, so returning visitors saw the picker flash
 * before landing on their location's page. /book had a pre-paint script,
 * but only for Larimer.
 *
 * Every place a location is saved also sets the `sway_loc` cookie (picker
 * clicks, location pages, the hubs' own effects), so the request already
 * carries it. Rules match the hubs' client logic:
 *   - only open locations redirect (coming-soon / legacy slugs fall through), with one exception:
 *     /membership with a coming-soon location saved goes to that location's founding membership
 *     page (John 11/23/2026: "join the club goes to their founding memberships pages if their
 *     location is selected"; before, Join the Club dropped a Union Market visitor on the
 *     all-locations hub while a Larimer visitor went straight to Larimer's membership page)
 *   - `?choose` (the in-page "Change location" links) shows the picker
 *   - the query string is kept so gclid/utm attribution survives
 * The client-side effects stay as a fallback for visitors who only have
 * the localStorage copy (they also backfill the cookie).
 */
const OPEN_LOCATIONS = new Set([
  "denver-larimer",
  "denver-rino",
  "denver-central-park",
]);

// Coming-soon locations with a founding membership page: where Join the Club lands for them.
const FOUNDING_LOCATIONS = new Set(["union-market", "knox-henderson"]);

const HUBS: Record<string, string> = {
  "/gift-cards/": "gift-cards",
  "/membership/": "membership",
  "/offers/": "offers",
  "/book/": "book",
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
  const hub = HUBS[path];
  if (!hub || url.searchParams.has("choose")) return NextResponse.next();

  const slug = req.cookies.get("sway_loc")?.value;
  const founding = hub === "membership" && !!slug && FOUNDING_LOCATIONS.has(slug);
  if (!slug || !(OPEN_LOCATIONS.has(slug) || founding)) return NextResponse.next();

  const dest = url.clone();
  dest.pathname = founding ? `/locations/${slug}/founding-membership/` : `/locations/${slug}/${hub}/`;
  return NextResponse.redirect(dest, 307);
}

export const config = {
  matcher: [
    "/gift-cards",
    "/gift-cards/",
    "/membership",
    "/membership/",
    "/offers",
    "/offers/",
    "/book",
    "/book/",
  ],
};
