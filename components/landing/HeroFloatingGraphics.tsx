type OrbConfig = {
  className: string;
  gradient: string;
  blurClass: string;
  opacityClass: string;
  duration: number;
  delay: number;
};

const ORBS: OrbConfig[] = [
  {
    className:
      "left-[-12%] top-[-8%] h-[min(68vw,580px)] w-[min(68vw,580px)] sm:left-[-6%] sm:top-[-4%]",
    gradient:
      "radial-gradient(circle at 40% 40%, rgba(255,177,98,0.24), rgba(163,81,57,0.1) 48%, transparent 68%)",
    blurClass: "blur-[72px]",
    opacityClass: "opacity-60",
    duration: 14,
    delay: 0,
  },
  {
    className:
      "right-[-14%] top-[4%] h-[min(62vw,520px)] w-[min(62vw,520px)] sm:right-[-8%]",
    gradient:
      "radial-gradient(circle at 55% 40%, rgba(44,59,77,0.22), rgba(74,93,114,0.07) 46%, transparent 68%)",
    blurClass: "blur-[68px]",
    opacityClass: "opacity-55",
    duration: 16,
    delay: -2,
  },
  {
    className:
      "bottom-[-2%] left-[10%] h-[min(48vw,420px)] w-[min(48vw,420px)] sm:left-[14%]",
    gradient:
      "radial-gradient(circle at 50% 50%, rgba(163,81,57,0.2), rgba(200,120,95,0.07) 44%, transparent 64%)",
    blurClass: "blur-[64px]",
    opacityClass: "opacity-50",
    duration: 15,
    delay: -4,
  },
];

export function HeroFloatingGraphics() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute left-1/2 top-1/2 h-[min(92vw,760px)] w-[min(92vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-55 blur-[96px] animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(255,177,98,0.2) 0%, rgba(44,59,77,0.1) 38%, rgba(163,81,57,0.05) 58%, transparent 74%)",
          animationDuration: "9s",
        }}
      />

      {ORBS.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-float-soft ${orb.blurClass} ${orb.opacityClass} ${orb.className}`}
          style={{
            background: orb.gradient,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Legibility wash: ensures dark, even base behind hero text regardless of orb motion */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(18,25,35,0.55) 0%, rgba(18,25,35,0.38) 35%, rgba(18,25,35,0.15) 65%, transparent 90%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[55%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(18,25,35,0.38) 0%, rgba(18,25,35,0.18) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
