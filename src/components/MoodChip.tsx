import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
  sticker?: LucideIcon;
  stickerRotate?: string;
}

export function MoodChip({
  label,
  selected,
  onClick,
  size = "md",
  sticker: Sticker,
  stickerRotate = "-12deg",
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-2 rounded-2xl border-2 border-border bg-card text-card-foreground transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-cozy active:translate-y-0",
        size === "md" ? "px-5 py-3 text-base" : "px-3.5 py-2 text-sm",
        selected &&
          "border-primary bg-primary/10 shadow-cozy ring-2 ring-primary/30 -translate-y-0.5",
      )}
    >
      {Sticker && (
        <span
          aria-hidden
          style={{ transform: `rotate(${stickerRotate})` }}
          className={cn(
            "pointer-events-none absolute -top-3 -right-2 grid h-7 w-7 place-items-center rounded-full border border-border/70 bg-card text-primary shadow-cozy transition-transform",
            "group-hover:-translate-y-0.5",
          )}
        >
          <Sticker className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
      )}
      <span className="font-medium tracking-tight">{label}</span>
    </button>
  );
}
