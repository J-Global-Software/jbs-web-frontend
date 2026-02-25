"use client";

import Image from "next/image";
import { useState } from "react";
import { FaArrowRight, FaChevronDown, FaChevronUp, FaLayerGroup } from "react-icons/fa";
import { getProgramLink } from "@/utils/helpers";

interface WorkshopHeroProps {
	title: string;
	subtitle: string;
	image: string;
	code: string;
	levelLabel: string;
	registerNowLabel: string;
	readMoreLabel: string;
	readLessLabel: string;
	locale: string;
}

export default function WorkshopHero({ title, subtitle, image, code, levelLabel, registerNowLabel, readMoreLabel, readLessLabel, locale }: WorkshopHeroProps) {
	const [expanded, setExpanded] = useState(false);

	return (
		<section className="relative overflow-hidden bg-[#77acfb]">
			{/* --- Background Elements --- */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#4a88e6] via-[#77acfb] to-[#9dc5fc]"></div>
			<div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px] pointer-events-none mix-blend-overlay"></div>
			<div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[80px] pointer-events-none"></div>

			<div
				className="absolute inset-0 opacity-[0.1]"
				style={{
					backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
					backgroundSize: "40px 40px",
				}}
			></div>

			{/* --- Main Content --- */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
					{/* Left Column: Text */}
					<div className="space-y-6 text-center lg:text-left">
						<div className="space-y-3">
							<h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight drop-shadow-md">{title}</h1>

							<div className="text-base text-blue-50 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
								{subtitle && <div className={`relative transition-all duration-300 ${expanded ? "" : "line-clamp-2"}`}>{subtitle}</div>}
								{subtitle?.length > 120 && (
									<button className="mt-1 text-xs font-bold text-white hover:text-blue-100 flex items-center gap-1 mx-auto lg:mx-0 transition-colors" onClick={() => setExpanded(!expanded)}>
										{expanded ? (
											<>
												<FaChevronUp /> {readLessLabel}
											</>
										) : (
											<>
												<FaChevronDown /> {readMoreLabel}
											</>
										)}
									</button>
								)}
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1">
							<a href={getProgramLink(code, locale)} className="bg-[#d74100] hover:bg-[#ff5500] text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg">
								{registerNowLabel} <FaArrowRight />
							</a>
						</div>
					</div>

					{/* Right Column: Image with Overlapping Badge */}
					<div className="relative group max-w-2xl mx-auto lg:w-full">
						{/* Shadow/Glow Effect */}
						<div className="absolute inset-0 bg-white/20 rounded-[1.5rem] rotate-3 scale-95 blur-xl opacity-50"></div>

						<div className="relative rounded-[1.5rem] p-1.5 bg-white/10 border border-white/20 backdrop-blur-sm shadow-xl">
							{/* Image Container with shorter aspect ratio */}
							<div className="relative overflow-hidden rounded-[1.3rem] aspect-[4/3] lg:aspect-[16/10] w-full">
								<Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
								<div className="absolute inset-0 bg-gradient-to-t from-[#77acfb]/30 via-transparent to-transparent"></div>
							</div>

							{/* levelLabel - Original Design Overlap (Bottom Center) */}
							{levelLabel && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 whitespace-nowrap inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-white text-[#4a88e6] text-[14px] font-black tracking-widest uppercase shadow-xl transition-transform group-hover:scale-105">{levelLabel}</div>}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
