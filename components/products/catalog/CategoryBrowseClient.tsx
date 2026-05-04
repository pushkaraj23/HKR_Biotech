"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { CatalogProduct, ProductCategory, ProductCategorySlug } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";
import { filterCatalogProducts, type CatalogFilterState } from "@/lib/catalog/filters";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ProductCard } from "./ProductCard";
import { CategoryBrowseToolbar } from "./CategoryBrowseToolbar";

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
    tint: "from-[color-mix(in_srgb,var(--surface)_82%,var(--primary)_18%)] to-[color-mix(in_srgb,var(--surface)_70%,#01084e_30%)]",
    orb: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), color-mix(in srgb, var(--primary) 45%, transparent) 55%, transparent)",
    orbShadow: "0 8px 24px -4px color-mix(in srgb, var(--primary) 32%, transparent)",
  },
  {
    title: "Scale flexibility",
    body: "Milligram exploration through multi-gram supply with transparent feasibility gates.",
    tint: "from-[color-mix(in_srgb,var(--accent)_55%,var(--light)_45%)] to-[color-mix(in_srgb,var(--primary-mid)_35%,var(--accent)_65%)]",
    orb: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75), color-mix(in srgb, var(--accent) 50%, transparent) 55%, transparent)",
    orbShadow: "0 8px 24px -4px color-mix(in srgb, var(--accent) 28%, transparent)",
  },
  {
    title: "Export-ready mindset",
    body: "Documentation and communication tuned for Indian and international procurement teams.",
    tint: "from-[color-mix(in_srgb,var(--light)_90%,var(--primary)_10%)] to-[color-mix(in_srgb,var(--light)_76%,var(--accent)_24%)]",
    orb: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), color-mix(in srgb, var(--primary-mid) 35%, transparent) 50%, transparent)",
    orbShadow: "0 6px 20px -4px color-mix(in srgb, var(--primary) 22%, transparent)",
  },
] as const;
const PAGE_SIZE = 12;

