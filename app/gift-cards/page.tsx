// app/gift-cards/page.tsx
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GiftCardsHubPage() {
  const [showHub, setShowHub] = useState(false);

  useEffect(() => {
    // Fallback: if cookie wasn’t present but localStorage has it, route on client
    const ls = localStorage.getItem("sway_selected_location");
    if (ls) {
      try {
        const loc = JSON.parse(ls);
        if (loc?.slug) {
          document.cookie = `sway_loc=${loc.slug}; path=/; max-age=${
            60 * 60 * 24 * 365
          }`;
          window.location.replace(`/locations/${loc.slug}/gift-cards`);
          return;
        }
      } catch {}
    }
    // No cookie + no LS → show the hub content
    setShowHub(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#f4f4f1] pt-32 pb-20 px-4 font-vance text-[#113D33]">
      {/* Pre-redirect before paint: prevents white flash */}
      <Script id="giftcards-pre-redirect" strategy="beforeInteractive">
        {`
          (function(){
            try {
              var m = document.cookie.match(/(?:^|;\\s*)sway_loc=([^;]+)/);
              var slug = m && m[1];
              if (slug) {
                window.location.replace('/locations/' + slug + '/gift-cards');
              }
            } catch (e) {}
          })();
        `}
      </Script>

      {showHub && (
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Image
              src="/assets/giftcard.png"
              alt="Sway Gift Card"
              width={500}
              height={300}
              className="rounded-lg object-cover"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-3xl md:text-5xl font-light mt-10 sm:mt-14 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Share the Spa Experience
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-base md:text-xl text-[#4A776D] leading-relaxed max-w-md mt-6 md:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Give the ultimate wellness gift. Select your gift card amount and
            email instantly to your loved ones.
          </motion.p>

          {/* Choose location links */}
          <div className="mt-10 space-y-3">
            <Link
              className="underline"
              href="/locations/denver-larimer/gift-cards"
            >
              Sway Larimer — Denver, CO
            </Link>
            <span className="block opacity-70">
              Sway Dallas — Dallas, TX (coming soon)
            </span>
            <span className="block opacity-70">
              Sway Georgetown — Washington, DC (coming soon)
            </span>
          </div>

          <div className="mt-10">
            <Link
              href="/locations"
              className="inline-block bg-[#113D33] text-white px-5 py-3 rounded-xl"
            >
              Find a location
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
