// app/locations/denver-central-park/book-remedy-lounge/layout.tsx
// Booking flows stay out of the index (matches /book and /clubs/book);
// previously these relied on a robots.txt Disallow, which blocks crawling
// but not indexing and hides this noindex from Google. The Disallow was
// removed so this meta can actually be read.
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Remedy Lounge | Sway Central Park (Aurora, CO)",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CentralParkBookRemedyLoungeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
