import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  glassButtonBase,
  glassButtonClasses,
  type GlassButtonColor,
  type GlassButtonSurface,
  type GlassButtonVariant,
} from "@/lib/ui/glassButton";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  /** Maps to blue (primary), green (secondary), or white (ghost). */
  variant?: GlassButtonVariant;
  /** Override variant color: blue | green | white. */
  color?: GlassButtonColor;
  /** `light` = deeper glass on pale backgrounds; `dark` = luminous glass on navy. */
  surface?: GlassButtonSurface;
  className?: string;
  prefetch?: boolean;
  target?: "_blank" | "_self";
  rel?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  color,
  surface = "light",
  className,
  prefetch,
  target,
  rel,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      target={target}
      rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
      className={cn(glassButtonBase, glassButtonClasses({ variant, color, surface }), className)}
    >
      {children}
    </Link>
  );
}
