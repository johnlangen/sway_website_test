/** SVG avoids platform-specific emoji presentation of Unicode arrows. */
export default function ArrowMark({
  direction = "right",
}: {
  direction?: "right" | "down";
}) {
  return (
    <svg
      className="sway-arrow-mark"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={direction === "down" ? { transform: "rotate(90deg)" } : undefined}
    >
      <path d="M4 12h15M13 5l7 7-7 7" />
    </svg>
  );
}
