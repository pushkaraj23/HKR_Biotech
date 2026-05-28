import Image from "next/image";
import { cn } from "@/lib/cn";

type StructurePlaceholderProps = {
  label?: string;
  className?: string;
  compact?: boolean;
  /** Large hero-style area for product cards */
  card?: boolean;
  /** Product detail page — large square, object-contain */
  detail?: boolean;
  imageUrl?: string;
  imageAlt?: string;
};

/** Styled placeholder when no structure image asset is available. */
function sizeClasses(compact: boolean, card: boolean, detail: boolean) {
  if (detail) return "aspect-square min-h-[280px] w-full max-w-none sm:min-h-[360px] lg:min-h-[420px]";
  if (card) return "aspect-square w-full max-w-none";
  if (compact) return "aspect-square max-h-28";
  return "aspect-[4/3] w-full max-w-md";
}

export function StructurePlaceholder({
  label = "Structure",
  className,
  compact = false,
  card = false,
  detail = false,
  imageUrl,
  imageAlt = "Compound structure",
}: StructurePlaceholderProps) {
  const frameClass = cn(
    "relative overflow-hidden bg-white/96 shadow-inner",
    card || detail ? "rounded-none border-0" : "rounded-2xl border border-teal-200/60",
    sizeClasses(compact, card, detail),
    className,
  );

  if (imageUrl) {
    if (card || compact || detail) {
      return (
        <div className={frameClass}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={imageAlt}
            className={cn(
              "absolute inset-0 h-full w-full object-center",
              detail ? "object-contain p-4 sm:p-6" : "object-cover",
            )}
            loading="lazy"
          />
        </div>
      );
    }

    return (
      <div className={frameClass}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 90vw, 480px"
          className="object-contain p-3"
        />
      </div>
    );
  }

  return (
    <div className={cn(frameClass, !card && "border-teal-200/60 bg-gradient-to-br from-slate-50 via-white to-teal-50/40")} aria-hidden>
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
        <span className="text-[10px] font-medium text-caption-foreground">
          {card ? "Add structure image in admin" : "Placeholder — supply .mol / .cdx"}
        </span>
      </div>
    </div>
  );
}
