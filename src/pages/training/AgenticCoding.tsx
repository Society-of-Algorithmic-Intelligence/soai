import { Link } from "react-router-dom";
import { GraduationCap, Cpu, Wrench, Scale } from "lucide-react";

/**
 * Confirmed public SoAI contact email (used in the site footer and on the
 * Contact page). Update here if a dedicated programmes address is introduced.
 */
const PROGRAMME_ENQUIRIES_EMAIL = "info@soc-ai.org";

const offerings = [
  {
    icon: GraduationCap,
    title: "Training",
    description:
      "Professional training for teams and organisations on agentic coding workflows, tooling, and engineering practices.",
  },
  {
    icon: Cpu,
    title: "Related Methodology & Technology",
    description: "SoAI’s methodology and related technology for agentic software development.",
  },
  {
    icon: Wrench,
    title: "Implementation Support",
    description:
      "Support for organisations adopting and rolling out agentic coding practices in their own engineering workflows.",
  },
  {
    icon: Scale,
    title: "Licensing",
    description:
      "Licensing of the associated methodology and technology for organisations. See the Intellectual Property & Licensing section below.",
  },
];

export default function AgenticCoding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003d7b] via-[#002a57] to-[#001a35] py-14">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-sm font-semibold text-[#ffcf8c] mb-2 uppercase tracking-wide">
            Training / Certificate Programmes
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Agentic Coding</h1>
          <p className="text-white/85 text-base max-w-2xl">
            Training, related methodology and technology, implementation support, and licensing for
            AI agent-driven software development.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 max-w-3xl space-y-10">
          {/* Back link */}
          <div>
            <Link to="/training" className="text-sm text-[#003d7b] hover:underline">
              ← Back to Training / Certificate Programmes
            </Link>
          </div>

          {/* About */}
          <section className="rounded-lg border border-gray-200 bg-[#f9fafb] p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Agentic Coding at SoAI</h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              Agentic coding — software development driven by autonomous AI agents — is changing
              how software is built. SoAI provides training, related methodology and technology,
              implementation support, and licensing to help organisations understand and adopt
              agentic coding effectively.
            </p>
          </section>

          {/* What we provide */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900">What We Provide</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {offerings.map((offering) => {
                const Icon = offering.icon;
                return (
                  <div
                    key={offering.title}
                    className="rounded-lg border border-gray-200 bg-white p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#003d7b]/10 text-[#003d7b]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-gray-900">
                      {offering.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                      {offering.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Intellectual property & licensing */}
          <section
            id="intellectual-property-licensing"
            className="rounded-lg border border-gray-200 bg-[#f9fafb] p-6 md:p-8 space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Intellectual Property &amp; Licensing
            </h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              The associated intellectual property is owned by the Society of Algorithmic
              Intelligence (SoAI). Public universities may, in principle, be granted royalty-free
              use for academic and research purposes, subject to{" "}
              <strong className="font-bold text-[#003d7b]">prior written authorization</strong>{" "}
              by SoAI, appropriate acknowledgement, and display of the SoAI logo. Such use must be
              identified as licensed by SoAI. Licensing for other organizations and purposes will
              be considered on a case-by-case basis.
            </p>
            <p className="rounded-r-lg border-l-4 border-[#ee7c01] bg-white px-4 py-3 text-sm font-semibold text-gray-900">
              Authorization must be granted in writing by SoAI.
            </p>
          </section>

          {/* Enquiries */}
          <section
            id="enquiries"
            className="rounded-xl border border-[#003d7b]/20 bg-[#f0f6ff] px-6 py-6 space-y-2"
          >
            <h2 className="text-lg font-semibold text-[#003d7b]">Enquiries</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              For enquiries about agentic coding training, technology, or licensing, contact us at{" "}
              <a
                href={`mailto:${PROGRAMME_ENQUIRIES_EMAIL}`}
                className="font-medium text-[#003d7b] hover:underline"
              >
                {PROGRAMME_ENQUIRIES_EMAIL}
              </a>
              .
            </p>
          </section>

          {/* Back link bottom */}
          <div className="pt-2">
            <Link to="/training" className="text-sm text-[#003d7b] hover:underline">
              ← Back to Training / Certificate Programmes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
