import type { DashboardActivity } from "./dashboard.types";

interface DashboardActivityPanelProps {
	activities: DashboardActivity[];
}

export function DashboardActivityPanel({ activities }: DashboardActivityPanelProps) {
	return (
		<section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-slate-500">Recent activity</p>
					<h2 className="mt-1 text-xl font-semibold text-slate-950">Latest updates</h2>
				</div>
				<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Live</span>
			</div>

			<div className="mt-6 space-y-4">
				{activities.map((activity) => (
					<article key={`${activity.title}-${activity.time}`} className="flex gap-4 rounded-[22px] border border-slate-100 p-4">
						<div className="mt-1 h-3 w-3 rounded-full bg-[#215ca5]" />
						<div>
							<div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
								<h3 className="text-base font-semibold text-slate-950">{activity.title}</h3>
								<span className="text-sm text-slate-400">{activity.time}</span>
							</div>
							<p className="mt-2 text-sm leading-6 text-slate-600">{activity.description}</p>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
