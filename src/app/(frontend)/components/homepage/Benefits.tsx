"use client";

import React, { useState } from "react";
import { Calendar, RefreshCw, DollarSign, Award, Target } from "lucide-react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

export default function JBSWorkshopsBenefits() {
	const t = useTranslations("homepage.benefits");

	const [isOpen, setIsOpen] = useState(false);

	// Note: The 'label' is now 'labelKey' to fetch the translated string
	const benefits = [
		{ icon: Calendar, labelKey: "benefits_list.flexible", color: "from-blue-300 to-blue-400" },
		{ icon: RefreshCw, labelKey: "benefits_list.convenient", color: "from-blue-300 to-blue-400" },
		{ icon: DollarSign, labelKey: "benefits_list.affordable", color: "from-blue-300 to-blue-400" },
		{ icon: Award, labelKey: "benefits_list.certified", color: "from-blue-300 to-blue-400" },
		{ icon: Target, labelKey: "benefits_list.goal_oriented", color: "from-blue-300 to-blue-400" },
	];

	// List items for the left column, using translation keys
	const leftColumnItems = ["content.list_item_1", "content.list_item_2", "content.list_item_3", "content.list_item_4"];

	// Schedule data structure
	const scheduleRows = [
		{ periodKey: "schedule.period_morning", timeKey: "schedule.time_morning", monThu: 3, sat: 2 },
		{ periodKey: "schedule.period_afternoon", timeKey: "schedule.time_afternoon", monThu: 6, sat: 0 },
		{ periodKey: "schedule.period_evening", timeKey: "schedule.time_evening", monThu: 9, sat: 0 },
	];

	return (
		<section className={clsx("relative overflow-hidden", isOpen ? "py-10" : "py-10")}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Collapsible Header */}
				<div className="flex justify-center items-center cursor-pointer px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors" onClick={() => setIsOpen(!isOpen)}>
					{/* Translated Header Title */}
					<h2 className="text-xl text-center md:text-4xl mr-4 font-extrabold text-[#215ca5]">{t("header.title")}</h2>
					{/* Translated Plus/Minus Sign */}
					<span className={`text-3xl text-[#215ca5] transform transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>{t("header.plus_sign")}</span>
				</div>

				{/* Collapsible Content */}
				{isOpen && (
					<div className="space-y-16">
						{/* Intro */}
						<p className="text-gray-600 max-w-2xl mx-auto text-center mb-16">{t("intro.text")}</p>

						{/* Benefits Icons */}
						<div className="flex flex-wrap justify-center gap-8 mb-0">
							{benefits.map((benefit, i) => {
								const Icon = benefit.icon;
								return (
									<div key={i} className="group flex flex-col items-center text-center transition-transform hover:-translate-y-2">
										<div className={`md:w-24 md:h-24 h-12 w-12 mb-3 rounded-3xl flex items-center justify-center bg-gradient-to-br ${benefit.color} ring-4 ring-blue-50 shadow-lg transition-all group-hover:scale-110 group-hover:shadow-2xl`}>
											<Icon className="md:w-8 md:h-8 h-5 w-5 text-white" strokeWidth={2.5} />
										</div>
										{/* Translated Benefit Label */}
										<p className="md:w-35 md:h-35 h-20 w-20 font-semibold text-gray-900 text-sm md:text-base">{t(benefit.labelKey)}</p>
									</div>
								);
							})}
						</div>

						{/* Two Column Layout */}
						<div className="grid lg:grid-cols-2 gap-16 items-start">
							{/* Left Column */}
							<div className="space-y-8 px-6">
								{/* Translated Left Column Title */}
								<h3 className="text-2xl font-bold text-gray-800">{t("content.left_column_title")}</h3>
								<div className="space-y-4">
									{leftColumnItems.map((key, idx) => (
										<div key={idx} className="flex gap-4 items-start">
											<div className="shrink-0 w-3 h-3 mt-2 rounded-full bg-blue-400 mt-1"></div>
											{/* Translated List Item */}
											<p className="text-gray-600 text-lg leading-relaxed">{t(key)}</p>
										</div>
									))}
								</div>
							</div>

							{/* Right Column - Calendar */}
							<div className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-4xl shadow-lg">
								{/* Translated Class Schedule Title */}
								<h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t("schedule.class_schedule")}</h3>

								<div className="grid grid-cols-3 bg-blue-100 rounded-full text-center mb-4">
									<div className="py-4 font-bold text-gray-700"></div>
									{/* Translated Weekday headers */}
									<div className="py-4 font-bold text-gray-700">{t("schedule.mon_thu")}</div>
									<div className="py-4 font-bold text-gray-700">{t("schedule.saturday")}</div>
								</div>

								<div className="space-y-3">
									{scheduleRows.map((row, idx) => (
										<div key={idx} className="grid grid-cols-3 items-center bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
											<div className="p-4 font-semibold text-gray-900">
												{/* Translated Period (Morning/Afternoon/Evening) */}
												<div>{t(row.periodKey)}</div>
												{/* Translated Time */}
												<span className="text-xs text-gray-500">{t(row.timeKey)}</span>
											</div>
											<div className="p-4 flex flex-col items-center justify-center">
												{row.monThu > 0 ? <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center mb-1 text-white font-bold">{row.monThu}</div> : <span className="text-gray-400 text-xl">—</span>}
												{/* Translated "classes" or "No classes" */}
												<span className="text-xs text-gray-700">{row.monThu > 0 ? t("schedule.classes") : t("schedule.no_classes")}</span>
											</div>
											<div className="p-4 flex flex-col items-center justify-center">
												{row.sat > 0 ? <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center mb-1 text-white font-bold">{row.sat}</div> : <span className="text-gray-400 text-xl">—</span>}
												{/* Translated "classes" or "No classes" */}
												<span className="text-xs text-gray-700">{row.sat > 0 ? t("schedule.classes") : t("schedule.no_classes")}</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