export function CategoryBrowseClient({
  category,
  categoryProducts,
  relatedCategories,
  allCategories,
}: CategoryBrowseClientProps) {
  const initial: CatalogFilterState = {
    search: "",
    category: category.slug,
  };
  const [state, setState] = useState<CatalogFilterState>(initial);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(
    () => filterCatalogProducts(categoryProducts, state, category.slug as ProductCategorySlug),
    [category.slug, categoryProducts, state],
  );
  const visibleProducts = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category.slug, state.search]);

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;
    const target = sentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "220px 0px", threshold: 0.01 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, filtered.length]);

  return (
    <div className="space-y-10 px-4 pb-28 pt-10 sm:px-6 lg:px-8 md:space-y-12">
      <div className="mx-auto max-w-6xl space-y-10 md:space-y-12">
        <RevealOnScroll>
          <CategoryBrowseToolbar
            allCategories={allCategories}
            activeCategory={category}
            search={state.search}
            onSearchChange={(value) => setState((s) => ({ ...s, search: value }))}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <section aria-labelledby="category-list-heading">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-on-dark/72">
                  {category.name}
                </p>
                <h2
                  id="category-list-heading"
                  className="mt-1.5 font-display text-xl font-bold tracking-tight text-on-dark md:text-2xl"
                >
                  Catalogue <span className="text-accent">entries</span>
                </h2>
              </div>
              <p className="text-xs text-on-dark/80 sm:text-sm">
                <span className="font-semibold text-on-dark">{visibleProducts.length}</span> shown in this family
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="mt-8 rounded-[1.75rem] border border-dashed border-white/45 bg-white/88 px-8 py-14 text-center shadow-[0_12px_32px_-14px_rgba(18,50,90,0.22)]">
                <p className="font-medium text-foreground">No products match these filters.</p>
                <button
                  type="button"
                  onClick={() => setState({ ...initial, category: category.slug })}
                  className="mt-4 text-sm font-semibold text-primary-deep underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <ul className="mt-8 grid gap-6 md:grid-cols-2">
                {visibleProducts.map((p, i) => (
                  <RevealOnScroll key={p.slug} delay={(i % 4) * 55}>
                    <li>
                      <ProductCard product={p} className="h-full" />
                    </li>
                  </RevealOnScroll>
                ))}
              </ul>
            )}
            {filtered.length > 0 ? (
              <div className="mt-6 flex flex-col items-center gap-2">
                <div ref={sentinelRef} className="h-1 w-full" aria-hidden />
                {hasMore ? (
                  <p className="text-xs text-on-dark/65">Loading more products as you scroll...</p>
                ) : (
                  <p className="text-xs text-on-dark/65">All matching products loaded.</p>
                )}
              </div>
            ) : null}
          </section>
        </RevealOnScroll>

        {/* CTA — "Need a non-catalog variant?" */}
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/50 p-8 shadow-[var(--elev-card-stack)] backdrop-blur-xl md:p-10"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--light) 84%, var(--primary) 16%) 0%, color-mix(in srgb, var(--light) 72%, var(--accent) 28%) 100%)",
            }}
            aria-labelledby="category-cta-heading"
          >
            <div
              className="pointer-events-none absolute -left-8 -top-10 h-40 w-40 rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.55), color-mix(in srgb, var(--accent) 20%, transparent) 55%, transparent 72%)",
                filter: "blur(4px)",
              }}
              aria-hidden
            />
            <div className="relative">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/78">
                Custom synthesis
              </p>
              <h2
                id="category-cta-heading"
                className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl"
              >
                Need a non-catalogue variant?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/82 md:text-base">
                We routinely deliver analogues, salt forms, and labelled batches within the{" "}
                <span className="font-medium text-primary-deep">{category.name}</span> space — reference this
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
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-mid">
              Adjacent chemistries
            </p>
            <h2
              id="related-cats-heading"
              className="mt-2 font-display text-2xl font-bold tracking-tight text-on-dark md:text-3xl"
            >
              Related Categories
            </h2>
            <p className="mt-3 text-sm text-on-dark/78">
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
            className="relative overflow-hidden rounded-[2rem] border border-white/45 px-8 py-10 shadow-[0_16px_42px_-14px_rgba(18,50,90,0.28)] backdrop-blur-sm md:px-12"
            style={{
              background:
                "linear-gradient(145deg, color-mix(in srgb, var(--light) 86%, var(--primary) 14%) 0%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 100%)",
            }}
            aria-labelledby="trust-heading"
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-deep">
              Why choose HKR
            </p>
            <h2
              id="trust-heading"
              className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
            >
              What teams value about our catalogue chemistry
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {WHY_ITEMS.map((item, i) => {
                const lightCard = i === 2;
                return (
                <RevealOnScroll key={item.title} delay={i * 70}>
                  <li
                    className={`group h-full overflow-hidden rounded-[1.75rem] border border-white/50 bg-gradient-to-b ${item.tint} p-7 shadow-[0_10px_28px_-12px_rgba(18,50,90,0.22)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_18px_40px_-14px_rgba(18,50,90,0.3)]`}
                  >
                    <div
                      className="mb-5 h-10 w-10 rounded-full ring-2 ring-white/40"
                      style={{
                        background: item.orb,
                        boxShadow: `${item.orbShadow}, inset 0 -2px 5px rgba(0,0,0,0.06)`,
                      }}
                      aria-hidden
                    />
                    <h3
                      className={cn(
                        "font-display text-lg font-semibold",
                        lightCard ? "text-foreground" : "text-on-dark",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-sm leading-relaxed",
                        lightCard ? "text-foreground/82" : "text-on-dark/82",
                      )}
                    >
                      {item.body}
                    </p>
                  </li>
                </RevealOnScroll>
                );
              })}
            </ul>
            <RevealOnScroll delay={240}>
              <Link
                href="/capabilities"
                className="mt-8 inline-flex text-sm font-semibold text-primary-deep hover:underline"
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
