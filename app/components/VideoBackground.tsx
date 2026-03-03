"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay — if browser blocks it (Safari Low Power Mode,
    // iOS data saver, etc.) hide the <video> so the poster <img> shows
    // through cleanly with no play button.
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setVideoFailed(true);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Poster image for instant LCP — displays while video buffers
          or permanently when autoplay is blocked */}
      <img
        src="/assets/background.jpg"
        alt=""
        fetchPriority="high"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Background Video — hidden entirely when autoplay fails
          so no play button appears over the poster image */}
      {!videoFailed && (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/background.jpg"
        >
          <source src="/assets/background2.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-10" />

      {/* Overlay Text */}
      <div className="absolute bottom-28 md:bottom-24 left-6 md:left-20 z-20">
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
