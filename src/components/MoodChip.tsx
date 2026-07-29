import { cn } from "@/lib/utils";
import {
  CoffeeCup,
  HeartRain,
  Mask,
  Lightning,
  Leaf,
  Heart,
  Gazebo,
  SpeechBubble,
  Dice,
} from "./Doodles";
import type { Mood } from "@/data/episodes";

type Key = Mood | "surprise";

const ICONS: Record<Key, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  cozy: CoffeeCup,
  emotional: HeartRain,
  drama: Mask,
  chaos: Lightning,
  autumn: Leaf,
  romance: Heart,
  starsHollow: Gazebo,
  funny: SpeechBubble,
  surprise: Dice,
};

interface Props {
  moodKey: Key;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  variant?: "card" | "chip";
}

export function MoodChip({ moodKey, label, selected, onClick, variant = "card" }: Props) {
  const Icon = ICONS[moodKey];

  if (variant === "chip") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "focus-ring inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors",
          selected
            ? "border-brick bg-brick text-primary-foreground"
            : "border-hairline bg-surface text-ink/80 hover:border-ink/40",
        )}
      >
        <Icon className="h-3.5 w-3.5" />
        <span className="lowercase">{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "focus-ring group relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-xl border p-3 text-left transition-all duration-200",
        "sm:p-4",
        selected
          ? "border-brick bg-brick/20 shadow-[0_0_0_2px_var(--color-brick)_inset]"
          : "border-hairline bg-surface hover:-translate-y-0.5 hover:border-ink/30 hover:bg-surface-2",
      )}
    >
      <Icon
        className={cn(
          "h-7 w-7 transition-colors sm:h-8 sm:w-8",
          selected ? "text-ink" : "text-ink/70 group-hover:text-ink",
        )}
      />
      <span
        className={cn(
          "text-sm font-semibold tracking-tight sm:text-[15px]",
          selected ? "text-ink" : "text-ink/90",
        )}
      >
        {label}
      </span>
    </button>
  );
}
