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
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.1) 0%, rgba(14,165,233,0.03) 45%, transparent 68%)",
        }}
      />
      <div
        className={cn(
          "absolute right-[-15%] top-[15%] h-[50vh] w-[50vh] rounded-full blur-[110px]",
          opacity,
        )}
        style={{
          background:
            "radial-gradient(circle, rgba(29,78,216,0.08) 0%, rgba(99,102,241,0.04) 50%, transparent 70%)",
        }}
      />
      <div
        className={cn(
          "absolute bottom-[-10%] left-[25%] h-[45vh] w-[45vh] rounded-full blur-[130px]",
          "opacity-35",
        )}
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 72%)",
        }}
      />
      <div className="absolute inset-0 bg-white" aria-hidden />
    </div>
  );
}
