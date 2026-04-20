import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ProductCategory } from "@/lib/types/catalog";
import type { ProductCategorySlug } from "@/lib/types";

type ActiveSlug = "all" | ProductCategorySlug;

type ProductCategoryNavProps = {
  categories: ProductCategory[];
  activeSlug: ActiveSlug;
  className?: string;
  mode?: "catalog" | "category";
};

export function ProductCategoryNav({
  categories,
  activeSlug,
  className,
  mode = "catalog",
}: ProductCategoryNavProps) {
  const blurb =
    mode === "category"
      ? "Switch family or return to the full catalogue on one page."
      : "Open a family for a focused list, or browse every SKU on this page.";

  return (
    <nav
      className={cn(
        "relative overflow-hidden rounded-2xl border border-on-dark/18 bg-[rgba(18,25,35,0.46)] px-4 py-4 shadow-[0_8px_24px_-14px_rgba(18,25,35,0.65)] backdrop-blur-md md:px-6 md:py-5",
        className,
      )}
      aria-labelledby="product-categories-heading"
    >
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 id="product-categories-heading" className="font-display text-lg font-semibold tracking-tight text-on-dark md:text-xl">
            Browse by family
          </h2>
          <p className="mt-1 max-w-xl text-xs text-on-dark/70 sm:text-sm">{blurb}</p>
        </div>
        {mode === "category" ? (
          <Link
            href="/products"
            className="shrink-0 text-sm font-semibold text-primary-mid transition hover:text-primary hover:underline"
          >
            ← Full catalogue
          </Link>
        ) : null}
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2">
        <CategoryPill href="/products" active={activeSlug === "all"}>
          All products
        </CategoryPill>
        {categories.map((c) => (
          <CategoryPill key={c.slug} href={`/products/${c.slug}`} active={activeSlug === c.slug}>
            {c.name}
          </CategoryPill>
        ))}
      </div>
    </nav>
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
        "inline-flex min-h-[2.4rem] items-center justify-center rounded-full border px-3.5 py-1.5 text-sm font-semibold tracking-tight transition-all duration-200 md:min-h-[2.6rem] md:px-5",
        active
          ? "border-primary/35 bg-cta-gradient text-primary-foreground shadow-primary-glow"
          : "border-on-dark/30 bg-[rgba(18,25,35,0.45)] text-on-dark/85 shadow-sm hover:border-primary/35 hover:bg-[rgba(18,25,35,0.62)] hover:text-on-dark",
      )}
    >
      {children}
    </Link>
  );
}
