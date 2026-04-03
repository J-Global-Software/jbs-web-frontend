"use client";

import React, { useState, useEffect } from "react";

interface InstructorsProps {
	data?: {
		title?: string;
		team?: {
			name: string;
			role: string;
			staticImageKey: string;
		}[];
	};
}

const Instructors = ({ data }: InstructorsProps) => {
	// FIX: Prevent Hydration Error by waiting for mount
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const sectionTitle = data?.title;
	const teamMembers = data?.team || [];

	// If not mounted, return a "skeleton" or empty container to match server HTML
	if (!mounted) {
		return <section className="py-16 px-6 bg-white min-h-[400px]" />;
	}

	return (
		<section className="py-16 px-6 bg-white">
			<div className="max-w-7xl mx-auto text-center">
				<h2 className="text-3xl font-bold text-gray-800 mb-12">{sectionTitle}</h2>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-0 place-items-center">
					{teamMembers.map((instructor, index) => (
						<div key={`instructor-${index}`} className="flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:scale-105">
							<div className="w-24 h-24 lg:w-32 lg:h-32 mb-4 rounded-full overflow-hidden shadow-md ring-2 ring-gray-100">
								<img src={`/img/instructors/${instructor.staticImageKey}`} alt={instructor.name} className="w-full h-full object-cover" />
							</div>
							<h3 className="text-sm font-semibold text-gray-800">{instructor.name}</h3>
							{/* Changed to div to avoid nesting p within p if CMS content is complex */}
							<div className="text-xs text-gray-600 mt-1 max-w-[150px]">{instructor.role}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Instructors;
