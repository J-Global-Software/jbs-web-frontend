import HeroSection from "@/app/components/homepage/HeroSection";
import JGlobalBusinessSchool from "@/app/components/homepage/WhyUs";
import JGlobalAchievements from "@/app/components/homepage/Achievements";
import FreeTrial from "@/app/components/homepage/FreeTrial";
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
import ProgramsSection from "../components/homepage/ProgramsSection";

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
	const tHome = useTranslations("homepage");

	return (
		<>
			<HeroSection />
			<JGlobalBusinessSchool />
			<JGlobalAchievements />
			<LogoSection />
			<FreeTrial />
			<ProgramsSection />
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
