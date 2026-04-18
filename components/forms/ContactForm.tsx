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

  const fieldBase =
    "w-full rounded-xl border border-overlay-hover bg-on-dark/[0.06] px-4 py-3 text-sm text-foreground/95 shadow-sm backdrop-blur-sm outline-none transition-all duration-200 placeholder:text-caption-foreground focus:border-primary/40 focus:bg-on-dark/[0.09] focus:ring-2 focus:ring-ring";

  const labelClass =
    "mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
        <div
          className={cn(
            "rounded-2xl p-10 text-center border border-white/10 bg-on-dark/[0.04]",
            className,
          )}
        >
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary-deep shadow-[0_6px_20px_-4px_rgba(20,184,166,0.4)]">
          <span className="text-lg text-foreground" aria-hidden>✓</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground">
          Enquiry received
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Thank you — this demo form does not transmit data. Connect a backend when ready.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 border border-white/15 bg-on-dark/[0.06] text-foreground hover:bg-white/10"
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
        className="mt-6 w-full rounded-full py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 sm:w-auto sm:px-12 bg-white text-light-foreground shadow-[0_8px_24px_-6px_rgba(0,0,0,0.3)] hover:shadow-[0_14px_36px_-8px_rgba(0,0,0,0.4)]"
      >
        Send enquiry
      </button>
    </form>
  );
}
