"use client";

import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useMemo } from "react";
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
	 * OPTIMIZATION 1: MEMOIZATION
	 * We run all the "dirty" string cleaning here once.
	 * This prevents the CPU from re-running regex every time you scroll or click.
	 */
	const processed = useMemo(() => {
		const cleanList = (val: any) => {
			if (!val) return [];
			const arr = Array.isArray(val) ? val : val.split(/(?=[●・•○■▪➤])|(?=\d+\.)/);
			return arr.map((s: string) => s.replace(/^[●・•○■▪➤\s]+|^\d+[\.\s]*/, "").trim()).filter((t: string) => t.length > 0 && !t.toLowerCase().includes("by the end of the workshop"));
		};

		return {
			purpose: cleanList(workshop.purpose),
			objectives: cleanList(workshop.objectives),
			participants: cleanList(workshop.participants),
			language: cleanList(workshop.language),
			speakers: (workshop.speakers || []).map((s) => s.replace(/^[•●・*-]|\d+\./, "").trim()).filter(Boolean),
		};
	}, [workshop]);

	return (
		<main className="min-h-screen bg-[#F8FAFC] antialiased selection:bg-blue-100">
			<WorkshopDetailHeader />

			<WorkshopHero title={workshop.title} subtitle={showSubtitle ? workshop.subtitle : ""} image={workshop.image} code={code} levelLabel={levelLabel ? tLevels(code) : ""} registerNowLabel={tPrograms("registerNow")} readMoreLabel={tPrograms("readMore")} readLessLabel={tPrograms("readLess")} locale={locale} />

			{/* --- 1. STATS OVERLAY --- 
                FIX: Removed 'backdrop-blur' as it causes the white-out/cutoff on mobile Safari/Chrome.
            */}
			<div className="relative z-30 -mt-8 md:-mt-10 max-w-5xl mx-auto px-4">
				<div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
					<div className="flex items-center gap-4 p-5 rounded-xl bg-blue-50/50">
						<div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white shadow-sm text-blue-600 flex items-center justify-center shrink-0 text-lg">
							<FaUsers />
						</div>
						<div className="min-w-0">
							<p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{tPrograms("targetParticipants")}</p>
							<p className="text-sm font-bold text-slate-900 truncate">{processed.participants[0] || tPrograms("comingSoon")}</p>
						</div>
					</div>

					<div className="flex items-center gap-4 p-5 rounded-xl bg-indigo-50/50">
						<div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white shadow-sm text-orange-600 flex items-center justify-center shrink-0 text-lg">
							<FaLanguage />
						</div>
						<div className="min-w-0">
							<p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{tPrograms("languageRequirements")}</p>
							<p className="text-sm font-bold text-slate-900 truncate">{processed.language[0] || tPrograms("comingSoon")}</p>
						</div>
					</div>
				</div>
			</div>

			{/* --- 2. MAIN CONTENT --- */}

			<Footer />
		</main>
	);
}
