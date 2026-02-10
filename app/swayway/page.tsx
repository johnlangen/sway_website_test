"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SwayWayPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#f4f4f1] text-black snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Section 1: Hero */}
      <div className="relative w-full h-screen max-h-[1000px] overflow-hidden snap-start">
        <img
          src="/assets/OG/og-home.jpg"
          alt="Sway Wellness hero background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        <div className="relative z-20 flex flex-col justify-center items-center text-center h-full px-6 md:px-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-3xl md:text-6xl font-vance font-light"
          >
            THE SWAY WAY
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-white text-xl md:text-4xl font-vance font-light mt-6"
          >
            THE NEXT WAVE OF WELLNESS
          </motion.h2>
        </div>
      </div>

      {/* Section 2 */}
      <Section
        title="A New Era of Spa Experience"
        text="Founded by the visionaries behind Spavia Day Spa, Sway sets out to make wellness accessible, innovative, and reflective of city lifestyle. With over 20 years of experience, we introduce our evolution into modern wellness. Drawing inspiration from cultural hubs like Barcelona and NYC, Sway blends technology with traditional treatments to create a fresh, city-driven wellness club."
        img="/assets/emily.jpg"
        reverse={false}
      />

      {/* Section 3 */}
      <Section
        title="Innovative Wellness for a Modern World"
        text="At Sway, we believe in total body health and long-term optimization. Our wellness club is designed for city lifestyles—luxurious yet accessible. With affordability, personalized service, and science-backed treatments, Sway becomes your happy place that you can’t live without."
        img="/assets/swayway.jpg"
        reverse={true}
      />

      {/* Section 4: Circle Grid with OG background */}
      <div className="relative snap-start min-h-screen flex items-center justify-center px-4 md:px-0 py-20">
        {/* Background image */}
        <img
          src="/assets/OG/og-sway-way2.jpg"
          alt="Sway Way background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-6xl w-full grid grid-cols-2 md:grid-cols-4 gap-10 place-items-center">
          {[
            { src: "/assets/homepage_photo11.jpg", label: "SWAY ON SPOTIFY" },
            { src: "/assets/homepage_photo_c.jpg", label: "IN THE PRESS", link: "/press" },
            {
              src: "/assets/homepage_photo13.jpg",
              label: "@SWAYWELLNESSCLUB",
              link: "https://www.instagram.com/swaywellnessclub/",
            },
            { src: "/assets/homepage_photo14.png", label: "ON THE APP" },
          ].map(({ src, label, link }, i) => (
            <div key={i} className="flex flex-col items-center">
              <a
                href={link || "#"}
                target={link ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden group transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={src}
                  alt={label}
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition"></div>
              </a>
              {/* Label BELOW circle */}
              <p className="mt-4 text-sm md:text-base font-vance text-white text-center">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Reusable Section
function Section({ title, text, img, reverse = false }: any) {
  return (
    <div
      className={`${
        reverse ? "bg-white" : "bg-[#F7F4E9]"
      } snap-start min-h-screen py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-10 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.img
        src={img}
        alt={title}
        className="w-full md:w-[400px] h-auto max-h-[400px] object-cover rounded"
        initial={{ opacity: 0, x: reverse ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className="max-w-xl text-center md:text-left"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-5xl font-vance font-light mb-6">{title}</h2>
        <p className="text-sm md:text-lg font-vance font-light leading-relaxed">{text}</p>
      </motion.div>
    </div>
  );
}
