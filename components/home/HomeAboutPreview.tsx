import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function HomeAboutPreview() {
  return (
    <SectionWrapper>
      <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-bg-secondary/60">
        <div className="grid lg:grid-cols-2">
          <RevealOnScroll className="relative min-h-[280px] lg:min-h-[420px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(29,78,216,0.2)), url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80)",
              }}
              role="img"
              aria-label="Scientist reviewing analytical data in a laboratory environment"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent lg:bg-gradient-to-r" />
          </RevealOnScroll>
          <div className="flex flex-col justify-center px-8 py-12 lg:px-12 lg:py-16">
            <RevealOnScroll>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
                Lab excellence
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                Infrastructure built for reproducibility
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                Controlled synthesis suites, redundant characterization, and digital batch records come
                together in an environment designed for traceable science — not just throughput.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-text-secondary">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
                  Dedicated project leadership from kickoff through archival
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
                  Phase-appropriate documentation with ALCOA+ alignment
                </li>
              </ul>
              <div className="mt-8">
                <ButtonLink href="/about" variant="secondary">
                  About HKR
                </ButtonLink>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
