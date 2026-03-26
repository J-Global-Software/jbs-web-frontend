"use client";

import { useState } from "react";
import { FaChevronDown, FaClock, FaCalendarAlt, FaStream } from "react-icons/fa";

export type WorkshopSession = {
	title: string;
	content: string[];
	dates: { id: string; date: string; startTime: string, endTime:string, zoomLink:string, eventId: string }[];
};

interface WorkshopSessionsProps {
	sessions: WorkshopSession[];
	locale: string;
	translations: Record<string, string>; // Replaces the specific object list
}

export default function WorkshopSessions({ sessions, locale, translations }: WorkshopSessionsProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleAccordion = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const processContent = (rawContent: string[]) => {
		if (!rawContent) return [];
		return rawContent.flatMap((line) => {
			if (line.length < 20 || !/\d+\./.test(line)) return [line];
			const parts = line
				.split(/(?=\b\d+[\.\)]\s)/)
				.map((p) => p.trim())
				.filter(Boolean);
			return parts.map((p) => p.replace(/^,\s*/, "").replace(/,\s*$/, ""));
		});
	};

	return (
		<div className="space-y-6">
			{sessions.map((session, i) => {
				const isOpen = openIndex === i;
				const processedContent = processContent(session.content);

				return (
					<div
						id={`workshop-accordion-${i}`}
						key={`session-${i}`}
						className={`
                            group rounded-2xl overflow-hidden 
                            border transition-all duration-300 ease-out
                            ${isOpen ? "bg-white border-blue-200 shadow-xl shadow-blue-900/5 ring-1 ring-blue-100" : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-md"}
                        `}
					>
						{/* Header / Trigger */}
						<button onClick={() => toggleAccordion(i)} aria-expanded={isOpen} aria-controls={`workshop-content-${i}`} className="w-full text-left focus:outline-none">
							<div className="p-6 md:p-8 flex items-start gap-6 md:gap-8">
								{/* Number Badge */}
								<div
									className={`
                                    hidden md:flex flex-col items-center justify-center shrink-0 w-16 h-16 rounded-2xl 
                                    transition-colors duration-300
                                    ${isOpen ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500"}
                                `}
								>
									<span className="text-2xl font-bold leading-none">{String(i + 1).padStart(2, "0")}</span>
								</div>

								{/* Title Area */}
								<div className="flex-1 min-w-0 pt-1">
									<div className="md:hidden text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">
										{translations.workshop} {String(i + 1).padStart(2, "0")}
									</div>
									<h3
										className={`
                                        text-xl md:text-2xl font-bold leading-tight transition-colors duration-300
                                        ${isOpen ? "text-slate-900" : "text-slate-700 group-hover:text-blue-700"}
                                    `}
									>
										{session.title}
									</h3>
									{!isOpen && <p className="mt-2 text-sm text-slate-500 line-clamp-1">{translations.readMore || "View details..."}</p>}
								</div>

								<div
									className={`
                                    w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300
                                    ${isOpen ? "bg-slate-100 border-slate-200 rotate-180 text-slate-900" : "bg-transparent border-slate-100 text-slate-400 group-hover:border-blue-200 group-hover:text-blue-500"}
                                `}
								>
									<FaChevronDown className="w-3.5 h-3.5" />
								</div>
							</div>
						</button>

						{/* Expandable Content */}
						<div
							id={`workshop-content-${i}`}
							className={`
                                overflow-hidden transition-all duration-500 ease-in-out
                                ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}
                            `}
						>
							<div className="px-6 md:px-8 pb-8 md:pl-[7.5rem]">
								<div className="pt-6 border-t border-slate-100 space-y-10">
									{/* --- AGENDA TIMELINE --- */}
									<div>
										<h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">
											<FaStream className="text-blue-500" />
											{translations.whatYouWillLearn}
										</h4>

										<div className="relative border-l-2 border-slate-100 ml-3 space-y-0">
											{processedContent.map((line, j) => {
												const listMatch = line.match(/^(\d+)[.)]\s*/) || line.match(/^[•●・\-\*]\s*/);
												const isListItem = !!listMatch;
												const itemNumber = listMatch && listMatch[1] ? listMatch[1] : null;

												let cleanText = line
													.replace(/^[•●・\-\*]+/, "")
													.replace(/^\d+[.)]\s*/, "")
													.trim();
												if (!cleanText) return null;

												const timeMatch = cleanText.match(/(?:[-–—]\s*)(\d+\s*(?:minutes?|mins?|min|分).*?)$/i);
												const time = timeMatch ? timeMatch[1] : null;

												if (time) {
													cleanText = cleanText.replace(/(?:[-–—]\s*)\d+\s*(?:minutes?|mins?|min|分).*?$/i, "").trim();
												}

												return (
													<div key={`content-${i}-${j}`} className="relative pl-8 pb-6 last:pb-0">
														<div
															className={`
                                                            absolute -left-[10px] top-1.5 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center z-10
                                                            ${isListItem ? (itemNumber ? "bg-blue-100 ring-1 ring-blue-50" : "bg-slate-200") : "bg-blue-500/20"}
                                                        `}
														>
															{itemNumber ? <span className="text-[9px] font-bold text-blue-600">{itemNumber}</span> : <div className={`rounded-full ${isListItem ? "w-1.5 h-1.5 bg-slate-400" : "w-2 h-2 bg-blue-500"}`}></div>}
														</div>

														<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
															<span className={`text-slate-700 leading-relaxed ${isListItem ? "text-[15px] font-medium" : "text-base font-bold text-slate-900"}`}>{cleanText}</span>
															{time && (
																<span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-semibold text-slate-500 whitespace-nowrap">
																	<FaClock className="text-slate-300" />
																	{time}
																</span>
															)}
														</div>
													</div>
												);
											})}
										</div>
									</div>

									{/* --- DATES SECTION --- */}
									<div>
										<h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
											<FaCalendarAlt className="text-teal-500" />
											{translations.availableDates}
										</h4>
										<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
											{session.dates.map((d, j) => {
												const parsedDate = new Date(`${d.date} ${d.startTime}`);
												const monthKey = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][parsedDate.getMonth()] as keyof typeof translations;

												const month = translations[monthKey];
												const dayNum = parsedDate.getDate();
												const dayDisplay = locale === "ja" ? `${dayNum}日` : dayNum;

												let hours = parsedDate.getHours();
												const minutes = parsedDate.getMinutes().toString().padStart(2, "0");
												const ampm = locale === "en" ? (hours >= 12 ? "PM" : "AM") : "";
												if (locale === "en") hours = hours % 12 || 12;

												return (
													<div key={d.id || `date-${i}-${j}`} className="relative flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:bg-blue-50/10 transition-all duration-200">
														<div className="shrink-0 flex flex-col items-center justify-center w-10 h-10 bg-slate-50 rounded-lg border border-slate-100 text-slate-600 font-bold">
															<span className="text-[9px] uppercase leading-none mb-0.5">{month}</span>
															<span className="text-base leading-none">{dayNum}</span>
														</div>
														<div className="flex-1 min-w-0">
															<div className="text-sm font-bold text-slate-900 truncate">{locale === "ja" ? `${month}${dayDisplay}` : `${month} ${dayDisplay}`}</div>
															<div className="text-xs text-slate-500">
																{hours}:{minutes} {ampm}
															</div>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
