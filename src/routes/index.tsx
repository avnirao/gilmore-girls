import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { MOODS, SKIP_OPTIONS, type Mood, type SkipTag, type Episode } from "@/data/episodes";
import { pickEpisode, randomEpisode } from "@/lib/recommend";
import { MoodChip } from "@/components/MoodChip";
import { EpisodeCard } from "@/components/EpisodeCard";
import { SiteNav } from "@/components/SiteNav";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stars Hollow Tonight — A Gilmore Girls Episode Guide" },
      {
        name: "description",
        content:
          "An unofficial fan-made episode picker for Gilmore Girls. Choose a mood and find the right episode from all 153.",
      },
      { property: "og:title", content: "Stars Hollow Tonight" },
      {
        property: "og:description",
        content:
          "A fan-made mood-based episode guide covering all 153 episodes of Gilmore Girls.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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

  const scrollToPick = () => {
    setTimeout(() => {
      document.getElementById("pick")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const find = () => {
    const ep = pickEpisode({ moods: moodArr, skips: skipArr, excludeIds: seen });
    if (!ep) {
      const retry = pickEpisode({ moods: moodArr, skips: skipArr });
      if (retry) {
        setCurrent(retry);
        setSeen([retry.id]);
        setMode("mood");
        scrollToPick();
      }
      return;
    }
    setCurrent(ep);
    setSeen((s) => [...s, ep.id]);
    setMode("mood");
    scrollToPick();
  };

  const surprise = () => {
    const ep = randomEpisode(current?.id);
    setCurrent(ep);
    setSeen((s) => [...s, ep.id]);
    setMode("random");
    scrollToPick();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto w-full max-w-4xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
        <section className="text-center">
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Vol. I — All 153 Episodes
          </p>
          <h1 className="mt-5 font-wordmark text-3xl leading-tight text-foreground sm:text-5xl">
            Which Episode
            <br />
            Tonight?
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-border" />
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Pick a mood, or a few. We'll suggest an episode from the full run
            of the series.
          </p>
        </section>

        <section className="mt-14">
          <p className="mb-4 text-center text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            The Mood
          </p>
          <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
            {MOODS.map((m) => (
              <MoodChip
                key={m.key}
                label={m.label}
                selected={m.key !== "surprise" && selected.has(m.key as Mood)}
                onClick={() => toggleMood(m.key)}
              />
            ))}
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3">
            <button
              onClick={find}
              disabled={selected.size === 0}
              className={cn(
                "inline-flex items-center gap-3 border border-foreground bg-foreground px-8 py-3 font-display text-xs text-background transition-colors",
                "hover:bg-transparent hover:text-foreground",
                "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-foreground disabled:hover:text-background",
              )}
            >
              Find an episode
            </button>

            <button
              onClick={surprise}
              className="text-xs uppercase tracking-[0.24em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Or pick one at random
            </button>
          </div>

          <div className="mx-auto mt-12 max-w-2xl border-t border-border pt-6">
            <button
              onClick={() => setShowSkip((v) => !v)}
              className="mx-auto flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Exclude
              <ChevronDown
                className={cn("h-3 w-3 transition-transform", showSkip && "rotate-180")}
              />
            </button>
            {showSkip && (
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {SKIP_OPTIONS.map((s) => (
                  <MoodChip
                    key={s.key}
                    label={s.label}
                    size="sm"
                    selected={skips.has(s.key)}
                    onClick={() => toggleSkip(s.key)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="pick" className="mt-20">
          {current ? (
            <EpisodeCard
              episode={current}
              matchedMoods={mode === "random" ? [] : moodArr}
              reasonOverride={mode === "random" ? "Chosen at random." : undefined}
              onTryAgain={mode === "random" ? surprise : find}
            />
          ) : (
            <div className="mx-auto max-w-xl border-t border-b border-border py-12 text-center">
              <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                No episode selected
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Choose a mood above to see a recommendation.
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="mx-auto max-w-4xl border-t border-border px-5 py-10 text-center sm:px-8">
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          An Unofficial Fan Site
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Not affiliated with Warner Bros., The WB, The CW, or the producers
          of Gilmore Girls.
        </p>
      </footer>
    </div>
  );
}
