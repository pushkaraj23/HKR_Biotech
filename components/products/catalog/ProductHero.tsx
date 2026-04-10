import type { CatalogProduct } from "@/lib/types/catalog";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";

type ProductHeroProps = {
  product: CatalogProduct;
  categoryLabel: string;
  className?: string;
};

export function ProductHero({ product, categoryLabel, className }: ProductHeroProps) {
  const enquiryHref = `/contact?product=${encodeURIComponent(product.catalogNumber)}`;

  return (
    <header
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-teal-200/55 bg-gradient-to-br from-white via-teal-50/20 to-violet-50/15 p-8 shadow-[0_8px_40px_-20px_rgba(15,23,42,0.1)] backdrop-blur-sm md:p-10",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full blur-3xl opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(91,33,182,0.12), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 space-y-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-800">
            {categoryLabel}
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            {product.chemicalName}
          </h1>
          <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:max-w-2xl">
            <div className="rounded-xl border border-white/60 bg-white/70 px-4 py-2.5 shadow-sm backdrop-blur-sm">
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Catalog #</dt>
              <dd className="mt-0.5 font-mono text-slate-900">{product.catalogNumber}</dd>
            </div>
            <div className="rounded-xl border border-white/60 bg-white/70 px-4 py-2.5 shadow-sm backdrop-blur-sm">
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">CAS</dt>
              <dd className="mt-0.5 font-mono text-slate-900">{product.casNumber}</dd>
            </div>
          </dl>
          <p className="max-w-3xl text-base leading-relaxed text-slate-700">{product.shortDescription}</p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
          <ButtonLink href={enquiryHref} variant="primary" className="justify-center px-6 py-3 text-sm">
            Request quotation
          </ButtonLink>
          <ButtonLink href="#enquiry" variant="secondary" className="justify-center px-6 py-3 text-sm">
            Enquiry card
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
