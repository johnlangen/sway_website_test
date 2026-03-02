import { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function TestMindbodyPopupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
