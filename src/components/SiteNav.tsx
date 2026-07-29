import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <header className="mx-auto w-full max-w-5xl px-5 pt-8 sm:px-8 sm:pt-10">
      <div className="flex flex-col items-center gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <Link to="/" className="group text-center sm:text-left">
          <span className="block font-wordmark text-xl leading-none text-foreground sm:text-2xl">
            Stars Hollow Tonight
          </span>
          <span className="mt-2 block text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            An Unofficial Episode Guide
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-xs uppercase tracking-[0.24em]">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-foreground border-foreground" }}
            className="border-b border-transparent pb-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            Tonight
          </Link>
          <Link
            to="/my"
            activeProps={{ className: "text-foreground border-foreground" }}
            className="border-b border-transparent pb-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            My Guide
          </Link>
        </nav>
      </div>
    </header>
  );
}
