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
  Plus,
  Send,
  Trash2,
  Upload,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { ApiError, applyForJob, getJob, type JobPosting } from "@/lib/api";
import { unMemberCountries } from "@/data/countries";

const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const RESUME_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#003d7b] focus:outline-none focus:ring-1 focus:ring-[#003d7b]";

const COUNTRIES = [...unMemberCountries, "Other"];
const DEGREE_OPTIONS = [
  "PhD",
  "Master's",
  "Bachelor's",
  "Associate degree",
  "High school diploma",
  "Other",
];
const DISCIPLINE_OPTIONS = [
  "Mathematics",
  "Computer Science",
  "Statistics",
  "Engineering",
  "Physics",
  "Operations Research",
  "Data Science",
  "Economics",
  "Other",
];
const HIGHEST_EDUCATION_OPTIONS = [...DEGREE_OPTIONS];
const REFERRAL_OPTIONS = [
  "SoAI website",
  "LinkedIn",
  "Referred by a colleague",
  "Conference or seminar",
  "Email newsletter",
  "Other",
];
const SCHOOL_SUGGESTIONS = [
  "National University of Singapore",
  "Nanyang Technological University",
  "ETH Zurich",
  "University of Oxford",
  "University of Cambridge",
  "Massachusetts Institute of Technology",
  "Stanford University",
  "University of California, Berkeley",
  "Peking University",
  "Tsinghua University",
  "University of Tokyo",
  "Indian Institute of Technology",
];

type EducationEntry = {
  school: string;
  degree: string;
  discipline: string;
  start_date: string;
  end_date: string;
};

type ApplicationForm = {
  first_name: string;
  last_name: string;
  preferred_first_name: string;
  email: string;
  phone: string;
  country: string;
  linkedin_url: string;
  cover_letter: string;
  current_employer: string;
  research_years: string;
  highest_education: string;
  current_country: string;
  work_authorized: "" | "Yes" | "No";
  sponsorship_required: "" | "Yes" | "No";
  visa_details: string;
  pronouns: string;
  referral_source: string;
  privacy_consent: boolean;
};

const EMPTY_FORM: ApplicationForm = {
  first_name: "",
  last_name: "",
  preferred_first_name: "",
  email: "",
  phone: "",
  country: "",
  linkedin_url: "",
  cover_letter: "",
  current_employer: "",
  research_years: "",
  highest_education: "",
  current_country: "",
  work_authorized: "",
  sponsorship_required: "",
  visa_details: "",
  pronouns: "",
  referral_source: "",
  privacy_consent: false,
};

