"use client";

import { useScroll } from "@/app/hoooks/useScroll";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";

export default function WorkshopDetailHeader() {
	const scrolled = useScroll(10);

	return (
		<header className={`fixed top-0 left-0 right-0 z-50 mx-auto flex w-full items-center justify-between px-6 py-2 transition-colors duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
			<div className="max-w-7xl flex w-full items-center justify-between mx-auto">
				<Link href="/" className="flex items-center">
					<Image src="/logo.avif" alt="Prebuilt UI Logo" width={120} height={40} className="h-auto w-24 sm:w-32 md:w-32 object-contain" priority />
				</Link>
				<div className="flex items-center space-x-4">
					<LanguageSwitcher />
				</div>
			</div>
		</header>
	);
}
