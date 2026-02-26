"use client";

import Image from "next/image";
import { useState } from "react";
import { FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getProgramLink, getProgramLinkRegister } from "@/utils/helpers";

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
			{/* Optimized Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#4a88e6] to-[#9dc5fc]"></div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 lg:pt-24 lg:pb-32">
				<div className="grid lg:grid-cols-2 gap-8 items-center">
					{/* Image Column - Now smaller on mobile */}
					<div className="relative order-1 lg:order-2 flex justify-center">
						<div className="relative w-[85%] lg:w-full max-w-[400px] lg:max-w-none">
							<div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white/30 bg-blue-100">
								{/* Adjusted aspect ratio to be shorter on mobile (3/2) */}
								<div className="relative aspect-[3/2] lg:aspect-[16/10] w-full">
									<Image src={image} alt={title} fill className="object-cover" priority sizes="(max-width: 768px) 85vw, 50vw" />
								</div>
							</div>

							{/* Level Badge - Slightly smaller text to match smaller image */}
							{levelLabel && <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap px-4 py-1.5 rounded-full bg-white text-[#4a88e6] text-[11px] font-black uppercase tracking-wider shadow-md border border-blue-50">{levelLabel}</div>}
						</div>
					</div>

					{/* Text Column */}
					<div className="space-y-5 text-center lg:text-left order-2 lg:order-1">
						<div className="space-y-3">
							<h1 className="text-2xl lg:text-5xl font-bold text-white leading-tight drop-shadow-sm px-2 lg:px-0">
								{title} ({code})
							</h1>
							{subtitle && (
								<div className="text-sm lg:text-base text-blue-50 font-medium px-4 lg:px-0">
									<div className={expanded ? "" : "line-clamp-2"}>{subtitle}</div>
									{subtitle.length > 100 && (
										<button className="mt-2 text-[11px] font-bold text-white underline flex items-center gap-1 mx-auto lg:mx-0 opacity-80" onClick={() => setExpanded(!expanded)}>
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
							)}
						</div>
						<div className="flex justify-center lg:justify-start pt-2">
							<a href={getProgramLinkRegister(code, locale)} className="bg-[#d74100] md:text-xl text-white px-7 py-2.5 rounded-full font-bold shadow-lg flex items-center gap-2 text-base active:scale-95 transition-transform">
								{registerNowLabel} <FaArrowRight className="text-sm" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
