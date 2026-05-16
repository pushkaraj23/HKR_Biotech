import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { aboutWhyChoose } from "@/data/aboutMarketingContent";
import { cn } from "@/lib/cn";

export function AboutWhyChooseSection() {
  return (
    <section className="relative z-10 mt-24 px-4 sm:px-6 lg:px-8" aria-labelledby="why-choose-heading">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <article
            className={cn(
              "overflow-hidden rounded-[2rem] border border-white/40 shadow-[0_24px_56px_-20px_rgba(2,10,99,0.45)]",
              "bg-[#f0faf6]",
            )}
          >
            <div className="px-8 py-12 sm:px-12 sm:py-14 md:px-14 md:py-16">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1459b8]">Why Choose Us</p>
              <h2
                id="why-choose-heading"
                className="mt-3 max-w-4xl font-display text-3xl font-extrabold tracking-tight text-[#051018] sm:text-4xl md:text-5xl md:leading-[1.05]"
              >
                {aboutWhyChoose.heading}
              </h2>
              <div className="mt-8 max-w-4xl space-y-6">
                {aboutWhyChoose.paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-[#1f4558] sm:text-lg sm:leading-relaxed md:text-xl md:leading-[1.65]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </RevealOnScroll>
      </div>
    </section>
  );
}
