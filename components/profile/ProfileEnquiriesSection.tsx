"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

type Enquiry = {
  id: string;
  reference: string;
  message: string;
  status: string;
  createdAtIso: string;
  source: string;
  phone?: string;
};

const SECTION_SHELL =
  "flex h-full min-h-[280px] w-full min-w-0 max-w-full flex-col overflow-hidden rounded-[1.75rem] border border-on-dark/20 bg-[rgba(18,25,35,0.56)] p-4 shadow-[0_8px_30px_-14px_rgba(18,25,35,0.7)] backdrop-blur-xl sm:p-6 md:p-8";

export function ProfileEnquiriesSection() {
  const { user, configured } = useAuth();
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
        if (!res.ok) throw new Error(body.error || "Failed to load enquiries");
        if (!cancelled) setRows(body.enquiries ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load enquiries");
        }
      } finally {
        if (!cancelled) setFetching(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [configured, user]);

  return (
    <section className={SECTION_SHELL}>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="min-w-0 font-display text-lg font-semibold text-on-dark sm:text-xl">My enquiries</h2>
        <Link
          href="/contact"
          className="inline-flex shrink-0 self-start rounded-full border border-on-dark/35 bg-[rgba(18,25,35,0.5)] px-4 py-2 text-xs font-semibold text-on-dark transition hover:border-primary/40"
        >
          New enquiry
        </Link>
      </div>

      {error ? (
        <p className="mt-4 shrink-0 rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-on-dark">
          {error}
        </p>
      ) : null}

      <div className="mt-5 min-h-0 min-w-0 flex-1">
        {fetching ? (
          <p className="text-sm text-on-dark/75">Loading enquiries…</p>
        ) : !user ? (
          <p className="text-sm text-on-dark/75">Sign in to view your enquiry history.</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-on-dark/75">
            No enquiries yet. Submit your first request from the contact page.
          </p>
        ) : (
          <ul className="max-h-[min(28rem,60vh)] space-y-2 overflow-x-hidden overflow-y-auto commerce-summary-scroll">
            {rows.map((row) => (
              <li key={row.id} className="min-w-0">
                <article className="min-w-0 overflow-hidden rounded-xl border border-on-dark/20 bg-[rgba(18,25,35,0.45)] p-3.5">
                  <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                    <span
                      className={`max-w-full shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold shadow-[0_6px_18px_-8px_rgba(0,0,0,0.45)] ${statusBadgeClass(row.status)}`}
                    >
                      {statusLabel(row.status)}
                    </span>
                    {row.reference ? (
                      <span className="max-w-full truncate font-mono text-[10px] text-on-dark/75">
                        Ref: {row.reference}
                      </span>
                    ) : null}
                    <span className="shrink-0 text-[10px] text-on-dark/65">{formatDate(row.createdAtIso)}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 break-words text-sm text-on-dark/86">{row.message}</p>
                  <p className="mt-1.5 truncate text-[10px] text-on-dark/65">Source: {row.source || "website"}</p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
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
