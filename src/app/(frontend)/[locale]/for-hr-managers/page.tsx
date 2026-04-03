import { AppLocale } from "@/i18n/config";
import { ResolvingMetadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import Hero from "../../components/for-hr-managers/hero";
import ProblemsSection from "../../components/for-hr-managers/problem";
import EnterprisePointsSection from "../../components/for-hr-managers/points";
import FreeTrialSection from "../../components/for-hr-managers/free-trial";
import Footer from "../../components/Footer";

export async function generateMetadata(props: { params: Promise<{ locale: AppLocale }> }, parent: ResolvingMetadata) {
	return generatePageMetadata(props, parent, "seo");
}
export default function HomePage() {
	return (
		<>
			<Hero />
			<ProblemsSection />
			<EnterprisePointsSection />
			<FreeTrialSection />
			<Footer />
		</>
	);
}
