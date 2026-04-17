import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthCard } from "@/components/auth/AuthFormFields";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to HKR Biotech Labs with Google or email.",
};

export default function LoginPage() {
  return (
    <div className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-md">
        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-teal-400/90">
          Account
        </p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Continue with Google or your email and password.
        </p>
        <div className="mt-8">
          <Suspense
            fallback={
              <AuthCard>
                <div className="h-56 animate-pulse rounded-2xl bg-white/[0.06]" aria-hidden />
              </AuthCard>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          No account?{" "}
          <Link href="/signup" className="font-medium text-teal-400 hover:text-teal-300">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
