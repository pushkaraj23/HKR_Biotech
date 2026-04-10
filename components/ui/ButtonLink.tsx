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
    "bg-[linear-gradient(90deg,#115e59,#0f766e,#14b8a6)] text-white font-semibold shadow-[0_4px_16px_-2px_rgba(15,118,110,0.45)] hover:brightness-[1.04] hover:shadow-[0_8px_24px_-4px_rgba(91,33,182,0.22)]",
  secondary:
    "border border-slate-300 bg-white text-slate-900 font-medium shadow-sm hover:border-teal-500/55 hover:bg-teal-50/80 hover:shadow-md",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
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
