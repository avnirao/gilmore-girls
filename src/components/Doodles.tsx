// tiny hand-drawn line illustrations. keep restrained — one per card, max.
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CoffeeCup(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M7 12 h16 v9 a5 5 0 0 1 -5 5 h-6 a5 5 0 0 1 -5 -5 z" />
      <path d="M23 14 h2.5 a3 3 0 0 1 0 6 h-2.5" />
      <path d="M12 4 c 0 2 -1 2 -1 4 s 1 2 1 4" />
      <path d="M17 4 c 0 2 -1 2 -1 4 s 1 2 1 4" />
    </svg>
  );
}

export function Book(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M5 7 c 3 -1 8 -1 11 2 c 3 -3 8 -3 11 -2 v18 c -3 -1 -8 -1 -11 2 c -3 -3 -8 -3 -11 -2 z" />
      <path d="M16 9 v18" />
    </svg>
  );
}

export function StarDoodle(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M16 4 l3 8 l9 1 l-7 6 l2 9 l-7 -5 l-7 5 l2 -9 l-7 -6 l9 -1 z" />
    </svg>
  );
}

export function Leaf(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M6 26 C 8 12 18 4 28 5 C 27 17 19 26 6 26 z" />
      <path d="M8 24 L 22 10" />
    </svg>
  );
}

export function Paperclip(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M22 8 v14 a6 6 0 0 1 -12 0 v-11 a4 4 0 0 1 8 0 v11 a2 2 0 0 1 -4 0 v-10" />
    </svg>
  );
}

export function Envelope(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <rect x="4" y="8" width="24" height="16" rx="1" />
      <path d="M4 9 l12 9 l12 -9" />
    </svg>
  );
}

export function ArrowScribble(props: P) {
  return (
    <svg viewBox="0 0 48 16" {...base} {...props}>
      <path d="M2 8 C 12 2 24 14 34 8" />
      <path d="M30 4 L 34 8 L 30 12" />
    </svg>
  );
}

export function WavyRule(props: P) {
  return (
    <svg viewBox="0 0 200 8" preserveAspectRatio="none" {...base} strokeWidth={1.2} {...props}>
      <path d="M0 4 Q 10 0 20 4 T 40 4 T 60 4 T 80 4 T 100 4 T 120 4 T 140 4 T 160 4 T 180 4 T 200 4" />
    </svg>
  );
}

/**
 * Deterministically pick a doodle for an episode so it doesn't reshuffle
 * on re-render. Coffee/book are most common; star/leaf show up less often.
 */
export function EpisodeDoodle({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const pool = [CoffeeCup, Book, CoffeeCup, StarDoodle, Book, Leaf, Paperclip, CoffeeCup];
  const Doodle = pool[Math.abs(h) % pool.length];
  return <Doodle className={className} aria-hidden />;
}
