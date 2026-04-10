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
	const [isCompactLayout, setIsCompactLayout] = useState(false);

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

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 639px)");
		const syncLayout = () => setIsCompactLayout(mediaQuery.matches);

		syncLayout();
		mediaQuery.addEventListener("change", syncLayout);

		return () => mediaQuery.removeEventListener("change", syncLayout);
	}, []);

	if (!steps || steps.length === 0) return null;

	const orbitRadius = isCompactLayout ? 82 : ORBIT_RADIUS;
	const orbitSize = orbitRadius * 2 + (isCompactLayout ? 72 : 100);
	const outerOrbitSize = orbitRadius * (isCompactLayout ? 2.7 : 2.4);
	const innerOrbitSize = orbitRadius * 2;
	const hubSize = isCompactLayout ? 88 : 120;
	const activePlanetSize = isCompactLayout ? 60 : 80;
	const inactivePlanetSize = isCompactLayout ? 52 : 70;
	const pulseSize = isCompactLayout ? 52 : 70;
	const iconSize = isCompactLayout ? 18 : 25;

	return (
		<section className="overflow-hidden px-4 py-10 sm:py-15">
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
			<div className="mx-auto mb-4 max-w-7xl text-center">
				<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#215ca5]/20 bg-[#215ca5]/5 px-4 py-2 sm:px-5">
					<span className="w-1.5 h-1.5 rounded-full bg-[#215ca5]" />
					<span className="text-xs font-bold tracking-[0.18em] uppercase text-[#215ca5]">{data?.badge}</span>
				</div>
				<h2 className="mb-3 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">{data?.title}</h2>
				<p className="mx-auto max-w-3xl whitespace-pre-line text-sm leading-relaxed text-slate-500 sm:text-base md:text-lg">{data?.description}</p>
			</div>

			<div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} className="mx-auto max-w-7xl rounded-[2rem] px-2 py-2 sm:px-6 sm:py-6 lg:px-8">
				<div className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:gap-4">
					{/* Orbit Visualization */}
					<div className="flex w-full items-center justify-center lg:w-[52%]">
						<div className="relative flex flex-shrink-0 items-center justify-center" style={{ width: orbitSize, height: orbitSize }}>
							<div className="absolute rounded-full border border-slate-300/70 pointer-events-none" style={{ width: outerOrbitSize, height: outerOrbitSize }} />
							<div className="absolute rounded-full border border-dashed border-slate-400/70 pointer-events-none" style={{ width: innerOrbitSize, height: innerOrbitSize }} />

							{/* Central Hub */}
							<div className="absolute z-10 flex rounded-full border border-slate-100 bg-white p-3 text-center shadow-sm" style={{ width: hubSize, height: hubSize }}>
								<span className="m-auto text-[7px] font-black uppercase leading-relaxed tracking-[0.2em] text-slate-400 sm:text-[9px] sm:tracking-[0.3em]">
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
								const x = Math.cos(rad) * orbitRadius;
								const y = Math.sin(rad) * orbitRadius;
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
										{isActive && <div className="absolute rounded-full animate-orbit-pulse border border-[#215ca5] pointer-events-none" style={{ width: pulseSize, height: pulseSize }} />}
										<div
											className="flex items-center justify-center rounded-full border-2 border-white transition-all duration-500 shadow-md"
											style={{
												width: isActive ? activePlanetSize : inactivePlanetSize,
												height: isActive ? activePlanetSize : inactivePlanetSize,
												backgroundColor: isActive ? BRAND : "#e8eef7",
											}}
										>
											<Icon style={{ width: iconSize, height: iconSize, color: isActive ? "#fff" : "#5a7fac" }} />
										</div>
										<div
											className={clsx(
												"absolute rounded-full whitespace-nowrap transition-all duration-500",
												isCompactLayout
													? isActive
														? "border border-slate-100 bg-white px-2 py-0.5 shadow opacity-100 -bottom-6"
														: "px-2 py-0.5 opacity-70 -bottom-7"
													: isActive
														? "border border-slate-100 bg-white px-2.5 py-1 shadow opacity-100 -bottom-9 sm:px-3 sm:-bottom-10"
														: "px-2.5 py-1 opacity-60 -bottom-7 sm:px-3 sm:-bottom-8",
											)}
										>
											<span className="text-[8px] font-bold uppercase tracking-[0.12em] sm:text-[11px] sm:tracking-[0.18em]" style={{ color: isActive ? BRAND : "#64748b" }}>
												{item.title}
											</span>
										</div>
									</button>
								);
							})}
						</div>
					</div>

					{/* Content Panel */}
					<div className="w-full px-2 lg:w-[48%] lg:pl-6 lg:pr-0 xl:pl-10">
						<div key={activeIdx} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
							<div className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4">
								<div className="h-0.5 w-8 rounded-full bg-[#215ca5] sm:w-9" />
								<span className="text-xs font-bold uppercase tracking-[0.2em] text-[#215ca5]/50">Step 0{activeIdx + 1}</span>
							</div>

							<h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{activeItem.title}</h3>
							<p className="mb-3 whitespace-pre-line text-sm leading-relaxed text-slate-500 sm:text-base">{activeItem.description}</p>

							{/* Controls */}
							<div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
								<div className="flex items-center gap-2">
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

								<button onClick={() => setActiveIdx((activeIdx + 1) % steps.length)} className="group flex items-center gap-2 rounded-full px-1 py-1 focus:outline-none">
									<div className="flex h-9 w-9 items-center justify-center rounded-full text-[#215ca5] text-white transition-all duration-300 group-hover:scale-105">
										<ChevronRight className="text-[#215ca5]" size={20} />
									</div>
									<span className="text-xs font-bold uppercase tracking-[0.18em] text-[#215ca5]">Next</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
