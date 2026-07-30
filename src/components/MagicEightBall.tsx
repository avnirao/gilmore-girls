import { useState } from "react";
import { X } from "lucide-react";
import { MOODS, type Mood, type Episode } from "@/data/episodes";
import { pickEpisode } from "@/lib/recommend";
import { cn } from "@/lib/utils";

const MOOD_KEYS = MOODS.filter((m) => m.key !== "surprise") as { key: Mood; label: string }[];

type Stage = "idle" | "mood" | "episode";

export function MagicEightBall() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [mood, setMood] = useState<{ key: Mood; label: string } | null>(null);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [shaking, setShaking] = useState(false);

  const shake = (fn: () => void) => {
    setShaking(true);
    setTimeout(() => {
      fn();
      setShaking(false);
    }, 550);
  };

  const handleBall = () => {
    if (!open) {
      setOpen(true);
      return;
    }
    if (stage === "idle") {
      shake(() => {
        setMood(MOOD_KEYS[Math.floor(Math.random() * MOOD_KEYS.length)]);
        setStage("mood");
      });
    } else if (stage === "mood" && mood) {
      shake(() => {
        setEpisode(pickEpisode({ moods: [mood.key], skips: [] }));
        setStage("episode");
      });
    } else {
      shake(() => {
        setMood(null);
        setEpisode(null);
        setStage("idle");
      });
    }
  };

  const caption =
    stage === "idle"
      ? "ask the 8-ball for a vibe"
      : stage === "mood"
        ? "shake again for an episode"
        : "shake to start over";

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {open && (
        <div className="w-64 animate-fade-in rounded-2xl border border-border bg-card p-4 shadow-cozy sm:w-72">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[10px] tracking-[0.22em] text-muted-foreground">
              the 8-ball says
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="close magic 8-ball"
              className="-mr-1 -mt-1 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {stage === "idle" && (
            <p className="mt-2 text-sm text-muted-foreground">
              give it a shake and it'll pick a mood for you.
            </p>
          )}

          {mood && (
            <p className="mt-2 font-display text-2xl tracking-[0.01em] text-foreground">
              {mood.label}
            </p>
          )}

          {episode && (
            <div className="mt-3 border-t border-border pt-3">
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold tracking-widest text-secondary-foreground">
                s{episode.season} · e{episode.episode}
              </span>
              <p className="mt-2 font-display text-lg leading-snug tracking-[0.01em] text-foreground">
                {episode.title}
              </p>
              <p className="mt-1 line-clamp-3 text-xs text-muted-foreground">
                {episode.description}
              </p>
            </div>
          )}

          <p className="mt-3 text-[11px] text-muted-foreground">{caption}</p>
        </div>
      )}

      <button
        onClick={handleBall}
        aria-label="magic 8-ball"
        className={cn(
          "grid h-14 w-14 place-items-center rounded-full border-2 border-border bg-foreground shadow-cozy transition-all hover:-translate-y-0.5",
          shaking && "animate-wiggle",
        )}
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-card">
          <span className="font-display text-lg leading-none text-foreground">8</span>
        </span>
      </button>
    </div>
  );
}
