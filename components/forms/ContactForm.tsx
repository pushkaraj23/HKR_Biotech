"use client";

import { FormEvent, useState } from "react";
import { cn } from "@/lib/cn";

type ContactFormProps = {
  className?: string;
  defaultProductRef?: string;
};

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-text-primary shadow-sm placeholder:text-text-muted outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/25";

export function ContactForm({ className, defaultProductRef = "" }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("glass-panel rounded-3xl p-8", className)}
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
            Your name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} autoComplete="name" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            autoComplete="email"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="organization" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
            Organization
          </label>
          <input id="organization" name="organization" type="text" className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="product" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
            Product / catalogue reference (optional)
          </label>
          <input
            id="product"
            name="product"
            type="text"
            defaultValue={defaultProductRef}
            className={inputClass}
            placeholder="e.g. HKR catalogue ID or CAS"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className={cn(inputClass, "resize-y min-h-[120px]")}
            placeholder="Describe purity, quantity, and timeline."
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 w-full rounded-2xl bg-[linear-gradient(90deg,#0284c7,#1d4ed8)] py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_-4px_rgba(3,105,161,0.4)] transition hover:brightness-[1.03]"
      >
        Send enquiry
      </button>
      {status === "sent" ? (
        <p className="mt-4 text-center text-sm text-accent-primary" role="status">
          Thank you — this demo form does not transmit data. Connect a backend when ready.
        </p>
      ) : null}
    </form>
  );
}
