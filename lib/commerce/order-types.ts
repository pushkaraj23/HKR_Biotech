import type { CartItem } from "@/lib/commerce/cart-types";

export const ORDER_STATUSES = ["pending", "paid", "delivered", "failed", "cancelled"] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  delivered: "Delivered",
  failed: "Failed",
  cancelled: "Cancelled",
};

export type OrderLineItem = {
  slug: string;
  productSlug: string;
  chemicalName: string;
  catalogNumber: string;
  categorySlug: string;
  variantSize: string;
  variantPrice: string;
  quantity: number;
  lineTotal: number | null;
};

export type OrderRecord = {
  id: string;
  userId: string;
  userEmail: string;
  userName?: string;
  status: OrderStatus;
  items: OrderLineItem[];
  lineCount: number;
  totalUnits: number;
  /** Catalogue subtotal (USD when prices are dollar-denominated). */
  subtotal: number;
  /** Razorpay charge currency (matches catalogue currency by default). */
  currency: string;
  /** Minor units charged via Razorpay (cents or paise). */
  amountPaise: number;
  catalogCurrency?: string;
  inrSubtotal?: number;
  fxRate?: number | null;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAtIso: string;
  paidAtIso?: string;
  deliveredAtIso?: string;
  adminNotes?: string;
};

export function cartItemToOrderLine(item: CartItem, lineTotal: number | null): OrderLineItem {
  return {
    slug: item.slug,
    productSlug: item.productSlug || item.slug.split("__")[0] || item.slug,
    chemicalName: item.chemicalName,
    catalogNumber: item.catalogNumber,
    categorySlug: item.categorySlug,
    variantSize: String(item.variantSize ?? ""),
    variantPrice: String(item.variantPrice ?? ""),
    quantity: Math.max(1, Number(item.quantity ?? 1)),
    lineTotal,
  };
}
