import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Bookmark, Check } from "lucide-react";
import { episodes } from "@/data/episodes";
import { useUserData } from "@/lib/storage";
import { SiteNav } from "@/components/SiteNav";
import {
  ArrowScribble,
  Book,
  CoffeeCup,
  EpisodeDoodle,
  Leaf,
  Paperclip,
  StarDoodle,
  WavyRule,
} from "@/components/Doodles";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my")({
  head: () => ({
    meta: [
      { title: "my guide — stars hollow tonight" },
      {
        name: "description",
        content:
          "a personal little archive of gilmore girls episodes worth saving, worth watching again, and worth remembering.",
      },
      { property: "og:title", content: "my guide — stars hollow tonight" },
      {
        property: "og:description",
        content:
          "a personal little archive of gilmore girls episodes worth saving, worth watching again, and worth remembering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MyPage,
});

const TABS = [
  { key: "favorites", label: "favorites", icon: Heart, note: "the ones on repeat" },
  { key: "watchlist", label: "watchlist", icon: Bookmark, note: "saved for later" },
  { key: "watched", label: "watched", icon: Check, note: "already seen" },
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

  const activeTab = TABS.find((t) => t.key === tab)!;

  return (
    <div className="min-h-screen bg-background text-ink">
      <SiteNav />

      <main className="mx-auto w-full max-w-4xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        {/* ---------- title block ---------- */}
        <section className="relative">
          <div className="flex flex-col items-start gap-2">
            <span className="font-label text-brick">from the desk of a fan</span>
            <div className="relative">
              <h1 className="font-wordmark text-4xl leading-[0.95] text-ink sm:text-6xl">
                my guide
              </h1>
              <span className="font-hand absolute -right-32 top-2 hidden text-2xl text-brick tilt-r sm:block">
                things worth watching again
              </span>
            </div>
            <span className="font-hand mt-1 text-xl text-brick tilt-r sm:hidden">
              things worth watching again
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3 text-muted-foreground">
            <WavyRule className="h-2 w-32 text-rule" />
            <span className="font-hand text-lg text-coffee">kept in this drawer:</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-label text-muted-foreground">
            <span>{data.favorites.length} favorites</span>
            <span>·</span>
            <span>{data.watchlist.length} on the watchlist</span>
            <span>·</span>
            <span>{data.watched.length} watched</span>
          </div>
        </section>

        {/* ---------- progress card ---------- */}
        <section className="mt-14">
          <div className="relative">
            <span className="tape left-6 -top-2 tilt-l" aria-hidden />
            <span className="tape right-6 -top-2 tilt-r" aria-hidden />
            <div className="paper-card coffee-stain relative px-6 py-7 sm:px-9 sm:py-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-stamp text-brick">the complete collection</p>
                  <p className="mt-2 font-hand text-3xl text-coffee">
                    all 153 episodes.
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-hand text-4xl text-ink">{watchedCount}</p>
                  <p className="font-label text-muted-foreground">watched</p>
                </div>
              </div>

              <ProgressTicks watched={watchedCount} total={total} />

              <p className="mt-4 font-hand text-lg text-ink/80">
                {pct === 0
                  ? "the map is empty — start anywhere."
                  : pct >= 100
                    ? "you've walked every corner of stars hollow."
                    : `you've made it through ${pct}% of stars hollow.`}
              </p>
            </div>
          </div>
        </section>

        {/* ---------- tabs (index-card dividers) ---------- */}
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-center gap-2 sm:gap-3">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "group relative min-w-[9rem] border border-rule bg-paper px-5 pt-3 pb-2 text-left transition-all",
                    "hover:-translate-y-1",
                    active
                      ? "-translate-y-2 border-coffee bg-index shadow-[2px_3px_0_-1px_var(--color-coffee)]"
                      : "shadow-[2px_2px_0_-1px_var(--color-rule)]",
                    // divider tab shape
                    "rounded-t-md rounded-b-none",
                  )}
                  style={{
                    clipPath:
                      "polygon(0 100%, 0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% 100%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className={cn(
                        "h-3.5 w-3.5",
                        active ? "text-brick" : "text-muted-foreground",
                      )}
                      strokeWidth={1.6}
                    />
                    <span
                      className={cn(
                        "font-stamp text-xs",
                        active ? "text-ink" : "text-muted-foreground",
                      )}
                    >
                      {t.label}
                    </span>
                    <span className="ml-1 font-mono text-[10px] text-muted-foreground">
                      ({data[t.key].length})
                    </span>
                  </div>
                  <p className="mt-0.5 font-hand text-sm text-brick">{t.note}</p>
                </button>
              );
            })}
          </div>

          {/* the drawer contents sit on this rule */}
          <div
            className="mt-[-1px] border-t-2 border-coffee"
            aria-hidden
          />

          <div className="mt-10">
            {list.length === 0 ? (
              <EmptyState tab={activeTab} />
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2">
                {list.map((ep, i) => (
                  <li key={ep.id} className={i % 2 === 0 ? "tilt-l" : "tilt-r"}>
                    <ArchiveCard episode={ep} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* footer note */}
        <div className="mt-20 flex flex-col items-center gap-3 text-center">
          <WavyRule className="h-2 w-40 text-rule" />
          <p className="font-hand text-lg text-coffee">
            not affiliated with anyone in stars hollow. just a fan.
          </p>
        </div>
      </main>
    </div>
  );
}

/* ---------------- pieces ---------------- */

function ProgressTicks({ watched, total }: { watched: number; total: number }) {
  // 30 tally marks — each represents ~5 episodes; filled proportionally
  const marks = 30;
  const filled = Math.round((watched / total) * marks);
  return (
    <div className="mt-6">
      <div className="flex items-end gap-[3px]" aria-hidden>
        {Array.from({ length: marks }).map((_, i) => {
          const on = i < filled;
          const isFifth = (i + 1) % 5 === 0;
          return (
            <span
              key={i}
              className={cn(
                "block w-[3px] transition-colors",
                on ? "bg-coffee" : "bg-rule/60",
                isFifth ? "h-6" : "h-4",
              )}
              style={{
                transform: `rotate(${(i % 3) - 1}deg) translateY(${(i % 2) * -1}px)`,
              }}
            />
          );
        })}
      </div>
      <div className="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground">
        <span>0</span>
        <span>{total}</span>
      </div>
    </div>
  );
}

function ArchiveCard({ episode }: { episode: (typeof episodes)[number] }) {
  const year = new Date(episode.airDate + "T12:00:00").getFullYear();
  return (
    <article className="index-card group relative min-h-[9rem] px-14 pb-5 pt-5">
      {/* corner doodle */}
      <span className="absolute right-3 top-3 text-coffee/80">
        <EpisodeDoodle seed={episode.id} className="h-6 w-6" />
      </span>

      <div className="flex items-baseline gap-2 font-stamp text-[10px] text-brick">
        <span>s{episode.season}</span>
        <span className="text-rule">/</span>
        <span>ep {String(episode.episode).padStart(2, "0")}</span>
        <span className="ml-auto pr-8 font-mono text-[10px] text-muted-foreground">
          {year}
        </span>
      </div>

      <h3 className="mt-2 font-display text-lg leading-tight text-ink">
        <span className="hand-underline lowercase">{episode.title.toLowerCase()}</span>
      </h3>

      <p className="mt-3 font-body text-sm leading-snug text-ink/85 line-clamp-3">
        {episode.description}
      </p>

      {episode.tags.length > 0 && (
        <p className="mt-3 font-hand text-base text-brick/90">
          — {episode.tags.slice(0, 2).join(", ")}
        </p>
      )}
    </article>
  );
}

function EmptyState({ tab }: { tab: (typeof TABS)[number] }) {
  const Icon =
    tab.key === "favorites" ? Heart : tab.key === "watchlist" ? Bookmark : Check;
  return (
    <div className="notebook relative mx-auto max-w-xl border border-rule px-8 py-14 text-center">
      <div className="mb-6 flex items-center justify-center gap-3 text-coffee/60">
        <Book className="h-6 w-6" />
        <StarDoodle className="h-4 w-4" />
        <CoffeeCup className="h-6 w-6" />
        <StarDoodle className="h-4 w-4" />
        <Leaf className="h-6 w-6" />
      </div>

      <p className="font-hand text-3xl text-ink">nothing here yet.</p>
      <p className="mx-auto mt-3 max-w-xs font-body text-sm text-muted-foreground">
        this page is like a blank page in a notebook — quiet, until you fill it in.
      </p>

      <div className="mt-6 inline-flex items-center gap-2 font-hand text-lg text-brick">
        <Icon className="h-4 w-4" strokeWidth={1.6} />
        <span>go find an episode worth saving</span>
        <ArrowScribble className="h-3 w-9" />
      </div>

      <div className="mt-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 border border-coffee bg-coffee px-5 py-2 font-stamp text-xs text-primary-foreground transition-colors hover:bg-brick hover:border-brick"
        >
          <Paperclip className="h-3.5 w-3.5" />
          back to tonight's picker
        </Link>
      </div>
    </div>
  );
}
