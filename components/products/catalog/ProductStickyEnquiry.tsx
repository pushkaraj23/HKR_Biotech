"use client";

import Link from "next/link";
import { EnquireGateLink } from "@/components/auth/EnquireGateLink";
import type { CatalogProduct } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";

type ProductStickyEnquiryProps = {
  product: CatalogProduct;
  className?: string;
};

export function ProductStickyEnquiry({ product, className }: ProductStickyEnquiryProps) {
  const href = `/contact?product=${encodeURIComponent(product.catalogNumber)}`;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden",
        className,
      )}
    >
      <div className="pointer-events-auto flex w-full max-w-lg gap-2 rounded-2xl border border-on-dark/25 bg-[rgba(18,25,35,0.78)] p-2 shadow-[0_-8px_32px_-8px_rgba(18,25,35,0.4)] backdrop-blur-md">
        <Link
          href="#enquiry"
          className="flex flex-1 items-center justify-center rounded-xl border border-on-dark/30 bg-[rgba(18,25,35,0.55)] px-3 py-3 text-center text-xs font-semibold text-on-dark"
        >
          Details
        </Link>
        <EnquireGateLink
          href={href}
          className="flex flex-[1.2] items-center justify-center rounded-xl bg-cta-gradient px-3 py-3 text-center text-xs font-semibold text-primary-foreground shadow-primary-glow"
        >
          Request quote
        </EnquireGateLink>
      </div>
    </div>
  );
}
