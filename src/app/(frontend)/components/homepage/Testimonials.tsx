"use client";

import { useState, useEffect } from "react";
import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";

interface TestimonialsProps {
	data?: any;
}

export default function SingleRowTestimonials({ data }: TestimonialsProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Skeleton/Fallback during hydration
	if (!mounted || !data) return <section className="py-16 bg-white min-h-[400px]" />;

	const { badge, title, items } = data;

	const options: HTMLReactParserOptions = {
		replace: (domNode: any) => {
			if (domNode.type === "tag" && domNode.name === "accent") {
				return <span className="text-[#285677] font-bold">{domToReact(domNode.children, options)}</span>;
			}
		},
	};

	return (
		<section className="bg-white py-12 px-6" id="testimonials">
			<div className="max-w-7xl mx-auto">
				{/* Header Row */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
					<div className="max-w-xl">
						<div className="flex items-center gap-2 mb-2">
							<span className="w-1.5 h-1.5 rounded-full bg-[#285677]" />
							<span className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-400">{badge}</span>
						</div>
						<h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{parse(title || "", options)}</h2>
					</div>
				</div>

				{/* The Single Row Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
					{items?.map((item: any, idx: number) => (
						<div key={idx} className="group flex flex-col justify-between p-6 rounded-2xl border border-gray-100 bg-[#fafafa] hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
							<div>
								{/* Stars & Indicator */}
								<div className="flex justify-between items-center mb-4">
									<div className="flex gap-0.5 text-[#285677] text-[10px]">
										{[...Array(item.stars || 5)].map((_, i) => (
											<span key={i}>★</span>
										))}
									</div>
									<div className="h-px flex-grow mx-4 bg-gray-200 group-hover:bg-[#285677]/20 transition-colors" />
								</div>

								{/* Quote */}
								<p className="text-gray-600 text-sm leading-relaxed italic mb-6 whitespace-pre-line">&ldquo;{item.quote}&rdquo;</p>
							</div>

							{/* Author */}
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 rounded-lg bg-[#285677] text-white flex items-center justify-center font-bold text-[10px] shrink-0 transform group-hover:rotate-6 transition-transform">{item.initial}</div>
								<div className="overflow-hidden">
									<div className="font-bold text-gray-900 text-xs truncate">{item.authorName}</div>
									<div className="text-[10px] text-gray-400 truncate uppercase tracking-tighter">{item.authorRole}</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
