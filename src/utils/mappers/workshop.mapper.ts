import { Workshop, WorkshopSession } from "@/app/[locale]/programs/WorkshopDetails";

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
	image: "/img/globals/placeholder.webp",
	purpose: [],
	participants: "",
	objectives: [],
	language: "",
	sessions: [],
	speakers: [],
};

export class WorkshopMapper {
	/**
	 * Maps raw FileMaker data to the Frontend Workshop type
	 * @param fmData - Raw data from FileMakerService.find
	 * @param locale - current language ('en' or 'ja')
	 * @param slug - program code (e.g., 'C01')
	 * @param imagePath - Optional custom path
	 */
	static toFrontend(fmData: unknown, locale: string, slug: string, imagePath?: string): Workshop {
		// 1. Validate Data Structure
		const records = fmData as FMResponseRecord[];
		const record = records?.[0]?.fieldData;

		if (!record) return fallbackWorkshop;

		const portals = records[0].portalData || {};
		const portalValues = Object.values(portals);

		// Adjust index based on your portal order in FileMaker layout
		const workshopsArray = (portalValues[0] as FMPortalRecord[]) || [];
		const datesArray = (portalValues[1] as FMPortalRecord[]) || [];

		// --- HELPER: ROBUST ARRAY CONVERTER ---
		// Fix: Now converts ANY value to string before splitting.
		// Handles null, undefined, numbers, and existing strings safely.
		const fmToArray = (val: unknown): string[] => {
			if (val === undefined || val === null || val === "") return [];
			return String(val)
				.split(/\r\n|\r|\n/)
				.map((s) => s.trim())
				.filter((s) => s.length > 0);
		};

		// 2. Map Sessions (Workshops) and Filter those without dates
		const sessions: WorkshopSession[] = workshopsArray
			.map((item) => {
				const nameKey = locale === "ja" ? "Workshop::WorkshopNameJ" : "Workshop::WorkshopNameE";
				const purposeKey = locale === "ja" ? "Workshop::PurposeJ" : "Workshop::PurposeE";

				// Title cleaning
				const rawTitle = item[nameKey] as string | undefined;
				const title = rawTitle?.replace(/^\d+\.\s*/, "") || "";

				const rawPurpose = item[purposeKey] as string | undefined;
				const content = fmToArray(rawPurpose);

				// Match specific Event dates
				const matchingDates = datesArray
					.filter((event) => {
						const eventTitle = (event[nameKey] as string | undefined)?.replace(/^\d+\.\s*/, "");
						return eventTitle === title && event["WorkshopEvent::EventDate"];
					})
					.map((event) => ({
						id: String(event["WorkshopEvent::ID"] || ""),
						date: String(event["WorkshopEvent::EventDate"] || ""),
						startTime: String(event["WorkshopEvent::StartTime"] || ""),
					}));

				return { title, content, dates: matchingDates };
			})
			.filter((session) => session.dates.length > 0);

		const langSuffix = locale === "ja" ? "J" : "E";

		// 3. Select and Parse Speakers based on language
		// Note: Ensure your FM Layout has fields named strictly "GuestSpeakersJ" and "GuestSpeakersE"
		const speakerField = `GuestSpeakers${langSuffix}`;
		const speakers = fmToArray(record[speakerField]);

		// 4. Construct Final Frontend Object
		return {
			title: String(record[`LearningProgramName${langSuffix}`] || ""),
			subtitle: String(record[`Description${langSuffix}`] || ""),
			image: imagePath || `/img/globals/${slug}.webp`,
			purpose: fmToArray(record[`Benefit${langSuffix}`]),
			participants: String(record[`Participants${langSuffix}`] || record[`Partecipants${langSuffix}`] || ""),
			objectives: fmToArray(record[`Objectives${langSuffix}`]),
			language: String(record[`Language${langSuffix}`] || ""),
			sessions,
			speakers,
		};
	}
}
