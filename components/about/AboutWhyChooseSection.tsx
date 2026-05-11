import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { aboutDifferentiators, aboutWhyChoose } from "@/data/aboutMarketingContent";
import { cn } from "@/lib/cn";

export function AboutWhyChooseSection() {
  return (
    <section className="relative z-10 mt-20 px-4 sm:px-6 lg:px-8" aria-labelledby="why-choose-heading">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div
            className={cn(
              "overflow-hidden rounded-2xl border border-[#0d2137]/[0.08] shadow-[0_20px_50px_-28px_rgba(2,10,99,0.35)]",
              "bg-[#f0faf6]",
            )}
          >
            <div className="border-b border-[#0d2137]/[0.06] px-8 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1459b8]">Why HKR</p>
              <h2
                id="why-choose-heading"
                className="mt-2 max-w-xl font-display text-4xl font-extrabold tracking-tight text-[#051018] sm:text-5xl md:text-[3.25rem] md:leading-[1.05]"
              >
                {aboutWhyChoose.heading}
              </h2>
              <div className="mt-6 max-w-2xl space-y-4">
                {aboutWhyChoose.paragraphs.map((p, i) => (
                  <p key={i} className="text-lg leading-relaxed text-[#1f4558] md:text-xl md:leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid divide-y divide-[#0d2137]/[0.06] md:grid-cols-3 md:divide-x md:divide-y-0">
              {aboutDifferentiators.map((d, i) => (
                <div key={d.title} className="relative px-8 py-9 sm:px-10 sm:py-10 md:px-8 md:py-10 lg:px-10">
                  <span
                    className="font-mono text-[11px] font-bold tabular-nums tracking-widest text-[#1459b8]/80"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-extrabold tracking-tight text-[#051018] md:text-2xl">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#2d5568] md:text-[1.05rem]">{d.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
