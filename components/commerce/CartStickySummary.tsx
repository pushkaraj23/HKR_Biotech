import type { ReactNode } from "react";
import { COMMERCE_STICKY_TOP } from "@/components/products/catalog/productDetailStyles";
import { cn } from "@/lib/cn";

type CartStickySummaryProps = {
  children: ReactNode;
  className?: string;
};

/** Sticky order summary on desktop; parent flex row must use items-stretch so this column matches cart list height. */
export function CartStickySummary({ children, className }: CartStickySummaryProps) {
  return (
    <div className={cn("relative w-full lg:w-[340px] lg:shrink-0", className)}>
      <div className={cn("w-full lg:sticky lg:self-start", COMMERCE_STICKY_TOP)}>{children}</div>
    </div>
  );
}
