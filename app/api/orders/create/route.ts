import { NextResponse } from "next/server";
import { requireUserAuth } from "@/lib/api/user-auth";
import {
  buildOrderFromCart,
  createPendingOrder,
  loadUserCartItems,
  newOrderId,
} from "@/lib/commerce/orders-firestore";
import { getRazorpayKeyId, isRazorpayConfigured } from "@/lib/razorpay/config";
import { createRazorpayOrder } from "@/lib/razorpay/server";

export async function POST(req: Request) {
  const auth = await requireUserAuth(req);
  if (auth instanceof NextResponse) return auth;

  if (!isRazorpayConfigured()) {
    return NextResponse.json({ error: "Payment gateway is not configured" }, { status: 503 });
  }

  try {
    const items = await loadUserCartItems(auth.uid);
    const orderId = newOrderId();
    const built = buildOrderFromCart(items);

    const rzOrder = await createRazorpayOrder({
      amountPaise: built.amountPaise,
      currency: built.currency,
      receipt: orderId,
      notes: {
        orderId,
        userId: auth.uid,
      },
    });

    await createPendingOrder({
      orderId,
      userId: auth.uid,
      userEmail: auth.email ?? "",
      items,
      razorpayOrderId: rzOrder.id,
    });

    return NextResponse.json({
      orderId,
      razorpayOrderId: rzOrder.id,
      amount: built.amountPaise,
      currency: built.currency,
      keyId: getRazorpayKeyId(),
      subtotal: built.subtotal,
      lineCount: built.lineCount,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create order";
    const status = /empty|quote|minimum|greater than zero/i.test(message) ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
