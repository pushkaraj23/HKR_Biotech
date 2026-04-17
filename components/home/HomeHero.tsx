import { BrandLogo } from "@/components/brand/BrandLogo";
import { BiotechHeroVisual } from "@/components/hero/BiotechHeroVisual";
import { EnquireGateButtonLink } from "@/components/auth/EnquireGateButtonLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
        <RevealOnScroll>
          <BrandLogo size="hero" priority className="mb-6" />
          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-text-primary md:text-5xl lg:text-[3.25rem]">
            Precision synthesis for{" "}
            <span className="gradient-text">mission-critical</span> chemistry programs
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            Rare building blocks, API-related impurities, and nucleotide chemistry — delivered with
            traceable analytics, controlled environments, and scientific partnership from route to
            release.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/products">Explore products</ButtonLink>
            <EnquireGateButtonLink href="/contact" variant="secondary">
              Enquire now
            </EnquireGateButtonLink>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border-subtle pt-10 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">Analytical depth</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-text-primary">LC–MS / NMR</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">Project model</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-text-primary">FTE / milestone</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-xs uppercase tracking-wider text-text-muted">Focus</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-text-primary">GMP-aware*</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-text-muted">
            *Phase-appropriate; formal GMP campaigns available via tech transfer partners.
          </p>
        </RevealOnScroll>
        <RevealOnScroll className="relative flex justify-center lg:justify-end" delay={80}>
          <div className="relative w-full max-w-md lg:max-w-none">
            <div
              className="absolute inset-0 -z-10 scale-110 rounded-full opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(14,165,233,0.12), transparent 60%)",
              }}
            />
            <BiotechHeroVisual />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
