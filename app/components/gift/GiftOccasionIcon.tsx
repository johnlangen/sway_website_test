import type { ReactNode } from "react";

/** Occasion icons for the design filter (copied from the Spavia site, 10/28). Decorative: the chip label carries the meaning. */
export default function GiftOccasionIcon({ occasion }: { occasion: string }) {
  const heart = (
    <path d="M20.4 5.6a5.5 5.5 0 0 0-7.8 0l-.6.6-.6-.6a5.5 5.5 0 0 0-7.8 7.8L12 21l8.4-7.6a5.5 5.5 0 0 0 0-7.8Z" />
  );
  const flower = (
    <>
      <path d="M12 14v7m0-3c-4 0-6-2-6-4 3 0 5 1 6 4m0 1c4 0 6-2 6-4-3 0-5 1-6 4" />
      <path d="M12 3c-3-4-7 0-4 3-5-1-5 5 0 5-1 4 5 5 5 1 4 2 7-3 3-5 2-4-3-7-4-4Z" />
    </>
  );
  const rings = (
    <>
      <circle cx="8" cy="14" r="6" />
      <circle cx="16" cy="14" r="6" />
      <path d="m6 4 2-2 2 2-2 3-2-3Zm8 0 2-2 2 2-2 3-2-3Z" />
    </>
  );
  const icons: Record<string, ReactNode> = {
    All: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    Everyday: (
      <>
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M5 12v9h14v-9M12 8v13m0-13H8a3 3 0 1 1 3-3l1 3Zm0 0h4a3 3 0 1 0-3-3l-1 3Z" />
      </>
    ),
    Birthday: (
      <>
        <path d="M4 21V11h16v10H4Zm0-7c2 3 4 3 6 0 2 3 4 3 6 0 1 2 3 2 4 0M8 11V8m8 3V8M8 5V3m8 2V3" />
      </>
    ),
    "Thank You": flower,
    Anniversary: rings,
    Wedding: rings,
    Love: heart,
    "Valentine’s Day": heart,
    "Self-Care": (
      <>
        <path d="M20 3C8 2 2 7 5 14c3 7 15 4 15-11ZM4 21 15 9m-7 8-1-5m5 1h5" />
      </>
    ),
    Congratulations: (
      <>
        <path d="m3 21 4-14 10 10-14 4ZM7 7l10 10M12 3v3m7-2-2 3m4 3h-3M8 12l4 6" />
        <circle cx="20" cy="17" r="1" />
      </>
    ),
    Graduation: (
      <>
        <path d="m2 8 10-5 10 5-10 5L2 8Zm4 2v7c4 3 8 3 12 0v-7m4-2v9" />
      </>
    ),
    "New Baby": (
      <>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 5c-3-4 4-5 3-1M8 12h.01M16 12h.01m-7 4c2 2 4 2 6 0" />
      </>
    ),
    "Mother’s Day": flower,
    "Father’s Day": (
      <>
        <path d="M4 5h13v11a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V5Zm13 2h2a3 3 0 0 1 0 6h-2M8 2h5" />
      </>
    ),
    Holiday: (
      <>
        <path d="m12 2-6 7h3l-5 6h4l-5 5h18l-5-5h4l-5-6h3l-6-7Zm0 18v2" />
      </>
    ),
    Plain: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="M7 14h5" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="h-[18px] w-[18px] shrink-0"
    >
      {icons[occasion] || heart}
    </svg>
  );
}
