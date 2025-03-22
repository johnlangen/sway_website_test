"use client";

import { useEffect, useState } from "react";

export default function VideoBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={isMobile ? "/assets/background.mov" : "/assets/background.mp4"} type="video/mp4" />
      </video>

      {/* Overlay Text */}
      <div className="absolute bottom-28 md:bottom-24 left-6 md:left-20">
        <h1 className="text-3xl md:text-5xl leading-tight font-vance text-white">
          RESTORE YOUR BODY <br /> & REFRESH YOUR MIND.
        </h1>
        <p className="text-sm md:text-lg mt-2 font-vance text-white opacity-80">
          Discover the future of spa.
        </p>
      </div>
    </div>
  );
}
