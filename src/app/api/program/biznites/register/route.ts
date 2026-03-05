import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { SessionService } from "@/services/session.service";
import { setSessionCookie } from "@/utils/session-cookies.util";
import { BizniteService } from "@/services/biznite.service";
import { getErrorStatus } from "@/utils/errors";

const redis = Redis.fromEnv();
const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1h"), // 10 registrations per hour per IP
});

export async function POST(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const { success } = await limiter.limit(`program_reg:${ip}`);

    if (!success) {
        return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
    }

    try {
        const body = await req.json();
        const locale = req.headers.get("x-locale") || "ja";


        // Basic Validation
        if (!body.email || !body.programCode || !body.eventDate) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { sessionId } = await SessionService.getOrCreate(req);


        const result = await BizniteService.registerUser({
            sessionId,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            programCode: body.programCode,
            eventDate: body.eventDate,
            eventTime: body.eventTime,
            eventTimeFinish: body.eventEndTime,
            workshopId: body.eventId,
            zoomJoinUrl: body.zoomUrl,
            eventName: body.eventName
        }, locale);

        if (!result) {
            return NextResponse.json({ error: "Registration failed" }, { status: 500 });
        }

        const res = NextResponse.json({ success: true, registrationId: result.id });
        setSessionCookie(res, sessionId);

        return res;
   } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
   
        console.error("[Booking Error]", err);
        const status = getErrorStatus(errorMessage);
   
        return Response.json({ error: errorMessage }, { status });
    }
}