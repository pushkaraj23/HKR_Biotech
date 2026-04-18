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
      <div className="pointer-events-auto flex w-full max-w-lg gap-2 rounded-2xl border border-teal-200/80 bg-white/95 p-2 shadow-[0_-8px_32px_-8px_rgba(15,23,42,0.15)] backdrop-blur-md">
        <Link
          href="#enquiry"
          className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-3 text-center text-xs font-semibold text-light-foreground"
        >
          Details
        </Link>
        <EnquireGateLink
          href={href}
          className="flex flex-[1.2] items-center justify-center rounded-xl bg-gradient-to-r from-teal-800 to-teal-600 px-3 py-3 text-center text-xs font-semibold text-foreground shadow-md"
        >
          Request quote
        </EnquireGateLink>
      </div>
    </div>
  );
}
