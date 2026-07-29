import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDownWideNarrow, ArrowUpWideNarrow, Medal, Star } from "lucide-react";
import { episodes, MOODS, type Mood } from "@/data/episodes";
import { SiteNav } from "@/components/SiteNav";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rankings")({
  head: () => ({
    meta: [
      { title: "all episodes ranked — stars hollow tonight" },
      {
        name: "description",
        content:
          "every gilmore girls episode ranked from highest to lowest rating, with vibes and season breakdowns.",
      },
      { property: "og:title", content: "all episodes ranked — stars hollow tonight" },
      {
        property: "og:description",
        content: "every gilmore girls episode, ranked by overall rating.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RankingsPage,
});

const MOOD_LABEL = Object.fromEntries(MOODS.map((m) => [m.key, m.label]));

function averageScore(scores: Record<Mood, number>): number {
  const values = Object.values(scores);
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function RankingsPage() {
  const [sort, setSort] = useState<"high" | "low">("high");
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);

  const seasons = useMemo(() => Array.from(new Set(episodes.map((e) => e.season))).sort((a, b) => a - b), []);

  const rows = useMemo(() => {
    const filtered = selectedSeason ? episodes.filter((e) => e.season === selectedSeason) : episodes;
    const withAvg = filtered.map((ep) => ({ episode: ep, avg: averageScore(ep.scores) }));
    withAvg.sort((a, b) => (sort === "high" ? b.avg - a.avg : a.avg - b.avg));
    return withAvg;
  }, [sort, selectedSeason]);

  const topAvg = rows.length ? rows[0].avg : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto w-full max-w-5xl px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
        <section className="text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs tracking-[0.22em] text-muted-foreground">
            <Star className="h-3 w-3" /> the full ranking
          </p>
          <h1 className="font-display text-5xl leading-[1.05] tracking-[0.01em] text-foreground sm:text-6xl">
            every episode, ranked
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground sm:text-lg">
            from the coziest, most stars-hollow-perfect nights to the ones that hit a little different.
          </p>
        </section>

        <section className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedSeason(null)}
              className={cn(
                "rounded-full border-2 px-3.5 py-1.5 text-sm font-medium transition-all",
                selectedSeason === null
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              all seasons
            </button>
            {seasons.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSeason(s)}
                className={cn(
                  "rounded-full border-2 px-3.5 py-1.5 text-sm font-medium transition-all",
                  selectedSeason === s
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                season {s}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSort((v) => (v === "high" ? "low" : "high"))}
            className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground"
          >
            {sort === "high" ? <ArrowDownWideNarrow className="h-4 w-4" /> : <ArrowUpWideNarrow className="h-4 w-4" />}
            {sort === "high" ? "highest first" : "lowest first"}
          </button>
        </section>

        <section className="mt-8">
          <div className="grid gap-3">
            {rows.map(({ episode, avg }, idx) => {
              const rank = idx + 1;
              const isTop = sort === "high" && rank <= 3 && selectedSeason === null;
              const pct = Math.max(4, (avg / topAvg) * 100);
              return (
                <article
                  key={episode.id}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-cozy transition-all hover:-translate-y-0.5 sm:gap-6 sm:p-5",
                    isTop && "border-primary/40 bg-primary/5",
                  )}
                >
                  <div className="flex w-10 flex-col items-center justify-center sm:w-12">
                    {isTop ? (
                      <Medal className="h-6 w-6 text-primary" />
                    ) : (
                      <span className="font-display text-xl text-muted-foreground sm:text-2xl">#{rank}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold tracking-widest text-secondary-foreground">
                        s{episode.season} · e{episode.episode}
                      </span>
                      {isTop && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                          top pick
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 truncate font-display text-xl tracking-[0.01em] text-foreground sm:text-2xl">
                      {episode.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{episode.description}</p>
                    {episode.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {episode.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-[11px] text-foreground/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="hidden w-36 sm:block">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>overall</span>
                      <span className="tabular-nums font-medium text-foreground">{avg.toFixed(1)}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary/80 transition-[width] duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex w-12 flex-col items-end justify-center sm:hidden">
                    <span className="font-display text-lg text-foreground">{avg.toFixed(1)}</span>
                    <span className="text-[10px] text-muted-foreground">overall</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-5xl px-5 pb-10 text-center text-xs text-muted-foreground sm:px-8">
        <p>ratings are averaged across all eight vibes. not affiliated with the show.</p>
      </footer>
    </div>
  );
}
