import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  prefetch?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(90deg,#0d9488,#14b8a6,#2dd4bf)] text-white font-semibold shadow-[0_4px_16px_-2px_rgba(20,184,166,0.4)] hover:brightness-[1.04] hover:shadow-[0_8px_24px_-4px_rgba(20,184,166,0.3)]",
  secondary:
    "border border-white/[0.1] bg-white/[0.06] text-slate-200 font-medium shadow-sm hover:border-teal-500/30 hover:bg-white/[0.1] hover:shadow-md",
  ghost:
    "text-slate-400 hover:bg-white/[0.06] hover:text-white",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  prefetch,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm transition-all duration-300",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
