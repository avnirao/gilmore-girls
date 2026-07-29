import { useEffect, useState } from "react";
import { Heart, Bookmark, Check, RefreshCw } from "lucide-react";
import type { Episode, Mood } from "@/data/episodes";
import { MOODS } from "@/data/episodes";
import { useUserData } from "@/lib/storage";
import { EpisodeDoodle, WavyRule } from "@/components/Doodles";
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
  if (moods.length === 0) return "picked from across the whole town.";
  const sorted = [...moods].sort(
    (a, b) => (ep.scores[b] ?? 0) - (ep.scores[a] ?? 0),
  );
  const top = sorted[0];
  const label = MOOD_META[top]?.label?.toLowerCase() ?? top;
  const val = ep.scores[top];
  if (val >= 9) return `about as ${label} as it gets.`;
  if (val >= 7) return `a solid ${label} pick.`;
  return `a quieter ${label} one.`;
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toLowerCase();
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
    <article className="relative mx-auto max-w-2xl">
      {/* paper card */}
      <div className="paper-card relative px-6 py-8 sm:px-10 sm:py-10">
        <span className="tape -top-2 left-8 tilt-l" aria-hidden />
        <span className="tape -top-2 right-8 tilt-r" aria-hidden />

        {/* corner doodle */}
        <span className="absolute right-5 top-5 text-coffee/70">
          <EpisodeDoodle seed={episode.id} className="h-8 w-8" />
        </span>

        {pop && (
          <div className="pointer-events-none absolute inset-x-0 -top-4 flex justify-center">
            <span className="border border-coffee bg-paper px-3 py-1 font-stamp text-[10px] text-coffee shadow-[2px_2px_0_-1px_var(--color-rule)]">
              {pop}
            </span>
          </div>
        )}

        <p className="font-label text-brick">tonight's episode</p>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-stamp text-[11px] text-muted-foreground">
          <span>s{episode.season} · ep {String(episode.episode).padStart(2, "0")}</span>
          <span className="text-rule">·</span>
          <span>aired {formatDate(episode.airDate)}</span>
        </div>

        <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
          <span className="hand-underline lowercase">{episode.title.toLowerCase()}</span>
        </h2>

        {isWatched && (
          <p className="mt-3 inline-flex items-center gap-1.5 font-hand text-base text-sage">
            <Check className="h-3.5 w-3.5" strokeWidth={2} /> already watched
          </p>
        )}

        <p className="mt-5 font-hand text-xl text-coffee tilt-l">— {reason}</p>

        <p className="mt-5 text-[15px] leading-relaxed text-ink/90">
          {episode.description}
        </p>

        <WavyRule className="mt-8 h-2 w-full text-rule" />

        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
          {topMoods.map(({ mood, score }) => (
            <VibeBar key={mood} label={MOOD_META[mood]?.label ?? mood} score={score} />
          ))}
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-label text-muted-foreground">who's in it</dt>
            <dd className="mt-1.5 font-body text-ink/85">
              {episode.characters.join(", ").toLowerCase()}
            </dd>
          </div>
          <div>
            <dt className="font-label text-muted-foreground">where</dt>
            <dd className="mt-1.5 font-body text-ink/85">
              {episode.locations.join(", ").toLowerCase()}
            </dd>
          </div>
        </dl>

        {episode.tags.length > 0 && (
          <p className="mt-5 font-hand text-lg text-brick/90">
            — {episode.tags.slice(0, 4).join(", ")}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-dashed border-rule pt-6">
          <button
            onClick={() => {
              add("watched", episode.id);
              setPop(isWatched ? "already on the list" : "marked as watched");
            }}
            className="inline-flex items-center gap-2 border border-coffee bg-coffee px-5 py-2 font-stamp text-xs text-primary-foreground transition-colors hover:border-brick hover:bg-brick"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2} />
            mark as watched
          </button>

          {onTryAgain && (
            <button
              onClick={onTryAgain}
              className="inline-flex items-center gap-2 border border-rule bg-paper px-5 py-2 font-stamp text-xs text-ink transition-colors hover:border-coffee"
            >
              <RefreshCw className="h-3 w-3" strokeWidth={1.8} /> pick another
            </button>
          )}

          <div className="ml-auto flex items-center gap-2">
            <IconToggle
              on={isFav}
              onClick={() => {
                toggle("favorites", episode.id);
                if (!isFav) setPop("added to favorites");
              }}
              label="favorite"
            >
              <Heart className={cn("h-4 w-4", isFav && "fill-current")} strokeWidth={1.6} />
            </IconToggle>
            <IconToggle
              on={isSaved}
              onClick={() => {
                toggle("watchlist", episode.id);
                if (!isSaved) setPop("saved for later");
              }}
              label="save for later"
            >
              <Bookmark
                className={cn("h-4 w-4", isSaved && "fill-current")}
                strokeWidth={1.6}
              />
            </IconToggle>
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
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center border transition-all",
        on
          ? "border-brick bg-brick text-primary-foreground"
          : "border-rule bg-paper text-coffee hover:border-coffee",
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
      <span className="w-24 shrink-0 font-label text-ink/70">
        {label.toLowerCase()}
      </span>
      <div className="relative h-[6px] flex-1 bg-index border border-rule/60">
        <div
          className="absolute inset-y-0 left-0 bg-coffee transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-6 shrink-0 text-right font-mono text-[10px] tabular-nums text-muted-foreground">
        {score}
      </span>
    </div>
  );
}
