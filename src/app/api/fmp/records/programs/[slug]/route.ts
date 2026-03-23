import { NextRequest, NextResponse } from "next/server";
import { FileMakerService } from "@/services/filemaker.service";
import { getErrorStatus } from "@/utils/errors";
export const runtime = process.env.NODE_ENV === "test" ? "edge" : "nodejs";

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await context.params;
		const properSlug = slug.toUpperCase();

		// Direct Service call using the strict '==' operator for the slug
		const data = await FileMakerService.find("LearningProgramApi", {
			LearningProgramCode: `==${properSlug}`,
		});

		// FileMakerService.find returns [] if no records match
		if (!data || data.length === 0) {
			return NextResponse.json({ error: `Program with code ${properSlug} not found` }, { status: 404 });
		}

		// Return the first record (since slug should be unique)
		return NextResponse.json(data[0]);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Internal Server Error";
		const status = getErrorStatus(message);

		console.error(`[Program Slug Route Error]: ${message}`);

		return NextResponse.json({ error: message }, { status });
	}
}
