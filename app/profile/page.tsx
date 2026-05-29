"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { ProfileEnquiriesSection } from "@/components/profile/ProfileEnquiriesSection";
import { ProfileOrdersSection } from "@/components/profile/ProfileOrdersSection";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-x-hidden pb-24">
      <PageAmbientGraphics variant="left" opacity="opacity-[0.12]" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-8 px-4 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-[1.75rem] border border-on-dark/20 bg-[rgba(18,25,35,0.58)] p-7 shadow-[0_10px_36px_-14px_rgba(18,25,35,0.7)] backdrop-blur-xl md:p-9">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-primary-mid">Account</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-on-dark md:text-4xl">My profile</h1>
          <p className="mt-2 text-sm text-on-dark/82">
            {user ? `Signed in as ${user.email ?? "your account"}` : "Sign in to view and track your enquiries and orders."}
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
              <Link href="/login" className="btn-glass btn-glass-blue-light rounded-full px-6 py-2.5 text-sm font-semibold">
                Sign in
              </Link>
              <Link href="/signup" className="rounded-full border border-on-dark/35 bg-[rgba(18,25,35,0.5)] px-6 py-2.5 text-sm font-semibold text-on-dark">
                Create account
              </Link>
            </div>
          ) : null}
        </section>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <ProfileOrdersSection />
          <ProfileEnquiriesSection />
        </div>
      </div>
    </div>
  );
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
