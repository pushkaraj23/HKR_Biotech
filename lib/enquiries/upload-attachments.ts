import { randomUUID } from "crypto";
import { enquiryFileExtension } from "@/lib/enquiries/attachment-rules";
import { getAdminStorageBucket, getStorageBucketName } from "@/lib/firebase/admin-app";

const EXTENSION_MIME: Record<string, string> = {
  pdf: "application/pdf",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  txt: "text/plain",
  csv: "text/csv",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  mol: "chemical/x-mdl-molfile",
  sdf: "chemical/x-mdl-sdfile",
  cdxml: "chemical/x-cdxml",
  smi: "chemical/x-daylight-smiles",
  smiles: "chemical/x-daylight-smiles",
};

export type StoredEnquiryAttachment = {
  name: string;
  url: string;
  storagePath: string;
  contentType: string;
  size: number;
};

function sanitizeStorageFileName(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return base.slice(0, 80) || "attachment";
}

function contentTypeFor(fileName: string, mime: string): string {
  const provided = mime.trim().toLowerCase();
  if (provided && provided !== "application/octet-stream") return provided;
  return EXTENSION_MIME[enquiryFileExtension(fileName)] ?? "application/octet-stream";
}

function downloadUrl(bucket: string, storagePath: string, token: string): string {
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(storagePath)}?alt=media&token=${token}`;
}

export async function uploadEnquiryAttachment(file: {
  name: string;
  type: string;
  buffer: Buffer;
}): Promise<StoredEnquiryAttachment> {
  const safeName = sanitizeStorageFileName(file.name);
  const storagePath = `enquiries/${Date.now()}-${randomUUID().slice(0, 8)}-${safeName}`;
  const token = randomUUID();
  const contentType = contentTypeFor(file.name, file.type);
  const bucket = getAdminStorageBucket();

  await bucket.file(storagePath).save(file.buffer, {
    resumable: false,
    metadata: {
      contentType,
      contentDisposition: `inline; filename="${safeName}"`,
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
  });

  return {
    name: file.name.trim() || safeName,
    url: downloadUrl(getStorageBucketName(), storagePath, token),
    storagePath,
    contentType,
    size: file.buffer.length,
  };
}

export async function deleteEnquiryStoragePaths(paths: string[]): Promise<void> {
  const unique = [...new Set(paths.map((path) => path.trim()).filter(isEnquiryStoragePath))];
  if (unique.length === 0) return;
  const bucket = getAdminStorageBucket();
  await Promise.all(
    unique.map(async (storagePath) => {
      try {
        await bucket.file(storagePath).delete({ ignoreNotFound: true });
      } catch {
        // Best-effort cleanup. A leftover object should not block the enquiry response.
      }
    }),
  );
}

function isEnquiryStoragePath(storagePath: string): boolean {
  return storagePath.startsWith("enquiries/") && !storagePath.includes("..");
}
