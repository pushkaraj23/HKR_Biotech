import { cn } from "@/lib/cn";

/** Renders a chemical formula with numeric subscripts (e.g. C₁₂H₁₉ → C12H19 as sub). */
export function MolecularFormulaDisplay({
  formula,
  className,
}: {
  formula: string;
  className?: string;
}) {
  const parts = formula.split(/(\d+)/);

  return (
    <span className={cn("font-mono", className)}>
      {parts.map((part, i) =>
        /^\d+$/.test(part) ? (
          <sub key={i} className="text-[0.82em]">
            {part}
          </sub>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}
