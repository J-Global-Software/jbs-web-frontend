// src/payload/globals/Footer.ts

import { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
	slug: "footer",
	access: {
		read: () => true,
	},
	fields: [
		{ name: "companyName", type: "text", localized: true },
		{ name: "officeAddress", type: "textarea", localized: true },
		{ name: "contactEmail", type: "text" },
		{ name: "phoneNumber", type: "text" },
		{
			name: "labels", // Grouping standard UI labels
			type: "group",
			fields: [
				{ name: "company", type: "text", localized: true },
				{ name: "office", type: "text", localized: true },
				{ name: "contact", type: "text", localized: true },
				{ name: "links", type: "text", localized: true },
				{ name: "contactUs", type: "text", localized: true },
				{ name: "privacyPolicy", type: "text", localized: true },
				{ name: "companyProfile", type: "text", localized: true },
				{ name: "copyright", type: "text", localized: true },
				{ name: "email", type: "text", localized: true },
				{ name: "call", type: "text", localized: true },
			],
		},
	],
};
