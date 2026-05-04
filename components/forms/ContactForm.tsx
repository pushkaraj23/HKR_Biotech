"use client";

import { type FormEvent, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { cn } from "@/lib/cn";

type ContactFormProps = {
  className?: string;
  defaultProductRef?: string;
  enquirySource?: string;
  dark?: boolean;
  /** Mint/white panels (e.g. product PDP enquiry band) — high-contrast fields matching site palette. */
  tone?: "default" | "brandLight" | "brandGreen";
};

type SubmitState = "idle" | "submitting" | "sent";

export function ContactForm({
  className,
  defaultProductRef = "",
  enquirySource = "website",
  dark = false,
  tone = "default",
}: ContactFormProps) {
  const { user } = useAuth();
  const [status, setStatus] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  const brandLight = tone === "brandLight" && !dark;
  const brandGreen = tone === "brandGreen" && !dark;
  const brandPanel = brandLight || brandGreen;

  const fieldBase = cn(
    "w-full rounded-xl border px-4 py-3 text-sm shadow-sm outline-none transition-all duration-200 focus:ring-2",
    dark
      ? "border-on-dark/28 bg-[rgba(18,25,35,0.5)] text-on-dark backdrop-blur-sm placeholder:text-on-dark/50 focus:border-primary/55 focus:bg-[rgba(18,25,35,0.66)] focus:ring-primary/25"
      : brandGreen
        ? "border-white/35 bg-white/94 text-[#0a2130] placeholder:text-[#4f6478] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] focus:border-emerald-400/70 focus:bg-white focus:ring-emerald-300/35"
        : brandLight
          ? "border-[#17324d]/14 bg-white/95 text-[#0d2137] placeholder:text-[#567089] focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/22"
          : "border-overlay-hover bg-on-dark/[0.06] text-foreground/95 backdrop-blur-sm placeholder:text-caption-foreground focus:border-primary/40 focus:bg-on-dark/[0.09] focus:ring-ring",
  );

  const labelClass = cn(
    "mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em]",
    dark
      ? "text-on-dark/75"
      : brandGreen
        ? "text-emerald-50/95 [text-shadow:0_1px_10px_rgba(0,40,30,0.35)]"
        : brandLight
          ? "text-[#1459b8]"
          : "text-muted-foreground",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      organization: String(data.get("organization") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      reference: String(data.get("reference") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      source: String(data.get("source") ?? "").trim() || enquirySource,
    };

    try {
      const token = user ? await user.getIdToken() : null;
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        throw new Error(body?.error || "Could not submit enquiry. Please try again.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Could not submit enquiry. Please try again.");
    }
  }

  if (status === "sent") {
    return (
        <div
          className={cn(
            "rounded-2xl p-10 text-center border",
            dark
              ? "border-on-dark/25 bg-[rgba(18,25,35,0.5)]"
              : brandGreen
                ? "border-emerald-200/40 bg-white/96 shadow-[0_12px_36px_-12px_rgba(8,105,78,0.25)]"
                : brandLight
                  ? "border-[#17324d]/12 bg-white/95 shadow-[0_12px_32px_-14px_rgba(23,50,77,0.12)]"
                  : "border-white/10 bg-on-dark/[0.04]",
            className,
          )}
        >
        <div
          className={cn(
            "mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full shadow-[0_6px_20px_-4px_rgba(26,115,232,0.35)]",
            brandLight || brandGreen
              ? "bg-cta-gradient text-primary-foreground"
              : "bg-primary-deep shadow-[0_6px_20px_-4px_rgba(20,184,166,0.4)]",
          )}
        >
          <span
            className={cn("text-lg", brandLight || brandGreen ? "text-primary-foreground" : "text-foreground")}
            aria-hidden
          >
            ✓
          </span>
        </div>
        <h3
          className={cn(
            "font-display text-lg font-semibold",
            dark ? "text-on-dark" : brandPanel ? "text-[#0d2137]" : "text-foreground",
          )}
        >
          Enquiry received
        </h3>
        <p
          className={cn(
            "mx-auto mt-2 max-w-md text-sm",
            dark ? "text-on-dark/80" : brandPanel ? "text-[#234a62]" : "text-muted-foreground",
          )}
        >
          Thank you. We have logged your request and will follow up shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={cn(
            "mt-5 rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 border",
            dark
              ? "border-on-dark/35 bg-[rgba(18,25,35,0.56)] text-on-dark hover:bg-[rgba(18,25,35,0.7)]"
              : brandGreen
                ? "border-emerald-400/40 bg-white text-[#0d5c45] hover:border-emerald-500/50 hover:bg-emerald-50/90"
                : brandLight
                  ? "border-primary/25 bg-white text-[#1459b8] hover:border-primary/40 hover:bg-[#f0f7ff]"
                  : "border-white/15 bg-on-dark/[0.06] text-foreground hover:bg-white/10",
          )}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-0", className)} noValidate>
      <input type="hidden" name="source" value={enquirySource} />
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
          <label htmlFor="cf-phone" className={labelClass}>Phone</label>
          <input id="cf-phone" name="phone" type="tel" className={fieldBase} autoComplete="tel" placeholder="+1 555 010 4420" />
        </div>
        <div>
          <label htmlFor="cf-reference" className={labelClass}>Reference</label>
          <input id="cf-reference" name="reference" type="text" defaultValue={defaultProductRef} className={fieldBase} placeholder="e.g. HKR-CB-001 or service name" />
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
      {error ? (
        <p
          className={cn(
            "mt-4 rounded-xl border px-3 py-2 text-sm",
            dark
              ? "border-danger/45 bg-danger/10 text-on-dark"
              : brandGreen || brandLight
                ? "border-[#c43b2e]/30 bg-white text-[#0d2137]"
                : "border-danger/25 bg-danger/10 text-danger",
          )}
        >
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "mt-6 w-full rounded-full py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto sm:px-12",
          dark || brandPanel
            ? "bg-cta-gradient text-primary-foreground shadow-primary-glow hover:shadow-primary-glow-lg"
            : "bg-white text-light-foreground shadow-[0_8px_24px_-6px_rgba(0,0,0,0.3)] hover:shadow-[0_14px_36px_-8px_rgba(0,0,0,0.4)]",
        )}
      >
        {status === "submitting" ? "Sending..." : "Send enquiry"}
      </button>
    </form>
  );
}
