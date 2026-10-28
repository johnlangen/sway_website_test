import type { Metadata } from "next";
import GiftCheckoutPage from "@/app/components/gift/GiftCheckoutPage";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "Buy a Sway Larimer Gift Card | Sway Wellness" },
  description: "Buy a Sway Larimer gift card online: choose an amount and design, add a message, and send it by email now or on a date you pick.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <GiftCheckoutPage slug="denver-larimer" />;
}
