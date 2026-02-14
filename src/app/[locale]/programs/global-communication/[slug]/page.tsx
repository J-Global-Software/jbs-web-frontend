import { ProgramRepository } from "@/repositories/program.repository";
import { fallbackWorkshop, WorkshopMapper } from "@/utils/mappers/workshop.mapper";
import WorkshopDetail from "@/app/components/programs/WorkshopDetails";
import { redirect } from "next/navigation";

export default async function ProgramPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
	const { locale, slug } = await params;
	const finalLocale = locale || "ja";
	const properSlug = slug.toUpperCase();

	// 1. Logic & Redirects (Outside try/catch)
	if (slug !== properSlug) {
		redirect(`/${finalLocale}/programs/global-communication/${properSlug}`);
	}

	// 2. Data Fetching & Mapping (The "Risky" part)
	let workshop;
	try {
		const rawData = await ProgramRepository.findBySlug(properSlug);
		workshop = WorkshopMapper.toFrontend(rawData, finalLocale, properSlug);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Unknown error";
		console.error("Critical Page Data Fetch Error:", message);

		// Assign the fallback so the component still has data to render
		workshop = fallbackWorkshop;
	}

	// 3. Return the JSX (Outside try/catch)
	// This satisfies the linter because we aren't "constructing" JSX inside the catch block.
	return <WorkshopDetail workshop={workshop} code={properSlug} />;
}
