"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedLocation, setSavedLocation] = useState<any>(null);

  // Load saved location from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sway_selected_location");
      if (stored) setSavedLocation(JSON.parse(stored)); // { slug, name, ... }
    } catch (e) {
      console.error("Error reading saved location", e);
    }
  }, []);

  // Close treatments dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const dropdownContainer = document.querySelector(
        ".treatments-dropdown"
      );
      if (
        dropdownOpen &&
        dropdownContainer &&
        !dropdownContainer.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownOpen]);

  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#113D33]">
      <nav className="h-[56px] px-4 md:px-12">
        {/* 3-zone layout: logo | links | utilities */}
        <div className="h-full max-w-[1300px] mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* LEFT: Logo */}
          <div className="flex items-center">
            <Link href="/" className="block">
              <img
                src="/assets/swaylogo.png"
                alt="Sway Logo"
                className="w-[42px] h-auto md:w-[50px]"
              />
            </Link>
          </div>

          {/* CENTER: Main links */}
          <div className="hidden md:flex min-w-0 items-center justify-center gap-4 lg:gap-8 xl:gap-10">
            {/* Treatments dropdown */}
            <div className="relative treatments-dropdown shrink-0">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="text-white hover:text-gray-300 font-vance text-base lg:text-lg whitespace-nowrap"
                type="button"
              >
                Treatments ▾
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-52 bg-black border border-gray-700 rounded-md shadow-lg z-50">
                  <Link
                    href="/treatments"
                    className="block px-4 py-3 text-white hover:bg-gray-800"
                    onClick={handleLinkClick}
                  >
                    All Treatments
                  </Link>
                  <Link
                    href="/facials"
                    className="block px-4 py-3 text-white hover:bg-gray-800"
                    onClick={handleLinkClick}
                  >
                    Facials
                  </Link>
                  <Link
                    href="/massages"
                    className="block px-4 py-3 text-white hover:bg-gray-800"
                    onClick={handleLinkClick}
                  >
                    Massages
                  </Link>
                  <Link
                    href="/remedy-tech"
                    className="block px-4 py-3 text-white hover:bg-gray-800"
                    onClick={handleLinkClick}
                  >
                    Remedy Room
                  </Link>
                  <Link
                    href="/aescape"
                    className="block px-4 py-3 text-white hover:bg-gray-800"
                    onClick={handleLinkClick}
                  >
                    Aescape Robot
                  </Link>
                </div>
              )}
            </div>

            {/* Join the Club */}
            <Link
              href="/membership"
              className="shrink-0 text-white hover:text-gray-300 font-vance text-base lg:text-lg whitespace-nowrap"
            >
              Join the Club
            </Link>

            {/* Holiday promo — desktop only, never wraps */}
            <Link
              href="/holiday-gift-cards"
              className="
                hidden
                xl:inline-flex
                shrink
                text-white
                hover:text-gray-300
                font-vance
                whitespace-nowrap
                text-sm
                lg:text-base
                truncate
                max-w-[190px]
              "
              title="Holiday Gift Card Promo"
            >
              Holiday Gift Card Promo
            </Link>

            {/* The Sway Way */}
            <Link
              href="/swayway"
              className="shrink-0 text-white hover:text-gray-300 font-vance text-base lg:text-lg whitespace-nowrap"
            >
              The Sway Way
            </Link>

            {/* Offers */}
            <Link
              href="/offers"
              className="hidden lg:inline-flex shrink-0 text-white hover:text-gray-300 font-vance text-base lg:text-lg whitespace-nowrap"
            >
              Offers
            </Link>
          </div>

          {/* RIGHT: Location + Book + Hamburger */}
          <div className="flex items-center gap-3 md:gap-4 justify-end">
            {savedLocation ? (
              <div className="hidden md:flex items-center gap-2 text-white font-vance">
                <Link
                  href={`/locations/${savedLocation.slug}`}
                  className="max-w-[180px] truncate text-sm md:text-base"
                  title={savedLocation.name}
                >
                  {savedLocation.name}
                </Link>
                <Link
                  href="/locations"
                  className="underline text-xs opacity-80 hover:opacity-100 whitespace-nowrap"
                >
                  Change
                </Link>
              </div>
            ) : (
              <Link
                href="/locations"
                className="hidden md:inline-block text-white font-vance text-sm md:text-base whitespace-nowrap"
              >
                Select Location
              </Link>
            )}

            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block bg-white text-[#113D33] px-5 py-2 rounded-full text-sm lg:text-base font-vance hover:bg-gray-200 whitespace-nowrap"
            >
              Book Now
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden text-white text-2xl"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="w-full bg-black p-6 flex flex-col items-center md:hidden space-y-4">
          {/* Location at top */}
          {savedLocation ? (
            <div className="flex flex-col items-center space-y-1">
              <Link
                href={`/locations/${savedLocation.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white text-lg"
              >
                {savedLocation.name}
              </Link>
              <Link
                href="/locations"
                onClick={() => setMobileMenuOpen(false)}
                className="underline text-sm text-gray-300"
              >
                Change
              </Link>
            </div>
          ) : (
            <Link
              href="/locations"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-lg"
            >
              Select Location
            </Link>
          )}

          <Link
            href="/treatments"
            className="text-white text-lg py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Treatments
          </Link>
          <Link
            href="/membership"
            className="text-white text-lg py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Join the Club
          </Link>
          <Link
            href="/holiday-gift-cards"
            className="text-white text-lg py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Holiday Gift Card Promo
          </Link>
          <Link
            href="/swayway"
            className="text-white text-lg py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            The Sway Way
          </Link>
          <Link
            href="/offers"
            className="text-white text-lg py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Offers
          </Link>

          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#113D33] px-4 py-2 rounded-full text-sm font-vance mt-2 hover:bg-gray-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book Now
          </a>
        </div>
      )}
    </header>
  );
};

export default NavBar;
