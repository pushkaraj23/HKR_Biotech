import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { mainNav } from "@/data/navigation";

const flatLinks = mainNav.map((item) => ({
  href: item.href,
  label: item.label,
}));

export function Footer() {
  return (
    <footer className="relative mt-16 px-3 pb-8 sm:px-5 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-8 h-48 w-[min(78rem,92vw)] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 10%, rgba(56,189,248,0.22), rgba(99,102,241,0.12) 45%, transparent 72%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full blur-[90px]"
        style={{
          background: "radial-gradient(circle, rgba(14,165,233,0.15), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(120deg,rgba(15,23,42,0.92),rgba(15,23,42,0.84)_45%,rgba(30,41,59,0.88))] px-5 py-10 shadow-[0_20px_48px_-18px_rgba(2,6,23,0.7)] backdrop-blur-2xl sm:px-8 sm:py-12">
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="inline-flex rounded-full border border-white/35 bg-white px-4 py-2.5 shadow-[0_10px_24px_-14px_rgba(2,6,23,0.6)]">
              <BrandLogo size="md" priority={false} />
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-200/85">
              Advanced synthesis, analytical depth, and documentation discipline — built for teams who
              ship evidence, not just samples.
            </p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.35em] text-slate-400/85">
              HKR · Biotech Labs
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Navigate
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {flatLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-200/90 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Contact
              </h2>
              <address className="mt-4 not-italic text-sm leading-relaxed text-slate-200/90">
                <p>enquiries@hkrbio.tech</p>
                <p className="mt-2">+1 (555) 010-4420</p>
              </address>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-1 rounded-full border border-sky-300/35 bg-sky-500/90 px-4 py-1.5 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_rgba(56,189,248,0.9)] transition hover:-translate-y-0.5 hover:bg-sky-400"
              >
                Request RFQ
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-300/80">
            © {new Date().getFullYear()} HKR Biotech Labs. All rights reserved.
          </p>
          <p className="max-w-md text-right text-[11px] leading-relaxed text-slate-400/90">
            Headquarters &amp; analytical hub — [address placeholder]
          </p>
        </div>
      </div>
    </footer>
  );
}
