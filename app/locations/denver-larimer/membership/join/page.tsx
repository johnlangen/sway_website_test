import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MembershipCheckout from "@/app/components/MembershipCheckout";
import { membershipCheckout } from "@/lib/membershipOffers";

/**
 * Membership checkout for Sway Larimer (lib/membershipOffers.ts):
 *   /locations/denver-larimer/membership/join/?plan=essential|premier|ultimate|aescape30|aescape60|remedy
 * A card page: not indexed, and nothing about the guest is put in the URL. ?from= names the button
 * that opened it (tracking). ?memtest=1 runs Mindbody's no-charge test sale and records nothing;
 * ?memtest=1&preview=welcome opens on the welcome screen.
 */
export const metadata: Metadata = {
  title: { absolute: "Join | Membership | Sway Larimer" },
  robots: { index: false, follow: false },
};

export default async function LarimerMembershipJoinPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; perk?: string; from?: string; memtest?: string; preview?: string }>;
}) {
  const q = await searchParams;
  const found = membershipCheckout("denver-larimer", q);
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
