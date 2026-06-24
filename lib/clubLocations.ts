/**
 * Sway Wellness Club — per-location Mindbody config (RiNo + Central Park).
 *
 * These are the recovery-led "club" locations converted from Upswell. Each is its
 * OWN Mindbody site (separate LLC), so every Mindbody call for these locations must
 * use that site's SiteId + a site-specific staff login token. Larimer (the full spa,
 * site 5739770) is intentionally NOT in here — it keeps using the default
 * MINDBODY_SITE_ID / MINDBODY_STAFF_USER env vars and the existing booking flows.
 *
 * IDs below were pulled live from the Mindbody API on 2026-06-07
 * (see /v6/site/sessiontypes + /v6/staff/staff for each site).
 *
 * Caps below match the LOUNGE_FINAL model locked May 26 (see the internal
 * dashboard app/internal/upswell/page.tsx, data-backed from the Upswell MT
 * exports): Lounge concurrent cap 15 RiNo / 18 CP, traditional sauna 4 seats
 * each, infrared 3 cabins RiNo / 4 cabins CP. These are concurrent-in-one-window
 * counts (the dashboard's "9/12 per slot" figures are seats × 3 rotations =
 * throughput, not concurrent capacity). Mindbody's bookableitems still enforces
 * resource availability server-side, so these numbers are belt-and-suspenders for
 * the UI, not the source of truth.
 */

export type ClubLocationKey = "denver-rino" | "denver-central-park";

export type SaunaKey = "traditional" | "infrared";

export interface SaunaModality {
  key: SaunaKey;
  label: string;
  sessionTypeId: number;
  /** Mindbody "staff" id that represents this sauna as a bookable resource. */
  resourceStaffId: number;
  minutes: number;
  /** Concurrent guests this sauna can hold in one 25-min window. PLACEHOLDER. */
  capacity: number;
  /**
   * Individual cabins for a multi-cabin sauna (infrared only — the traditional
   * sauna is one shared room). Each cabin is its OWN Mindbody provider (a
   * dedicated "staff" resource), so a booking is routed to a specific cabin and
   * Mindbody/our occupancy gating enforces one guest per cabin at a time — a
   * real reservation, not just a note. `resourceStaffId` is that provider's
   * Mindbody staff id. Omit `cabins` entirely for single-room saunas; a cabin
   * without a `resourceStaffId` falls back to the pooled `resourceStaffId` above
   * (soft preference, label-only). Count should match `capacity`.
   */
  cabins?: { label: string; resourceStaffId?: number }[];
}

export interface ClubLocation {
  key: ClubLocationKey;
  /** Customer-facing location label. */
  label: string;
  /** Mindbody SiteId for this location. */
  siteId: string;
  /** Mindbody LocationId within the site. */
  locationId: number;
  phone: string;
  /** Customer-facing contact email for this club (no shared phone line yet —
   *  new per-location phone systems are being provisioned). */
  contactEmail: string;
  /** Env var names holding this site's staff API login (provisioned by John). */
  staffCreds: { userEnv: string; passEnv: string };
  remedyLounge: {
    sessionTypeId: number;
    /** "staff" id representing the Lounge resource. */
    resourceStaffId: number;
    /** Customer-facing service length. */
    serviceMinutes: number;
    /** Cleaning buffer baked into the Mindbody session type (85 = 75 + 10). */
    bufferMinutes: number;
    /** Concurrent guests in the Lounge. Effectively unconstrained. PLACEHOLDER. */
    capacity: number;
    price: string;
    memberPrice: string;
  };
  /** Lounge hero/carousel images (reused from the location page). */
  loungeImages: string[];
  saunas: SaunaModality[];
  /** Fake test provider(s) in Mindbody used for booking dry-runs (no real
   *  therapist hired yet). NOTE: the other appointment-instructor staff on these
   *  sites (Mackenzie, George, Sarah, Kyana, Halle, etc.) are wellness
   *  coordinators / front desk and must NOT be assigned bookable services. */
  testTherapistIds: number[];
}

