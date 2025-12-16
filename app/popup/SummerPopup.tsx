"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function FirstVisitOfferPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay opening for 3s
    const openTimer = setTimeout(() => {
      setShow(true);

      // Auto-close after 7s (from the moment it appears)
      const closeTimer = setTimeout(() => {
        setShow(false);
      }, 7000);

      return () => clearTimeout(closeTimer);
    }, 3000);

    return () => clearTimeout(openTimer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-40 flex items-start justify-center px-4 pt-24 sm:pt-32">
      <div className="relative bg-[#f4f4f1] p-3 sm:p-5 rounded-lg w-full max-w-[360px] sm:max-w-md shadow-lg text-[#113D33] font-vance scale-[0.95] sm:scale-100">
        {/* Close Button */}
        <button
  aria-label="Close"
  className="absolute top-2 right-2 bg-white text-gray-800 hover:bg-gray-200 rounded-full shadow-md text-2xl sm:text-3xl font-bold w-10 h-10 flex items-center justify-center"
  onClick={() => setShow(false)}
>
  ×
</button>


        {/* Image */}
        <Image
          src="/assets/popup2.jpeg"
          alt="First Time Visit Offer"
          width={400}
          height={300}
          className="rounded-md mb-3 w-full h-auto"
          priority
        />

        {/* Main Text */}
        <p className="text-2xl sm:text-3xl font-extrabold text-center mb-2">
          $40 OFF
        </p>
        <p className="text-sm sm:text-base text-center mb-4">
          If it&apos;s your first visit, enjoy $40 off.
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="https://swaywellnessspa.com/locations/denver-larimer/offers/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#113D33] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#0a2b23] w-full text-center"
          >
            View Offers
          </a>
        </div>
      </div>
    </div>
  );
}
