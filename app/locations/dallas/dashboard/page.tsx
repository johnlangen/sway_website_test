import { Metadata } from "next";
import DallasLaunchBoard from "./DallasLaunchBoard";

export const metadata: Metadata = {
  title: "Dallas Launch Board | Sway",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DallasLaunchBoard />;
}
