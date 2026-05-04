import Link from "next/link";
import type { CatalogProduct } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";
import { BRAND_SOLID_CARD_CYCLE } from "@/lib/ui/brandSolidCardCycle";
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
        <div
          className="rounded-2xl border border-white/45 px-5 py-5 shadow-[0_12px_32px_-14px_rgba(18,50,90,0.28)] sm:px-6 sm:py-6"
          style={{
            background:
              "linear-gradient(120deg, color-mix(in srgb, var(--light) 90%, var(--primary) 10%) 0%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 100%)",
          }}
        >
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-deep">
            Related entries
          </p>
          <h2
            id="related-products-heading"
            className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground"
          >
            Related catalogue entries
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-foreground/78">
            Often specified alongside this SKU in discovery and process programmes.
          </p>
        </div>
      </RevealOnScroll>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => {
          const v = BRAND_SOLID_CARD_CYCLE[i % BRAND_SOLID_CARD_CYCLE.length];
          return (
            <RevealOnScroll key={p.slug} delay={i * 70}>
              <li>
                <article
                  style={{ backgroundColor: v.surface }}
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-5 transition-all duration-300 hover:-translate-y-0.5",
                    v.shell,
                  )}
                >
                  <div className="flex gap-4">
                    <div className={cn("shrink-0 overflow-hidden rounded-xl", v.thumbRing)}>
                      <StructurePlaceholder compact className="h-24 w-24 rounded-xl border-0" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={cn("font-display text-sm font-semibold leading-snug", v.title)}>
                        <Link
                          href={`/products/${p.categorySlug}/${p.slug}`}
                          className={cn("transition", v.titleHover)}
                        >
                          {p.chemicalName}
                        </Link>
                      </h3>
                      <p className={cn("mt-1 font-mono text-[11px]", v.secondary)}>{p.catalogNumber}</p>
                      <p className={cn("mt-2 line-clamp-2 text-xs leading-relaxed", v.body)}>{p.shortDescription}</p>
                    </div>
                  </div>
                  <Link
                    href={`/products/${p.categorySlug}/${p.slug}`}
                    className={cn("mt-4 inline-flex text-xs font-semibold transition", v.link)}
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
