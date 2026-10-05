import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Confirmed public SoAI contact email (used in the site footer and on the
 * Contact page). Update here if a dedicated programmes address is introduced.
 */
const PROGRAMME_ENQUIRIES_EMAIL = "info@soc-ai.org";

const programmes = [
  {
    title: "Quantum Technology for Business Leaders",
    tag: "Executive Programme",
    description:
      "A professional programme that builds a clear, practical understanding of quantum technology — what it is, where it is heading, and what it means for business strategy and decision-making.",
    href: "/training/quantum-technology-for-business-leaders",
  },
  {
    title: "Agentic Coding",
    tag: "Professional Training & Licensing",
    description:
      "Training, related methodology and technology, implementation support, and licensing for organisations adopting AI agent-driven software development.",
    href: "/training/agentic-coding",
  },
];

export default function TrainingProgrammes() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003d7b] via-[#002a57] to-[#001a35] py-14">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-sm font-semibold text-[#ffcf8c] mb-2 uppercase tracking-wide">
            Society of Algorithmic Intelligence
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Training / Certificate Programmes
          </h1>
          <p className="text-white/85 text-base max-w-2xl">
            Professional and executive programmes that combine rigorous methodology, emerging
            technology, and practical implementation guidance.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 max-w-4xl space-y-10">
          {/* About our programmes */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">About Our Programmes</h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              SoAI’s Training / Certificate Programmes help professionals and organisations build
              capability in emerging areas of algorithmic intelligence, combining the Society’s
              methodological expertise with applied, practice-oriented delivery.
            </p>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              Detailed programme information — including format, dates, duration, and fees — is
              published on each programme page as it is confirmed.
            </p>
          </section>

          {/* Programme cards */}
          <section className="grid gap-5 sm:grid-cols-2">
            {programmes.map((programme) => (
              <Link
                key={programme.title}
                to={programme.href}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-[#003d7b]/40 hover:shadow-md"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-[#003d7b]">
                  {programme.tag}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-[#003d7b]">
                  {programme.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                  {programme.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#003d7b]">
                  View programme
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </section>

          {/* Enquiries */}
          <section className="rounded-xl border border-[#003d7b]/20 bg-[#f0f6ff] px-6 py-6">
            <h2 className="text-lg font-semibold text-[#003d7b] mb-2">Programme Enquiries</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              For questions about our programmes, or to register your interest, contact us at{" "}
              <a
                href={`mailto:${PROGRAMME_ENQUIRIES_EMAIL}`}
                className="font-medium text-[#003d7b] hover:underline"
              >
                {PROGRAMME_ENQUIRIES_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
