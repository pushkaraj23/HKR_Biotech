"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { loginPathWithCallback } from "@/lib/auth/return-url";
import { cn } from "@/lib/cn";
import {
  glassButtonBase,
  glassButtonClasses,
  type GlassButtonColor,
  type GlassButtonSurface,
  type GlassButtonVariant,
} from "@/lib/ui/glassButton";

type EnquireGateButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: GlassButtonVariant;
  color?: GlassButtonColor;
  surface?: GlassButtonSurface;
  className?: string;
  prefetch?: boolean;
};

export function EnquireGateButtonLink({
  href,
  children,
  variant = "primary",
  color,
  surface = "light",
  className,
  prefetch,
}: EnquireGateButtonLinkProps) {
  const { user, loading } = useAuth();
  const dest = !loading && user ? href : loginPathWithCallback(href);

  return (
    <Link
      href={dest}
      prefetch={prefetch}
      className={cn(glassButtonBase, glassButtonClasses({ variant, color, surface }), className)}
    >
      {children}
    </Link>
  );
}
