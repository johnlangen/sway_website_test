/**
 * Sway spas that are not open yet but have their OWN Mindbody site and sell founding memberships on
 * the website (Union Market first, Nov 2026; modeled on the Spavia site's founding checkout).
 *
 * Each is a separate franchise-owned Mindbody site, so every call carries its SiteId and a staff
 * login that exists ON THAT SITE. None of Sway Denver's logins work there: the owner (or the
 * franchise coach) adds a staff user for the website and its username/password go in Vercel as
 * MINDBODY_STAFF_USER_<siteId> / MINDBODY_STAFF_PASS_<siteId>. If John's shared Manager login
 * (MINDBODY_STAFF_USER2) is added to the site instead, it is picked up with no Vercel change.
 *
 * What is sold is decided by Mindbody, not by this file: the purchase route re-reads the contract
 * before every sale and refuses when its name, price or billing date no longer match (see
 * lib/launchFounding.ts). The numbers here are what the PAGE shows.
 *
 * Billing, read live 11/23/2026 (contracts 137-139 at Union Market, sold online, "charged on a
 * specific date" 2027-02-05): the first month is charged at signup, the membership starts on that
 * date, and the next charge is a month after it. Same as the Spavia founding checkout and
 * Mindbody's own store.
 */

export type LaunchSiteKey = "union-market";
export type LaunchTierKey = "essential" | "premier" | "ultimate";

export interface LaunchSite {
  key: LaunchSiteKey;
  /** "Sway Union Market" */
  shortName: string;
  /** "Union Market" */
  place: string;
  cityLine: string;
  siteId: string;
  /** Mindbody LocationId founding memberships are sold at (the spa itself; the contracts are restricted to it). */
  locationId: number;
  /** IANA zone of the Mindbody site: "today" for a sale is the spa's day, not Denver's. */
  timezone: string;
  /** Where a guest who gets stuck is sent. No spa phone line exists before opening. */
  helpEmail: string;
  founding: {
    /**
     * The founding page's Join buttons open the website checkout. Keep false until one no-charge
     * test purchase (?memtest=1 on the join page) has passed on this site: no real sale should be
     * the first time a new Mindbody site is exercised. The join page works with ?memtest=1 either way.
     */
    salesOpen: boolean;
    /** Founding spots, as the founding page has said since the waitlist opened. */
    cap: number;
    /**
     * price = the founding rate (checked against the Mindbody contract before every sale).
     * regular = the spa's regular monthly membership, visit = its single-visit price: what the
     * founding rate is shown against. Display only, read from the spa's own Mindbody.
     */
    tiers: Record<LaunchTierKey, { contractId: number; price: number; regular?: number; visit?: number }>;
  };
}

export const LAUNCH_SITES: Record<LaunchSiteKey, LaunchSite> = {
  "union-market": {
    key: "union-market",
    shortName: "Sway Union Market",
    place: "Union Market",
    cityLine: "Washington, DC",
    siteId: "5757939",
    locationId: 1,
    timezone: "America/New_York",
    helpEmail: "contact@swaywellnessspa.com",
    founding: {
      // On sale since 11/23/2026: staff login added to this Mindbody site and John's no-charge
      // test passed ($89 due today, starts Feb 5, 2027).
      salesOpen: true,
      cap: 150,
      tiers: {
        // regular + visit: Union Market's Mindbody on 11/23/2026 (memberships $99 / $129 / $159 a
        // month, "Massage Treatments" and "Skin Care Treatments" $139 / $169 / $199).
        essential: { contractId: 137, price: 89, regular: 99, visit: 139 },
        premier: { contractId: 138, price: 119, regular: 129, visit: 169 },
        ultimate: { contractId: 139, price: 149, regular: 159, visit: 199 },
      },
    },
  },
};

export const LAUNCH_TIER_KEYS: LaunchTierKey[] = ["essential", "premier", "ultimate"];

export function getLaunchSite(key: string | null | undefined): LaunchSite | null {
  return key && key in LAUNCH_SITES ? LAUNCH_SITES[key as LaunchSiteKey] : null;
}

export function getLaunchSiteBySiteId(siteId: string | null | undefined): LaunchSite | null {
  if (!siteId) return null;
  return Object.values(LAUNCH_SITES).find((s) => s.siteId === String(siteId)) ?? null;
}

export const isLaunchSiteId = (siteId: string | null | undefined) => getLaunchSiteBySiteId(siteId) !== null;

/** The tier a contract id sells at this site, or null when the website doesn't sell it. */
export function launchTierForContract(site: LaunchSite, contractId: number): LaunchTierKey | null {
  return LAUNCH_TIER_KEYS.find((t) => site.founding.tiers[t].contractId === contractId) ?? null;
}

/** Env var names for this site's staff login, most specific first. */
export function launchStaffEnv(site: LaunchSite): { userEnv: string; passEnv: string }[] {
  return [
    { userEnv: `MINDBODY_STAFF_USER_${site.siteId}`, passEnv: `MINDBODY_STAFF_PASS_${site.siteId}` },
    { userEnv: "MINDBODY_STAFF_USER2", passEnv: "MINDBODY_STAFF_PASS2" },
  ];
}

/** yyyy-mm-dd today in the spa's own time zone. */
export function launchToday(site: LaunchSite, at = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: site.timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(at);
}
