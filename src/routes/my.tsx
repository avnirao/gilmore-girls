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
      { title: "My Gilmore Girls — your Stars Hollow scrapbook" },
      {
        name: "description",
        content:
          "Your favorite Gilmore Girls episodes, watchlist, and watch progress across all seven seasons.",
      },
      { property: "og:title", content: "My Gilmore Girls" },
      {
        property: "og:description",
        content: "Your Stars Hollow scrapbook: favorites, watchlist, and progress.",
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
  { key: "watched", label: "Recently watched", icon: Check },
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

      <main className="mx-auto w-full max-w-5xl px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
        <section>
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            your scrapbook
          </p>
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">My Gilmore Girls</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Everything you've loved, saved, and watched — kept in one very small, very cozy corner.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-cozy paper-texture sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl tracking-tight">Episodes watched</h2>
            <p className="tabular-nums text-sm text-muted-foreground">
              <span className="text-2xl font-semibold text-foreground">{watchedCount}</span>{" "}
              <span className="text-foreground/60">/ {total}</span>
            </p>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{pct}% of Stars Hollow explored</p>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border-2 border-border bg-card px-4 py-2 text-sm font-medium transition-all",
                    "hover:-translate-y-0.5",
                    active && "border-primary bg-primary/10 text-primary",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                  <span className="tabular-nums text-xs text-muted-foreground">
                    {data[t.key].length}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            {list.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card/40 p-10 text-center">
                <p className="font-display text-2xl text-foreground/70">Nothing here yet</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Head back to{" "}
                  <Link to="/" className="text-primary underline underline-offset-4">
                    tonight's picker
                  </Link>{" "}
                  and start collecting your favorites.
                </p>
              </div>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {list.map((ep) => (
                  <li
                    key={ep.id}
                    className="rounded-2xl border border-border bg-card p-5 shadow-cozy paper-texture transition-transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-secondary-foreground">
                        S{ep.season}·E{ep.episode}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-xl tracking-tight">{ep.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {ep.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ep.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-[11px] text-foreground/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
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
