"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FacialsPage = () => {
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

  const facials = [
    {
      id: 1,
      name: "Forever Young",
      subtitle: "Anti-Aging Facial",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        "Defy aging with this all-natural facial that hydrates, brightens, and tightens your skin. Promotes circulation and collagen production.",
      img: "/assets/facial2.png",
    },
    {
      id: 2,
      name: "Glow Getter",
      subtitle: "Hydration Facial",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        "Powerful antioxidants, correcting peptides, and plant-derived stem cells instantly smooth and firm for a youthful, hydrated complexion.",
      img: "/assets/facial3.png",
    },
    {
      id: 3,
      name: "Pore Perfection",
      subtitle: "Acne Facial",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        "Our complexion-clearing facial uses targeted products to detox and renew. Kills bacteria and treats congested skin.",
      img: "/assets/facial4.png",
    },
    {
      id: 4,
      name: "Sensitive Silk",
      subtitle: "Soothing Facial",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        "Soothe, calm, and protect sensitized and reddened skin types. A natural skincare treatment that visibly reduces redness and irritation.",
      img: "/assets/facial5.png",
    },
    {
      id: 5,
      name: "Dr. Dennis Gross Vitamin C",
      subtitle: "Sway Spotlight Facial",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        '"C" the radiance with this supercharged facial loaded with Vitamin C—nature’s most potent and proven skin brightening treatment.',
      img: "/assets/facial6.png",
    },
  ];

  const nextCard = () => setCurrentIndex((i) => (i + 1) % facials.length);
  const prevCard = () => setCurrentIndex((i) => (i === 0 ? facials.length - 1 : i - 1));

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
          Facial Experiences
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-lg md:text-2xl max-w-3xl leading-relaxed text-[#113D33] opacity-90"
        >
          Our science-backed, cutting-edge facial treatments use the world's most innovative tech
          and skincare products to deliver specific skin results. No downtime, all natural.
        </motion.p>

        {/* Down Arrow */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          onClick={() => {
            const section = document.getElementById("facials-section");
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

      {/* Mobile Cards */}
      {isMobile ? (
        <section className="bg-[#F7F4E9] flex flex-col items-center justify-center px-6 py-10 md:py-12 text-center relative">
          <motion.div
            key={facials[currentIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="bg-white p-4 rounded-lg shadow-lg max-w-[80%] w-full flex flex-col items-center relative"
          >
            <Image
              src={facials[currentIndex].img}
              alt={facials[currentIndex].name}
              width={220}
              height={220}
              className="rounded-lg object-cover w-full h-full transition-opacity duration-300"
              placeholder="blur"
              blurDataURL="/assets/facial-placeholder.jpg"
            />
            <h3 className="text-xl md:text-3xl font-bold text-[#113D33]">{facials[currentIndex].name}</h3>
            <p className="text-md text-gray-500 mt-1">{facials[currentIndex].subtitle}</p>
            <p className="text-md text-gray-500 mt-1">{facials[currentIndex].time}</p>
            <p className="text-md text-gray-700 mt-1">{facials[currentIndex].price}</p>
            <p className="text-gray-700 mt-3">{facials[currentIndex].description}</p>
            <a
              href="/book"
              className="mt-4 bg-[#113D33] text-white px-4 py-2 text-xs font-bold rounded-md hover:bg-[#0a2b23] transition-all"
            >
              Book Now
            </a>
            <button onClick={prevCard} className="absolute bottom-4 left-4 text-[#113D33] text-2xl hover:text-[#0a2b23]">❮</button>
            <button onClick={nextCard} className="absolute bottom-4 right-4 text-[#113D33] text-2xl hover:text-[#0a2b23]">❯</button>
          </motion.div>
        </section>
      ) : (
        <section id="facials-section" className="flex flex-col items-center px-6 py-16 md:py-24 min-h-screen">
          <div className="w-full max-w-[1300px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              {facials.map((facial) => (
                <motion.div key={facial.id} className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center overflow-hidden">
                  <Image src={facial.img} alt={facial.name} width={400} height={300} className="object-cover w-full md:w-[50%] h-[300px]" />
                  <div className="p-6 md:p-8 w-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-[#113D33]">{facial.name}</h3>
                    <p className="text-gray-500 mt-2">{facial.subtitle}</p>
                    <p className="text-gray-500 mt-2">{facial.time}</p>
                    <p className="text-gray-700 mt-2">{facial.price}</p>
                    <p className="text-gray-700 mt-2">{facial.description}</p>
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

      {/* Boost Section */}
      <section className="bg-[#B6CFBF] flex flex-col items-center px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-bold text-[#113D33] text-center mb-16">
          MAKE IT A HIGH TECH FACIAL & ADD A BOOST
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px]">
          {[
            {
              name: "Microcurrent",
              description:
                "Tones and lifts. Stimulates facial muscles and collagen production to sculpt and strengthen your skin.",
              details: "Boost - Target one area (eyes, cheeks, forehead, jawline, smile line). Super Boost - Targets the entire face.",
              price: "Boost: Member +$30 | Drop-In +$60 • Super Boost: Member +$50 | Drop-In +$100",
              badge: ["Super Boost", "Boost"],
            },
            {
              name: "LED Light Therapy",
              description:
                "Advanced treatment with specific wavelengths of light to rejuvenate skin, reduce inflammation, and decrease bacteria.",
              price: "Member +$50 | Drop-In +$100",
              badge: ["Super Boost"],
            },
            {
              name: "Hydraderm",
              description:
                "Diamond tone microdermabrasion + serums to smooth lines, minimize pores, reduce hyperpigmentation, and refresh skin.",
              price: "Member +$30 | Drop-In +$60",
              badge: ["Boost"],
            },
            {
              name: "Dermaflash",
              description:
                "Exfoliates dead skin + removes peach fuzz for better absorption and instant glow.",
              price: "Member +$30 | Drop-In +$60",
              badge: ["Boost"],
            },
            {
              name: "Peel",
              description:
                "Custom peels refine pores, even skin tone, reduce fine lines, scars, and sun damage while stimulating collagen.",
              price: "Member +$30 | Drop-In +$60",
              badge: ["Boost"],
            },
            {
              name: "Oxygen Infusion",
              description:
                "98% pure oxygen infusion deeply hydrates skin and boosts absorption of serums.",
              price: "Member +$30 | Drop-In +$60",
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
              {boost.details && <p className="text-gray-700 font-semibold mt-2">{boost.details}</p>}
              <p className="text-gray-700 font-bold mt-4">{boost.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FacialsPage;
