"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { getLink } from "@/lib/links";
import { useLocale } from "next-intl";
import Link from "next/link";
import clsx from "clsx";
import { Linden_Hill } from "next/font/google";


// 1. Define the specific shape of the price data
type PlanCycle = "monthly" | "biannual" | "annual";

interface PricingTier {
	price: string;
	total: string;
	perks: string[];
	link: string;
}

interface Plan {
	name: string;
	features: string;
	accent: string;
	featured?: boolean;
	// This ensures we can access plan[cycle] safely
	monthly: PricingTier;
	biannual: PricingTier;
	annual: PricingTier;
}

// Helper type to allow indexing by the cycle string
type PricingData = Record<PlanCycle, PricingTier> & Plan;

export default function PricingSection() {
	const t = useTranslations("homepage.pricing");
	const locale = useLocale();
	const [billingCycle, setBillingCycle] = useState<PlanCycle>("monthly");

	const cycles: PlanCycle[] = ["monthly", "biannual", "annual"];

	// Apply the Plan type to your object
	const plans: Record<"freeTrial" | "unlimited", Plan> = {
		freeTrial: {
			name: t("freeTrial.name"),
			features: t("freeTrial.features"),
    		accent: "#F6C358",
			monthly: {
				price: "¥0",
				total: "for 14 days",
				perks: t.raw("freeTrial.perks"),
				link: getLink("freeTrial", locale),
			},
				biannual: {
				price: "¥0",
				total: "for 14 days",
				perks: t.raw("freeTrial.perks"),
				link: getLink("freeTrial", locale),
			},
				annual: {
				price: "¥0",
				total: "for 14 days",
				perks: t.raw("freeTrial.perks"),
				link: getLink("freeTrial", locale),
			}
		},
		unlimited: {
			name: t("unlimited.name"),
			features: t("unlimited.features"),
			accent: "#B184DB",
			featured: true,
			monthly: {
				price: "¥10,000",
				total: t("taxIncl", { price: "10,000" }),
				perks: t.raw("unlimited.perks"),
				link: "https://buy.stripe.com/8wM2b6e3ufc0esMdQU",
			},
			biannual: {
				price: "¥9,000",
				total: t("oneTime", { price: "54,000" }),
				perks: t.raw("unlimited.perks"),
				link: "https://buy.stripe.com/7sIaHCcZqgg4acw005",
			},
			annual: {
				price: "¥8,000",
				total: t("oneTime", { price: "96,000" }),
				perks: t.raw("unlimited.perks"),
				link: "https://buy.stripe.com/dR68zu1gIbZO3O88wC",
			},
		},
	};

	return (
		<section className="relative overflow-hidden py-24 bg-[#dbe9ff]/30">
			<div className="absolute inset-0 bg-[url('/img/topography.svg')] bg-cover bg-center opacity-1 pointer-events-none"></div>

			<div className="relative z-10 max-w-7xl mx-auto px-6">
				<div className="text-center mb-16" data-aos="fade-up">
					<h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#215ca5] mb-6">{t("title")}</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("subtitle")}</p>

					<div className="mt-10 inline-flex items-center p-1.5 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#215ca5]/20 shadow-sm">
						{cycles.map((cycle) => (
							<button key={cycle} onClick={() => setBillingCycle(cycle)} className={clsx("px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300", billingCycle === cycle ? "bg-[#215ca5] text-white shadow-lg" : "text-[#215ca5] hover:bg-[#215ca5]/5")}>
								{t(`cycle_${cycle}`)}
							</button>
						))}
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
					<PricingCard plan={plans.freeTrial} cycle={billingCycle} />
					<PricingCard plan={plans.unlimited} cycle={billingCycle} />
				</div>
			</div>

			<div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 border border-[#215ca5]/10 rotate-45" />
		</section>
	);
}

// 3. Update the PricingCard props to use the Plan interface
interface PricingCardProps {
	plan: Plan;
	cycle: PlanCycle;
}

function PricingCard({ plan, cycle }: PricingCardProps) {
	// Accessing the specific cycle data safely
	const data = plan.name === "Free Trial"
  	? plan.monthly
  	: plan[cycle];
	const t = useTranslations("homepage.pricing");
	const billingLabel =
	plan.name === t("freeTrial.name")
		? t("noCard")
		: cycle === "monthly"
		? t("billedMonthly")
		: cycle === "biannual"
		? t("billedBiannual")
		: t("billedAnnual");
	

	return (
		<div className={clsx("relative group flex flex-col p-8 md:p-10 rounded-4xl transition-all duration-500 bg-white/80 backdrop-blur-md border", plan.featured ? "border-[#215ca5] shadow-2xl scale-105 z-20" : "border-gray-100 shadow-xl z-10 hover:border-[#215ca5]/30")} data-aos={plan.featured ? "fade-left" : "fade-right"}>
			{plan.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#215ca5] text-white px-6 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">{t("fullMembership")}</div>}
			<div className="mb-5 text-center md:text-left">
				<h3 className="text-2xl font-black mb-2" style={{ color: plan.accent }}>
					{plan.name}
				</h3>
				<p className="text-gray-500 font-medium">{plan.features}</p>
			</div>
			<div className="mb-8 text-center md:text-left">
				<div className="flex items-baseline justify-center md:justify-start gap-1">
					<span className="text-5xl font-black text-[#0c2a45]">{data.price}</span>
					{plan.name !== "Free Trial" && (
					<span className="text-gray-400 font-bold text-lg">/Month (Tax Incl.)</span>
					)}
				</div>
				<p className="text-xs font-bold text-[#215ca5]/60 mt-1 uppercase tracking-tighter">{billingLabel}</p>
			</div>
			<div className="flex-grow space-y-4 mb-10">
				<div className="h-px bg-linear-to-r from-[#215ca5]/20 to-transparent" />
				{data.perks.length > 0 ? (
					data.perks.map((perk, i) => (
						<div key={i} className="flex items-start gap-3 text-gray-700 text-sm font-semibold">
							<div className="mt-0.5 bg-[#215ca5]/10 p-1 rounded-full">
								<Check className="w-3 h-3 text-[#215ca5]" strokeWidth={4} />
							</div>
							{perk}
						</div>
					))
				) : (
					<p className="text-gray-400 italic text-sm">{t("standardAccess")}</p>
				)}
			</div>
			{data.link.startsWith("http") ? (
			<a
				href={data.link}
				target="_blank"
				rel="noopener noreferrer"
				className={clsx(
					"w-full py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-lg active:scale-95 text-center block",
					plan.featured
						? "bg-linear-to-r from-[#215ca5] to-[#0c2a45] text-white hover:shadow-[#215ca5]/40"
						: "bg-white border-2 border-[#215ca5] text-[#215ca5] hover:bg-[#215ca5] hover:text-white"
				)}
			>
				{plan.name === t("freeTrial.name")
					? t("startFreeTrial")
					: t("getStarted")}
			</a>
		) : (
			<Link
				href={data.link}
				className={clsx(
					"w-full py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-lg active:scale-95 text-center block",
					plan.featured
						? "bg-linear-to-r from-[#215ca5] to-[#0c2a45] text-white hover:shadow-[#215ca5]/40"
						: "bg-white border-2 border-[#215ca5] text-[#215ca5] hover:bg-[#215ca5] hover:text-white"
				)}
			>
				{plan.name === t("freeTrial.name")
					? t("startFreeTrial")
					: t("getStarted")}
			</Link>
		)}
		</div>
	);
}
