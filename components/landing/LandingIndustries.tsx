import Link from "next/link";
import { industries } from "@/data/industries";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function LandingIndustries() {
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/40 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-xl md:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(14,165,233,0.12), transparent 50%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(99,102,241,0.1), transparent 55%)",
          }}
          aria-hidden
        />
        <RevealOnScroll className="relative">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-slate-500">
            Industries
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Where this chemistry lands
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            From pharma CMC to oligo programs — we align deliverables to your governance model.
          </p>
        </RevealOnScroll>

        <div className="relative mt-10 flex flex-wrap gap-3">
          {industries.map((ind, i) => (
            <RevealOnScroll key={ind.slug} delay={i * 45}>
              <Link
                href={`/industries#${ind.slug}`}
                className="group inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200/90 bg-white/75 px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition hover:border-sky-400/40 hover:bg-white hover:shadow-md"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 opacity-80"
                  aria-hidden
                />
                {ind.title}
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="relative mt-8">
          <Link href="/industries" className="text-sm font-semibold text-sky-800 hover:text-sky-950">
            Industry overview →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
