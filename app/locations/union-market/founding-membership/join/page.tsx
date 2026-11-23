import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MembershipCheckout from "@/app/components/MembershipCheckout";
import { LAUNCH_SITES } from "@/lib/launchSites";
import { launchCheckout } from "@/lib/membershipOffers";

/**
 * Founding membership checkout for Sway Union Market:
 *   /locations/union-market/founding-membership/join/?tier=essential|premier|ultimate
 * and for its Remedy Room membership sold before opening (a regular membership, not founding):
 *   /locations/union-market/founding-membership/join/?tier=remedy
 * The same checkout page every Sway membership uses (app/components/MembershipCheckout.tsx).
 * A card page: not indexed, and nothing about the guest is put in the URL. ?memtest=1 runs
 * Mindbody's no-charge test sale (works whether or not lib/launchSites.ts salesOpen is true).
 * ?memtest=1&preview=welcome opens on the welcome screen, to look at the celebration.
 */
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ tier?: string }> }): Promise<Metadata> {
  const remedy = ((await searchParams).tier || "").toLowerCase() === "remedy" && Boolean(LAUNCH_SITES["union-market"]?.remedyRoom);
  return {
    title: remedy ? "Join | Remedy Room Membership | Sway Union Market" : "Join | Founding Membership | Sway Union Market",
    robots: { index: false, follow: false },
  };
}

export default async function UnionMarketFoundingJoinPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string; from?: string; memtest?: string; preview?: string }>;
}) {
  const site = LAUNCH_SITES["union-market"];
  if (!site) notFound();
  const q = await searchParams;
  const found = launchCheckout(site, q.tier);
  return (
    <MembershipCheckout
      config={found.config}
      initialPlan={found.initialPlan}
      test={q.memtest !== undefined}
      previewWelcome={q.memtest !== undefined && q.preview === "welcome"}
      from={q.from ?? "founding"}
    />
  );
}
