import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upswell → Sway Conversion Dashboard (Internal)",
  description: "Internal project dashboard for the Upswell conversion.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function InternalUpswellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
