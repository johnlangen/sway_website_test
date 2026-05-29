/**
 * SwayCurve — the brand's signature line.
 *
 * One organic wave — used as eyebrow accents, section dividers, button
 * flourishes, and the closing signoff. Recurs throughout the site so that
 * "the curve" becomes Sway's ownable shape (the way Apple has rounded
 * squares, Aesop has wash-toned amber, etc).
 *
 * Inherits color from currentColor so it adapts to whatever section it
 * sits in. Optional draw-in animation via the `animate` prop pairs with
 * the `.sway-curve-draw` keyframes in globals.css.
 */

type SwayCurveProps = {
  width?: number;
  strokeWidth?: number;
  className?: string;
  animate?: boolean;
};

export function SwayCurve({
  width = 120,
  strokeWidth = 1.5,
  className = "",
  animate = false,
}: SwayCurveProps) {
  return (
    <svg
      width={width}
      height={Math.round(width * 0.12)}
      viewBox="0 0 200 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={`sway-curve-breath ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 4 12 Q 50 2 100 12 T 196 12"
        pathLength={100}
        className={animate ? "sway-curve-draw" : ""}
      />
    </svg>
  );
}
