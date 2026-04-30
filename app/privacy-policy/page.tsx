import type { Metadata } from "next";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for HKR Biotech Pvt. Ltd. describing collection, use, and protection of enquiry and website data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative overflow-x-hidden">
      <PageAmbientGraphics variant="left" opacity="opacity-[0.14]" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-on-dark/20 bg-[rgba(18,25,35,0.55)] p-8 shadow-[0_12px_40px_-16px_rgba(18,25,35,0.7)] backdrop-blur-xl sm:p-10">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-primary-mid">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-on-dark md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-on-dark/78">Last updated: April 30, 2026</p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-on-dark/84">
            <p>
              HKR Biotech Pvt. Ltd. respects your privacy. This policy explains how we
              collect and use information shared through this website, enquiry forms,
              and direct communication channels.
            </p>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Information We Collect</h2>
              <p className="mt-2">
                We may collect your name, email, phone number, organization details,
                project requirements, and any technical information you voluntarily
                submit in enquiry forms.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">How We Use Information</h2>
              <p className="mt-2">
                Submitted information is used to respond to enquiries, prepare technical
                discussions, improve service quality, and maintain records for legitimate
                business and compliance purposes.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Data Sharing</h2>
              <p className="mt-2">
                We do not sell personal information. Data may be shared with trusted
                service providers or compliance partners only when required to deliver
                requested services or meet legal obligations.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Data Security</h2>
              <p className="mt-2">
                We use reasonable administrative and technical safeguards to protect
                personal and project-related information from unauthorized access,
                disclosure, or misuse.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Your Rights</h2>
              <p className="mt-2">
                You may request access, correction, or deletion of your personal data,
                subject to legal and operational retention requirements.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Contact</h2>
              <p className="mt-2">
                For privacy-related queries, contact: kishor@hkrbiotechlabs.com
              </p>
              <p>HKR Biotech Pvt. Ltd., NCL Innovation Park, Pashan Road, Pune - 411008.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
