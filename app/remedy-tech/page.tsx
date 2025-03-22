"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const RemedyRoomPage = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";
  }, []);

  const handleScroll = () => {
    if (servicesRef.current) {
      const yOffset = servicesRef.current.getBoundingClientRect().top + window.scrollY - 80; // Ensures visibility
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  const remedies = [
    {
      id: 1,
      name: "Sauna",
      time: "20 MINUTES",
      description:
        "Science-backed treatment. Boost recovery. Burn calories. Build immunity. Improve sleep. Reduce stress. Increase energy. Improve focus. Promote balance.",
      img: "/assets/infrared_sauna.png",
      link: "/sauna",
    },
    {
      id: 2,
      name: "Cold Plunge",
      time: "5 MINUTES",
      description:
        "Life-changing benefits. Cold water therapy has been shown to be effective with better sleep, elevated energy, pain and stress relief, a better mood, performance and recovery, and immune support.",
      img: "/assets/cold_plunge.png",
      link: "/cold-plunge",
    },
    {
      id: 3,
      name: "Compression Therapy",
      time: "15 MINUTES",
      description:
        "Increases circulation and helps you maintain your full range of motion. Proven to help with lymphatic drainage and decrease pain and soreness.",
      img: "/assets/compression_therapy.png",
      link: "/compression-therapy",
    },
    {
      id: 4,
      name: "LED Light Therapy",
      time: "15 MINUTES",
      description:
        "LightStim MultiWave® Patented Technology emits multiple wavelengths of light. ProPanel utilizes 1,400 medical-grade LEDs optimized for anti-aging, acne, or regeneration.",
      img: "/assets/led_light_therapy.png",
      link: "/led-light-therapy",
    },
  ];

  return (
    <div className="w-full max-w-screen bg-[#F7F4E9] font-vance" style={{ overflow: "auto" }}>
      {/* ✅ Hero Section */}
      <section className="snap-section flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 md:pt-36 md:pb-20 bg-[#F7F4E9] relative">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[#113D33] text-5xl md:text-7xl font-vance-bold"
        >
          REMEDY ROOM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-lg md:text-2xl max-w-3xl leading-relaxed text-[#113D33] opacity-90 font-vance-text"
        >
          <span className="font-vance-bold">
            Welcome to The Remedy Room, a space to restore your body and refresh your mind.
          </span>{" "}
          Experience ultimate recovery with our remedy technologies, made to enhance your overall physical well-being
          and elevate your mental state. <span className="font-vance-bold">It's time for you to level up!</span>
        </motion.p>

        <p className="mt-6 text-md text-gray-800 font-vance-text">
          Member $25 | Drop-In $49
          <br />
          Remedy Room Pricing includes 40 minutes total to experience our Remedy Technology. You can tailor it to your
          liking, but you will have a maximum limit of:
        </p>

        <ul className="text-md text-gray-700 mt-3 space-y-2">
          <li>- 15 minutes in the Normatec + LED Light Therapy</li>
          <li>- 20 minutes in the traditional sauna</li>
          <li>- 5 minutes in the cold plunge</li>
        </ul>

        <motion.a
          href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
          target="_blank"
          className="mt-6 bg-[#113D33] text-white px-6 py-3 text-md font-bold rounded-md hover:bg-[#0a2b23] transition-all shadow-lg"
        >
          Book Now
        </motion.a>

        {/* Down Arrow Button (SVG for mobile) */}
        <motion.button
          onClick={handleScroll}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-6 md:bottom-16 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#113D33] hover:bg-[#0a2b23] transition-all shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-6 h-6 md:w-8 md:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>
      </section>

      {/* ✅ Remedy Room Service Cards */}
      <section ref={servicesRef} className="bg-[#F7F4E9] flex flex-col items-center px-6 py-24 md:py-32">
        <h2 className="text-3xl md:text-5xl font-vance-bold text-[#113D33] text-center mb-16">
          DISCOVER OUR REMEDY TECHNOLOGIES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1300px]">
          {remedies.map((remedy) => (
            <motion.div
              key={remedy.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * remedy.id }}
              className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center overflow-hidden"
            >
              <Image
                src={remedy.img}
                alt={remedy.name}
                width={400}
                height={250}
                className="object-cover w-full md:w-[50%] h-[250px]"
              />
              <div className="p-6 md:p-8 w-full">
                <p className="text-sm text-[#113D33] font-vance-bold uppercase">{remedy.time}</p>
                <h3 className="text-2xl font-vance-bold text-[#113D33] mt-1">{remedy.name}</h3>
                <p className="text-gray-700 mt-2 font-vance-text">{remedy.description}</p>

                {/* ✅ Updated to Link to Individual Pages */}
                <Link
                  href={remedy.link}
                  className="mt-4 inline-block bg-[#113D33] text-white px-4 py-2 text-sm font-bold rounded-md hover:bg-[#0a2b23] transition-all"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RemedyRoomPage;
