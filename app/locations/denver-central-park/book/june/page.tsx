import type { Metadata } from "next";
import { ClubJuneBooking } from "@/app/components/ClubJuneBooking";

export const metadata: Metadata = {
  title: "Book a June Visit · Sway Central Park",
  robots: { index: false, follow: false },
};

export default function SwayCentralParkJuneBookPage() {
  return (
    <ClubJuneBooking basePath="/locations/denver-central-park" mtLocationId={48718} clubLabel="Central Park" />
  );
}
