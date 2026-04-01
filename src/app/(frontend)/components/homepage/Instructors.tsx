"use client";
import { useTranslations } from "next-intl";
import React from "react";

const Instructors = () => {
	const tHome = useTranslations("homepage.LecturerIntroduction");

	const instructors = [
		{
			name: "Dr. Sarah L. Birchley",
			role: tHome("roles.sarahBirchley"),
			image: "/img/instructors/sarah-birchley.jpg",
		},
		{
			name: "Nathan DeWitt",
			role: tHome("roles.nathanDeWitt"),
			image: "/img/instructors/nathan-dewitt.jpg",
		},
		{
			name: "Graham Lenz",
			role: tHome("roles.grahamLenz"),
			image: "/img/instructors/graham-lenz.avif",
		},
		{
			name: "Nana",
			role: tHome("roles.mizuhoShimada"),
			image: "/img/instructors/nana_hero.png",
		},
		{
			name: "Ikem Okoboshi",
			role: tHome("roles.ikemOkoboshi"),
			image: "/img/instructors/ikem-okoboshi.png",
		},
	];

	return (
		<section className="py-16 px-6 bg-white">
			<div className="max-w-7xl mx-auto text-center">
				<h2 className="text-3xl font-bold text-gray-800 mb-12">{tHome("otherLectures")}</h2>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-0 place-items-center">
					{instructors.map((instructor, index) => (
						<div key={index} className="flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:scale-105">
							<div className="w-24 h-24 lg:w-32 lg:h-32 mb-4 rounded-full overflow-hidden shadow-md ring-2 ring-gray-100">
								<img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover" />
							</div>
							<h3 className="text-sm font-semibold text-gray-800">{instructor.name}</h3>
							<p className="text-xs text-gray-600 mt-1">{instructor.role}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Instructors;
