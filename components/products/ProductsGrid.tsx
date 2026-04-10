import type { ReactNode } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import type { Product } from "@/lib/types";

type ProductsGridProps = {
  products: Product[];
  heading: string;
  headingId?: string;
  emptyMessage?: string;
  /** Shown under the empty message (e.g. contact link) */
  emptyExtra?: ReactNode;
};

export function ProductsGrid({
  products,
  heading,
  headingId = "products-grid-heading",
  emptyMessage = "No products to show.",
  emptyExtra,
}: ProductsGridProps) {
  return (
    <section className="space-y-6" aria-labelledby={headingId}>
      <h2 id={headingId} className="font-display text-xl font-semibold text-text-primary md:text-2xl">
        {heading}
      </h2>
      {products.length === 0 ? (
        <div className="space-y-2">
          <p className="text-sm text-text-muted">{emptyMessage}</p>
          {emptyExtra}
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {products.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} className="h-full" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