export const CLUB_LOCATIONS: Record<ClubLocationKey, ClubLocation> = {
  "denver-rino": {
    key: "denver-rino",
    label: "RiNo",
    siteId: "5754020",
    locationId: 1,
    phone: "(303) 476-6150",
    contactEmail: "contact@swayrino.com",
    // Both club sites use John's shared Manager login (MINDBODY_STAFF_USER2/PASS2),
    // which has access to all three Sway sites. Larimer keeps Jocelyn's
    // MINDBODY_STAFF_USER/PASS untouched.
    staffCreds: {
      userEnv: "MINDBODY_STAFF_USER2",
      passEnv: "MINDBODY_STAFF_PASS2",
    },
    remedyLounge: {
      sessionTypeId: 132,
      resourceStaffId: 100000004,
      serviceMinutes: 75,
      bufferMinutes: 10,
      capacity: 15,
      price: "$49",
      memberPrice: "$25",
    },
    loungeImages: ["/assets/rino1.jpeg", "/assets/rino2.jpeg"],
    saunas: [
      {
        key: "traditional",
        label: "Traditional Sauna",
        sessionTypeId: 133,
        resourceStaffId: 100000005,
        minutes: 25,
        capacity: 4,
      },
      {
        key: "infrared",
        label: "Infrared Sauna",
        sessionTypeId: 134,
        resourceStaffId: 100000006,
        minutes: 25,
        capacity: 3,
        // RiNo's 3 infrared cabins are physically labeled "Glow 1-3". Each is
        // its own Mindbody provider (created 2026-06-23).
        cabins: [
          { label: "Glow 1", resourceStaffId: 100000015 },
          { label: "Glow 2", resourceStaffId: 100000016 },
          { label: "Glow 3", resourceStaffId: 100000017 },
        ],
      },
    ],
    // "Esty" — fake test provider configured for massage + facial dry-runs.
    testTherapistIds: [100000013],
  },

  "denver-central-park": {
    key: "denver-central-park",
    label: "Central Park",
    siteId: "5754021",
    locationId: 1,
    phone: "(303) 476-6150",
    contactEmail: "contact@swaycentralpark.com",
    // Shares John's Manager login (see RiNo note above).
    staffCreds: {
      userEnv: "MINDBODY_STAFF_USER2",
      passEnv: "MINDBODY_STAFF_PASS2",
    },
    remedyLounge: {
      sessionTypeId: 132,
      resourceStaffId: 100000002,
      serviceMinutes: 75,
      bufferMinutes: 10,
      capacity: 18,
      price: "$49",
      memberPrice: "$25",
    },
    // .jpg, not .png: the June audit re-encoded these (commit 4b86ec6).
    loungeImages: ["/assets/centralpark1.jpg", "/assets/centralpark2.jpg"],
    // NOTE: Central Park has Infrared/Traditional SWAPPED vs RiNo.
    // CP: ST 133 = Infrared (staff 100000003), ST 134 = Traditional (staff 100000004).
    saunas: [
      {
        key: "traditional",
        label: "Traditional Sauna",
        sessionTypeId: 134,
        resourceStaffId: 100000004,
        minutes: 25,
        capacity: 4,
      },
      {
        key: "infrared",
        label: "Infrared Sauna",
        sessionTypeId: 133,
        resourceStaffId: 100000003,
        minutes: 25,
        capacity: 4,
        // CP's 4 infrared cabins, each its own Mindbody provider (Glow 1-4,
        // created 2026-06-23). NOTE: CP staff ids differ from RiNo's.
        cabins: [
          { label: "Glow 1", resourceStaffId: 100000016 },
          { label: "Glow 2", resourceStaffId: 100000017 },
          { label: "Glow 3", resourceStaffId: 100000018 },
          { label: "Glow 4", resourceStaffId: 100000019 },
        ],
      },
    ],
    // "Esty" — fake test provider configured for massage + facial dry-runs.
    testTherapistIds: [100000014],
  },
};

export function getClubLocation(key: string): ClubLocation | null {
  return (CLUB_LOCATIONS as Record<string, ClubLocation>)[key] ?? null;
}

/** Look up a club location by Mindbody SiteId (used by site-aware API routes). */
export function getClubBySiteId(siteId: string): ClubLocation | null {
  return (
    Object.values(CLUB_LOCATIONS).find((l) => l.siteId === siteId) ?? null
  );
}

/** All site IDs that are "club" sites (i.e. not the default Larimer site). */
export function isClubSiteId(siteId: string | undefined | null): boolean {
  if (!siteId) return false;
  return Object.values(CLUB_LOCATIONS).some((l) => l.siteId === siteId);
}
