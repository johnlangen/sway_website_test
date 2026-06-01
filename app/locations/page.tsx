import { Metadata } from "next";
import LocationsContent from "./LocationsContent";

export const metadata: Metadata = {
  title: "Sway Wellness Spa | Locations",
  description:
    "Find a Sway Wellness Spa near you. Three Denver locations now open in Larimer Square, RiNo, and Central Park, with Dallas and Georgetown coming soon.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/",
  },
  openGraph: {
    title: "Sway Wellness Spa | Locations",
    description:
      "Explore Sway Wellness Spa locations. Three Denver spas now open in Larimer Square, RiNo, and Central Park. Dallas and Georgetown coming soon.",
    url: "https://swaywellnessspa.com/locations/",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
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
