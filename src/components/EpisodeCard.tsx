import { useEffect, useState } from "react";
import { Heart, Bookmark, Check, RefreshCw } from "lucide-react";
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

const MOOD_META = Object.fromEntries(
  MOODS.filter((m) => m.key !== "surprise").map((m) => [m.key, m]),
);

function buildReason(ep: Episode, moods: Mood[]): string {
  if (moods.length === 0) {
    return "A general recommendation from across the series.";
  }
  const sorted = [...moods].sort(
    (a, b) => (ep.scores[b] ?? 0) - (ep.scores[a] ?? 0),
  );
  const top = sorted[0];
  const label = MOOD_META[top]?.label?.toLowerCase() ?? top;
  const val = ep.scores[top];
  if (val >= 9) return `Strong ${label} episode.`;
  if (val >= 7) return `A solid ${label} pick.`;
  return `A lighter ${label} choice.`;
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function EpisodeCard({ episode, matchedMoods = [], onTryAgain, reasonOverride }: Props) {
  const { data, toggle, add } = useUserData();
  const [pop, setPop] = useState<string | null>(null);

  useEffect(() => {
    if (!pop) return;
    const t = setTimeout(() => setPop(null), 1400);
    return () => clearTimeout(t);
  }, [pop]);

  const isFav = data.favorites.includes(episode.id);
  const isSaved = data.watchlist.includes(episode.id);
  const isWatched = data.watched.includes(episode.id);

  const reason = reasonOverride ?? buildReason(episode, matchedMoods);

  const topMoods = (matchedMoods.length ? matchedMoods : (Object.keys(episode.scores) as Mood[]))
    .map((m) => ({ mood: m, score: episode.scores[m] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return (
    <article className="relative mx-auto max-w-2xl border-t-2 border-b border-foreground bg-background px-1 py-10 sm:px-4">
      {pop && (
        <div className="pointer-events-none absolute inset-x-0 -top-3 flex justify-center">
          <span className="border border-foreground bg-background px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-foreground">
            {pop}
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        <span>
          Season {episode.season} · Episode {episode.episode}
        </span>
        <span>{formatDate(episode.airDate)}</span>
      </div>

      <h2 className="mt-5 font-display text-2xl leading-tight text-foreground sm:text-3xl">
        {episode.title}
      </h2>

      {isWatched && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          <Check className="h-3 w-3" /> Watched
        </p>
      )}

      <p className="mt-5 text-sm italic text-muted-foreground sm:text-base">{reason}</p>

      <p className="mt-6 text-[15px] leading-relaxed text-foreground/90">
        {episode.description}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
        {topMoods.map(({ mood, score }) => (
          <VibeBar key={mood} label={MOOD_META[mood]?.label ?? mood} score={score} />
        ))}
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-border pt-6 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Featured
          </dt>
          <dd className="mt-1.5 text-foreground/85">
            {episode.characters.join(", ")}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Setting
          </dt>
          <dd className="mt-1.5 text-foreground/85">
            {episode.locations.join(", ")}
          </dd>
        </div>
      </dl>

      {episode.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {episode.tags.map((t, i) => (
            <span key={t}>
              {t}
              {i < episode.tags.length - 1 && <span className="ml-3 opacity-40">·</span>}
            </span>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <button
          onClick={() => {
            add("watched", episode.id);
            setPop(isWatched ? "Already marked" : "Marked as watched");
          }}
          className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-2 font-display text-xs text-background transition-colors hover:bg-transparent hover:text-foreground"
        >
          Mark as watched
        </button>

        {onTryAgain && (
          <button
            onClick={onTryAgain}
            className="inline-flex items-center gap-2 border border-border px-5 py-2 font-display text-xs text-foreground transition-colors hover:border-foreground"
          >
            <RefreshCw className="h-3 w-3" /> Another
          </button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => {
              toggle("favorites", episode.id);
              if (!isFav) setPop("Added to favorites");
            }}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center border border-border transition-colors hover:border-foreground",
              isFav && "border-foreground bg-foreground text-background",
            )}
            aria-label="Favorite"
          >
            <Heart className={cn("h-3.5 w-3.5", isFav && "fill-current")} />
          </button>

          <button
            onClick={() => {
              toggle("watchlist", episode.id);
              if (!isSaved) setPop("Added to watchlist");
            }}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center border border-border transition-colors hover:border-foreground",
              isSaved && "border-foreground bg-foreground text-background",
            )}
            aria-label="Save for later"
          >
            <Bookmark className={cn("h-3.5 w-3.5", isSaved && "fill-current")} />
          </button>
        </div>
      </div>
    </article>
  );
}

function VibeBar({ label, score }: { label: string; score: number }) {
  const pct = Math.max(4, score * 10);
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 text-[11px] uppercase tracking-[0.16em] text-foreground/70">
        {label}
      </span>
      <div className="relative h-[3px] flex-1 bg-border">
        <div
          className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">
        {score}
      </span>
    </div>
  );
}
