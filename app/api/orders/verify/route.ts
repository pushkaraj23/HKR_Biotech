import { NextResponse } from "next/server";
import { requireUserAuth } from "@/lib/api/user-auth";
import { clearUserCart, getOrderForUser, markOrderPaid } from "@/lib/commerce/orders-firestore";
import { verifyRazorpayPaymentSignature } from "@/lib/razorpay/server";

type VerifyBody = {
  orderId?: unknown;
  razorpayOrderId?: unknown;
  razorpayPaymentId?: unknown;
  razorpaySignature?: unknown;
};

export async function POST(req: Request) {
  const auth = await requireUserAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = (await req.json()) as VerifyBody;
  const orderId = String(body.orderId ?? "").trim();
  const razorpayOrderId = String(body.razorpayOrderId ?? "").trim();
  const razorpayPaymentId = String(body.razorpayPaymentId ?? "").trim();
  const razorpaySignature = String(body.razorpaySignature ?? "").trim();

  if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
  }

  const valid = verifyRazorpayPaymentSignature({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  });
  if (!valid) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  try {
    const order = await getOrderForUser(orderId, auth.uid);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (String(order.status ?? "") === "paid") {
      return NextResponse.json({ ok: true, orderId, alreadyPaid: true });
    }

    if (String(order.razorpayOrderId ?? "") !== razorpayOrderId) {
      return NextResponse.json({ error: "Order mismatch" }, { status: 400 });
    }

    await markOrderPaid({ orderId, razorpayPaymentId });
    await clearUserCart(auth.uid);

    return NextResponse.json({ ok: true, orderId });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Payment verification failed" },
      { status: 500 },
    );
  }
}
