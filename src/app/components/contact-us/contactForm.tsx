"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import Turnstile from "react-turnstile";

export default function ContactForm() {
	const [token, setToken] = useState<string | null>(null);
	const locale = useLocale();
	const t = useTranslations("contact");
	const [loading, setLoading] = useState(false);
	const [appearance, setAppearance] = useState<"interaction-only" | "always">("interaction-only");

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!token) {
			toast.error("Please complete the security check");
			return;
		}

		const form = e.currentTarget;

		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		setLoading(true);

		try {
			const formData = new FormData(form);

			const res = await fetch("/api/contact/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					firstName: formData.get("firstName"),
					lastName: formData.get("lastName"),
					email: formData.get("email"),
					message: formData.get("message"),
					confirmEmail: formData.get("confirmEmail"), // Honeypot field for bots, should be empty
					cfToken: token, // Pass the token to the backend
				}),
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data?.error || "Request failed");
			}

			toast.success(t("form.success"));
			form.reset();
		} catch {
			toast.error(t("form.error"));
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="bg-white rounded-4xl border border-gray-300 shadow-xl p-4 sm:p-8">
			<h2 className="text-2xl font-semibold mb-8">{t("form.title")}</h2>

			<form className="grid gap-6" onSubmit={handleSubmit}>
				{["firstName", "lastName", "email"].map((name) => (
					<div key={name} className="relative">
						<label className="absolute -top-2 left-3 bg-white px-1 text-sm font-medium text-gray-700">
							{t(`form.${name}`)}
							<span className="text-red-500 ml-1">*</span>
						</label>
						<input name={name} type={name === "email" ? "email" : "text"} required minLength={1} maxLength={50} autoComplete={name === "email" ? "email" : name === "firstName" ? "given-name" : "family-name"} className="input" />
					</div>
				))}

				<input type="text" name="confirmEmail" tabIndex={-1} autoComplete="off" className="sr-only" />

				<div className="relative">
					<label className="absolute -top-2 left-3 bg-white px-1 text-sm font-medium text-gray-700">
						{t("form.message")}
						<span className="text-red-500 ml-1">*</span>
					</label>
					<textarea name="message" required minLength={10} maxLength={2000} rows={5} className="input resize-none" />
				</div>

				<button type="submit" disabled={loading} className="flex justify-center items-center gap-2 rounded-full bg-[#1f497c] text-white px-10 py-3 font-medium shadow-lg disabled:opacity-50">
					<Send className="w-4 h-4" />
					{loading ? t("form.sending") : t("form.send")}
				</button>
				<div className="my-4 flex justify-center">
					<Turnstile
						sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
						language={locale}
						theme="light"
						appearance={appearance}
						onVerify={(token) => {
							setToken(token);
							// Optional: hide it again once verified if you want
						}}
						onError={() => {
							// If security fails, force the widget to show up
							setAppearance("always");
						}}
					/>
				</div>
			</form>

			<style jsx>{`
				.input {
					width: 100%;
					border-radius: 0.75rem;
					border: 1px solid #cbd5f5;
					padding: 0.75rem 1rem;
				}
			`}</style>
		</div>
	);
}
