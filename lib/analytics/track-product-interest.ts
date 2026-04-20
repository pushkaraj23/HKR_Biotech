"use client";

import type { ProductInterestEventType } from "@/lib/analytics/product-interest";

type ProductPayload = {
  slug: string;
  categorySlug?: string;
  chemicalName?: string;
  catalogNumber?: string;
};

export async function trackProductInterestClient(
  eventType: ProductInterestEventType,
  product: ProductPayload,
  token?: string | null,
) {
  if (typeof window === "undefined") return;
  if (!product.slug?.trim()) return;

  const payload = JSON.stringify({
    eventType,
    slug: product.slug,
    categorySlug: product.categorySlug ?? "",
    chemicalName: product.chemicalName ?? "",
    catalogNumber: product.catalogNumber ?? "",
  });

  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    await fetch("/api/analytics/product-interest", {
      method: "POST",
      headers,
      body: payload,
      keepalive: true,
    });
  } catch {
    // Analytics must never block UX.
  }
}
