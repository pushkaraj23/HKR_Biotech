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
};

export function ProductSpecsTable({ product, className }: ProductSpecsTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-teal-200/50 bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm",
        className,
      )}
    >
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Technical specifications for {product.chemicalName}</caption>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-slate-100/90 last:border-b-0 odd:bg-teal-50/20"
            >
              <th
                scope="row"
                className="w-[38%] px-4 py-3 font-medium text-slate-600 sm:w-[32%] md:px-5"
              >
                {row.label}
              </th>
              <td className="px-4 py-3 font-mono text-[13px] text-slate-900 md:px-5">
                {row.get(product)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
