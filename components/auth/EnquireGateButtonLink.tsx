"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { loginPathWithCallback } from "@/lib/auth/return-url";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-cta-gradient text-primary-foreground font-semibold shadow-primary-glow hover:brightness-[1.04] hover:shadow-primary-glow-lg",
  secondary:
    "border border-overlay-hover bg-on-dark/[0.06] font-medium text-foreground/90 shadow-sm hover:border-primary/30 hover:bg-on-dark/[0.1] hover:text-foreground hover:shadow-md",
  ghost: "text-muted-foreground hover:bg-on-dark/[0.06] hover:text-on-dark",
};

type EnquireGateButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  prefetch?: boolean;
};

export function EnquireGateButtonLink({
  href,
  children,
  variant = "primary",
  className,
  prefetch,
}: EnquireGateButtonLinkProps) {
  const { user, loading } = useAuth();
  const dest = !loading && user ? href : loginPathWithCallback(href);

  return (
    <Link
      href={dest}
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
