import type { ResolvingMetadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import LogoSection from "../components/homepage/LogoSection";
import FeturedIn from "../components/homepage/FeaturedIn";
import Footer from "../components/Footer";
import { AppLocale } from "@/i18n/config";
import PricingSection from "../components/homepage/Pricing";
import ContinuousLearningCycle from "../components/homepage/HowItWorks";
import JGlobalBusinessSchool from "../components/homepage/WhyUs";
import HeroSection from "../components/homepage/HeroSection";
import LecturerIntroduction from "../components/homepage/LecturerIntroduction";
import Instructors from "../components/homepage/Instructors";
import FreeTrial from "../components/homepage/FreeTrial";

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

async function getPayloadData(locale: AppLocale) {
	const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000";

	// Fetch Page content and Global Navbar/Footer
	const [pageRes, footerRes, navbarRes] = await Promise.all([fetch(`${baseUrl}/api/pages?where[slug][equals]=/&locale=${locale}&depth=1`, { next: { revalidate: 60 } }), fetch(`${baseUrl}/api/globals/footer?locale=${locale}`, { next: { revalidate: 60 } }), fetch(`${baseUrl}/api/globals/navbar?locale=${locale}`, { next: { revalidate: 60 } })]);

	const pageData = await pageRes.json();
	const footerData = await footerRes.json();
	const navbarData = await navbarRes.json();

	return {
		page: pageData.docs?.[0] || null,
		footerData: footerData,
		navbar: navbarData,
	};
}

export default async function HomePage({ params }: { params: Promise<{ locale: AppLocale }> }) {
	const { locale } = await params;
	const { page, footerData, navbar } = await getPayloadData(locale);

	// 2. Extract Blocks from Payload Layout
	// This allows your non-tech team to edit these specific sections
	const heroContent = page?.layout?.find((b: any) => b.blockType === "hero");
	const pricingContent = page?.layout?.find((b: any) => b.blockType === "pricing");
	const whyUsContent = page?.layout?.find((b: any) => b.blockType === "whyChooseUs");
	const learningCycle = page?.layout?.find((b: any) => b.blockType === "learningCycle");
	const roadmap = page?.layout?.find((b: any) => b.blockType === "roadmap");
	const lecturer = page?.layout?.find((b: any) => b.blockType === "lecturerIntroduction");
	const instructors = page?.layout?.find((b: any) => b.blockType === "instructorsSection");
	const pressSection = page?.layout?.find((b: any) => b.blockType === "pressSection");

	return (
		<>
			<HeroSection data={heroContent} locale={locale} navbarData={navbar} />
			<LogoSection />
			<div id="why-jbs" className="scroll-mt-24">
				<JGlobalBusinessSchool data={whyUsContent} />
			</div>
			<ContinuousLearningCycle data={learningCycle} />
			<FreeTrial data={roadmap} />

			<div id="pricing" className="scroll-mt-16">
				<PricingSection data={pricingContent} />
			</div>

			<LecturerIntroduction data={lecturer} />
			<div id="instructors" className="scroll-mt-24">
				<Instructors data={instructors} />
			</div>
			<FeturedIn data={pressSection} />
			<Footer data={footerData} />
		</>
	);
}
