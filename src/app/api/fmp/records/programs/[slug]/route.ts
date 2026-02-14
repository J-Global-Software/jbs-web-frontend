// app/api/programs/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ProgramRepository } from "@/repositories/program.repository";
import { getErrorStatus } from "@/utils/errors";

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await context.params;
		const data = await ProgramRepository.findBySlug(slug);

		if (!data || data.length === 0) {
			return NextResponse.json({ error: "Program not found" }, { status: 404 });
		}

		return NextResponse.json(data);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Internal Server Error";
		const status = getErrorStatus(message);

		console.error(`[Program Route Error]: ${message}`);

		return NextResponse.json({ error: message }, { status });
	}
}
