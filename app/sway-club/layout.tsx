import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lock in $99/month · Sway Wellness Club",
  description:
    "Lock in $99/month unlimited recovery at Sway Wellness Club · RiNo + Central Park. Standard rate after public launch is $129/month.",
  robots: { index: false, follow: false },
};

export default function SwayClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
