import { episodes, type Episode, type Mood, type SkipTag } from "@/data/episodes";

export interface RecommendInput {
  moods: Mood[];
  skips: SkipTag[];
  excludeIds?: string[];
}

export interface Ranked {
  episode: Episode;
  score: number;
  matchedMoods: Mood[];
}

export function rankEpisodes({ moods, skips, excludeIds = [] }: RecommendInput): Ranked[] {
  const pool = episodes.filter(
    (ep) => !excludeIds.includes(ep.id) && !ep.skipFlags.some((f) => skips.includes(f)),
  );

  const scored = pool.map((ep) => {
    const score =
      moods.length === 0
        ? Math.random() * 10
        : moods.reduce((sum, m) => sum + (ep.scores[m] ?? 0), 0) / moods.length;
    return { episode: ep, score, matchedMoods: moods };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored;
}

export function pickEpisode(input: RecommendInput): Episode | null {
  const ranked = rankEpisodes(input);
  if (ranked.length === 0) return null;
  // pick weighted from top 3 to add variety on Try Again
  const top = ranked.slice(0, Math.min(3, ranked.length));
  const weights = top.map((_, i) => top.length - i);
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < top.length; i++) {
    r -= weights[i];
    if (r <= 0) return top[i].episode;
  }
  return top[0].episode;
}

export function randomEpisode(excludeId?: string): Episode {
  const pool = excludeId ? episodes.filter((e) => e.id !== excludeId) : episodes;
  return pool[Math.floor(Math.random() * pool.length)];
}
