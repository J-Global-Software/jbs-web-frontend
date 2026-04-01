"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function LecturerIntroduction() {
	const tHome = useTranslations("homepage.LecturerIntroduction");

	return (
		<section className="relative bg-blue-50/40 overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-14" data-aos="fade-up">
					<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#285677] via-[#3a6b8f] to-[#5282a4]">{tHome("lecturerIntroduction")}</h2>
				</div>

				{/* Card Layout */}
				<div className="bg-white rounded-3xl shadow-lg px-8 py-10 md:py-12 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-12" data-aos="fade-up" data-aos-delay="100">
					{/* Image */}
					<div className="relative w-56 h-56 md:w-72 md:h-[400px] shrink-0">
						<div className="relative w-full h-full overflow-hidden border-4 border-white shadow ring-2 ring-[#5282a4]/40 organic-blob bg-[#285677]">
							<Image src="/img/jon.avif" alt="Jon Lynch, Lecturer" fill className="object-cover" />
						</div>
					</div>

					{/* Content */}
					<div className="flex flex-col gap-5 text-gray-800 text-base w-full md:max-w-2xl">
						{/* Name */}
						<h3 className="text-2xl md:text-3xl text-center md:text-left font-bold text-[#285677] tracking-tight">{tHome("name")}</h3>

						{/* Bio */}
						<p className="text-gray-600 leading-relaxed text-center md:text-left">{tHome("description")}</p>

						{/* Button */}
						<div className="pt-3 flex md:justify-start justify-center">
							<Link href="free-coaching/" className="bg-[#1f497c] hover:bg-[#2a5a8e] text-white text-md sm:text-lg font-medium px-6 py-3 rounded-xl transition shadow-sm hover:shadow-md">
								{tHome("bookCoaching")}
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Blob Shape Style */}
			<style jsx>{`
				.organic-blob {
					border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
				}
			`}</style>
		</section>
	);
}
