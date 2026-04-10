import OnboardingForm from "@/app/components/free-trial-onboarding/OnboardingForm";

export default function OnboardingPage() {
	return (
		<section className="flex min-h-screen items-start justify-center bg-[#f8fafc] px-3 pt-14 pb-12 sm:px-4 sm:pt-20 sm:pb-20">
			<div className="max-w-3xl w-full">
				<OnboardingForm />
			</div>
		</section>
	);
}
