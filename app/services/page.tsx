import type { Metadata } from "next";
import { serviceSections, servicesPageHero } from "@/data/servicesPageContent";
import { ServiceSectionCard } from "@/components/services/ServiceSectionCard";
import { ServicesCommitmentSection } from "@/components/services/ServicesCommitmentSection";
import { ServicesPartnerSection } from "@/components/services/ServicesPartnerSection";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BRAND_SOLID_CARD_CYCLE } from "@/lib/ui/brandSolidCardCycle";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Precision carbohydrate and nucleoside chemistry at HKR Biotech Pvt. Ltd: custom glycan synthesis, DNA/RNA building blocks, NMR analysis, and glycoconjugation services.",
};

export default function ServicesPage() {
  return (
    <div className="relative overflow-x-hidden bg-[#020A63]">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <header className="py-10 md:py-12">
            <h1 className="text-balance font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-on-dark sm:text-4xl md:text-[2.75rem] md:leading-[1.1] lg:text-5xl">
              {servicesPageHero.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-on-dark/88 md:mt-8 md:text-xl md:leading-relaxed">
              {servicesPageHero.intro}
            </p>
            <div className="mt-8 md:mt-10">
              <ButtonLink href={servicesPageHero.primaryCtaHref} className="rounded-full px-10 py-3.5 text-base shadow-primary-glow">
                {servicesPageHero.primaryCtaLabel}
              </ButtonLink>
            </div>
          </header>
        </RevealOnScroll>

        <div id="service-areas" className="scroll-mt-28 space-y-8 md:space-y-10">
          {serviceSections.map((section, i) => (
            <RevealOnScroll key={section.number} delay={i * 50}>
              <ServiceSectionCard
                section={section}
                variant={BRAND_SOLID_CARD_CYCLE[i % BRAND_SOLID_CARD_CYCLE.length]}
                styleIndex={i}
              />
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-10 space-y-8 md:mt-12 md:space-y-10">
          <RevealOnScroll>
            <ServicesCommitmentSection />
          </RevealOnScroll>
          <RevealOnScroll>
            <ServicesPartnerSection />
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
