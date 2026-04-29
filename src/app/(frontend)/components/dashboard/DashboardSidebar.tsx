import type { DashboardNavItem } from "./dashboard.types";

interface DashboardSidebarProps {
	items: DashboardNavItem[];
}

export function DashboardSidebar({ items }: DashboardSidebarProps) {
	return (
		<aside className="rounded-[28px] border border-slate-200 bg-slate-950 px-5 py-6 text-white">
			<div className="mb-8">
				<p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">J-Global</p>
				<h2 className="mt-3 text-2xl font-semibold leading-tight">Student Dashboard</h2>
			</div>

			<nav className="space-y-2">
				{items.map((item) => {
					const Icon = item.icon;

					return (
						<div
							key={item.label}
							className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors ${
								item.isActive ? "bg-white text-slate-950" : "text-slate-300"
							}`}
						>
							<Icon className="h-4 w-4" />
							<span>{item.label}</span>
						</div>
					);
				})}
			</nav>
		</aside>
	);
}
