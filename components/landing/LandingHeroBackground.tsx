/** Hero-only washes: extra glow behind headline + legibility vignette. */
export function LandingHeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <div
        className="absolute left-1/2 top-[18%] h-[min(95vw,52rem)] w-[min(95vw,52rem)] -translate-x-1/2 rounded-full opacity-50 blur-[96px] animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,177,98,0.18) 0%, rgba(44,59,77,0.1) 40%, transparent 68%)",
          animationDuration: "10s",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 50% 42%, rgba(18,25,35,0.42) 0%, rgba(18,25,35,0.2) 40%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[50%]"
        style={{
          background: "linear-gradient(to bottom, rgba(18,25,35,0.28) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
