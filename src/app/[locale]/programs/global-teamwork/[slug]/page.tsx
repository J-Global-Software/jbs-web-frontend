import { FileMakerService } from "@/services/filemaker.service";
import { fallbackWorkshop, WorkshopMapper } from "@/utils/mappers/workshop.mapper";
import WorkshopDetail from "@/app/[locale]/programs/WorkshopDetails";
import { redirect } from "next/navigation";

interface PageParams {
	locale: string;
	slug: string;
}

export default async function ProgramPage({ params }: { params: Promise<PageParams> }) {
	const { locale, slug } = await params;
	const finalLocale = (locale as "en" | "ja") || "ja";
	const properSlug = slug.toUpperCase();

	// 1. Redirect logic
	if (slug !== properSlug) {
		redirect(`/${finalLocale}/programs/global-communication/${properSlug}`);
	}

	let workshop;

	try {
		// 2. Direct Service Call
		// We use '==' for an exact match in FileMaker
		const records = await FileMakerService.find("LearningProgramApi", {
			LearningProgramCode: `==${properSlug}`,
		});

		if (!records || records.length === 0) {
			console.warn(`No program found for code: ${properSlug}`);
			workshop = fallbackWorkshop;
		} else {
			// 3. Map the first record found
			workshop = WorkshopMapper.toFrontend(records, finalLocale, properSlug);
		}
	} catch (error: unknown) {
		console.error("Data Fetch Error:", error instanceof Error ? error.message : "Unknown");
		workshop = fallbackWorkshop;
	}

	return <WorkshopDetail workshop={workshop} code={properSlug} />;
}
