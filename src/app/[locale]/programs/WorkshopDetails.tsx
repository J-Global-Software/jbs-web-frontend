"use client";

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

	// --- Performance Optimization: Memoize all data parsing ---
	// This prevents expensive Regex and Array operations on every re-render.
	const processedData = useMemo(() => {
		const parseList = (content: string | string[] | undefined): string[] => {
			if (!content) return [];
			const rawArray = Array.isArray(content) ? content : content.split(/(?=[●・•○■▪➤])|(?=\d+\.)/);

			return rawArray
				.map((line: string) =>
					line
						.replace(/^[●・•○■▪➤\s]+|^\d+[\.\s]*/, "") // Combined regex for speed
						.trim(),
				)
				.filter((t: string) => {
					const low = t.toLowerCase();
					return t.length > 0 && !low.includes("by the end of the workshop");
				});
		};

		const cleanSpeakers = (speakers: string[]): string[] => {
			if (!speakers) return [];
			return speakers.map((text) => text.replace(/^0\d+|[•●・*-]|^\d+[\.\s]*/, "").trim()).filter(Boolean);
		};

		return {
			speakersList: cleanSpeakers(workshop.speakers || []),
			objectivesList: parseList(workshop.objectives),
			purposeList: parseList(workshop.purpose),
			participantsList: parseList(workshop.participants),
			languageList: parseList(workshop.language),
		};
	}, [workshop]); // Only re-runs if workshop data changes

	const { speakersList, objectivesList, purposeList, participantsList, languageList } = processedData;

	return (
		<main className="min-h-screen bg-[#F8FAFC] selection:bg-blue-100 antialiased">
			<WorkshopDetailHeader />

			<WorkshopHero title={workshop.title} subtitle={showSubtitle ? workshop.subtitle : ""} image={workshop.image} code={code} levelLabel={levelLabel ? tLevels(code) : ""} registerNowLabel={tPrograms("registerNow")} readMoreLabel={tPrograms("readMore")} readLessLabel={tPrograms("readLess")} locale={locale} />

			{/* --- 1. STATS OVERLAY --- */}
			<div className="relative z-30 -mt-8 md:-mt-10 max-w-5xl mx-auto px-4">
				{/* Reduced blur intensity for mobile GPU performance */}
				<div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] border border-white p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
					<div className="flex items-center gap-4 p-5 rounded-2xl bg-blue-50/50">
						<div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white shadow-sm text-blue-600 flex items-center justify-center shrink-0">
							<FaUsers className="text-lg md:text-xl" />
						</div>
						<div className="min-w-0">
							<p className="text-[11px] font-black text-blue-500 uppercase tracking-widest">{tPrograms("targetParticipants")}</p>
							<p className="text-sm font-bold text-slate-900 truncate">{participantsList[0] || tPrograms("comingSoon")}</p>
						</div>
					</div>

					<div className="flex items-center gap-4 p-5 rounded-2xl bg-indigo-50/50">
						<div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white shadow-sm text-orange-600 flex items-center justify-center shrink-0">
							<FaLanguage className="text-lg md:text-xl" />
						</div>
						<div className="min-w-0">
							<p className="text-[11px] font-black text-orange-500 uppercase tracking-widest">{tPrograms("languageRequirements")}</p>
							<p className="text-sm font-bold text-slate-900 truncate">{languageList[0] || tPrograms("comingSoon")}</p>
						</div>
					</div>
				</div>
			</div>

			{/* --- 2. MAIN BENTO GRID --- */}
			<div className="max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-8">
				{/* Purpose Section */}
				<section className="relative group p-8 lg:p-16 bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm">
					{/* Background decoration - optimized opacity */}
					<div className="absolute inset-0 opacity-[0.2] pointer-events-none hidden md:block" style={{ backgroundImage: `radial-gradient(#e2e8f0 1.5px, transparent 1.5px)`, backgroundSize: "24px 24px" }} />
					<FaBullseye className="absolute -bottom-10 -right-10 text-[12rem] lg:text-[15rem] text-blue-50/40 transition-transform duration-700 pointer-events-none -rotate-12 group-hover:rotate-0" />

					<div className="relative z-10 space-y-8 max-w-4xl">
						<div className="inline-flex flex-col">
							<h3 className="text-lg md:text-xl font-extrabold text-slate-900 uppercase tracking-widest">{tPrograms("programPurpose")}</h3>
							<div className="h-1 w-6 bg-orange-500/40 mt-1" />
						</div>

						<div className="space-y-6">
							{purposeList.map((item, i) => (
								<div key={`purpose-${i}`} className="flex gap-4 items-start">
									<span className="text-xs font-black text-blue-300 mt-1.5 italic">{(i + 1).toString().padStart(2, "0")}</span>
									<p className="font-bold leading-snug tracking-tight text-slate-600 text-base md:text-lg">{item}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<div className="grid lg:grid-cols-12 gap-8 items-start">
					{/* Objectives Section */}
					<section className="lg:col-span-8 relative p-8 lg:p-14 bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-sm">
						<div className="space-y-10">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
									<FaCheck className="text-sm" />
								</div>
								<h3 className="text-lg md:text-xl font-extrabold text-slate-900 uppercase tracking-widest">{tPrograms("learningObjectives")}</h3>
							</div>

							<div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
								{objectivesList.map((obj, i) => (
									<div key={`obj-${i}`} className="flex gap-4 items-start group/item">
										<span className="text-xs font-black text-blue-200 mt-1 italic group-hover/item:text-blue-400 transition-colors">{(i + 1).toString().padStart(2, "0")}</span>
										<p className="font-bold leading-snug text-slate-500 text-sm group-hover:text-slate-700 transition-colors">{obj}</p>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* Speakers Section */}
					<section className="lg:col-span-4 relative p-8 lg:p-10 bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-sm">
						<div className="space-y-10">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-full bg-slate-50 text-slate-900 flex items-center justify-center border border-slate-200">
									<FaUserTie className="text-sm" />
								</div>
								<h3 className="text-lg md:text-xl font-extrabold text-slate-900 uppercase tracking-widest">{tPrograms("speakers")}</h3>
							</div>

							<div className="space-y-3">
								{speakersList.length > 0 ? (
									speakersList.map((name, i) => (
										<div key={i} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-blue-50/50 transition-colors">
											<span className="text-xs font-black text-blue-200 italic">{(i + 1).toString().padStart(2, "0")}</span>
											<p className="font-bold text-slate-700 text-sm md:text-base">{name}</p>
										</div>
									))
								) : (
									<div className="py-8 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30 flex items-center justify-center">
										<p className="text-slate-400 font-bold text-xs">{tPrograms("comingSoon")}</p>
									</div>
								)}
							</div>
						</div>
					</section>
				</div>

				{/* --- 3. SESSIONS LIST --- */}
				<div id="sessions" className="pt-12 md:pt-20 scroll-mt-24">
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-2">
						<div className="space-y-2">
							<div className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">
								<FaCalendarAlt /> {tPrograms("availableWorkshops")}
							</div>
							<h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">{tPrograms("registerToWorkshops")}</h2>
						</div>
					</div>

					<div className="mt-8">
						{workshop.sessions?.length > 0 ? (
							<WorkshopSessions
								sessions={workshop.sessions}
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
						) : (
							<div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/50 p-12 text-center">
								<p className="text-slate-500 font-bold text-lg">{tPrograms("noWorkshopsAvailable")}</p>
							</div>
						)}
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}
