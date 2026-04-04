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
		<section className="px-6">
			<div className="max-w-7xl mx-auto mb-4">
				<div className="inline-flex items-center gap-2 px-5 py-2 mb-3 rounded-full border border-[#215ca5]/20 bg-[#215ca5]/5">
					<span className="w-1.5 h-1.5 rounded-full bg-[#215ca5]" />
					<span className="text-xs font-bold tracking-[0.18em] uppercase text-[#215ca5]">{badge || "Programs"}</span>
				</div>
				<h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">{title}</h2>
				<p className="text-base md:text-lg text-slate-500 max-w-3xl leading-relaxed whitespace-pre-line">{description}</p>
			</div>

			{/* Tabs Control */}
			<div className="flex justify-center mt-12 mb-10 overflow-x-auto pb-4">
				<div className="flex bg-gray-100/80 backdrop-blur-md rounded-full p-1 shadow-sm shrink-0">
					{levels?.map((level: any, index: number) => (
						<button key={index} onClick={() => setActiveLevel(index)} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${activeLevel === index ? "bg-[#1f497c] text-white shadow-md" : "text-gray-600 hover:text-black"}`}>
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
