import type { ClubLocationKey } from "./clubLocations";

/**
 * Founding membership at the RiNo + Central Park clubs (massage + facial launch; Emily, Nov 2026).
 *
 * Mindbody: contracts 137 / 138 / 139 ("Founding Essential / Premier / Ultimate", $89 / $119 / $149)
 * exist on BOTH club sites, read live 11/2/2026. SoldOnline=false, same as contract 143.
 *
 * `salesOpen` sells on the site through MembershipJoinFlow (John 11/2). Set it false to go back to a
 * first access list at that club. The contract starts the day of sale, even before rooms open; the
 * treatment waits on the account and rolls over for 12 months, and the page says so.
 *
 * The Lounge visits perk is manual, the way Larimer ran its founding Remedy visits: the guest joins on
 * the regular contract (122 / 123 / 124) and the desk tracks the visits in their profile notes
 * ("FM - 6 free remedy room visits", then each use logged). Nothing in Mindbody counts them down.
 */

export type FoundingTierKey = "essential" | "premier" | "ultimate";

export const FOUNDING_RATES: Record<FoundingTierKey, { founding: number; regular: number; dropIn: number; contractId: number; regularContractId: number }> = {
  essential: { founding: 89, regular: 99, dropIn: 139, contractId: 137, regularContractId: 122 },
  premier: { founding: 119, regular: 129, dropIn: 169, contractId: 138, regularContractId: 123 },
  ultimate: { founding: 149, regular: 159, dropIn: 199, contractId: 139, regularContractId: 124 },
};

/** Show "X of 50 left" only once this many are really taken. Before that the page just says "Only 50". */
export const SHOW_COUNT_FROM = 10;

/** The other founding perk Emily's team offers at the desk: six Remedy Lounge visits ($49 drop-in). */
export const LOUNGE_VISIT_PERK = { visits: 6, dropIn: 49 };

export type ClubFoundingConfig = {
  shortName: string; // "Sway RiNo"
  place: string; // "RiNo"
  analyticsKey: string; // same keys as ClubMembershipPage
  salesOpen: boolean;
  /** Founding leads the club's /membership page while true (John 11/2: "the main star for the time being"). */
  leadsMembershipPage: boolean;
  /** Real cap. The founding rate genuinely ends here; regular memberships keep selling. */
  cap: number;
  /** Real deadline, written the way the page says it. */
  closesLabel: string;
  /** When massage + facials start, as the page says it. The clubs are already open for the Remedy Lounge.
   *  Month level on purpose: the working dates (RiNo 11/16, CP 11/30 or 12/1) stay private until locked. */
  opensLabel: string;
  hero: { src: string; width: number; height: number; alt: string; position: string; caption?: string };
  clubImage: string;
  clubImageAlt: string;
  lounge: string; // what the Lounge is at this club (real modalities only)
};

/** Real spots left at a club, or null while the page shouldn't show a count. */
export function spotsLeftLabel(claimed: number | null, cap: number): string | null {
  if (claimed === null || claimed < SHOW_COUNT_FROM) return null;
  const left = Math.max(cap - claimed, 0);
  return left === 0 ? `All ${cap} founding memberships are taken` : `${left} of ${cap} left`;
}

export const CLUB_FOUNDING: Record<ClubLocationKey, ClubFoundingConfig> = {
  "denver-rino": {
    shortName: "Sway RiNo",
    place: "RiNo",
    analyticsKey: "rino",
    salesOpen: true,
    leadsMembershipPage: true,
    cap: 50,
    closesLabel: "January 31",
    opensLabel: "in mid-November",
    // John 11/2: the rendering is very close to how RiNo's treatment area looks
    hero: {
      src: "/assets/rino-treatment-rendering.jpg",
      width: 2000,
      height: 861,
      alt: "Rendering of the treatment area at Sway RiNo, with warm lighting, shelves of skincare and a hallway to the treatment rooms",
      position: "48% 50%",
      caption: "Rendering of Sway RiNo",
    },
    clubImage: "/assets/rino1.jpeg",
    clubImageAlt: "Recovery pool at Sway RiNo",
    lounge: "Traditional and infrared saunas, cold plunge, compression therapy and PEMF, in one 75-minute session.",
  },
  "denver-central-park": {
    shortName: "Sway Central Park",
    place: "Central Park",
    analyticsKey: "central_park",
    salesOpen: true,
    leadsMembershipPage: true,
    cap: 50,
    closesLabel: "January 31",
    opensLabel: "in December",
    // A generic massage photo until Central Park has a rendering: never Larimer's rooms (John 11/2)
    hero: {
      src: "/assets/founding-massage-lamp.jpg",
      width: 2200,
      height: 1466,
      alt: "A massage therapist working on a guest's back in lamplight",
      position: "50% 50%",
    },
    clubImage: "/assets/centralpark2.jpg",
    clubImageAlt: "Cold plunges and sauna at Sway Central Park",
    lounge: "Traditional and infrared saunas, cold plunges, a warm soak, compression therapy and PEMF, in one 75-minute session.",
  },
};
