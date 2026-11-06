"use client";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { enquiryAttachmentError, enquiryAttachmentListError } from "@/lib/enquiries/attachment-rules";
import type { StoredEnquiryAttachment } from "@/lib/enquiries/attachment-types";
import { getFirebaseApp } from "@/lib/firebase/client";
import { firebaseBrowserConfig, isFirebaseConfigured } from "@/lib/firebase/config";

function sanitizeStorageFileName(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return base.slice(0, 80) || "attachment";
}

export function isClientEnquiryUploadAvailable(): boolean {
  return Boolean(isFirebaseConfigured() && firebaseBrowserConfig.storageBucket?.trim());
}

/**
 * Upload enquiry attachments from the browser to Firebase Storage.
 * Works without a server service account when Storage rules allow creates under `enquiries/`.
 */
export async function uploadEnquiryAttachmentsClient(
  files: File[],
): Promise<StoredEnquiryAttachment[]> {
  const listError = enquiryAttachmentListError(files);
  if (listError) throw new Error(listError);
  if (files.length === 0) return [];
  if (!isClientEnquiryUploadAvailable()) {
    throw new Error(
      "File upload is not available (Firebase Storage bucket missing). Try again without attachments, or email the files after we reply.",
    );
  }

  const storage = getStorage(getFirebaseApp());
  const uploaded: StoredEnquiryAttachment[] = [];

  for (const file of files) {
    const singleError = enquiryAttachmentError(file);
    if (singleError) throw new Error(singleError);

    const safeName = sanitizeStorageFileName(file.name);
    const storagePath = `enquiries/${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safeName}`;
    const storageRef = ref(storage, storagePath);

    try {
      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type || "application/octet-stream",
        customMetadata: {
          originalName: file.name.slice(0, 120),
          source: "enquiry-form",
        },
      });
      const url = await getDownloadURL(snapshot.ref);
      uploaded.push({
        name: file.name.trim() || safeName,
        url,
        storagePath,
        contentType: file.type || "application/octet-stream",
        size: file.size,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed";
      if (/storage\/unauthorized|permission/i.test(message)) {
        throw new Error(
          "File upload was blocked by Storage permissions. Ask an admin to allow writes to enquiries/ in Firebase Storage rules.",
        );
      }
      throw new Error(`Could not upload "${file.name}": ${message}`);
    }
  }

  return uploaded;
}
