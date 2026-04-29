interface DashboardTopbarProps {
	userName: string;
	programName: string;
}

export function DashboardTopbar({ userName, programName }: DashboardTopbarProps) {
	return (
		<header className="rounded-[28px] border border-slate-200 bg-white px-6 py-5 shadow-sm">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<p className="text-sm font-medium text-slate-500">Welcome back</p>
					<h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">{userName}</h1>
					<p className="mt-2 text-sm text-slate-600">{programName}</p>
				</div>

				<div className="flex items-center gap-3">
					<div className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600">Spring cohort</div>
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#215ca5] text-sm font-semibold text-white">{userName.slice(0, 1)}</div>
				</div>
			</div>
		</header>
	);
}
