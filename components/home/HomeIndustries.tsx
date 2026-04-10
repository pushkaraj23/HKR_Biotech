import { industries } from "@/data/industries";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function HomeIndustries() {
  return (
    <SectionWrapper id="industries">
      <RevealOnScroll>
        <SectionHeading
          eyebrow="Industries"
          title="Where our chemistry creates momentum"
          subtitle="From large pharma to agile discovery labs, we align deliverables to your governance model and timeline."
        />
      </RevealOnScroll>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind, i) => (
          <RevealOnScroll key={ind.slug} delay={i * 40}>
            <IndustryCard industry={ind} />
          </RevealOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
