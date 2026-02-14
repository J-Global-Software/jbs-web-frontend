// app/api/fmp/records/events/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { EventRepository } from "@/repositories/event.repository";
import { getErrorStatus } from "@/utils/errors";

// 1. Change { id: string } to { slug: string }
export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
	try {
		// 2. Destructure 'slug' instead of 'id'
		const { slug } = await context.params;

		// 3. Pass 'slug' to your repository
		const data = await EventRepository.findById(slug);

		if (!data || data.length === 0) {
			return NextResponse.json({ error: "Event not found" }, { status: 404 });
		}

		return NextResponse.json(data);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Internal Server Error";
		const status = getErrorStatus(message);

		console.error(`[Event Route Error]: ${message}`);

		return NextResponse.json({ error: message }, { status });
	}
}
