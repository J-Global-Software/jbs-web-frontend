"use client";

import Footer from "@/app/components/Footer";
import { FaBullseye, FaUsers, FaLanguage, FaCheck, FaUserTie, FaCalendarAlt } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import WorkshopDetailHeader from "@/app/components/programs/WorkshopDetailHeader";
import WorkshopHero from "@/app/components/programs/WorkshopHero";
import WorkshopSessions from "@/app/components/programs/WorkshopSessions";
import { useMemo } from "react";

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

/**
 * Replaced 'any' with 'string | string[]' to handle both
 * raw translation strings and arrays.
 */
const parseList = (content: string | string[] | undefined): string[] => {
	if (!content) return [];

	const rawArray = Array.isArray(content) ? content : content.split(/(?=[●・•○■▪➤])|(?=\d+\.)/);

	return rawArray
		.map((line: string) => {
			return line
				.replace(/^[●・•○■▪➤\s]+/, "")
				.replace(/^\d+[\.\s]*/, "")
				.trim();
		})
		.filter((t: string) => {
			const isIntro = t.toLowerCase().includes("by the end of the workshop");
			return t.length > 0 && !isIntro;
		});
};

const cleanSpeakers = (speakers: string[]): string[] => {
	if (!speakers) return [];
	return speakers
		.map((text) => {
			return text
				.replace(/^0\d+/, "")
				.replace(/^[•●・*-]/, "")
				.replace(/^\d+[\.\s]*/, "")
				.trim();
		})
		.filter(Boolean);
};
export default function WorkshopDetail({ workshop, code, levelLabel = true, showSubtitle = true }: WorkshopDetailProps) {
	const locale = useLocale();
	const tPrograms = useTranslations("programs");
	const tLevels = useTranslations("levels");

	// --- Helpers ---

	const speakersList = useMemo(() => cleanSpeakers(workshop.speakers || []), [workshop.speakers]);
	const objectivesList = useMemo(() => parseList(workshop.objectives), [workshop.objectives]);
	const purposeList = useMemo(() => parseList(workshop.purpose), [workshop.purpose]);
	const participantsList = useMemo(() => parseList(workshop.participants), [workshop.participants]);
	const languageList = useMemo(() => parseList(workshop.language), [workshop.language]);

	return (
		<main className="min-h-screen bg-[#F8FAFC] selection:bg-blue-100">
			<WorkshopDetailHeader />

			<WorkshopHero title={workshop.title} subtitle={showSubtitle ? workshop.subtitle : ""} image={workshop.image} code={code} levelLabel={levelLabel ? tLevels(code) : ""} registerNowLabel={tPrograms("registerNow")} readMoreLabel={tPrograms("readMore")} readLessLabel={tPrograms("readLess")} locale={locale} />

			{/* --- 1. STATS OVERLAY --- */}
			<div className="relative z-30 -mt-10 max-w-5xl mx-auto px-4">
				<div className="bg-white/90 rounded-3xl  border border-white p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
					<div className="flex items-center gap-5 p-6 rounded-2xl bg-blue-50/50">
						<div className="w-12 h-12 rounded-xl bg-white shadow-sm text-blue-600 flex items-center justify-center shrink-0 text-xl">
							<FaUsers />
						</div>
						<div className="space-y-0.5">
							<p className="text-[13px] font-black text-blue-500 uppercase tracking-widest">{tPrograms("targetParticipants")}</p>
							<p className="text-sm font-bold text-slate-900 leading-tight">{participantsList[0] || tPrograms("comingSoon")}</p>
						</div>
					</div>

					<div className="flex items-center gap-5 p-6 rounded-2xl bg-indigo-50/50">
						<div className="w-12 h-12 rounded-xl bg-white shadow-sm text-orange-600 flex items-center justify-center shrink-0 text-xl">
							<FaLanguage />
						</div>
						<div className="space-y-0.5">
							<p className="text-[13px] font-black text-orange-500 uppercase tracking-widest">{tPrograms("languageRequirements")}</p>
							<p className="text-sm font-bold text-slate-900 leading-tight">{languageList[0] || tPrograms("comingSoon")}</p>
						</div>
					</div>
				</div>
			</div>

			{/* --- 2. MAIN BENTO GRID --- */}
			<div className="max-w-7xl mx-auto px-6 py-24 space-y-8">
				{/* Purpose Section */}
				<section className="relative group p-8 lg:p-16 bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.04)]">
					<div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: `radial-gradient(#e2e8f0 1.5px, transparent 1.5px)`, backgroundSize: "24px 24px" }} />
					<div className="absolute -bottom-10 -right-10 text-[15rem] text-blue-50/50  transition-colors duration-700 pointer-events-none -rotate-12">
						<FaBullseye />
					</div>

					<div className="relative z-10 space-y-8 max-w-4xl">
						<div className="group/title inline-flex items-center gap-4">
							<div className="relative flex items-center justify-center">
								<div className="absolute inset-0 bg-orange-500/20 rounded-full blur-md" />
							</div>
							<div className="flex flex-col">
								<h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-widest">{tPrograms("programPurpose")}</h3>
								<div className="h-0.5 w-4 bg-orange-500/30 mt-1 transition-all duration-500 group-hover/title:w-full" />
							</div>
						</div>

						<div className="space-y-6">
							{purposeList.map((item, i) => (
								<div key={`purpose-${i}`} className="flex gap-4 items-start">
									<span className="text-[13px] font-black text-blue-200 mt-2 tracking-tighter italic">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
									<p className="font-bold leading-snug tracking-tight text-slate-500 text-lg">{item}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<div className="grid lg:grid-cols-12 gap-8 items-start">
					{/* Objectives Section */}
					<section className="lg:col-span-8 relative group p-8 lg:p-14 bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.04)]">
						<div className="relative z-10 space-y-10">
							<div className="group/title inline-flex items-center gap-4">
								<div className="relative flex items-center justify-center">
									<div className="absolute inset-0 bg-blue-500/10 rounded-full blur-md" />
									<div className="relative w-10 h-10 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-blue-600 transition-transform duration-500 group-hover/title:scale-110">
										<FaCheck className="text-sm" />
									</div>
								</div>
								<div className="flex flex-col">
									<h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-widest">{tPrograms("learningObjectives")}</h3>
									<div className="h-0.5 w-4 bg-blue-500/30 mt-1 transition-all duration-500 group-hover/title:w-full" />
								</div>
							</div>

							{objectivesList.map((obj, i) => (
								<div key={`obj-${i}`} className="flex gap-4 items-start group/item">
									<span className="text-[13px] font-black text-blue-200 mt-1 tracking-tighter italic group-hover/item:text-blue-400">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
									<p className="font-bold leading-snug tracking-tight text-slate-500 text-sm lg:text-base group-hover:text-slate-700 transition-colors">{obj}</p>
								</div>
							))}
						</div>
					</section>

					{/* Speakers Section */}
					<section className="lg:col-span-4 relative group p-8 lg:p-10 bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.04)]">
						<div className="relative z-10 space-y-10">
							<div className="group/title inline-flex items-center gap-4">
								<div className="relative flex items-center justify-center">
									<div className="absolute inset-0 bg-slate-900/5 rounded-full blur-md" />
									<div className="relative w-10 h-10 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-900 transition-transform group-hover/title:scale-110">
										<FaUserTie className="text-sm" />
									</div>
								</div>
								<div className="flex flex-col">
									<h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-widest">{tPrograms("speakers")}</h3>
								</div>
							</div>

							<div className="space-y-4">
								{speakersList.length > 0 ? (
									speakersList.map((name, i) => (
										<div key={i} className="flex gap-4 items-center group/item p-3 -mx-3 rounded-2xl hover:bg-blue-50/50 transition-all">
											<span className="text-[12px] font-black text-blue-200 tracking-tighter italic group-hover/item:text-blue-400">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
											<p className="font-bold tracking-tight text-slate-700 text-base leading-none">{name}</p>
										</div>
									))
								) : (
									<div className="py-10 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30 flex flex-col items-center justify-center">
										<p className="text-slate-400 font-bold text-xs leading-tight">{tPrograms("comingSoon")}</p>
									</div>
								)}
							</div>
						</div>
					</section>
				</div>

				{/* --- 3. SESSIONS LIST --- */}
				<div id="sessions" className="pt-20 scroll-mt-24">
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-2">
						<div className="space-y-2">
							<div className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">
								<FaCalendarAlt /> {tPrograms("availableWorkshops")}
							</div>
							<h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">{tPrograms("registerToWorkshops")}</h2>
						</div>
					</div>

					<div className="mt-8 space-y-8">
						{workshop.sessions && workshop.sessions.length > 0 ? (
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
							<div className="rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white/50 p-16 text-center shadow-sm">
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
