"use client";

import { motion } from "framer-motion";
import VideoBackground from "./components/VideoBackground";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="snap-container w-full overflow-hidden max-w-screen">

      {/* First Section - Video Background */}
      <section className="snap-section">
        <VideoBackground />
      </section>

      {/* Second Section - Centered Intro Message */}
      <section className="snap-section flex flex-col items-center justify-center bg-[#f6f4e8] text-[#113D33] px-6 py-16">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-2xl lg:text-3xl text-center max-w-3xl leading-relaxed font-vance"
        >
          Ever feel like you need an escape from the hustle and bustle of the city? 
          We get it. That’s why we’ve created a wellness club where you can 
          hit pause, breathe, and rediscover yourself.
        </motion.p>
      </section>

      {/* Third Section - Staggered Images + Centered Text */}
      <section className="snap-section bg-[#f6f4e8] flex flex-col lg:flex-row items-center justify-center px-6 lg:px-8 gap-12 py-16 pb-16 md:pb-20 lg:pb-24">


      {/* Left Image - Shifted Higher */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: -50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center lg:justify-end relative lg:-top-6"
      >
        <Image
          src="/assets/homepage_photo_a.png"
          alt="Sway Lounge"
          width={600}
          height={400}
          className="rounded-lg shadow-lg object-cover w-full max-w-[300px] md:max-w-[600px] h-auto max-h-[250px] md:max-h-[400px]"
        />
      </motion.div>

      {/* Centered Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-[#113D33] text-center lg:text-left font-vance max-w-xl"
      >
        <p className="text-lg md:text-2xl lg:text-3xl leading-relaxed">
          Forget about the world’s noisy opinions.
          It’s time to start listening to what you need.
          It’s time to tune into what your soul craves.
        </p>
      </motion.div>

      {/* Right Image - Shifted Lower */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center lg:justify-start relative lg:top-6"
      >
        <Image
          src="/assets/homepage_photo2.png"
          alt="Sway Sauna"
          width={600}
          height={400}
          className="rounded-lg shadow-lg object-cover w-full max-w-[300px] md:max-w-[600px] h-auto max-h-[250px] md:max-h-[400px]"
        />
      </motion.div>

      </section>

      {/* Fourth Section - Centered Image + Text Above */}
      <section className="snap-section flex flex-col items-center justify-center bg-[#f6f4e8] text-[#113D33] px-6 py-16">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-2xl lg:text-3xl text-center max-w-3xl leading-relaxed font-vance"
        >
          Wellness? It&apos;s  that magic that happens when you genuinely feel good.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center mt-6"
        >
          <Image
            src="/assets/homepage_photo4.png"
            alt="Wellness Magic"
            width={400}
            height={200}
            className="rounded-lg shadow-lg object-cover w-full lg:w-[600px] h-auto max-h-[300px] lg:h-[400px]"
          />
        </motion.div>
      </section>

      {/* Fifth Section - Centered Glow Recipe Image */}
      <section className="snap-section flex flex-col lg:flex-row items-center justify-center px-6 lg:px-8 bg-[#f6f4e8] text-[#113D33] gap-12 py-16">
        {/* Left Text */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-center lg:text-left max-w-md leading-relaxed font-vance"
        >
          We all deserve a space where we can unwind, reflect, and just be.
        </motion.p>

        {/* Centered Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
        <Image
          src="/assets/homepage_photo15.png"
          alt="Glow Recipe"
          width={600}
          height={400}
          className="rounded-lg shadow-lg object-contain w-full max-w-[600px] h-auto"
        />

        </motion.div>

        {/* Right Text */}
        <motion.p
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-center lg:text-right max-w-md leading-relaxed font-vance"
        >
          Imagine a world where self-care means feeling at ease, and beauty is celebrated in its raw form.
        </motion.p>
      </section>

      {/* Sixth Section - Storefront Image + Centered Text Above */}

      {/* Sixth Section - Storefront Image + Centered Text Above */}
      <section className="snap-section flex flex-col items-center justify-center bg-[#f6f4e8] text-[#113D33] px-6 py-16 pb-12 md:pb-20 gap-y-12 md:gap-y-20">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-2xl lg:text-3xl text-center max-w-3xl leading-relaxed font-vance"
        >
          In our wellness club, self-care is not a luxury; It&apos;s a necessity. 
          Let Sway be your happy place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <Image
            src="/assets/homepage_photo_outside.png"
            alt="Sway Wellness Club Outside"
            width={900} 
            height={500}
            className="rounded-lg shadow-lg object-contain w-full max-w-[900px] h-auto"
          />
        </motion.div>
      </section>

      {/* Flip Cards Section */}
      <section className="snap-section bg-[#f6f4e8] flex flex-col items-center justify-center px-4 lg:px-8 py-12 md:py-20 gap-y-12 md:gap-y-20">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }, // Stagger animation for smooth effect
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl justify-center"
        >
          {[
            { id: 1, image: "/assets/homepage_photo_b.png", text: "It’s not only a massage, it’s relaxing into your deepest state and unwinding the mind." },
            { id: 2, image: "/assets/homepage_photo7.png", text: "It’s not just high-tech facials, it’s feeling your inner beauty and glow." },
            { id: 3, image: "/assets/homepage_photo8.png", text: "It’s not just a cold plunge or sauna, it’s experiencing exhilaration and mental clarity in the present moment." },
          ].map((card) => (
            <motion.div 
              key={card.id} 
              className="flip-card w-[160px] h-[200px] md:w-[320px] md:h-[480px] mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }} // Ensures animation only plays once
            >
              <div className="flip-card-inner">
                {/* Front Side (Image) */}
                <div className="flip-card-front relative">
                  <Image src={card.image} alt="Card Image" width={160} height={200} className="rounded-xl object-cover w-full h-full" />
                  {/* "Learn More" Button */}
                  <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#113D33] text-white px-3 py-1 md:px-4 md:py-2 text-xs md:text-lg font-bold rounded-md hover:bg-[#0a2b23]">
                    Learn More
                  </button>
                </div>
                {/* Back Side (Text) */}
                <div className="flip-card-back flex items-center justify-center text-center p-2 md:p-4">
                  <p className="text-xs md:text-lg text-white">{card.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* Experiences & Pricing Section */}
      <section className="snap-section flex flex-col items-start bg-[#f6f4e8] text-[#113D33] px-4 lg:px-16 py-12 pt-32 md:pt-40 w-full max-h-screen overflow-auto gap-y-12 md:gap-y-20">
        <div className="w-full max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 font-vance text-center md:text-left">
            EXPERIENCES & PRICING
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-left text-xs md:text-base">
              <thead>
                <tr className="bg-[#113D33] text-white text-sm md:text-lg">
                  <th className="p-2 md:p-4 font-bold">Service</th>
                  <th className="p-2 md:p-4 font-bold">Description</th>
                  <th className="p-2 md:p-4 font-bold">Member Price</th>
                  <th className="p-2 md:p-4 font-bold">Drop-In Price</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    service: "50 Min Facial",
                    description: "Forever Young - Glow Getter - Pore Perfection - Sensitive Silk",
                    member: "$99",
                    dropIn: "$139",
                    extras: [
                      { description: "Add a Boost", member: "$30", dropIn: "$60" },
                      { description: "Add a Super Boost", member: "$50", dropIn: "$100" },
                    ],
                  },
                  {
                    service: "50 Min Massage",
                    description: "Deep Tissue - Swedish - Hot Stone - CBD Cause Medic",
                    member: "$99",
                    dropIn: "$139",
                    extras: [
                      { description: "Add a Boost", member: "$30", dropIn: "$60" },
                      { description: "Add a Super Boost", member: "$50", dropIn: "$100" },
                    ],
                  },
                  {
                    service: "Remedy Room",
                    description: "40 minutes, 4 sessions per month",
                    member: "$99",
                    dropIn: "$139",
                    extras: [
                      {
                        description:
                          "Includes: Infrared Sauna, Cold Plunge, Normatec Lymphatic Drainage Boots, LED Light Therapy",
                        member: "-",
                        dropIn: "-",
                      },
                    ],
                  },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    {/* Main Service Row */}
                    <tr className="border border-gray-300">
                      <td className="p-2 md:p-4 font-bold">{item.service}</td>
                      <td className="p-2 md:p-4">{item.description}</td>
                      <td className="p-2 md:p-4 font-bold">{item.member}</td>
                      <td className="p-2 md:p-4 font-bold">{item.dropIn}</td>
                    </tr>
                    {/* Extras Row (No unnecessary whitespace) */}
                    {item.extras.map((extra, i) => (
                      <tr key={i} className="border border-gray-300 text-gray-700">
                        <td className="p-2 md:p-4" /> 
                        <td className="p-2 md:p-4">{extra.description}</td>
                        <td className="p-2 md:p-4 font-bold">{extra.member}</td>
                        <td className="p-2 md:p-4 font-bold">{extra.dropIn}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-center md:justify-start">
            <a
              href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#113D33] text-white px-4 py-2 text-sm md:text-lg font-bold rounded-md hover:bg-[#0a2b23]"
            >
              Schedule Now
            </a>
          </div>
        </div>
      </section>

      {/* Remove the unnecessary extra space div */}
      {/* Photo Grid Section */}
      <section className="snap-section w-full bg-[#f6f4e8] flex flex-col items-center justify-center px-4 lg:px-16 py-12 md:py-20 gap-y-12 md:gap-y-20">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }, // Staggered appearance
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-5xl"
        >
          {[
            { image: "/assets/homepage_photo11.png", text: "SWAY ON SPOTIFY", link: "" },
            { image: "/assets/homepage_photo12.png", text: "IN THE PRESS", link: "/press" },
            { image: "/assets/homepage_photo13.png", text: "@SWAYWELLNESSCLUB", link: "https://www.instagram.com/swaywellnessclub/" },
            { image: "/assets/homepage_photo14.png", text: "ON THE APP", link: "" },
          ].map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.8 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <motion.img
                    src={item.image}
                    alt={item.text}
                    whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(0,0,0,0.2)" }}
                    transition={{ duration: 0.3 }}
                    className="w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-cover rounded-lg shadow-md"
                  />
                </a>
              ) : (
                <motion.img
                  src={item.image}
                  alt={item.text}
                  whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(0,0,0,0.2)" }}
                  transition={{ duration: 0.3 }}
                  className="w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-cover rounded-lg shadow-md"
                />
              )}
              <p className="mt-1 text-xs md:text-lg font-semibold text-black">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* Become a Member Section */}
      <section className="snap-section w-full bg-[#113D33] text-white flex flex-col items-center justify-center text-center px-6 py-16 md:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-4xl font-bold font-vance max-w-2xl"
        >
          Join the Wellness Club & Start Saving Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-sm md:text-lg max-w-3xl leading-relaxed opacity-90"
        >
          You deserve this time. Experience the ritual benefits of monthly treatments,  
          half-off boosts, and exclusive member perks designed just for you.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 bg-white text-[#113D33] font-bold px-6 py-3 text-lg rounded-md shadow-md hover:bg-gray-200 transition-all"
        >
          Become a Member
        </motion.a>
      </section>






    </div>
  );
}
