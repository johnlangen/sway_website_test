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
    <nav className="fixed top-10 left-0 w-full px-4 md:px-12 z-50">
      <div className="flex items-center justify-between w-full max-w-[1300px] mx-auto flex-wrap">

        {/* Green Logo */}
        <Link href="/" className="absolute left-10 md:left-12">
          <img
            src="/assets/swaylogogreen.svg"
            alt="Sway Logo Green"
            className="w-20 h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-14 pl-24 mx-auto flex-wrap">
          {/* Location Display */}
          {savedLocation ? (
            <div className="flex items-center space-x-2 text-[#4A776D] font-vance text-lg">
              <Link href={`/locations/${savedLocation.slug}`}>
                {savedLocation.name}
              </Link>
              <Link href="/locations" className="underline text-sm">
                Change
              </Link>
            </div>
          ) : (
            <Link href="/locations" className="text-[#4A776D] font-vance text-lg">
              Select Location
            </Link>
          )}

          {/* Treatments Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-[#4A776D] hover:text-[#2d4f47] font-vance text-lg"
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
          <Link href={locHref("/membership")} className="text-[#4A776D] hover:text-[#2d4f47] font-vance text-lg">
            Join the Club
          </Link>
          <Link href={locHref("/gift-cards")} className="text-[#4A776D] hover:text-[#2d4f47] font-vance text-lg">
            Gift Cards
          </Link>
          <Link href="/swayway" className="text-[#4A776D] hover:text-[#2d4f47] font-vance text-lg">
            The Sway Way
          </Link>
          <Link href={locHref("/offers")} className="text-[#4A776D] hover:text-[#2d4f47] font-vance text-lg">
            Offers
          </Link>
        </div>

        {/* Book Now Button */}
        <div className="ml-auto flex items-center gap-3">
          <a
            href={locHref("/book")}
            className="bg-[#4A776D] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm lg:text-lg font-vance hover:bg-[#5b8f7f] whitespace-nowrap"
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