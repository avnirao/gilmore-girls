import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brick text-primary-foreground">
            <span className="font-wordmark text-[11px] leading-none">SH</span>
          </span>
          <span className="font-wordmark text-[13px] leading-none text-ink sm:text-sm">
            Stars Hollow <span className="text-brick">Tonight</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <NavLink to="/">Tonight</NavLink>
          <NavLink to="/my">My Guide</NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      className={cn(
        "focus-ring rounded-full px-3 py-1.5 font-medium text-ink/65 transition-colors hover:text-ink",
      )}
      activeProps={{ className: "bg-surface-2 text-ink" }}
    >
      {children}
    </Link>
  );
}
