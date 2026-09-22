import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";
import cfpArtwork from "@/assets/IntelligenceX/cfp_artwork.png";
import cfpQr from "@/assets/IntelligenceX/cfp_qr.png";

const SPECIAL_ISSUE_URL = "https://think.taylorandfrancis.com/special_issues/quantum_ai/";

const topics = [
  "Statistical methods and learning theory for quantum computing and quantum ML",
  "Quantum algorithms, AI for quantum systems and hybrid quantum–classical learning",
  "Inference, uncertainty quantification and high-dimensional quantum data",
  "Benchmarking, validation, explainability and trustworthy Quantum AI",
  "Applications in finance, economics, engineering, healthcare and the natural sciences",
];

const guestEditors = [
  { name: "Thorsten Koch", affiliation: "Zuse Institute Berlin and TU Berlin" },
  { name: "Stefan Lessmann", affiliation: "Humboldt-Universität zu Berlin" },
  { name: "Simon Trimborn", affiliation: "University of Amsterdam" },
];

export default function IntelligenceX2026CallForPapers() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-14 bg-gray-900">
        <img
          src={intelligenceXBg}
          alt="IntelligenceX 2026 background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-[#003d7b]/80" />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <p className="text-sm font-semibold text-[#ffcf8c] mb-2 uppercase tracking-wide">
            IntelligenceX 2026 · Call for Papers
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Statistics Special Issue
          </h1>
          <p className="text-white/85 text-base max-w-2xl">
            Artificial Intelligence &amp; Quantum Computing: Statistical Methods, Theory, and
            Applications — in collaboration with IntelligenceX 2026.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 max-w-3xl space-y-10">

          {/* Back link */}
          <div>
            <Link to="/events/intelligencex-2026" className="text-sm text-[#003d7b] hover:underline">
              ← Back to IntelligenceX 2026
            </Link>
          </div>

          {/* About the special issue */}
          <section className="rounded-lg border border-gray-200 bg-[#f9fafb] p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="min-w-0 flex-1 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Special Issue on Artificial Intelligence &amp; Quantum Computing
                </h2>
                <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                  We invite methodological, theoretical, and application-oriented research at the
                  intersection of AI, quantum computing, and statistics. Contributions should offer
                  clear statistical or methodological insights, including rigorous approaches to
                  learning, uncertainty, or the evaluation of Quantum AI.
                </p>
              </div>
              <img
                src={cfpArtwork}
                alt="Quantum × AI artwork"
                className="h-40 w-40 shrink-0 rounded-lg object-cover shadow-sm md:h-44 md:w-44"
                loading="lazy"
              />
            </div>
          </section>

          {/* Topics of interest */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Topics of Interest</h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              Topics include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-800 text-sm md:text-base">
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </section>

          {/* Guest editors */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900">Guest Editors</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {guestEditors.map((editor) => (
                <div key={editor.name} className="rounded-lg border border-gray-200 bg-white px-5 py-4">
                  <p className="text-base font-semibold text-gray-900">{editor.name}</p>
                  <p className="mt-0.5 text-sm leading-snug text-gray-600">{editor.affiliation}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Submission details */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900">Submission</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                  Submission Deadline
                </p>
                <p className="text-base font-semibold text-gray-900">31 March 2027</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                  Submit via
                </p>
                <p className="text-base font-semibold text-gray-900">Statistics journal portal</p>
              </div>
            </div>

            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              Submit through the <span className="font-medium">Statistics</span> portal and select
              the special issue title shown above. Open to all researchers. Conference authors are
              invited to submit substantially extended work. All manuscripts undergo the journal’s
              standard peer review.
            </p>

            <div className="flex flex-col gap-6 rounded-xl border border-[#003d7b]/20 bg-[#f0f6ff] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#003d7b]">Read the full call</h3>
                <p className="text-sm text-gray-700">
                  Submission instructions and further details are available on the journal’s special
                  issue page.
                </p>
                <a
                  href={SPECIAL_ISSUE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#003d7b] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#002a57]"
                >
                  View the call &amp; submit →
                </a>
              </div>
              <div className="shrink-0 text-center">
                <img
                  src={cfpQr}
                  alt="QR code for the full call and submission instructions"
                  className="mx-auto h-28 w-28 rounded-md border border-gray-200 bg-white p-1"
                  loading="lazy"
                />
                <p className="mt-1.5 text-xs text-gray-500">Scan for the full call</p>
              </div>
            </div>
          </section>

          {/* Collaboration note */}
          <section className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">In collaboration with IntelligenceX 2026</span> — The
              Global Quantum×AI Frontier, Singapore, 24–26 September 2026.
            </p>
            <p>
              Conference website:{" "}
              <Link to="/events/intelligencex-2026" className="text-[#003d7b] hover:underline">
                soc-ai.org/events/intelligencex-2026
              </Link>
            </p>
          </section>

          {/* Back link bottom */}
          <div className="pt-2">
            <Link to="/events/intelligencex-2026" className="text-sm text-[#003d7b] hover:underline">
              ← Back to IntelligenceX 2026
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
