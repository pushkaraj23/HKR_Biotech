import { cn } from "@/lib/cn";

type StructurePlaceholderProps = {
  label?: string;
  className?: string;
  compact?: boolean;
};

/** Styled placeholder when no structure image asset is available. */
export function StructurePlaceholder({
  label = "Structure",
  className,
  compact = false,
}: StructurePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-teal-200/60 bg-gradient-to-br from-slate-50 via-white to-teal-50/40 shadow-inner",
        compact ? "aspect-square max-h-28" : "aspect-[4/3] w-full max-w-md",
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15,118,110,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,118,110,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "18px 18px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(91,33,182,0.08),transparent_50%)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-3 text-center">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.35em] text-teal-800/80">
          {label}
        </span>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />
        <span className="text-[10px] font-medium text-slate-500">Placeholder — supply .mol / .cdx</span>
      </div>
    </div>
  );
}
