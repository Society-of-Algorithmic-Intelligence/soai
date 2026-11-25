import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Send,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { ApiError, applyForJob, getJob, type JobPosting } from "@/lib/api";

const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const RESUME_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#003d7b] focus:outline-none focus:ring-1 focus:ring-[#003d7b]";

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsDataURL(file);
  });
}

function splitLines(value: string | null | undefined): string[] {
  return (value || "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
      {children}
    </label>
  );
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#003d7b]" aria-hidden="true" />
      <div>
        <dt className="font-medium text-gray-900">{label}</dt>
        <dd className="text-gray-700">{value}</dd>
      </div>
    </div>
  );
}

export default function JobDetail() {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    linkedin_url: "",
    portfolio_url: "",
    cover_letter: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) {
      setLoading(false);
      setLoadError("not_found");
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setLoadError(null);
    setJob(null);
    setSubmittedId(null);
    setFormError(null);
    setResume(null);

    getJob(jobId, controller.signal)
      .then((item) => {
        if (!controller.signal.aborted) setJob(item);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setLoadError(
          err instanceof ApiError && err.status === 404
            ? "not_found"
            : err instanceof Error
              ? err.message
              : "Unable to load this role."
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [jobId]);

  const descriptionParagraphs = useMemo(
    () =>
      (job?.description || "")
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    [job]
  );
  const responsibilities = useMemo(() => splitLines(job?.responsibilities), [job]);
  const requirements = useMemo(() => splitLines(job?.requirements), [job]);

  function updateField(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onResumeChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setFormError(null);
    if (!file) {
      setResume(null);
      return;
    }
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    if (!RESUME_TYPES[extension]) {
      setFormError("Please upload a PDF, DOC, or DOCX file.");
      event.target.value = "";
      setResume(null);
      return;
    }
    if (file.size > RESUME_MAX_BYTES) {
      setFormError("Resume must be 5 MB or smaller.");
      event.target.value = "";
      setResume(null);
      return;
    }
    setResume(file);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!job) return;
    setFormError(null);

    const firstName = form.first_name.trim();
    const lastName = form.last_name.trim();
    const email = form.email.trim();
    if (!firstName || !lastName || !email) {
      setFormError("Please enter your first name, last name, and email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!resume) {
      setFormError("Please attach your resume.");
      return;
    }

    setSubmitting(true);
    try {
      const extension = resume.name.split(".").pop()?.toLowerCase() || "pdf";
      const dataBase64 = await readFileAsBase64(resume);
      const result = await applyForJob({
        job_id: job.id,
        first_name: firstName,
        last_name: lastName,
        email,
        phone: form.phone.trim() || undefined,
        linkedin_url: form.linkedin_url.trim() || undefined,
        portfolio_url: form.portfolio_url.trim() || undefined,
        cover_letter: form.cover_letter.trim() || undefined,
        resume: {
          filename: resume.name,
          content_type: RESUME_TYPES[extension] || "application/octet-stream",
          data_base64: dataBase64,
        },
      });
      setSubmittedId(result.application_id);
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        linkedin_url: "",
        portfolio_url: "",
        cover_letter: "",
      });
      setResume(null);
    } catch (err: unknown) {
      const message =
        err instanceof ApiError && err.message === "resume_too_large"
          ? "Resume must be 5 MB or smaller."
          : err instanceof ApiError && err.message === "unsupported_resume_type"
            ? "Please upload a PDF, DOC, or DOCX file."
            : err instanceof Error
              ? err.message
              : "We could not submit your application. Please try again.";
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Loading role…
        </div>
      </div>
    );
  }

  if (loadError || !job) {
    return (
      <div className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-[#003d7b] via-[#002a57] to-[#001a35] py-16">
          <div className="container mx-auto max-w-4xl px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#ffcf8c]">Careers at SoAI</p>
            <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">Role not available</h1>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto max-w-3xl px-6">
            <div className="rounded-xl border border-gray-200 bg-[#f9fafb] p-8 text-center">
              <p className="text-gray-700">
                This role may have been filled or is no longer published.
              </p>
              <Link
                to="/jobs"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#003d7b] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#002a57]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                View all job opportunities
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const externalApplyUrl =
    job.apply_url ||
    (job.apply_email
      ? `mailto:${job.apply_email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`
      : null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003d7b] via-[#002a57] to-[#001a35] py-14 md:py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All job opportunities
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[#ffcf8c]">
            Job Opportunity
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
            {job.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85">
            {job.department && (
              <span className="inline-flex items-center gap-2">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                {job.department}
              </span>
            )}
            {job.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {job.location}
              </span>
            )}
            {job.employment_type && (
              <span className="inline-flex items-center gap-2">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
                {job.employment_type}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 space-y-10">
              <section className="space-y-4">
                {job.summary && (
                  <p className="text-lg font-medium leading-relaxed text-gray-900">{job.summary}</p>
                )}
                {descriptionParagraphs.length > 0 ? (
                  <div className="space-y-4">
                    {descriptionParagraphs.map((paragraph, index) => (
                      <p key={index} className="whitespace-pre-line text-gray-800 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-800 leading-relaxed">
                    Full details for this role are available on request. Please submit your
                    application below.
                  </p>
                )}
              </section>

              {responsibilities.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Responsibilities</h2>
                  <ul className="list-disc space-y-2 pl-6 text-gray-800 leading-relaxed">
                    {responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {requirements.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Requirements</h2>
                  <ul className="list-disc space-y-2 pl-6 text-gray-800 leading-relaxed">
                    {requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              <section id="apply" className="scroll-mt-24">
                {externalApplyUrl ? (
                  <div className="rounded-xl border border-[#003d7b]/20 bg-[#f0f6ff] p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900">How to apply</h2>
                    <p className="mt-2 text-gray-800 leading-relaxed">
                      {job.apply_email
                        ? "Applications for this role are handled directly by the hiring team. Please send your CV and representative publications by email."
                        : "Applications for this role are handled directly by the hiring team. Please submit your application through the link below."}
                    </p>
                    {job.apply_email && (
                      <p className="mt-4 text-gray-800">
                        Email:{" "}
                        <a
                          href={`mailto:${job.apply_email}`}
                          className="font-semibold text-[#003d7b] hover:underline"
                        >
                          {job.apply_email}
                        </a>
                      </p>
                    )}
                    {job.apply_url && (
                      <p className="mt-2 break-all text-gray-800">
                        Application page:{" "}
                        <a
                          href={job.apply_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-[#003d7b] hover:underline"
                        >
                          {job.apply_url}
                        </a>
                      </p>
                    )}
                    <a
                      href={externalApplyUrl}
                      target={job.apply_url ? "_blank" : undefined}
                      rel={job.apply_url ? "noreferrer" : undefined}
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-[#003d7b] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#002a57]"
                    >
                      {job.apply_url ? (
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      )}
                      {job.apply_url ? "Open application page" : "Email your application"}
                    </a>
                  </div>
                ) : submittedId ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                    <CheckCircle2
                      className="mx-auto h-10 w-10 text-emerald-600"
                      aria-hidden="true"
                    />
                    <h2 className="mt-3 text-2xl font-semibold text-gray-900">
                      Application submitted
                    </h2>
                    <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-700">
                      Thank you for applying for <strong>{job.title}</strong>. We have received
                      your application and resume. Your reference number is{" "}
                      <strong>{submittedId}</strong>.
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                      <Link
                        to="/jobs"
                        className="inline-flex items-center gap-2 rounded-md bg-[#003d7b] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#002a57]"
                      >
                        Browse other roles
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900">Apply for this role</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Fields marked <span className="text-red-600">*</span> are required. Resume
                      must be a PDF, DOC, or DOCX file up to 5 MB.
                    </p>

                    <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="First name" required>
                          <input
                            className={inputClass}
                            value={form.first_name}
                            onChange={(e) => updateField("first_name", e.target.value)}
                            autoComplete="given-name"
                            required
                          />
                        </Field>
                        <Field label="Last name" required>
                          <input
                            className={inputClass}
                            value={form.last_name}
                            onChange={(e) => updateField("last_name", e.target.value)}
                            autoComplete="family-name"
                            required
                          />
                        </Field>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Email" required>
                          <input
                            type="email"
                            className={inputClass}
                            value={form.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            autoComplete="email"
                            required
                          />
                        </Field>
                        <Field label="Phone">
                          <input
                            type="tel"
                            className={inputClass}
                            value={form.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            autoComplete="tel"
                          />
                        </Field>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="LinkedIn">
                          <input
                            type="url"
                            className={inputClass}
                            value={form.linkedin_url}
                            onChange={(e) => updateField("linkedin_url", e.target.value)}
                            placeholder="https://www.linkedin.com/in/…"
                          />
                        </Field>
                        <Field label="Personal website / portfolio">
                          <input
                            type="url"
                            className={inputClass}
                            value={form.portfolio_url}
                            onChange={(e) => updateField("portfolio_url", e.target.value)}
                            placeholder="https://…"
                          />
                        </Field>
                      </div>

                      <Field label="Cover letter">
                        <textarea
                          rows={5}
                          className={inputClass}
                          value={form.cover_letter}
                          onChange={(e) => updateField("cover_letter", e.target.value)}
                          placeholder="Tell us why you are interested in this role and what you would bring to SoAI."
                        />
                      </Field>

                      <Field label="Resume" required>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={onResumeChange}
                          className="block w-full cursor-pointer text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-[#003d7b] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#002a57]"
                          required
                        />
                      </Field>

                      <p className="text-xs leading-relaxed text-gray-500">
                        By submitting this application, you consent to SoAI storing and processing
                        your details for recruitment purposes.
                      </p>

                      {formError && (
                        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                          {formError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ee7c01] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d66900] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {submitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        ) : (
                          <Send className="h-4 w-4" aria-hidden="true" />
                        )}
                        {submitting ? "Submitting…" : "Submit application"}
                      </button>
                    </form>
                  </div>
                )}
              </section>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold text-gray-900">At a glance</h2>
                <dl className="mt-4 space-y-4 text-sm">
                  {job.department && (
                    <MetaRow icon={Building2} label="Department" value={job.department} />
                  )}
                  {job.location && <MetaRow icon={MapPin} label="Location" value={job.location} />}
                  {job.employment_type && (
                    <MetaRow icon={Briefcase} label="Employment type" value={job.employment_type} />
                  )}
                  {job.salary_range && (
                    <MetaRow icon={Wallet} label="Compensation" value={job.salary_range} />
                  )}
                </dl>
                <a
                  href={externalApplyUrl || "#apply"}
                  target={job.apply_url ? "_blank" : undefined}
                  rel={job.apply_url ? "noreferrer" : undefined}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#003d7b] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#002a57]"
                >
                  {externalApplyUrl
                    ? job.apply_url
                      ? "Apply now"
                      : "Apply by email"
                    : "Apply for this role"}
                </a>
              </div>

              <div className="rounded-xl border border-gray-200 bg-[#f9fafb] p-5">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#003d7b]" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-gray-600">
                    Applications are reviewed by the hiring team. Only shortlisted candidates will
                    be contacted.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
