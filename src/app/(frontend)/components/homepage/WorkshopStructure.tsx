"use client";
import React, { useState } from "react";
import { Calendar, Clock, List, Award, CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

export default function WorkshopPage() {
	const t = useTranslations("homepage.structure");

	const [isOpen, setIsOpen] = useState(false);

	// Fetch steps from translation file
	const stepsData = [{ key: "steps.0.text" }, { key: "steps.1.text" }, { key: "steps.2.text" }, { key: "steps.3.text" }, { key: "steps.4.text" }];

	// Fetch features from translation file
	const featuresData = [
		{
			icon: Calendar,
			titleKey: "features.0.title",
			subKey: "features.0.sub",
		},
		{
			icon: Clock,
			titleKey: "features.1.title",
			subKey: "features.1.sub",
		},
		{
			icon: List,
			titleKey: "features.2.title",
			subKey: "features.2.sub",
		},
		{
			icon: Award,
			titleKey: "features.3.title",
			subKey: "features.3.sub",
		},
	];

	return (
		<section className={clsx("relative  border-t border-gray-300  overflow-hidden", isOpen ? "py-10" : "py-10")}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Collapsible Header */}
				<div className="flex justify-center items-center cursor-pointer px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors" onClick={() => setIsOpen(!isOpen)}>
					{/* Translated Header Title */}
					<h2 className="text-xl mr-4 md:text-4xl font-extrabold text-[#215ca5]">{t("header.title")}</h2>
					{/* Translated Plus/Minus Sign */}
					<span className={`text-3xl text-[#215ca5] transform transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>{t("header.plus_sign")}</span>
				</div>

				{/* Collapsible Content */}
				{isOpen && (
					<div className="space-y-16 mt-12">
						{/* Intro */}
						<div className="grid lg:grid-cols-2 gap-8 items-start">
							{/* Right Column */}
							<div className="bg-white backdrop-blur-xl rounded-3xl shadow-xl p-8 relative border border-blue-100 overflow-hidden">
								{/* Decorative orb */}
								<div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full blur-3xl opacity-60"></div>

								{/* Translated Online Workshop Title */}
								<h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight relative">{t("online_workshop.title")}</h2>

								{/* Features */}
								<div className="grid grid-cols-2 gap-4 mb-10 relative">
									{featuresData.map((item, i) => (
										<div key={i} className="group bg-gradient-to-br from-blue-50 to-white backdrop-blur-sm rounded-2xl p-4 border border-blue-100 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 hover:-translate-y-1">
											<div className="flex items-start gap-3">
												<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
													<item.icon className="w-5 h-5 text-white" />
												</div>

												<div>
													{/* Translated Feature Title */}
													<div className="text-gray-900 text-sm font-bold leading-tight mb-1">{t(item.titleKey)}</div>
													{/* Translated Feature Subtitle */}
													<div className="text-xs text-gray-600 leading-tight">{t(item.subKey)}</div>
												</div>
											</div>
										</div>
									))}
								</div>

								{/* Workshop Flow */}
								<div className="relative">
									<div className="flex items-center gap-3 mb-6">
										{/* Translated WORKSHOP FLOW Header */}
										<div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">{t("online_workshop.flow_header")}</div>
										<div className="h-px flex-1 bg-gradient-to-r from-blue-300 to-transparent"></div>
									</div>

									<div className="space-y-3 relative">
										{stepsData.map((step, index) => (
											<div
												key={index}
												className="flex items-center gap-4 group animate-slideIn"
												style={{
													paddingLeft: `${index * 16}px`,
													animationDelay: `${index * 100}ms`,
												}}
											>
												<div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 text-white text-sm font-bold flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-300/50 transition-all duration-300">{index + 1}</div>

												{/* Translated Step Text */}
												<div className="flex-1 bg-white border border-blue-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 shadow-md group-hover:border-blue-400 group-hover:shadow-xl group-hover:shadow-blue-200/50 transition-all duration-300">{t(step.key)}</div>

												<CheckCircle2 className="w-6 h-6 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
											</div>
										))}
									</div>
								</div>
							</div>
							{/* Left Column */}
							<div className="space-y-6 ">
								<h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
									{t("intro.title_1")}
									<span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">{t("intro.title_2_span")}</span>
								</h2>
								<p className="text-gray-700 text-lg leading-relaxed">
									{t("intro.p1_part1")}
									<span className="text-blue-500 font-semibold">{t("intro.p1_part2_bold")}</span>
									{t("intro.p1_part3")}
									<span className="text-blue-400 font-semibold">{t("intro.p1_part4_bold")}</span>
									{t("intro.p1_part5")}
								</p>
								<p className="text-gray-700 text-lg leading-relaxed">
									{t("intro.p2_part1")}
									<span className="text-blue-500 font-semibold">{t("intro.p2_part2_bold")}</span>
									{t("intro.p2_part3")}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>

			<style jsx>{`
				@keyframes slideIn {
					from {
						opacity: 0;
						transform: translateX(-10px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				.animate-slideIn {
					animation: slideIn 0.6s ease-out forwards;
					opacity: 0;
				}
			`}</style>
		</section>
	);
}
