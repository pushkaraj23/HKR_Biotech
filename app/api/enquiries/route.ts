import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";
import { trackProductInterest } from "@/lib/analytics/product-interest";
import { enquiryAttachmentListError } from "@/lib/enquiries/attachment-rules";
import { deleteEnquiryStoragePaths, uploadEnquiryAttachment, type StoredEnquiryAttachment } from "@/lib/enquiries/upload-attachments";
import { isServiceAccountConfigured } from "@/lib/firebase/admin-app";
import { getServerFirestoreDb } from "@/lib/firebase/server-firestore";
import { verifyFirebaseIdTokenPublic } from "@/lib/firebase/verify-id-token";

export const runtime = "nodejs";

type EnquiryFields = {
  name: string;
  email: string;
  organization: string;
  phone: string;
  reference: string;
  message: string;
  source: string;
  serviceRequired: string;
  cdaRequired: string;
  quantity: string;
};

function clean(value: unknown) {
  return String(value ?? "").trim();
}

async function readSubmission(req: Request): Promise<{ fields: EnquiryFields; files: File[] }> {
  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const files = form
      .getAll("attachments")
      .filter((item): item is File => item instanceof File && item.size > 0 && item.name.trim().length > 0);
    return {
      fields: {
        name: clean(form.get("name")),
        email: clean(form.get("email")),
        organization: clean(form.get("organization")),
        phone: clean(form.get("phone")),
        reference: clean(form.get("reference")),
        message: clean(form.get("message")),
        source: clean(form.get("source")),
        serviceRequired: clean(form.get("serviceRequired")),
        cdaRequired: clean(form.get("cdaRequired")),
        quantity: clean(form.get("quantity")),
      },
      files,
    };
  }

  const body = (await req.json()) as Record<string, unknown>;
  return {
    fields: {
      name: clean(body.name),
      email: clean(body.email),
      organization: clean(body.organization),
      phone: clean(body.phone),
      reference: clean(body.reference),
      message: clean(body.message),
      source: clean(body.source),
      serviceRequired: clean(body.serviceRequired),
      cdaRequired: clean(body.cdaRequired),
      quantity: clean(body.quantity),
    },
    files: [],
  };
}

export async function POST(req: Request) {
  let submission: { fields: EnquiryFields; files: File[] };
  try {
    submission = await readSubmission(req);
  } catch {
    return NextResponse.json({ error: "Invalid enquiry payload" }, { status: 400 });
  }

  const { fields, files } = submission;
  const source = fields.source || "website";

  if (!fields.name || !fields.email || !fields.message) {
    return NextResponse.json({ error: "name, email, and message are required" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  if (fields.phone && !/^[\d\s+()\-]{7,28}$/.test(fields.phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
  }

  const fileError = enquiryAttachmentListError(
    files.map((file) => ({ name: file.name, size: file.size, type: file.type })),
  );
  if (fileError) {
    return NextResponse.json({ error: fileError }, { status: 400 });
  }
  if (files.length > 0 && !isServiceAccountConfigured()) {
    return NextResponse.json(
      { error: "File upload is not configured. Please try again without attachments, or email the files after we reply." },
      { status: 500 },
    );
  }

  const uploaded: StoredEnquiryAttachment[] = [];
  try {
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      uploaded.push(
        await uploadEnquiryAttachment({
          name: file.name,
          type: file.type,
          buffer,
        }),
      );
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace(/^Bearer\s+/i, "");
    const decoded = token ? await verifyFirebaseIdTokenPublic(token).catch(() => null) : null;
    const db = getServerFirestoreDb();
    const created = new Date().toISOString();
    const docRef = await addDoc(collection(db, "enquiries"), {
      name: fields.name,
      email: fields.email,
      emailLower: fields.email.toLowerCase(),
      organization: fields.organization,
      phone: fields.phone,
      reference: fields.reference,
      message: fields.message,
      source,
      ...(fields.serviceRequired ? { serviceRequired: fields.serviceRequired } : {}),
      ...(fields.cdaRequired ? { cdaRequired: fields.cdaRequired } : {}),
      ...(fields.quantity ? { quantity: fields.quantity } : {}),
      ...(uploaded.length > 0 ? { attachments: uploaded } : {}),
      customerUid: decoded?.uid ?? null,
      customerEmail: decoded?.email ?? null,
      status: "new",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdAtIso: created,
    });

    const productSlugFromSource = source.startsWith("product:") ? source.slice("product:".length).trim() : "";
    if (productSlugFromSource) {
      await trackProductInterest({
        eventType: "enquiry_submit",
        slug: productSlugFromSource,
        catalogNumber: fields.reference || undefined,
        uid: decoded?.uid ?? null,
        email: decoded?.email ?? null,
      });
    }
    return NextResponse.json({ ok: true, id: docRef.id });
  } catch (error) {
    await deleteEnquiryStoragePaths(uploaded.map((file) => file.storagePath));
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save enquiry" },
      { status: 500 },
    );
  }
}
