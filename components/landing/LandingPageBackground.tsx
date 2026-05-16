/**
 * Soft atmospheric glows for the homepage — large blurred gradients only,
 * no 3D sphere decorations.
 */
export function LandingPageBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Base depth: slight vertical shift on navy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #01084f 0%, #020A63 38%, #031878 72%, #020A63 100%)",
        }}
      />

      {/* Warm glow — upper left */}
      <div
        className="absolute -left-[18%] -top-[12%] h-[min(70vw,42rem)] w-[min(70vw,42rem)] rounded-full opacity-[0.38] blur-[88px] animate-pulse-glow sm:-left-[10%]"
        style={{
          background:
            "radial-gradient(circle at 42% 42%, rgba(255,177,98,0.28) 0%, rgba(255,177,98,0.08) 42%, transparent 68%)",
          animationDuration: "11s",
        }}
      />

      {/* Teal accent — upper right */}
      <div
        className="absolute -right-[16%] top-[6%] h-[min(65vw,38rem)] w-[min(65vw,38rem)] rounded-full opacity-[0.32] blur-[92px] animate-pulse-glow sm:-right-[8%]"
        style={{
          background:
            "radial-gradient(circle at 55% 40%, rgba(125,255,219,0.26) 0%, rgba(125,255,219,0.09) 45%, transparent 70%)",
          animationDuration: "13s",
          animationDelay: "-3s",
        }}
      />

      {/* Cool mid-tone — center */}
      <div
        className="absolute left-1/2 top-[32%] h-[min(80vw,36rem)] w-[min(80vw,36rem)] -translate-x-1/2 rounded-full opacity-25 blur-[100px] animate-float-soft"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(74,93,114,0.22) 0%, rgba(44,59,77,0.08) 50%, transparent 72%)",
          animationDuration: "16s",
          animationDelay: "-5s",
        }}
      />

      {/* Soft lift — lower page */}
      <div
        className="absolute -bottom-[8%] left-[8%] h-[min(55vw,32rem)] w-[min(55vw,32rem)] rounded-full opacity-30 blur-[80px] animate-float-soft"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 48%, transparent 70%)",
          animationDuration: "14s",
          animationDelay: "-2s",
        }}
      />

      {/* Subtle primary band behind content scroll */}
      <div
        className="absolute inset-x-0 top-[45%] h-[55%] opacity-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(26,115,232,0.06) 35%, rgba(43,196,138,0.05) 70%, transparent 100%)",
        }}
      />
    </div>
  );
}
