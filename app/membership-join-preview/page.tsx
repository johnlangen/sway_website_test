import type { Metadata } from "next";
import MembershipPage from "../locations/denver-larimer/membership/page";

/**
 * Unlisted production test route for the native membership join flow.
 *
 * Renders the exact Larimer membership page, but the pathname gate inside it
 * enables the native Mindbody purchase flow (the public page keeps the
 * Mindbody-hosted links until launch). Noindexed, robots-disallowed, not in
 * the sitemap, linked from nowhere.
 *
 * Testing: append ?memtest=1 for Mindbody Test:true dry-run purchases
 * (validates everything, charges nothing). Without it, purchases are REAL.
 */

export const metadata: Metadata = {
  title: "Membership Join Preview",
  robots: { index: false, follow: false },
};

export default MembershipPage;
