"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LocationsPage() {
  return (
    <div className="bg-[#113D33] text-white min-h-screen font-vance px-6 pt-32 md:pt-40 pb-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-12">
        {/* Left Side - Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 text-center md:text-left space-y-6"
        >
          <h1 className="text-3xl md:text-5xl font-bold">Sway Larimer</h1>

          <div>
            <p className="text-xl font-bold">1428 Larimer St.</p>
            <p className="text-xl font-bold">Denver, CO 80202</p>
          </div>

          <p className="text-lg">Phone: +1 720-588-8667</p>

          <div>
            <p className="text-xl font-bold underline">Sway Hours of Wellness</p>
            <p>Mon–Fri: 10:00 AM – 8:00 PM</p>
            <p>Sat: 9:00 AM – 6:00 PM</p>
            <p>Sun: 11:00 AM – 6:00 PM</p>
          </div>

          <p className="text-lg text-white/80 pt-4">More Sway locations coming soon...</p>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:w-1/2 flex justify-center md:justify-end"
        >
          <Image
            src="/assets/homepage_photo_outside.png"
            alt="Sway Larimer Exterior"
            width={500}
            height={400}
            className="rounded-lg w-full max-w-[400px] object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}
