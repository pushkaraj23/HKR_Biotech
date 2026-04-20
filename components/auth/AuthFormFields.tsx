import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const authFieldClass =
  "w-full rounded-xl border border-on-dark/20 bg-[rgba(17,24,36,0.78)] px-4 py-3 text-sm text-on-dark shadow-sm backdrop-blur-md outline-none transition-all duration-200 placeholder:text-on-dark/45 focus:border-primary/55 focus:bg-[rgba(17,24,36,0.9)] focus:ring-2 focus:ring-ring";

export const authLabelClass =
  "mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-mid";

export function AuthCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-on-dark/20 bg-[linear-gradient(165deg,rgba(16,24,36,0.9),rgba(26,36,52,0.86))] p-8 shadow-elevated-lg backdrop-blur-2xl sm:p-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
