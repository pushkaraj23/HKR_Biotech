import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";
import { getServerFirestoreDb } from "@/lib/firebase/server-firestore";
import { verifyFirebaseIdTokenPublic } from "@/lib/firebase/verify-id-token";

type EnquiryBody = {
  name?: unknown;
  email?: unknown;
  organization?: unknown;
  phone?: unknown;
  reference?: unknown;
  message?: unknown;
  source?: unknown;
};

function clean(value: unknown) {
  return String(value ?? "").trim();
}

export async function POST(req: Request) {
  let body: EnquiryBody;
  try {
    body = (await req.json()) as EnquiryBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const organization = clean(body.organization);
  const phone = clean(body.phone);
  const reference = clean(body.reference);
  const message = clean(body.message);
  const source = clean(body.source) || "website";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "name, email, and message are required" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  if (phone && !/^[\d\s+()\-]{7,20}$/.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
  }

  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace(/^Bearer\s+/i, "");
    const decoded = token ? await verifyFirebaseIdTokenPublic(token).catch(() => null) : null;
    const db = getServerFirestoreDb();
    const created = new Date().toISOString();
    const docRef = await addDoc(collection(db, "enquiries"), {
      name,
      email,
      emailLower: email.toLowerCase(),
      organization,
      phone,
      reference,
      message,
      source,
      customerUid: decoded?.uid ?? null,
      customerEmail: decoded?.email ?? null,
      status: "new",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdAtIso: created,
    });
    return NextResponse.json({ ok: true, id: docRef.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save enquiry" },
      { status: 500 },
    );
  }
}
