"use client";

import { type FormEvent, useState } from "react";
import { cn } from "@/lib/cn";

type ContactFormProps = {
  className?: string;
  defaultProductRef?: string;
  dark?: boolean;
};

export function ContactForm({ className, defaultProductRef = "", dark = false }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const fieldBase = dark
    ? "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white shadow-sm backdrop-blur-sm outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-teal-500/40 focus:bg-white/[0.09] focus:shadow-[0_0_0_3px_rgba(20,184,166,0.12)]"
    : "w-full rounded-xl border border-white/60 bg-white/75 px-4 py-3 text-sm text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_8px_-4px_rgba(15,23,42,0.06)] backdrop-blur-xl outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-teal-500/60 focus:bg-white/90 focus:shadow-[0_0_0_3px_rgba(20,184,166,0.15)]";

  const labelClass = dark
    ? "mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400"
    : "mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div
        className={cn(
          "rounded-2xl p-10 text-center",
          dark
            ? "border border-white/10 bg-white/[0.04]"
            : "border border-white/60 bg-white/60 backdrop-blur-xl",
          className,
        )}
      >
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 shadow-[0_6px_20px_-4px_rgba(20,184,166,0.4)]">
          <span className="text-lg text-white" aria-hidden>✓</span>
        </div>
        <h3 className={cn("font-display text-lg font-semibold", dark ? "text-white" : "text-slate-950")}>
          Enquiry received
        </h3>
        <p className={cn("mx-auto mt-2 max-w-md text-sm", dark ? "text-slate-400" : "text-slate-600")}>
          Thank you — this demo form does not transmit data. Connect a backend when ready.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={cn(
            "mt-5 rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5",
            dark
              ? "border border-white/15 bg-white/[0.06] text-white hover:bg-white/10"
              : "border border-white/60 bg-white/70 text-slate-800 shadow-sm backdrop-blur-lg hover:shadow-md",
          )}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-0", className)} noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>Name</label>
          <input id="cf-name" name="name" type="text" required className={fieldBase} autoComplete="name" placeholder="Jane Smith" />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>Work email</label>
          <input id="cf-email" name="email" type="email" required className={fieldBase} autoComplete="email" placeholder="jane@company.com" />
        </div>
        <div>
          <label htmlFor="cf-org" className={labelClass}>Organization</label>
          <input id="cf-org" name="organization" type="text" className={fieldBase} placeholder="Pharma Corp" />
        </div>
        <div>
          <label htmlFor="cf-product" className={labelClass}>Product ref</label>
          <input id="cf-product" name="product" type="text" defaultValue={defaultProductRef} className={fieldBase} placeholder="e.g. HKR-CB-001" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="cf-message" className={labelClass}>Message</label>
          <textarea
            id="cf-message"
            name="message"
            rows={4}
            required
            className={cn(fieldBase, "min-h-[100px] resize-y")}
            placeholder="Describe purity, quantity band, and timeline."
          />
        </div>
      </div>
      <button
        type="submit"
        className={cn(
          "mt-6 rounded-full py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 sm:w-auto sm:px-12",
          dark
            ? "w-full bg-white text-slate-950 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.3)] hover:shadow-[0_14px_36px_-8px_rgba(0,0,0,0.4)]"
            : "w-full bg-[linear-gradient(135deg,#0f766e,#14b8a6)] text-white shadow-[0_14px_40px_-10px_rgba(15,118,110,0.45)] hover:shadow-[0_18px_48px_-12px_rgba(15,118,110,0.5)]",
        )}
      >
        Send enquiry
      </button>
    </form>
  );
}
