import { FileMakerService } from "@/services/filemaker.service";
import { fallbackWorkshop, WorkshopMapper } from "@/utils/mappers/workshop.mapper";
import WorkshopDetail from "../../WorkshopDetails";
import { redirect } from "next/navigation";

export default async function ProgramPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
	const { locale, slug } = await params;
	const finalLocale = (locale as "en" | "ja") || "ja";
	const properSlug = slug.toUpperCase();

	// 1. Logic & Redirects
	// Ensuring URLs are always uppercase for consistency (e.g., /c01 -> /C01)
	if (slug !== properSlug) {
		redirect(`/${finalLocale}/programs/global-leadership/${properSlug}`);
	}

	// 2. Data Fetching & Mapping
	let workshop;
	try {
		// Calling Service directly with exact match query
		const records = await FileMakerService.find("LearningProgramApi", {
			LearningProgramCode: `==${properSlug}`,
		});

		if (!records || records.length === 0) {
			console.warn(`Program not found in FileMaker: ${properSlug}`);
			workshop = fallbackWorkshop;
		} else {
			// Map the first record found to the frontend structure
			workshop = WorkshopMapper.toFrontend(records, finalLocale, properSlug);
		}
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Unknown error";
		console.error("Critical Page Data Fetch Error:", message);

		// Fallback ensures the page doesn't crash if FileMaker is down
		workshop = fallbackWorkshop;
	}

	// 3. Render the Component
	return <WorkshopDetail workshop={workshop} code={properSlug} />;
}
