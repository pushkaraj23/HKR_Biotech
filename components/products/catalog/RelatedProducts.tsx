import Link from "next/link";
import type { CatalogProduct } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";
import { StructurePlaceholder } from "./StructurePlaceholder";

type RelatedProductsProps = {
  products: CatalogProduct[];
  className?: string;
};

export function RelatedProducts({ products, className }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className={cn("space-y-6", className)} aria-labelledby="related-products-heading">
      <div>
        <h2
          id="related-products-heading"
          className="font-display text-2xl font-semibold tracking-tight text-slate-950"
        >
          Related catalogue entries
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Often specified alongside this SKU in discovery and process programmes.
        </p>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <li key={p.slug}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-teal-200/55 bg-gradient-to-b from-white to-teal-50/25 p-5 shadow-sm transition hover:border-teal-400/50 hover:shadow-lg">
              <div className="flex gap-4">
                <StructurePlaceholder compact className="h-24 w-24 shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-sm font-semibold leading-snug text-slate-950">
                    <Link
                      href={`/products/${p.categorySlug}/${p.slug}`}
                      className="transition hover:text-teal-800"
                    >
                      {p.chemicalName}
                    </Link>
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-slate-500">{p.catalogNumber}</p>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {p.shortDescription}
                  </p>
                </div>
              </div>
              <Link
                href={`/products/${p.categorySlug}/${p.slug}`}
                className="mt-4 inline-flex text-xs font-semibold text-teal-800 transition group-hover:text-teal-950"
              >
                View specifications →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
