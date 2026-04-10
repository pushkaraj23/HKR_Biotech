/**
 * Light canvas: cool white base + teal / violet / rose glows (logo palette).
 */
export function AuraBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #e8f0ee 0%, #eef2f1 18%, #f4f7f6 42%, #fafcfb 78%, #ffffff 100%)",
        }}
      />
      <div
        className="absolute -left-[35%] top-[-25%] h-[85vmin] w-[85vmin] rounded-full blur-[110px] animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at 45% 40%, rgba(15,118,110,0.42) 0%, rgba(20,184,166,0.22) 34%, rgba(17,94,89,0.08) 50%, transparent 66%)",
        }}
      />
      <div
        className="absolute -right-[30%] top-[5%] h-[80vmin] w-[80vmin] rounded-full blur-[115px] opacity-[0.98]"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(91,33,182,0.38) 0%, rgba(124,58,237,0.16) 40%, rgba(139,92,246,0.06) 54%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[5%] h-[70vmin] w-[70vmin] rounded-full blur-[100px] opacity-[0.95]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(159,18,57,0.18) 0%, rgba(190,24,93,0.08) 45%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.48]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 58% at 50% 100%, rgba(15,118,110,0.08) 0%, rgba(91,33,182,0.03) 40%, transparent 58%)",
        }}
      />
    </div>
  );
}
