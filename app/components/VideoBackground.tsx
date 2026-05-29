"use client";

import { useEffect, useRef, useState } from "react";
import BookingPeek from "./BookingPeek";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay — only reveal the video once it's actually playing.
    // Keeps it invisible (behind poster) until confirmed, eliminating the
    // brief play-button flash on Safari Low Power Mode / iOS.
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setVideoReady(true))
        .catch(() => {
          // Autoplay blocked — remove video from DOM entirely
          video.remove();
        });
    }
  }, []);

  // Time-of-day greeting — computed client-side from the visitor's local time.
  // Server-side render keeps the iconic H1 static; this only changes the small
  // eyebrow above it, so SEO sees consistent hero copy.
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(
      h < 11
        ? "Good morning."
        : h < 17
          ? "Good afternoon."
          : h < 22
            ? "Good evening."
            : "After hours."
    );
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Poster image for instant LCP — displays while video buffers
          or permanently when autoplay is blocked */}
      <img
        src="/assets/background.jpg"
        alt=""
        fetchPriority="high"
        className="absolute top-0 left-0 w-full h-full object-cover object-[35%_center] md:object-center"
      />

      {/* Background Video — starts invisible, fades in only after
          autoplay succeeds. Removed from DOM if autoplay fails. */}
      <video
        ref={videoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover object-[35%_center] md:object-center transition-opacity duration-500 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/background.jpg"
      >
        <source src="/assets/background2.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-10" />

      {/* Overlay Text */}
      <div className="absolute bottom-28 md:bottom-24 left-6 md:left-20 z-20">
        {greeting && (
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/75 mb-3 font-vance">
            {greeting}
          </p>
        )}
        <h1 className="text-3xl md:text-5xl leading-tight font-vance text-white">
          RESTORE YOUR BODY <br /> & REFRESH YOUR MIND.
        </h1>
        <p className="text-sm md:text-lg mt-2 font-vance text-white opacity-80">
          Discover the future of spa.
        </p>
        <BookingPeek />
      </div>
    </div>
  );
}
