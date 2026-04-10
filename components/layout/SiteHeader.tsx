"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";

/** Remount header on route change so mobile / dropdown state resets without effects. */
export function SiteHeader() {
  const pathname = usePathname();
  return <Header key={pathname} />;
}
