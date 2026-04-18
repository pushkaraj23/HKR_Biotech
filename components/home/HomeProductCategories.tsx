import { getAllCategories } from "@/data/catalog";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export async function HomeProductCategories() {
  const productCategories = await getAllCategories();
  return (
    <SectionWrapper id="categories">
      <RevealOnScroll>
        <SectionHeading
          eyebrow="Catalogue"
          title="Product categories engineered for discovery and CMC"
          subtitle="Explore our scientific catalogue of high-purity carbohydrates, API impurities, nucleotide building blocks, intermediates, and protecting-group chemistry — each batch supported by analytical data packages."
        />
      </RevealOnScroll>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productCategories.map((cat, i) => (
          <RevealOnScroll key={cat.slug} delay={i * 60}>
            <CategoryCard category={cat} />
          </RevealOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
