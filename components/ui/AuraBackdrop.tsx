/**
 * Deeper canvas than flat white: cool slate base + saturated aurora glows.
 */
export function AuraBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #dce4ee 0%, #e8eef4 22%, #f1f5f9 48%, #f8fafc 78%, #ffffff 100%)",
        }}
      />
      <div
        className="absolute -left-[35%] top-[-25%] h-[85vmin] w-[85vmin] rounded-full blur-[110px] animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at 45% 40%, rgba(14,165,233,0.42) 0%, rgba(56,189,248,0.15) 35%, transparent 62%)",
        }}
      />
      <div
        className="absolute -right-[30%] top-[5%] h-[80vmin] w-[80vmin] rounded-full blur-[115px] opacity-95"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(99,102,241,0.38) 0%, rgba(79,70,229,0.12) 40%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[5%] h-[70vmin] w-[70vmin] rounded-full blur-[100px] opacity-90"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.28) 0%, rgba(14,116,144,0.08) 45%, transparent 68%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% 100%, rgba(15,23,42,0.06) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}
