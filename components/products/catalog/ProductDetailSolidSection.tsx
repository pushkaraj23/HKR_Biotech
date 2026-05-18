import type { ReactNode } from "react";
import {
  productDetailBrandVariant,
  productDetailSolidPanelClass,
} from "@/components/products/catalog/productDetailStyles";
import { cn } from "@/lib/cn";

type ProductDetailSolidSectionProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  colorIndex: number;
  className?: string;
};

export function ProductDetailSolidSection({
  eyebrow,
  title,
  children,
  colorIndex,
  className,
}: ProductDetailSolidSectionProps) {
  const { v, light } = productDetailBrandVariant(colorIndex);

  return (
    <section
      className={cn(productDetailSolidPanelClass(v, light), "p-7 sm:p-8", className)}
      style={{ backgroundColor: v.surface }}
    >
      <p className={cn("font-mono text-[10px] font-semibold uppercase tracking-[0.28em]", v.eyebrow)}>
        {eyebrow}
      </p>
      <h2 className={cn("mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl", v.title)}>
        {title}
      </h2>
      <div className={cn("mt-4", light ? "text-[#234a62]" : "text-white/88")}>{children}</div>
    </section>
  );
}

type ProductDetailSolidBulletListProps = {
  items: string[];
  colorIndex: number;
};

export function ProductDetailSolidBulletList({ items, colorIndex }: ProductDetailSolidBulletListProps) {
  const { v, light } = productDetailBrandVariant(colorIndex);

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-relaxed md:text-lg">
          <span className={cn(v.bullet, light ? "mt-2.5" : "mt-2.5")} aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}
