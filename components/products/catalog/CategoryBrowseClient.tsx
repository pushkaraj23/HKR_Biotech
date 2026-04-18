"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CatalogProduct, ProductCategory, ProductCategorySlug } from "@/lib/types/catalog";
import { filterCatalogProducts, type CatalogFilterState } from "@/lib/catalog/filters";
import { ProductCategoryNav } from "@/components/products/ProductCategoryNav";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";

type CategoryBrowseClientProps = {
  category: ProductCategory;
  categoryProducts: CatalogProduct[];
  relatedCategories: ProductCategory[];
  allCategories: ProductCategory[];
};

const WHY_ITEMS = [
  {
    title: "Analytical depth",
    body: "Identity and purity context aligned to how you will use the material in the lab.",
    tint: "from-tint-primary/25 to-surface/80",
    orb: "var(--product-orb-carbohydrates)",
    orbShadow: "var(--orb-shadow-primary)",
  },
  {
    title: "Scale flexibility",
    body: "Milligram exploration through multi-gram supply with transparent feasibility gates.",
    tint: "from-tint-accent/25 to-surface/80",
    orb: "var(--product-orb-api-impurities)",
    orbShadow: "var(--orb-shadow-accent)",
  },
  {
    title: "Export-ready mindset",
    body: "Documentation and communication tuned for Indian and international procurement teams.",
    tint: "from-tint-danger/25 to-surface/80",
    orb: "var(--product-orb-nucleotides)",
    orbShadow: "var(--orb-shadow-danger)",
  },
] as const;

export function CategoryBrowseClient({
  category,
  categoryProducts,
  relatedCategories,
  allCategories,
}: CategoryBrowseClientProps) {
  const initial: CatalogFilterState = {
    search: "",
    category: category.slug,
    availability: "all",
  };
  const [state, setState] = useState<CatalogFilterState>(initial);

  const filtered = useMemo(
    () => filterCatalogProducts(categoryProducts, state, category.slug as ProductCategorySlug),
    [category.slug, categoryProducts, state],
  );

  const categoryOptions = allCategories.map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <div className="space-y-10 px-4 pb-28 pt-6 sm:px-6 lg:px-8 md:space-y-12">
      <div className="mx-auto max-w-6xl space-y-10 md:space-y-12">
        <RevealOnScroll>
          <ProductCategoryNav activeSlug={category.slug} mode="category" />
        </RevealOnScroll>

        <RevealOnScroll>
          <ProductFilters
            state={state}
            onChange={setState}
            categoryOptions={categoryOptions}
            showCategoryFilter={false}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <section aria-labelledby="category-list-heading">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                  {category.name}
                </p>
                <h2
                  id="category-list-heading"
                  className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
                >
                  Catalogue Entries
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> shown in this family
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="mt-8 rounded-[1.75rem] border border-dashed border-primary/30 bg-on-dark/[0.04] px-8 py-14 text-center">
                <p className="font-medium text-foreground">No products match these filters.</p>
                <button
                  type="button"
                  onClick={() => setState({ ...initial, category: category.slug })}
                  className="mt-4 text-sm font-semibold text-primary underline"
                >
                  Clear search & availability
                </button>
              </div>
            ) : (
              <ul className="mt-8 grid gap-6 md:grid-cols-2">
                {filtered.map((p, i) => (
                  <RevealOnScroll key={p.slug} delay={(i % 4) * 55}>
                    <li>
                      <ProductCard product={p} className="h-full" />
                    </li>
                  </RevealOnScroll>
                ))}
              </ul>
            )}
          </section>
        </RevealOnScroll>

        {/* CTA — "Need a non-catalog variant?" */}
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2rem] border border-overlay p-8 shadow-[0_16px_64px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-10"
            style={{
              background:
                "linear-gradient(140deg, rgba(20,184,166,0.15) 0%, rgba(124,58,237,0.12) 50%, rgba(91,33,182,0.12) 100%)",
            }}
            aria-labelledby="category-cta-heading"
          >
            {/* Decorative orbs */}
            <div
              className="pointer-events-none absolute -left-4 -top-4 h-16 w-16 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(20,184,166,0.4) 55%, rgba(15,118,110,0.2))",
                boxShadow: "0 8px 28px -6px rgba(20,184,166,0.35), inset 0 -2px 6px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-3 right-8 h-10 w-10 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(124,58,237,0.4) 55%, rgba(91,33,182,0.2))",
                boxShadow: "0 6px 20px -4px rgba(91,33,182,0.3), inset 0 -2px 5px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />
            <div className="relative">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Custom synthesis
              </p>
              <h2
                id="category-cta-heading"
                className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl"
              >
                Need a non-catalogue variant?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                We routinely deliver analogues, salt forms, and labelled batches within the{" "}
                <span className="font-medium text-foreground">{category.name}</span> space — reference this
                family in your RFQ.
              </p>
              <ButtonLink
                href={`/contact?product=${encodeURIComponent(category.name + " — custom")}`}
                variant="primary"
                className="mt-6 rounded-full px-8 shadow-[0_14px_40px_-10px_rgba(15,118,110,0.4)]"
              >
                Enquire about {category.name}
              </ButtonLink>
            </div>
          </div>
        </RevealOnScroll>

        {/* Related categories */}
        <RevealOnScroll>
          <section aria-labelledby="related-cats-heading">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              Adjacent chemistries
            </p>
            <h2
              id="related-cats-heading"
              className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
            >
              Related Categories
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Explore adjacent chemistries often combined in route design.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCategories.map((c, i) => (
                <RevealOnScroll key={c.slug} delay={i * 60}>
                  <CategoryCard category={c} />
                </RevealOnScroll>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Why HKR */}
        <RevealOnScroll>
          <section
            className="relative overflow-hidden rounded-[2rem] border border-overlay px-8 py-10 backdrop-blur-sm md:px-12"
            style={{
              background:
                "linear-gradient(145deg, rgba(12,21,38,0.95) 0%, rgba(7,14,27,0.9) 100%)",
            }}
            aria-labelledby="trust-heading"
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-danger">
              Why choose HKR
            </p>
            <h2
              id="trust-heading"
              className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
            >
              What Teams Value About Our Catalogue Chemistry
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {WHY_ITEMS.map((item, i) => (
                <RevealOnScroll key={item.title} delay={i * 70}>
                  <li
                    className={`group h-full overflow-hidden rounded-[1.75rem] border border-overlay bg-gradient-to-b ${item.tint} p-7 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.5)]`}
                  >
                    <div
                      className="mb-5 h-10 w-10 rounded-full ring-2 ring-overlay"
                      style={{
                        background: item.orb,
                        boxShadow: `${item.orbShadow}, var(--elev-inset-soft)`,
                      }}
                      aria-hidden
                    />
                    <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </li>
                </RevealOnScroll>
              ))}
            </ul>
            <RevealOnScroll delay={240}>
              <Link
                href="/capabilities"
                className="mt-8 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                View capabilities →
              </Link>
            </RevealOnScroll>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
}
