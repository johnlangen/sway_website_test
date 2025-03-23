// app/blog/page.tsx
"use client";

import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="bg-[#F7F4E9] min-h-screen flex flex-col items-center text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center">The Sway Edit</h1>
      </div>

      {/* Blog List */}
      <div className="w-full max-w-4xl px-6 py-20">
        <Link href="/blog/denver-wellness-club" className="block group">
          <h2 className="text-2xl md:text-3xl font-bold underline group-hover:text-[#113D33] transition">
            Denver’s Most Anticipated Wellness Club
          </h2>
          <p className="mt-2 text-lg md:text-xl text-gray-700">
            Discover Sway, Denver’s most anticipated wellness club, blending science-backed facials, massages, sauna, cold plunge, and more.
          </p>
        </Link>
      </div>
    </div>
  );
}
