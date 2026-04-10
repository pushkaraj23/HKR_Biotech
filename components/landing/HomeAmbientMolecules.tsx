"use client";

import Image from "next/image";

type AmbientMolecule = {
  src: string;
  className: string;
  sizes: string;
  glow: string;
};

const AMBIENT_MOLECULES: AmbientMolecule[] = [
  {
    src: "/graphics/atom1.png",
    className: "-left-[18%] top-[24%] w-[min(44vw,520px)] sm:-left-[14%] sm:top-[20%]",
    sizes: "(max-width: 640px) 46vw, (max-width: 1200px) 34vw, 520px",
    glow: "drop-shadow-[0_0_34px_rgba(56,189,248,0.28)]",
  },
  {
    src: "/graphics/atom2.png",
    className: "-right-[20%] top-[33%] w-[min(46vw,540px)] sm:-right-[14%] sm:top-[30%]",
    sizes: "(max-width: 640px) 48vw, (max-width: 1200px) 35vw, 540px",
    glow: "drop-shadow-[0_0_36px_rgba(99,102,241,0.26)]",
  },
  {
    src: "/graphics/atom3.png",
    className: "-left-[15%] top-[55%] w-[min(40vw,470px)] sm:-left-[10%] sm:top-[52%]",
    sizes: "(max-width: 640px) 42vw, (max-width: 1200px) 31vw, 470px",
    glow: "drop-shadow-[0_0_30px_rgba(34,211,238,0.24)]",
  },
  {
    src: "/graphics/atom4.png",
    className: "-right-[18%] top-[69%] w-[min(42vw,500px)] sm:-right-[11%] sm:top-[66%]",
    sizes: "(max-width: 640px) 44vw, (max-width: 1200px) 32vw, 500px",
    glow: "drop-shadow-[0_0_34px_rgba(129,140,248,0.24)]",
  },
  {
    src: "/graphics/atom1.png",
    className: "-left-[16%] top-[83%] w-[min(36vw,430px)] sm:-left-[10%] sm:top-[82%]",
    sizes: "(max-width: 640px) 38vw, (max-width: 1200px) 28vw, 430px",
    glow: "drop-shadow-[0_0_30px_rgba(56,189,248,0.2)]",
  },
];

export function HomeAmbientMolecules() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {AMBIENT_MOLECULES.map((m, i) => (
        <div
          key={`${m.src}-${i}`}
          className={`absolute opacity-[0.16] blur-[0.2px] ${m.className}`}
        >
          <Image
            src={m.src}
            alt=""
            width={560}
            height={560}
            sizes={m.sizes}
            className={`h-auto w-full select-none object-contain ${m.glow}`}
          />
        </div>
      ))}
    </div>
  );
}
