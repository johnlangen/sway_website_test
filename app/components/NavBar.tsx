"use client";

import { useState } from "react";
import Link from "next/link";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#113D33] h-[100px] md:h-[56px] flex items-center z-50">



      <nav className="relative w-full px-4 md:px-12">
        <div className="flex items-center justify-between w-full max-w-[1300px] mx-auto">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="absolute left-8 md:left-12 top-1/2 transform -translate-y-1/2"
          >
            <img 
              src="/assets/swaylogo.png" 
              alt="Sway Logo" 
              style={{ width: "50px", height: "auto" }} // Force smaller width
            />
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-14 mx-auto">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white hover:text-gray-300 font-vance text-lg"
              >
                Treatments ▾
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg">
                  <Link href="/treatments" className="block px-4 py-3 text-white hover:bg-gray-800">
                    All Treatments
                  </Link>
                  <Link href="/facials" className="block px-4 py-3 text-white hover:bg-gray-800">
                    Facials
                  </Link>
                  <Link href="/massages" className="block px-4 py-3 text-white hover:bg-gray-800">
                    Massages
                  </Link>
                  <Link href="/remedy-tech" className="block px-4 py-3 text-white hover:bg-gray-800">
                    Remedy Room
                  </Link>
                  <Link href="/aescape" className="block px-4 py-3 text-white hover:bg-gray-800">
                    Aescape Robot
                  </Link>
                </div>
              )}
            </div>

            <Link href="/membership" className="text-white hover:text-gray-300 font-vance text-lg">
              Join the Club
            </Link>
            <Link href="/gift-cards" className="text-white hover:text-gray-300 font-vance text-lg">
              Gift Cards
            </Link>
            <Link href="/swayway" className="text-white hover:text-gray-300 font-vance text-lg">
              The Sway Way
            </Link>
            <Link href="/offers" className="text-white hover:text-gray-300 font-vance text-lg">
              Offers
            </Link>
          </div>

          {/* Book Now Button (Desktop Only) */}
          <div className="hidden md:block">
            <a
              href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#113D33] px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm lg:text-lg font-vance hover:bg-gray-200 whitespace-nowrap"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Hamburger Menu - Now on the Right */}
          <div className="md:hidden ml-auto">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white text-2xl">
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-black p-6 flex flex-col items-center md:hidden space-y-4">
            <Link href="/treatments" className="text-white text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
              Treatments
            </Link>
            <Link href="/membership" className="text-white text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
              Join the Club
            </Link>
            <Link href="/gift-cards" className="text-white text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
              Gift Cards
            </Link>
            <Link href="/swayway" className="text-white text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
              The Sway Way
            </Link>
            <Link href="/offers" className="text-white text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
              Offers
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
