export const ENQUIRY_ATTACHMENT_MAX_FILES = 5;
export const ENQUIRY_ATTACHMENT_MAX_BYTES = 8 * 1024 * 1024;

const ALLOWED_EXTENSIONS = new Set([
  "pdf",
  "png",
  "jpg",
  "jpeg",
  "webp",
  "gif",
  "txt",
  "csv",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "mol",
  "sdf",
  "cdxml",
  "smi",
  "smiles",
]);

const BLOCKED_MIME = new Set([
  "text/html",
  "image/svg+xml",
  "application/javascript",
  "text/javascript",
  "application/x-msdownload",
  "application/x-executable",
  "application/x-sh",
  "application/xhtml+xml",
]);

export function enquiryFileExtension(name: string): string {
  const base = name.trim().toLowerCase();
  const dot = base.lastIndexOf(".");
  if (dot <= 0 || dot === base.length - 1) return "";
  return base.slice(dot + 1);
}

export function enquiryAttachmentError(file: { name: string; size: number; type?: string }): string | null {
  const extension = enquiryFileExtension(file.name);
  if (!extension || !ALLOWED_EXTENSIONS.has(extension)) {
    return `"${file.name || "Attachment"}" is not an allowed file type. Use PDF, images, Office, or structure files (MOL, SDF, CDXML).`;
  }
  const mime = String(file.type ?? "").trim().toLowerCase();
  if (mime && BLOCKED_MIME.has(mime)) {
    return `"${file.name}" cannot be uploaded.`;
  }
  if (file.size <= 0) {
    return `"${file.name}" is empty.`;
  }
  if (file.size > ENQUIRY_ATTACHMENT_MAX_BYTES) {
    return `"${file.name}" is larger than 8 MB.`;
  }
  return null;
}

export function enquiryAttachmentListError(files: Array<{ name: string; size: number; type?: string }>): string | null {
  if (files.length > ENQUIRY_ATTACHMENT_MAX_FILES) {
    return `You can attach up to ${ENQUIRY_ATTACHMENT_MAX_FILES} files.`;
  }
  for (const file of files) {
    const error = enquiryAttachmentError(file);
    if (error) return error;
  }
  return null;
}
