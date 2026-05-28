import Link from "next/link";
import type { ReactNode } from "react";
import { CoaLotSearch } from "@/components/products/catalog/CoaLotSearch";
import { MolecularFormulaDisplay } from "@/components/products/catalog/MolecularFormulaDisplay";
import { productDetailBrandVariant, productDetailSolidPanelClass } from "@/components/products/catalog/productDetailStyles";
import type { CatalogProduct } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";
import { glassButtonCn } from "@/lib/ui/glassButton";

type ProductTechnicalCardsProps = {
  product: CatalogProduct;
  enquiryHref: string;
};

const SPEC_CARD_INDEX = { properties: 0, regulatory: 1, storage: 2, safety: 1 } as const;

export function ProductTechnicalCards({ product, enquiryHref }: ProductTechnicalCardsProps) {
  const sdsHref = product.sdsUrl;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-3">
        <SpecCard title="Properties" cardIndex={SPEC_CARD_INDEX.properties} icon={<BeakerIcon />}>
          <SpecRow cardIndex={SPEC_CARD_INDEX.properties} label="CAS Number" value={product.casNumber || "—"} mono />
          <SpecRow
            cardIndex={SPEC_CARD_INDEX.properties}
            label="Molecular Formula"
            value={<MolecularFormulaDisplay formula={product.molecularFormula || "—"} />}
            mono
          />
          <SpecRow
            cardIndex={SPEC_CARD_INDEX.properties}
            label="Molecular Weight"
            value={product.molecularWeight || "—"}
            mono
          />
          <SpecRow cardIndex={SPEC_CARD_INDEX.properties} label="Chemical Purity" value={product.purity || "—"} />
          <SpecRow cardIndex={SPEC_CARD_INDEX.properties} label="Appearance" value={product.appearance || "—"} />
          {product.solubility ? (
            <SpecRow cardIndex={SPEC_CARD_INDEX.properties} label="Solubility" value={product.solubility} />
          ) : null}
        </SpecCard>

        <SpecCard title="Regulatory" cardIndex={SPEC_CARD_INDEX.regulatory} icon={<ShieldIcon />}>
          {sdsHref ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/68">SDS</p>
              <Link
                href={sdsHref}
                target="_blank"
                rel="noopener noreferrer"
                className={glassButtonCn(
                  "white",
                  "dark",
                  "mt-2 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-base",
                )}
              >
                <PdfIcon />
                SDS PDF
                <span className="text-xs font-normal opacity-80">(new window)</span>
              </Link>
            </div>
          ) : (
            <SpecRow
              cardIndex={SPEC_CARD_INDEX.regulatory}
              label="SDS"
              value={product.sdsAvailable ? "On request" : "—"}
            />
          )}
          <CoaLotSearch
            catalogNumber={product.catalogNumber}
            enquiryHref={enquiryHref}
            lotFormat={product.coaLotFormat}
            coaAvailable={product.coaAvailable}
            onDark
          />
          <SpecRow cardIndex={SPEC_CARD_INDEX.regulatory} label="DSL Status (Canada)" value={product.dslStatus || "None"} />
          <SpecRow
            cardIndex={SPEC_CARD_INDEX.regulatory}
            label="TSCA Certification (US)"
            value={product.tscaCertification || "—"}
          />
          <SpecRow cardIndex={SPEC_CARD_INDEX.regulatory} label="RTECS Number" value={product.rtecsNumber || "N/A"} mono />
        </SpecCard>

        <SpecCard title="Storage & Shipping" cardIndex={SPEC_CARD_INDEX.storage} icon={<TruckIcon />}>
          <SpecRow cardIndex={SPEC_CARD_INDEX.storage} label="Storage" value={product.storageConditions || "—"} />
          <SpecRow
            cardIndex={SPEC_CARD_INDEX.storage}
            label="Shipping"
            value={product.shippingConditions || "Ambient temperature"}
          />
          <SpecRow cardIndex={SPEC_CARD_INDEX.storage} label="Tariff Code (US)" value={product.tariffCode || "—"} mono />
        </SpecCard>
      </div>

      <SpecCard title="Safety" cardIndex={SPEC_CARD_INDEX.safety} icon={<SafetyIcon />} fullWidth>
        <p className="text-base leading-relaxed md:text-lg">
          {product.safetyStatement ||
            "Contact us for GHS classification and safety data for this compound."}
        </p>
      </SpecCard>
    </div>
  );
}

function SpecCard({
  title,
  icon,
  children,
  fullWidth,
  cardIndex,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
  cardIndex: number;
}) {
  const { v, light } = productDetailBrandVariant(cardIndex);
  return (
    <section
      className={cn(productDetailSolidPanelClass(v, light), fullWidth ? "w-full" : "")}
      style={{ backgroundColor: v.surface }}
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              light ? "bg-white/90 text-[#1459b8] ring-1 ring-[#17324d]/10" : "bg-white/16 text-white ring-1 ring-white/28",
            )}
            aria-hidden
          >
            {icon}
          </span>
          <h2 className={cn("font-display text-xl font-bold tracking-tight sm:text-2xl", v.title)}>{title}</h2>
        </div>
        <div className={cn("mt-5 space-y-4", light ? "text-[#234a62]" : "text-white/88")}>{children}</div>
      </div>
    </section>
  );
}

function SpecRow({
  label,
  value,
  mono,
  cardIndex,
}: {
  label: string;
  value: ReactNode;
  mono?: boolean;
  cardIndex: number;
}) {
  const { light } = productDetailBrandVariant(cardIndex);
  return (
    <div className="grid gap-1 sm:grid-cols-[minmax(0,44%)_1fr] sm:items-baseline sm:gap-4">
      <dt
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.14em]",
          light ? "text-[#567089]" : "text-white/68",
        )}
      >
        {label}
      </dt>
      <dd
        className={cn(
          "text-base md:text-lg",
          light ? "text-[#0d2137]" : "text-white",
          mono && (light ? "font-mono text-[#1459b8]" : "font-mono text-[#c8e6ff]"),
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function BeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 3h6" />
      <path d="M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.7-3L14 9V3" />
      <path d="M7.2 14h9.6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </svg>
  );
}

function SafetyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4" />
      <circle cx="12" cy="16" r="0.6" fill="currentColor" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5L13 3.5z" />
    </svg>
  );
}
