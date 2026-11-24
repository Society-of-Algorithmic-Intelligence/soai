import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Check,
  Clock,
  Link2,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import satoshiImg from "@/assets/others/Satoshi-web.webp";

const TITLE = "AI Scientists at Scale: From Fugaku to the Next Era of Discovery";
const EVENT_DATE = "Friday, 27 November 2026";
const EVENT_TIME = "10:30–11:30 AM";
const VENUE = "S17-04-04, National University of Singapore";
const SHARE_URL = "https://www.soc-ai.org/events/matsuoka-seminar";

const MAP_URL = `https://maps.google.com/?q=${encodeURIComponent(VENUE)}`;
const CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(TITLE)}` +
  "&dates=20261127T103000/20261127T113000" +
  "&ctz=Asia%2FSingapore" +
  `&location=${encodeURIComponent(VENUE)}` +
  `&details=${encodeURIComponent(
    "SoAI Distinguished Speaker Seminar with Prof. Satoshi Matsuoka, Director of the RIKEN Center for Computational Science (R-CCS).",
  )}`;

const LINKEDIN_SHARE_URL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`;
const EMAIL_SHARE_URL =
  `mailto:?subject=${encodeURIComponent(`SoAI Distinguished Speaker Seminar: ${TITLE}`)}` +
  `&body=${encodeURIComponent(
    `You are invited to a SoAI Distinguished Speaker Seminar.\n\n${TITLE}\nProf. Satoshi Matsuoka, Director, RIKEN Center for Computational Science (R-CCS), Japan\n\n${EVENT_DATE}\n${EVENT_TIME}\n${VENUE}\n\nDetails: ${SHARE_URL}`,
  )}`;

const ABSTRACT =
  "AI agents can help scientists connect data, simulations and experiments across the research cycle, from developing hypotheses to testing and interpreting results. I will illustrate that approach with work on cardiac digital twins and scientific imaging and discuss what researchers need to validate AI-assisted findings. I will then describe RIKEN’s work on the computing infrastructure for AI for Science, from Fugaku and RIKYU to the co-design of FugakuNEXT and research on quantum–HPC integration. I will close with opportunities for international collaboration on shared tools and methods for scientific discovery.";

const BIO =
  "Satoshi Matsuoka is Director of the RIKEN Center for Computational Science (R-CCS) since 2018 and a leading figure in high-performance computing. He led development of the Fugaku supercomputer, which topped all major global rankings in 2020–2021. His research advances next-generation, post-Moore computing, including the future FugakuNEXT system. A recipient of the ACM Gordon Bell Prize and major IEEE honors, he has published over 500 papers.";

export default function MatsuokaSeminar2026() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link to share the seminar:", SHARE_URL);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003d7b] via-[#002a57] to-[#001a35] py-14 md:py-20">
        <div className="container mx-auto max-w-5xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#ffcf8c]">
            SoAI Distinguished Speaker Seminar
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
            {TITLE}
          </h1>
          <p className="mt-6 text-lg font-semibold text-white md:text-xl">
            Prof. Satoshi Matsuoka
          </p>
          <p className="mt-1 text-white/80">
            Director, RIKEN Center for Computational Science (R-CCS), Japan
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {EVENT_DATE}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {EVENT_TIME}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {VENUE}
            </span>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <Link
            to="/events"
            className="inline-block text-sm text-[#003d7b] hover:underline"
          >
            ← Back to Events
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="order-2 min-w-0 space-y-9 lg:order-1">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">About the Seminar</h2>
                <p className="text-gray-800 leading-relaxed">
                  We are pleased to invite you to an upcoming distinguished speaker seminar
                  featuring Prof. Satoshi Matsuoka, Director of the RIKEN Center for Computational
                  Science (R-CCS), Japan. Prof. Matsuoka is a globally recognised leader in
                  high-performance computing and will share insights into AI-driven scientific
                  discovery, next-generation supercomputing, and quantum–HPC integration.
                </p>
                <p className="text-gray-800 leading-relaxed">
                  We warmly encourage all consortium members to join us for this opportunity to
                  hear from a leading international expert.
                </p>
              </section>

              <section id="abstract" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Abstract</h2>
                <p className="text-gray-800 leading-relaxed">{ABSTRACT}</p>
              </section>

              <section id="speaker" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">About the Speaker</h2>
                <div className="rounded-xl border border-gray-200 bg-[#f9fafb] p-5 md:p-6">
                  <p className="font-semibold text-gray-900">Prof. Satoshi Matsuoka</p>
                  <p className="mt-0.5 text-sm text-gray-600">
                    Director, RIKEN Center for Computational Science (R-CCS), Japan
                  </p>
                  <p className="mt-3 text-gray-800 leading-relaxed">{BIO}</p>
                </div>
              </section>

              <p className="text-sm text-gray-600">
                For enquiries, please contact{" "}
                <a
                  href="mailto:info@soc-ai.org"
                  className="font-medium text-[#003d7b] hover:underline"
                >
                  info@soc-ai.org
                </a>
                .
              </p>
            </div>

            <aside className="order-1 space-y-6 lg:order-2 lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <img
                  src={satoshiImg}
                  alt="Prof. Satoshi Matsuoka"
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
                <div className="space-y-5 p-5">
                  <dl className="space-y-4 text-sm">
                    <div className="flex gap-3">
                      <CalendarDays
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#003d7b]"
                        aria-hidden="true"
                      />
                      <div>
                        <dt className="font-medium text-gray-900">Date</dt>
                        <dd className="text-gray-700">{EVENT_DATE}</dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#003d7b]"
                        aria-hidden="true"
                      />
                      <div>
                        <dt className="font-medium text-gray-900">Time</dt>
                        <dd className="text-gray-700">{EVENT_TIME}</dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#003d7b]"
                        aria-hidden="true"
                      />
                      <div>
                        <dt className="font-medium text-gray-900">Venue</dt>
                        <dd className="text-gray-700">{VENUE}</dd>
                      </div>
                    </div>
                  </dl>

                  <div className="space-y-2 border-t border-gray-100 pt-5">
                    <a
                      href={CALENDAR_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#003d7b] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#002a57]"
                    >
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      Add to calendar
                    </a>
                    <a
                      href={MAP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
                    >
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      View venue on map
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold text-gray-900">Share this seminar</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Help us circulate the announcement.
                </p>
                <div className="mt-4 grid gap-2">
                  <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:border-[#003d7b]/40 hover:text-[#003d7b]"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Link2 className="h-4 w-4" aria-hidden="true" />
                    )}
                    {copied ? "Link copied" : "Copy link"}
                  </button>
                  <a
                    href={LINKEDIN_SHARE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:border-[#003d7b]/40 hover:text-[#003d7b]"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    Share on LinkedIn
                  </a>
                  <a
                    href={EMAIL_SHARE_URL}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:border-[#003d7b]/40 hover:text-[#003d7b]"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Share by email
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
