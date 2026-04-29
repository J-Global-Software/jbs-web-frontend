import { DashboardActivityPanel } from "./DashboardActivityPanel";
import { DashboardLearningPanel } from "./DashboardLearningPanel";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardStats } from "./DashboardStats";
import { DashboardTopbar } from "./DashboardTopbar";
import { dashboardData } from "./dashboardData";

interface UserDashboardProps {
	data?: typeof dashboardData;
}

export default function UserDashboard({ data = dashboardData }: UserDashboardProps) {
	return (
		<section className="min-h-screen bg-[#eef4ff] p-4 md:p-6">
			<div className="mx-auto grid max-w-7xl gap-4 xl:grid-cols-[280px_1fr]">
				<DashboardSidebar items={data.navItems} />
				<div className="space-y-4">
					<DashboardTopbar userName={data.userName} programName={data.programName} />
					<DashboardStats stats={data.stats} />
					<DashboardLearningPanel courses={data.courses} sessions={data.sessions} />
					<DashboardActivityPanel activities={data.activities} />
				</div>
			</div>
		</section>
	);
}
