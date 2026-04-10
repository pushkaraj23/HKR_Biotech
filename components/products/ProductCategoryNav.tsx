import Link from "next/link";
import { productCategories } from "@/data/product-categories";
import { cn } from "@/lib/cn";
import type { ProductCategorySlug } from "@/lib/types";

type ActiveSlug = "all" | ProductCategorySlug;

type ProductCategoryNavProps = {
  activeSlug: ActiveSlug;
  className?: string;
  mode?: "catalog" | "category";
};

export function ProductCategoryNav({
  activeSlug,
  className,
  mode = "catalog",
}: ProductCategoryNavProps) {
  const blurb =
    mode === "category"
      ? "Switch between product families or return to the full range."
      : "Each category opens its own page with an overview and full product listing.";
  return (
    <section className={cn("relative", className)} aria-labelledby="product-categories-heading">
      <div
        className="pointer-events-none absolute -inset-x-6 -inset-y-8 rounded-[2rem] opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(14,165,233,0.1), transparent 70%)",
        }}
        aria-hidden
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border-subtle",
          "bg-gradient-to-br from-white via-bg-primary to-bg-secondary/50",
          "shadow-[0_4px_24px_-6px_rgba(15,23,42,0.08)]",
          "backdrop-blur-sm",
        )}
      >
        <div
          className="pointer-events-none absolute -right-12 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative px-5 py-6 md:px-8 md:py-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2
                id="product-categories-heading"
                className="font-display text-lg font-semibold tracking-tight text-text-primary md:text-xl"
              >
                Categories
              </h2>
              <p className="mt-1 max-w-xl text-sm text-text-muted">{blurb}</p>
            </div>
            {mode === "category" ? (
              <Link
                href="/products"
                className="shrink-0 text-sm font-semibold text-accent-primary transition hover:text-accent-deep"
              >
                ← Full catalogue
              </Link>
            ) : null}
          </div>

          <nav className="mt-6 flex flex-wrap gap-3" aria-label="Product categories">
            <CategoryPill href="/products" active={activeSlug === "all"}>
              All products
            </CategoryPill>
            {productCategories.map((c) => (
              <CategoryPill key={c.slug} href={`/products/${c.slug}`} active={activeSlug === c.slug}>
                {c.name}
              </CategoryPill>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

function CategoryPill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-[3rem] items-center justify-center rounded-2xl border px-5 py-3 text-sm font-semibold tracking-tight transition-all duration-200 md:min-h-[3.25rem] md:px-7 md:text-[0.9375rem]",
        active
          ? cn(
              "border-accent-primary/40 bg-bg-secondary text-text-primary",
              "shadow-[0_2px_12px_-2px_rgba(14,165,233,0.25),0_0_0_1px_rgba(14,165,233,0.12)]",
            )
          : cn(
              "border-border-subtle bg-surface-glass-strong text-text-secondary shadow-sm",
              "hover:border-accent-primary/25 hover:bg-bg-secondary/80 hover:text-text-primary",
              "hover:shadow-md",
            ),
      )}
    >
      {children}
    </Link>
  );
}
