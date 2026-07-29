import { useEffect, useState } from "react";
import { Heart, Bookmark, Check, RefreshCw, Play } from "lucide-react";
import type { Episode, Mood } from "@/data/episodes";
import { MOODS } from "@/data/episodes";
import { useUserData } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface Props {
  episode: Episode;
  matchedMoods?: Mood[];
  onTryAgain?: () => void;
  reasonOverride?: string;
}

const MOOD_META = Object.fromEntries(MOODS.filter((m) => m.key !== "surprise").map((m) => [m.key, m]));

function buildReason(ep: Episode, moods: Mood[]): string {
  if (moods.length === 0) {
    return `A little bit of everything Stars Hollow does best.`;
  }
  const sorted = [...moods].sort((a, b) => (ep.scores[b] ?? 0) - (ep.scores[a] ?? 0));
  const top = sorted[0];
  const label = MOOD_META[top]?.label?.toLowerCase() ?? top;
  const val = ep.scores[top];
  if (val >= 9) return `Tonight's pick for maximum ${label}.`;
  if (val >= 7) return `A very ${label} evening, with a little of everything else stitched in.`;
  return `A gentler ${label} choice — nothing loud, just right.`;
}

export function EpisodeCard({ episode, matchedMoods = [], onTryAgain, reasonOverride }: Props) {
  const { data, toggle, add } = useUserData();
  const [animate, setAnimate] = useState(false);
  const [pop, setPop] = useState<string | null>(null);

  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(t);
  }, [episode.id]);

  const isFav = data.favorites.includes(episode.id);
  const isSaved = data.watchlist.includes(episode.id);
  const isWatched = data.watched.includes(episode.id);

  const reason = reasonOverride ?? buildReason(episode, matchedMoods);

  const topMoods = (matchedMoods.length ? matchedMoods : (Object.keys(episode.scores) as Mood[]))
    .map((m) => ({ mood: m, score: episode.scores[m] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const fire = (label: string) => {
    setPop(label);
    setTimeout(() => setPop(null), 1200);
  };

  return (
    <article
      key={episode.id}
      className={cn(
        "relative mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-cozy transition-all duration-500 sm:p-9",
        "paper-texture",
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      )}
    >
      {pop && (
        <div className="pointer-events-none absolute inset-x-0 -top-4 flex justify-center">
          <span className="animate-fade-in rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-cozy">
            {pop}
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-foreground">
          S{episode.season} · E{episode.episode}
        </span>
        {isWatched && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Check className="h-3.5 w-3.5" /> watched
          </span>
        )}
      </div>

      <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
        {episode.title}
      </h2>

      <p className="mt-3 italic text-muted-foreground">"{reason}"</p>

      <p className="mt-5 text-foreground/90">{episode.description}</p>

      <div className="mt-6 space-y-2.5">
        {topMoods.map(({ mood, score }) => (
          <VibeBar key={mood} label={MOOD_META[mood]?.label ?? mood} emoji={MOOD_META[mood]?.emoji ?? "•"} score={score} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {episode.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground/70"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          onClick={() => {
            add("watched", episode.id);
            fire(isWatched ? "Already on your list ✨" : "Added to watched ✨");
          }}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-cozy transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <Play className="h-4 w-4" /> Watch this
        </button>

        {onTryAgain && (
          <button
            onClick={onTryAgain}
            className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50"
          >
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
        )}

        <button
          onClick={() => {
            toggle("favorites", episode.id);
            if (!isFav) fire("Saved to favorites 💕");
          }}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-card transition-all hover:-translate-y-0.5",
            isFav && "border-rose-400 bg-rose-50 text-rose-500",
          )}
          aria-label="Favorite"
        >
          <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
        </button>

        <button
          onClick={() => {
            toggle("watchlist", episode.id);
            if (!isSaved) fire("Added to watchlist 🔖");
          }}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-card transition-all hover:-translate-y-0.5",
            isSaved && "border-primary bg-primary/10 text-primary",
          )}
          aria-label="Save for later"
        >
          <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
        </button>
      </div>
    </article>
  );
}

function VibeBar({ label, emoji, score }: { label: string; emoji: string; score: number }) {
  const pct = Math.max(4, score * 10);
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 shrink-0 text-sm text-foreground/80">
        <span className="mr-1.5">{emoji}</span>
        {label}
      </span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-secondary">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary/80 transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
        {score}/10
      </span>
    </div>
  );
}
