import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Bookmark, Check } from "lucide-react";
import { episodes } from "@/data/episodes";
import { useUserData } from "@/lib/storage";
import { SiteNav } from "@/components/SiteNav";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my")({
  head: () => ({
    meta: [
      { title: "My Guide — Stars Hollow Tonight" },
      {
        name: "description",
        content:
          "Your saved Gilmore Girls favorites, watchlist, and viewing progress across all 153 episodes.",
      },
      { property: "og:title", content: "My Guide — Stars Hollow Tonight" },
      {
        property: "og:description",
        content: "Favorites, watchlist, and progress across all 153 episodes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MyPage,
});

const TABS = [
  { key: "favorites", label: "Favorites", icon: Heart },
  { key: "watchlist", label: "Watchlist", icon: Bookmark },
  { key: "watched", label: "Watched", icon: Check },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function MyPage() {
  const { data } = useUserData();
  const [tab, setTab] = useState<TabKey>("favorites");

  const list = useMemo(() => {
    const ids = data[tab];
    return ids
      .map((id) => episodes.find((e) => e.id === id))
      .filter((e): e is (typeof episodes)[number] => Boolean(e))
      .reverse();
  }, [data, tab]);

  const total = 153;
  const watchedCount = data.watched.length;
  const pct = Math.min(100, Math.round((watchedCount / total) * 100));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto w-full max-w-4xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
        <section className="text-center">
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Personal Archive
          </p>
          <h1 className="mt-5 font-wordmark text-3xl leading-tight sm:text-5xl">My Guide</h1>
          <div className="mx-auto mt-6 h-px w-16 bg-border" />
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground sm:text-base">
            Everything you've saved, loved, or watched.
          </p>
        </section>

        <section className="mt-14 border-t border-b border-border py-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Progress
            </p>
            <p className="tabular-nums text-xs uppercase tracking-[0.24em] text-muted-foreground">
              <span className="text-lg font-medium text-foreground">{watchedCount}</span>
              <span className="mx-1.5 text-foreground/40">/</span>
              <span>{total}</span>
            </p>
          </div>
          <div className="mt-5 h-[3px] w-full bg-border">
            <div
              className="h-full bg-foreground transition-[width] duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            {pct}% Complete
          </p>
        </section>

        <section className="mt-12">
          <div className="flex flex-wrap justify-center gap-6 border-b border-border pb-4">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "inline-flex items-center gap-2 border-b-2 border-transparent pb-2 text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors",
                    "hover:text-foreground",
                    active && "border-foreground text-foreground",
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {t.label}
                  <span className="tabular-nums text-[10px] text-muted-foreground">
                    ({data[t.key].length})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            {list.length === 0 ? (
              <div className="mx-auto max-w-md py-12 text-center">
                <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                  Empty
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Head back to{" "}
                  <Link to="/" className="text-foreground underline underline-offset-4">
                    the picker
                  </Link>{" "}
                  to save an episode.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border border-b border-border">
                {list.map((ep) => (
                  <li key={ep.id} className="py-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                        Season {ep.season} · Ep {ep.episode}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                        {new Date(ep.airDate + "T12:00:00").getFullYear()}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-xl leading-tight text-foreground">
                      {ep.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {ep.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
