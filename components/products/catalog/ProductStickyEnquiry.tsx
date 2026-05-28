"use client";

import Link from "next/link";
import { EnquireGateLink } from "@/components/auth/EnquireGateLink";
import { glassButtonCn } from "@/lib/ui/glassButton";
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
      <div className="pointer-events-auto flex w-full max-w-lg gap-2.5 rounded-2xl border border-white/20 bg-[rgba(2,10,99,0.88)] p-2.5 shadow-[0_-12px_40px_-8px_rgba(2,10,99,0.55)] backdrop-blur-lg">
        <Link
          href="#ordering"
          className={cn(
            glassButtonCn(
              "white",
              "dark",
              "flex w-full min-w-0 flex-1 items-center justify-center rounded-xl px-3 py-3.5 text-center text-sm leading-snug",
            ),
          )}
        >
          Pack sizes
        </Link>
        <Link
          href="#enquiry-form"
          className={cn(
            glassButtonCn(
              "blue",
              "dark",
              "flex w-full min-w-0 flex-1 items-center justify-center rounded-xl px-3 py-3.5 text-center text-sm leading-snug",
            ),
          )}
        >
          Details
        </Link>
        <EnquireGateLink
          href={href}
          className={cn(
            glassButtonCn(
              "green",
              "dark",
              "flex w-full min-w-0 flex-[1.15] items-center justify-center rounded-xl px-3 py-3.5 text-center text-sm leading-snug",
            ),
          )}
        >
          Request quote
        </EnquireGateLink>
      </div>
    </div>
  );
}
