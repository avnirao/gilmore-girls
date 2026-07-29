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
        "group relative inline-flex items-center justify-center border transition-all duration-150",
        "border-rule bg-paper text-ink hover:-translate-y-0.5 hover:border-coffee",
        size === "md" ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs",
        "font-body lowercase",
        "shadow-[2px_2px_0_-1px_var(--color-rule)]",
        selected &&
          "border-coffee bg-coffee text-primary-foreground shadow-[2px_2px_0_-1px_var(--color-brick)]",
      )}
    >
      {label}
    </button>
  );
}
