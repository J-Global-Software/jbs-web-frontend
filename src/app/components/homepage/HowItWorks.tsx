"use client";

import React, { useState, useEffect } from "react";
import { Users, MonitorPlay, Compass, MessagesSquare, ChevronRight } from "lucide-react";

const cycleData = [
	{
		id: "workshops",
		num: 1,
		title: "Workshops",
		subtitle: "Skills",
		desc: "Live bilingual sessions build practical intercultural and leadership skills. 175+ workshops across four levels with business games.",
		icon: Users,
		solid: "bg-emerald-500",
		color: "text-emerald-500",
		bg: "bg-emerald-50",
		ring: "ring-emerald-100",
		angle: 270,
	},
	{
		id: "elearning",
		num: 2,
		title: "E-Learning",
		subtitle: "Personalized",
		desc: "Self-paced modules and AI-assisted practice that complement your live workshops — available 24/7 in English and Japanese.",
		icon: MonitorPlay,
		solid: "bg-blue-500",
		color: "text-blue-500",
		bg: "bg-blue-50",
		ring: "ring-blue-100",
		angle: 0,
	},
	{
		id: "coaching",
		num: 3,
		title: "Coaching",
		subtitle: "Guidance",
		desc: "1-on-1 sessions to map your learning path, work through real challenges, and accelerate progress with the instructor team.",
		icon: Compass,
		solid: "bg-purple-500",
		color: "text-purple-500",
		bg: "bg-purple-50",
		ring: "ring-purple-100",
		angle: 90,
	},
	{
		id: "forums",
		num: 4,
		title: "Forums",
		subtitle: "Community",
		desc: "A members-only bilingual community to share experiences, discuss workshops, and build your professional network.",
		icon: MessagesSquare,
		solid: "bg-rose-500",
		color: "text-rose-500",
		bg: "bg-rose-50",
		ring: "ring-rose-200",
		angle: 180,
	},
];

const ORBIT_RADIUS = 180;

