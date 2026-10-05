import { Link } from "react-router-dom";

/**
 * Confirmed public SoAI contact email (used in the site footer and on the
 * Contact page). Update here if a dedicated programmes address is introduced.
 */
const PROGRAMME_ENQUIRIES_EMAIL = "info@soc-ai.org";

/**
 * Programme fields are intentionally marked "To be announced" — no dates,
 * fees, duration, or instructors have been confirmed yet. Replace the values
 * as details are finalised.
 */
const programmeInformation = [
  { label: "Format", value: "To be announced" },
  { label: "Duration", value: "To be announced" },
  { label: "Dates", value: "To be announced" },
  { label: "Fees", value: "To be announced" },
  { label: "Instructors", value: "To be announced" },
  { label: "Certificate", value: "To be announced" },
];

export default function QuantumTechnologyBusinessLeaders() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003d7b] via-[#002a57] to-[#001a35] py-14">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-sm font-semibold text-[#ffcf8c] mb-2 uppercase tracking-wide">
            Training / Certificate Programmes
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Quantum Technology for Business Leaders
          </h1>
          <p className="text-white/85 text-base max-w-2xl">
            An executive programme for leaders who want a clear, practical view of quantum
            technology and its business implications.
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

          {/* About the programme */}
          <section className="rounded-lg border border-gray-200 bg-[#f9fafb] p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">About the Programme</h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              Quantum Technology for Business Leaders is a professional programme designed for
              executives and decision-makers. It provides a clear, practical introduction to
              quantum computing and quantum technologies — the core ideas, the current state of the
              field, and their emerging implications for business strategy and decision-making.
            </p>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              The programme is intended for senior executives, managers, and professionals who
              make or influence technology and strategy decisions in their organisations.
            </p>
          </section>

          {/* Programme information */}
          <section id="programme-information" className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900">Programme Information</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {programmeInformation.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                    {item.label}
                  </p>
                  <p className="text-base font-semibold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Detailed programme information is currently being finalised and will be published on
              this page.
            </p>
          </section>

          {/* Enquiries */}
          <section
            id="enquiries"
            className="rounded-xl border border-[#003d7b]/20 bg-[#f0f6ff] px-6 py-6 space-y-2"
          >
            <h2 className="text-lg font-semibold text-[#003d7b]">Enquiries</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              For enquiries about this programme, contact us at{" "}
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
