import type { Metadata } from "next";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for use of HKR Biotech Pvt. Ltd. website and enquiry services.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="relative overflow-x-hidden">
      <PageAmbientGraphics variant="right" opacity="opacity-[0.14]" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-on-dark/20 bg-[rgba(18,25,35,0.55)] p-8 shadow-[0_12px_40px_-16px_rgba(18,25,35,0.7)] backdrop-blur-xl sm:p-10">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-primary-mid">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-on-dark md:text-4xl">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-sm text-on-dark/78">Last updated: April 30, 2026</p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-on-dark/84">
            <p>
              These terms govern access to and use of the HKR Biotech Pvt. Ltd.
              website and communication channels. By using this website, you agree to
              these terms.
            </p>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Use of Website</h2>
              <p className="mt-2">
                You agree to use this website for lawful purposes only and not to
                interfere with its operation, security, or availability.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Technical Information</h2>
              <p className="mt-2">
                Product, service, and technical content is provided for general
                informational purposes and may be updated without prior notice.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Project Scope</h2>
              <p className="mt-2">
                Any service engagement, deliverables, timelines, or pricing are subject
                to separate written proposals, quotations, and mutually agreed
                commercial terms.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Intellectual Property</h2>
              <p className="mt-2">
                Website content, branding, and associated material are owned by HKR
                Biotech Pvt. Ltd. unless otherwise specified. Unauthorized use,
                reproduction, or distribution is prohibited.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Limitation of Liability</h2>
              <p className="mt-2">
                HKR Biotech Pvt. Ltd. is not liable for indirect or consequential
                damages arising from website use. Users are responsible for independent
                technical and regulatory evaluation of any information before use.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Governing Law</h2>
              <p className="mt-2">
                These terms are governed by the laws applicable in Pune, Maharashtra,
                India, unless otherwise agreed in writing for specific engagements.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
