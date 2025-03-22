"use client";

import Link from "next/link";
import { useState } from "react";

const NavBarGreen = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-10 left-0 w-full px-4 md:px-12 z-50">
      <div className="flex items-center justify-between w-full max-w-[1300px] mx-auto flex-wrap">

        {/* Green Logo - Adjusted Slightly More Right on Mobile */}
        <Link href="/" className="absolute left-10 md:left-12">
          <img src="/assets/swaylogogreen.svg" alt="Sway Logo Green" className="w-20 h-auto" />
        </Link>

        {/* Desktop Navigation - Green Text */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-14 pl-24 mx-auto flex-wrap">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-[#4A776D] hover:text-[#2d4f47] font-vance text-lg"
            >
              Treatments ▾
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                <Link href="/treatments" className="block px-4 py-3 text-[#4A776D] hover:bg-gray-100">
                  All Treatments
                </Link>
                <Link href="/facials" className="block px-4 py-3 text-[#4A776D] hover:bg-gray-100">
                  Facials
                </Link>
                <Link href="/massages" className="block px-4 py-3 text-[#4A776D] hover:bg-gray-100">
                  Massages
                </Link>
                <Link href="/remedy-tech" className="block px-4 py-3 text-[#4A776D] hover:bg-gray-100">
                  Remedy Room
                </Link>
                <Link href="/aescape" className="block px-4 py-3 text-[#4A776D] hover:bg-gray-100">
                  Aescape Robot
                </Link>
              </div>
            )}
          </div>

          <Link href="/membership" className="text-[#4A776D] hover:text-[#2d4f47] font-vance text-lg">
            Join the Club
          </Link>
          <Link href="/gift-cards" className="text-[#4A776D] hover:text-[#2d4f47] font-vance text-lg">
            Gift Cards
          </Link>
          <Link href="/swayway" className="text-[#4A776D] hover:text-[#2d4f47] font-vance text-lg">
            The Sway Way
          </Link>
          <Link href="/offers" className="text-[#4A776D] hover:text-[#2d4f47] font-vance text-lg">
            Offers
          </Link>
        </div>

        {/* Book Now Button - Always Far Right */}
        <div className="hidden md:block ml-auto">
          <a
            href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#4A776D] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm lg:text-lg font-vance hover:bg-[#5b8f7f] whitespace-nowrap"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden ml-auto">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#4A776D] text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Green Text */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white p-6 flex flex-col items-center md:hidden space-y-4">
          <Link href="/treatments" className="text-[#4A776D] text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
            Treatments
          </Link>
          <Link href="/membership" className="text-[#4A776D] text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
            Join the Club
          </Link>
          <Link href="/gift-cards" className="text-[#4A776D] text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
            Gift Cards
          </Link>
          <Link href="/swayway" className="text-[#4A776D] text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
            The Sway Way
          </Link>
          <Link href="/offers" className="text-[#4A776D] text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
            Offers
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBarGreen;
