// simple, tasteful line icons used across the app.
// one cohesive visual system — 1.5 stroke, rounded, currentColor.
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
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

export function HeartRain(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M16 26 s-8 -4 -8 -12 a5 5 0 0 1 8 -3 a5 5 0 0 1 8 3 c 0 8 -8 12 -8 12 z" />
      <path d="M8 6 v3 M14 4 v3 M20 4 v3 M26 6 v3" />
    </svg>
  );
}

export function Heart(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M16 26 s-9 -5 -9 -13 a5 5 0 0 1 9 -3 a5 5 0 0 1 9 3 c 0 8 -9 13 -9 13 z" />
    </svg>
  );
}

export function Mask(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M6 8 h20 v9 a10 10 0 0 1 -20 0 z" />
      <path d="M11 13 l2 2 M21 13 l-2 2" />
      <path d="M12 22 c 2 -2 6 -2 8 0" />
    </svg>
  );
}

export function Lightning(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M18 3 L 8 18 h7 l-3 11 l11 -16 h-7 z" />
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

export function Gazebo(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M4 12 L 16 4 L 28 12" />
      <path d="M6 12 v14 M26 12 v14 M12 12 v14 M20 12 v14" />
      <path d="M4 26 h24" />
      <path d="M8 12 h16" />
    </svg>
  );
}

export function SpeechBubble(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M5 6 h22 a2 2 0 0 1 2 2 v13 a2 2 0 0 1 -2 2 h-10 l-6 5 v-5 h-6 a2 2 0 0 1 -2 -2 v-13 a2 2 0 0 1 2 -2 z" />
      <path d="M10 14 h12 M10 18 h8" />
    </svg>
  );
}

export function Dice(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <rect x="6" y="6" width="20" height="20" rx="3" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      <circle cx="20" cy="12" r="1.4" fill="currentColor" />
      <circle cx="16" cy="16" r="1.4" fill="currentColor" />
      <circle cx="12" cy="20" r="1.4" fill="currentColor" />
      <circle cx="20" cy="20" r="1.4" fill="currentColor" />
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

export function Star(props: P) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M16 4 l3 8 l9 1 l-7 6 l2 9 l-7 -5 l-7 5 l2 -9 l-7 -6 l9 -1 z" />
    </svg>
  );
}
