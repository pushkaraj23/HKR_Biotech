"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

function useIsClient() {
  return useSyncExternalStore(
    (cb) => {
      if (typeof window === "undefined") return () => {};
      queueMicrotask(cb);
      return () => {};
    },
    () => true,
    () => false,
  );
}

type OrbConfig = {
  className: string;
  gradient: string;
  blur: string;
  animate: { x: number[]; y: number[]; scale: number[]; opacity: number[] };
  duration: number;
  delay: number;
};

const ORBS: OrbConfig[] = [
  {
    className:
      "left-[-14%] top-[-10%] h-[min(80vw,720px)] w-[min(80vw,720px)] sm:left-[-8%] sm:top-[-6%]",
    gradient:
      "radial-gradient(circle at 40% 40%, rgba(20,184,166,0.6), rgba(15,118,110,0.22) 46%, transparent 65%)",
    blur: "blur-[90px]",
    animate: {
      x: [0, 40, -30, 20, 0],
      y: [0, -30, 40, -15, 0],
      scale: [1, 1.12, 0.92, 1.06, 1],
      opacity: [0.7, 1, 0.65, 0.9, 0.7],
    },
    duration: 16,
    delay: 0,
  },
  {
    className:
      "right-[-16%] top-[2%] h-[min(70vw,640px)] w-[min(70vw,640px)] sm:right-[-10%]",
    gradient:
      "radial-gradient(circle at 55% 40%, rgba(91,33,182,0.55), rgba(124,58,237,0.18) 44%, transparent 64%)",
    blur: "blur-[85px]",
    animate: {
      x: [0, -36, 28, -18, 0],
      y: [0, 24, -36, 18, 0],
      scale: [1, 1.1, 0.93, 1.08, 1],
      opacity: [0.65, 0.95, 0.6, 0.85, 0.65],
    },
    duration: 18,
    delay: -2,
  },
  {
    className:
      "bottom-[-4%] left-[8%] h-[min(56vw,500px)] w-[min(56vw,500px)] sm:left-[12%]",
    gradient:
      "radial-gradient(circle at 50% 50%, rgba(159,18,57,0.45), rgba(225,29,72,0.12) 42%, transparent 62%)",
    blur: "blur-[80px]",
    animate: {
      x: [0, 28, -22, 16, 0],
      y: [0, -24, 32, -12, 0],
      scale: [1, 1.08, 0.94, 1.05, 1],
      opacity: [0.55, 0.85, 0.5, 0.75, 0.55],
    },
    duration: 14,
    delay: -4,
  },
  {
    className:
      "right-[2%] bottom-[6%] h-[min(44vw,400px)] w-[min(44vw,400px)] sm:right-[8%]",
    gradient:
      "radial-gradient(circle at 45% 55%, rgba(20,184,166,0.35), rgba(91,33,182,0.2) 48%, transparent 68%)",
    blur: "blur-[70px]",
    animate: {
      x: [0, -20, 30, -14, 0],
      y: [0, 22, -26, 16, 0],
      scale: [1, 1.06, 0.95, 1.04, 1],
      opacity: [0.5, 0.8, 0.45, 0.7, 0.5],
    },
    duration: 20,
    delay: -1,
  },
  {
    className:
      "left-[30%] top-[20%] h-[min(36vw,320px)] w-[min(36vw,320px)] sm:left-[35%] sm:top-[15%]",
    gradient:
      "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.3), rgba(20,184,166,0.15) 50%, transparent 72%)",
    blur: "blur-[60px]",
    animate: {
      x: [0, 16, -12, 8, 0],
      y: [0, -14, 18, -8, 0],
      scale: [1, 1.1, 0.96, 1.05, 1],
      opacity: [0.4, 0.7, 0.35, 0.6, 0.4],
    },
    duration: 12,
    delay: -3,
  },
];

const REST = { x: 0, y: 0, scale: 1, opacity: 0.6 } as const;
const KEY_TIMES = [0, 0.2, 0.45, 0.72, 1] as const;

function CentralPulse({ enableMotion }: { enableMotion: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-[min(110vw,900px)] w-[min(110vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
      style={{
        background:
          "radial-gradient(circle at 50% 48%, rgba(20,184,166,0.28) 0%, rgba(91,33,182,0.15) 35%, rgba(159,18,57,0.06) 55%, transparent 70%)",
      }}
      initial={{ scale: 1, opacity: 0.5 }}
      animate={
        enableMotion
          ? { scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }
          : { scale: 1, opacity: 0.5 }
      }
      transition={
        enableMotion
          ? { duration: 8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
          : { duration: 0 }
      }
    />
  );
}

export function HeroFloatingGraphics() {
  const isClient = useIsClient();
  const reduced = useReducedMotion();
  const enableMotion = isClient && reduced !== true;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <CentralPulse enableMotion={enableMotion} />

      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${orb.blur} ${orb.className}`}
          style={{ background: orb.gradient }}
          initial={REST}
          animate={enableMotion ? orb.animate : REST}
          transition={
            enableMotion
              ? {
                  duration: orb.duration,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: orb.delay,
                  times: [...KEY_TIMES],
                }
              : { duration: 0 }
          }
        />
      ))}
    </div>
  );
}
