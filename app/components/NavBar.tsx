"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NavBar = () => {
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [swayWayOpen, setSwayWayOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedLocation, setSavedLocation] = useState<any>(null);

  // Load saved location
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sway_selected_location");
      if (stored) setSavedLocation(JSON.parse(stored));
    } catch (e) {
      console.error("Error reading saved location", e);
    }
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const treatmentsEl = document.querySelector(".treatments-dropdown");
      const swayWayEl = document.querySelector(".swayway-dropdown");

      if (
        treatmentsOpen &&
        treatmentsEl &&
        !treatmentsEl.contains(event.target as Node)
      ) {
        setTreatmentsOpen(false);
      }

      if (
        swayWayOpen &&
        swayWayEl &&
        !swayWayEl.contains(event.target as Node)
      ) {
        setSwayWayOpen(false);
      }
    };

    if (treatmentsOpen || swayWayOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [treatmentsOpen, swayWayOpen]);

  const closeAll = () => {
    setTreatmentsOpen(false);
    setSwayWayOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#113D33]">
      <nav className="h-[56px] px-4 md:px-12">
        <div className="h-full max-w-[1300px] mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Logo */}
          <Link href="/" className="block">
            <img
              src="/assets/swaylogo.png"
              alt="Sway Logo"
              className="w-[42px] md:w-[50px]"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center justify-center gap-3 lg:gap-6 xl:gap-8 text-sm lg:text-base">
            {/* Treatments */}
            <div className="relative treatments-dropdown">
              <button
                onClick={() => {
                  setTreatmentsOpen((v) => !v);
                  setSwayWayOpen(false);
                }}
                className="text-white hover:text-gray-300 font-vance"
              >
                Treatments ▾
              </button>

              {treatmentsOpen && (
                <div className="absolute left-0 mt-2 w-52 bg-black border border-gray-700 rounded-md shadow-lg">
                  {[
                    ["All Treatments", "/treatments"],
                    ["Facials", "/facials"],
                    ["Massages", "/massages"],
                    ["Remedy Room", "/remedy-tech"],
                    ["Aescape Robot", "/aescape"],
                  ].map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeAll}
                      className="block px-4 py-3 text-white hover:bg-gray-800"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/membership" className="text-white hover:text-gray-300 font-vance">
              Join the Club
            </Link>

            <Link href="/gift-cards" className="text-white hover:text-gray-300 font-vance">
              Gift Cards
            </Link>

            {/* The Sway Way */}
            <div className="relative swayway-dropdown">
              <button
                onClick={() => {
                  setSwayWayOpen((v) => !v);
                  setTreatmentsOpen(false);
                }}
                className="text-white hover:text-gray-300 font-vance"
              >
                The Sway Way ▾
              </button>

              {swayWayOpen && (
                <div className="absolute left-0 mt-2 w-52 bg-black border border-gray-700 rounded-md shadow-lg">
                  <Link
                    href="/events/anniversary"
                    onClick={closeAll}
                    className="block px-4 py-3 text-white hover:bg-gray-800 font-semibold"
                  >
                    🎂 Anniversary Event
                  </Link>
                  <Link
                    href="/swayway"
                    onClick={closeAll}
                    className="block px-4 py-3 text-white hover:bg-gray-800"
                  >
                    Our Philosophy
                  </Link>
                  <Link
                    href="/press"
                    onClick={closeAll}
                    className="block px-4 py-3 text-white hover:bg-gray-800"
                  >
                    Press
                  </Link>
                  <Link
                    href="/blog"
                    onClick={closeAll}
                    className="block px-4 py-3 text-white hover:bg-gray-800"
                  >
                    Blog
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/offers"
              className="hidden lg:inline-flex text-white hover:text-gray-300 font-vance"
            >
              Offers
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 justify-end">
            {savedLocation ? (
              <div className="hidden md:flex items-center gap-2 text-white font-vance text-sm max-w-[160px] lg:max-w-[200px]">
                <Link href={`/locations/${savedLocation.slug}`} className="truncate">
                  {savedLocation.name}
                </Link>
                <Link href="/locations" className="underline text-xs opacity-80 shrink-0">
                  Change
                </Link>
              </div>
            ) : (
              <Link href="/locations" className="hidden md:inline-block text-white text-sm font-vance whitespace-nowrap">
                Select Location
              </Link>
            )}

            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#113D33] px-4 lg:px-5 py-2 rounded-full font-vance hover:bg-gray-200 text-sm whitespace-nowrap"
            >
              Book Now
            </a>

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden text-white text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black p-6 flex flex-col items-center space-y-4">
          <Link
            href="/events/anniversary"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white text-lg font-semibold"
          >
            🎂 Anniversary Event
          </Link>
          <div className="w-12 border-t border-white/20" />
          {[
            ["Treatments", "/treatments"],
            ["Join the Club", "/membership"],
            ["Gift Cards", "/gift-cards"],
            ["The Sway Way", "/swayway"],
            ["Press", "/press"],
            ["Blog", "/blog"],
            ["Offers", "/offers"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-lg"
            >
              {label}
            </Link>
          ))}

          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#113D33] px-4 py-2 rounded-full font-vance"
          >
            Book Now
          </a>
        </div>
      )}
    </header>
  );
};

export default NavBar;
