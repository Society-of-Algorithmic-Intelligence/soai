import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, MapPin, RefreshCw } from "lucide-react";
import { getJobs, type JobPosting } from "@/lib/api";

export default function Jobs() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getJobs(controller.signal)
      .then((items) => {
        if (!controller.signal.aborted) setJobs(items);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Unable to load job openings right now.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003d7b] via-[#002a57] to-[#001a35] py-14 md:py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#ffcf8c]">
            Careers at SoAI
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
            Job Opportunities
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Join the Society of Algorithmic Intelligence and work with researchers, practitioners,
            and partners on the frontier of AI, optimisation, data science, and quantum computing.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Open positions</h2>
              <p className="mt-1 text-sm text-gray-600">
                {loading
                  ? "Loading current openings…"
                  : jobs.length === 1
                    ? "1 role currently open"
                    : `${jobs.length} roles currently open`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
              Refresh
            </button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading && !error && (
            <div className="grid gap-5 md:grid-cols-2">
              {[0, 1].map((item) => (
                <div
                  key={item}
                  className="h-44 animate-pulse rounded-xl border border-gray-200 bg-gray-50"
                />
              ))}
            </div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="rounded-xl border border-gray-200 bg-[#f9fafb] p-8 text-center">
              <Briefcase className="mx-auto h-8 w-8 text-[#003d7b]" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                There are no open positions right now
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
                We are always interested in hearing from exceptional researchers and practitioners.
                Send a speculative application to{" "}
                <a
                  href="mailto:info@soc-ai.org"
                  className="font-medium text-[#003d7b] hover:underline"
                >
                  info@soc-ai.org
                </a>
                .
              </p>
            </div>
          )}

          {!loading && !error && jobs.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-[#003d7b]/40 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold leading-snug text-gray-900 transition-colors group-hover:text-[#003d7b]">
                      {job.title}
                    </h3>
                    <ArrowRight
                      className="mt-1 h-5 w-5 shrink-0 text-[#003d7b] transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-gray-600">
                    {job.department && (
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" aria-hidden="true" />
                        {job.department}
                      </span>
                    )}
                    {job.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        {job.location}
                      </span>
                    )}
                    {job.employment_type && <span>{job.employment_type}</span>}
                  </div>

                  {job.summary && (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                      {job.summary}
                    </p>
                  )}

                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#003d7b]">
                    View role and apply
                  </span>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 rounded-xl border border-[#003d7b]/20 bg-[#f0f6ff] px-6 py-6">
            <h2 className="text-lg font-semibold text-[#003d7b]">Speculative applications</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              If you do not see a role that matches your background, we still welcome enquiries from
              researchers, engineers, and partners who share our mission. Write to{" "}
              <a
                href="mailto:info@soc-ai.org"
                className="font-medium text-[#003d7b] hover:underline"
              >
                info@soc-ai.org
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
