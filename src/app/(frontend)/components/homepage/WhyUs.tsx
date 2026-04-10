"use client";

import Image from "next/image";
import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import { clsx } from "clsx";

interface WhyUsProps {
	data?: {
		whyChooseUs?: string; // Badge text
		mainTitle?: string; // Rich text with <blue>
		reasonText?: string; // Main description
		reasons?: {
			// The 3 cards
			title: string;
			description: string;
		}[];
	};
}

export default function JGlobalBusinessSchool({ data }: WhyUsProps) {
	// Fallbacks to keep the UI from breaking if CMS data is missing
	const badgeText = data?.whyChooseUs;
	const mainTitle = data?.mainTitle;
	const descriptionText = data?.reasonText;

	// Mapping icons to the array index (or you can add an icon picker in Payload later)
	const iconConfig = [
		{ src: "/icons/piggy-bank.png", bg: "bg-[#d6e7ff]" },
		{ src: "/icons/laptop.png", bg: "bg-[#d6e7ff]" },
		{ src: "/icons/language.png", bg: "bg-[#d6e7ff]" },
	];

	// Parser options for the <blue> tag in the title
	const options: HTMLReactParserOptions = {
		replace: (domNode: any) => {
			if (domNode.type === "tag" && domNode.name === "blue") {
				return <span className="text-[#215ca5]">{domToReact(domNode.children, options)}</span>;
			}
		},
	};

	return (
		<div id="why-us" className="relative overflow-hidden">
			{/* Header Section */}
			<section className="relative z-10 mx-auto max-w-7xl px-4 pt-4 pb-10 text-center sm:px-6 sm:pt-8 sm:pb-12 lg:px-8 lg:pt-12 lg:pb-15">
				<div className="flex flex-col items-center">
					{/* Badge */}
					<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#215ca5]/20 bg-[#215ca5]/5 px-4 py-2 sm:mb-6 sm:px-5">
						<span className="w-1.5 h-1.5 rounded-full bg-[#215ca5]" />
						<span className="text-xs font-bold tracking-[0.18em] uppercase text-[#215ca5]">{badgeText}</span>
					</div>

					{/* Title with Parsed <blue> tag */}
					<h2 className="mb-6 max-w-5xl text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl md:mb-8 md:text-4xl">{parse(mainTitle!, options)}</h2>
				</div>

				{/* Description - Using whitespace-pre-line to handle \n from CMS */}
				<p className="mx-auto max-w-3xl whitespace-pre-line text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">{descriptionText}</p>
			</section>

			{/* Features Grid */}
			<section className="relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
				<div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
					{data?.reasons?.map((reason, i) => {
						// Reuse icons in a loop if there are more than 3 reasons
						const icon = iconConfig[i % iconConfig.length];

						return (
							<div key={i} className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#215ca5]/20 hover:shadow-md sm:p-7">
								{/* Icon Container */}
								<div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center mb-5", icon.bg)}>
									<Image className="icon-mask" src={icon.src} alt="" width={24} height={24} style={{ ["--icon-url" as any]: `url(${icon.src})` }} />
								</div>

								{/* Title */}
								<h3 className="text-sm font-bold text-[#1a3558] mb-3 leading-snug">{reason.title}</h3>

								{/* Faint Rule */}
								<div className="h-px bg-[#215ca5]/10 mb-3" />

								{/* Body Text */}
								<p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">{reason.description}</p>
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
}
