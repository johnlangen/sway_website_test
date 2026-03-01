"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function SwayWayPage() {
  return (
    <div className="snap-container w-full overflow-hidden max-w-screen">
      {/* ============================== HERO ============================== */}
      <section className="snap-section h-screen flex items-center justify-center relative">
        <Image
          src="/assets/OG/og-home.jpg"
          alt="Sway Wellness hero background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-3xl md:text-6xl font-vance font-light"
          >
            THE SWAY WAY
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-lg md:text-4xl font-vance font-light mt-4 md:mt-6"
          >
            THE NEXT WAVE OF WELLNESS
          </motion.h2>
        </div>
      </section>

      {/* ======================== A NEW ERA ======================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33] px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/assets/emily.jpg"
                alt="A New Era of Spa Experience"
                width={640}
                height={420}
                className="w-full h-[220px] sm:h-[300px] md:h-[420px] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="font-vance"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
              A New Era of Spa Experience
            </h2>
            <p className="text-sm md:text-base leading-relaxed opacity-80 max-w-md">
              Founded by the visionaries behind Spavia Day Spa, Sway sets out to
              make wellness accessible, innovative, and reflective of city
              lifestyle. With over 20 years of experience, we introduce our
              evolution into modern wellness. Drawing inspiration from cultural
              hubs like Barcelona and NYC, Sway blends technology with
              traditional treatments to create a fresh, city-driven wellness
              club.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== INNOVATIVE WELLNESS ==================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-white text-[#113D33] px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-center w-full md:[direction:rtl]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:[direction:ltr]"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/assets/swayway.jpg"
                alt="Innovative Wellness for a Modern World"
                width={640}
                height={420}
                className="w-full h-[220px] sm:h-[300px] md:h-[420px] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="font-vance md:[direction:ltr]"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
              Innovative Wellness for a Modern World
            </h2>
            <p className="text-sm md:text-base leading-relaxed opacity-80 max-w-md">
              At Sway, we believe in total body health and long-term
              optimization. Our wellness club is designed for city
              lifestyles — luxurious yet accessible. With affordability,
              personalized service, and science-backed treatments, Sway becomes
              your happy place that you can&apos;t live without.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ======================== CONNECT ======================== */}
      <section className="snap-section h-screen flex items-center justify-center relative">
        <Image
          src="/assets/OG/og-sway-way2.jpg"
          alt="Sway Way background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-20 w-full max-w-5xl px-6 font-vance text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-8 md:mb-12">
            Connect with Sway
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { src: "/assets/homepage_photo11.jpg", label: "SWAY ON SPOTIFY", link: "#" },
              { src: "/assets/homepage_photo_c.jpg", label: "IN THE PRESS", link: "/press" },
              { src: "/assets/homepage_photo13.jpg", label: "@SWAYWELLNESSCLUB", link: "https://www.instagram.com/swaywellnessclub/" },
              { src: "/assets/homepage_photo14.png", label: "ON THE APP", link: "#" },
            ].map(({ src, label, link }, i) => {
              const isExternal = link.startsWith("http") || link === "#";
              const inner = (
                <div className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-square mb-3">
                    <Image
                      src={src}
                      alt={label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition" />
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-white uppercase tracking-wider">
                    {label}
                  </p>
                </div>
              );

              return isExternal ? (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <Link key={i} href={link}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
