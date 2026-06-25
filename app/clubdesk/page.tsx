import type { Metadata } from "next";
import { ClubDesk } from "./ClubDesk";

export const metadata: Metadata = {
  title: "Club Desk",
  robots: { index: false, follow: false },
};

export default function ClubDeskPage() {
  return <ClubDesk />;
}
