"use client";

import { useState } from "react";

interface BookingInfo {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	message: string;
}

interface BookingFormProps {
	data: { date: string; time: string };
	onBack: () => void;
	onSubmit: (info: BookingInfo) => void;
}

export default function BookingForm({ data, onBack, onSubmit }: BookingFormProps) {
	const [form, setForm] = useState<BookingInfo>({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		message: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(form);
	};

	return (
		<div className="p-8">
			<h2 className="text-2xl font-semibold text-blue-900 mb-4">Confirm Your Booking</h2>

			<p className="text-gray-700 mb-6">
				Selected Date: <strong>{data.date}</strong> — Time: <strong>{data.time}</strong>
			</p>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							First Name <span className="text-red-500">*</span>
						</label>
						<input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className="mt-1 w-full border border-blue-400 rounded-lg px-3 py-2" />
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Last Name <span className="text-red-500">*</span>
						</label>
						<input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className="mt-1 w-full border border-blue-400 rounded-lg px-3 py-2" />
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Email <span className="text-red-500">*</span>
					</label>
					<input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 w-full border border-blue-400 rounded-lg px-3 py-2" />
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Phone <span className="text-gray-400 text-xs">(optional)</span>
					</label>
					<input type="tel" name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Message <span className="text-gray-400 text-xs">(optional)</span>
					</label>
					<textarea name="message" rows={3} value={form.message} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
				</div>

				<div className="flex justify-between items-center mt-6">
					<button type="button" onClick={onBack} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100">
						Back
					</button>

					<button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
						Confirm Booking
					</button>
				</div>
			</form>
		</div>
	);
}
