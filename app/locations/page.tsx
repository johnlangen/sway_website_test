import { Metadata } from "next";
import LocationsContent from "./LocationsContent";

export const metadata: Metadata = {
  title: "Sway Wellness Spa | Locations",
  description:
    "Find a Sway Wellness Spa location near you. Visit our Denver spa or join founding-member waitlists for Dallas and Georgetown.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations",
  },
  openGraph: {
    title: "Sway Wellness Spa | Locations",
    description:
      "Explore Sway Wellness Spa locations. Denver is open now — Dallas and Georgetown coming soon.",
    url: "https://swaywellnessspa.com/locations",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/homepage_photo_outside.png",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Locations",
      },
    ],
  },
};

export default function LocationsPage() {
  return <LocationsContent />;
}
