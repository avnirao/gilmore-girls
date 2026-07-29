import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { MOODS, SKIP_OPTIONS, type Mood, type SkipTag, type Episode } from "@/data/episodes";
import { pickEpisode, randomEpisode } from "@/lib/recommend";
import { MoodChip } from "@/components/MoodChip";
import { EpisodeCard } from "@/components/EpisodeCard";
import { SiteNav } from "@/components/SiteNav";
import { ArrowScribble, CoffeeCup, StarDoodle, WavyRule } from "@/components/Doodles";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "stars hollow tonight — which gilmore girls episode fits your mood?" },
      {
        name: "description",
        content:
          "a small, fan-made guide for picking the right gilmore girls episode for tonight. pick a mood — cozy, autumn, chaos — and we'll find you one.",
      },
      { property: "og:title", content: "stars hollow tonight" },
      {
        property: "og:description",
        content:
          "a small, fan-made guide for picking the right gilmore girls episode for tonight.",
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
    if (m === "surprise") return surprise();
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
    <div className="min-h-screen bg-background text-ink">
      <SiteNav />

      <main className="mx-auto w-full max-w-4xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        {/* ------- hero ------- */}
        <section className="relative">
          <div className="flex flex-col items-start gap-1">
            <span className="font-label text-brick">from stars hollow, with love</span>
            <h1 className="font-wordmark text-4xl leading-[0.95] text-ink sm:text-6xl">
              which episode
              <br />
              <span className="hand-underline">tonight?</span>
            </h1>
            <p className="mt-4 max-w-lg font-body text-lg text-ink/85">
              pick a mood — or two, or three. we'll flip through the whole run of the
              show and hand you one.
            </p>
            <span className="font-hand mt-3 flex items-center gap-2 text-xl text-coffee tilt-r">
              <CoffeeCup className="h-5 w-5" />
              coffee optional. mostly required.
            </span>
          </div>
        </section>

        {/* ------- mood picker ------- */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <StarDoodle className="h-4 w-4 text-brick" />
            <p className="font-stamp text-xs text-brick">the mood</p>
            <WavyRule className="h-2 flex-1 text-rule" />
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-2.5">
            {MOODS.map((m) => (
              <MoodChip
                key={m.key}
                label={m.label.toLowerCase()}
                selected={m.key !== "surprise" && selected.has(m.key as Mood)}
                onClick={() => toggleMood(m.key)}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <button
              onClick={find}
              disabled={selected.size === 0}
              className={cn(
                "group inline-flex items-center gap-3 border border-coffee bg-coffee px-7 py-3 font-stamp text-xs text-primary-foreground transition-all",
                "shadow-[3px_3px_0_-1px_var(--color-brick)] hover:-translate-y-0.5 hover:bg-brick hover:border-brick",
                "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0",
              )}
            >
              find me an episode
              <ArrowScribble className="h-3 w-9" />
            </button>

            <button
              onClick={surprise}
              className="font-hand text-xl text-brick underline-offset-4 hover:underline"
            >
              or just surprise me →
            </button>
          </div>

          <div className="mt-10 border-t border-dashed border-rule pt-4">
            <button
              onClick={() => setShowSkip((v) => !v)}
              className="inline-flex items-center gap-2 font-hand text-lg text-coffee hover:text-brick"
            >
              anything you're <em className="not-italic hand-underline">not</em> up for?
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", showSkip && "rotate-180")}
                strokeWidth={1.6}
              />
            </button>
            {showSkip && (
              <div className="mt-4 flex animate-fade-in flex-wrap gap-2">
                {SKIP_OPTIONS.map((s) => (
                  <MoodChip
                    key={s.key}
                    label={s.label.toLowerCase()}
                    size="sm"
                    selected={skips.has(s.key)}
                    onClick={() => toggleSkip(s.key)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ------- result ------- */}
        <section id="pick" className="mt-16">
          {current ? (
            <EpisodeCard
              episode={current}
              matchedMoods={mode === "random" ? [] : moodArr}
              reasonOverride={mode === "random" ? "rolled the dice on this one." : undefined}
              onTryAgain={mode === "random" ? surprise : find}
            />
          ) : (
            <div className="notebook mx-auto max-w-xl border border-rule px-8 py-12 text-center">
              <p className="font-hand text-2xl text-coffee">
                pick a vibe up top ↑
              </p>
              <p className="mt-2 font-body text-sm text-muted-foreground">
                (or hit "surprise me" if you can't decide — we've all been there.)
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="mx-auto max-w-4xl px-5 pb-10 sm:px-8">
        <WavyRule className="h-2 w-full text-rule" />
        <p className="mt-4 text-center font-hand text-lg text-coffee">
          made by a fan, for fans. not affiliated with the show — just really into it.
        </p>
      </footer>
    </div>
  );
}
