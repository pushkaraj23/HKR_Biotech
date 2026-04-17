import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const authFieldClass =
  "w-full rounded-xl border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-sm text-slate-100 shadow-sm backdrop-blur-sm outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-teal-500/40 focus:bg-white/[0.09] focus:shadow-[0_0_0_3px_rgba(20,184,166,0.12)]";

export const authLabelClass =
  "mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400";

export function AuthCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/[0.08] bg-bg-secondary/80 p-8 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
