"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { useScroll } from "@/app/hoooks/useScroll";
import { getLink } from "@/utils/helpers";

export default function Page() {
	const currentLocale = useLocale();
	const scrolled = useScroll(10);

	const tHome = useTranslations("homepage");
	const tNav = useTranslations("homepage.navbar");

	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 -z-20">
				<Image
					src="/img/sun-tornado.svg"
					alt="Background pattern"
					fill
					className="object-cover" // or "object-repeat"
					priority
					style={{ opacity: 0.7 }}
				/>
			</div>
			{/* Navbar */}
			<header className={`fixed top-0 left-0 right-0 z-50 mx-auto flex w-full items-center justify-between px-6 py-2 transition-colors duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
				<div className="max-w-7xl flex w-full items-center justify-between mx-auto">
					<Link href="/" className="flex items-center">
						<Image src="/logo.avif" alt="Prebuilt UI Logo" width={120} height={40} className="h-auto w-24 sm:w-32 md:w-32 object-contain" priority />
					</Link>
					<div className="flex items-center gap-6">
						{/* Navigation Links */}
						<nav className="hidden md:flex items-center gap-6 text-base font-semibold">
							<a href="#why-jbs" className="hover:text-[#1f497c] transition">
								{tNav("why")}
							</a>
							<a href="#programs" className="hover:text-[#1f497c] transition">
								{tNav("programs")}
							</a>
							<a href="#pricing" className="hover:text-[#1f497c] transition">
								{tNav("pricing")}
							</a>
							<a href="#instructors" className="hover:text-[#1f497c] transition">
								{tNav("instructors")}
							</a>
						</nav>

						{/* Language Switcher */}
						<LanguageSwitcher />
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 pt-25 text-center sm:flex-row sm:pt-40 sm:text-left">
				{/* Left Side */}
				<div className="flex flex-1 flex-col items-center sm:items-start">
					<h1 className="text-[2.7rem] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
						{tHome.rich("HeroSection.heading", {
							blue: (chunks) => <span className="text-[#1f497c]">{chunks}</span>,
							br: () => <br />,
							div: (chunks) => <span>{chunks}</span>,
							u: (chunks) => <u>{chunks}</u>,
							i: (chunks) => <i>{chunks}</i>,
						})}
					</h1>
					<p className="mt-6 max-w-xl text-lg text-gray-200">
						{tHome("HeroSection.subheading")}
					</p>

					<div className="mt-8 flex flex-wrap justify-center gap-10 md:gap-4 sm:justify-start">
						<div>
							<Link href={`/${currentLocale}/free-trial-onboarding`} className="mt-10 rounded-full bg-[#d74100] px-6 py-3 text-xl font-semibold text-white shadow-lg transition hover:bg-[#b73600]">
								{tHome("HeroSection.heroCTA")}
							</Link>
						</div>
						<div>
							<a href="#programs" className="rounded-full border border-gray-300 px-6 py-3 font-medium text-white transition text-xl hover:border-[#215ca5] hover:bg-[#215ca5]/10 hover:text-[#215ca5]">
								{tHome("HeroSection.heroSecondaryCTA")}
							</a>
						</div>
					</div>
				</div>

				{/* Right Side */}
				<div className="flex-1 flex flex-col items-center sm:items-center px-6 sm:px-0">
					{/* Top row: 3 small images */}
					<div className="flex w-[300px] sm:w-[400px] md:w-[400px] gap-3 mb-4">
						{["/img/jon_hero2.png", "/img/nana_hero2.png", "/img/usa_hero2.png"].map((src, i) => (
							<div
								key={i}
								className="
            relative flex-1 aspect-square rounded-3xl overflow-hidden border border-white
          "
								style={{
									animation: `floatStair 6s ease-in-out infinite`,
									animationDelay: `${i * 0.5}s`, // stair effect
								}}
							>
								<Image src={src} alt={`Small ${i + 1}`} fill className="object-cover" />
							</div>
						))}
					</div>

					{/* Big image */}
					<div
						className=" mb-5
      relative w-[200px] sm:w-[300px] md:w-[400px] 
      h-[200px] sm:h-[300px] md:h-[300px]
      rounded-4xl overflow-hidden shadow-2xl border border-white
    "
						style={{
							animation: `floatBig 7s ease-in-out infinite`,
						}}
					>
						<Image src="/img/girl_hero.png" alt="Students collaborating" fill className="object-cover" priority />
					</div>
				</div>
			</section>
		</div>
	);
}
