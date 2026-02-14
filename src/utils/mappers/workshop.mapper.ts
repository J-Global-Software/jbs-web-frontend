// @/utils/mappers/workshop.mapper.ts
import { Workshop, WorkshopSession } from "@/app/components/programs/WorkshopDetails";

/** * Define the structure of the FileMaker record to avoid 'any'
 */
interface FMPortalRecord extends Record<string, string | number | undefined> {
	"Workshop::WorkshopNameJ"?: string;
	"Workshop::WorkshopNameE"?: string;
	"Workshop::PurposeJ"?: string;
	"Workshop::PurposeE"?: string;
	"WorkshopEvent::ID"?: string;
	"WorkshopEvent::EventDate"?: string;
	"WorkshopEvent::StartTime"?: string;
}

interface FMResponseRecord {
	fieldData: Record<string, string | number | undefined>;
	portalData: Record<string, FMPortalRecord[]>;
}

export const fallbackWorkshop: Workshop = {
	title: "",
	subtitle: "",
	image: "/img/globals/C04.webp",
	purpose: [],
	participants: "",
	objectives: [],
	language: "",
	sessions: [],
};

export class WorkshopMapper {
	/**
	 * Maps raw FileMaker data to the Frontend Workshop type
	 * @param fmData - Changed from 'any' to 'unknown' or the specific interface
	 */
	static toFrontend(fmData: unknown, locale: string, slug: string): Workshop {
		// Cast fmData safely
		const records = fmData as FMResponseRecord[];
		const record = records?.[0]?.fieldData;

		if (!record) return fallbackWorkshop;

		const portals = records[0].portalData || {};
		const portalValues = Object.values(portals);

		// Use type-safe portal arrays
		const workshopsArray = (portalValues[0] as FMPortalRecord[]) || [];
		const datesArray = (portalValues[1] as FMPortalRecord[]) || [];

		const fmToArray = (val: unknown): string[] =>
			typeof val === "string"
				? val
						.split(/\r|\n/)
						.map((s) => s.trim())
						.filter(Boolean)
				: [];

		const sessions: WorkshopSession[] = workshopsArray.map((item) => {
			const nameKey = locale === "ja" ? "Workshop::WorkshopNameJ" : "Workshop::WorkshopNameE";
			const purposeKey = locale === "ja" ? "Workshop::PurposeJ" : "Workshop::PurposeE";

			const rawTitle = item[nameKey] as string | undefined;
			const title = rawTitle?.replace(/^\d+\.\s*/, "") || "";

			const rawPurpose = item[purposeKey] as string | undefined;
			const content = (rawPurpose || "")
				.split(/\r\r|\n\n/)
				.map((s) => s.trim())
				.filter(Boolean);

			const matchingDates = datesArray
				.filter((event) => {
					const eventTitle = (event[nameKey] as string | undefined)?.replace(/^\d+\.\s*/, "");
					return eventTitle === title;
				})
				.map((event) => ({
					id: String(event["WorkshopEvent::ID"] || ""),
					date: String(event["WorkshopEvent::EventDate"] || ""),
					startTime: String(event["WorkshopEvent::StartTime"] || ""),
				}));

			return { title, content, dates: matchingDates };
		});

		const langSuffix = locale === "ja" ? "J" : "E";

		return {
			title: String(record[`LearningProgramName${langSuffix}`] || ""),
			subtitle: String(record[`Description${langSuffix}`] || ""),
			image: `/img/globals/${slug}.webp`,
			purpose: fmToArray(record[`Benefit${langSuffix}`]),
			participants: String(record[`Partecipants${langSuffix}`] || ""),
			objectives: fmToArray(record[`Objectives${langSuffix}`]),
			language: String(record[`Language${langSuffix}`] || ""),
			sessions,
		};
	}
}
