"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FacialsPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

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
      name: "Deep Tissue",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        "Deeply corrective. Releases muscle tension and toxins from the body. Relieves pain and discomfort in congested areas within muscles, tendons, and ligaments due to stress, injury, or overuse to restore proper range of motion.",
      img: "/assets/massage2.png",
    },
    {
      id: 2,
      name: "Salt Stone ",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        "Himalayan stones that contain 84 minerals which restore balance to your body while nourishing depleted muscles. Let your muscles melt under warm, salt stones that deeply penetrate tense muscles, releasing tension and toxins.",
      img: "/assets/massage3.png",
    },
    {
      id: 3,
      name: "CBD Cause Medic",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        "Our award-winning relief cream provides immediate cooling comfort with our revitalizing blend of water-soluble, broad-spectrum CBD*, menthol, camphor, capsicum, glucosamine, and mushroom extracts.",
      img: "/assets/massage4.png",
    },
    {
      id: 4,
      name: "Sports Massage",
      time: "50 minutes",
      price: "Member $99 | Drop-In $139",
      description:
        "Whether you're an athlete, gym enthusiast, or simply love to move. Speed up recovery from intensive training. Ease tension in tight muscles and increase range of motion.",
      img: "/assets/massage5.png",
    },
  ];

 
  // Handle card switching on mobile
  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % facials.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? facials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full max-w-screen bg-[#F7F4E9] font-vance" style={{ overflow: "auto" }}>

        {/* ✅ Hero Section */}
        {/* ✅ Hero Section */}
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
            Our expert-driven massage therapies combine advanced techniques with premium products to allow for all your stress to sway away. No stress, all relaxation.
        </motion.p>

        {/* Cool Arrow Button */}
        <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            onClick={() => {
                const section = document.getElementById("facials-section");
                if (section) {
                    const yOffset = section.getBoundingClientRect().top + window.scrollY - 10; // Adjust to align properly
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

      {/* ✅ Mobile: Navigate Cards with Arrows */}
      {isMobile ? (
        <section className="bg-[#F7F4E9] flex flex-col items-center justify-center px-6 py-10 md:py-12 text-center relative">
          <motion.div
            key={facials[currentIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="bg-white p-4 rounded-lg shadow-lg max-w-[80%] w-full flex flex-col items-center relative"
          >
            <Image src={facials[currentIndex].img} alt={facials[currentIndex].name} width={220} height={220} className="rounded-lg object-cover w-full h-full"/>
            
            <h3 className="text-xl md:text-3xl font-bold text-[#113D33]">{facials[currentIndex].name}</h3>
            <p className="text-md text-gray-500 mt-1">{facials[currentIndex].time}</p>
            <p className="text-md text-gray-700 mt-1">{facials[currentIndex].price}</p>
            <p className="text-gray-700 mt-3">{facials[currentIndex].description}</p>

            <a href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9" target="_blank"
              className="mt-4 bg-[#113D33] text-white px-4 py-2 text-xs font-bold rounded-md hover:bg-[#0a2b23] transition-all">
              Book Now
            </a>

            <button onClick={prevCard} className="absolute bottom-4 left-4 text-[#113D33] text-2xl hover:text-[#0a2b23] transition-all">❮</button>
            <button onClick={nextCard} className="absolute bottom-4 right-4 text-[#113D33] text-2xl hover:text-[#0a2b23] transition-all">❯</button>
          </motion.div>
        </section>
      ) : (

        // ✅ Desktop: Cards + Book Now Buttons
        <section id="facials-section" className="flex flex-col items-center px-6 py-16 md:py-24 min-h-screen">



          <div className="w-full max-w-[1300px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              {facials.map((facial) => (
                <motion.div key={facial.id} className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center overflow-hidden">
                  <Image src={facial.img} alt={facial.name} width={400} height={300} className="object-cover w-full md:w-[50%] h-[300px]" />
                  <div className="p-6 md:p-8 w-full">
                    <h3 className="text-2xl font-bold text-[#113D33]">{facial.name}</h3>
                    <p className="text-gray-500 mt-2">{facial.time}</p>
                    <p className="text-gray-700 mt-2">{facial.price}</p>
                    <p className="text-gray-700 mt-2">{facial.description}</p>
                    <a href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
                      target="_blank" rel="noopener noreferrer"
                      className="mt-4 inline-block bg-[#113D33] text-white px-4 py-2 text-sm font-bold rounded-md hover:bg-[#0a2b23] transition-all">
                      Book Now
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}




      {/* ✅ High-Tech Facial Boost Section */}
      <section className="bg-[#B6CFBF] flex flex-col items-center px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-bold text-[#113D33] text-center mb-16">
            ELEVATE YOUR MASSAGE WITH A BOOST
        </h2>

  {/* Boost Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px]">
    {[

        {
        name: "Infrared PEMF Mat",
        description:
            "PEMF technology mimics the healing vibrations of the Earth, enhancing the body's natural recovery process, reducing inflammation, increasing energy, relieving stress, and promoting deeper sleep.",
        price: "Member $30 | Drop-In $60",
        badge: ["Boost"],
        },
        {
        name: "Lymphatic Drainage Massage",
        description:
            "Works directly with your lymphatic and digestive systems. Increases your metabolic rate, rids excess toxins, and cleanses your colon. Flushes water retention, giving an instant leaner look.",
        price: "Member $50 | Drop-In $100",
        badge: ["Super Boost"],
        },
        {
        name: "Cupping",
        description:
            "An ancient Chinese Medicine technique that increases circulation and moves stagnant blood. Relieves muscle tension. Supports the immune system. Clears toxins. Reduces inflammation. Lymphatic detox.",
        price: "Member $30 | Drop-In $60",
        badge: ["Boost"],
        },
        {
        name: "80 Minutes",
        description:
            "Enhance your relaxation experience by adding an extra 30 minutes to your massage treatment. This extended time allows you to truly unwind, allowing our skilled specialists to focus on your specific needs and melt away tension.",
        price: "Member $50 | Drop-In $100",
        badge: ["Super Boost"],
        },
    
  

      
    ].map((boost, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] max-w-[350px] w-full"
      >
        {/* Badges */}
        <div className="flex justify-end space-x-2">
          {boost.badge.map((badge, i) => (
            <span
              key={i}
              className="bg-[#113D33] text-white px-3 py-1 text-xs font-bold rounded-md"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-[#113D33] mt-4">{boost.name}</h3>
        <p className="text-gray-700 mt-2">{boost.description}</p>

        {/* Price */}
        <p className="text-gray-700 font-bold mt-4">{boost.price}</p>
      </div>
    ))}
  </div>
</section>
    
    </div>
  );
};

export default FacialsPage;
