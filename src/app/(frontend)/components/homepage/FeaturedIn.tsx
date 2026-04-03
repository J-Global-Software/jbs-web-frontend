"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";

interface PressProps {
	data?: any;
}

export default function PressSection({ data }: PressProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!data || !mounted) return <section className="bg-gray-50 py-20" />;

	const { badge, title, publications } = data;

	// Parser options for the title
	const options: HTMLReactParserOptions = {
		replace: (domNode: any) => {
			if (domNode.type === "tag" && domNode.name === "blue") {
				return <span className="text-[#285677]">{domToReact(domNode.children, options)}</span>;
			}
		},
	};

	return (
		<section className="bg-gray-50 py-20 px-6">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-12">
					<span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-4">• {badge}</span>
					<h2 className="text-4xl md:text-3xl font-bold text-gray-900 leading-tight">{parse(title, options)}</h2>
				</div>

				{/* Grid Layout */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{publications?.map((item: any, idx: number) => (
						<div key={idx} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
							{/* Publication Name */}
							<h3 className="text-2xl font-bold text-gray-800 mb-4">{item.name}</h3>

							{/* Description */}
							<div className="text-gray-600 leading-relaxed mb-8 flex-grow whitespace-pre-line">{item.description}</div>

							{/* Articles List */}
							<ul className="flex flex-col gap-4">
								{item.articles?.map((article: any, aIdx: number) => (
									<li key={aIdx}>
										<Link href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium transition flex items-center gap-1">
											{article.title} →
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
