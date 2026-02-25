import { useMemo } from "react";
import Footer from "@/app/components/Footer";
import { FaBullseye, FaUsers, FaLanguage, FaCheck, FaUserTie, FaCalendarAlt } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import WorkshopDetailHeader from "@/app/components/programs/WorkshopDetailHeader";
import WorkshopHero from "@/app/components/programs/WorkshopHero";
import WorkshopSessions from "@/app/components/programs/WorkshopSessions";

export type WorkshopSession = {
	title: string;
	content: string[];
	dates: { id: string; date: string; startTime: string }[];
};

export interface Workshop {
	title: string;
	subtitle: string;
	image: string;
	purpose: string[];
	participants: string;
	objectives: string[];
	language: string;
	sessions: WorkshopSession[];
	speakers: string[];
}

interface WorkshopDetailProps {
	workshop: Workshop;
	code: string;
	levelLabel?: boolean;
	showSubtitle?: boolean;
}

export default function WorkshopDetail({ workshop, code, levelLabel = true, showSubtitle = true }: WorkshopDetailProps) {
	const locale = useLocale();
	const tPrograms = useTranslations("programs");
	const tLevels = useTranslations("levels");

	/**
	 * PERFORMANCE FIX: useMemo
	 * Moving parsing logic here ensures it only runs when 'workshop' changes.
	 * This stops the mobile CPU from freezing during scroll or minor re-renders.
	 */
	const processed = useMemo(() => {
		const parseList = (content: string | string[] | undefined): string[] => {
			if (!content) return [];
			const rawArray = Array.isArray(content) ? content : content.split(/(?=[●・•○■▪➤])|(?=\d+\.)/);

			return rawArray.map((line: string) => line.replace(/^[●・•○■▪➤\s]+|^\d+[\.\s]*/, "").trim()).filter((t: string) => t.length > 0 && !t.toLowerCase().includes("by the end of the workshop"));
		};

		const cleanSpeakers = (speakers: string[]): string[] => {
			if (!speakers) return [];
			return speakers.map((text) => text.replace(/^0\d+|[•●・*-]|^\d+[\.\s]*/, "").trim()).filter(Boolean);
		};

		return {
			speakers: cleanSpeakers(workshop.speakers || []),
			objectives: parseList(workshop.objectives),
			purpose: parseList(workshop.purpose),
			participants: parseList(workshop.participants),
			language: parseList(workshop.language),
		};
	}, [workshop]);

	return (
		<main className="min-h-screen bg-[#F8FAFC] selection:bg-blue-100 antialiased">
			<WorkshopDetailHeader />

			<WorkshopHero title={workshop.title} subtitle={showSubtitle ? workshop.subtitle : ""} image={workshop.image} code={code} levelLabel={levelLabel ? tLevels(code) : ""} registerNowLabel={tPrograms("registerNow")} readMoreLabel={tPrograms("readMore")} readLessLabel={tPrograms("readLess")} locale={locale} />

			{/* --- 1. STATS OVERLAY: Removed Backdrop-blur for stability --- */}
			<div className="relative z-30 -mt-8 md:-mt-10 max-w-5xl mx-auto px-4">
				<div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
					<div className="flex items-center gap-4 p-5 rounded-xl bg-blue-50/50">
						<div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white shadow-sm text-blue-600 flex items-center justify-center shrink-0">
							<FaUsers className="text-lg md:text-xl" />
						</div>
						<div className="min-w-0">
							<p className="text-[10px] md:text-[11px] font-black text-blue-500 uppercase tracking-widest">{tPrograms("targetParticipants")}</p>
							<p className="text-sm font-bold text-slate-900 truncate">{processed.participants[0] || tPrograms("comingSoon")}</p>
						</div>
					</div>

					<div className="flex items-center gap-4 p-5 rounded-xl bg-indigo-50/50">
						<div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white shadow-sm text-orange-600 flex items-center justify-center shrink-0">
							<FaLanguage className="text-lg md:text-xl" />
						</div>
						<div className="min-w-0">
							<p className="text-[10px] md:text-[11px] font-black text-orange-500 uppercase tracking-widest">{tPrograms("languageRequirements")}</p>
							<p className="text-sm font-bold text-slate-900 truncate">{processed.language[0] || tPrograms("comingSoon")}</p>
						</div>
					</div>
				</div>
			</div>

			{/* --- 2. MAIN BENTO GRID --- */}
			<div className="max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-8">
				{/* Program Purpose Section: Fixed Render Truncation */}
				<section className="relative p-8 md:p-16 bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm">
					{/* Simplified background for mobile GPU */}
					<FaBullseye className="absolute -bottom-10 -right-10 text-[10rem] md:text-[15rem] text-slate-50 pointer-events-none -rotate-12" />

					<div className="relative z-10 space-y-8 max-w-4xl">
						<div className="inline-flex flex-col">
							<h3 className="text-lg md:text-xl font-extrabold text-slate-900 uppercase tracking-widest">{tPrograms("programPurpose")}</h3>
							<div className="h-1 w-6 bg-orange-500/40 mt-1" />
						</div>

						<div className="space-y-6">
							{processed.purpose.map((item, i) => (
								<div key={`purpose-${i}`} className="flex gap-4 items-start">
									<span className="text-xs font-black text-blue-300 mt-1.5 italic">{(i + 1).toString().padStart(2, "0")}</span>
									<p className="font-bold leading-relaxed text-slate-600 text-base md:text-lg">{item}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<div className="grid lg:grid-cols-12 gap-8 items-start">
					{/* Objectives Section */}
					<section className="lg:col-span-8 p-8 md:p-14 bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm">
						<div className="space-y-10">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
									<FaCheck className="text-sm" />
								</div>
								<h3 className="text-lg md:text-xl font-extrabold text-slate-900 uppercase tracking-widest">{tPrograms("learningObjectives")}</h3>
							</div>

							<div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
								{processed.objectives.map((obj, i) => (
									<div key={`obj-${i}`} className="flex gap-4 items-start group">
										<span className="text-xs font-black text-blue-200 mt-1 italic group-hover:text-blue-400 transition-colors">{(i + 1).toString().padStart(2, "0")}</span>
										<p className="font-bold leading-snug text-slate-500 text-sm group-hover:text-slate-700 transition-colors">{obj}</p>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* Speakers Section */}
					<section className="lg:col-span-4 p-8 md:p-10 bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm">
						<div className="space-y-10">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-full bg-slate-50 text-slate-900 flex items-center justify-center border border-slate-200">
									<FaUserTie className="text-sm" />
								</div>
								<h3 className="text-lg md:text-xl font-extrabold text-slate-900 uppercase tracking-widest">{tPrograms("speakers")}</h3>
							</div>

							<div className="space-y-3">
								{processed.speakers.length > 0 ? (
									processed.speakers.map((name, i) => (
										<div key={i} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-blue-50/50 transition-colors bg-slate-50/50 md:bg-transparent">
											<span className="text-xs font-black text-blue-200 italic">{(i + 1).toString().padStart(2, "0")}</span>
											<p className="font-bold text-slate-700 text-sm">{name}</p>
										</div>
									))
								) : (
									<div className="py-8 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30 flex items-center justify-center">
										<p className="text-slate-400 font-bold text-xs">{tPrograms("coming_soon")}</p>
									</div>
								)}
							</div>
						</div>
					</section>
				</div>

				{/* --- 3. SESSIONS LIST --- */}
				<div id="sessions" className="pt-12 scroll-mt-24">
					<h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8 px-2">{tPrograms("registerToWorkshops")}</h2>
					<WorkshopSessions
						sessions={workshop.sessions || []}
						locale={locale}
						translations={{
							workshop: tPrograms("workshop"),
							close: tPrograms("close"),
							whatYouWillLearn: tPrograms("whatYouWillLearn"),
							availableDates: tPrograms("availableDates"),
							date: tPrograms("date"),
							dates: tPrograms("dates"),
							registerToWorkshop: tPrograms("registerToWorkshop"),
							jan: tPrograms("jan"),
							feb: tPrograms("feb"),
							mar: tPrograms("mar"),
							apr: tPrograms("apr"),
							may: tPrograms("may"),
							jun: tPrograms("jun"),
							jul: tPrograms("jul"),
							aug: tPrograms("aug"),
							sep: tPrograms("sep"),
							oct: tPrograms("oct"),
							nov: tPrograms("nov"),
							dec: tPrograms("dec"),
						}}
					/>
				</div>
			</div>

			<Footer />
		</main>
	);
}
