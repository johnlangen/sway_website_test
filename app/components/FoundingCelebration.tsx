"use client";

/**
 * The moment someone becomes a founding member (John 11/23/2026: "there should be like a confetti
 * animation or some fluidity or excitement after i become one").
 *
 * One burst of paper from the two bottom corners, then a slow drift from the top, in the brand
 * greens and sand only. A quarter of the pieces are small Sway curves. It plays once, about five
 * seconds, then the canvas clears itself.
 *
 * Decoration only: the canvas ignores taps (pointer-events none), is hidden from screen readers,
 * and does nothing at all for guests who ask for reduced motion. No library: ~100 lines of canvas.
 */

import { useEffect, useRef } from "react";

const COLORS = ["#113D33", "#2F5D50", "#4A776D", "#B6CFBF", "#D8CDB0"];
const GRAVITY = 520; // px/s²
const DRAG = 1.5; // 1/s, so paper tops out near 350px/s on the way down
const RUN = 5.4; // seconds
const FADE = 1.4; // the last seconds fade out

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  spin: number;
  flip: number;
  flipSpeed: number;
  sway: number;
  swayPhase: number;
  color: string;
  shape: 0 | 1 | 2; // paper, dot, curve
  delay: number;
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);

export default function FoundingCelebration() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    const fit = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    window.addEventListener("resize", fit);

    const small = W < 640;
    const pieces: Piece[] = [];
    const make = (over: Partial<Piece>): Piece => {
      const r = Math.random();
      return {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: rand(7, 13),
        rot: rand(0, Math.PI * 2),
        spin: rand(-5, 5),
        flip: rand(0, Math.PI * 2),
        flipSpeed: rand(4, 10),
        sway: rand(14, 44),
        swayPhase: rand(0, Math.PI * 2),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: r < 0.6 ? 0 : r < 0.75 ? 1 : 2,
        delay: 0,
        ...over,
      };
    };

    // The burst: both bottom corners, aimed at the upper middle of the screen
    const perSide = small ? 45 : 80;
    for (const side of [0, 1]) {
      const x0 = side === 0 ? -8 : W + 8;
      const y0 = H * 0.92;
      const aim = Math.atan2(H * 0.2 - y0, W / 2 - x0);
      for (let i = 0; i < perSide; i++) {
        const angle = aim + rand(-0.42, 0.42);
        const speed = rand(0.55, 1.05) * (H * 1.7 + 200);
        pieces.push(make({ x: x0, y: y0 + rand(-20, 20), vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, delay: 0.25 + rand(0, 0.22) }));
      }
    }
    // The drift: a few pieces let go from the top while the burst is still in the air
    for (let i = 0; i < (small ? 22 : 40); i++) {
      pieces.push(make({ x: rand(0, W), y: -20, vx: rand(-30, 30), vy: rand(40, 120), delay: rand(0.6, 2.1) }));
    }

    let raf = 0;
    let last = performance.now();
    let t = 0;
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      t += dt;
      ctx.clearRect(0, 0, W, H);
      if (t >= RUN) return; // done: the canvas stays clear
      const fade = t > RUN - FADE ? (RUN - t) / FADE : 1;
      const slow = Math.exp(-DRAG * dt);
      for (const p of pieces) {
        if (t < p.delay) continue;
        p.vx *= slow;
        p.vy = p.vy * slow + GRAVITY * dt;
        p.x += (p.vx + Math.sin(t * 2.2 + p.swayPhase) * p.sway) * dt;
        p.y += p.vy * dt;
        p.rot += p.spin * dt;
        p.flip += p.flipSpeed * dt;
        if (p.y > H + 30) continue;
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (p.shape === 0) {
          // A slip of paper turning over as it falls
          ctx.scale(1, Math.cos(p.flip));
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size * 0.3, p.size, p.size * 0.6);
        } else if (p.shape === 1) {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.28, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // The Sway curve, small
          const w = p.size * 1.9;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(-w / 2, 0);
          ctx.quadraticCurveTo(-w / 4, -w * 0.22, 0, 0);
          ctx.quadraticCurveTo(w / 4, w * 0.22, w / 2, 0);
          ctx.stroke();
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] h-full w-full" />;
}
