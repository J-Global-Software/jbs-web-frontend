"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "@/i18n/navigation"; // keep if using i18n links
import LanguageSwitcher from "../LanguageSwitcher";

export interface Program {
	id: string;
	title: string;
	image: string;
	shortDescription: string;
	url: string; // link to the program detail page
}

interface ProgramsListProps {
	programs: Program[];
	title: string;
}

export default function ProgramsList({ programs, title }: ProgramsListProps) {
	return (
		<section className="max-w-7xl mx-auto px-6 py-20">
			{/* Navbar */}
			<header className="fixed top-0 left-0 right-0 z-50 mx-auto flex w-full items-center justify-between px-6 py-2 transition-colors duration-300 bg-white shadow-md">
				<div className="max-w-7xl flex w-full items-center justify-between mx-auto">
					<Link href="/" className="flex items-center">
						<Image src="/logo.avif" alt="Prebuilt UI Logo" width={120} height={40} className="h-auto w-24 sm:w-32 md:w-32 object-contain" priority />
					</Link>
					<div className="flex items-center space-x-4">
						<LanguageSwitcher />
					</div>
				</div>
			</header>
			<h2 className="text-4xl font-bold text-gray-900 mb-12 mt-12 text-center">{title} </h2>
			<div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
				{programs.map((program) => (
					<div key={program.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
						<div className="relative h-48 w-full">
							<Image src={program.image} alt={program.title} fill className="object-cover" />
						</div>
						<div className="p-6 flex flex-col gap-4">
							<h3 className="text-2xl font-semibold text-gray-900">{program.title}</h3>
							<p className="text-gray-700 line-clamp-3">{program.shortDescription}</p>
							<Link href={program.url} className="mt-auto inline-flex items-center gap-2 text-[#d74100] font-medium hover:underline">
								View Details <FaArrowRight />
							</Link>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
