"use client";

import { type FormEvent, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  quoteCdaOptions,
  quoteServiceOptions,
} from "@/data/contactPageContent";
import { cn } from "@/lib/cn";

type ContactFormProps = {
  className?: string;
  defaultProductRef?: string;
  enquirySource?: string;
  dark?: boolean;
  /** Mint/white panels (e.g. product PDP enquiry band) — high-contrast fields matching site palette. */
  tone?: "default" | "brandLight" | "brandGreen";
  /** Contact page: full RFQ fields (service, CDA, quantity, file names). */
  rfqLayout?: boolean;
};

type SubmitState = "idle" | "submitting" | "sent";

function RfqQuoteFields({
  fieldBase,
  labelClass,
  hintClassName,
  defaultProductRef,
}: {
  fieldBase: string;
  labelClass: string;
  hintClassName: string;
  defaultProductRef: string;
}) {
  const selectExtra = cn(
    fieldBase,
    "cursor-pointer appearance-none bg-[length:1rem_1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10",
  );

  return (
    <>
      <div className="md:col-span-2">
        <label htmlFor="cf-service" className={labelClass}>
          Service required
        </label>
        <select
          id="cf-service"
          name="serviceRequired"
          required
          defaultValue=""
          className={selectExtra}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2314519d'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          }}
        >
          <option value="" disabled>
            Select a service…
          </option>
          {quoteServiceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cf-cda" className={labelClass}>
          CDA required?
        </label>
        <select
          id="cf-cda"
          name="cdaRequired"
          required
          defaultValue=""
          className={selectExtra}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2314519d'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          }}
        >
          <option value="" disabled>
            Select one…
          </option>
          {quoteCdaOptions.map((opt) => (
            <option key={opt.value} value={opt.label}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cf-quantity" className={labelClass}>
          Quantity (unit)
        </label>
        <input
          id="cf-quantity"
          name="quantity"
          type="text"
          className={fieldBase}
          placeholder="e.g. 250 mg · 5 g · kg-scale enquiry"
          autoComplete="off"
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cf-structure" className={labelClass}>
          Message / structure details{" "}
          <span className="font-normal lowercase tracking-normal opacity-85">(required)</span>
        </label>
        <textarea
          id="cf-structure"
          name="message"
          rows={5}
          required
          className={cn(fieldBase, "min-h-[120px] resize-y")}
          placeholder="CAS, chemical name, image with chemical structure, SMILES, purity target, timeline…"
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cf-ref-rfq" className={labelClass}>
          Catalogue reference (optional)
        </label>
        <input
          id="cf-ref-rfq"
          name="reference"
          type="text"
          defaultValue={defaultProductRef}
          className={fieldBase}
          placeholder="e.g. HKR catalogue number"
          autoComplete="off"
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cf-files" className={labelClass}>
          File upload <span className="font-normal lowercase tracking-normal opacity-85">(optional)</span>
        </label>
        <input
          id="cf-files"
          name="attachments"
          type="file"
          multiple
          className={cn(
            fieldBase,
            "cursor-pointer py-2.5 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[linear-gradient(to_right,var(--primary),color-mix(in_srgb,var(--primary)_82%,var(--accent)))] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white",
          )}
        />
        <p className={cn("mt-2 text-xs leading-relaxed", hintClassName)}>
          Filenames are included with your inquiry. For large attachments, please follow up by email once we reply.
        </p>
      </div>
    </>
  );
}

export function ContactForm({
  className,
  defaultProductRef = "",
  enquirySource = "website",
  dark = false,
  tone = "default",
  rfqLayout = false,
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
    const attachmentsInput = form.querySelector<HTMLInputElement>('input[name="attachments"]');
    const fileNames =
      attachmentsInput?.files?.length && attachmentsInput.files.length > 0
        ? Array.from(attachmentsInput.files)
            .map((f) => f.name)
            .join(", ")
        : "";

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      organization: String(data.get("organization") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      reference: String(data.get("reference") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      source: String(data.get("source") ?? "").trim() || enquirySource,
      ...(rfqLayout
        ? {
            serviceRequired: String(data.get("serviceRequired") ?? "").trim(),
            cdaRequired: String(data.get("cdaRequired") ?? "").trim(),
            quantity: String(data.get("quantity") ?? "").trim(),
            ...(fileNames ? { attachments: fileNames } : {}),
          }
        : {}),
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
          <label htmlFor="cf-name" className={labelClass}>
            Name
          </label>
          <input id="cf-name" name="name" type="text" required className={fieldBase} autoComplete="name" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email address
          </label>
          <input id="cf-email" name="email" type="email" required className={fieldBase} autoComplete="email" placeholder="you@organization.com" />
        </div>
        <div>
          <label htmlFor="cf-org" className={labelClass}>
            {rfqLayout ? "Organization / university" : "Organization"}
          </label>
          <input
            id="cf-org"
            name="organization"
            type="text"
            className={fieldBase}
            placeholder={rfqLayout ? "Company or institution name" : "Pharma Corp"}
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            Phone <span className="font-normal tracking-normal opacity-80">(optional)</span>
          </label>
          <input id="cf-phone" name="phone" type="tel" className={fieldBase} autoComplete="tel" placeholder="+91 8446660179" />
        </div>
        {rfqLayout ? (
          <RfqQuoteFields
            fieldBase={fieldBase}
            labelClass={labelClass}
            hintClassName={brandGreen ? "text-emerald-50/85" : "text-[#4f6478]"}
            defaultProductRef={defaultProductRef}
          />
        ) : (
          <>
            <div>
              <label htmlFor="cf-reference" className={labelClass}>
                Reference
              </label>
              <input
                id="cf-reference"
                name="reference"
                type="text"
                defaultValue={defaultProductRef}
                className={fieldBase}
                placeholder="e.g. HKR-CB-001 or service name"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="cf-message" className={labelClass}>
                Message
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={4}
                required
                className={cn(fieldBase, "min-h-[100px] resize-y")}
                placeholder="Describe purity, quantity band, and timeline."
              />
            </div>
          </>
        )}
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
        {status === "submitting"
          ? "Sending..."
          : rfqLayout
            ? "Submit inquiry"
            : "Send enquiry"}
      </button>
    </form>
  );
}
