import { useTranslations } from "next-intl";
import Image from "next/image";

export default function JGlobalAchievements() {
	const tHome = useTranslations("homepage");

	return (
		<div>
			<section className="relative overflow-hidden  py-5">
				{/* Background image layer */}

				<div className="absolute inset-0 z-0 mix-blend-multiply" />

				{/* Content */}
				<div className="relative z-10 max-w-7xl mx-auto px-6">
					{/* Hero Section */}
					<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-15 pt-5 text-center">
						<div className="relative inline-block" data-aos="fade-up" data-aos-duration="600">
							<h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-10">
								<span className="bg-clip-text text-[#215ca5] relative z-10"> {tHome("achievements")}</span>
							</h2>
						</div>
						<p className="text-xl md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto relative" data-aos="fade-up" data-aos-delay="200" data-aos-duration="600">
							{tHome("achievementsDescription")}
						</p>
					</section>

					{/* Grid Layout */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pb-5">
						{/* Image */}
						<div className="overflow-hidden rounded-3xl shadow-lg" data-aos="fade-right" data-aos-delay="200" data-aos-duration="600">
							<Image src="/img/people.avif" alt="Workshop team celebrating" width={600} height={400} className="w-full h-full object-cover" />
						</div>

						{/* Text Box */}
						<div className="md:p-10 md:bg-white/70 rounded-3xl" data-aos="fade-left" data-aos-delay="200" data-aos-duration="600">
							<p className="text-gray-700 text-lg leading-relaxed mb-6">{tHome("achievementsSection1")}</p>
							<p className="text-gray-700 text-lg leading-relaxed mb-6">{tHome("achievementsSection2")}</p>
							<p className="text-gray-700 text-lg leading-relaxed">{tHome("achievementsSection3")}</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
