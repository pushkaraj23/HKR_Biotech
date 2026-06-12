import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const catalogFieldClass =
  "relative z-10 w-full rounded-full border border-white/35 bg-transparent px-5 py-3 text-base text-on-dark outline-none transition placeholder:text-on-dark/45 shadow-[0_0_22px_-4px_rgba(43,196,138,0.32),0_0_36px_-10px_rgba(26,115,232,0.22)] hover:border-white/55 hover:shadow-[0_0_28px_-4px_rgba(43,196,138,0.42),0_0_44px_-8px_rgba(26,115,232,0.3)] focus:border-accent/65 focus:shadow-[0_0_32px_-2px_rgba(43,196,138,0.5),0_0_52px_-6px_rgba(26,115,232,0.35)] focus:ring-2 focus:ring-accent/25";

export const catalogFieldLabelClass =
  "font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-on-dark/65";

export function CatalogFieldGlow({
  children,
  className,
  compact,
}: {
  children: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("relative mt-2", className)}>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute rounded-full opacity-75 blur-xl",
          compact ? "-inset-1" : "-inset-2",
        )}
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--accent) 38%, transparent) 0%, color-mix(in srgb, var(--primary) 26%, transparent) 50%, transparent 75%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export function CatalogFieldChevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
