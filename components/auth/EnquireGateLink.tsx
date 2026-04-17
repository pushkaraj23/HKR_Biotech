"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { loginPathWithCallback } from "@/lib/auth/return-url";
import { cn } from "@/lib/cn";

type EnquireGateLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

/**
 * Logged-out users go to sign-in with return URL; logged-in users use `href` (e.g. /contact).
 */
export function EnquireGateLink({ href, className, children, ...rest }: EnquireGateLinkProps) {
  const { user, loading } = useAuth();
  const dest = !loading && user ? href : loginPathWithCallback(href);

  return (
    <Link href={dest} className={cn(className)} {...rest}>
      {children}
    </Link>
  );
}
