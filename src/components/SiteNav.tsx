import { Link } from "@tanstack/react-router";
import { CoffeeCup } from "./Doodles";

export function SiteNav() {
  return (
    <header className="mx-auto w-full max-w-5xl px-5 pt-6 sm:px-8 sm:pt-10">
      <div className="relative flex flex-col items-center gap-4 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <Link to="/" className="group flex items-end gap-3 text-left">
          <CoffeeCup className="h-7 w-7 text-coffee tilt-l" />
          <span className="leading-none">
            <span className="block font-wordmark text-lg text-ink sm:text-xl">
              stars hollow tonight
            </span>
            <span className="mt-1.5 block font-hand text-base text-brick tilt-r">
              a very unofficial guide
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-5 font-label text-muted-foreground">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-ink" }}
            className="relative pb-1 transition-colors hover:text-ink [&.active]:hand-underline"
          >
            tonight
          </Link>
          <span aria-hidden className="text-rule">·</span>
          <Link
            to="/my"
            activeProps={{ className: "text-ink" }}
            className="relative pb-1 transition-colors hover:text-ink [&.active]:hand-underline"
          >
            my guide
          </Link>
        </nav>

        <div className="squiggle-rule pointer-events-none absolute inset-x-0 -bottom-1 w-full opacity-70" />
      </div>
    </header>
  );
}