export default function GrandPlanetaryCycle() {
	const [activeIdx, setActiveIdx] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const activeItem = cycleData[activeIdx];

	useEffect(() => {
		if (isPaused) return;
		const interval = setInterval(() => {
			setActiveIdx((prev) => (prev + 1) % cycleData.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [isPaused, activeIdx]);

	return (
		<section className="bg-white py-20 px-6 overflow-hidden">
			<style jsx>{`
				@keyframes orbit-pulse {
					0% {
						transform: scale(1);
						opacity: 0.6;
						stroke-width: 1;
					}
					100% {
						transform: scale(1.8);
						opacity: 0;
						stroke-width: 4;
					}
				}
				.animate-orbit-pulse {
					animation: orbit-pulse 3s cubic-bezier(0, 0, 0.2, 1) infinite;
				}
				@keyframes float {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-10px);
					}
				}
				.animate-float {
					animation: float 4s ease-in-out infinite;
				}
			`}</style>

			{/* ── HEADER SECTION ── */}
			<div className="max-w-7xl mx-auto mb-5 text-center">
				<span className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-widest uppercase rounded-full bg-blue-50 text-blue-600">How It Works</span>
				<h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-8">
					The Continuous <span className="text-blue-500">Learning Cycle</span>
				</h2>
				<p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">Four integrated components that reinforce each other — skills build through workshops, deepen through e-learning, accelerate through coaching, and embed through community.</p>
			</div>

			<div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} className="max-w-7xl mx-auto rounded-[4rem] bg-slate-50/40 p-12 lg:p-10 transition-all duration-700">
				<div className="flex flex-col lg:flex-row items-center w-full">
					{/* ── EXPANDED ORBIT SYSTEM (52% Width) ── */}
					<div className="w-full lg:w-[52%] flex justify-center items-center py-10 lg:py-0">
						{/* Removed radial gradient, replaced with clean flat semi-transparent white circle */}
						<div className="relative flex-shrink-0 flex items-center justify-center bg-white/40 rounded-full" style={{ width: 500, height: 500 }}>
							{/* Outer Decorative Track */}
							<div className="absolute border border-slate-200/60 rounded-full pointer-events-none" style={{ width: ORBIT_RADIUS * 2.5, height: ORBIT_RADIUS * 2.5 }} />

							{/* Major Orbital Track */}
							<div className="absolute border-3 border-slate-300/50 rounded-full border-dashed pointer-events-none" style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2 }} />

							{/* Inner Decorative Track */}
							<div className="absolute border border-slate-200/60 rounded-full pointer-events-none" style={{ width: ORBIT_RADIUS * 1.4, height: ORBIT_RADIUS * 1.4 }} />

							{/* Central Hub */}
							<div className="absolute bg-white rounded-full shadow-xl shadow-slate-100/50 flex flex-col items-center justify-center text-center p-6 border border-slate-100 group transition-all duration-700 z-15" style={{ width: 150, height: 150 }}>
								<span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 group-hover:text-slate-600 transition-colors">CONTINUOUS LEARNING CYCLE</span>
							</div>

							{/* Planets */}
							{cycleData.map((item, idx) => {
								const rad = (item.angle * Math.PI) / 180;
								const x = Math.cos(rad) * ORBIT_RADIUS;
								const y = Math.sin(rad) * ORBIT_RADIUS;

								const isActive = activeIdx === idx;
								const Icon = item.icon;

								return (
									<button
										key={item.id}
										onClick={() => setActiveIdx(idx)}
										style={{
											position: "absolute",
											left: "50%",
											top: "50%",
											transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
											zIndex: isActive ? 40 : 20,
										}}
										className="group focus:outline-none flex flex-col items-center transition-all duration-1000"
									>
										{/* Pulse Effect */}
										{isActive && <div className={`absolute w-15 h-15 rounded-full animate-orbit-pulse border-2 border-current ${item.color} pointer-events-none`} />}

										{/* Planet Icon - Swapped gradient for solid color */}
										<div className={["flex items-center justify-center rounded-full shadow-lg border-2 border-white relative transition-all duration-700", isActive ? `w-15 h-15 ring-[14px] ${item.ring} scale-110 shadow-xl ${item.solid}` : `w-20 h-20 opacity-80 scale-100 hover:opacity-100 hover:scale-105 ${item.bg}`, "cursor-pointer active:scale-95"].join(" ")}>
											<Icon className={["transition-all duration-700", isActive ? "w-6 h-6 text-white " : `w-7 h-7 ${item.color}`].join(" ")} />
										</div>

										{/* Title Label */}
										<div className={["absolute -bottom-8 px-5 py-2 rounded-full transition-all duration-700 whitespace-nowrap", isActive ? "bg-white shadow-lg -bottom-14 border border-slate-100 opacity-100 translate-y-0 scale-110" : "bg-transparent opacity-70 translate-y-2 scale-100 group-hover:opacity-100 group-hover:translate-y-1"].join(" ")}>
											<span className={`text-[13px] font-black tracking-wider uppercase ${isActive ? item.color : "text-slate-500"}`}>{item.title}</span>
										</div>
									</button>
								);
							})}
						</div>
					</div>

					{/* ── CONTENT PANEL (48% Width) ── */}
					<div className="w-full lg:w-[48%] lg:pl-10 xl:pl-16 mt-12 lg:mt-0">
						<div key={activeItem.id} className="animate-in fade-in slide-in-from-bottom-4 lg:slide-in-from-right-8 duration-700 ease-out fill-mode-both">
							{/* Step Indicator - Swapped gradient for solid */}
							<div className="flex items-center gap-4 mb-6">
								<div className={`w-10 h-1.5 rounded-full ${activeItem.solid}`} />
								<span className={`text-sm font-bold uppercase tracking-[0.2em] ${activeItem.color}`}>Step 0{activeItem.num}</span>
							</div>

							{/* Title & Subtitle */}
							<h3 className="text-4xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tight">{activeItem.title}</h3>

							{/* Description (min-height prevents layout jumping) */}
							<p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-10 min-h-[120px]">{activeItem.desc}</p>

							{/* Interactive Controls */}
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-8 border-t border-slate-200/60">
								{/* Next Button - Swapped gradient for solid */}
								<button onClick={() => setActiveIdx((activeIdx + 1) % cycleData.length)} className="flex items-center gap-4 group focus:outline-none">
									<div className={`flex items-center justify-center w-12 h-12 rounded-full text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${activeItem.solid}`}>
										<ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
									</div>
									<span className="text-slate-900 font-bold uppercase tracking-widest text-sm group-hover:text-slate-600 transition-colors">Next</span>
								</button>

								{/* Progress Track - Swapped gradient for solid */}
								<div className="flex gap-2">
									{cycleData.map((_, idx) => (
										<button key={idx} onClick={() => setActiveIdx(idx)} aria-label={`Go to step ${idx + 1}`} className={`h-2.5 rounded-full transition-all duration-500 focus:outline-none ${activeIdx === idx ? `w-12 ${activeItem.solid} shadow-sm` : "w-3 bg-slate-200 hover:bg-slate-300"}`} />
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
