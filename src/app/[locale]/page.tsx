import HeroSection from "@/app/components/homepage/HeroSection";
import JGlobalBusinessSchool from "@/app/components/homepage/WhyUs";
import JGlobalAchievements from "@/app/components/homepage/Achievements";
import FreeTrial from "@/app/components/homepage/FreeTrial";
import CardGridSection, { CardGridData } from "@/app/components/homepage/CardGridSection";
import { BookOpen, Briefcase } from "lucide-react";
import LecturerIntroduction from "@/app/components/homepage/LecturerIntroduction";
import Instructors from "@/app/components/homepage/Instructors";

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
			<JGlobalBusinessSchool />
			<JGlobalAchievements />
			<LogoSection />
			<FreeTrial />
			<div className="bg-[#dbe9ff] pt-20">
				<div className="bg-[url('/img/bg_continuation.png')] bg-cover bg-center bg-no-repeat">
					<h1 className="text-2xl md:text-5xl text-center flex justify-center lg:text-5xl font-extrabold tracking-tight text-gray-600 mb-10">
						<span className="bg-clip-text  relative z-10"> {tHome("programsSectionSubtitle")}</span>
					</h1>
					{/* Content */}
					<div data-aos="fade-right" data-aos-duration="600">
						<CardGridSection {...globalPrograms} align="left" />
					</div>

					<div data-aos="fade-left" data-aos-duration="600">
						<CardGridSection {...globalTeamwork} align="right" />
					</div>
					<div data-aos="fade-right" data-aos-duration="600">
						<CardGridSection {...globalLeadership} align="left" />
					</div>
				</div>
			</div>{" "}
			<PricingSection />
			<JBSWorkshopsBenefits />
			<JBSWorkshopsStructure />
			<LecturerIntroduction />
			<Instructors />
			<FeturedIn />
			<Footer />
			<Link
				href="/free-coaching"
				className="
    fixed bottom-6 right-0
    bg-linear-to-r from-[#f58766]/80 to-[#fd634b]/80
    backdrop-blur-md
  
    shadow-lg shadow-blue-500/30
    pl-5 pr-7 py-3
    text-white font-semibold tracking-tight
    rounded-l-2xl
    flex items-center gap-2
    transition-all duration-300
    hover:shadow-xl hover:shadow-blue-400/50
    hover:from-[#ffa78c] hover:to-[#ff885c]
    z-50
  "
			>
				<span className="drop-shadow-md">{tHome("freeCoaching")}</span>

				{/* Curved blue edge */}
			</Link>
		</>
	);
}
