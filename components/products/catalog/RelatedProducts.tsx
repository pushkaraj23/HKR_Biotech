import Link from "next/link";
import type { CatalogProduct } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { StructurePlaceholder } from "./StructurePlaceholder";

type RelatedProductsProps = {
  products: CatalogProduct[];
  className?: string;
};

export function RelatedProducts({ products, className }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className={cn("space-y-6", className)} aria-labelledby="related-products-heading">
      <RevealOnScroll>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-mid">
            Related entries
          </p>
          <h2
            id="related-products-heading"
            className="mt-1 font-display text-2xl font-semibold tracking-tight text-on-dark"
          >
            Related catalogue entries
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-on-dark/75">
            Often specified alongside this SKU in discovery and process programmes.
          </p>
        </div>
      </RevealOnScroll>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <RevealOnScroll key={p.slug} delay={i * 70}>
            <li>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-on-dark/20 bg-[rgba(18,25,35,0.55)] p-5 shadow-[0_10px_28px_-12px_rgba(18,25,35,0.65)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_16px_36px_-12px_rgba(18,25,35,0.72)]">
                <div className="flex gap-4">
                  <StructurePlaceholder compact className="h-24 w-24 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-sm font-semibold leading-snug text-on-dark">
                      <Link
                        href={`/products/${p.categorySlug}/${p.slug}`}
                        className="transition hover:text-primary-mid"
                      >
                        {p.chemicalName}
                      </Link>
                    </h3>
                    <p className="mt-1 font-mono text-[11px] text-on-dark/70">{p.catalogNumber}</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-on-dark/75">
                      {p.shortDescription}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/products/${p.categorySlug}/${p.slug}`}
                  className="mt-4 inline-flex text-xs font-semibold text-primary-mid transition group-hover:text-primary"
                >
                  View specifications →
                </Link>
              </article>
            </li>
          </RevealOnScroll>
        ))}
      </ul>
    </section>
  );
}
