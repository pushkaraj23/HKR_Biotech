"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

type Enquiry = {
  id: string;
  reference: string;
  message: string;
  status: string;
  createdAtIso: string;
  source: string;
  phone?: string;
};

export default function ProfilePage() {
  const { user, loading, configured } = useAuth();
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!configured || !user) {
      setFetching(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setFetching(true);
      setError(null);
      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/enquiries/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const body = (await res.json()) as { enquiries?: Enquiry[]; error?: string };
        if (!res.ok) {
          throw new Error(body.error || "Failed to load enquiries");
        }
        if (!cancelled) {
          setRows(body.enquiries ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load enquiries");
        }
      } finally {
        if (!cancelled) {
          setFetching(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [configured, user]);

  return (
    <div className="relative overflow-x-hidden pb-24">
      <PageAmbientGraphics variant="left" opacity="opacity-[0.12]" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-8 px-4 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-[1.75rem] border border-on-dark/20 bg-[rgba(18,25,35,0.58)] p-7 shadow-[0_10px_36px_-14px_rgba(18,25,35,0.7)] backdrop-blur-xl md:p-9">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-primary-mid">Account</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-on-dark md:text-4xl">My profile</h1>
          <p className="mt-2 text-sm text-on-dark/82">
            {user ? `Signed in as ${user.email ?? "your account"}` : "Sign in to view and track your enquiries."}
          </p>
          {user ? (
            <div className="mt-5 grid gap-3 rounded-2xl border border-on-dark/20 bg-[rgba(18,25,35,0.46)] p-4 text-sm sm:grid-cols-2">
              <InfoRow label="Name" value={user.displayName || "Not set"} />
              <InfoRow label="Email" value={user.email || "Not available"} />
              <InfoRow label="Phone" value={user.phoneNumber || "Not set"} />
              <InfoRow label="UID" value={user.uid || "—"} mono />
              <InfoRow
                label="Joined"
                value={user.metadata.creationTime ? formatDate(user.metadata.creationTime) : "Unknown"}
              />
              <InfoRow
                label="Last sign-in"
                value={user.metadata.lastSignInTime ? formatDate(user.metadata.lastSignInTime) : "Unknown"}
              />
            </div>
          ) : null}
          {!user ? (
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/login" className="rounded-full bg-cta-gradient px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-primary-glow">
                Sign in
              </Link>
              <Link href="/signup" className="rounded-full border border-on-dark/35 bg-[rgba(18,25,35,0.5)] px-6 py-2.5 text-sm font-semibold text-on-dark">
                Create account
              </Link>
            </div>
          ) : null}
        </section>

        <section className="rounded-[1.75rem] border border-on-dark/20 bg-[rgba(18,25,35,0.56)] p-6 shadow-[0_8px_30px_-14px_rgba(18,25,35,0.7)] backdrop-blur-xl md:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-on-dark">My enquiries</h2>
            <Link href="/contact" className="rounded-full border border-on-dark/35 bg-[rgba(18,25,35,0.5)] px-4 py-2 text-xs font-semibold text-on-dark">
              New enquiry
            </Link>
          </div>
          {error ? (
            <p className="mt-4 rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-on-dark">{error}</p>
          ) : null}
          {fetching ? (
            <p className="mt-6 text-sm text-on-dark/75">Loading enquiries...</p>
          ) : !user ? (
            <p className="mt-6 text-sm text-on-dark/75">Sign in to view your enquiry history.</p>
          ) : rows.length === 0 ? (
            <p className="mt-6 text-sm text-on-dark/75">No enquiries yet. Submit your first request from the contact page.</p>
          ) : (
            <div className="mt-5 space-y-3">
              {rows.map((row) => (
                <article key={row.id} className="rounded-2xl border border-on-dark/20 bg-[rgba(18,25,35,0.45)] p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold shadow-[0_6px_18px_-8px_rgba(0,0,0,0.45)] ${statusBadgeClass(row.status)}`}
                    >
                      {statusLabel(row.status)}
                    </span>
                    {row.reference ? (
                      <span className="font-mono text-[11px] text-on-dark/75">Ref: {row.reference}</span>
                    ) : null}
                    <span className="text-[11px] text-on-dark/65">{formatDate(row.createdAtIso)}</span>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm text-on-dark/86">{row.message}</p>
                  <p className="mt-2 text-xs text-on-dark/65">Source: {row.source || "website"}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function statusLabel(status: string) {
  switch (status) {
    case "in_progress":
      return "In progress";
    case "responded":
      return "Responded";
    case "closed":
      return "Closed";
    case "spam":
      return "Spam";
    default:
      return "New";
  }
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "in_progress":
      return "border-primary/45 bg-gradient-to-r from-[rgba(20,184,166,0.28)] to-[rgba(45,212,191,0.2)] text-on-dark";
    case "responded":
      return "border-accent/45 bg-gradient-to-r from-[rgba(124,58,237,0.28)] to-[rgba(167,139,250,0.2)] text-on-dark";
    case "closed":
      return "border-on-dark/35 bg-gradient-to-r from-[rgba(51,65,85,0.55)] to-[rgba(71,85,105,0.45)] text-on-dark/90";
    case "spam":
      return "border-danger/45 bg-gradient-to-r from-[rgba(225,29,72,0.34)] to-[rgba(251,113,133,0.2)] text-on-dark";
    default:
      return "border-primary-mid/45 bg-gradient-to-r from-[rgba(196,89,59,0.8)] to-[rgba(242,186,114,0.88)] text-light-foreground";
  }
}

function formatDate(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-on-dark/60">{label}</p>
      <p className={`mt-1 text-on-dark/88 ${mono ? "font-mono text-xs" : ""}`}>{value}</p>
    </div>
  );
}
