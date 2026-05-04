import type { CatalogProduct } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";

const rows: { label: string; get: (p: CatalogProduct) => string }[] = [
  { label: "Catalog number", get: (p) => p.catalogNumber },
  { label: "CAS RN", get: (p) => p.casNumber },
  { label: "Molecular formula", get: (p) => p.molecularFormula },
  { label: "Molecular weight", get: (p) => p.molecularWeight },
  { label: "Purity", get: (p) => p.purity },
  { label: "Appearance", get: (p) => p.appearance },
  { label: "Availability", get: (p) => p.availability },
];

type ProductSpecsTableProps = {
  product: CatalogProduct;
  className?: string;
  /** Light mint/white table for contrast on dark blue panels. */
  variant?: "dark" | "insetLight";
};

export function ProductSpecsTable({ product, className, variant = "dark" }: ProductSpecsTableProps) {
  const light = variant === "insetLight";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border backdrop-blur-md",
        light
          ? "border-[#17324d]/12 bg-white/95 shadow-[0_10px_28px_-12px_rgba(23,50,77,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]"
          : "border-on-dark/20 bg-[rgba(18,25,35,0.5)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--on-dark)_12%,transparent)]",
        className,
      )}
    >
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Technical specifications for {product.chemicalName}</caption>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className={cn(
                "border-b last:border-b-0",
                light
                  ? "border-[#17324d]/10 odd:bg-[#f3faf7]/90"
                  : "border-on-dark/16 odd:bg-on-dark/[0.03]",
              )}
            >
              <th
                scope="row"
                className={cn(
                  "w-[38%] px-4 py-3 font-medium sm:w-[32%] md:px-5",
                  light ? "text-[#4f6478]" : "text-on-dark/72",
                )}
              >
                {row.label}
              </th>
              <td
                className={cn(
                  "px-4 py-3 font-mono text-[13px] md:px-5",
                  light ? "font-semibold text-[#0d2137]" : "text-on-dark",
                )}
              >
                {row.get(product)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
