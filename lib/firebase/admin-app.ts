import * as admin from "firebase-admin";
import fs from "fs";
import path from "path";

let ready = false;

function resolveCredentialFilePath(): string | null {
  const configured =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim() ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  if (!configured) return null;
  return path.isAbsolute(configured) ? configured : path.join(process.cwd(), configured);
}

export function isServiceAccountConfigured(): boolean {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim()) return true;
  const filePath = resolveCredentialFilePath();
  return Boolean(filePath && fs.existsSync(filePath));
}

function parseServiceAccountJson(raw: string): Record<string, string | undefined> {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed) as Record<string, string | undefined>;
  } catch {
    // Vercel/hosting often stores the key as base64 to avoid multiline/env escaping issues.
    try {
      const decoded = Buffer.from(trimmed, "base64").toString("utf8");
      return JSON.parse(decoded) as Record<string, string | undefined>;
    } catch {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON (or base64 JSON).");
    }
  }
}

function loadServiceAccount(): Record<string, string | undefined> {
  const inline = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (inline) {
    return parseServiceAccountJson(inline);
  }
  const filePath = resolveCredentialFilePath();
  if (filePath && fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as Record<string, string | undefined>;
  }
  throw new Error("Firebase service account is not configured for file uploads.");
}

function ensureAdminApp(): void {
  if (ready) return;
  const parsed = loadServiceAccount();
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(parsed as admin.ServiceAccount),
    });
  }
  ready = true;
}

export function getStorageBucketName(): string {
  const fromEnv =
    process.env.FIREBASE_STORAGE_BUCKET?.trim() ||
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim();
  if (fromEnv) return fromEnv;

  const parsed = loadServiceAccount();
  const projectId = String(parsed.project_id ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "").trim();
  if (!projectId) {
    throw new Error("Storage bucket is not configured.");
  }
  return `${projectId}.firebasestorage.app`;
}

export function getAdminStorageBucket() {
  ensureAdminApp();
  return admin.storage().bucket(getStorageBucketName());
}
