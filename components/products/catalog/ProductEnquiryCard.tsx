import Link from "next/link";
import type { CatalogProduct } from "@/lib/types/catalog";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";

type ProductEnquiryCardProps = {
  product: CatalogProduct;
  categoryLabel: string;
  className?: string;
};

export function ProductEnquiryCard({ product, categoryLabel, className }: ProductEnquiryCardProps) {
  const href = `/contact?product=${encodeURIComponent(product.catalogNumber)}`;
  const summary = [
    `Catalogue: ${product.catalogNumber}`,
    `Product: ${product.chemicalName}`,
    `Family: ${categoryLabel}`,
    `CAS: ${product.casNumber}`,
  ].join("\n");

  return (
    <aside
      id="enquiry"
      className={cn(
        "scroll-mt-28 rounded-[1.75rem] border border-teal-200/60 bg-gradient-to-br from-white via-teal-50/30 to-violet-50/15 p-6 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.15)] backdrop-blur-md md:p-8",
        className,
      )}
    >
      <h2 className="font-display text-xl font-semibold text-slate-950">Product enquiry</h2>
      <p className="mt-2 text-sm text-slate-600">
        We route RFQs to our technical team — include purity, quantity band, and analytical expectations.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-inner">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pre-filled context</p>
        <pre
          className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-slate-800"
          tabIndex={0}
        >
          {summary}
        </pre>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <ButtonLink href={href} variant="primary" className="justify-center px-6 py-3 text-sm">
          Open contact form
        </ButtonLink>
        <Link
          href={`mailto:enquiries@hkrbio.tech?subject=${encodeURIComponent(`RFQ ${product.catalogNumber}`)}&body=${encodeURIComponent(summary + "\n\n")}`}
          className="text-center text-sm font-medium text-teal-800 underline-offset-4 hover:underline"
        >
          Email with this context
        </Link>
      </div>
    </aside>
  );
}
