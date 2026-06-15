"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SwayEasterEgg from "./SwayEasterEgg";

const NavBar = () => {
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [swayWayOpen, setSwayWayOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedLocation, setSavedLocation] = useState<any>(null);
  const [eggOpen, setEggOpen] = useState(false);
  const pathname = usePathname();

  // Location-aware "Book Now": on the new (MT-bridge) location pages, route to
  // that location's in-site /book page; everywhere else keep the global /book.
  const bookHref = pathname?.startsWith("/locations/denver-rino")
    ? "/locations/denver-rino/book"
    : pathname?.startsWith("/locations/denver-central-park")
    ? "/locations/denver-central-park/book"
    : "/book";
  const bookIsInternal = bookHref !== "/book";

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

    // Escape closes any open dropdown (keyboard accessibility — WCAG 2.1.2)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setTreatmentsOpen(false);
        setSwayWayOpen(false);
      }
    };

    if (treatmentsOpen || swayWayOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
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
          {/* Logo — on the homepage, intercept the click to trigger an
              easter egg instead of navigating (we're already on /). */}
          <Link
            href="/"
            className="block"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                setEggOpen(true);
              }
            }}
          >
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
                aria-haspopup="true"
                aria-expanded={treatmentsOpen}
                aria-controls="treatments-menu"
                className="text-white hover:text-gray-300 font-vance"
              >
                Treatments <span aria-hidden="true">▾</span>
              </button>

              {treatmentsOpen && (
                <div
                  id="treatments-menu"
                  role="menu"
                  aria-label="Treatments"
                  className="absolute left-0 mt-2 w-52 bg-black border border-gray-700 rounded-md shadow-lg"
                >
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
                      role="menuitem"
                      onClick={closeAll}
                      className="block px-4 py-3 text-white hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
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
                aria-haspopup="true"
                aria-expanded={swayWayOpen}
                aria-controls="swayway-menu"
                className="text-white hover:text-gray-300 font-vance"
              >
                The Sway Way <span aria-hidden="true">▾</span>
              </button>

              {swayWayOpen && (
                <div
                  id="swayway-menu"
                  role="menu"
                  aria-label="The Sway Way"
                  className="absolute left-0 mt-2 w-52 bg-black border border-gray-700 rounded-md shadow-lg"
                >
                  <Link
                    href="/swayway"
                    role="menuitem"
                    onClick={closeAll}
                    className="block px-4 py-3 text-white hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
                  >
                    Our Philosophy
                  </Link>
                  <Link
                    href="/press"
                    role="menuitem"
                    onClick={closeAll}
                    className="block px-4 py-3 text-white hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
                  >
                    Press
                  </Link>
                  <Link
                    href="/blog"
                    role="menuitem"
                    onClick={closeAll}
                    className="block px-4 py-3 text-white hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/own"
                    role="menuitem"
                    onClick={closeAll}
                    className="block px-4 py-3 text-white hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
                  >
                    Own a Sway
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

            {bookIsInternal ? (
              <a
                href={bookHref}
                className="bg-white text-[#113D33] px-4 lg:px-5 py-2 rounded-full font-vance hover:bg-gray-200 text-sm whitespace-nowrap"
              >
                Book Now
              </a>
            ) : (
              <a
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#113D33] px-4 lg:px-5 py-2 rounded-full font-vance hover:bg-gray-200 text-sm whitespace-nowrap"
              >
                Book Now
              </a>
            )}

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden text-white text-2xl"
            >
              <span aria-hidden="true">☰</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-black p-6 flex flex-col items-center space-y-4">
          {/* Location selector */}
          {savedLocation ? (
            <div className="flex items-center gap-2 text-white text-sm">
              <Link
                href={`/locations/${savedLocation.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold"
              >
                📍 {savedLocation.name}
              </Link>
              <Link
                href="/locations"
                onClick={() => setMobileMenuOpen(false)}
                className="underline text-xs opacity-80"
              >
                Change
              </Link>
            </div>
          ) : (
            <Link
              href="/locations"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-sm font-semibold"
            >
              📍 Select Location
            </Link>
          )}

          <div className="w-12 border-t border-white/20" />

          {[
            ["Treatments", "/treatments"],
            ["Join the Club", "/membership"],
            ["Gift Cards", "/gift-cards"],
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

          <div className="w-12 border-t border-white/20" />

          {[
            ["The Sway Way", "/swayway"],
            ["Press", "/press"],
            ["Blog", "/blog"],
            ["Own a Sway", "/own"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/70 text-sm"
            >
              {label}
            </Link>
          ))}

          <div className="w-12 border-t border-white/20" />

          {bookIsInternal ? (
            <a
              href={bookHref}
              className="bg-white text-[#113D33] px-6 py-2.5 rounded-full font-vance font-semibold"
            >
              Book Now
            </a>
          ) : (
            <a
              href={bookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#113D33] px-6 py-2.5 rounded-full font-vance font-semibold"
            >
              Book Now
            </a>
          )}
        </div>
      )}

      {/* Logo-click easter egg overlay (homepage only) */}
      <SwayEasterEgg open={eggOpen} onClose={() => setEggOpen(false)} />
    </header>
  );
};

export default NavBar;
