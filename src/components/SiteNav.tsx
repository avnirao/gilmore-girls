import { Link } from "@tanstack/react-router";
import { Coffee } from "lucide-react";

export function SiteNav() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8">
      <Link to="/" className="group inline-flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-cozy transition-transform group-hover:-rotate-6">
          <Coffee className="h-4 w-4" />
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-display text-3xl text-foreground">
            stars hollow tonight
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            pick an episode
          </span>
        </span>
      </Link>

      <nav className="flex items-center gap-1 text-sm">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{ className: "bg-secondary text-foreground" }}
          className="rounded-full px-3.5 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Tonight
        </Link>
        <Link
          to="/my"
          activeProps={{ className: "bg-secondary text-foreground" }}
          className="rounded-full px-3.5 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          My Gilmore Girls
        </Link>
      </nav>
    </header>
  );
}
