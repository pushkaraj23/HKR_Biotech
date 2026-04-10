import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Molecule positions for each variant. Every page gets a unique but balanced
 * quadrant arrangement so the images fill negative space without fighting content.
 */
const CONFIGS = {
  /** Default: balanced four-corner arrangement */
  default: [
    {
      src: "/graphics/atom1.png",
      className: "-left-[14%] -top-[4%] w-[min(38vw,380px)]",
      glow: "drop-shadow-[0_0_40px_rgba(15,118,110,0.28)]",
    },
    {
      src: "/graphics/atom2.png",
      className: "-right-[16%] top-[12%] w-[min(40vw,400px)]",
      glow: "drop-shadow-[0_0_40px_rgba(91,33,182,0.24)]",
    },
    {
      src: "/graphics/atom3.png",
      className: "-left-[12%] top-[50%] w-[min(34vw,340px)]",
      glow: "drop-shadow-[0_0_36px_rgba(20,184,166,0.22)]",
    },
    {
      src: "/graphics/atom4.png",
      className: "-right-[13%] top-[62%] w-[min(36vw,360px)]",
      glow: "drop-shadow-[0_0_36px_rgba(159,18,57,0.18)]",
    },
  ],
  /** Long pages: adds a mid-page molecule pair */
  long: [
    {
      src: "/graphics/atom2.png",
      className: "-left-[15%] -top-[2%] w-[min(40vw,400px)]",
      glow: "drop-shadow-[0_0_40px_rgba(91,33,182,0.24)]",
    },
    {
      src: "/graphics/atom1.png",
      className: "-right-[14%] top-[8%] w-[min(38vw,380px)]",
      glow: "drop-shadow-[0_0_40px_rgba(15,118,110,0.28)]",
    },
    {
      src: "/graphics/atom4.png",
      className: "-left-[12%] top-[38%] w-[min(34vw,340px)]",
      glow: "drop-shadow-[0_0_34px_rgba(159,18,57,0.18)]",
    },
    {
      src: "/graphics/atom3.png",
      className: "-right-[13%] top-[52%] w-[min(36vw,360px)]",
      glow: "drop-shadow-[0_0_36px_rgba(20,184,166,0.22)]",
    },
    {
      src: "/graphics/atom1.png",
      className: "-left-[10%] top-[76%] w-[min(30vw,300px)]",
      glow: "drop-shadow-[0_0_30px_rgba(15,118,110,0.2)]",
    },
    {
      src: "/graphics/atom2.png",
      className: "-right-[11%] top-[86%] w-[min(32vw,320px)]",
      glow: "drop-shadow-[0_0_30px_rgba(91,33,182,0.18)]",
    },
  ],
  /** Right-heavy: complements pages with left-aligned content columns */
  right: [
    {
      src: "/graphics/atom3.png",
      className: "-right-[16%] -top-[2%] w-[min(42vw,420px)]",
      glow: "drop-shadow-[0_0_42px_rgba(20,184,166,0.26)]",
    },
    {
      src: "/graphics/atom1.png",
      className: "-left-[14%] top-[18%] w-[min(36vw,360px)]",
      glow: "drop-shadow-[0_0_38px_rgba(15,118,110,0.24)]",
    },
    {
      src: "/graphics/atom2.png",
      className: "-right-[13%] top-[55%] w-[min(38vw,380px)]",
      glow: "drop-shadow-[0_0_36px_rgba(91,33,182,0.22)]",
    },
    {
      src: "/graphics/atom4.png",
      className: "-left-[11%] top-[68%] w-[min(32vw,320px)]",
      glow: "drop-shadow-[0_0_32px_rgba(159,18,57,0.16)]",
    },
  ],
} as const;

type PageAmbientGraphicsProps = {
  variant?: keyof typeof CONFIGS;
  /** Tailwind opacity class, e.g. "opacity-[0.22]". Defaults to 0.20. */
  opacity?: string;
  className?: string;
};

export function PageAmbientGraphics({
  variant = "default",
  opacity = "opacity-[0.20]",
  className,
}: PageAmbientGraphicsProps) {
  const molecules = CONFIGS[variant];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      {molecules.map((m, i) => (
        <div
          key={`${m.src}-${i}`}
          className={cn(
            "absolute blur-[0.3px]",
            opacity,
            m.className,
          )}
        >
          <Image
            src={m.src}
            alt=""
            width={480}
            height={480}
            sizes="(max-width: 640px) 44vw, (max-width: 1200px) 34vw, 420px"
            className={cn("h-auto w-full select-none object-contain", m.glow)}
          />
        </div>
      ))}
    </div>
  );
}
