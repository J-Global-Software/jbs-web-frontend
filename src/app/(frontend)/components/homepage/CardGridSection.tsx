"use client";

import Image from "next/image";
import React from "react";
import clsx from "clsx";
import { Link } from "@/i18n/navigation";

export type StatsItem = { icon: React.ReactNode; label: string };

export type Card = {
	id: string;
	title: string;
	image: string;
	link: string;
};

export type CardGridData = {
	level: string;
	title: string;
	description: string;
	stats?: StatsItem[];
	cards: Card[];
	align?: "left" | "center" | "right";
};

export default function CardGridSection({ level, title, description, stats, align = "center", cards }: CardGridData) {
	return (
		<div className="relative overflow-hidden py-6">
			{/* Content Box */}
			<div
				className={clsx("relative z-10 max-w-7xl bg-white/80 p-6 rounded-4xl shadow-lg", {
					"ml-0 mr-auto": align === "left",
					"mx-auto": align === "center",
					"ml-auto mr-0": align === "right",
				})}
			>
				<div className="absolute inset-0 bg-[url('/img/topography.svg')] bg-cover bg-center opacity-2"></div>

				{/* Header */}
				<section
					className={clsx("mb-10 flex flex-col md:px-5", {
						"md:items-start": align === "left" || align === "right",
						"md:items-center": align === "center",
					})}
				>
					<span className="inline-block px-3 max-w-max py-1 mb-3 text-sm font-bold text-white rounded-full bg-[#215ca5]">{level}</span>
					<h2 className="text-3xl md:text-4xl  font-extrabold text-[#215ca5] mb-4 flex  gap-2">{title}</h2>
					<p
						className={clsx("text-gray-500 text-left text-lg max-w-4xl leading-relaxed", {
							"md:text-left": align === "right" || align === "left",
							"md:mx-auto": align === "center",
						})}
					>
						{description}
					</p>

					{/* --- Stats Badges --- */}
					{stats && stats.length > 0 && (
						<div
							className={clsx("flex flex-wrap gap-3 mt-6", {
								"justify-center": align === "center",
								"justify-start": align === "left" || align === "right",
							})}
						>
							{stats.map((item, index) => (
								<div key={index} className="flex items-center gap-2 px-4 py-2 bg-[#1d6ed0]/10 text-[#1862bc] rounded-full text-sm font-medium hover:bg-[#215ca5]/20 transition">
									{item.icon && <span className="text-[#1862bc]">{item.icon}</span>}
									<span>{item.label}</span>
								</div>
							))}
						</div>
					)}
				</section>

				{/* Cards Grid */}
				<section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:p-5 rounded-3xl">
					{cards.map((card) => (
						<Link key={card.id} href={card.link} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col" style={{ boxShadow: "0 0 10px rgba(31, 73, 124, 0.1)" }}>
							<div className="relative aspect-[4/3] w-full h-full shadow-2xl">
								<Image src={card.image} alt={card.title} fill className="object-cover transition-transform duration-300" />
								<h3 className="absolute bottom-0 left-0 right-0 text-center text-md font-semibold text-white bg-gradient-to-t from-blue-900/80 to-transparent px-3 py-1 rounded-md shadow-sm">{card.title}</h3>
							</div>
						</Link>
					))}
				</section>
			</div>
		</div>
	);
}
