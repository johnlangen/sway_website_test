import { notFound } from "next/navigation";
import { HideFloatingWidgets } from "@/app/components/HideFloatingWidgets";
import { giftCheckoutOn, giftSite } from "@/lib/giftCards/sites";
import GiftCheckoutFlow from "./GiftCheckoutFlow";

/** Server wrapper for /locations/<slug>/gift-cards/checkout/ */
export default function GiftCheckoutPage({ slug }: { slug: string }) {
  const site = giftSite(slug);
  if (!site) notFound();
  // GIFT_CHECKOUT=off in Vercel: no new purchases (the page points to Mindbody's store), but gift
  // links (#gift=…, in emails already sent or scheduled) and status checks keep working
  return (
    <>
      <HideFloatingWidgets />
      <GiftCheckoutFlow
        paused={!giftCheckoutOn()}
        site={{
          slug: site.slug,
          name: site.name,
          phone: site.phone,
          contactEmail: site.contactEmail,
          timezone: site.timezone,
          mindbodyUrl: site.mindbodyUrl,
        }}
      />
    </>
  );
}
