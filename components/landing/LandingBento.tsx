import Link from "next/link";
import { capabilitySections } from "@/data/capabilities";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const bentoBlocks = capabilitySections.flatMap((s) =>
  s.blocks.map((b) => ({ ...b, section: s.heading })),
).slice(0, 5);

export function LandingBento() {
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-violet-700/80">
            Infrastructure
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            A lattice of controlled environments & instrumentation
          </h2>
        </RevealOnScroll>

        <div className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-6">
          {bentoBlocks.map((block, i) => {
            const spans = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2"][i] ?? "md:col-span-2";
            return (
              <RevealOnScroll key={`${block.title}-${i}`} delay={i * 55} className={spans}>
                <article
                  className={`relative h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white/90 to-slate-50/80 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-[0_16px_40px_-20px_rgba(99,102,241,0.2)] ${i === 0 ? "md:min-h-[220px]" : ""}`}
                >
                  <div
                    className="pointer-events-none absolute -bottom-10 right-0 h-40 w-40 rounded-full blur-3xl opacity-50"
                    style={{
                      background:
                        i % 2 === 0
                          ? "radial-gradient(circle, rgba(14,165,233,0.15), transparent 70%)"
                          : "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)",
                    }}
                    aria-hidden
                  />
                  <p className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                    {block.section}
                  </p>
                  <h3 className="relative mt-3 font-display text-lg font-semibold text-slate-900">
                    {block.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-600">
                    {block.description}
                  </p>
                  {block.metrics && block.metrics.length > 0 ? (
                    <dl className="relative mt-4 flex flex-wrap gap-3">
                      {block.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-xl border border-slate-200/80 bg-white/70 px-3 py-2 text-xs"
                        >
                          <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                            {m.label}
                          </dt>
                          <dd className="font-semibold text-slate-800">{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </article>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll className="mt-10 flex justify-center">
          <Link
            href="/capabilities"
            className="rounded-full border border-slate-200 bg-white/80 px-8 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900"
          >
            All capabilities →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
