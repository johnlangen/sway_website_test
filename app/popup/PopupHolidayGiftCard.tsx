"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HolidayGiftCardPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setShow(true);

      const closeTimer = setTimeout(() => {
        setShow(false);
      }, 11000);

      return () => clearTimeout(closeTimer);
    }, 3000);

    return () => clearTimeout(openTimer);
  }, []);

  if (!show) return null;

  const MINDBODY_GC_URL =
    "https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=42";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 py-6 backdrop-blur-sm">
      <div className="relative bg-[#f4f4f1] rounded-2xl shadow-lg w-full max-w-[380px] sm:max-w-md font-vance text-[#113D33]
                      max-h-[90vh] overflow-y-auto">

        {/* CLOSE BUTTON */}
        <button
          aria-label="Close"
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 bg-white text-gray-700 hover:bg-gray-200 rounded-full shadow-md text-2xl sm:text-3xl font-bold w-10 h-10 flex items-center justify-center transition"
        >
          ×
        </button>

        {/* IMAGE */}
        <div className="w-full">
          <Image
            src="/assets/popupHoliday.jpg"
            alt="Holiday Gift Card Promo"
            width={500}
            height={600}
            className="rounded-t-2xl w-full object-cover max-h-[50vh]"
            priority
          />
        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-6 text-center">

          <h2 className="text-xl sm:text-2xl font-semibold tracking-wide mb-2">
            Gift Wellness
          </h2>

          <p className="text-sm sm:text-base mb-4 leading-relaxed">
            Purchase a <span className="font-semibold">$150 Gift Card</span>,
            <br />Receive a <span className="font-semibold">FREE $25 Bonus Card</span>
          </p>

          <p className="text-[11px] sm:text-xs text-[#4A776D] leading-relaxed mb-5">
            Offer valid through 12.24.25 and cannot be combined with any other offers.
            Bonus card is sent separately via email. Not redeemable for cash.
          </p>

          <a
            href={MINDBODY_GC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block bg-[#113D33] text-white text-sm sm:text-base font-semibold py-3 px-4 rounded-lg hover:bg-[#0b2d25] transition"
          >
            Purchase A Gift Card
          </a>
        </div>
      </div>
    </div>
  );
}
