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
        "glass-panel rounded-3xl p-6 shadow-card-stack transition-all duration-300",
        hover && "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
