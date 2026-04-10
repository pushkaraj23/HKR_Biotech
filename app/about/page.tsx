import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Company overview, vision, leadership, infrastructure, and compliance posture at HKR Biotech Labs.",
};

const leadership = [
  {
    name: "Dr. placeholder — CSO",
    role: "Chief Scientific Officer",
    bio: "Two decades in process chemistry and impurity strategy across global pharma programs.",
  },
  {
    name: "Dr. placeholder — VP Operations",
    role: "VP, Operations & Quality Systems",
    bio: "Laboratory automation, analytical governance, and tech transfer for complex synthesis.",
  },
];

const facilityLines = [
  "Walk-in cold rooms & segregated stabilizer storage",
  "Dedicated prep HPLC farm with fraction barcoding",
  "Inert-atmosphere manifold distribution across hood lines",
  "Secure archival of analytical data packages",
];

const complianceItems = [
  { k: "Quality system", v: "Document-controlled SOPs & training matrix" },
  { k: "Data integrity", v: "ALCOA+ aligned analytical records" },
  { k: "Safety", v: "Process hazard review for scale-up steps" },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-x-hidden pb-24">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.18]" />
      <section className="relative z-10 px-4 pt-6 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-90" aria-hidden>
          <div
            className="absolute -right-[20%] top-0 h-[min(28rem,70vw)] w-[min(28rem,70vw)] rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(20,184,166,0.2), transparent 65%)",
            }}
          />
          <div
            className="absolute -left-[15%] bottom-0 h-[min(24rem,60vw)] w-[min(24rem,60vw)] rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(circle at 55% 55%, rgba(91,33,182,0.14), transparent 68%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-teal-200/70 bg-gradient-to-br from-white via-teal-50/35 to-violet-50/25 p-8 shadow-[0_24px_70px_-32px_rgba(15,118,110,0.18)] backdrop-blur-sm md:p-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,118,110,0.04)_0%,transparent_50%,rgba(91,33,182,0.03)_100%)]"
            aria-hidden
          />
          <RevealOnScroll className="relative">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-teal-800">
              About
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-slate-950 md:text-5xl lg:text-[3.25rem]">
              HKR Biotech Labs —{" "}
              <span className="gradient-text">independent synthesis</span>, enterprise discipline.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-700">
              An advanced synthesis partner blending rigorous analytics with agile chemistry — for teams who
              cannot compromise on traceability.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative mt-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-800">
              Overview
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Company overview
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-700">
              HKR was founded to bridge boutique synthesis shops and slow-moving CMOs — PhD-level scientific
              partnership with industrial discipline.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
            <RevealOnScroll>
              <div className="h-full rounded-3xl border border-teal-200/80 bg-white/90 p-8 shadow-[0_8px_32px_-16px_rgba(15,118,110,0.1)] backdrop-blur-sm transition hover:border-teal-300/80">
                <h3 className="font-display text-xl font-semibold text-slate-950">What we do</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  We design and execute custom syntheses for rare building blocks, API-related impurities, and
                  nucleotide chemistry — with analytical packages that stand up to regulatory scrutiny and
                  discovery sprint timelines alike.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={60}>
              <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_28px_60px_-28px_rgba(2,6,23,0.65)]">
                <div
                  className="absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(20,184,166,0.42) 0%, transparent 68%)",
                  }}
                  aria-hidden
                />
                <div
                  className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(91,33,182,0.28) 0%, transparent 68%)",
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0 opacity-[0.15]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                  aria-hidden
                />
                <div className="relative flex h-full min-h-[280px] flex-col justify-end p-8">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-400">
                    Lab footprint
                  </p>
                  <p className="mt-3 font-display text-xl font-semibold leading-snug text-white">
                    Purpose-built environments for traceable batches — from route scouting to release.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="relative mt-20 border-y border-white/10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-80" aria-hidden>
          <div
            className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-[100px]"
            style={{
              background: "radial-gradient(circle, rgba(20,184,166,0.2), transparent 70%)",
            }}
          />
        </div>
        <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-10">
            <RevealOnScroll>
              <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-400/95">
                  Vision
                </p>
                <h2 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">
                  Chemistry infrastructure that accelerates evidence generation
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300/95">
                  We envision a model where discovery teams can access complex molecules without waiting quarters
                  for a slot — while retaining the documentation depth regulators expect.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={70}>
              <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/90">
                  Mission
                </p>
                <h2 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">
                  Deliver defensible materials with scientific transparency
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300/95">
                  Our mission is to pair reproducible synthesis with analytical storytelling — so every
                  shipment arrives with context, not just a container label.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-800">
              Leadership
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Team
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-700">
              A deliberately senior-heavy scientific staff — fewer handoffs, clearer accountability.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {leadership.map((person, i) => (
              <RevealOnScroll key={person.name} delay={i * 55}>
                <div className="group h-full rounded-3xl border border-teal-200/75 bg-gradient-to-br from-white to-teal-50/40 p-8 shadow-[0_8px_28px_-14px_rgba(15,118,110,0.1)] transition hover:border-violet-300/50 hover:shadow-[0_20px_48px_-24px_rgba(91,33,182,0.12)]">
                  <div className="flex gap-5">
                    <div
                      className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-teal-600 via-violet-600 to-rose-800 shadow-[0_12px_24px_-10px_rgba(15,118,110,0.35)] ring-2 ring-white"
                      aria-hidden
                    />
                    <div>
                      <h3 className="font-display text-lg font-semibold text-slate-950">{person.name}</h3>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-800">
                        {person.role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">{person.bio}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 shadow-[0_32px_80px_-36px_rgba(2,6,23,0.85)] md:p-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(20,184,166,0.15), transparent 55%)",
            }}
            aria-hidden
          />
          <RevealOnScroll className="relative">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-400/95">
              Infrastructure
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
              Laboratory facilities
            </h2>
            <p className="mt-3 max-w-2xl text-slate-300/95">
              Segregated synthesis suites, controlled storage, and redundant characterization — engineered for
              batch continuity.
            </p>
          </RevealOnScroll>
          <ul className="relative mt-10 grid gap-4 sm:grid-cols-2">
            {facilityLines.map((line) => (
              <li key={line} className="flex gap-3 text-sm text-slate-200/95">
                <span
                  className="mt-2 h-1.5 w-5 shrink-0 rounded-full bg-gradient-to-r from-teal-400 to-violet-500"
                  aria-hidden
                />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-800">
              Compliance
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Certifications & posture
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-700">
              Phase-appropriate controls with a roadmap to formal audits where programs demand them.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {complianceItems.map((item, i) => (
              <RevealOnScroll key={item.k} delay={i * 45}>
                <div className="h-full rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-sm transition hover:border-teal-300/60 hover:shadow-md">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {item.k}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-800">{item.v}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <p className="mt-10 text-center text-xs leading-relaxed text-slate-500">
            Formal GMP certification can be pursued via qualified partner sites — HKR orchestrates tech transfer
            when programs require audited batches.
          </p>
        </div>
      </section>

      <section className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-10 text-center shadow-[0_36px_90px_-40px_rgba(2,6,23,0.75)] md:p-14">
          <div
            className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(20,184,166,0.35), transparent 65%)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 right-0 h-80 w-80 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(91,33,182,0.22), rgba(159,18,57,0.1) 45%, transparent 70%)",
            }}
            aria-hidden
          />
          <RevealOnScroll className="relative">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-teal-400/95">
              Next step
            </p>
            <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl font-bold text-white md:text-3xl">
              Tell us about your route or analytical gap
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-300/95">
              We respond with technical questions and realistic timelines — not generic brochures.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" className="rounded-full px-10 shadow-[0_16px_44px_-12px_rgba(20,184,166,0.4)]">
                Start a conversation
              </ButtonLink>
              <ButtonLink
                href="/capabilities"
                variant="secondary"
                className="rounded-full !border-white/30 !bg-white/10 px-10 !text-white backdrop-blur-sm hover:!border-white/45 hover:!bg-white/15"
              >
                View capabilities
              </ButtonLink>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
