"use client";

export default function VideoBackground() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Poster image for instant LCP — displays while video buffers */}
      <img
        src="/assets/background.jpg"
        alt=""
        fetchPriority="high"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Background Video — loads over the poster once ready */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/background.jpg"
      >
        {/* Use mp4 for both — .mov only works on Apple devices */}
        <source src="/assets/background2.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-10" />

      {/* Overlay Text */}
      <div className="absolute bottom-28 md:bottom-24 left-6 md:left-20 z-20">
        <a
          href="/events/anniversary"
          className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm px-4 py-2 text-white text-xs tracking-wide uppercase hover:bg-white/25 transition mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          Sway Turns One — Feb 28 &middot; $49 Tickets
        </a>
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
