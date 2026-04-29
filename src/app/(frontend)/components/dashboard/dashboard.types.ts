import type { LucideIcon } from "lucide-react";

export interface DashboardNavItem {
	label: string;
	href: string;
	icon: LucideIcon;
	isActive?: boolean;
}

export interface DashboardStat {
	label: string;
	value: string;
	change: string;
	icon: LucideIcon;
}

export interface DashboardCourse {
	title: string;
	coach: string;
	progress: number;
	nextLesson: string;
}

export interface DashboardActivity {
	title: string;
	description: string;
	time: string;
}

export interface DashboardSession {
	title: string;
	time: string;
	meta: string;
}

export interface UserDashboardData {
	userName: string;
	programName: string;
	navItems: DashboardNavItem[];
	stats: DashboardStat[];
	courses: DashboardCourse[];
	activities: DashboardActivity[];
	sessions: DashboardSession[];
}
