"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NavBarGreen = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedLocation, setSavedLocation] = useState<any>(null);

  // Handles loading the saved location from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sway_selected_location");
      if (stored) {
        setSavedLocation(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading saved location", e);
    }
  }, []);

  // Handles closing the dropdown when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Find the dropdown container by its class name and check if the click was outside of it.
      const dropdownContainer = document.querySelector(".relative");
      if (
        dropdownOpen &&
        dropdownContainer &&
        !dropdownContainer.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    // Only add the listener if the dropdown is open
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownOpen]); // Re-run the effect when `dropdownOpen` state changes

  // Helper to build location-aware links
  const locHref = (path: string) =>
    savedLocation ? `/locations/${savedLocation.slug}${path}` : path;

  // Function to close the dropdown on link click
  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed top-10 left-0 w-full px-4 md:px-8 lg:px-12 z-50">
      <div className="flex items-center w-full max-w-[1300px] mx-auto gap-4">

        {/* Green Logo */}
        <Link href="/" className="shrink-0">
          <img
            src="/assets/swaylogogreen.svg"
            alt="Sway Logo Green"
            className="w-16 lg:w-20 h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8 flex-1 justify-center text-sm lg:text-base">
          {/* Location Display */}
          {savedLocation ? (
            <div className="flex items-center gap-2 text-[#4A776D] font-vance max-w-[160px] lg:max-w-[200px]">
              <Link href={`/locations/${savedLocation.slug}`} className="truncate">
                {savedLocation.name}
              </Link>
              <Link href="/locations" className="underline text-xs shrink-0">
                Change
              </Link>
            </div>
          ) : (
            <Link href="/locations" className="text-[#4A776D] font-vance whitespace-nowrap">
              Select Location
            </Link>
          )}

          {/* Treatments Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-[#4A776D] hover:text-[#2d4f47] font-vance"
              aria-expanded={dropdownOpen}
              type="button"
            >
              Treatments ▾
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                <Link
                  href="/treatments"
                  className="block px-4 py-3 text-[#4A776D] hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  All Treatments
                </Link>
                <Link
                  href="/facials"
                  className="block px-4 py-3 text-[#4A776D] hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Facials
                </Link>
                <Link
                  href="/massages"
                  className="block px-4 py-3 text-[#4A776D] hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Massages
                </Link>
                <Link
                  href="/remedy-tech"
                  className="block px-4 py-3 text-[#4A776D] hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Remedy Room
                </Link>
                <Link
                  href="/aescape"
                  className="block px-4 py-3 text-[#4A776D] hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Aescape Robot
                </Link>
              </div>
            )}
          </div>

          {/* Location-aware links */}
          <Link href={locHref("/membership")} className="text-[#4A776D] hover:text-[#2d4f47] font-vance">
            Join the Club
          </Link>
          <Link href={locHref("/gift-cards")} className="text-[#4A776D] hover:text-[#2d4f47] font-vance">
            Gift Cards
          </Link>
          <Link href="/swayway" className="text-[#4A776D] hover:text-[#2d4f47] font-vance">
            The Sway Way
          </Link>
          <Link href={locHref("/offers")} className="text-[#4A776D] hover:text-[#2d4f47] font-vance">
            Offers
          </Link>
        </div>

        {/* Book Now Button */}
        <div className="shrink-0 flex items-center gap-3">
          <a
            href={locHref("/book")}
            className="bg-[#4A776D] text-white px-4 lg:px-6 py-2 rounded-full text-sm lg:text-base font-vance hover:bg-[#5b8f7f] whitespace-nowrap"
          >
            Book Now
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#4A776D] text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white p-6 flex flex-col items-center md:hidden space-y-4 z-50">
          {/* Location Display Mobile */}
          {savedLocation ? (
            <div className="flex flex-col items-center space-y-1">
              <Link
                href={`/locations/${savedLocation.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#4A776D] text-lg"
              >
                {savedLocation.name}
              </Link>
              <Link
                href="/locations"
                onClick={() => setMobileMenuOpen(false)}
                className="underline text-sm"
              >
                Change
              </Link>
            </div>
          ) : (
            <Link
              href="/locations"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#4A776D] text-lg"
            >
              Select Location
            </Link>
          )}

          {/* Location-aware links mobile */}
          <Link href="/treatments" className="text-[#4A776D] text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
            Treatments
          </Link>
          <Link href={locHref("/membership")} className="text-[#4A776D] text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
            Join the Club
          </Link>
          <Link href={locHref("/gift-cards")} className="text-[#4A776D] text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
            Gift Cards
          </Link>
          <Link href="/swayway" className="text-[#4A776D] text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
            The Sway Way
          </Link>
          <Link href={locHref("/offers")} className="text-[#4A776D] text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
            Offers
          </Link>
          <Link href={locHref("/book")} className="text-[#4A776D] text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBarGreen;