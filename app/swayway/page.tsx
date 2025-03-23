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
    <div className="bg-[#F7F4E9] text-black snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Section 1: Hero */}
      <div className="relative w-full h-screen max-h-[1000px] overflow-hidden snap-start">
        <img
          src={isMobile ? "/assets/sand2.png" : "/assets/sand.png"}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6 md:px-24">
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
        text="Founded by the visionaries behind Spavia Day Spa, Sway sets out to make wellness accessible, innovative, and reflective of city lifestyle. After 20 years of spa experience, we’re thrilled to introduce our visionary evolution into the future of wellness. Drawing from cultural hubs like Barcelona and NYC, Sway blends innovative technology with traditional treatments to offer a fresh, modern wellness club to enhance your well-being. Join us as we continue our family legacy and discover a new era of spa excellence at Sway."
        img="/assets/emily.png"
        reverse={false}
      />

      {/* Section 3 */}
      <Section
        title="Innovative Wellness for a Modern World"
        text="This time is for you. At Sway, we believe in total body health for long-term optimization. Designed to be a luxurious yet accessible wellness club you can rejuvenate amid the city hustle. With a focus on affordability, personalized service, and scientific-backed treatments, we offer a holistic approach to well-being. Sway will become your happy place that you can’t live without."
        img="/assets/swayway.png"
        reverse={true}
      />

      {/* Section 4: Image Grid */}
      <div className="bg-[#F6F4E8] py-20 px-4 md:px-0 snap-start min-h-screen flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
          {[
            { src: "/assets/homepage_photo11.png", label: "SWAY ON SPOTIFY" },
            { src: "/assets/homepage_photo_c.png", label: "IN THE PRESS", link: "/press" },
            {
              src: "/assets/homepage_photo13.png",
              label: "@SWAYWELLNESSCLUB",
              link: "https://www.instagram.com/swaywellnessclub/",
            },
            { src: "/assets/homepage_photo14.png", label: "ON THE APP" },
          ].map(({ src, label, link }, i) => (
            <div key={i} className="text-center w-full max-w-[180px]">
              <a href={link || "#"} target={link ? "_blank" : undefined} rel="noopener noreferrer">
                <img src={src} alt={label} className="w-full h-40 object-cover rounded" />
                <p
                  className={`mt-2 text-sm font-vance text-gray-700 ${
                    link ? "underline cursor-pointer" : ""
                  }`}
                >
                  {label}
                </p>
              </a>
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
