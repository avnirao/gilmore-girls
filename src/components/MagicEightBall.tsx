import { useState } from "react";
import { MOODS, type Mood, type Episode } from "@/data/episodes";
import { pickEpisode } from "@/lib/recommend";
import { cn } from "@/lib/utils";

const MOOD_KEYS = MOODS.filter((m) => m.key !== "surprise") as { key: Mood; label: string }[];

type Stage = "idle" | "mood" | "episode";

export function MagicEightBall() {
  const [stage, setStage] = useState<Stage>("idle");
  const [mood, setMood] = useState<{ key: Mood; label: string } | null>(null);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [shaking, setShaking] = useState(false);
  const [reveal, setReveal] = useState(0);

  const shake = (fn: () => void) => {
    if (shaking) return;
    setShaking(true);
    setTimeout(() => {
      fn();
      setReveal((n) => n + 1);
      setShaking(false);
    }, 900);
  };

  const handleBall = () => {
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

  const windowText = shaking
    ? "…"
    : stage === "idle"
      ? "ask again"
      : stage === "mood" && mood
        ? mood.label
        : episode
          ? `s${episode.season} · e${episode.episode}`
          : "…";

  const caption = shaking
    ? "shaking…"
    : stage === "idle"
      ? "shake for a mood"
      : stage === "mood"
        ? "shake again for an episode"
        : "shake to start over";

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 border-t border-dashed border-border px-5 py-14 text-center sm:px-8">
      <p className="text-[10px] tracking-[0.22em] text-muted-foreground">
        can't decide? ask the 8-ball
      </p>

      <button
        onClick={handleBall}
        aria-label="shake the magic 8-ball"
        className={cn(
          "group relative grid h-40 w-40 place-items-center rounded-full shadow-cozy transition-transform sm:h-48 sm:w-48",
          "bg-[radial-gradient(circle_at_32%_28%,color-mix(in_oklab,var(--color-foreground)_55%,white)_0%,var(--color-foreground)_42%,black_100%)]",
          !shaking && "hover:-translate-y-1",
          shaking && "animate-ball-shake",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute left-[22%] top-[16%] h-8 w-12 rotate-[-20deg] rounded-[50%] bg-white/25 blur-[6px]"
        />

        <span className="grid h-[52%] w-[52%] place-items-center rounded-full bg-black/70 p-2 shadow-inner">
          <span
            key={reveal}
            className={cn(
              "flex h-full w-full items-center justify-center rounded-full px-2",
              !shaking && "animate-answer-surface",
            )}
          >
            <span className="font-display text-base leading-tight tracking-[0.01em] text-[oklch(0.86_0.06_255)] sm:text-lg">
              {windowText}
            </span>
          </span>
        </span>
      </button>

      <p className="text-sm text-muted-foreground">{caption}</p>

      {episode && !shaking && (
        <div className="animate-fade-in max-w-md">
          <h3 className="font-display text-2xl tracking-[0.01em] text-foreground">
            {episode.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{episode.description}</p>
        </div>
      )}
    </section>
  );
}
