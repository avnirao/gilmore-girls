import { useEffect, useState } from "react";
import { Heart, Bookmark, Check, RefreshCw, Play } from "lucide-react";
import type { Episode, Mood } from "@/data/episodes";
import { MOODS } from "@/data/episodes";
import { useUserData } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { tileVariant } from "@/lib/tile";

interface Props {
  episode: Episode;
  matchedMoods?: Mood[];
  onTryAgain?: () => void;
  reasonOverride?: string;
}

const MOOD_META = Object.fromEntries(
  MOODS.filter((m) => m.key !== "surprise").map((m) => [m.key, m]),
);

function tagline(ep: Episode, moods: Mood[]): string {
  if (moods.length === 0) return "A pick from across the run.";
  const sorted = [...moods].sort(
    (a, b) => (ep.scores[b] ?? 0) - (ep.scores[a] ?? 0),
  );
  const top = sorted[0];
  const label = MOOD_META[top]?.label ?? top;
  const val = ep.scores[top];
  if (val >= 9) return `Peak ${label}.`;
  if (val >= 7) return `A strong ${label} pick.`;
  return `A quieter ${label} one.`;
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

  const line = reasonOverride ?? tagline(episode, matchedMoods);

  const topMoods = (matchedMoods.length ? matchedMoods : (Object.keys(episode.scores) as Mood[]))
    .map((m) => ({ mood: m, score: episode.scores[m] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <article className="animate-rise mx-auto max-w-4xl">
      <div className="surface overflow-hidden rounded-2xl">
        <div className="grid gap-0 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {/* backdrop */}
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-full">
            <div className={cn("tile-bg", tileVariant(episode))} />
            <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-ink/25 bg-ink/10 px-2.5 py-0.5 font-mono text-[11px] text-ink backdrop-blur">
                  S{episode.season} · E{String(episode.episode).padStart(2, "0")}
                </span>
                {isWatched && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest/25 px-2.5 py-0.5 font-mono text-[11px] text-ink">
                    <Check className="h-3 w-3" strokeWidth={2.4} /> watched
                  </span>
                )}
              </div>
              <div>
                <p className="font-label text-warm-red">Your match</p>
                <h2 className="mt-2 font-display text-2xl leading-[1.05] text-ink sm:text-3xl">
                  {episode.title}
                </h2>
                <p className="mt-2 text-sm text-ink/80">{line}</p>
              </div>
            </div>
          </div>

          {/* details */}
          <div className="relative flex flex-col gap-4 p-5 sm:p-6">
            {pop && (
              <div className="pointer-events-none absolute inset-x-0 top-2 flex justify-center">
                <span className="rounded-full border border-brick bg-brick px-3 py-1 font-mono text-[11px] text-primary-foreground shadow">
                  {pop}
                </span>
              </div>
            )}

            <p className="text-[15px] leading-relaxed text-ink/85">
              {episode.description}
            </p>

            <div className="space-y-1.5">
              {topMoods.map(({ mood, score }) => (
                <VibeBar key={mood} label={MOOD_META[mood]?.label ?? mood} score={score} />
              ))}
            </div>

            {episode.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {episode.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-hairline bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => {
                  add("watched", episode.id);
                  setPop(isWatched ? "Already watched" : "Marked as watched");
                }}
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-brick px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-warm-red"
              >
                <Play className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                Watch this
              </button>

              {onTryAgain && (
                <button
                  onClick={onTryAgain}
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/40"
                >
                  <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
                  Try again
                </button>
              )}

              <div className="ml-auto flex items-center gap-1.5">
                <IconToggle
                  on={isFav}
                  onClick={() => {
                    toggle("favorites", episode.id);
                    if (!isFav) setPop("Added to favorites");
                  }}
                  label="Favorite"
                >
                  <Heart className={cn("h-4 w-4", isFav && "fill-current")} strokeWidth={1.8} />
                </IconToggle>
                <IconToggle
                  on={isSaved}
                  onClick={() => {
                    toggle("watchlist", episode.id);
                    if (!isSaved) setPop("Saved for later");
                  }}
                  label="Save for later"
                >
                  <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} strokeWidth={1.8} />
                </IconToggle>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function IconToggle({
  on,
  onClick,
  label,
  children,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={on}
      className={cn(
        "focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
        on
          ? "border-brick bg-brick text-primary-foreground"
          : "border-hairline bg-surface text-ink/80 hover:border-ink/40",
      )}
    >
      {children}
    </button>
  );
}

function VibeBar({ label, score }: { label: string; score: number }) {
  const pct = Math.max(6, score * 10);
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-wider text-ink/60">
        {label}
      </span>
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-brick transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-6 shrink-0 text-right font-mono text-[10px] tabular-nums text-ink/50">
        {score}
      </span>
    </div>
  );
}
