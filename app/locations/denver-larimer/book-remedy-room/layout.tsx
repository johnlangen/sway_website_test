import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Remedy Room | Cold Plunge + Sauna | Sway Larimer (Denver, CO)",
  description:
    "Book the Remedy Room at Sway Larimer in Denver. Cold plunge + sauna recovery experience. Pick a time and reserve instantly online.",
  alternates: {
    canonical:
      "https://swaywellnessspa.com/locations/denver-larimer/book-remedy-room",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/book-remedy-room",
    title: "Book Remedy Room | Cold Plunge + Sauna | Sway Larimer (Denver, CO)",
    description:
      "Reserve the Remedy Room at Sway Larimer in Denver’s Larimer Square. Cold plunge + sauna recovery experience. Choose a time and book online.",
    images: [
      {
        url: "/assets/OG/og-remedy-room.jpg",
        width: 1200,
        height: 630,
        alt: "Remedy Room at Sway Larimer",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function BookRemedyRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
