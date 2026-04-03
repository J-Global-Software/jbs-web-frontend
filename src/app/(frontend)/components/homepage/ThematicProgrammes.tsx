// components/ThematicProgrammes.tsx
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const ThematicProgrammes = () => {
	const tHome = useTranslations("homepage");
	const locale = useLocale();
	const imagePath = `/img/minimba_${locale}.png`;

	return (
		<section>
			<div className=" relative z-10  mx-auto  sm:px-6 lg:px-8  text-center mb-20">
				<h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-5">
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#285677] via-[#3a6b8f] to-[#5282a4] relative z-10">{tHome("thematicProgrammes")}</span>
				</h1>
				<div className="mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"></div>
			</div>

			<div className="max-w-6xl mx-auto px-4 ">
				<h3 className="text-center font-bold mb-5 text-gray-900 text-2xl md:text-3xl lg:text-3xl">{tHome("miniMBA")}</h3>
				<p className="text-xl md:text-xl text-center text-gray-600 leading-relaxed max-w-3xl mx-auto relative">
					{tHome("miniMBADescription")}
					<span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
				</p>
				<h3 className="text-center font-bold  mt-15 text-[#285677] text-xl md:text-2xl lg:text-2xl">{tHome("sixWaysLearning")}</h3>

				<Image src={imagePath} alt="Thematic Programmes" className="w-full h-auto mb-8" width={1200} height={600} />

				<p className="text-xl md:text-xl text-center text-gray-600 leading-relaxed max-w-3xl mx-auto relative">
					{tHome("miniMBAAddition")}
					<span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
				</p>

				<div className="text-center my-10">
					<Link href="/regihester" className="inline-block px-5 py-2.5 rounded-full bg-[#f7a520] text-white text-lg font-bold hover:bg-[#f7a520] transition shadow-sm hover:shadow-md">
						{tHome("learnMore")}
					</Link>
				</div>
			</div>
		</section>
	);
};

export default ThematicProgrammes;
