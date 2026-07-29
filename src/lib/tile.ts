import type { Episode } from "@/data/episodes";

// pick a deterministic backdrop variant based on the episode's dominant mood.
const VARIANTS = [
  "tile-v-coffee",
  "tile-v-night",
  "tile-v-autumn",
  "tile-v-forest",
  "tile-v-rose",
  "tile-v-slate",
] as const;

export function tileVariant(ep: Episode): (typeof VARIANTS)[number] {
  const s = ep.scores;
  const top = (
    [
      ["cozy", "tile-v-coffee"],
      ["autumn", "tile-v-autumn"],
      ["romance", "tile-v-rose"],
      ["starsHollow", "tile-v-night"],
      ["drama", "tile-v-slate"],
      ["funny", "tile-v-forest"],
    ] as const
  )
    .map(([m, v]) => [s[m] ?? 0, v] as const)
    .sort((a, b) => b[0] - a[0])[0];
  return (top?.[1] ?? "tile-v-slate") as (typeof VARIANTS)[number];
}
