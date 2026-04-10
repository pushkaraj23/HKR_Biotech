import Link from "next/link";
import { productCategories } from "@/data/catalog";
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
      ? "Switch family or return to the full catalogue on one page."
      : "Open a family for a focused list, or browse every SKU on this page.";

  return (
    <nav
      className={cn(
        "relative overflow-hidden rounded-2xl border border-teal-200/70 bg-gradient-to-br from-white via-teal-50/25 to-violet-50/20 px-5 py-6 shadow-[0_8px_32px_-16px_rgba(15,118,110,0.12)] backdrop-blur-sm md:px-7 md:py-6",
        className,
      )}
      aria-labelledby="product-categories-heading"
    >
      <div
        className="pointer-events-none absolute -right-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full blur-2xl opacity-80"
        style={{
          background: "radial-gradient(circle, rgba(91,33,182,0.12), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2
            id="product-categories-heading"
            className="font-display text-lg font-semibold tracking-tight text-slate-950 md:text-xl"
          >
            Browse by family
          </h2>
          <p className="mt-1 max-w-xl text-sm text-slate-600">{blurb}</p>
        </div>
        {mode === "category" ? (
          <Link
            href="/products"
            className="shrink-0 text-sm font-semibold text-teal-800 transition hover:text-teal-950 hover:underline"
          >
            ← Full catalogue
          </Link>
        ) : null}
      </div>

      <div className="relative mt-5 flex flex-wrap gap-2.5">
        <CategoryPill href="/products" active={activeSlug === "all"}>
          All products
        </CategoryPill>
        {productCategories.map((c) => (
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
        "inline-flex min-h-[2.75rem] items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold tracking-tight transition-all duration-200 md:min-h-[3rem] md:px-6",
        active
          ? "border-teal-500/55 bg-teal-700 text-white shadow-[0_8px_24px_-10px_rgba(15,118,110,0.35)]"
          : "border-slate-200/90 bg-white/90 text-slate-700 shadow-sm hover:border-teal-400/50 hover:bg-teal-50/80 hover:text-teal-950",
      )}
    >
      {children}
    </Link>
  );
}
