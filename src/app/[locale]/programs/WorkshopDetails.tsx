"use client";

import { useMemo, useState, useEffect } from "react";
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

	// This state allows the UI to render before the heavy JS logic kicks in
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		// Delay logic processing by a tiny bit to let the "Hero" paint first
		const timer = setTimeout(() => setIsMounted(true), 50);
		return () => clearTimeout(timer);
	}, []);

	/**
	 * LOGIC OPTIMIZATION:
	 * We only calculate these lists if isMounted is true.
	 * This prevents the "Initial Load Freeze" on mobile.
	 */
	const processed = useMemo(() => {
		if (!isMounted) return { purpose: [], objectives: [], participants: [], language: [], speakers: [] };

		const cleanList = (val: string | string[] | undefined): string[] => {
			if (!val) return [];
			const arr = Array.isArray(val) ? val : val.split(/(?=[●・•○■▪➤])|(?=\d+\.)/);
			return arr.map((s: string) => s.replace(/^[●・•○■▪➤\s]+|^\d+[\.\s]*/, "").trim()).filter((t: string) => t.length > 0 && !t.toLowerCase().includes("by the end of the workshop"));
		};

		return {
			purpose: cleanList(workshop.purpose),
			objectives: cleanList(workshop.objectives),
			participants: cleanList(workshop.participants),
			language: cleanList(workshop.language),
			speakers: (workshop.speakers || []).map((s: string) => s.replace(/^[•●・*-]|\d+\./, "").trim()).filter(Boolean),
		};
	}, [isMounted, workshop]);

	return (
		<main className="min-h-screen bg-[#F8FAFC] antialiased overflow-x-hidden">
			<WorkshopDetailHeader />

			<WorkshopHero title={workshop.title} subtitle={showSubtitle ? workshop.subtitle : ""} image={workshop.image} code={code} levelLabel={levelLabel ? tLevels(code) : ""} registerNowLabel={tPrograms("registerNow")} readMoreLabel={tPrograms("readMore")} readLessLabel={tPrograms("readLess")} locale={locale} />

			{/* --- 1. STATS OVERLAY: Removed Blur to fix iOS Paint Latency --- */}
			<div className="relative z-30 -mt-8 max-w-5xl mx-auto px-4">
				<div className="bg-white rounded-2xl md:rounded-3xl shadow-lg border border-slate-100 p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
					<div className="flex items-center gap-4 p-5 rounded-xl bg-blue-50/50">
						<div className="w-10 h-10 rounded-xl bg-white shadow-sm text-blue-600 flex items-center justify-center shrink-0">
							<FaUsers />
						</div>
						<div className="min-w-0">
							<p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{tPrograms("targetParticipants")}</p>
							<p className="text-sm font-bold text-slate-900 truncate">{isMounted ? processed.participants[0] : "..."}</p>
						</div>
					</div>

					<div className="flex items-center gap-4 p-5 rounded-xl bg-indigo-50/50">
						<div className="w-10 h-10 rounded-xl bg-white shadow-sm text-orange-600 flex items-center justify-center shrink-0">
							<FaLanguage />
						</div>
						<div className="min-w-0">
							<p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{tPrograms("languageRequirements")}</p>
							<p className="text-sm font-bold text-slate-900 truncate">{isMounted ? processed.language[0] : "..."}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-8">
				{/* --- 2. DYNAMIC CONTENT AREA --- */}
				{!isMounted ? (
					/* Simple placeholder while JS is processing to keep the frame rate at 60fps */
					<div className="py-20 text-center text-slate-400 font-medium animate-pulse">Loading workshop details...</div>
				) : (
					<>
						<section className="relative p-8 md:p-16 bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm">
							<FaBullseye className="absolute -bottom-8 -right-8 text-[10rem] md:text-[15rem] text-slate-50 pointer-events-none -rotate-12" />
							<div className="relative z-10 space-y-8 max-w-4xl">
								<h3 className="text-lg md:text-xl font-extrabold text-slate-900 uppercase tracking-widest">{tPrograms("programPurpose")}</h3>
								<div className="space-y-6">
									{processed.purpose.map((item, i) => (
										<div key={i} className="flex gap-4 items-start">
											<span className="text-xs font-black text-blue-300 mt-1.5 italic">{(i + 1).toString().padStart(2, "0")}</span>
											<p className="font-bold leading-relaxed text-slate-600 text-base md:text-lg">{item}</p>
										</div>
									))}
								</div>
							</div>
						</section>

						<div className="grid lg:grid-cols-12 gap-8 items-start">
							{/* Objectives */}
							<section className="lg:col-span-8 p-8 md:p-14 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
								<h3 className="text-lg md:text-xl font-extrabold text-slate-900 uppercase tracking-widest mb-10">{tPrograms("learningObjectives")}</h3>
								<div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
									{processed.objectives.map((obj, i) => (
										<div key={i} className="flex gap-4 items-start">
											<span className="text-xs font-black text-blue-200 mt-1 italic">{(i + 1).toString().padStart(2, "0")}</span>
											<p className="font-bold text-slate-500 text-sm leading-snug">{obj}</p>
										</div>
									))}
								</div>
							</section>

							{/* Speakers */}
							<section className="lg:col-span-4 p-8 md:p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
								<h3 className="text-lg md:text-xl font-extrabold text-slate-900 uppercase tracking-widest mb-8">{tPrograms("speakers")}</h3>
								<div className="space-y-3">
									{processed.speakers.map((name, i) => (
										<div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 font-bold text-slate-700 text-sm flex items-center gap-3">
											<div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
											{name}
										</div>
									))}
								</div>
							</section>
						</div>
					</>
				)}

				{/* --- 3. SESSIONS LIST --- */}
				<div id="sessions" className="pt-12 scroll-mt-24">
					<h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mb-8">{tPrograms("registerToWorkshops")}</h2>
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
