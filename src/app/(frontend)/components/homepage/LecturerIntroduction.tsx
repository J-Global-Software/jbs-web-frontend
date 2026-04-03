"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { Link } from "@/i18n/navigation";

interface LecturerIntroProps {
	data?: any;
}

export default function LecturerIntroduction({ data }: LecturerIntroProps) {
	if (!data) return null;

	const { badge, title, lecturer, cta } = data;

	// Fallback image if CMS image is missing
	const lecturerImage = "/img/jon.avif";

	return (
		<section className="relative bg-blue-50/40 overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				{/* Header Section */}
				<div className="inline-flex items-center gap-2 px-5 py-2 mb-3 rounded-full border border-[#215ca5]/20 bg-[#215ca5]/5">
					<span className="w-1.5 h-1.5 rounded-full bg-[#215ca5]" />
					<span className="text-xs font-bold tracking-[0.18em] uppercase text-[#215ca5]">{badge || "Instructors"}</span>
				</div>
				<div className="mb-14">
					<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#285677] via-[#3a6b8f] to-[#5282a4]">{title}</h2>
				</div>

				{/* Card Layout */}
				<div className="bg-white rounded-3xl shadow-lg px-8 py-10 md:py-12 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-12">
					{/* Image - Blob UI preserved */}
					<div className="relative w-56 h-56 md:w-72 md:h-[400px] shrink-0">
						<div className="relative w-full h-full overflow-hidden border-4 border-white shadow ring-2 ring-[#5282a4]/40 organic-blob bg-[#285677]">
							<Image src={lecturerImage} alt={lecturer?.name || "Lecturer"} fill className="object-cover" />
						</div>

						{/* University Badge */}
						{(lecturer?.universityName || lecturer?.universityRole) && (
							<div className="absolute -bottom-4 -right-2 bg-white p-3 rounded-xl shadow-md border border-gray-100 flex items-center gap-2">
								<div>
									<p className="text-[14px] font-bold text-gray-900 leading-tight">{lecturer.universityName}</p>
									<p className="text-[14px] text-gray-500 uppercase">{lecturer.universityRole}</p>
								</div>
							</div>
						)}
					</div>

					{/* Content Section */}
					<div className="flex flex-col gap-4 text-gray-800 text-base w-full md:max-w-2xl">
						<div>
							<h3 className="text-2xl md:text-3xl text-center md:text-left font-bold text-[#285677] tracking-tight">{lecturer?.name}</h3>
							<p className="text-[#3a6b8f] font-semibold text-sm text-center md:text-left mt-1">{lecturer?.role}</p>
						</div>

						{/* Bio with line break support */}
						<p className="text-gray-600 leading-relaxed text-center md:text-left whitespace-pre-line">{lecturer?.bio}</p>

						{/* CTA Button */}
						<div className="pt-3 flex md:justify-start justify-center">
							<Link href="/free-coaching" className="bg-[#1f497c] hover:bg-[#2a5a8e] text-white text-md sm:text-lg font-medium px-6 py-3 rounded-xl transition shadow-sm hover:shadow-md flex items-center gap-2">
								{cta?.text}
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Blob Style Scoped to this component */}
			<style jsx>{`
				.organic-blob {
					border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
				}
			`}</style>
		</section>
	);
}
