import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an HKR Biotech Labs account.",
};

export default function SignupPage() {
  return (
    <div className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-md">
        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-teal-400/90">
          Account
        </p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Create account
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Create a password account or use Google when OAuth is configured.
        </p>
        <div className="mt-8">
          <SignupForm />
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Already registered?{" "}
          <Link href="/login" className="font-medium text-teal-400 hover:text-teal-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
