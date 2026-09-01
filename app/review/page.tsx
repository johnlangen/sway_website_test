import type { Metadata } from "next";
import ReviewContent from "./ReviewContent";

export const metadata: Metadata = {
  title: "Leave a Review | Sway Wellness Spa",
  description:
    "Choose the Sway you visited and leave a Google review. Larimer, RiNo, or Central Park.",
  // QR-code destination, not an SEO page. Keeping it out of the index also
  // keeps it from competing with the real location pages for brand queries.
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return <ReviewContent />;
}
