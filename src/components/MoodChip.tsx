import { cn } from "@/lib/utils";

interface Props {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
}

export function MoodChip({ label, selected, onClick, size = "md" }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center rounded-sm border border-border bg-card text-card-foreground transition-colors duration-150",
        "hover:border-foreground/60",
        size === "md" ? "px-5 py-2.5 text-sm" : "px-3 py-1.5 text-xs",
        "font-display",
        selected && "border-foreground bg-foreground text-background",
      )}
    >
      {label}
    </button>
  );
}
