import { cn } from "@/lib/cn";
import { PRODUCT_DETAIL_SECTION_HEADING } from "@/components/products/catalog/productDetailStyles";

type ProductDetailSectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  eyebrowTone?: "green" | "blue";
  className?: string;
  titleId?: string;
};

export function ProductDetailSectionHeading({
  eyebrow,
  title,
  description,
  eyebrowTone = "green",
  className,
  titleId,
}: ProductDetailSectionHeadingProps) {
  return (
    <header className={cn("mb-6 md:mb-7", className)}>
      <p
        className={cn(
          PRODUCT_DETAIL_SECTION_HEADING.eyebrow,
          eyebrowTone === "blue" ? "text-[#9ec8ff]" : "text-accent",
        )}
      >
        {eyebrow}
      </p>
      <h2 id={titleId} className={PRODUCT_DETAIL_SECTION_HEADING.title}>
        {title}
      </h2>
      {description ? (
        <p className={PRODUCT_DETAIL_SECTION_HEADING.body}>{description}</p>
      ) : null}
    </header>
  );
}
