import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const pillars = [
  {
    title: "Analytical first",
    copy: "Characterization packages designed for regulatory and discovery reviewers alike.",
  },
  {
    title: "Transparent batches",
    copy: "Digital records, clear lineage, and reproducible isolation strategies.",
  },
  {
    title: "Scientific partnership",
    copy: "PhD-level route dialogue — not a black-box vendor relationship.",
  },
];

export function LandingWhy() {
  return (
    <section className="relative px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 60}>
              <div className="relative h-full rounded-3xl border border-slate-200/70 bg-white/55 p-6 backdrop-blur-md transition hover:border-sky-200/80 hover:shadow-lg">
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-violet-100 font-mono text-xs font-bold text-sky-800"
                  aria-hidden
                >
                  {String(i + 1)}
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.copy}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
