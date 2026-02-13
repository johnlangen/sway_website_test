"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function FirstVisitOfferPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => clearTimeout(openTimer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 py-6">
      <div className="relative bg-[#f4f4f1] rounded-lg w-full max-w-[360px] sm:max-w-md shadow-lg text-[#113D33] font-vance max-h-[calc(100dvh-48px)] flex flex-col overflow-hidden">
        {/* Close Button */}
        <button
          aria-label="Close"
          className="absolute top-2 right-2 z-10 bg-white text-gray-800 hover:bg-gray-200 rounded-full shadow-md text-2xl sm:text-3xl font-bold w-10 h-10 flex items-center justify-center"
          onClick={() => setShow(false)}
        >
          ×
        </button>

        {/* Image — fills remaining space, shrinks on short viewports */}
        <div className="relative min-h-[120px] flex-1 overflow-hidden rounded-t-lg">
          <Image
            src="/assets/eventgreen.jpg"
            alt="First Time Visit Offer"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Content — pinned to bottom, never hidden */}
        <div className="shrink-0 p-4 sm:p-5">
          <p className="text-2xl sm:text-3xl font-extrabold text-center mb-1">
            $40 OFF
          </p>
          <p className="text-sm sm:text-base text-center mb-4">
            If it&apos;s your first visit, enjoy $40 off.
          </p>
          <a
            href="/locations/denver-larimer/offers/"
            className="block bg-[#113D33] text-white px-4 py-2.5 rounded-md font-semibold hover:bg-[#0a2b23] text-center"
          >
            View Offers
          </a>
        </div>
      </div>
    </div>
  );
}
