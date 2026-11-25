const BASE_URL =
	(import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, "") ||
	"https://soai-be.soc-ai.workers.dev";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchJsonOptions = {
	method?: HttpMethod;
	body?: unknown;
	headers?: Record<string, string>;
	signal?: AbortSignal;
};

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
}

async function fetchJson<T>(path: string, options: FetchJsonOptions = {}): Promise<T> {
	const { method = "GET", body, headers = {}, signal } = options;
	const response = await fetch(`${BASE_URL}${path}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...headers,
		},
		body: body !== undefined ? JSON.stringify(body) : undefined,
		signal,
	});

	const contentType = response.headers.get("content-type") || "";
	const isJson = contentType.includes("application/json");
	const parsed: unknown = isJson ? await response.json().catch(() => ({})) : {};
	const errorPayload =
		typeof parsed === "object" && parsed !== null
			? (parsed as Record<string, unknown>)
			: {};

	if (!response.ok) {
		const responseMessage = errorPayload.message || errorPayload.error;
		const errorMessage =
			(typeof responseMessage === "string" && responseMessage) ||
			response.statusText ||
			"Request failed";
		throw new ApiError(errorMessage, response.status);
	}

	return parsed as T;
}

export type ContactPayload = {
	name?: string;
	email?: string;
	message: string;
};

export async function sendContact(payload: ContactPayload) {
	return fetchJson<{
		success?: boolean;
		message?: string;
	}>("/api/contact", { method: "POST", body: payload });
}

export type RegisterPayload = {
	email: string;
	first_name: string;
	last_name: string;
	middle_name?: string;
	country?: string;
	affiliation?: string;
	title?: string;
	personal_webpage?: string;
	plan: string;
};

export async function registerMember(payload: RegisterPayload) {
	return fetchJson<{
		success?: boolean;
		message?: string;
		member_id?: string;
	}>("/api/register", { method: "POST", body: payload });
}

export type CheckoutPayload = {
	priceId: string;
	successUrl: string;
	cancelUrl: string;
	mode?: "payment" | "subscription";
	metadata?: Record<string, string>;
	quantity?: number;
	amount?: number;   // total amount in SGD — used for team registrations with variable pricing
	allowPromotionCodes?: boolean;
	customerEmail?: string;
	country?: string;  // determines available payment methods (Singapore → PayNow only)
};

export async function createCheckoutSession(payload: CheckoutPayload) {
	return fetchJson<{ url: string }>("/api/checkout", { method: "POST", body: payload });
}

export type HotelBookingCheckoutDetails = {
	first_name: string;
	last_name: string;
	room_type: string;
	check_in: string;
	check_out: string;
	nights: number;
	amount_total: number | null;
	currency: string;
};

export type CheckoutStatus = {
	ok: boolean;
	status: string;
	email?: string;
	attendeeName?: string;
	title?: string;
	affiliation?: string;
	hands_on_tutorial_preference?: string | null;
	hands_on_tutorial_preference_label?: string | null;
	booking_type?: "hotel" | null;
	hotel_booking?: HotelBookingCheckoutDetails | null;
};

export async function getCheckoutStatus(sessionId: string, signal?: AbortSignal) {
	return fetchJson<CheckoutStatus>(
		`/api/checkout/status?session_id=${encodeURIComponent(sessionId)}`,
		{ method: "GET", signal }
	);
}

export type MemberVerifyPayload = {
	member_id?: string;
	email?: string;
};

export async function verifyMember(payload: MemberVerifyPayload) {
	return fetchJson<{
		ok: boolean;
		member_id?: string;
		email?: string;
		status?: string;
	}>("/api/members/verify", { method: "POST", body: payload });
}

export type NewsItem = {
	id: string;
	title: string;
	date: string;
	source?: string;
	summary?: string;
	link?: string;
};

export async function getNewsList(signal?: AbortSignal) {
	const data = await fetchJson<{ items?: NewsItem[] } | NewsItem[]>("/api/news/list", { method: "GET", signal });
	return Array.isArray(data) ? data : data.items ?? [];
}

export type EventItem = {
	id: string;
	title: string;
	date?: string;
	startDate?: string;
	endDate?: string;
	location?: string;
	description?: string;
	link?: string;
};

export async function getEventsList(signal?: AbortSignal) {
	const data = await fetchJson<{ items?: EventItem[] } | EventItem[]>("/api/events/list", { method: "GET", signal });
	return Array.isArray(data) ? data : data.items ?? [];
}

export type HackathonRegisterPayload = {
	email: string;
	first_name: string;
	last_name: string;
	middle_name?: string;
	title: string;
	country: string;
	affiliation: string;
	personal_webpage?: string;
	membership_status: string;
	soai_member_id?: string;
	isi_member_id?: string;
	registration_type: "individual" | "team";
	team_name?: string;
	team_size?: number;
	team_non_member_count?: number;
	team_members?: { name: string; affiliation: string; email: string }[];
	amount_total?: number;
	currency?: string;
};

export async function registerHackathon(payload: HackathonRegisterPayload) {
	return fetchJson<{
		success: boolean;
		registration_id: string;
		registration_status: string;
		payment_status: string;
	}>("/api/hackathon/register", {
		method: "POST",
		body: payload,
	});
}

export type HotelBookingPayload = {
	email: string;
	firstName: string;
	lastName: string;
	checkIn: string;
	checkOut: string;
	roomType: string;
	arrivalFlightDetails?: string;
	departureFlightDetails?: string;
	remarks?: string;
};

export async function bookHotel(payload: HotelBookingPayload) {
	return fetchJson<{
		ok: boolean;
		session_id: string;
		url: string;
		nights: number;
		price_id: string;
	}>("/api/hotel-booking", { method: "POST", body: payload });
}

export type JobPosting = {
	id: string;
	title: string;
	department?: string | null;
	location?: string | null;
	employment_type?: string | null;
	summary?: string | null;
	description?: string | null;
	responsibilities?: string | null;
	requirements?: string | null;
	salary_range?: string | null;
	apply_email?: string | null;
	apply_url?: string | null;
	status?: string;
	created_at?: string;
	updated_at?: string;
};

export async function getJobs(signal?: AbortSignal) {
	const data = await fetchJson<{ items?: JobPosting[] } | JobPosting[]>("/api/jobs", {
		method: "GET",
		signal,
	});
	return Array.isArray(data) ? data : data.items ?? [];
}

export async function getJob(jobId: string, signal?: AbortSignal) {
	const data = await fetchJson<{ item: JobPosting }>(
		`/api/jobs/${encodeURIComponent(jobId)}`,
		{ method: "GET", signal }
	);
	return data.item;
}

export type JobApplicationEducation = {
	school: string;
	degree: string;
	discipline: string;
	start_date: string;
	end_date: string;
};

export type JobApplicationPayload = {
	job_id: string;
	first_name: string;
	last_name: string;
	preferred_first_name?: string;
	email: string;
	phone: string;
	country: string;
	linkedin_url?: string;
	cover_letter?: string;
	current_employer: string;
	research_years: string;
	highest_education: string;
	current_country: string;
	work_authorized: "Yes" | "No";
	sponsorship_required: "Yes" | "No";
	visa_details?: string;
	pronouns: string;
	referral_source: string;
	privacy_consent: boolean;
	education: JobApplicationEducation[];
	resume: {
		filename: string;
		content_type: string;
		data_base64: string;
	};
};

export async function applyForJob(payload: JobApplicationPayload) {
	return fetchJson<{ ok: boolean; application_id: string }>("/api/jobs/apply", {
		method: "POST",
		body: payload,
	});
}

export const api = {
	BASE_URL,
	fetchJson,
	sendContact,
	registerMember,
	createCheckoutSession,
	verifyMember,
	getNewsList,
	getEventsList,
	bookHotel,
	getCheckoutStatus,
};

export default api;


