import { Link } from "@tanstack/react-router";
import { Landmark } from "lucide-react";

export function SiteNav() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8">
      <Link to="/" className="group relative inline-flex flex-col leading-none">
        <span
          aria-hidden
          className="absolute -left-4 -top-3 -rotate-12 rounded-full border border-border/70 bg-card p-1.5 text-primary shadow-cozy"
        >
          <Landmark className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
        <span className="font-display text-2xl tracking-[0.01em] text-foreground">
          stars hollow tonight
        </span>
        <span className="mt-1 text-[10px] tracking-[0.22em] text-muted-foreground">
          a cozy episode picker
        </span>
      </Link>

      <nav className="flex items-center gap-1 text-sm">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{ className: "bg-secondary text-foreground" }}
          className="rounded-full px-3.5 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          tonight
        </Link>
        <Link
          to="/my"
          activeProps={{ className: "bg-secondary text-foreground" }}
          className="rounded-full px-3.5 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          my gilmore girls
        </Link>
      </nav>
    </header>
  );
}
