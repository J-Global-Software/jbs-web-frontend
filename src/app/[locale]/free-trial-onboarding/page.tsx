"use client";

import OnboardingForm from "@/app/components/free-trial-onboarding/OnboardingForm";

export default function OnboardingPage() {
	return (
		<section className="flex justify-center items-start pt-20 px-4 pb-20 bg-[#f8fafc] min-h-screen">
			<div className="max-w-3xl w-full">
				<OnboardingForm />
			</div>
		</section>
	);
}