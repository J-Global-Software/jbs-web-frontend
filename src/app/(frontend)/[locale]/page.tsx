
import { BookOpen, Briefcase } from "lucide-react";


import type { ResolvingMetadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import LogoSection from "../components/homepage/LogoSection";
import { useTranslations } from "next-intl";
import FeturedIn from "../components/homepage/FeaturedIn";
import Footer from "../components/Footer";
import JBSWorkshopsBenefits from "../components/homepage/Benefits";
import JBSWorkshopsStructure from "../components/homepage/WorkshopStructure";
import { Link } from "@/i18n/navigation";
import { AppLocale } from "@/i18n/config";
import PricingSection from "../components/homepage/Pricing";

import ContinuousLearningCycle from "../components/homepage/HowItWorks";
import JGlobalBusinessSchool from "../components/homepage/WhyUs";
import HeroSection from "../components/homepage/HeroSection";
import { CardGridData } from "../components/homepage/CardGridSection";
import LecturerIntroduction from "../components/homepage/LecturerIntroduction";
import Instructors from "../components/homepage/Instructors";
import ProgramsTabs from "../components/homepage/ProgramsTabs";

// app/[locale]/page.tsx
export async function generateMetadata(props: { params: Promise<{ locale: AppLocale }> }, parent: ResolvingMetadata) {
	/*

	------ CASE OF OVERRIDING SOME PARTS OF THE METADATA

	const baseMetadata = await generatePageMetadata(props, parent, "seo");
  const overrides = {
    title: "About Us - My Company",

  };
  return { ...baseMetadata, ...overrides };
  */
	return generatePageMetadata(props, parent, "seo");
}

export default function HomePage() {
	const tLevels = useTranslations("levels");
	const tHome = useTranslations("homepage");

	const globalPrograms: CardGridData = {
		level: tLevels("level1"),
		title: tLevels("globalCommunication"),
		description: tLevels("globalCommunicationDescription"),
		stats: [
			{ icon: <BookOpen className="w-4 h-4" />, label: tLevels("programsCount", { count: 24 }) },
			{ icon: <Briefcase className="w-4 h-4" />, label: tLevels("workshopsCount", { count: 70 }) },
		],
		cards: [
			{
				id: "CO1",
				title: tLevels("C01"),
				image: "/img/globals/C01.webp",
				link: "/programs/global-communication/C01",
			},
			{
				id: "CO2",
				title: tLevels("C02"),
				image: "/img/globals/C02.webp",
				link: "/programs/global-communication/C02",
			},
			{
				id: "CO3",
				title: tLevels("C03"),
				image: "/img/globals/C03.webp",
				link: "/programs/global-communication/C03",
			},
			{
				id: "CO4",
				title: tLevels("C04"),
				image: "/img/globals/C04.webp",
				link: "/programs/global-communication/C04",
			},
			{
				id: "BIZNITE",
				title: tLevels("countryBizNites"),
				image: "/img/globals/country-biz-nites.jpg",
				link: "/programs/intercultural-biz-nites",
			},
		],
	};

	const globalTeamwork: CardGridData = {
		level: tLevels("level2"),
		title: tLevels("globalTeamwork"),
		description: tLevels("globalTeamworkDescription"),
		stats: [
			{ icon: <BookOpen className="w-4 h-4" />, label: tLevels("programsCount", { count: 23 }) },
			{ icon: <Briefcase className="w-4 h-4" />, label: tLevels("workshopsCount", { count: 65 }) },
		],
		cards: [
			{
				id: "L12",
				title: tLevels("L12"),
				image: "/img/globals/L12.webp",
				link: "/programs/global-teamwork/L12",
			},
			{
				id: "CO6",
				title: tLevels("C06"),
				image: "/img/globals/C06.webp",
				link: "/programs/global-teamwork/C06",
			},
			{
				id: "F01",
				title: tLevels("F01"),
				image: "/img/globals/F01.webp",
				link: "/programs/global-teamwork/F01",
			},
			{
				id: "F08",
				title: tLevels("F08"),
				image: "/img/globals/F08.webp",
				link: "/programs/global-teamwork/F08",
			},
			{
				id: "C09",
				title: tLevels("C09"),
				image: "/img/globals/C09.webp",
				link: "/programs/global-teamwork/C09",
			},
		],
	};

	const globalLeadership: CardGridData = {
		level: tLevels("level3"),
		title: tLevels("globalLeadership"),
		description: tLevels("globalLeadershipDescription"),
		stats: [
			{ icon: <BookOpen className="w-4 h-4" />, label: tLevels("programsCount", { count: 14 }) },
			{ icon: <Briefcase className="w-4 h-4" />, label: tLevels("workshopsCount", { count: 40 }) },
		],
		cards: [
			{
				id: "L01",
				title: tLevels("L01"),
				image: "/img/globals/L01.webp",
				link: "/programs/global-leadership/L01",
			},
			{
				id: "L08",
				title: tLevels("L08"),
				image: "/img/globals/L08.webp",
				link: "/programs/global-leadership/L08",
			},
			{
				id: "I01",
				title: tLevels("I01"),
				image: "/img/globals/C06.webp",
				link: "/programs/global-leadership/I01",
			},
			{
				id: "L02",
				title: tLevels("L02"),
				image: "/img/globals/L02.webp",
				link: "/programs/global-leadership/L02-2",
			},
			{
				id: "L03",
				title: tLevels("L03"),
				image: "/img/globals/C09.webp",
				link: "/programs/global-leadership/L03-2",
			},
		],
	};
	return (
		<>
			<HeroSection />
			<LogoSection />
			<div id="why-jbs" className="scroll-mt-24">
				<JGlobalBusinessSchool />
			</div>
			<ContinuousLearningCycle />
			<div id="programs" className="bg-[#dbe9ff] pt-20 scroll-mt-16">
				<div className="bg-[url('/img/bg_continuation.png')] bg-cover bg-center bg-no-repeat">
					<h1 className="text-2xl md:text-5xl text-center flex justify-center lg:text-5xl font-extrabold tracking-tight text-gray-600 mb-10">
						<span className="bg-clip-text  relative z-10"> {tHome("programsSectionSubtitle")}</span>
					</h1>
					<ProgramsTabs levelsData={[globalPrograms, globalTeamwork, globalLeadership]} />
				</div>
			</div>{" "}
			<div id="pricing" className="scroll-mt-16">
				<PricingSection />
			</div>
			<JBSWorkshopsBenefits />
			<JBSWorkshopsStructure />
			<LecturerIntroduction />
			<div id="instructors" className="scroll-mt-24">
				<Instructors />
			</div>
			<FeturedIn />
			<Footer />
		</>
	);
}
