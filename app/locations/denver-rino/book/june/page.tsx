import type { Metadata } from "next";
import { ClubJuneBooking } from "@/app/components/ClubJuneBooking";

export const metadata: Metadata = {
  title: "Book a June Visit · Sway RiNo",
  robots: { index: false, follow: false },
};

export default function SwayRinoJuneBookPage() {
  return (
    <ClubJuneBooking basePath="/locations/denver-rino" mtLocationId={48717} clubLabel="RiNo" />
  );
}
