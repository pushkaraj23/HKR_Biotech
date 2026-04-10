import type { ReactNode } from "react";

/**
 * Layout wrapper for `/products/[category]` and `/products/[category]/[slug]`.
 * Ensures a stable segment boundary for the App Router (helps dev routing resolve correctly).
 */
export default function ProductCatalogSegmentLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
