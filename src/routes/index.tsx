import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Dices, Sparkles } from "lucide-react";
import { MOODS, SKIP_OPTIONS, type Mood, type SkipTag, type Episode } from "@/data/episodes";
import { pickEpisode, randomEpisode } from "@/lib/recommend";
import { MoodChip } from "@/components/MoodChip";
import { EpisodeCard } from "@/components/EpisodeCard";
import { SiteNav } from "@/components/SiteNav";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stars Hollow Tonight — Which Gilmore Girls episode fits your mood?" },
      {
        name: "description",
        content:
          "A cozy fan-made pick-an-episode app for Gilmore Girls. Choose your mood and get the perfect Stars Hollow episode for tonight.",
      },
      { property: "og:title", content: "Stars Hollow Tonight" },
      {
        property: "og:description",
        content:
          "Pick your mood — cozy, autumn, Stars Hollow, chaos — and we'll pick tonight's Gilmore Girls episode.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TonightPage,
});

function TonightPage() {
  const [selected, setSelected] = useState<Set<Mood>>(new Set());
  const [skips, setSkips] = useState<Set<SkipTag>>(new Set());
  const [showSkip, setShowSkip] = useState(false);
  const [current, setCurrent] = useState<Episode | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [mode, setMode] = useState<"mood" | "random" | null>(null);
  const [shake, setShake] = useState(false);

  const moodArr = useMemo(() => Array.from(selected), [selected]);
  const skipArr = useMemo(() => Array.from(skips), [skips]);

  const toggleMood = (m: Mood | "surprise") => {
    if (m === "surprise") {
      surprise();
      return;
    }
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(m)) n.delete(m);
      else n.add(m);
      return n;
    });
  };

  const toggleSkip = (s: SkipTag) => {
    setSkips((prev) => {
      const n = new Set(prev);
      if (n.has(s)) n.delete(s);
      else n.add(s);
      return n;
    });
  };

  const find = () => {
    const ep = pickEpisode({ moods: moodArr, skips: skipArr, excludeIds: seen });
    if (!ep) {
      // fallback: reset seen
      const retry = pickEpisode({ moods: moodArr, skips: skipArr });
      if (retry) {
        setCurrent(retry);
        setSeen([retry.id]);
        setMode("mood");
      }
      return;
    }
    setCurrent(ep);
    setSeen((s) => [...s, ep.id]);
    setMode("mood");
    setTimeout(() => {
      document.getElementById("pick")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const surprise = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
    const ep = randomEpisode(current?.id);
    setCurrent(ep);
    setSeen((s) => [...s, ep.id]);
    setMode("random");
    setTimeout(() => {
      document.getElementById("pick")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto w-full max-w-5xl px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
        <section className="text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <Sparkles className="h-3 w-3" /> tonight's pick
          </p>
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            What are we feeling
            <br className="hidden sm:block" /> <span className="italic text-primary">tonight?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground sm:text-lg">
            Tap a mood or three. We'll pour the coffee and pick the episode.
          </p>
        </section>

        <section className="mt-10">
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5 sm:gap-3">
            {MOODS.map((m) => (
              <MoodChip
                key={m.key}
                emoji={m.emoji}
                label={m.label}
                selected={m.key !== "surprise" && selected.has(m.key as Mood)}
                onClick={() => toggleMood(m.key)}
              />
            ))}
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4">
            <button
              onClick={find}
              disabled={selected.size === 0}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-cozy transition-all",
                "hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0",
              )}
            >
              Find my episode
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>

            <button
              onClick={surprise}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                shake && "animate-wiggle",
              )}
            >
              <Dices className={cn("h-4 w-4", shake && "animate-spin")} />
              or, surprise me
            </button>
          </div>

          <div className="mx-auto mt-10 max-w-2xl">
            <button
              onClick={() => setShowSkip((v) => !v)}
              className="mx-auto flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              What are we <span className="italic">not</span> in the mood for?
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", showSkip && "rotate-180")}
              />
            </button>
            {showSkip && (
              <div className="mt-4 animate-fade-in rounded-2xl border border-dashed border-border bg-card/60 p-5">
                <div className="flex flex-wrap justify-center gap-2">
                  {SKIP_OPTIONS.map((s) => (
                    <MoodChip
                      key={s.key}
                      emoji="✕"
                      label={s.label}
                      size="sm"
                      selected={skips.has(s.key)}
                      onClick={() => toggleSkip(s.key)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="pick" className="mt-16">
          {current ? (
            <EpisodeCard
              episode={current}
              matchedMoods={mode === "random" ? [] : moodArr}
              reasonOverride={
                mode === "random" ? "Rolled the dice — here's your evening." : undefined
              }
              onTryAgain={mode === "random" ? surprise : find}
            />
          ) : (
            <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-border bg-card/40 p-10 text-center text-muted-foreground">
              <p className="font-display text-2xl text-foreground/70">
                Your evening starts up there ↑
              </p>
              <p className="mt-2 text-sm">
                Pick a mood or roll the dice. We'll queue up the perfect episode.
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="mx-auto max-w-5xl px-5 pb-10 text-center text-xs text-muted-foreground sm:px-8">
        <p>
          A fan-made love letter. Not affiliated with the show — just very fond of it. ☕🍂
        </p>
      </footer>
    </div>
  );
}
