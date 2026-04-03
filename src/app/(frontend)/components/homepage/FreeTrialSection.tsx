// components/FreeTrialSection.tsx
"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { getLink } from "@/utils/helpers";

const FreeTrialSection = () => {
	const t = useTranslations("homepage"); // namespace
	const currentLocale = useLocale();

	return (
		<div className="mt-0 overflow-hidden">
			<div className="relative w-full py-10 px-4">
				{/* Background Image with opacity */}
				<div className="absolute inset-0 -z-10">
					<div className="w-full h-full bg-[#3276e3de] absolute inset-0 z-10" />
					<img src="/img/prova3.png" alt={t("FreeTrialSection.backgroundAlt")} className="w-full h-full object-cover opacity-20" />
				</div>

				<div className="max-w-2xl mx-auto relative z-20">
					{currentLocale === "ja" && (
						<div className="block md:flex justify-center gap-6 mb-6">
							<div className="flex items-center justify-center font-bold text-white text-2xl md:text-3xl mb-3 md:mb-0">{t("FreeTrialSection.feature1")}</div>
						</div>
					)}
					<div className="text-center">
						<Link href={getLink("freeTrial", currentLocale)} className="inline-block text-2xl text-white bg-[#d74100] font-bold py-4 px-13 rounded-full hover:bg-[#f7a520]/90 transition-colors">
							{t("FreeTrialSection.cta")}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FreeTrialSection;
