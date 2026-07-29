import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8">
      <Link to="/" className="group inline-flex flex-col leading-none">
        <span className="font-display text-2xl tracking-[0.03em] text-foreground">
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
