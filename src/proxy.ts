import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
export default function proxy(req: NextRequest) {
    // 1. Check if the path starts with /admin or /api/payload
    const { pathname } = req.nextUrl;
    if (pathname.startsWith('/admin') || pathname.startsWith('/api/payload')) {
        return NextResponse.next();
    }

    // 2. Everything else goes to intl
    return intlMiddleware(req);
}

export const config = {
    // Add 'admin' and 'api' to the exclusion list in the matcher
    matcher: ["/((?!api|_next|_vercel|admin|.*\\..*).*)"],
};