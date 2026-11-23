/**
 * What each founding membership tier is, in the terms a guest buys on: time on the table, what
 * they can choose each month, and a photo. One source for the founding page's tier cards
 * (FoundingLiveTiers), the location page's founding card and the checkout's side panel
 * (MembershipCheckout), so the three never describe a tier differently.
 *
 * Time is the lead (John 11/23/2026: "it should lean on time as a value factor"): 50, 70 and 90
 * minutes are the Signature Massage lengths at Essential, Premier and Ultimate. Treatment lists
 * match /locations/union-market/membership/. Signature Massage is light to medium pressure and
 * says so wherever it is named (CLAUDE.md content rule).
 *
 * Prices are NOT here: they live in lib/launchSites.ts (and are checked against Mindbody).
 */

import type { LaunchTierKey } from "./launchSites";

export type FoundingTierContent = {
  name: string;
  /** The longest treatment in the tier, in minutes. */
  minutes: number;
  /** True when shorter treatments are also in the tier ("Up to 70"). */
  upTo: boolean;
  /** "50 minutes, every month" */
  timeLine: string;
  /** One short line for tight spots (a row in a list). */
  short: string;
  /** One sentence under the tier name. */
  line: string;
  /** What a member picks from each month. */
  choose: string[];
  image: string;
  alt: string;
  /** CSS object-position for the card photo, when the centre crop would lose the subject. */
  imagePosition?: string;
};

export const FOUNDING_TIER_CONTENT: Record<LaunchTierKey, FoundingTierContent> = {
  essential: {
    name: "Essential",
    minutes: 50,
    upTo: false,
    timeLine: "50 minutes, every month",
    short: "A 50-minute massage or facial",
    line: "Our signature treatments. Fifty minutes that are yours, every month.",
    choose: [
      "Signature Massage, 50 min (light to medium pressure)",
      "Signature Facial, 50 min",
      "Maternity Massage, 50 min",
    ],
    image: "/assets/founding-tier-shoulder.jpg",
    alt: "A hand resting on a bare shoulder in warm light",
  },
  premier: {
    name: "Premier",
    minutes: 70,
    upTo: true,
    timeLine: "Up to 70 minutes, every month",
    short: "Up to 70 minutes, or a targeted treatment",
    line: "More time, or a treatment aimed at what your body or skin needs.",
    choose: [
      "Signature Massage, 70 min (light to medium pressure)",
      "Deep Tissue, Salt Stone, Sports or Lymphatic Drainage Massage, 50 min",
      "Targeted facials: Forever Young, Pore Perfection, Glow Getter, Sensitive Silk, Dr. Dennis Gross Vitamin C",
    ],
    image: "/assets/founding-tier-facial.jpg",
    alt: "A guest with eyes closed and cleansing foam on their face during a facial",
    imagePosition: "50% 30%",
  },
  ultimate: {
    name: "Ultimate",
    minutes: 90,
    upTo: true,
    timeLine: "Up to 90 minutes, every month",
    short: "Up to 90 minutes, or an advanced facial",
    line: "Our longest massages and most advanced facials.",
    choose: [
      "Signature Massage, 90 min (light to medium pressure)",
      "Deep Tissue, Salt Stone, Sports or Lymphatic Drainage Massage, 70 min",
      "Advanced facials: LED, oxygen infusion, microcurrent, Hydraderm",
    ],
    image: "/assets/boost-led.jpg",
    alt: "A guest resting under a red LED light during a facial",
  },
};