const createEducationEntry = (): EducationEntry => ({
  school: "",
  degree: "",
  discipline: "",
  start_date: "",
  end_date: "",
});

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

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 border-t border-gray-200 pt-6 first:border-t-0 first:pt-0">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function YesNoField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: "Yes" | "No") => void;
}) {
  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label} <span className="text-red-600">*</span>
      </span>
      <div className="flex gap-6 pt-1">
        {(["Yes", "No"] as const).map((option) => (
          <label key={option} className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="h-4 w-4 accent-[#003d7b]"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function JobDetail() {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [form, setForm] = useState<ApplicationForm>(EMPTY_FORM);
  const [education, setEducation] = useState<EducationEntry[]>([createEducationEntry()]);
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
    setForm(EMPTY_FORM);
    setEducation([createEducationEntry()]);
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

  function updateField<K extends keyof ApplicationForm>(key: K, value: ApplicationForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateEducation(index: number, key: keyof EducationEntry, value: string) {
    setEducation((prev) =>
      prev.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [key]: value } : entry
      )
    );
  }

  function addEducation() {
    setEducation((prev) => (prev.length >= 5 ? prev : [...prev, createEducationEntry()]));
  }

  function removeEducation(index: number) {
    setEducation((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
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
    const phone = form.phone.trim();
    if (!firstName || !lastName || !email || !phone || !form.country) {
      setFormError("Please complete your name, email, phone, and country.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (
      education.length === 0 ||
      education.some(
        (entry) =>
          !entry.school.trim() ||
          !entry.degree ||
          !entry.discipline ||
          !entry.start_date ||
          !entry.end_date
      )
    ) {
      setFormError("Please complete all required education fields.");
      return;
    }
    if (education.some((entry) => entry.end_date < entry.start_date)) {
      setFormError("Each education entry's end date must be on or after its start date.");
      return;
    }
    if (
      !form.current_employer.trim() ||
      !form.research_years.trim() ||
      !form.highest_education ||
      !form.current_country
    ) {
      setFormError("Please complete all required professional details.");
      return;
    }
    const researchYears = Number(form.research_years);
    if (!Number.isFinite(researchYears) || researchYears < 0 || researchYears > 60) {
      setFormError("Please enter a valid number of years of research experience (0–60).");
      return;
    }
    if (!form.work_authorized || !form.sponsorship_required) {
      setFormError("Please answer the work authorization questions.");
      return;
    }
    if (!form.pronouns.trim() || !form.referral_source) {
      setFormError("Please complete your pronouns and how you heard about SoAI.");
      return;
    }
    if (!form.privacy_consent) {
      setFormError("Please agree to SoAI's Privacy Policy before submitting.");
      return;
    }
    if (!resume) {
      setFormError("Please attach your resume/CV.");
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
        preferred_first_name: form.preferred_first_name.trim() || undefined,
        email,
        phone,
        country: form.country,
        linkedin_url: form.linkedin_url.trim() || undefined,
        cover_letter: form.cover_letter.trim() || undefined,
        current_employer: form.current_employer.trim(),
        research_years: form.research_years.trim(),
        highest_education: form.highest_education,
        current_country: form.current_country,
        work_authorized: form.work_authorized as "Yes" | "No",
        sponsorship_required: form.sponsorship_required as "Yes" | "No",
        visa_details: form.visa_details.trim() || undefined,
        pronouns: form.pronouns.trim(),
        referral_source: form.referral_source,
        privacy_consent: true,
        education: education.map((entry) => ({
          school: entry.school.trim(),
          degree: entry.degree,
          discipline: entry.discipline,
          start_date: entry.start_date,
          end_date: entry.end_date,
        })),
        resume: {
          filename: resume.name,
          content_type: RESUME_TYPES[extension] || "application/octet-stream",
          data_base64: dataBase64,
        },
      });
      setSubmittedId(result.application_id);
      setForm(EMPTY_FORM);
      setEducation([createEducationEntry()]);
      setResume(null);
    } catch (err: unknown) {
      const friendly: Record<string, string> = {
        missing_required_fields: "Please complete all required fields.",
        invalid_email: "Please enter a valid email address.",
        invalid_research_years: "Please enter a valid number of years of research experience.",
        invalid_education: "Please check your education entries.",
        resume_required: "Please attach your resume/CV.",
        resume_too_large: "Resume must be 5 MB or smaller.",
        unsupported_resume_type: "Please upload a PDF, DOC, or DOCX file.",
        job_not_found: "This role is no longer available.",
      };
      const message =
        err instanceof ApiError
          ? friendly[err.message] || err.message
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
      <div className="bg-white">
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
    <div className="bg-white">
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

                    <form className="mt-6 space-y-8" onSubmit={onSubmit} noValidate>
                      <FormSection
                        title="Personal information"
                        description="Tell us how to contact you and where you are based."
                      >
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
                          <Field label="Preferred first name">
                            <input
                              className={inputClass}
                              value={form.preferred_first_name}
                              onChange={(e) => updateField("preferred_first_name", e.target.value)}
                              autoComplete="nickname"
                            />
                          </Field>
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
                          <Field label="Phone" required>
                            <input
                              type="tel"
                              className={inputClass}
                              value={form.phone}
                              onChange={(e) => updateField("phone", e.target.value)}
                              autoComplete="tel"
                              required
                            />
                          </Field>
                          <Field label="Country" required>
                            <select
                              className={inputClass}
                              value={form.country}
                              onChange={(e) => updateField("country", e.target.value)}
                              required
                            >
                              <option value="">Select country…</option>
                              {COUNTRIES.map((country) => (
                                <option key={country} value={country}>
                                  {country}
                                </option>
                              ))}
                            </select>
                          </Field>
                        </div>
                        <Field label="LinkedIn profile">
                          <input
                            type="url"
                            className={inputClass}
                            value={form.linkedin_url}
                            onChange={(e) => updateField("linkedin_url", e.target.value)}
                            placeholder="https://www.linkedin.com/in/…"
                          />
                        </Field>
                      </FormSection>

                      <FormSection
                        title="Application documents"
                        description="Upload your CV and, optionally, a cover letter."
                      >
                        <div>
                          <span className="mb-1 block text-sm font-medium text-gray-700">
                            Resume/CV <span className="text-red-600">*</span>
                          </span>
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <label
                              htmlFor="resume-upload"
                              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#003d7b] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#002a57]"
                            >
                              <Upload className="h-4 w-4" aria-hidden="true" />
                              Choose file
                            </label>
                            <span className="min-w-0 truncate text-sm text-gray-600">
                              {resume
                                ? `${resume.name} (${Math.max(1, Math.round(resume.size / 1024))} KB)`
                                : "PDF, DOC, or DOCX up to 5 MB"}
                            </span>
                            <input
                              id="resume-upload"
                              type="file"
                              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              onChange={onResumeChange}
                              className="sr-only"
                              required
                            />
                          </div>
                        </div>

                        <Field label="Cover letter (optional)">
                          <textarea
                            rows={5}
                            className={inputClass}
                            value={form.cover_letter}
                            onChange={(e) => updateField("cover_letter", e.target.value)}
                            placeholder="Tell us why you are interested in this role and what you would bring to SoAI."
                          />
                        </Field>
                      </FormSection>

                      <FormSection
                        title="Education"
                        description="Add each degree or programme. At least one entry is required; you can add up to five."
                      >
                        <div className="space-y-4">
                          {education.map((entry, index) => (
                            <div
                              key={index}
                              className="rounded-lg border border-gray-200 bg-[#f9fafb] p-4"
                            >
                              <div className="mb-3 flex items-center justify-between gap-3">
                                <p className="text-sm font-semibold text-gray-900">
                                  Education {index + 1}
                                </p>
                                {education.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeEducation(index)}
                                    className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                                    Remove
                                  </button>
                                )}
                              </div>

                              <div className="grid gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                  <Field label="School" required>
                                    <input
                                      list="school-suggestions"
                                      className={inputClass}
                                      value={entry.school}
                                      onChange={(e) =>
                                        updateEducation(index, "school", e.target.value)
                                      }
                                      placeholder="Start typing your school"
                                      autoComplete="organization"
                                      required
                                    />
                                  </Field>
                                </div>
                                <Field label="Degree" required>
                                  <select
                                    className={inputClass}
                                    value={entry.degree}
                                    onChange={(e) =>
                                      updateEducation(index, "degree", e.target.value)
                                    }
                                    required
                                  >
                                    <option value="">Select degree…</option>
                                    {DEGREE_OPTIONS.map((degree) => (
                                      <option key={degree} value={degree}>
                                        {degree}
                                      </option>
                                    ))}
                                  </select>
                                </Field>
                                <Field label="Discipline" required>
                                  <select
                                    className={inputClass}
                                    value={entry.discipline}
                                    onChange={(e) =>
                                      updateEducation(index, "discipline", e.target.value)
                                    }
                                    required
                                  >
                                    <option value="">Select discipline…</option>
                                    {DISCIPLINE_OPTIONS.map((discipline) => (
                                      <option key={discipline} value={discipline}>
                                        {discipline}
                                      </option>
                                    ))}
                                  </select>
                                </Field>
                                <Field label="Start date" required>
                                  <input
                                    type="month"
                                    className={inputClass}
                                    value={entry.start_date}
                                    onChange={(e) =>
                                      updateEducation(index, "start_date", e.target.value)
                                    }
                                    required
                                  />
                                </Field>
                                <Field label="End date" required>
                                  <input
                                    type="month"
                                    className={inputClass}
                                    value={entry.end_date}
                                    min={entry.start_date || undefined}
                                    onChange={(e) =>
                                      updateEducation(index, "end_date", e.target.value)
                                    }
                                    required
                                  />
                                </Field>
                              </div>
                            </div>
                          ))}
                        </div>

                        <datalist id="school-suggestions">
                          {SCHOOL_SUGGESTIONS.map((school) => (
                            <option key={school} value={school} />
                          ))}
                        </datalist>

                        <button
                          type="button"
                          onClick={addEducation}
                          disabled={education.length >= 5}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#003d7b] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                          Add another education
                        </button>
                      </FormSection>

                      <FormSection
                        title="Professional details"
                        description="Help us understand your current role and eligibility."
                      >
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <Field label="Who is your current employer?" required>
                              <input
                                className={inputClass}
                                value={form.current_employer}
                                onChange={(e) =>
                                  updateField("current_employer", e.target.value)
                                }
                                autoComplete="organization"
                                required
                              />
                            </Field>
                          </div>
                          <Field label="Years of research experience" required>
                            <input
                              type="number"
                              min="0"
                              max="60"
                              step="0.5"
                              className={inputClass}
                              value={form.research_years}
                              onChange={(e) => updateField("research_years", e.target.value)}
                              placeholder="e.g. 4"
                              required
                            />
                          </Field>
                          <Field label="Highest level of education completed" required>
                            <select
                              className={inputClass}
                              value={form.highest_education}
                              onChange={(e) =>
                                updateField("highest_education", e.target.value)
                              }
                              required
                            >
                              <option value="">Select education level…</option>
                              {HIGHEST_EDUCATION_OPTIONS.map((level) => (
                                <option key={level} value={level}>
                                  {level}
                                </option>
                              ))}
                            </select>
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="What country do you currently reside in?" required>
                              <select
                                className={inputClass}
                                value={form.current_country}
                                onChange={(e) =>
                                  updateField("current_country", e.target.value)
                                }
                                required
                              >
                                <option value="">Select country…</option>
                                {COUNTRIES.map((country) => (
                                  <option key={country} value={country}>
                                    {country}
                                  </option>
                                ))}
                              </select>
                            </Field>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <YesNoField
                            label="Are you legally authorized to work in the country where this role is based?"
                            name="work-authorized"
                            value={form.work_authorized}
                            onChange={(value) => updateField("work_authorized", value)}
                          />
                          <YesNoField
                            label="Will you now or in the future require employer sponsorship for work authorization in this country?"
                            name="sponsorship-required"
                            value={form.sponsorship_required}
                            onChange={(value) => updateField("sponsorship_required", value)}
                          />
                          {form.sponsorship_required === "Yes" && (
                            <Field label="If yes, please provide your visa type and expiration date">
                              <input
                                className={inputClass}
                                value={form.visa_details}
                                onChange={(e) => updateField("visa_details", e.target.value)}
                                placeholder="e.g. Employment Pass, expires 2028-06"
                              />
                            </Field>
                          )}
                        </div>
                      </FormSection>

                      <FormSection title="Additional information">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Preferred pronouns" required>
                            <input
                              className={inputClass}
                              value={form.pronouns}
                              onChange={(e) => updateField("pronouns", e.target.value)}
                              placeholder="e.g. she/her"
                              required
                            />
                          </Field>
                          <Field label="How did you hear about SoAI?" required>
                            <select
                              className={inputClass}
                              value={form.referral_source}
                              onChange={(e) => updateField("referral_source", e.target.value)}
                              required
                            >
                              <option value="">Select an option…</option>
                              {REFERRAL_OPTIONS.map((source) => (
                                <option key={source} value={source}>
                                  {source}
                                </option>
                              ))}
                            </select>
                          </Field>
                        </div>
                      </FormSection>

                      <FormSection title="Terms & conditions">
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                          <div className="flex items-start gap-3">
                            <input
                              id="privacy-consent"
                              type="checkbox"
                              checked={form.privacy_consent}
                              onChange={(e) =>
                                updateField("privacy_consent", e.target.checked)
                              }
                              className="mt-1 h-4 w-4 shrink-0 accent-[#003d7b]"
                              required
                            />
                            <div>
                              <label
                                htmlFor="privacy-consent"
                                className="text-sm font-medium text-gray-800"
                              >
                                Yes, I have read and agree to SoAI's Privacy Policy.
                              </label>
                              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                                Please confirm that you have read, understood, and agree to SoAI's{" "}
                                <a
                                  href={`${import.meta.env.BASE_URL}privacy`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-medium text-[#003d7b] hover:underline"
                                >
                                  Privacy Policy
                                </a>
                                , and consent to SoAI collecting, using, disclosing, and retaining
                                your personal information.
                              </p>
                            </div>
                          </div>
                        </div>
                      </FormSection>

                      {formError && (
                        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                          {formError}
                        </div>
                      )}

                      <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs leading-relaxed text-gray-500">
                          By submitting this application, you consent to SoAI storing and processing
                          your details for recruitment purposes.
                        </p>
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
                      </div>
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
