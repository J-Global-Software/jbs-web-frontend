"use client";

import React, { useState, useEffect } from "react";
import { Users, MonitorPlay, Compass, MessagesSquare, ChevronRight } from "lucide-react";
import clsx from "clsx";

// Mapping string values from Payload to Lucide Components
const iconMap: Record<string, any> = {
	users: Users,
	monitor: MonitorPlay,
	compass: Compass,
	messages: MessagesSquare,
};

// Fixed angles for the 4-step orbit
const ANGLES = [270, 0, 90, 180];

interface LearningCycleProps {
	data?: {
		badge?: string;
		title?: string;
		description?: string;
		steps?: {
			title: string;
			subtitle: string;
			description: string;
			icon: string;
		}[];
	};
}

const BRAND = "#215ca5";
const ORBIT_RADIUS = 140;

export default function GrandPlanetaryCycle({ data }: LearningCycleProps) {
	const [activeIdx, setActiveIdx] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	// Prepare dynamic data from Payload
	const steps = data?.steps || [];
	const activeItem = steps[activeIdx];

	useEffect(() => {
		if (isPaused || steps.length === 0) return;
		const interval = setInterval(() => {
			setActiveIdx((prev) => (prev + 1) % steps.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [isPaused, activeIdx, steps.length]);

	if (!steps || steps.length === 0) return null;

	const orbitSize = ORBIT_RADIUS * 2 + 100;

	return (
		<section className="py-15 px-4 overflow-hidden">
			<style jsx>{`
				@keyframes orbit-pulse {
					0% {
						transform: scale(1);
						opacity: 0.4;
					}
					100% {
						transform: scale(1.9);
						opacity: 0;
					}
				}
				.animate-orbit-pulse {
					animation: orbit-pulse 2.8s cubic-bezier(0, 0, 0.2, 1) infinite;
				}
			`}</style>

			{/* Header */}
			<div className="max-w-7xl mx-auto mb-4 text-center">
				<div className="inline-flex items-center gap-2 px-5 py-2 mb-3 rounded-full border border-[#215ca5]/20 bg-[#215ca5]/5">
					<span className="w-1.5 h-1.5 rounded-full bg-[#215ca5]" />
					<span className="text-xs font-bold tracking-[0.18em] uppercase text-[#215ca5]">{data?.badge}</span>
				</div>
				<h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">{data?.title}</h2>
				<p className="text-base md:text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">{data?.description}</p>
			</div>

			<div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} className="max-w-7xl mx-auto rounded-[3rem] px-6 py-6 lg:px-8">
				<div className="flex flex-col lg:flex-row items-center w-full gap-4">
					{/* Orbit Visualization */}
					<div className="w-full lg:w-[52%] flex justify-center items-center">
						<div className="relative flex-shrink-0 flex items-center justify-center" style={{ width: orbitSize, height: orbitSize }}>
							<div className="absolute border border-slate-300/70 rounded-full pointer-events-none" style={{ width: ORBIT_RADIUS * 2.4, height: ORBIT_RADIUS * 2.4 }} />
							<div className="absolute border border-dashed border-slate-400/70 rounded-full pointer-events-none" style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2 }} />

							{/* Central Hub */}
							<div className="absolute bg-white rounded-full flex flex-col items-center justify-center text-center p-4 border border-slate-100 shadow-sm z-10" style={{ width: 120, height: 120 }}>
								<span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 leading-relaxed">
									Continuous
									<br />
									Learning
									<br />
									Cycle
								</span>
							</div>

							{/* Dynamic Planets */}
							{steps.map((item, idx) => {
								const angle = ANGLES[idx] || 0;
								const rad = (angle * Math.PI) / 180;
								const x = Math.cos(rad) * ORBIT_RADIUS;
								const y = Math.sin(rad) * ORBIT_RADIUS;
								const isActive = activeIdx === idx;
								const Icon = iconMap[item.icon] || Users;

								return (
									<button
										key={idx}
										onClick={() => setActiveIdx(idx)}
										style={{
											position: "absolute",
											left: "50%",
											top: "50%",
											transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
											zIndex: isActive ? 40 : 20,
										}}
										className="group focus:outline-none flex flex-col items-center"
									>
										{isActive && <div className="absolute rounded-full animate-orbit-pulse pointer-events-none border border-[#215ca5]" style={{ width: 70, height: 70 }} />}
										<div
											className="flex items-center justify-center rounded-full border-2 border-white transition-all duration-500 shadow-md"
											style={{
												width: isActive ? 80 : 70,
												height: isActive ? 80 : 70,
												backgroundColor: isActive ? BRAND : "#e8eef7",
											}}
										>
											<Icon style={{ width: 25, height: 25, color: isActive ? "#fff" : "#5a7fac" }} />
										</div>
										<div className={clsx("absolute px-3 py-1 rounded-full transition-all duration-500 whitespace-nowrap", isActive ? "bg-white shadow border border-slate-100 -bottom-10 opacity-100" : "opacity-60 -bottom-8")}>
											<span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: isActive ? BRAND : "#64748b" }}>
												{item.title}
											</span>
										</div>
									</button>
								);
							})}
						</div>
					</div>

					{/* Content Panel */}
					<div className="w-full lg:w-[48%] lg:pl-6 xl:pl-10">
						<div key={activeIdx} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-9 h-0.5 rounded-full bg-[#215ca5]" />
								<span className="text-xs font-bold uppercase tracking-[0.2em] text-[#215ca5]/50">Step 0{activeIdx + 1}</span>
							</div>

							<h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">{activeItem.title}</h3>
							<p className="text-base text-slate-500 leading-relaxed mb-3 whitespace-pre-line">{activeItem.description}</p>

							{/* Controls */}
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-slate-100">
								<button onClick={() => setActiveIdx((activeIdx + 1) % steps.length)} className="flex items-center gap-3 group focus:outline-none">
									<div className="flex items-center justify-center w-10 h-10 rounded-full text-[#215ca5] text-white transition-all duration-300 group-hover:scale-105">
										<ChevronRight className="text-[#215ca5]" size={20} />
									</div>
									<span className="text-[#215ca5] font-bold uppercase tracking-widest text-xs">Next</span>
								</button>

								<div className="flex gap-2 items-center">
									{steps.map((_, idx) => (
										<button
											key={idx}
											onClick={() => setActiveIdx(idx)}
											className="rounded-full transition-all duration-500"
											style={{
												height: 7,
												width: activeIdx === idx ? 32 : 7,
												backgroundColor: activeIdx === idx ? BRAND : "#cbd5e1",
											}}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
