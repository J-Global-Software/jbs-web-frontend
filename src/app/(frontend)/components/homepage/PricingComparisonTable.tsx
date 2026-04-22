"use client";

import { Check, Minus } from "lucide-react";

interface PricingComparisonTableProps {
	annualPrice?: string;
	monthlyPrice?: string;
	freeTrialPrice?: string;
}

type PlanKey = "annual" | "monthly" | "freeTrial";

type PlanMeta = {
	name: string;
	label: string;
	headerClass: string;
	iconClass: string;
};

type ComparisonCell = {
	included: boolean;
	text: string;
};

type ComparisonRow = {
	label: string;
	plans: Record<PlanKey, ComparisonCell>;
};

const planOrder: PlanKey[] = ["annual", "monthly", "freeTrial"];

function getPlans(annualPrice: string, monthlyPrice: string, freeTrialPrice: string): Record<PlanKey, PlanMeta> {
	return {
		annual: {
			name: "Annual",
			label: "Best Value",
			headerClass: "bg-[#215ca5] text-white",
			iconClass: "bg-[#215ca5] text-white",
		},
		monthly: {
			name: "Monthly",
			label: "Flexible",
			headerClass: "bg-[#4e88d5] text-white",
			iconClass: "bg-[#4e88d5] text-white",
		},
		freeTrial: {
			name: "Free Trial",
			label: "Try First",
			headerClass: "bg-[#dce9fb] text-[#0c2a45]",
			iconClass: "bg-[#8cb3e8] text-white",
		},
	};
}

function getRows(annualPrice: string, monthlyPrice: string, freeTrialPrice: string): ComparisonRow[] {
	return [
		{
			label: "Effective Cost",
			plans: {
				annual: { included: true, text: "¥8,000/mo" },
				monthly: { included: true, text: "¥10,000/mo" },
				freeTrial: { included: false, text: "--" },
			},
		},
		{
			label: "Lessons",
			plans: {
				annual: { included: true, text: "Unlimited" },
				monthly: { included: true, text: "Up to 12/mo" },
				freeTrial: { included: true, text: "Full access" },
			},
		},
		{
			label: "Programs",
			plans: {
				annual: { included: true, text: "Full" },
				monthly: { included: true, text: "Short + medium" },
				freeTrial: { included: true, text: "Trial" },
			},
		},
		{
			label: "Coaching",
			plans: {
				annual: { included: true, text: "2 sessions" },
				monthly: { included: false, text: "Not included" },
				freeTrial: { included: true, text: "1 session" },
			},
		},
		{
			label: "E-learning",
			plans: {
				annual: { included: true, text: "4 full + basic" },
				monthly: { included: true, text: "Basic only" },
				freeTrial: { included: true, text: "1 intro" },
			},
		},
		{
			label: "Support",
			plans: {
				annual: { included: true, text: "1-year roadmap" },
				monthly: { included: true, text: "Counseling" },
				freeTrial: { included: true, text: "Self-guided" },
			},
		},
		{
			label: "Savings",
			plans: {
				annual: { included: true, text: "Save ¥24k/yr" },
				monthly: { included: true, text: "No savings" },
				freeTrial: { included: true, text: "14 days" },
			},
		},
	];
}

function StatusIcon({ included, iconClass }: { included: boolean; iconClass: string }) {
	if (included) {
		return (
			<span className={`inline-flex h-8 w-8 items-center justify-center rounded-full shadow-sm ${iconClass}`}>
				<Check className="h-4 w-4" strokeWidth={2.75} />
			</span>
		);
	}

	return (
		<span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400">
			<Minus className="h-4 w-4" strokeWidth={2.75} />
		</span>
	);
}

function PlanCell({ cell, plan }: { cell: ComparisonCell; plan: PlanMeta }) {
	return (
		<div className="flex flex-col items-center justify-center gap-2 text-center">
			<StatusIcon included={cell.included} iconClass={plan.iconClass} />
			<div className="text-sm font-semibold leading-5 text-slate-800">{cell.text}</div>
		</div>
	);
}

export default function PricingComparisonTable({
	annualPrice = "¥96,000",
	monthlyPrice = "¥10,000",
	freeTrialPrice = "¥0",
}: PricingComparisonTableProps) {
	const plans = getPlans(annualPrice, monthlyPrice, freeTrialPrice);
	const rows = getRows(annualPrice, monthlyPrice, freeTrialPrice);

	return (
		<div className="mt-10 rounded-[2rem] border border-[#215ca5]/10 bg-white/95 p-4 shadow-xl shadow-[#215ca5]/8 sm:p-6">
			<div className="mb-6 text-center">
				<span className="inline-flex items-center rounded-full border border-[#215ca5]/15 bg-[#215ca5]/5 px-4 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#215ca5]">
					Plan Comparison
				</span>
				<h3 className="mt-3 text-2xl font-black tracking-tight text-[#0c2a45] sm:text-3xl">JBS Membership Comparison</h3>
			</div>

			<div className="overflow-x-auto rounded-[1.5rem] border border-slate-100">
				<div className="min-w-[860px]">
					<div className="grid grid-cols-[220px_repeat(3,minmax(0,1fr))] gap-px bg-slate-100">
						<div className="bg-white" />
						{planOrder.map((planKey) => (
							<div key={planKey} className={`px-5 py-4 text-center ${plans[planKey].headerClass}`}>
								<div className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-85">{plans[planKey].label}</div>
								<div className="mt-2 text-lg font-black">{plans[planKey].name}</div>
							</div>
						))}

						{rows.map((row, rowIndex) => (
							<div key={row.label} className="contents">
								<div key={`${row.label}-label`} className={`px-6 py-5 ${rowIndex % 2 === 0 ? "bg-white" : "bg-[#f7fafe]"}`}>
									<div className="text-base font-semibold text-slate-800">{row.label}</div>
								</div>
								{planOrder.map((planKey) => (
									<div key={`${row.label}-${planKey}`} className={`px-4 py-5 ${rowIndex % 2 === 0 ? "bg-white" : "bg-[#f7fafe]"}`}>
										<PlanCell cell={row.plans[planKey]} plan={plans[planKey]} />
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
