/**
 * Dark canvas: deep navy base + teal / violet / rose glows (logo palette).
 */
export function AuraBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0" style={{ background: "var(--aura-base)" }} />
      <div
        className="absolute -left-[35%] top-[-25%] h-[85vmin] w-[85vmin] rounded-full blur-[130px] animate-pulse-glow"
        style={{ background: "var(--aura-glow-a)" }}
      />
      <div
        className="absolute -right-[30%] top-[5%] h-[80vmin] w-[80vmin] rounded-full blur-[130px] opacity-[0.98]"
        style={{ background: "var(--aura-glow-b)" }}
      />
      <div
        className="absolute bottom-[-20%] left-[5%] h-[70vmin] w-[70vmin] rounded-full blur-[120px] opacity-[0.95]"
        style={{ background: "var(--aura-glow-c)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0" style={{ background: "var(--aura-floor)" }} />
    </div>
  );
}
