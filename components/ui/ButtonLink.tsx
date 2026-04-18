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
    "bg-cta-gradient text-primary-foreground font-semibold shadow-primary-glow hover:brightness-[1.04] hover:shadow-primary-glow-lg",
  secondary:
    "border border-overlay-hover bg-on-dark/[0.06] font-medium text-foreground/90 shadow-sm hover:border-primary/30 hover:bg-on-dark/[0.1] hover:text-foreground hover:shadow-md",
  ghost:
    "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
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
