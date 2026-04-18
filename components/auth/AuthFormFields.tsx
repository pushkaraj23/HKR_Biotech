import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const authFieldClass =
  "w-full rounded-xl border border-overlay-hover bg-on-dark/[0.06] px-4 py-3 text-sm text-foreground/95 shadow-sm backdrop-blur-sm outline-none transition-all duration-200 placeholder:text-caption-foreground focus:border-primary/40 focus:bg-on-dark/[0.09] focus:ring-2 focus:ring-ring";

export const authLabelClass =
  "mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground";

export function AuthCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-overlay bg-surface/80 p-8 shadow-elevated-lg backdrop-blur-2xl sm:p-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
