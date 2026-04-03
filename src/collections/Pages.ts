// src/payload/collections/Pages.ts
import { BenefitsBlock, FreeTrialSectionBlock, HeroBlock, InstructorsBlock, LearningCycleBlock, LecturerIntroductionBlock, PressBlock, PricingBlock, RoadmapBlock, WhyChooseUsBlock } from "@/app/blocks/PageBlocks";
import { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
	slug: "pages",
	admin: {
		useAsTitle: "title",
	},
	access: {
		read: () => true, // Allows Next.js to fetch the page data
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			admin: {
				description: "Internal page title (e.g., Home Page)",
			},
		},
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			admin: {
				description: 'URL slug (e.g., "home" or "pricing")',
			},
		},
		{
			name: "layout",
			type: "blocks",
			required: true,
			blocks: [HeroBlock, WhyChooseUsBlock, BenefitsBlock, LecturerIntroductionBlock, PressBlock, PricingBlock, FreeTrialSectionBlock, LearningCycleBlock, RoadmapBlock, InstructorsBlock],
		},
	],
};
