import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-3xl p-6 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.07),0_12px_40px_-12px_rgba(15,23,42,0.06)] transition-all duration-300",
        hover &&
          "hover:border-accent-primary/25 hover:shadow-[0_8px_32px_-8px_rgba(14,165,233,0.12),0_20px_48px_-16px_rgba(15,23,42,0.08)] hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </div>
  );
}
