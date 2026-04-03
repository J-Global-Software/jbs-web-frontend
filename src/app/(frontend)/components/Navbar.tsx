"use client";

import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
	return (
		<nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
			<div className="text-lg font-semibold">J-Global</div>
			<LanguageSwitcher />
		</nav>
	);
}
