import { Link } from "react-router-dom";
import programmeBanner from "@/assets/training/quantum-business-leaders-programme.jpg";

/**
 * Confirmed public SoAI contact email (used in the site footer and on the
 * Contact page). Update here if a dedicated programmes address is introduced.
 */
const PROGRAMME_ENQUIRIES_EMAIL = "info@soc-ai.org";

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

          {/* Programme overview — the original programme slide, presented as-is */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Programme Overview</h2>
            <a
              href={programmeBanner}
              target="_blank"
              rel="noreferrer"
              className="block overflow-hidden rounded-xl border border-gray-200 shadow-sm transition hover:shadow-md"
              aria-label="Open the full-size programme slide"
            >
              <img
                src={programmeBanner}
                alt="Quantum Technology for Business Leaders — SoAI 2027 Executive Programme (13–16 April 2027, ETH Zurich; 17 April alpine networking)"
                className="w-full"
                loading="lazy"
              />
            </a>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={programmeBanner}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#003d7b] bg-white px-5 py-2 text-sm font-semibold text-[#003d7b] shadow-sm transition hover:bg-[#f0f6ff]"
              >
                View full size ↗
              </a>
              <a
                href={`${import.meta.env.BASE_URL}training/SoAI-2027-Quantum-Technology-for-Business-Leaders.pdf`}
                download
                className="inline-flex items-center justify-center rounded-full bg-[#003d7b] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#002a57]"
              >
                Download programme (PDF)
              </a>
            </div>
          </section>

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
