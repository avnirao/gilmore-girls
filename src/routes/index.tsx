import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Shuffle } from "lucide-react";
import { MOODS, SKIP_OPTIONS, episodes, type Mood, type SkipTag, type Episode } from "@/data/episodes";
import { pickEpisode, randomEpisode } from "@/lib/recommend";
import { MoodChip } from "@/components/MoodChip";
import { EpisodeCard } from "@/components/EpisodeCard";
import { EpisodeTile } from "@/components/EpisodeTile";
import { SiteNav } from "@/components/SiteNav";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stars Hollow Tonight — Which Gilmore Girls episode fits your mood?" },
      {
        name: "description",
        content:
          "A fan-made episode picker for Gilmore Girls. Choose a vibe and get the right episode for tonight.",
      },
      { property: "og:title", content: "Stars Hollow Tonight" },
      {
        property: "og:description",
        content: "Choose a vibe and we'll find your Gilmore Girls episode.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TonightPage,
});

const ROWS: { title: string; filter: (e: Episode) => number }[] = [
  { title: "For a cozy night", filter: (e) => e.scores.cozy },
  { title: "Peak Stars Hollow", filter: (e) => e.scores.starsHollow },
  { title: "When you need chaos", filter: (e) => e.scores.chaos },
  { title: "The romantic ones", filter: (e) => e.scores.romance },
  { title: "Autumn in Connecticut", filter: (e) => e.scores.autumn },
  { title: "Funny episodes", filter: (e) => e.scores.funny },
];

function TonightPage() {
  const [selected, setSelected] = useState<Set<Mood>>(new Set());
  const [skips, setSkips] = useState<Set<SkipTag>>(new Set());
  const [showSkip, setShowSkip] = useState(false);
  const [current, setCurrent] = useState<Episode | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [mode, setMode] = useState<"mood" | "random" | null>(null);

  const moodArr = useMemo(() => Array.from(selected), [selected]);
  const skipArr = useMemo(() => Array.from(skips), [skips]);

  const rows = useMemo(
    () =>
      ROWS.map((r) => ({
        title: r.title,
        items: [...episodes]
          .sort((a, b) => r.filter(b) - r.filter(a))
          .slice(0, 14),
      })),
    [],
  );

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
    }, 60);
  };

  const find = () => {
    const ep = pickEpisode({ moods: moodArr, skips: skipArr, excludeIds: seen })
      ?? pickEpisode({ moods: moodArr, skips: skipArr });
    if (!ep) return;
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

  const pickSpecific = (ep: Episode) => {
    setCurrent(ep);
    setSeen((s) => [...s, ep.id]);
    setMode("random");
    scrollToPick();
  };

  return (
    <div className="min-h-screen bg-background text-ink">
      <SiteNav />

      {/* hero */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="aurora absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="font-label text-warm-red">Tonight</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.02] text-ink sm:text-5xl md:text-6xl">
            What are you in the mood for?
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink/70">
            Choose a vibe and we'll find your episode.
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-10 sm:px-8">
        {/* mood grid */}
        <section>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-9">
            {MOODS.map((m) => (
              <MoodChip
                key={m.key}
                moodKey={m.key}
                label={m.label}
                selected={m.key !== "surprise" && selected.has(m.key as Mood)}
                onClick={() => toggleMood(m.key)}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={find}
              disabled={selected.size === 0}
              className={cn(
                "focus-ring inline-flex items-center gap-2 rounded-full bg-brick px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors",
                "hover:bg-warm-red disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brick",
              )}
            >
              Find my episode
            </button>
            <button
              onClick={surprise}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
            >
              <Shuffle className="h-3.5 w-3.5" strokeWidth={2} />
              Random episode
            </button>

            <button
              onClick={() => setShowSkip((v) => !v)}
              className="focus-ring ml-auto inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink"
            >
              Filters
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", showSkip && "rotate-180")}
                strokeWidth={2}
              />
            </button>
          </div>

          {showSkip && (
            <div className="animate-fade-in mt-4 rounded-xl border border-hairline bg-surface p-4">
              <p className="mb-2.5 font-label text-ink/60">Skip</p>
              <div className="flex flex-wrap gap-2">
                {SKIP_OPTIONS.map((s) => (
                  <MoodChip
                    key={s.key}
                    // reuse chip look; icon prop is fake for skips — hide it
                    moodKey={"surprise"}
                    label={s.label}
                    variant="chip"
                    selected={skips.has(s.key)}
                    onClick={() => toggleSkip(s.key)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* result */}
        <section id="pick" className="mt-14 scroll-mt-20">
          {current && (
            <>
              <div className="mb-4 flex items-baseline justify-between">
                <h2 className="font-display text-xl text-ink sm:text-2xl">
                  {mode === "random" ? "Random pick" : "Your match"}
                </h2>
                <span className="font-label text-ink/50">
                  {mode === "random" ? "shuffled" : `${selected.size} vibe${selected.size === 1 ? "" : "s"}`}
                </span>
              </div>
              <EpisodeCard
                episode={current}
                matchedMoods={mode === "random" ? [] : moodArr}
                reasonOverride={mode === "random" ? "Rolled the dice." : undefined}
                onTryAgain={mode === "random" ? surprise : find}
              />
            </>
          )}
        </section>

        {/* streaming rows */}
        <section className="mt-16 space-y-10">
          {rows.map((row) => (
            <Row key={row.title} title={row.title} items={row.items} onPick={pickSpecific} />
          ))}
        </section>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-6 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink/40">
            Fan-made · Not affiliated with the show
          </p>
          <p className="font-wordmark text-[11px] text-ink/50">Stars Hollow Tonight</p>
        </div>
      </footer>
    </div>
  );
}

function Row({
  title,
  items,
  onPick,
}: {
  title: string;
  items: Episode[];
  onPick: (ep: Episode) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between px-1">
        <h3 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">{title}</h3>
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink/40">
          {items.length}
        </span>
      </div>
      <div className="row-scroll -mx-5 flex gap-3 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8">
        {items.map((ep) => (
          <EpisodeTile key={ep.id} episode={ep} onClick={() => onPick(ep)} />
        ))}
      </div>
    </div>
  );
}
