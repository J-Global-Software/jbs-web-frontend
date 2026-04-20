"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import PricingComparisonTable from "./PricingComparisonTable";

type PlanCycle = "monthly" | "biannual" | "annual";

interface PricingProps {
	data?: any;
}

export default function PricingSection({ data }: PricingProps) {
	const [billingCycle, setBillingCycle] = useState<PlanCycle>("annual");

	if (!data) return null;

	const { freeTrial, unlimited, labels, title, subtitle } = data;

	// Helper to format features into the grid structure used in the original UI
	const renderFeatures = (features: any[]) => {
		return features?.map((f: any, i: number) => (
			<div key={i} className="grid  items-start gap-2 border-t border-gray-50 pt-2">
				<span className="text-[14px] font-bold text-gray-400 mt-1 uppercase leading-none">{f.category}</span>
				<div className="space-y-1">
					<div className="flex items-start gap-1.5 text-[14px]">
						{f.isIncluded ? <Check className="w-3 h-3 text-green-500 mt-0.5" /> : <Minus className="w-3 h-3 text-gray-300 mt-0.5" />}
						<span className={f.isIncluded ? "text-gray-700 font-medium" : "text-gray-400"}>{f.text}</span>
					</div>
					{f.subtext && <span className="text-[10px] text-gray-400 italic block ml-4.5 leading-tight">{f.subtext}</span>}
				</div>
			</div>
		));
	};

	const currentUnlimited = unlimited?.cycles?.[billingCycle];

	// Helper to get the correct "Billed" label dynamically from Payload labels
	const getBilledLabel = () => {
		if (billingCycle === "monthly") return labels?.billedMonthly || "Billed monthly";
		if (billingCycle === "biannual") return labels?.billedBiannual || "Billed every 6 months";
		if (billingCycle === "annual") return labels?.billedAnnual || "Billed annually";
		return "";
	};

	return (
		<section className="py-16 bg-[#dbe9ff]/20">
			<div className="max-w-5xl mx-auto px-6">
				<div className="text-center mb-10">
					<h2 className="text-4xl font-black text-[#215ca5] mb-2">{title}</h2>
					<p className="text-md text-gray-500 mb-6 max-w-lg mx-auto">{subtitle}</p>

					{/* Toggle Switch */}
					<div className="inline-flex p-1 bg-white rounded-xl border border-[#215ca5]/10 shadow-sm">
						{(["monthly", "biannual", "annual"] as PlanCycle[]).map((c) => (
							<button key={c} onClick={() => setBillingCycle(c)} className={clsx("px-5 py-1.5 rounded-lg text-md font-bold transition-all", billingCycle === c ? "bg-[#215ca5] text-white shadow-md" : "text-[#215ca5] hover:bg-blue-50")}>
								{labels?.[c] || c}
							</button>
						))}
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-6 items-stretch">
					{/* Free Trial Card */}
					<div className="relative flex flex-col p-6 rounded-3xl bg-white border border-gray-100 shadow-sm transition-all">
						<div className="mb-4">
							<h3 className="text-2xl mb-5 font-black uppercase tracking-tight text-yellow-600">{freeTrial?.name}</h3>
							<div className="flex items-baseline gap-1">
								<span className="text-4xl font-black text-[#0c2a45]">{freeTrial?.price}</span>
							</div>
							{/* DYNAMIC LABEL FROM PAYLOAD */}
							<p className="text-[13px] mt-2 font-bold text-[#215ca5]/60 uppercase">{labels?.noCard || "No credit card required"}</p>
						</div>
						<div className="flex-grow space-y-3 mb-6">{renderFeatures(freeTrial?.features)}</div>
						<PlanBtn href="/free-trial" featured={false}>
							{freeTrial?.buttonText}
						</PlanBtn>
					</div>

					{/* Unlimited Card */}
					<div className="relative flex flex-col p-6 rounded-3xl bg-white border border-[#215ca5] shadow-xl md:scale-105 z-10">
						<div className="mb-4">
							<h3 className="text-2xl mb-5 font-black uppercase tracking-tight text-[#B184DB]">{unlimited?.name}</h3>
							<div className="flex items-baseline gap-1">
								<span className="text-4xl font-black text-[#0c2a45]">{currentUnlimited?.price}</span>
								<span className="text-gray-400 text-sm font-bold">{labels?.taxIncl}</span>
							</div>
							{/* DYNAMIC LABEL FROM PAYLOAD */}
							<p className="text-[13px] mt-2 font-bold text-[#215ca5]/60 uppercase">{getBilledLabel()}</p>
						</div>
						<div className="flex-grow space-y-3 mb-6">{renderFeatures(currentUnlimited?.features)}</div>
						<PlanBtn href={currentUnlimited?.link || "#"} featured={true}>
							{unlimited?.buttonText}
						</PlanBtn>
					</div>
				</div>

				<PricingComparisonTable
					annualPrice={unlimited?.cycles?.annual?.price}
					monthlyPrice={unlimited?.cycles?.monthly?.price}
					freeTrialPrice={freeTrial?.price}
				/>
			</div>
		</section>
	);
}

function PlanBtn({ href, featured, children }: any) {
	const css = clsx("w-full py-3 rounded-xl font-bold text-sm transition-all text-center block", featured ? "bg-[#215ca5] text-white hover:bg-[#0c2a45]" : "border-2 border-[#215ca5] text-[#215ca5] hover:bg-blue-50");

	// Safety check for href
	const targetHref = href || "#";
	const isExternal = targetHref.startsWith("http");

	if (isExternal) {
		return (
			<a href={targetHref} target="_blank" rel="noopener noreferrer" className={css}>
				{children}
			</a>
		);
	}

	return (
		<Link href={targetHref} className={css}>
			{children}
		</Link>
	);
}
