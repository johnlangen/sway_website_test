"use client";
import { useEffect, useRef, useState } from "react";

/** A photographic fallback is always visible; playback is optional. */
export default function BackgroundFilm({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => {
      video.pause();
    };
    const onPreference = () => {
      if (preference.matches) stop();
    };
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    if (!preference.matches) video.play().catch(() => {});
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-hidden="true"
      />
      <button
        type="button"
        className="film-control"
        onClick={() => {
          const video = ref.current;
          if (!video) return;
          if (video.paused) video.play().catch(() => {});
          else video.pause();
        }}
        aria-label={
          playing ? "Pause background video" : "Play background video"
        }
      >
        {playing ? "Pause film Ⅱ" : "Play film ▷"}
      </button>
    </>
  );
}
