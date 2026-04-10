"use client";

import { useState, useEffect } from "react";
import CardGridSection from "./CardGridSection";

interface ProgramsTabsProps {
	data?: any;
}

export default function ProgramsTabs({ data }: ProgramsTabsProps) {
	const [activeLevel, setActiveLevel] = useState(1);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted || !data) return null;

	const { badge, title, description, levels } = data;

	// Get the currently selected level from Payload data
	const currentLevel = levels?.[activeLevel];

	// Format the data exactly as CardGridSection expects it
	const formattedData = {
		level: currentLevel?.levelLabel,
		title: currentLevel?.levelTitle,
		description: currentLevel?.levelDescription,
		cards:
			currentLevel?.programs?.map((p: any) => ({
				id: p.id,
				title: p.title,
				image: p.imagePath, // This is now just the string path
				link: p.link,
			})) || [],
	};

	return (
		<section className="px-4 sm:px-6">
			<div className="mx-auto mb-4 max-w-7xl">
				<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#215ca5]/20 bg-[#215ca5]/5 px-4 py-2 sm:px-5">
					<span className="w-1.5 h-1.5 rounded-full bg-[#215ca5]" />
					<span className="text-xs font-bold tracking-[0.18em] uppercase text-[#215ca5]">{badge || "Programs"}</span>
				</div>
				<h2 className="mb-3 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">{title}</h2>
				<p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-slate-500 sm:text-base md:text-lg">{description}</p>
			</div>

			{/* Tabs Control */}
			<div className="mt-8 mb-8 flex justify-center sm:mt-12 sm:mb-10">
				<div className="grid w-full max-w-lg grid-cols-2 gap-2 rounded-3xl bg-gray-100/80 p-2 shadow-sm md:inline-flex md:w-auto md:max-w-fit md:grid-cols-none md:flex-nowrap md:justify-center md:gap-0 md:rounded-full md:p-1">
					{levels?.map((level: any, index: number) => (
						<button
							key={index}
							onClick={() => setActiveLevel(index)}
							className={`rounded-2xl px-3 py-2 text-center text-xs font-semibold leading-tight transition-all duration-300 sm:rounded-full sm:px-6 sm:text-sm sm:whitespace-nowrap ${
								activeLevel === index ? "bg-[#1f497c] text-white shadow-md" : "bg-white/70 text-gray-600 hover:text-black"
							}`}
						>
							{level.levelLabel}
						</button>
					))}
				</div>
			</div>

			{/* Content Display */}
			<div className="transition-all duration-500">
				<CardGridSection {...formattedData} align="center" />
			</div>
		</section>
	);
}
