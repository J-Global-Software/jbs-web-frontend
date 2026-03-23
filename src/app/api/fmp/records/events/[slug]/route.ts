import { NextRequest, NextResponse } from "next/server";
import { FileMakerService } from "@/services/filemaker.service";
import { getErrorStatus } from "@/utils/errors";

export const runtime = process.env.NODE_ENV === "test" ? "edge" : "nodejs";

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await context.params;

		// Direct Service call targeting the WorkshopEventApi layout
		// We use '==' to ensure an exact match for the ID/Slug
		const data = await FileMakerService.find("WorkshopEventApi", {
			ID: `==${slug}`,
		});

		// If no records are found, FileMakerService.find returns an empty array
		if (!data || data.length === 0) {
			return NextResponse.json({ error: "Event not found" }, { status: 404 });
		}

		// Return the specific event record
		return NextResponse.json(data[0]);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Internal Server Error";
		const status = getErrorStatus(message);

		console.error(`[Event Route Error]: ${message}`);

		return NextResponse.json({ error: message }, { status });
	}
}
