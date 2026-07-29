import { Play, Check } from "lucide-react";
import type { Episode } from "@/data/episodes";
import { useUserData } from "@/lib/storage";
import { tileVariant } from "@/lib/tile";
import { cn } from "@/lib/utils";

interface Props {
  episode: Episode;
  onClick?: () => void;
  size?: "sm" | "md";
}

export function EpisodeTile({ episode, onClick, size = "md" }: Props) {
  const { data } = useUserData();
  const isWatched = data.watched.includes(episode.id);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "focus-ring group relative flex shrink-0 flex-col overflow-hidden rounded-xl border border-hairline bg-surface text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/30",
        size === "md" ? "w-[220px] sm:w-[248px]" : "w-[180px]",
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className={cn("tile-bg", tileVariant(episode))} />
        <div className="relative flex h-full items-end p-3">
          <span className="font-mono text-[11px] text-ink/85">
            S{episode.season} · E{String(episode.episode).padStart(2, "0")}
          </span>
          <span
            aria-hidden
            className="ml-auto flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-ink/85 text-background opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Play className="h-4 w-4 fill-current" strokeWidth={0} />
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug text-ink">
          {episode.title}
        </h3>
        <div className="mt-auto flex items-center gap-1.5">
          {episode.tags.slice(0, 1).map((t) => (
            <span
              key={t}
              className="truncate rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink/60"
            >
              {t}
            </span>
          ))}
          {isWatched && (
            <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] text-forest">
              <Check className="h-3 w-3" strokeWidth={2.4} /> watched
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
