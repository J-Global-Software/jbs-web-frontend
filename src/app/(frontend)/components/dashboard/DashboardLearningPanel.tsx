import type { DashboardCourse, DashboardSession } from "./dashboard.types";

interface DashboardLearningPanelProps {
	courses: DashboardCourse[];
	sessions: DashboardSession[];
}

export function DashboardLearningPanel({ courses, sessions }: DashboardLearningPanelProps) {
	return (
		<section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
			<div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-slate-500">Current learning</p>
						<h2 className="mt-1 text-xl font-semibold text-slate-950">Courses in progress</h2>
					</div>
					<button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white">View all</button>
				</div>

				<div className="mt-6 space-y-4">
					{courses.map((course) => (
						<article key={course.title} className="rounded-[24px] bg-slate-50 p-5">
							<div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
								<div>
									<h3 className="text-lg font-semibold text-slate-950">{course.title}</h3>
									<p className="mt-1 text-sm text-slate-500">{course.coach}</p>
								</div>
								<p className="text-sm font-medium text-slate-600">{course.nextLesson}</p>
							</div>

							<div className="mt-5">
								<div className="mb-2 flex items-center justify-between text-sm">
									<span className="text-slate-500">Progress</span>
									<span className="font-medium text-slate-800">{course.progress}%</span>
								</div>
								<div className="h-2 rounded-full bg-slate-200">
									<div className="h-2 rounded-full bg-[#215ca5]" style={{ width: `${course.progress}%` }} />
								</div>
							</div>
						</article>
					))}
				</div>
			</div>

			<div className="rounded-[28px] border border-slate-200 bg-[#f4f8ff] p-6 shadow-sm">
				<p className="text-sm font-medium text-slate-500">Upcoming</p>
				<h2 className="mt-1 text-xl font-semibold text-slate-950">Next sessions</h2>

				<div className="mt-6 space-y-3">
					{sessions.map((session) => (
						<article key={session.title} className="rounded-[24px] bg-white p-4">
							<p className="text-sm font-medium text-slate-500">{session.time}</p>
							<h3 className="mt-1 text-base font-semibold text-slate-950">{session.title}</h3>
							<p className="mt-1 text-sm text-slate-600">{session.meta}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
