import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sway Wellness Club",
  description: "Denver's first wellness club where tech meets day spa.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* 👇 force light mode and prevent whitespace hydration error */}
      <html lang="en" className="light"><body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7F4E9] text-black font-vance`}
      >
        <NavBar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body></html>
    </>
  );
}
