import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { Validators } from "@/utils/validation/validators";
import { SessionService } from "@/services/session.service";
import { ContactService } from "@/services/contact.service";
import { setSessionCookie } from "@/utils/session-cookies.util";
import { getErrorStatus } from "@/utils/errors";

const redis = Redis.fromEnv();
const limiter = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(5, "15m"),
});

export async function POST(req: NextRequest) {
	// 1. Guard: Payload Size
	const contentLength = parseInt(req.headers.get("content-length") || "0");
	if (contentLength > 15000) {
		return NextResponse.json({ error: "Payload too large" }, { status: 413 });
	}

	// 2. Rate Limiting: Check IP FIRST
	const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
	const { success, limit, reset, remaining } = await limiter.limit(`contact:${ip}`);

	if (!success) {
		return NextResponse.json(
			{ error: "Too many messages. Please try again in 15 minutes." },
			{
				status: 429,
				headers: {
					"X-RateLimit-Limit": limit.toString(),
					"X-RateLimit-Remaining": remaining.toString(),
					"X-RateLimit-Reset": reset.toString(),
				},
			},
		);
	}

	try {
		const body = await req.json();
		const { cfToken, confirmEmail, firstName, lastName, email, message } = body;

		// 3. Security: Honeypot (bot trap)
		if (confirmEmail && String(confirmEmail).trim().length > 0) {
			return NextResponse.json({ success: true });
		}

		// 4. Security: Cloudflare Turnstile Verification
		if (!cfToken) {
			return NextResponse.json({ error: "Security token missing" }, { status: 400 });
		}

		const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				secret: process.env.TURNSTILE_SECRET_KEY!, // Keep this private!
				response: cfToken,
				remoteip: ip,
			}),
		});

		const outcome = await verifyResponse.json();
		if (!outcome.success) {
			return NextResponse.json({ error: "Invalid security token" }, { status: 403 });
		}

		// 5. Validation
		// Using your specific contact validator
		Validators.validateContact({ firstName, lastName, email, message });

		// 6. Session Management
		const { sessionId } = await SessionService.getOrCreate(req);

		// 7. Service Delegation (Database + Email)
		await ContactService.handleContactMessage({
			firstName,
			lastName,
			email,
			message,
			sessionId,
		});

		// 8. Final Response
		const res = NextResponse.json({ success: true });
		setSessionCookie(res, sessionId);

		return res;
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
		const status = getErrorStatus(errorMessage);

		console.error("Contact Form Error:", errorMessage);
		return NextResponse.json({ error: errorMessage }, { status });
	}
}
