"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function PressSection() {
	const t = useTranslations("homepage.featuredIn");

	const pressItems = [
		{
			id: 1,
			name: t("englishJournalOnline"),
			subtitle: t("englishJournalOnlineDescription"),
			articles: [
				{
					title: t("readFirstArticle"),
					url: "https://ej.alc.co.jp/previewPublic/U2FsdGVkX18Qvp1L2u3SWS1vus1L2a3S4hc0v0jL7VptZc7g3HwJZvutl9jhcB0lNSbzs1L2a3S4hnz5fYDNGe?ejo=ygkXqBbnYeUgijEoTrX3LcQQRqaPjfNpYuqyjeIqGjeifqFYevjW5e5U5Xoe4HKj",
					description: "",
				},
				{
					title: t("readSecondArticle"),
					url: "https://ej.alc.co.jp/tag/BUSINESS/20230206-jonlynch-interview-02",
					description: "",
				},
			],
		},
		{
			id: 2,
			name: t("keysession"),
			subtitle: t("keysessionDescription"),
			articles: [
				{
					title: t("introInterculturalCommunication"),
					url: "https://keysession.jp/media/recommended-companies-for-intercultural-communication-training/",
					description: t("modernClassroomsTech"),
				},
				{
					title: t("overseasAssignmentTraining"),
					url: "https://keysession.jp/media/recommended-companies-for-before-global-assignment-training/",
					description: t("digitalLearningInsights"),
				},
				{
					title: t("tipsSuccessfulAssignment"),
					url: "https://keysession.jp/media/assigned-abroad/",
					description: t("digitalEducationGrowth"),
				},
			],
		},
	];

	return (
		<section className="bg-gray-50 py-20">
			<div className="max-w-6xl mx-auto px-6">
				{/* Header */}
				<h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">{t("featuredTitle")}</h2>
				<p className="text-lg md:text-xl text-gray-600 mb-12 text-center">{t("featuredSubtitle")}</p>

				{/* Modern vertical timeline */}
				<div className="relative">
					{/* Vertical line */}
					<div className="absolute top-0 left-6 w-1 h-full bg-gray-300"></div>

					<div className="flex flex-col gap-8">
						{pressItems.map((item) => (
							<div key={item.id} className="relative pl-12 py-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all">
								{/* Dot */}
								<span className="absolute left-4 top-8 w-4 h-4 bg-blue-600 rounded-full shadow"></span>

								{/* Publication */}
								<h3 className="text-2xl font-semibold text-gray-800 mb-2">{item.name}</h3>

								{item.subtitle && <p className="text-gray-500 text-sm md:text-base mb-4">{item.subtitle}</p>}

								{/* Articles */}
								<ul className="flex flex-col gap-3">
									{item.articles.map((article, idx) => (
										<li key={idx}>
											<Link href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition flex flex-col gap-1">
												<span className="font-medium">{article.title} →</span>

												{article.description && <span className="text-gray-600 text-sm md:text-base">{article.description}</span>}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
