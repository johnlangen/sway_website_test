"use client";

import { useEffect, useRef, useState } from "react";

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
      {/* Poster image. <picture> serves a mobile-specific portrait shot
          (the SWAY sign) on small viewports; desktop keeps the wider
          first-frame of the video for a seamless poster-to-video handoff. */}
      <picture>
        <source media="(max-width: 767px)" srcSet="/assets/swaysign.jpg" />
        <img
          src="/assets/background.jpg"
          alt=""
          fetchPriority="high"
          className="absolute top-0 left-0 w-full h-full object-cover object-center ken-burns"
        />
      </picture>

      {/* Background Video — desktop only. On mobile the SWAY-sign poster
          is the whole hero (avoids the ugly jump from the static sign to
          the video's desk first-frame when autoplay actually succeeds). */}
      <video
        ref={videoRef}
        className={`hidden md:block absolute top-0 left-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
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

      {/* Mobile overlay — heavier gradient because the SWAY-sign poster
          is bright and needs to be tamed for the white text overlay to
          read. Dark grounded at the bottom (where hero copy sits), softer
          but still tinted at the top so the sign reads as deliberately
          moody rather than washed out. */}
      <div className="md:hidden absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/40 to-black/15 z-10" />

      {/* Desktop overlay — light haze (unchanged) */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-full bg-black opacity-20 z-10" />

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
      </div>
    </div>
  );
}
