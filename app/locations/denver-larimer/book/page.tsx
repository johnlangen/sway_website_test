"use client";

import Link from "next/link";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#F7F4E9] flex flex-col items-center px-4 pt-40 pb-20 font-vance text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-[#113D33] mb-4">
        Book Your Appointment
      </h1>

      <p className="mb-8 max-w-2xl text-[#113D33]/80 text-base leading-relaxed">
        At <strong>Sway Larimer</strong> in historic Larimer Square, you can reserve{" "}
        targeted facials, deeply effective massage, time in the{" "}
        <strong>Remedy Room</strong>, or the <strong>Aescape</strong> robot massage. Secure
        your time instantly online or call our team for assistance.
      </p>

      <div className="space-y-4 mb-6 w-full max-w-md">
        {/* Book Online */}
        <Link
          href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-8 py-4 bg-[#113D33] text-white text-lg font-bold rounded-full hover:opacity-90 transition"
        >
          Book Online
        </Link>

        {/* Book Aescape */}
        <Link
          href="/locations/denver-larimer/book-aescape"
          className="block px-8 py-4 bg-[#4A776D] text-white text-lg font-bold rounded-full hover:bg-[#3a5f56] transition"
        >
          Book Aescape
        </Link>


        {/* Call to Book */}
        <a
          href="tel:3034766150"
          className="block px-8 py-4 border-2 border-[#113D33] text-[#113D33] text-lg font-bold rounded-full hover:bg-[#113D33] hover:text-white transition"
        >
          Call to Book: (303) 476-6150
        </a>
      </div>

      <div className="space-y-6">
        <p className="text-base md:text-lg font-medium text-[#113D33]/80 text-center">
          💬 Prefer chatting online? You can also book directly with our AI
          assistant in the bottom-right corner of the screen.
        </p>

        <p className="text-sm md:text-base text-[#113D33]/80 leading-relaxed">
          Mon–Fri: 10:00 AM – 8:00 PM<br />
          Sat: 9:00 AM – 6:00 PM<br />
          Sun: 11:00 AM – 6:00 PM
        </p>
      </div>
    </div>
  );
}
