import { BookOpen, CalendarRange, GraduationCap, LayoutGrid, MessageSquare, Settings, Sparkles, TrendingUp } from "lucide-react";
import type { UserDashboardData } from "./dashboard.types";

export const dashboardData: UserDashboardData = {
	userName: "Aiko",
	programName: "Global Leadership Track",
	navItems: [
		{ label: "Overview", href: "/dashboard", icon: LayoutGrid, isActive: true },
		{ label: "Courses", href: "/dashboard/courses", icon: BookOpen },
		{ label: "Sessions", href: "/dashboard/sessions", icon: CalendarRange },
		{ label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
		{ label: "Settings", href: "/dashboard/settings", icon: Settings },
	],
	stats: [
		{ label: "Lessons completed", value: "18", change: "+4 this week", icon: GraduationCap },
		{ label: "Current streak", value: "12 days", change: "On track", icon: Sparkles },
		{ label: "Attendance rate", value: "96%", change: "+3% this month", icon: TrendingUp },
	],
	courses: [
		{ title: "Cross-Cultural Communication", coach: "David S.", progress: 72, nextLesson: "Tomorrow at 10:00" },
		{ title: "Leadership in Global Teams", coach: "Mina K.", progress: 48, nextLesson: "Friday at 14:00" },
	],
	activities: [
		{ title: "Workbook submitted", description: "Module 4 reflection uploaded successfully.", time: "2h ago" },
		{ title: "Coach feedback received", description: "New notes were added to your presentation outline.", time: "Yesterday" },
		{ title: "Session reminder", description: "Your 1:1 mentoring call is scheduled for Thursday.", time: "Yesterday" },
	],
	sessions: [
		{ title: "1:1 Mentoring", time: "Thu, 16:00", meta: "45 min with David" },
		{ title: "Team Workshop", time: "Sat, 11:30", meta: "Remote classroom" },
	],
};
