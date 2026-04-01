"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { getLink } from "@/utils/helpers";
import { clsx } from "clsx";
import { useScroll } from "../../hoooks/useScroll";

export default function Page() {
	const currentLocale = useLocale();
	const scrolled = useScroll(10);

	const tHome = useTranslations("homepage");
	const tNav = useTranslations("homepage.navbar");

	return (
		/* CHANGE: Removed 'min-h-screen'. 
           Added 'flex flex-col' and 'pb-20' to ensure the background 
           follows the content height and has breathing room at the bottom.
        */
		<div className="relative flex flex-col overflow-hidden pb-20 ">
			{/* Background Image - Now scales to the height of the content */}
			<div className="absolute inset-0 -z-20">
				<Image src="/img/sun-tornado.svg" alt="Background pattern" fill className="object-cover" priority style={{ opacity: 0.7 }} />
			</div>

			{/* Navbar */}
			<header className={`fixed top-0 left-0 right-0 z-50 mx-auto flex w-full items-center justify-between px-6 py-2 transition-colors duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
				<div className="max-w-7xl flex w-full items-center justify-between mx-auto">
					<Link href="/" className="flex items-center">
						<Image src="/logo.avif" alt="Prebuilt UI Logo" width={120} height={40} className="h-auto w-24 sm:w-32 md:w-32 object-contain" priority />
					</Link>
					<div className="flex items-center gap-6">
						<nav className="hidden md:flex items-center gap-6 text-base font-semibold">
							<a href="#why-jbs" className="hover:text-[#1f497c] text-gray-700 font-light transition">
								{tNav("why")}
							</a>
							<a href="#programs" className="hover:text-[#1f497c] text-gray-700 font-light transition">
								{tNav("programs")}
							</a>
							<a href="#pricing" className="hover:text-[#1f497c] text-gray-700 font-light transition">
								{tNav("pricing")}
							</a>
							<a href="#instructors" className="hover:text-[#1f497c] text-gray-700 font-light transition">
								{tNav("instructors")}
							</a>
						</nav>
						<LanguageSwitcher />
					</div>
				</div>
			</header>

			{/* Hero Section */}
			{/* CHANGE: Ensure the section has enough top padding to clear the fixed header 
               and uses flex-grow to occupy space without being 'locked'.
            */}
			<section className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-4 px-6 pt-32 text-center sm:flex-row sm:pt-45 sm:text-left">
				{/* Left Side */}
				<div className="flex flex-2 flex-col items-center sm:items-start">
					<h1 className={clsx("text-[2.7rem] font-extrabold tracking-tight text-white sm:text-5xl leading-[1.1] lg:leading-[1.2]", currentLocale === "ja" ? "lg:text-[3rem]" : "lg:text-[3.5rem]")}>
						{tHome.rich("HeroSection.heading", {
							blue: (chunks) => <span className="text-[#1f497c]">{chunks}</span>,
							br: () => <br />,
							div: (chunks) => <span>{chunks}</span>,
							u: (chunks) => <u className="relative no-underline inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[3px] after:bg-gradient-to-r after:from-[#1f497c] after:to-transparent after:rounded-full">{chunks}</u>,
							i: (chunks) => <span className="italic">{chunks}</span>,
						})}
					</h1>
					<p className={clsx("mt-10 max-w-xl text-lg text-gray-200", currentLocale === "ja" ? "lg:text-base" : "lg:text-[17px]")}>{tHome("HeroSection.subheading")}</p>

					<div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:justify-start">
						<Link href={getLink("freeTrial", currentLocale)} className="group inline-flex items-center gap-2 rounded-full bg-[#d74100] px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#b03601]">
							<span>{tHome("HeroSection.heroCTA")}</span>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1">
								<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
							</svg>
						</Link>

						<a href="#programs" className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-lg font-medium text-white transition hover:border-gray-500 hover:text-gray-600">
							{tHome("HeroSection.heroSecondaryCTA")}
						</a>
					</div>
				</div>

				{/* Right Side */}
				<div className="flex-1 flex flex-col items-center sm:items-center px-2 sm:px-0 mt-12 sm:mt-0">
					<div className="flex w-[300px] sm:w-[400px] md:w-[400px] gap-3 mb-4">
						{["/img/jon_hero2.png", "/img/nana_hero2.png", "/img/usa_hero2.png"].map((src, i) => (
							<div
								key={i}
								className="relative flex-1 aspect-square rounded-3xl overflow-hidden border border-white"
								style={{
									animation: `floatStair 6s ease-in-out infinite`,
									animationDelay: `${i * 0.5}s`,
								}}
							>
								<Image src={src} alt={`Small ${i + 1}`} fill className="object-cover" />
							</div>
						))}
					</div>

					<div
						className="mb-5 relative w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[300px] rounded-4xl overflow-hidden shadow-2xl border border-white"
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
