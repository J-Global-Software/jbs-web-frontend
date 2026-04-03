import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// 1. IMPROVED: Check if the path starts with /admin or ANY /api call
	// This ensures Payload's REST API (/api/pages, /api/globals, etc.) is never touched by i18n
	if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
		return NextResponse.next();
	}

	// 2. Everything else goes to intl
	return intlMiddleware(req);
}

export const config = {
	// 2. IMPROVED: The matcher should exclude 'api' and 'admin' entirely
	matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
