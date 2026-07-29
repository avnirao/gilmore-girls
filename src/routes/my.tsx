import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Bookmark, Check } from "lucide-react";
import { episodes } from "@/data/episodes";
import { useUserData } from "@/lib/storage";
import { SiteNav } from "@/components/SiteNav";
import { EpisodeTile } from "@/components/EpisodeTile";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my")({
  head: () => ({
    meta: [
      { title: "My Guide — Stars Hollow Tonight" },
      {
        name: "description",
        content: "Your saved Gilmore Girls episodes: favorites, watchlist, and watched.",
      },
      { property: "og:title", content: "My Guide — Stars Hollow Tonight" },
      { property: "og:description", content: "Your saved Gilmore Girls episodes." },
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
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-background text-ink">
      <SiteNav />

      <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        {/* header */}
        <section className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-label text-warm-red">My Guide</p>
            <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
              Your Gilmore Girls
            </h1>
            <p className="mt-2 text-ink/60">
              Everything you've saved, in one place.
            </p>
          </div>

          <div className="flex gap-3">
            <Stat label="Favorites" value={data.favorites.length} />
            <Stat label="Watchlist" value={data.watchlist.length} />
            <Stat label="Watched" value={data.watched.length} />
          </div>
        </section>

        {/* progress */}
        <section className="mt-8 rounded-2xl border border-hairline bg-surface p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="font-label text-ink/60">The complete run</p>
              <p className="mt-1 text-lg font-semibold tracking-tight text-ink">
                {watchedCount} of {total} episodes
              </p>
            </div>
            <span className="font-mono text-2xl font-semibold tabular-nums text-brick">
              {pct}%
            </span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-brick transition-[width] duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </section>

        {/* tabs */}
        <section className="mt-10">
          <div className="flex items-center gap-1 border-b border-hairline">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "focus-ring -mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                    active
                      ? "border-brick text-ink"
                      : "border-transparent text-ink/55 hover:text-ink",
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                  {t.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 font-mono text-[10px]",
                      active ? "bg-brick/25 text-ink" : "bg-surface-2 text-ink/60",
                    )}
                  >
                    {data[t.key].length}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            {list.length === 0 ? (
              <EmptyState tab={tab} />
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {list.map((ep) => (
                  <EpisodeTile
                    key={ep.id}
                    episode={ep}
                    onClick={() => navigate({ to: "/", hash: "pick" })}
                  />
                ))}
              </div>
            )}
          </div>
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

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-hairline bg-surface px-4 py-3 text-center">
      <p className="font-mono text-2xl font-semibold tabular-nums text-ink">{value}</p>
      <p className="font-label text-ink/55">{label}</p>
    </div>
  );
}

function EmptyState({ tab }: { tab: TabKey }) {
  const copy = {
    favorites: "No favorites yet.",
    watchlist: "Nothing saved for later.",
    watched: "Nothing marked as watched.",
  }[tab];
  return (
    <div className="rounded-2xl border border-dashed border-hairline bg-surface/40 py-16 text-center">
      <p className="text-lg font-semibold text-ink">{copy}</p>
      <p className="mt-2 text-sm text-ink/60">Pick a vibe on the Tonight page to get started.</p>
      <Link
        to="/"
        className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-brick px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-warm-red"
      >
        Browse episodes
      </Link>
    </div>
  );
}
