import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function isAdminLogin(pathname: string) {
	return pathname === "/admin/login" || pathname === "/admin/login/" || pathname === "/en/admin/login" || pathname === "/en/admin/login/";
}

function isAdminRoute(pathname: string) {
	return pathname === "/admin" || pathname === "/admin/" || pathname.startsWith("/admin/") || pathname === "/en/admin" || pathname === "/en/admin/" || pathname.startsWith("/en/admin/");
}

export default function proxy(req: NextRequest) {
	// 3️ Everything else
	return intlMiddleware(req);
}

export const config = {
	matcher: ["/", "/en/:path*", "/((?!_next|_vercel|api|.*\\..*).*)"],
};
