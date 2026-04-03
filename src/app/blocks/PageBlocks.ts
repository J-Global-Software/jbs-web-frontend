// src/payload/blocks/PageBlocks.ts

import { Block } from "payload";

export const HeroBlock: Block = {
	slug: "hero",
	fields: [
		{ name: "heading", type: "textarea", localized: true, admin: { description: "Accepts HTML like <br> and <blue>" } },
		{ name: "subheading", type: "textarea", localized: true },
		{ name: "heroCTA", type: "text", localized: true },
		{ name: "heroSecondaryCTA", type: "text", localized: true },
	],
};

export const FreeTrialSectionBlock: Block = {
	slug: "freeTrialSection",
	fields: [
		{ name: "title", type: "text", localized: true },
		{ name: "feature1", type: "text", localized: true },
		{ name: "feature2", type: "text", localized: true },
		{ name: "cta", type: "text", localized: true },
	],
};

export const LecturerIntroductionBlock: Block = {
	slug: "lecturerIntroduction",
	fields: [
		{ name: "badge", type: "text", localized: true, defaultValue: "Instructors" },
		{ name: "title", type: "text", localized: true, defaultValue: "Learn from people who've lived it." },
		{
			name: "lecturer",
			type: "group",
			fields: [
				{ name: "name", type: "text", localized: true, defaultValue: "Jon Lynch" },
				{ name: "role", type: "text", localized: true },
				{ name: "bio", type: "textarea", localized: true },
				{ name: "universityName", type: "text", localized: true },
				{ name: "universityRole", type: "text", localized: true },
			],
		},
		{
			name: "cta",
			type: "group",
			fields: [{ name: "text", type: "text", localized: true, defaultValue: "Book a free 1-on-1 session with Jon →" }],
		},
	],
};

export const BenefitsBlock: Block = {
	slug: "benefits",
	fields: [
		{ name: "title", type: "text", localized: true },
		{ name: "introText", type: "textarea", localized: true },
		{
			name: "benefitsList",
			type: "array",
			localized: true,
			fields: [{ name: "benefitWord", type: "text" }],
		},
		{
			name: "contentList",
			type: "array",
			localized: true,
			fields: [{ name: "listItem", type: "textarea" }],
		},
		{
			name: "scheduleLabels",
			type: "group",
			localized: true,
			fields: [
				{ name: "classSchedule", type: "text" },
				{ name: "morningTime", type: "text" },
				{ name: "afternoonTime", type: "text" },
				{ name: "eveningTime", type: "text" },
			],
		},
	],
};
export const PricingBlock: Block = {
	slug: "pricing",
	fields: [
		{
			name: "title",
			type: "text",
			localized: true,
			defaultValue: "Plan Prices",
		},
		{
			name: "subtitle", // ADDED THIS
			type: "text",
			localized: true,
			defaultValue: "Choose the best plan to master your global business skills.",
		},
		// Global Labels for the UI
		{
			name: "labels",
			type: "group",
			fields: [
				{ name: "monthly", type: "text", localized: true, defaultValue: "Monthly" },
				{ name: "biannual", type: "text", localized: true, defaultValue: "6 Months" },
				{ name: "annual", type: "text", localized: true, defaultValue: "Annual" },
				{ name: "taxIncl", type: "text", localized: true, defaultValue: "/mo (Tax Incl.)" },
				{ name: "noCard", type: "text", localized: true, defaultValue: "No credit card required" },
				{ name: "billedMonthly", type: "text", localized: true, defaultValue: "Billed monthly" },
				{ name: "billedBiannual", type: "text", localized: true, defaultValue: "Billed every 6 months" },
				{ name: "billedAnnual", type: "text", localized: true, defaultValue: "Billed annually" },
			],
		},
		// The "Free Trial" Card
		{
			name: "freeTrial",
			type: "group",
			fields: [
				{ name: "name", type: "text", localized: true },
				{ name: "price", type: "text", defaultValue: "¥0" },
				{ name: "buttonText", type: "text", localized: true },
				{
					name: "features",
					type: "array",
					fields: [
						{ name: "category", type: "text", localized: true },
						{ name: "text", type: "text", localized: true },
						{ name: "isIncluded", type: "checkbox", defaultValue: true },
						{ name: "subtext", type: "text", localized: true },
					],
				},
			],
		},
		// The "Unlimited" Card (Dynamic Cycles)
		{
			name: "unlimited",
			type: "group",
			fields: [
				{ name: "name", type: "text", localized: true },
				{ name: "buttonText", type: "text", localized: true },
				{
					name: "cycles",
					type: "group",
					fields: [
						{
							name: "monthly",
							type: "group",
							fields: [
								{ name: "price", type: "text" },
								{ name: "link", type: "text" },
								{
									name: "features",
									type: "array",
									fields: [
										{ name: "category", type: "text", localized: true },
										{ name: "text", type: "text", localized: true },
										{ name: "isIncluded", type: "checkbox" },
									],
								},
							],
						},
						{
							name: "biannual",
							type: "group",
							fields: [
								{ name: "price", type: "text" },
								{ name: "link", type: "text" },
								{
									name: "features",
									type: "array",
									fields: [
										{ name: "category", type: "text", localized: true },
										{ name: "text", type: "text", localized: true },
										{ name: "isIncluded", type: "checkbox" },
									],
								},
							],
						},
						{
							name: "annual",
							type: "group",
							fields: [
								{ name: "price", type: "text" },
								{ name: "link", type: "text" },
								{
									name: "features",
									type: "array",
									fields: [
										{ name: "category", type: "text", localized: true },
										{ name: "text", type: "text", localized: true },
										{ name: "isIncluded", type: "checkbox" },
									],
								},
							],
						},
					],
				},
			],
		},
	],
};

