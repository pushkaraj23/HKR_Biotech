import { enquiryAttachmentListError } from "@/lib/enquiries/attachment-rules";
import type { StoredEnquiryAttachment } from "@/lib/enquiries/attachment-types";

function isFirebaseStorageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      (parsed.hostname === "firebasestorage.googleapis.com" ||
        parsed.hostname.endsWith(".firebasestorage.app") ||
        parsed.hostname === "storage.googleapis.com")
    );
  } catch {
    return false;
  }
}

function isEnquiryStoragePath(storagePath: string): boolean {
  return storagePath.startsWith("enquiries/") && !storagePath.includes("..");
}

/** Validate client-uploaded attachment metadata before writing to Firestore. */
export function parseAttachmentPayload(raw: unknown): StoredEnquiryAttachment[] | { error: string } {
  if (raw == null || raw === "") return [];

  let parsed: unknown = raw;
  if (typeof raw === "string") {
    try {
      parsed = JSON.parse(raw);
    } catch {
      return { error: "Invalid attachment payload." };
    }
  }

  if (!Array.isArray(parsed)) {
    return { error: "Invalid attachment payload." };
  }

  const rows: StoredEnquiryAttachment[] = [];
  for (const item of parsed) {
    if (!item || typeof item !== "object") {
      return { error: "Invalid attachment entry." };
    }
    const row = item as Record<string, unknown>;
    const name = String(row.name ?? "").trim();
    const url = String(row.url ?? "").trim();
    const storagePath = String(row.storagePath ?? "").trim();
    const contentType = String(row.contentType ?? "application/octet-stream").trim();
    const size = Number(row.size ?? 0);

    if (!name || !url || !storagePath || !Number.isFinite(size) || size <= 0) {
      return { error: "Attachment metadata is incomplete." };
    }
    if (!isFirebaseStorageUrl(url)) {
      return { error: "Attachment URL is not from Firebase Storage." };
    }
    if (!isEnquiryStoragePath(storagePath)) {
      return { error: "Invalid attachment storage path." };
    }

    rows.push({ name, url, storagePath, contentType, size });
  }

  const listError = enquiryAttachmentListError(rows);
  if (listError) return { error: listError };
  return rows;
}
