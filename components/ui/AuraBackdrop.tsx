/**
 * Dark canvas: deep navy base + teal / violet / rose glows (logo palette).
 */
export function AuraBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #0c1528 0%, #101c33 18%, #14223c 42%, #162847 78%, #101c33 100%)",
        }}
      />
      <div
        className="absolute -left-[35%] top-[-25%] h-[85vmin] w-[85vmin] rounded-full blur-[130px] animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at 45% 40%, rgba(20,184,166,0.25) 0%, rgba(13,148,136,0.1) 34%, rgba(15,118,110,0.04) 50%, transparent 66%)",
        }}
      />
      <div
        className="absolute -right-[30%] top-[5%] h-[80vmin] w-[80vmin] rounded-full blur-[130px] opacity-[0.98]"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(124,58,237,0.22) 0%, rgba(91,33,182,0.08) 40%, rgba(139,92,246,0.03) 54%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[5%] h-[70vmin] w-[70vmin] rounded-full blur-[120px] opacity-[0.95]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(244,63,94,0.1) 0%, rgba(190,24,93,0.04) 45%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 58% at 50% 100%, rgba(20,184,166,0.05) 0%, rgba(124,58,237,0.02) 40%, transparent 58%)",
        }}
      />
    </div>
  );
}
