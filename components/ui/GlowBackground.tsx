import { cn } from "@/lib/cn";

type GlowBackgroundProps = {
  className?: string;
  intensity?: "default" | "subtle";
};

/** Very soft accents on a white page — does not darken the main canvas. */
export function GlowBackground({ className, intensity = "default" }: GlowBackgroundProps) {
  const opacity = intensity === "subtle" ? "opacity-40" : "opacity-[0.55]";
  return (
    <div
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className={cn(
          "absolute -left-[20%] top-[-10%] h-[55vh] w-[55vh] rounded-full blur-[120px]",
          opacity,
        )}
        style={{ background: "var(--ambient-spot-info)" }}
      />
      <div
        className={cn(
          "absolute right-[-15%] top-[15%] h-[50vh] w-[50vh] rounded-full blur-[110px]",
          opacity,
        )}
        style={{ background: "var(--ambient-spot-accent)" }}
      />
      <div
        className={cn(
          "absolute bottom-[-10%] left-[25%] h-[45vh] w-[45vh] rounded-full blur-[130px]",
          "opacity-35",
        )}
        style={{ background: "var(--ambient-spot-accent-soft)" }}
      />
      <div className="absolute inset-0 bg-light" aria-hidden />
    </div>
  );
}
