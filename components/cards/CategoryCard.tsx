import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/cn";
import type { ProductCategory } from "@/lib/types";

type CategoryCardProps = {
  category: ProductCategory;
  className?: string;
};

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link href={`/products/${category.slug}`} className={cn("group block", className)}>
      <GlassCard className="relative h-full overflow-hidden p-8">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,0.28) 0%, transparent 70%)",
          }}
        />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-primary">
          Category
        </p>
        <h3 className="mt-3 font-display text-xl font-semibold text-text-primary md:text-2xl">
          {category.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{category.tagline}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-primary transition-transform duration-300 group-hover:translate-x-1">
          Browse catalogue
          <span aria-hidden>→</span>
        </span>
      </GlassCard>
    </Link>
  );
}
