import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MembershipCheckout from "@/app/components/MembershipCheckout";
import { membershipCheckout } from "@/lib/membershipOffers";

/**
 * Membership checkout for Sway RiNo (lib/membershipOffers.ts):
 *   /locations/denver-rino/membership/join/?plan=lounge, or essential|premier|ultimate (&perk=rate|visits) for founding
 * A card page: not indexed, and nothing about the guest is put in the URL. ?from= names the button
 * that opened it (tracking). ?memtest=1 runs Mindbody's no-charge test sale and records nothing;
 * ?memtest=1&preview=welcome opens on the welcome screen.
 */
export const metadata: Metadata = {
  title: { absolute: "Join | Membership | Sway RiNo" },
  robots: { index: false, follow: false },
};

export default async function RinoMembershipJoinPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; perk?: string; from?: string; memtest?: string; preview?: string }>;
}) {
  const q = await searchParams;
  const found = membershipCheckout("denver-rino", q);
  if (!found) notFound();
  return (
    <MembershipCheckout
      config={found.config}
      initialPlan={found.initialPlan}
      test={q.memtest !== undefined}
      previewWelcome={q.memtest !== undefined && q.preview === "welcome"}
      from={q.from ?? null}
    />
  );
}
