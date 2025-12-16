"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MassagesPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";
  }, []);

  const massages = [
    {
      id: 1,
      name: "Deep Tissue",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        "Deeply corrective. Releases muscle tension and toxins from the body. Relieves pain and restores proper range of motion.",
      img: "/assets/massage2.png",
    },
    {
      id: 2,
      name: "Salt Stone",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        "Himalayan salt stones with 84 minerals restore balance and melt tension, deeply penetrating tight muscles while releasing toxins.",
      img: "/assets/massage4.png",
    },
    {
      id: 3,
      name: "CBD Cause Medic",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        "Award-winning relief cream with CBD, menthol, camphor, and extracts provides cooling comfort and muscle recovery.",
      img: "/assets/massage3.png",
    },
    {
      id: 4,
      name: "Sports Massage",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        "Ideal for athletes and movers. Speeds up recovery, eases tension in tight muscles, and improves range of motion.",
      img: "/assets/massage5.png",
    },
    {
      id: 5,
      name: "Lymphatic Drainage Detox Massage",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        "Gentle, wave-like massage that stimulates lymph flow, reduces puffiness, and supports natural detoxification for immune health and clarity.",
      img: "/assets/massage6.png",
    },
  ];

  const nextCard = () => setCurrentIndex((i) => (i + 1) % massages.length);
  const prevCard = () => setCurrentIndex((i) => (i === 0 ? massages.length - 1 : i - 1));

  return (
    <div className="w-full max-w-screen bg-[#F7F4E9] font-vance" style={{ overflow: "auto" }}>
      {/* Hero */}
      <section className="snap-section flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 md:pt-48 md:pb-24 bg-[#B6CFBF] relative">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[#113D33] text-5xl md:text-7xl font-light"
        >
          Massage Experiences
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-lg md:text-2xl max-w-3xl leading-relaxed text-[#113D33] opacity-90"
        >
          Our expert-driven massage therapies combine advanced techniques with premium products to
          help all your stress sway away. No stress, all relaxation.
        </motion.p>

        {/* Down Arrow */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          onClick={() => {
            const section = document.getElementById("massages-section");
            if (section) {
              const yOffset = section.getBoundingClientRect().top + window.scrollY - 10;
              window.scrollTo({ top: yOffset, behavior: "smooth" });
            }
          }}
          className="absolute bottom-6 md:bottom-16 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#113D33] hover:bg-[#0a2b23] transition-all shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-6 h-6 md:w-8 md:h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>
      </section>

      {/* Mobile */}
      {isMobile ? (
        <section className="bg-[#F7F4E9] flex flex-col items-center justify-center px-6 py-10 md:py-12 text-center relative">
          <motion.div
            key={massages[currentIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="bg-white p-4 rounded-lg shadow-lg max-w-[80%] w-full flex flex-col items-center relative"
          >
            <Image
              src={massages[currentIndex].img}
              alt={massages[currentIndex].name}
              width={220}
              height={220}
              className="rounded-lg object-cover w-full h-full"
            />
            <h3 className="text-xl md:text-3xl font-bold text-[#113D33]">{massages[currentIndex].name}</h3>
            <p className="text-md text-gray-500 mt-1">{massages[currentIndex].time}</p>
            <p className="text-md text-gray-700 mt-1">{massages[currentIndex].price}</p>
            <p className="text-gray-700 mt-3">{massages[currentIndex].description}</p>
            <a
              href="/book"
              className="mt-4 bg-[#113D33] text-white px-4 py-2 text-xs font-bold rounded-md hover:bg-[#0a2b23] transition-all"
            >
              Book Now
            </a>
            <button onClick={prevCard} className="absolute bottom-4 left-4 text-[#113D33] text-2xl">❮</button>
            <button onClick={nextCard} className="absolute bottom-4 right-4 text-[#113D33] text-2xl">❯</button>
          </motion.div>
        </section>
      ) : (
        <section id="massages-section" className="flex flex-col items-center px-6 py-16 md:py-24 min-h-screen">
          <div className="w-full max-w-[1300px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              {massages.map((massage) => (
                <motion.div key={massage.id} className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center overflow-hidden">
                  <Image src={massage.img} alt={massage.name} width={400} height={300} className="object-cover w-full md:w-[50%] h-[300px]" />
                  <div className="p-6 md:p-8 w-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-[#113D33]">{massage.name}</h3>
                    <p className="text-gray-500 mt-2">{massage.time}</p>
                    <p className="text-gray-700 mt-2">{massage.price}</p>
                    <p className="text-gray-700 mt-2">{massage.description}</p>
                    <a
                      href="/book"
                      className="mt-4 bg-[#113D33] text-white px-4 py-2 text-xs font-bold rounded-md hover:bg-[#0a2b23] transition-all"
                    >
                      Book Now
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Boosts */}
      <section className="bg-[#B6CFBF] flex flex-col items-center px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-bold text-[#113D33] text-center mb-16">
          ELEVATE YOUR MASSAGE WITH A BOOST
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px]">
          {[
            {
              name: "80 Minutes",
              description:
                "Add 30 minutes to your massage for deeper relaxation and more focused treatment on your needs.",
              price: "Member $50 | Drop-In $100",
              badge: ["Super Boost"],
            },
            {
              name: "80 Minutes Lymphatic Drainage Detox",
              description:
                "Full-body lymphatic boost to increase metabolic rate, support detox, and leave you lighter and rebalanced.",
              price: "Member $50 | Drop-In $100",
              badge: ["Super Boost"],
            },
            {
              name: "Cupping",
              description:
                "Ancient Chinese technique that increases circulation, relieves muscle tension, clears toxins, and reduces inflammation.",
              price: "Member $30 | Drop-In $60",
              badge: ["Boost"],
            },
            {
              name: "Infrared PEMF Mat",
              description:
                "PEMF tech enhances recovery, reduces inflammation, relieves stress, and promotes better sleep.",
              price: "Member $30 | Drop-In $60",
              badge: ["Boost"],
            },
          ].map((boost, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] max-w-[350px] w-full">
              <div className="flex justify-end space-x-2">
                {boost.badge.map((b, i) => (
                  <span key={i} className="bg-[#113D33] text-white px-3 py-1 text-xs font-bold rounded-md">
                    {b}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-[#113D33] mt-4">{boost.name}</h3>
              <p className="text-gray-700 mt-2">{boost.description}</p>
              <p className="text-gray-700 font-bold mt-4">{boost.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MassagesPage;
