import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Building2,
  MapPin,
  RefreshCw,
  Search,
  SearchX,
} from "lucide-react";
import { getJobs, type JobPosting } from "@/lib/api";

type SortOption = "newest" | "title";

const selectClass =
  "mt-1 w-full min-w-0 max-w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#003d7b] focus:outline-none focus:ring-1 focus:ring-[#003d7b]";

function uniqueSorted(values: Array<string | null | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value)))].sort((a, b) =>
    a.localeCompare(b)
  );
}

function jobTimestamp(value: string | null | undefined): number {
  if (!value) return 0;
  const normalized = value.includes("T") ? value : `${value.replace(" ", "T")}Z`;
  const time = new Date(normalized).getTime();
  return Number.isFinite(time) ? time : 0;
}

function formatPosted(value: string | null | undefined): string {
  if (!value) return "";
  const normalized = value.includes("T") ? value : `${value.replace(" ", "T")}Z`;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Jobs() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [location, setLocation] = useState("all");
  const [employmentType, setEmploymentType] = useState("all");
  const [sort, setSort] = useState<SortOption>("newest");

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

  const departments = useMemo(() => uniqueSorted(jobs.map((job) => job.department)), [jobs]);
  const locations = useMemo(() => uniqueSorted(jobs.map((job) => job.location)), [jobs]);
  const employmentTypes = useMemo(
    () => uniqueSorted(jobs.map((job) => job.employment_type)),
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = jobs.filter((job) => {
      if (department !== "all" && job.department !== department) return false;
      if (location !== "all" && job.location !== location) return false;
      if (employmentType !== "all" && job.employment_type !== employmentType) return false;

      if (query) {
        const haystack = [
          job.title,
          job.department,
          job.location,
          job.employment_type,
          job.summary,
          job.description,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });

    return result.sort((a, b) =>
      sort === "title"
        ? a.title.localeCompare(b.title)
        : jobTimestamp(b.created_at) - jobTimestamp(a.created_at)
    );
  }, [jobs, search, department, location, employmentType, sort]);

  const hasFilters =
    search.trim() !== "" ||
    department !== "all" ||
    location !== "all" ||
    employmentType !== "all";

  function clearFilters() {
    setSearch("");
    setDepartment("all");
    setLocation("all");
    setEmploymentType("all");
  }

  return (
    <div className="bg-white">
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

      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* Filters */}
            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-base font-semibold text-gray-900">Filter roles</h2>
                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-xs font-semibold text-[#003d7b] hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="job-search" className="block text-sm font-medium text-gray-700">
                      Search
                    </label>
                    <div className="relative mt-1">
                      <Search
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                      />
                      <input
                        id="job-search"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search roles…"
                        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 focus:border-[#003d7b] focus:outline-none focus:ring-1 focus:ring-[#003d7b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="job-department-filter"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Department
                    </label>
                    <select
                      id="job-department-filter"
                      value={department}
                      onChange={(event) => setDepartment(event.target.value)}
                      className={selectClass}
                    >
                      <option value="all">All departments</option>
                      {departments.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="job-location-filter"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location
                    </label>
                    <select
                      id="job-location-filter"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      className={selectClass}
                    >
                      <option value="all">All locations</option>
                      {locations.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="job-type-filter"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Employment type
                    </label>
                    <select
                      id="job-type-filter"
                      value={employmentType}
                      onChange={(event) => setEmploymentType(event.target.value)}
                      className={selectClass}
                    >
                      <option value="all">All types</option>
                      {employmentTypes.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="min-w-0">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Open positions</h2>
                  <p className="mt-1 text-sm text-gray-600" aria-live="polite">
                    {loading
                      ? "Loading current openings…"
                      : hasFilters
                        ? `${filteredJobs.length} of ${jobs.length} roles match your filters`
                        : jobs.length === 1
                          ? "1 role currently open"
                          : `${jobs.length} roles currently open`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="job-sort" className="text-sm text-gray-600">
                    Sort
                  </label>
                  <select
                    id="job-sort"
                    value={sort}
                    onChange={(event) => setSort(event.target.value as SortOption)}
                    className="min-w-0 max-w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-700 focus:border-[#003d7b] focus:outline-none focus:ring-1 focus:ring-[#003d7b]"
                  >
                    <option value="newest">Newest</option>
                    <option value="title">Title A–Z</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setReloadKey((key) => key + 1)}
                    disabled={loading}
                    aria-label="Refresh job listings"
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {loading && !error && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  {[0, 1, 2].map((item) => (
                    <div
                      key={item}
                      className="h-32 animate-pulse border-b border-gray-100 bg-gray-50 last:border-b-0"
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
                    We are always interested in hearing from exceptional researchers and
                    practitioners. Send a speculative application to{" "}
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

              {!loading && !error && jobs.length > 0 && filteredJobs.length === 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                  <SearchX className="mx-auto h-8 w-8 text-gray-400" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-semibold text-gray-900">
                    No roles match your filters
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Try a different keyword, or clear the filters to see all open positions.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 inline-flex items-center justify-center rounded-md bg-[#003d7b] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#002a57]"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              {!loading && !error && filteredJobs.length > 0 && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="divide-y divide-gray-100">
                    {filteredJobs.map((job) => (
                      <Link
                        key={job.id}
                        to={`/jobs/${job.id}`}
                        className="group block px-5 py-5 transition-colors hover:bg-[#f8fafc]"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h3 className="text-lg font-semibold leading-snug text-gray-900 transition-colors group-hover:text-[#003d7b]">
                              {job.title}
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-gray-600">
                              {job.department && (
                                <span className="inline-flex items-center gap-1.5">
                                  <Building2 className="h-4 w-4" aria-hidden="true" />
                                  {job.department}
                                </span>
                              )}
                              {job.location && (
                                <span className="inline-flex items-center gap-1.5">
                                  <MapPin className="h-4 w-4" aria-hidden="true" />
                                  {job.location}
                                </span>
                              )}
                              {job.employment_type && (
                                <span className="inline-flex items-center gap-1.5">
                                  <Briefcase className="h-4 w-4" aria-hidden="true" />
                                  {job.employment_type}
                                </span>
                              )}
                            </div>
                            {job.summary && (
                              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                                {job.summary}
                              </p>
                            )}
                          </div>

                          <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                            {job.created_at && (
                              <span className="text-xs text-gray-500">
                                Posted {formatPosted(job.created_at)}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#003d7b]">
                              View role
                              <ArrowRight
                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 rounded-xl border border-[#003d7b]/20 bg-[#f0f6ff] px-6 py-6">
                <h2 className="text-lg font-semibold text-[#003d7b]">Speculative applications</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  If you do not see a role that matches your background, we still welcome enquiries
                  from researchers, engineers, and partners who share our mission. Write to{" "}
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
          </div>
        </div>
      </section>
    </div>
  );
}
