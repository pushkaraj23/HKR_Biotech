import Link from "next/link";
import type { CatalogProduct } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";
import { BRAND_SOLID_CARD_CYCLE } from "@/lib/ui/brandSolidCardCycle";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import {
  productDetailBrandVariant,
  productDetailSolidPanelClass,
} from "@/components/products/catalog/productDetailStyles";
import { StructurePlaceholder } from "./StructurePlaceholder";

type RelatedProductsProps = {
  products: CatalogProduct[];
  className?: string;
};

export function RelatedProducts({ products, className }: RelatedProductsProps) {
  if (products.length === 0) return null;

  const intro = productDetailBrandVariant(2);

  return (
    <section className={cn("space-y-7", className)} aria-labelledby="related-products-heading">
      <RevealOnScroll>
        <div
          className={cn(productDetailSolidPanelClass(intro.v, intro.light), "px-6 py-7 sm:px-8 sm:py-8")}
          style={{ backgroundColor: intro.v.surface }}
        >
          <p className={cn("font-mono text-[10px] font-semibold uppercase tracking-[0.28em]", intro.v.eyebrow)}>
            Related entries
          </p>
          <h2
            id="related-products-heading"
            className={cn("mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl", intro.v.title)}
          >
            Related catalogue entries
          </h2>
          <p className={cn("mt-3 max-w-2xl text-lg leading-relaxed", intro.v.body)}>
            Often specified alongside this SKU in discovery and process programmes.
          </p>
        </div>
      </RevealOnScroll>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => {
          const v = BRAND_SOLID_CARD_CYCLE[i % BRAND_SOLID_CARD_CYCLE.length];
          return (
            <RevealOnScroll key={p.slug} delay={i * 70}>
              <li>
                <article
                  style={{ backgroundColor: v.surface }}
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-6 transition-all duration-300 hover:-translate-y-0.5",
                    v.shell,
                  )}
                >
                  <div className="flex gap-4">
                    <div className={cn("shrink-0 overflow-hidden rounded-xl", v.thumbRing)}>
                      <StructurePlaceholder compact className="h-28 w-28 rounded-xl border-0" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={cn("font-display text-lg font-semibold leading-snug", v.title)}>
                        <Link
                          href={`/products/${p.categorySlug}/${p.slug}`}
                          className={cn("transition", v.titleHover)}
                        >
                          {p.chemicalName}
                        </Link>
                      </h3>
                      <p className={cn("mt-1.5 font-mono text-xs", v.secondary)}>{p.catalogNumber}</p>
                      <p className={cn("mt-2 line-clamp-2 text-sm leading-relaxed md:text-base", v.body)}>
                        {p.shortDescription}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/products/${p.categorySlug}/${p.slug}`}
                    className={cn("mt-5 inline-flex text-sm font-semibold transition md:text-base", v.link)}
                  >
                    View specifications →
                  </Link>
                </article>
              </li>
            </RevealOnScroll>
          );
        })}
      </ul>
    </section>
  );
}
