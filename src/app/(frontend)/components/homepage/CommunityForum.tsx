"use client";

import type { ReactNode } from "react";
import { ArrowRight, BriefcaseBusiness, Globe2, Handshake, Lock, MessageCircle, Mic } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface DiscussionItem {
	author: string;
	initials: string;
	tag: string;
	title: string;
	meta: string[];
	time: string;
	color: string;
}

interface TopicItem {
	title: string;
	description: string;
	Icon: any;
}

export default function CommunityForum() {
	const t = useTranslations("homepage.communityForum");

	const topicIcons = [Globe2, BriefcaseBusiness, Mic, Handshake];
	const pillColors = ["bg-[#dff3ec] text-[#2c8b72]", "bg-[#e5ecff] text-[#486fd6]", "bg-[#efe7ff] text-[#8b63c7]", "bg-[#e7f0de] text-[#5f8b50]"];

	const discussions: DiscussionItem[] = ["discussion1", "discussion2", "discussion3", "discussion4"].map((key, index) => ({
		author: t(`recentDiscussions.${key}.author`),
		initials: t(`recentDiscussions.${key}.initials`),
		tag: t(`recentDiscussions.${key}.tag`),
		title: t(`recentDiscussions.${key}.title`),
		meta: [t(`recentDiscussions.${key}.replies`), t(`recentDiscussions.${key}.views`), t(`recentDiscussions.${key}.helpful`)],
		time: t(`recentDiscussions.${key}.time`),
		color: pillColors[index % pillColors.length],
	}));

	const topics: TopicItem[] = ["topic1", "topic2", "topic3", "topic4"].map((key, index) => ({
		title: t(`topics.${key}.title`),
		description: t(`topics.${key}.description`),
		Icon: topicIcons[index % topicIcons.length],
	}));

	return (
		<section className="bg-white py-10 sm:py-14">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl">
					<div className="inline-flex items-center gap-2 px-5 py-2 mb-5 rounded-full border border-[#215ca5]/20 bg-[#215ca5]/5">
						<span className="w-1.5 h-1.5 rounded-full bg-[#215ca5]" />
						<span className="text-xs font-bold tracking-[0.18em] uppercase text-[#215ca5]">{t("badge")}</span>
					</div>
					<h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight max-w-4xl">{t.rich("title", { highlight: (chunks) => <span className="text-[#215ca5]">{chunks}</span> })}</h2>
					<p className="mt-4 max-w-3xl text-sm sm:text-base leading-7 text-slate-500 whitespace-pre-line">{t("description")}</p>
				</div>

				<div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
					<div className="overflow-hidden rounded-[2rem] border border-[#215ca5]/10 bg-white shadow-[0_18px_60px_rgba(33,92,165,0.12)]">
						<div className="flex items-center justify-between bg-[#12233d] px-6 py-5 text-white">
							<div>
								<h3 className="text-lg font-bold">{t("recentDiscussions.title")}</h3>
							</div>
						</div>

						<div className="divide-y divide-slate-100">
							{discussions.map((discussion) => (
								<div key={discussion.title} className="px-6 py-5">
									<div className="flex items-center justify-between gap-4">
										<div className="flex items-center gap-3 min-w-0">
											<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dbe9ff] text-xs font-bold text-[#215ca5]">{discussion.initials}</div>
											<div className="min-w-0">
												<div className="flex items-center gap-2 flex-wrap">
													<span className="text-sm font-bold text-slate-700">{discussion.author}</span>
													<span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${discussion.color}`}>{discussion.tag}</span>
												</div>
											</div>
										</div>
										<span className="shrink-0 text-xs font-medium text-slate-400">{discussion.time}</span>
									</div>
									<p className="mt-3 max-w-xl text-base font-semibold leading-7 text-slate-800">{discussion.title}</p>
									<div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-400">
										{discussion.meta.map((item) => (
											<span key={item} className="inline-flex items-center gap-1.5">
												<MessageCircle className="h-3.5 w-3.5" />
												{item}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="space-y-5">
						<div className="grid gap-5 sm:grid-cols-2">
							{topics.map(({ title, description, Icon }) => (
								<div key={title} className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/5">
									<ForumIconBadge>
										<Icon className="h-5 w-5" strokeWidth={2.2} />
									</ForumIconBadge>
									<h3 className="text-base font-bold text-[#1a3558]">{title}</h3>
									<p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
								</div>
							))}
						</div>

						<div className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-sm">
							<div className="flex items-start gap-4">
								<ForumIconBadge className="mt-1 shrink-0">
									<Lock className="h-5 w-5" strokeWidth={2.2} />
								</ForumIconBadge>
								<div>
									<h3 className="text-lg font-bold text-[#1a3558]">{t("members.title")}</h3>
									<p className="mt-2 text-sm leading-6 text-slate-500">{t("members.description")}</p>
								</div>
							</div>
						</div>

						<div className="text-center">
							<Link href="/free-trial" className="inline-flex items-center gap-2 rounded-full bg-[#1f497c] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[#1f497c]/15 transition-all hover:bg-[#17385f]">
								{t("cta")}
								<ArrowRight className="h-4 w-4" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function ForumIconBadge({ children, className = "" }: { children: ReactNode; className?: string }) {
	return (
		<div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-[#eef5ff] to-[#dbe9ff] text-[#215ca5] shadow-inner ring-1 ring-[#215ca5]/8 ${className}`}>
			<div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm">{children}</div>
		</div>
	);
}
