/**
 * Sway "My Account" — Mindbody consumer portal links.
 *
 * Every Sway location is its OWN Mindbody site, which means a guest's login,
 * password, and appointment history live per-site. There is no cross-location
 * account. Sending a RiNo member to the Larimer portal is a SILENT failure:
 * the page is Sway-branded and looks correct, her email simply is not found,
 * and she concludes her account is broken.
 *
 * Because of that, `myAccountHrefForPath` resolves ONLY from the URL pathname,
 * never from the `sway_selected_location` localStorage value. A stale saved
 * location quietly routing someone to the wrong studio is exactly the failure
 * mode /clubs/book was written to avoid (see app/clubs/book/page.tsx). When we
 * cannot tell the location from the path, we send the guest to the /my-account
 * picker and let them choose.
 *
 * Larimer's site id is inlined here rather than read from MINDBODY_SITE_ID
 * because these links render in client components; the env var is server-side
 * only, and this id is public anyway (it ships in the booking widget URLs).
 */

import { CLUB_LOCATIONS } from "./clubLocations";

export const LARIMER_SITE_ID = "5739770";

export interface MyAccountLocation {
  /** URL segment under /locations/. */
  slug: string;
  /** Customer-facing label, always shown next to the link so a guest who
   *  lands on the wrong portal can self-correct. */
  label: string;
  city: string;
  siteId: string;
}

export const MY_ACCOUNT_LOCATIONS: MyAccountLocation[] = [
  {
    slug: "denver-larimer",
    label: "Sway Larimer Square",
    city: "Denver, CO",
    siteId: LARIMER_SITE_ID,
  },
  {
    slug: "denver-rino",
    label: "Sway RiNo",
    city: "Denver, CO",
    siteId: CLUB_LOCATIONS["denver-rino"].siteId,
  },
  {
    slug: "denver-central-park",
    label: "Sway Central Park",
    city: "Aurora, CO",
    siteId: CLUB_LOCATIONS["denver-central-park"].siteId,
  },
];

/**
 * Mindbody's consumer account portal for one site. Lands on sign-in when
 * signed out; My Schedule (with per-appointment Reschedule and Cancel) once
 * signed in.
 */
export function myAccountUrl(siteId: string): string {
  return `https://clients.mindbodyonline.com/consumermyinfo?studioid=${siteId}`;
}

/**
 * Location-aware My Account target, mirroring how `bookHref` resolves in
 * NavBar: straight to the studio portal on a location page, otherwise the
 * picker. Returns an internal path or an external URL, so render it with a
 * plain <a> rather than next/link.
 */
export function myAccountHrefForPath(pathname: string | null | undefined): string {
  const match = MY_ACCOUNT_LOCATIONS.find((loc) =>
    pathname?.startsWith(`/locations/${loc.slug}`)
  );
  return match ? myAccountUrl(match.siteId) : "/my-account";
}

/** The location a pathname resolves to, or null off a location page. */
export function myAccountLocationForPath(
  pathname: string | null | undefined
): MyAccountLocation | null {
  return (
    MY_ACCOUNT_LOCATIONS.find((loc) =>
      pathname?.startsWith(`/locations/${loc.slug}`)
    ) ?? null
  );
}
