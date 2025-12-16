"use client";

import Link from "next/link";

export default function BookingDallasPage() {
  return (
    <div className="min-h-screen bg-[#F7F4E9] flex flex-col items-center px-4 pt-40 pb-20 font-vance text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-[#113D33] mb-4">
        Booking Coming Soon
      </h1>

      <p className="mb-8 max-w-2xl text-[#113D33]/80 text-base leading-relaxed">
        We’re preparing <strong>Sway Dallas</strong> to open its doors soon. Online
        booking isn’t available yet, but you can explore our treatments and learn
        more about what’s coming.
      </p>

      <div className="space-y-4 mb-10 w-full max-w-md">
        <Link
          href="/treatments"
          className="block px-8 py-4 bg-[#113D33] text-white text-lg font-bold rounded-full hover:opacity-90 transition"
        >
          Explore Treatments
        </Link>
      </div>

      <div className="text-sm md:text-base text-[#113D33]/80 leading-relaxed">
        <p>
          Looking for an open location?{" "}
          <Link href="/locations/denver-larimer/book" className="underline">
            Book Sway Larimer (Denver)
          </Link>
          .
        </p>
        <p className="mt-3">
          More about Dallas:{" "}
          <Link href="/locations/dallas" className="underline">
            Sway Dallas — Coming Soon
          </Link>
        </p>
      </div>
    </div>
  );
}
