"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/cn";

function HeaderFallback() {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5 sm:pt-[max(1rem,env(safe-area-inset-top))] lg:px-8",
      )}
      aria-hidden
    >
      <div className="mx-auto h-14 max-w-7xl rounded-full border border-white/20 bg-surface/85 sm:h-[3.25rem]" />
    </header>
  );
}

/** Remount header on route change so mobile / dropdown state resets without effects. */
export function SiteHeader() {
  const pathname = usePathname();
  return (
    <Suspense fallback={<HeaderFallback />}>
      <Header key={pathname} />
    </Suspense>
  );
}
