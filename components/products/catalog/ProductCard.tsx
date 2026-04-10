import Link from "next/link";
import type { CatalogProduct } from "@/lib/types/catalog";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import { StructurePlaceholder } from "./StructurePlaceholder";

type ProductCardProps = {
  product: CatalogProduct;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const detailHref = `/products/${product.categorySlug}/${product.slug}`;
  const enquiryHref = `/contact?product=${encodeURIComponent(product.catalogNumber)}`;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-teal-200/70",
        "bg-gradient-to-b from-white via-white to-teal-50/30",
        "shadow-[0_6px_28px_-14px_rgba(15,118,110,0.12)] backdrop-blur-sm transition duration-300",
        "hover:-translate-y-0.5 hover:border-teal-400/55 hover:shadow-[0_22px_48px_-28px_rgba(15,118,110,0.2)]",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex gap-4">
          <StructurePlaceholder compact className="h-[5.5rem] w-[5.5rem] shrink-0 rounded-2xl" />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-base font-semibold leading-snug text-slate-950 md:text-lg">
              <Link href={detailHref} className="transition-colors hover:text-teal-800">
                {product.chemicalName}
              </Link>
            </h3>
            <p className="mt-1 font-mono text-[11px] text-slate-500">{product.catalogNumber}</p>
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
          <div className="rounded-xl border border-white/70 bg-white/60 px-3 py-2">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">CAS</dt>
            <dd className="font-mono text-[13px] text-slate-900">{product.casNumber}</dd>
          </div>
          <div className="rounded-xl border border-white/70 bg-white/60 px-3 py-2">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Formula</dt>
            <dd className="font-mono text-[13px] text-slate-900">{product.molecularFormula}</dd>
          </div>
          <div className="sm:col-span-2 rounded-xl border border-white/70 bg-white/60 px-3 py-2">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Purity</dt>
            <dd className="text-[13px] font-medium text-teal-900">{product.purity}</dd>
          </div>
        </dl>

        <p className="line-clamp-3 text-sm leading-relaxed text-slate-700">{product.shortDescription}</p>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-teal-100/80 bg-teal-50/20 px-6 py-4">
        <ButtonLink href={detailHref} variant="secondary" className="px-5 py-2.5 text-xs">
          View details
        </ButtonLink>
        <ButtonLink href={enquiryHref} variant="primary" className="px-5 py-2.5 text-xs">
          Enquire
        </ButtonLink>
      </div>
    </article>
  );
}
