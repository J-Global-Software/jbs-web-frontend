import { NextRequest, NextResponse } from "next/server";
import { FileMakerService } from "@/services/filemaker.service";

// 1. Define the layout name here if this is a specific route
const LAYOUT_NAME = "LearningProgramApi";

export async function GET(req: NextRequest) {
	// 2. Removed the { params } argument because the folder path is static
	try {
		console.log(`--- Request to Layout: ${LAYOUT_NAME} ---`);

		const { searchParams } = req.nextUrl;
		const programType = searchParams.get("type");

		let data;
		if (programType) {
			console.log(`Searching for ProgramType: ${programType}`);
			// Use the generic find method we created earlier
			data = await FileMakerService.find(LAYOUT_NAME, {
				"ProgramType::ProgramTypeName": programType,
			});
		} else {
			// Logic for when no type is provided (e.g., find all)
			data = await FileMakerService.find(LAYOUT_NAME, {});
		}

		console.log(`Success: Fetched ${data?.length || 0} records.`);
		return NextResponse.json(data);
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : "Unknown Error";

		return NextResponse.json(
			{
				error: "Route Failed",
				layout: LAYOUT_NAME,
				details: errorMessage,
			},
			{ status: 500 },
		);
	}
}
