"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AescapePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // ✅ Mounted check

  useEffect(() => {
    setIsMobile(window.innerWidth < 1000);
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-[#F4F4F2] text-black">
      {/* ✅ Hero Section with Video Background */}
      <div className="relative w-full h-[550px] md:h-[750px] overflow-hidden">
        <video
          className="absolute w-full h-full object-cover"
          src="/assets/aescape.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute top-[120px] md:top-[160px] left-0 w-full px-4 md:px-12 z-10">
          <h1 className="text-white font-vance text-3xl md:text-5xl font-light">
            Massage Reimagined
          </h1>
          <Link
            href="https://app.aescape.com/map/location-details?location-id=2bb3fffd-f6a7-44b5-92ad-991032a535aa"
            target="_blank"
            className="inline-block mt-6 px-6 py-2 bg-black text-white text-lg rounded-full font-vance"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* ✅ Content Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 space-y-32">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row md:items-start gap-10">
          {isMounted && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex-1"
              >
                <h2 className="text-2xl md:text-4xl font-vance font-bold">
                  FIRST OF ITS KIND MASSAGE ROBOT NOW AT SWAY
                </h2>
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex-1 space-y-6"
              >
                <p className="text-lg font-vance font-light">
                  Welcome to a new era of wellness, where technology meets tradition.
                  Aescape combines the timeless art of massage with robotics and artificial intelligence
                  to deliver an exceptional massage experience every time.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.aescape.com/technology"
                    target="_blank"
                    className="px-6 py-2 bg-black text-white rounded-full font-vance"
                  >
                    Learn More
                  </a>
                  <a
                    href="https://app.aescape.com/map/location-details?location-id=2bb3fffd-f6a7-44b5-92ad-991032a535aa"
                    target="_blank"
                    className="px-6 py-2 bg-black text-white rounded-full font-vance"
                  >
                    Book Now
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Section 2 */}
        <div className="flex flex-col md:flex-row md:items-start gap-10">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 space-y-6 order-2 md:order-1"
          >
            <p className="text-lg font-vance font-light">
              With an interactive touchscreen, the robot lets you personalize every aspect of your massage,
              from pressure preferences to immersive visual displays. Powered by machine learning, it remembers
              your settings and adapts based on past sessions—ensuring a seamless, customized experience every time you visit Sway.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 order-1 md:order-2"
          >
            <h2 className="text-2xl md:text-4xl font-vance font-bold">
              DISCOVER THE WORLD’S MOST ADVANCED MASSAGE.
            </h2>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
