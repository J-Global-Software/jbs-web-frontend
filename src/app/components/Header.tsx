"use client";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
	return (
		<header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
				<Link href="/" className="flex items-center">
					<Image src="/logo.avif" alt="J-Global Logo" width={120} height={40} priority />
				</Link>
				<LanguageSwitcher />
			</div>
		</header>
	);
}