export const WhyChooseUsBlock: Block = {
	slug: "whyChooseUs",
	fields: [
		{ name: "mainTitle", type: "text", localized: true },
		{ name: "reasonText", type: "textarea", localized: true },
		{ name: "whyChooseUs", type: "text", localized: true },
		{
			name: "reasons",
			type: "array",
			localized: true,
			fields: [
				{ name: "title", type: "text" },
				{ name: "description", type: "textarea" },
			],
		},
	],
};

export const LearningCycleBlock: Block = {
	slug: "learningCycle",
	labels: {
		singular: "Learning Cycle",
		plural: "Learning Cycles",
	},
	fields: [
		{
			name: "badge",
			type: "text",
			localized: true,
			defaultValue: "How It Works",
		},
		{
			name: "title",
			type: "text",
			localized: true,
			defaultValue: "The Continuous Learning Cycle",
		},
		{
			name: "description",
			type: "textarea",
			localized: true,
		},
		{
			name: "steps",
			type: "array",
			minRows: 4,
			maxRows: 4, // Keeps the orbit layout consistent
			fields: [
				{
					name: "title",
					type: "text",
					localized: true,
				},
				{
					name: "subtitle",
					type: "text",
					localized: true,
				},
				{
					name: "description",
					type: "textarea",
					localized: true,
				},
				{
					name: "icon",
					type: "select",
					options: [
						{ label: "Users", value: "users" },
						{ label: "Monitor", value: "monitor" },
						{ label: "Compass", value: "compass" },
						{ label: "Messages", value: "messages" },
					],
				},
			],
		},
	],
};

export const RoadmapBlock: Block = {
	slug: "roadmap",
	fields: [
		{
			name: "title",
			type: "text",
			localized: true,
			defaultValue: "Your 14-Day Roadmap",
		},
		{
			name: "subtitle",
			type: "text",
			localized: true,
			defaultValue: "No credit card. No risk. Pure progress.",
		},
		{
			name: "steps",
			type: "array",
			fields: [
				{
					name: "day",
					type: "text",
					localized: true, // e.g., "Day 1" or "1日目"
				},
				{
					name: "title",
					type: "text",
					localized: true,
				},
				{
					name: "description",
					type: "textarea",
					localized: true,
				},
				{
					name: "icon",
					type: "select",
					options: [
						{ label: "Zap / Flash", value: "zap" },
						{ label: "User / Coach", value: "userCheck" },
						{ label: "Globe / World", value: "globe" },
						{ label: "Shield / Security", value: "shieldCheck" },
					],
				},
			],
		},
		{
			name: "ctaTitle",
			type: "text",
			localized: true,
			defaultValue: "Ready to start Day 1?",
		},
		{
			name: "ctaDescription",
			type: "text",
			localized: true,
		},
		{
			name: "ctaButtonText",
			type: "text",
			localized: true,
			defaultValue: "Start Free Trial",
		},
	],
};

export const InstructorsBlock: Block = {
	slug: "instructorsSection",
	fields: [
		{
			name: "title",
			type: "text",
			localized: true,
			defaultValue: "In addition, instructors with specialized knowledge will support you!",
		},
		{
			name: "team",
			type: "array",
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
				},
				{
					name: "role",
					type: "text",
					localized: true,
				},
				{
					name: "staticImageKey",
					type: "text",
					admin: {
						description: "The filename of the static image (e.g., sarah-birchley.jpg)",
					},
				},
			],
		},
	],
};

export const PressBlock: Block = {
	slug: "pressSection",
	fields: [
		{
			name: "badge",
			type: "text",
			localized: true,
			defaultValue: "Featured In",
		},
		{
			name: "title",
			type: "text",
			localized: true,
			defaultValue: "What the press has said.",
		},
		{
			name: "publications",
			type: "array",
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
				},
				{
					name: "description",
					type: "textarea",
					localized: true,
				},
				{
					name: "articles",
					type: "array",
					fields: [
						{
							name: "title",
							type: "text",
							localized: true,
						},
						{
							name: "url",
							type: "text",
							required: true,
						},
					],
				},
			],
		},
	],
};
