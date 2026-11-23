import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FoundingJoinFlow, { type FoundingTier } from "@/app/components/FoundingJoinFlow";
import { LAUNCH_SITES, LAUNCH_TIER_KEYS } from "@/lib/launchSites";

/**
 * Founding membership checkout for Sway Union Market:
 *   /locations/union-market/founding-membership/join/?tier=essential|premier|ultimate
 * A card page: not indexed, and nothing about the guest is put in the URL. ?memtest=1 runs
 * Mindbody's no-charge test sale (works whether or not lib/launchSites.ts salesOpen is true).
 * ?memtest=1&preview=welcome opens on the welcome screen, to look at the celebration.
 */
export const metadata: Metadata = {
  title: "Join | Founding Membership | Sway Union Market",
  robots: { index: false, follow: false },
};

export default async function UnionMarketFoundingJoinPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string; memtest?: string; preview?: string }>;
}) {
  const site = LAUNCH_SITES["union-market"];
  if (!site) notFound();
  const q = await searchParams;
  const tier = LAUNCH_TIER_KEYS.find((t) => t === (q.tier || "").toLowerCase()) ?? null;
  return (
    <FoundingJoinFlow
      locationKey={site.key}
      shortName={site.shortName}
      cityLine={site.cityLine}
      siteId={site.siteId}
      helpEmail={site.helpEmail}
      tiers={site.founding.tiers}
      initialTier={tier as FoundingTier | null}
      test={q.memtest !== undefined}
      previewWelcome={q.memtest !== undefined && q.preview === "welcome"}
      salesOpen={site.founding.salesOpen}
    />
  );
}
