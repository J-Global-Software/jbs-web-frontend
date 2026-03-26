import { FileMakerService } from "@/services/filemaker.service";
import Link from "next/link";
import { FaGlobeAmericas, FaArrowRight } from "react-icons/fa";
import WorkshopDetailHeader from "@/app/components/programs/WorkshopDetailHeader";
import Footer from "@/app/components/Footer";

type Program = {
	recordId: string;
	fieldData: {
		LearningProgramCode: string;
		LearningProgramNameE: string;
		LearningProgramNameJ: string;
		DescriptionE: string;
		DescriptionJ: string;
		ProgramImage?: string;
		"ProgramType::ProgramTypeName": string;
	};
};

const getRegionName = (code: string, isJa: boolean) => {
	if (code.startsWith("E-AS") || code.startsWith("E-IN") || code.startsWith("E-CH")) return isJa ? "アジア" : "Asia";
	if (code.startsWith("E-EU") || code.startsWith("E-UK")) return isJa ? "ヨーロッパ" : "Europe";
	if (code.startsWith("E-US") || code.startsWith("E-CA")) return isJa ? "北米" : "North America";
	return isJa ? "その他" : "Other Regions";
};

export default async function CultureProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const isJa = locale === "ja";

	let programs: Program[] = [];
	try {
		programs = await FileMakerService.find("LearningProgramApi", {
			"ProgramType::ProgramTypeName": "==country culture biz nite",
		});
		programs.sort((a, b) => a.fieldData.LearningProgramCode.localeCompare(b.fieldData.LearningProgramCode));
	} catch (error) {
		console.error("Fetch Error:", error);
	}

	const groupedPrograms = programs.reduce(
		(acc, program) => {
			const region = getRegionName(program.fieldData.LearningProgramCode, isJa);
			if (!acc[region]) acc[region] = [];
			acc[region].push(program);
			return acc;
		},
		{} as Record<string, Program[]>,
	);

	return (
		<main className="min-h-screen bg-[#F8FAFC]">
			{/* 1. Global Navigation Header */}
			<WorkshopDetailHeader />

			{/* 2. Simple Hero Section */}
			<section className="bg-[#77acfb] pt-32 pb-16 px-6 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-[#4a88e6] to-[#9dc5fc] opacity-50"></div>
				<div className="relative z-10 max-w-7xl mx-auto">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-4">
						<FaGlobeAmericas /> {isJa ? "プログラム一覧" : "Program List"}
					</div>
					<h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter uppercase">{isJa ? "異文化理解" : "Intercultural Biz Nites"}</h1>
				</div>
			</section>

			{/* 3. Program List Grid */}
			<div className="max-w-7xl mx-auto px-6 py-16">
				{Object.entries(groupedPrograms).map(([region, items]) => (
					<section key={region} className="mb-20 last:mb-0">
						{/* Compact Section Header */}
						<div className="flex items-center gap-4 mb-8">
							<h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{region}</h2>
							<div className="h-px flex-grow bg-slate-200"></div>
							<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{items.length} Units</span>
						</div>

						{/* Smaller Card Grid (lg:grid-cols-4) */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{items.map((program) => (
								<Link key={program.recordId} href={`/${locale}/programs/intercultural-biz-nites/${program.fieldData.LearningProgramCode}`} className="group bg-white rounded-3xl p-3 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col">
									{/* Compact Thumbnail */}
									<div className="relative aspect-[4/2.9] rounded-2xl overflow-hidden bg-slate-100 mb-4">
										<img src={program.fieldData.ProgramImage || `/img/biznites/${program.fieldData.LearningProgramCode}.jpg`} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
										<div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-lg shadow-sm">
											<p className="text-[9px] font-black text-slate-900">{program.fieldData.LearningProgramCode}</p>
										</div>
									</div>

									{/* Text Details */}
									<div className="px-2 pb-2 flex-grow flex flex-col justify-between">
										<h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">{isJa ? program.fieldData.LearningProgramNameJ : program.fieldData.LearningProgramNameE}</h3>

										<div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
											<span className="text-[9px] font-black text-blue-500 uppercase tracking-tighter">{isJa ? "詳細を見る" : "View Details"}</span>
											<FaArrowRight className="text-[9px] text-blue-500" />
										</div>
									</div>
								</Link>
							))}
						</div>
					</section>
				))}
			</div>

			<Footer />
		</main>
	);
}
