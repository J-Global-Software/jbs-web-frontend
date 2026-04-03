"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";
import { getLink } from "@/utils/helpers";
import { clsx } from "clsx";
import { useScroll } from "../../hoooks/useScroll";
import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import { useLocale } from "next-intl";

// Defining the props to accept data from Payload and the current locale
export interface HeroSectionProps {
	data?: {
		heading?: string;
		subheading?: string;
		heroCTA?: string;
		heroSecondaryCTA?: string;
	};
	navbarData?: {
		links?: {
			why?: string;
			programs?: string;
			pricing?: string;
			instructors?: string;
		};
	};
	locale: string;
}

export default function HeroSection({ data, navbarData, locale }: HeroSectionProps) {
	const scrolled = useScroll(10);
	const currentLocale = useLocale();

	// Fallbacks to your original content if CMS data is missing
	const headingText = data?.heading;
	const subheadingText = data?.subheading;
	const heroCTA = data?.heroCTA;
	const heroSecondaryCTA = data?.heroSecondaryCTA;

	// This options object replicates the "rich" text logic from next-intl
	// ensuring your custom tags <blue>, <u>, <i> render with exact Tailwind classes.
	const options: HTMLReactParserOptions = {
		replace: (domNode: any) => {
			if (domNode.type === "tag") {
				if (domNode.name === "blue") {
					return <span className="text-[#1f497c]">{domToReact(domNode.children, options)}</span>;
				}
				if (domNode.name === "u") {
					return <u className="relative no-underline inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[3px] after:bg-gradient-to-r after:from-[#1f497c] after:to-transparent after:rounded-full">{domToReact(domNode.children, options)}</u>;
				}
				if (domNode.name === "i") {
					return <span className="italic">{domToReact(domNode.children, options)}</span>;
				}
				if (domNode.name === "br") {
					return <br />;
				}
				if (domNode.name === "div") {
					return <span>{domToReact(domNode.children, options)}</span>;
				}
			}
		},
	};

	return (
		<div className="relative flex flex-col overflow-hidden pb-24 ">
			{/* Background Image - Exactly as before */}
			<div className="absolute inset-0 -z-20">
				<Image src="/img/sun-tornado.svg" alt="Background pattern" fill className="object-cover" priority style={{ opacity: 0.55 }} />
			</div>

			{/* Navbar - Exactly as before */}
			<header className={`fixed top-0 left-0 right-0 z-50 mx-auto flex w-full items-center justify-between px-6 py-2 transition-colors duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
				<div className="max-w-7xl flex w-full items-center justify-between mx-auto">
					<Link href="/" className="flex items-center">
						<Image src="/logo.avif" alt="Prebuilt UI Logo" width={120} height={40} className="h-auto w-24 sm:w-32 md:w-32 object-contain" priority />
					</Link>
					<div className="flex items-center gap-6">
						<nav className="hidden md:flex items-center gap-6 text-base font-semibold">
							<a href="#why-jbs" className="hover:text-[#1f497c] text-gray-700 font-light transition">
								{navbarData?.links?.why}
							</a>
							<a href="#programs" className="hover:text-[#1f497c] text-gray-700 font-light transition">
								{navbarData?.links?.programs}
							</a>
							<a href="#pricing" className="hover:text-[#1f497c] text-gray-700 font-light transition">
								{navbarData?.links?.pricing}
							</a>
							<a href="#instructors" className="hover:text-[#1f497c] text-gray-700 font-light transition">
								{navbarData?.links?.instructors}
							</a>
						</nav>
						<LanguageSwitcher />
					</div>
				</div>
			</header>

			{/* Hero Section - Restored locale-based class logic */}
			<section className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-4 px-6 pt-32 text-center sm:flex-row sm:pt-45 sm:text-left">
				{/* Left Side */}
				<div className="flex flex-2 flex-col items-center sm:items-start">
					<h1 className={clsx("text-[2.7rem] font-extrabold tracking-tight text-white sm:text-5xl leading-[1.1] lg:leading-[1.2]", currentLocale === "ja" ? "lg:text-[3rem]" : "lg:text-[3.5rem]")}>{parse(headingText!, options)}</h1>
					<p
						className={clsx(
							"mt-10 max-w-xl text-lg text-gray-200 whitespace-pre-line", // Added whitespace-pre-line
							locale === "ja" ? "lg:text-base" : "lg:text-[17px]",
						)}
					>
						{subheadingText}
					</p>

					<div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:justify-start">
						<Link href={getLink("freeTrial", currentLocale)} className="group inline-flex items-center gap-2 rounded-full bg-[#d74100] px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#b03601]">
							<span>{heroCTA}</span>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1">
								<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
							</svg>
						</Link>

						<a href="#programs" className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-lg font-medium text-white transition hover:border-gray-500 hover:text-gray-600">
							{heroSecondaryCTA}
						</a>
					</div>
				</div>

				{/* Right Side - Animation and Styling Restored */}
				<div className="flex-1 flex flex-col items-center sm:items-center px-2 sm:px-0 mt-12 sm:mt-0">
					<div
						className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[450px] rounded-4xl overflow-hidden shadow-2xl border border-white"
						style={{
							animation: `floatBig 7s ease-in-out infinite`,
						}}
					>
						<Image src="/img/girl2.avif" alt="Students collaborating" fill className="object-cover" priority />
					</div>
				</div>
			</section>
		</div>
	);
}
