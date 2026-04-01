// app/[locale]/privacy-policy/page.tsx
import { getTranslations } from "next-intl/server";
import type { ResolvingMetadata } from "next";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import { generatePageMetadata } from "@/lib/seo";
import { AppLocale } from "@/i18n/config";

export async function generateMetadata(props: { params: Promise<{ locale: AppLocale }> }, parent: ResolvingMetadata) {
	return generatePageMetadata(props, parent, "seo");
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
	// Await params first
	const { locale } = await params;

	const t = await getTranslations({
		locale,
		namespace: "privacy",
	});

	return (
		<div>
			<header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
					<Link href="/" className="flex items-center">
						<Image src="/logo.avif" alt="J-Global Logo" width={120} height={40} className="w-24 object-contain sm:w-32" priority />
					</Link>
					<LanguageSwitcher />
				</div>
			</header>

			<main className="mx-auto mt-20 max-w-4xl px-4 py-16">
				{/* Title */}
				<h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">{t("privacy.title")}</h1>

				{/* Intro */}
				<p className="mb-10 leading-relaxed text-gray-700">{t("privacy.intro")}</p>

				{/* Article 1 */}
				<section className="mb-10">
					<h2 className="mb-3 text-xl font-semibold text-gray-900">{t("privacy.article1.title")}</h2>
					<p className="mb-4 text-gray-700">{t("privacy.article1.clause1")}</p>
					<ul className="list-disc space-y-1 pl-6 text-gray-700">
						<li>{t("privacy.article1.items.name")}</li>
						<li>{t("privacy.article1.items.birth")}</li>
						<li>{t("privacy.article1.items.company")}</li>
						<li>{t("privacy.article1.items.email")}</li>
						<li>{t("privacy.article1.items.history")}</li>
						<li>{t("privacy.article1.items.messages")}</li>
					</ul>
				</section>

				{/* Article 2 */}
				<section className="mb-10">
					<h2 className="mb-3 text-xl font-semibold text-gray-900">{t("privacy.article2.title")}</h2>
					<ul className="list-decimal space-y-1 pl-6 text-gray-700">
						{Array.from({ length: 9 }, (_, i) => (
							<li key={i}>{t(`privacy.article2.items.${i + 1}`)}</li>
						))}
					</ul>
				</section>

				{/* Articles 3–11 (content-based) */}
				{[3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
					<section key={num} className="mb-10">
						<h2 className="mb-3 text-xl font-semibold text-gray-900">{t(`privacy.article${num}.title`)}</h2>
						<p className="text-gray-700">{t(`privacy.article${num}.content`)}</p>
					</section>
				))}

				{/* Contact */}
				<section className="mb-12">
					<h2 className="mb-3 text-xl font-semibold text-gray-900">{t("privacy.contact.title")}</h2>
					<p className="text-gray-700">{t("privacy.contact.content")}</p>
				</section>

				{/* Established */}
				<div className="border-t pt-6 text-sm text-gray-500">{t("privacy.established")}</div>
			</main>

			<Footer />
		</div>
	);
}
