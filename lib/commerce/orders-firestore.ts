import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { CartItem } from "@/lib/commerce/cart-types";
import { parsePriceAmount, summarizeCart } from "@/lib/commerce/cart-pricing";
import { cartItemToOrderLine, type OrderLineItem, type OrderStatus } from "@/lib/commerce/order-types";
import { getServerFirestoreDb } from "@/lib/firebase/server-firestore";

export async function loadUserCartItems(uid: string): Promise<CartItem[]> {
  const db = getServerFirestoreDb();
  const snap = await getDocs(collection(db, "users", uid, "cart"));
  return snap.docs
    .map((d) => ({ slug: d.id, ...(d.data() as Omit<CartItem, "slug">) }) as CartItem & { updatedAtIso?: string })
    .sort((a, b) => String(b.updatedAtIso ?? "").localeCompare(String(a.updatedAtIso ?? "")));
}

export async function clearUserCart(uid: string): Promise<void> {
  const db = getServerFirestoreDb();
  const snap = await getDocs(collection(db, "users", uid, "cart"));
  await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
}

export function buildOrderFromCart(items: CartItem[]): {
  orderLines: OrderLineItem[];
  subtotal: number;
  currency: string;
  amountPaise: number;
  lineCount: number;
  totalUnits: number;
} {
  const summary = summarizeCart(items);
  if (items.length === 0) {
    throw new Error("Cart is empty");
  }
  if (summary.quoteLineCount > 0) {
    throw new Error("Remove quote-only items before paying online. Contact us for a custom quote.");
  }
  if (summary.subtotal <= 0) {
    throw new Error("Order total must be greater than zero");
  }

  const currency = "INR";
  const amountPaise = Math.round(summary.subtotal * 100);

  if (amountPaise < 100) {
    throw new Error("Minimum online payment is ₹1.00");
  }

  const orderLines = items.map((item) => {
    const qty = Math.max(1, Number(item.quantity ?? 1));
    const unit = parsePriceAmount(item.variantPrice);
    const lineTotal = unit === null ? null : unit * qty;
    return cartItemToOrderLine(item, lineTotal);
  });

  return {
    orderLines,
    subtotal: summary.subtotal,
    currency,
    amountPaise,
    lineCount: summary.lineCount,
    totalUnits: summary.totalUnits,
  };
}

export async function createPendingOrder(params: {
  orderId: string;
  userId: string;
  userEmail: string;
  items: CartItem[];
  razorpayOrderId: string;
}): Promise<void> {
  const built = buildOrderFromCart(params.items);
  const nowIso = new Date().toISOString();
  const db = getServerFirestoreDb();

  await setDoc(doc(db, "orders", params.orderId), {
    userId: params.userId,
    userEmail: params.userEmail,
    status: "pending" satisfies OrderStatus,
    items: built.orderLines,
    lineCount: built.lineCount,
    totalUnits: built.totalUnits,
    subtotal: built.subtotal,
    currency: built.currency,
    amountPaise: built.amountPaise,
    razorpayOrderId: params.razorpayOrderId,
    createdAt: serverTimestamp(),
    createdAtIso: nowIso,
    adminNotes: "",
  });
}

export type StoredOrder = {
  id: string;
  userId: string;
  status: string;
  razorpayOrderId?: string;
  amountPaise?: number;
};

export async function getOrderForUser(orderId: string, userId: string): Promise<StoredOrder | null> {
  const db = getServerFirestoreDb();
  const snap = await getDoc(doc(db, "orders", orderId));
  if (!snap.exists()) return null;
  const data = snap.data() as Record<string, unknown>;
  if (String(data.userId ?? "") !== userId) return null;
  return {
    id: snap.id,
    userId: String(data.userId ?? ""),
    status: String(data.status ?? ""),
    razorpayOrderId: data.razorpayOrderId ? String(data.razorpayOrderId) : undefined,
    amountPaise: typeof data.amountPaise === "number" ? data.amountPaise : undefined,
  };
}

export async function markOrderPaid(params: {
  orderId: string;
  razorpayPaymentId: string;
}): Promise<void> {
  const db = getServerFirestoreDb();
  await updateDoc(doc(db, "orders", params.orderId), {
    status: "paid",
    razorpayPaymentId: params.razorpayPaymentId,
    paidAtIso: new Date().toISOString(),
    updatedAt: serverTimestamp(),
  });
}

export async function markOrderFailed(orderId: string): Promise<void> {
  const db = getServerFirestoreDb();
  await updateDoc(doc(db, "orders", orderId), {
    status: "failed",
    updatedAt: serverTimestamp(),
  });
}

export function newOrderId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `ord_${ts}_${rand}`;
}
