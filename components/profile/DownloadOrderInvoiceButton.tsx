"use client";

import { useState } from "react";
import {
  canDownloadOrderInvoice,
  downloadOrderInvoicePdf,
} from "@/lib/commerce/download-order-invoice";
import type { OrderRecord } from "@/lib/commerce/order-types";
import { cn } from "@/lib/cn";

type Props = {
  order: OrderRecord;
  customerNameFallback?: string | null;
  className?: string;
};

export function DownloadOrderInvoiceButton({ order, customerNameFallback, className }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const allowed = canDownloadOrderInvoice(order);

  async function handleDownload() {
    if (!allowed || busy) return;
    setBusy(true);
    setError(null);
    try {
      await downloadOrderInvoicePdf(order, { customerNameFallback });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate invoice");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <button
        type="button"
        onClick={() => void handleDownload()}
        disabled={!allowed || busy}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition",
          allowed
            ? "bg-gradient-to-r from-[#3d9bff] via-[#1a73e8] to-[#1459b8] text-white shadow-[0_10px_28px_-10px_rgba(26,115,232,0.55)] hover:-translate-y-0.5 disabled:opacity-70"
            : "cursor-not-allowed border border-on-dark/25 bg-[rgba(18,25,35,0.4)] text-on-dark/50",
        )}
      >
        <DownloadIcon />
        {busy ? "Preparing invoice…" : "Download invoice"}
      </button>
      {!allowed ? (
        <p className="text-center text-[11px] text-on-dark/55">
          Invoice available once payment is confirmed.
        </p>
      ) : null}
      {error ? (
        <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-center text-xs text-on-dark">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3v12M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 21h14" strokeLinecap="round" />
    </svg>
  );
}
