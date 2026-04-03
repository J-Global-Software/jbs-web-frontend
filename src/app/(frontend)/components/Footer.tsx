"use client";

import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Link from "next/link";

interface FooterProps {
	data?: any;
}

export default function Footer({ data }: FooterProps) {
	const [year, setYear] = useState<string>(""); // Start empty to match server

	useEffect(() => {
		setYear(new Date().getFullYear().toString());
	}, []);

	// Return a skeleton during SSR if data is missing to maintain layout
	if (!data) return <footer className="bg-gray-50 h-20" />;

	const { companyName, officeAddress, contactEmail, phoneNumber, labels } = data;

	return (
		<footer className="bg-gray-50 border-t border-gray-200">
			{/* IMPORTANT: This prevents extensions from breaking hydration by auto-linking phone numbers */}
			<meta name="format-detection" content="telephone=no" />

			<div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-700">
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-3">{labels?.company}</h3>
					<p className="text-sm leading-relaxed">
						<strong>{companyName}</strong>
					</p>
				</div>

				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-3">{labels?.office}</h3>
					<p className="text-sm leading-relaxed whitespace-pre-line">{officeAddress}</p>
				</div>

				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-3">{labels?.contact}</h3>
					<ul className="space-y-2 text-sm">
						<li>
							<span className="font-medium">{labels?.call}:</span> {phoneNumber}
						</li>
						<li>
							<span className="font-medium">{labels?.email}:</span>{" "}
							<a href={`mailto:${contactEmail}`} className="text-blue-600 hover:underline">
								{contactEmail}
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-3">{labels?.links}</h3>
					<ul className="space-y-2 text-sm">
						<li>
							<Link href="/contact-us/" className="hover:text-blue-600 transition">
								{labels?.contactUs}
							</Link>
						</li>
						<li>
							<Link href="/privacy-policy/" className="hover:text-blue-600 transition">
								{labels?.privacyPolicy}
							</Link>
						</li>
						<li>
							<Link href="/company-profile/" className="hover:text-blue-600 transition">
								{labels?.companyProfile}
							</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="border-t border-gray-200">
				<div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
					<div className="flex items-center gap-2">
						<img src="/logo.avif" alt="JBS Logo" className="h-10 w-auto object-contain" />
					</div>

					<div className="flex items-center gap-4 text-gray-500 text-xl">
						<a href="https://www.facebook.com/JGlobalInc" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
							<FaFacebookF />
						</a>
						<a href="https://www.instagram.com/jglobal_bizschool/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition">
							<FaInstagram />
						</a>
					</div>

					{/* Use suppressHydrationWarning if the year is critical to render immediately */}
					<p className="text-center md:text-right text-gray-500" suppressHydrationWarning>
						© {year || new Date().getFullYear()} j-globalbizschool.com {labels?.copyright}.
					</p>
				</div>
			</div>
		</footer>
	);
}
