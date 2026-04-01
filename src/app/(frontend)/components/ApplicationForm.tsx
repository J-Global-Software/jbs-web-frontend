"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { submitFreeTrialForm } from "@/lib/freeTrialFormService";

export default function ApplicationForm({ onClose }: { onClose: () => void }) {
	const t = useTranslations("freeTrialForm");
	const locale = useLocale();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			await submitFreeTrialForm(formData, locale);
			setSuccess(true);
			setFormData({ firstName: "", lastName: "", email: "" });
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unexpected error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6 bg-white rounded-xl shadow-lg max-w-md w-full">
			{success ? (
				<p className="text-green-600">{t("success")}</p>
			) : (
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">{t("firstName")}</label>
							<input name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">{t("lastName")}</label>
							<input name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">{t("email")}</label>
						<input name="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
					</div>

					{error && <p className="text-red-600 text-sm">{error}</p>}

					<div className="flex justify-end gap-3 pt-2">
						<button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm">
							Cancel
						</button>
						<button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-[#d74100] text-white hover:bg-[#c23a00] text-sm">
							{loading ? "Sending..." : t("submit")}
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
