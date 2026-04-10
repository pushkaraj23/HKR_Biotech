import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <GlassCard className={cn("flex h-full flex-col", className)}>
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold leading-snug text-text-primary">
            <Link
              href={`/products/${product.categorySlug}/${product.id}`}
              className="hover:text-accent-primary transition-colors"
            >
              {product.chemicalName}
            </Link>
          </h3>
          <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-text-muted">CAS</dt>
              <dd className="font-mono text-text-secondary">{product.casNumber}</dd>
            </div>
            <div>
              <dt className="text-text-muted">Formula</dt>
              <dd className="font-mono text-text-secondary">{product.molecularFormula}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-text-muted">Purity</dt>
              <dd className="text-accent-secondary">{product.purity}</dd>
            </div>
          </dl>
        </div>
        <p className="text-sm leading-relaxed text-text-secondary">{product.shortDescription}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink
          href={`/contact?product=${encodeURIComponent(product.id)}`}
          variant="primary"
          className="px-5 py-2.5 text-xs"
        >
          Request quote
        </ButtonLink>
        <ButtonLink
          href={`/products/${product.categorySlug}/${product.id}`}
          variant="secondary"
          className="px-5 py-2.5 text-xs"
        >
          Technical detail
        </ButtonLink>
      </div>
    </GlassCard>
  );
}
