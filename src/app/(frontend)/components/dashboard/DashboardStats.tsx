import type { DashboardStat } from "./dashboard.types";

interface DashboardStatsProps {
	stats: DashboardStat[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
	return (
		<section className="grid gap-4 md:grid-cols-3">
			{stats.map((stat) => {
				const Icon = stat.icon;

				return (
					<article key={stat.label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
						<div className="flex items-center justify-between">
							<p className="text-sm text-slate-500">{stat.label}</p>
							<div className="rounded-2xl bg-slate-100 p-2 text-slate-700">
								<Icon className="h-4 w-4" />
							</div>
						</div>

						<p className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
						<p className="mt-2 text-sm font-medium text-emerald-600">{stat.change}</p>
					</article>
				);
			})}
		</section>
	);
}
