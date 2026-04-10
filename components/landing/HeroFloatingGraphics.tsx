"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useSyncExternalStore } from "react";

/** True only after hydration so SSR + first paint match; then we enable motion. */
function useIsClient() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      queueMicrotask(onStoreChange);
      return () => {};
    },
    () => true,
    () => false
  );
}

type MoleculeConfig = {
  src: string;
  className: string;
  glow: string;
  priority: boolean;
  animate: {
    x: number[];
    y: number[];
    rotate: number[];
    scale: number[];
    opacity: number[];
  };
  duration: number;
  delay?: number;
};

/** Matches server + first client paint — avoids hydration mismatch with motion. */
const MOLECULE_REST = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  opacity: 0.92,
} as const;

const MOLECULES: MoleculeConfig[] = [
  {
    src: "/graphics/atom1.png",
    className:
      "left-[-14%] top-[10%] w-[min(52vw,460px)] sm:left-[-8%] sm:top-0",
    glow: "drop-shadow-[0_0_32px_rgba(56,189,248,0.5)]",
    priority: true,
    duration: 20,
    delay: 0,
    animate: {
      x: [0, 18, -12, 10, 0],
      y: [0, -26, 16, 20, 0],
      rotate: [-3, 4, -5, 3, -3],
      scale: [1, 1.06, 0.94, 1.04, 1],
      opacity: [0.88, 1, 0.9, 0.96, 0.88],
    },
  },
  {
    src: "/graphics/atom2.png",
    className:
      "right-[-16%] -top-[5%] w-[min(50vw,440px)] sm:right-[-9%]",
    glow: "drop-shadow-[0_0_36px_rgba(99,102,241,0.45)]",
    priority: true,
    duration: 24,
    delay: -3,
    animate: {
      x: [0, -20, 14, -10, 0],
      y: [0, 18, -22, 12, 0],
      rotate: [4, -3, 5, -4, 4],
      scale: [1, 1.08, 0.93, 1.05, 1],
      opacity: [0.9, 1, 0.88, 0.95, 0.9],
    },
  },
  {
    src: "/graphics/atom3.png",
    className:
      "-bottom-[2%] right-[-10%] w-[min(48vw,400px)] sm:right-[-5%]",
    glow: "drop-shadow-[0_0_30px_rgba(34,211,238,0.42)]",
    priority: false,
    duration: 18,
    delay: -1.5,
    animate: {
      x: [0, 14, -10, 12, 0],
      y: [0, 12, -18, 16, 0],
      rotate: [0, -5, 4, -3, 0],
      scale: [1, 1.05, 0.96, 1.06, 1],
      opacity: [0.87, 0.98, 0.9, 1, 0.87],
    },
  },
  {
    src: "/graphics/atom4.png",
    className:
      "bottom-[-2%] left-[-13%] w-[min(46vw,390px)] sm:left-[-6%]",
    glow: "drop-shadow-[0_0_34px_rgba(129,140,248,0.48)]",
    priority: false,
    duration: 22,
    delay: -4,
    animate: {
      x: [0, -14, 22, -8, 0],
      y: [0, -18, 12, 18, 0],
      rotate: [-2, 4, -5, 3, -2],
      scale: [1, 1.09, 0.92, 1.03, 1],
      opacity: [0.89, 1, 0.91, 0.97, 0.89],
    },
  },
];

const KEY_TIMES = [0, 0.22, 0.48, 0.72, 1] as const;

const GLOW_REST = { scale: 1, opacity: 0.68 } as const;

function AmbientGlows({ enableMotion }: { enableMotion: boolean }) {
  return (
    <>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(120vw,900px)] w-[min(120vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(14,165,233,0.28) 0%, rgba(99,102,241,0.14) 42%, transparent 68%)",
        }}
        initial={GLOW_REST}
        animate={
          enableMotion
            ? {
                scale: [1, 1.08, 1],
                opacity: [0.5, 0.9, 0.5],
              }
            : GLOW_REST
        }
        transition={
          enableMotion
            ? {
                duration: 12,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }
            : { duration: 0 }
        }
      />
      <div
        className="absolute -left-[20%] top-0 h-[70%] w-[55%] rounded-full blur-[100px] opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(56,189,248,0.22), transparent 65%)",
        }}
      />
      <div
        className="absolute -right-[15%] bottom-0 h-[60%] w-[50%] rounded-full blur-[90px] opacity-75"
        style={{
          background:
            "radial-gradient(ellipse at 70% 60%, rgba(129,140,248,0.2), transparent 62%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(15,23,42,0.07) 0%, transparent 55%)",
        }}
      />
    </>
  );
}

export function HeroFloatingGraphics() {
  const isClient = useIsClient();
  const reduced = useReducedMotion();

  /** After hydration only; honor reduced motion when explicitly true. */
  const enableMotion = isClient && reduced !== true;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <AmbientGlows enableMotion={enableMotion} />

      {MOLECULES.map((m) => (
        <motion.div
          key={m.src}
          className={`absolute ${m.className} z-[1] will-change-transform`}
          initial={MOLECULE_REST}
          animate={enableMotion ? m.animate : MOLECULE_REST}
          transition={
            enableMotion
              ? {
                  duration: m.duration,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: m.delay ?? 0,
                  times: [...KEY_TIMES],
                }
              : { duration: 0 }
          }
        >
          <Image
            src={m.src}
            alt=""
            width={480}
            height={480}
            sizes="(max-width: 640px) 52vw, (max-width: 1024px) 42vw, 460px"
            priority={m.priority}
            className={`h-auto w-full select-none object-contain ${m.glow}`}
          />
        </motion.div>
      ))}
    </div>
  );
}
