"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/components/providers/AuthProvider";
import { formatMoney } from "@/lib/commerce/cart-pricing";
import {
  ORDER_STATUS_LABELS,
  type OrderLineItem,
  type OrderRecord,
  type OrderStatus,
} from "@/lib/commerce/order-types";
import { DownloadOrderInvoiceButton } from "@/components/profile/DownloadOrderInvoiceButton";
import { resolveOrderCustomerName } from "@/lib/commerce/order-customer";
import { cn } from "@/lib/cn";

const SECTION_SHELL =
  "flex h-full min-h-[280px] flex-col rounded-[1.75rem] border border-on-dark/20 bg-[rgba(18,25,35,0.56)] p-6 shadow-[0_8px_30px_-14px_rgba(18,25,35,0.7)] backdrop-blur-xl md:p-8";

export function ProfileOrdersSection() {
  const { user, configured } = useAuth();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    if (!configured || !user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/orders/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const body = (await res.json()) as { orders?: OrderRecord[]; error?: string };
        if (!res.ok) throw new Error(body.error || "Failed to load orders");
        if (!cancelled) setOrders(body.orders ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load orders");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [configured, user]);

  const closeModal = useCallback(() => setSelectedOrder(null), []);

  return (
    <>
      <section className={SECTION_SHELL}>
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-mid">
              Commerce
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-on-dark">Your orders</h2>
          </div>
          <Link
            href="/products"
            className="rounded-full border border-on-dark/35 bg-[rgba(18,25,35,0.5)] px-4 py-2 text-xs font-semibold text-on-dark transition hover:border-primary/40 hover:text-primary-mid"
          >
            Browse
          </Link>
        </div>

        {error ? (
          <p className="mt-4 shrink-0 rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-on-dark">
            {error}
          </p>
        ) : null}

        <div className="mt-5 min-h-0 flex-1">
          {loading ? (
            <p className="text-sm text-on-dark/75">Loading your orders…</p>
          ) : !user ? (
            <p className="text-sm text-on-dark/75">Sign in to view your order history.</p>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-on-dark/20 bg-[rgba(18,25,35,0.45)] p-5 text-center">
              <p className="text-sm text-on-dark/82">You have not placed any orders yet.</p>
              <Link
                href="/cart"
                className="mt-3 inline-flex rounded-full bg-gradient-to-r from-[#3d9bff] via-[#1a73e8] to-[#1459b8] px-5 py-2 text-xs font-semibold text-white shadow-[0_10px_28px_-10px_rgba(26,115,232,0.55)] transition hover:-translate-y-0.5"
              >
                View cart
              </Link>
            </div>
          ) : (
            <ul className="max-h-[min(28rem,60vh)] space-y-2 overflow-y-auto pr-1 commerce-summary-scroll">
              {orders.map((order) => (
                <li key={order.id}>
                  <OrderCompactCard order={order} onOpen={() => setSelectedOrder(order)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {selectedOrder ? (
        <OrderDetailModal
          order={selectedOrder}
          customerNameFallback={user?.displayName}
          onClose={closeModal}
        />
      ) : null}
    </>
  );
}

function OrderCompactCard({ order, onOpen }: { order: OrderRecord; onOpen: () => void }) {
  const currency = order.currency === "USD" ? "USD" : order.currency === "EUR" ? "EUR" : "INR";
  const totalLabel = formatMoney(order.subtotal, currency);
  const shortId = order.id.length > 18 ? `${order.id.slice(0, 16)}…` : order.id;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full items-center gap-3 rounded-xl border border-on-dark/20 bg-[rgba(18,25,35,0.45)] px-3 py-2.5 text-left transition hover:border-primary/35 hover:bg-[rgba(18,25,35,0.62)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50"
    >
      <OrderStatusBadge status={order.status} compact />
      <div className="min-w-0 flex-1">
        <p className="truncate font-mono text-xs font-medium text-on-dark group-hover:text-primary-mid">
          {shortId}
        </p>
        <p className="mt-0.5 text-[10px] text-on-dark/65">{formatDateShort(order.createdAtIso)}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-mono text-sm font-bold text-on-dark">{totalLabel}</p>
        <p className="text-[10px] text-on-dark/60">
          {order.lineCount} line{order.lineCount === 1 ? "" : "s"}
        </p>
      </div>
      <span className="shrink-0 text-on-dark/40 transition group-hover:text-primary-mid" aria-hidden>
        <ChevronIcon />
      </span>
    </button>
  );
}

function OrderDetailModal({
  order,
  customerNameFallback,
  onClose,
}: {
  order: OrderRecord;
  customerNameFallback?: string | null;
  onClose: () => void;
}) {
  const customerName = resolveOrderCustomerName(order, customerNameFallback);
  const [mounted, setMounted] = useState(false);
  const currency = order.currency === "USD" ? "USD" : order.currency === "EUR" ? "EUR" : "INR";
  const totalLabel = formatMoney(order.subtotal, currency);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-detail-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(8,12,18,0.72)] backdrop-blur-sm"
        aria-label="Close order details"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[min(90vh,42rem)] w-full max-w-lg flex-col overflow-hidden rounded-[1.5rem] border border-on-dark/25 bg-[rgba(18,25,35,0.96)] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.65)] backdrop-blur-xl">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-on-dark/15 px-5 py-4">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-mid">
              Order details
            </p>
            <h3 id="order-detail-title" className="mt-1 font-display text-lg font-semibold text-on-dark">
              {totalLabel}
            </h3>
            <p className="mt-1 font-mono text-[11px] text-on-dark/70">{order.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-on-dark/30 bg-[rgba(18,25,35,0.6)] p-2 text-on-dark/80 transition hover:border-on-dark/50 hover:text-on-dark"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 commerce-summary-scroll">
          <div className="flex flex-wrap items-center gap-2">
            <OrderStatusBadge status={order.status} />
            <span className="text-[11px] text-on-dark/65">{formatDate(order.createdAtIso)}</span>
          </div>

          <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-on-dark/55">
            Line items · {order.lineCount} · {order.totalUnits} units
          </p>
          <ul className="mt-3 space-y-2">
            {order.items.map((item) => (
              <OrderLineRow key={item.slug} item={item} currency={currency} />
            ))}
          </ul>

          <dl className="mt-5 grid gap-3 rounded-xl border border-on-dark/15 bg-[rgba(18,25,35,0.35)] p-4 text-xs sm:grid-cols-2">
            {order.razorpayOrderId ? (
              <div>
                <dt className="text-on-dark/55">Razorpay order</dt>
                <dd className="mt-0.5 break-all font-mono text-on-dark/80">{order.razorpayOrderId}</dd>
              </div>
            ) : null}
            {order.razorpayPaymentId ? (
              <div>
                <dt className="text-on-dark/55">Payment ID</dt>
                <dd className="mt-0.5 break-all font-mono text-on-dark/80">{order.razorpayPaymentId}</dd>
              </div>
            ) : null}
            {order.paidAtIso ? (
              <div>
                <dt className="text-on-dark/55">Paid at</dt>
                <dd className="mt-0.5 text-on-dark/80">{formatDate(order.paidAtIso)}</dd>
              </div>
            ) : null}
            {order.deliveredAtIso ? (
              <div>
                <dt className="text-on-dark/55">Delivered at</dt>
                <dd className="mt-0.5 text-on-dark/80">{formatDate(order.deliveredAtIso)}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-on-dark/55">Customer name</dt>
              <dd className="mt-0.5 text-on-dark/80">{customerName}</dd>
            </div>
            <div>
              <dt className="text-on-dark/55">Email</dt>
              <dd className="mt-0.5 break-all text-on-dark/80">{order.userEmail || "—"}</dd>
            </div>
          </dl>
        </div>

        <div className="shrink-0 border-t border-on-dark/15 px-5 py-4">
          <DownloadOrderInvoiceButton order={order} customerNameFallback={customerNameFallback} />
        </div>
      </div>
    </div>,
    document.body,
  );
}

function OrderLineRow({ item, currency }: { item: OrderLineItem; currency: string | null }) {
  const productSlug = item.productSlug || item.slug.split("__")[0] || item.slug;
  const lineLabel =
    item.lineTotal !== null ? formatMoney(item.lineTotal, currency) : item.variantPrice || "Quote";

  return (
    <li className="flex flex-col gap-2 rounded-xl border border-on-dark/15 bg-[rgba(18,25,35,0.38)] p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <Link
          href={`/products/${item.categorySlug}/${productSlug}`}
          className="font-medium text-on-dark transition hover:text-primary-mid"
          onClick={(e) => e.stopPropagation()}
        >
          {item.chemicalName}
        </Link>
        <p className="mt-0.5 font-mono text-[11px] text-on-dark/65">
          {item.catalogNumber}
          {item.variantSize ? ` · ${item.variantSize}` : ""} · Qty {item.quantity}
        </p>
      </div>
      <p className="shrink-0 font-mono text-sm font-semibold text-on-dark">{lineLabel}</p>
    </li>
  );
}

function OrderStatusBadge({ status, compact }: { status: OrderStatus; compact?: boolean }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full border font-semibold shadow-[0_6px_18px_-8px_rgba(0,0,0,0.45)]",
        compact ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-[11px]",
        orderStatusClass(status),
      )}
    >
      {orderStatusLabel(status)}
    </span>
  );
}

function orderStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABELS[status] ?? ORDER_STATUS_LABELS.pending;
}

function orderStatusClass(status: OrderStatus): string {
  switch (status) {
    case "paid":
      return "border-accent/45 bg-gradient-to-r from-[rgba(43,196,138,0.35)] to-[rgba(26,115,232,0.25)] text-on-dark";
    case "delivered":
      return "border-primary/45 bg-gradient-to-r from-[rgba(20,184,166,0.32)] to-[rgba(26,115,232,0.22)] text-on-dark";
    case "failed":
      return "border-danger/45 bg-gradient-to-r from-[rgba(225,29,72,0.34)] to-[rgba(251,113,133,0.2)] text-on-dark";
    case "cancelled":
      return "border-on-dark/35 bg-gradient-to-r from-[rgba(51,65,85,0.55)] to-[rgba(71,85,105,0.45)] text-on-dark/90";
    default:
      return "border-primary-mid/45 bg-gradient-to-r from-[rgba(196,89,59,0.8)] to-[rgba(242,186,114,0.88)] text-light-foreground";
  }
}

function formatDate(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

function formatDateShort(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
