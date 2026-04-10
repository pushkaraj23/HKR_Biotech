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
    "bg-[linear-gradient(90deg,#0284c7,#1d4ed8)] text-white font-semibold shadow-[0_4px_14px_-2px_rgba(3,105,161,0.45)] hover:brightness-[1.03] hover:shadow-[0_6px_20px_-4px_rgba(29,78,216,0.35)]",
  secondary:
    "border border-slate-300 bg-white text-slate-900 font-medium shadow-sm hover:border-sky-400/60 hover:bg-slate-50 hover:shadow-md",
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
