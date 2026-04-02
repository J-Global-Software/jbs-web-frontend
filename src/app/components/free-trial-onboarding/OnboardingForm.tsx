"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

type StepKey = "1" | "2" | "3" | "4" | "5";
type OptionKey = string;

const TOTAL_STEPS = 5;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ROLE_OPTION_KEYS = ["nonJapaneseProfessional", "japaneseProfessionalGlobalRole", "midCareerLeadership", "globalCommunicationInJapanese", "globalSkillsJapaneseBase", "other"] as const;
const GOAL_OPTION_KEYS = ["betterCommunication", "interculturalUnderstanding", "teamworkCollaboration", "leadershipStrategy", "englishConfidence", "careerProgression", "globalSuccessInJapanese"] as const;
const SCHEDULE_OPTION_KEYS = ["earlyMornings", "midday", "evenings", "weekends"] as const;
const HEAR_ABOUT_US_OPTION_KEYS = ["googleSearch", "colleagueOrFriend", "linkedIn", "xTwitter", "facebook", "instagram", "article", "recommendation", "other"] as const;

const INPUT_CLASS_NAME =
	"w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-[#1f497c] focus:ring-4 focus:ring-[#1f497c]/10";

const CARD_CLASS = (selected: boolean) =>
	`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${
		selected
			? "border-[#1f497c] bg-[#1f497c]/10"
			: "border-slate-200 bg-white hover:border-[#1f497c]/35 hover:bg-slate-50"
	}`;

const DOT_CLASS = (selected: boolean) =>
	`h-8 w-8 rounded-full border-2 ${selected ? "border-[#1f497c] bg-[#1f497c]" : "border-slate-300 bg-white"}`;

const toggleStringInArray = (items: string[], value: string) => {
	if (items.includes(value)) {
		return items.filter((item) => item !== value);
	}
	return [...items, value];
};

export default function OnboardingForm() {
	const t = useTranslations("freeTrialForm.onboarding");

	const [step, setStep] = useState(1);
	const [isCompleted, setIsCompleted] = useState(false);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [workEmail, setWorkEmail] = useState("");
	const [company, setCompany] = useState("");

	const [selectedRole, setSelectedRole] = useState<string | null>(null);
	const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
	const [selectedSchedule, setSelectedSchedule] = useState<string[]>([]);
	const [englishLevel, setEnglishLevel] = useState("");
	const [weeklyHours, setWeeklyHours] = useState("");
	const [hearAboutUs, setHearAboutUs] = useState("");
	const [agreedToPolicy, setAgreedToPolicy] = useState(false);

	const [stepOneError, setStepOneError] = useState("");
	const [stepTwoError, setStepTwoError] = useState("");
	const [stepThreeError, setStepThreeError] = useState("");
	const [stepFourError, setStepFourError] = useState("");
	const [stepFiveError, setStepFiveError] = useState("");

	const progress = Math.round((step / TOTAL_STEPS) * 100);
	const currentStepKey = String(step) as StepKey;
	const englishLevelOptions = t.raw("englishLevelOptions") as string[];
	const weeklyHoursOptions = t.raw("weeklyHoursOptions") as string[];
	const progressLabel = t("progress.stepOf", { step, total: TOTAL_STEPS });
	const completedProgressLabel = t("progress.stepOf", { step: TOTAL_STEPS, total: TOTAL_STEPS });
	const welcomeName = firstName.trim() || t("completion.fallbackName");
	const primaryButtonLabel = step === 5 ? t("buttons.complete") : t("buttons.continue");
	const headerTitle = t(`steps.${currentStepKey}.title`);
	const headerSubtitle = t(`steps.${currentStepKey}.subtitle`);

	const clearStepOneError = () => setStepOneError("");
	const clearStepTwoError = () => setStepTwoError("");
	const clearStepThreeError = () => setStepThreeError("");
	const clearStepFourError = () => setStepFourError("");
	const clearStepFiveError = () => setStepFiveError("");

	const renderErrorMessage = (message: string) => {
		if (!message) return null;

		return <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{message}</p>;
	};

	const renderLogoLink = () => (
		<Link href="/" className="inline-flex shrink-0 items-center" aria-label={t("goToHomepage")}>
			<Image src="/logo.avif" alt={t("logoAlt")} width={120} height={40} className="h-auto w-28 object-contain" />
		</Link>
	);

	const renderSelectionCard = ({
		title,
		subtitle,
		isSelected,
		onClick,
		badge,
		titleClassName = "text-base font-semibold text-slate-800",
		subtitleClassName = "mt-1 text-sm text-slate-600",
	}: {
		title: string;
		subtitle: string;
		isSelected: boolean;
		onClick: () => void;
		badge?: string;
		titleClassName?: string;
		subtitleClassName?: string;
	}) => (
		<button type="button" onClick={onClick} className={CARD_CLASS(isSelected)}>
			{badge && <div className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 text-xs font-bold text-slate-700">{badge}</div>}
			<div className="flex-1">
				<p className={titleClassName}>{title}</p>
				<p className={subtitleClassName}>{subtitle}</p>
			</div>
			<div className={DOT_CLASS(isSelected)} />
		</button>
	);

	const getRoleTitle = (optionKey: OptionKey) => t(`roleOptions.${optionKey}.title`);
	const getRoleSubtitle = (optionKey: OptionKey) => t(`roleOptions.${optionKey}.subtitle`);
	const getGoalTitle = (optionKey: OptionKey) => t(`goalOptions.${optionKey}.title`);
	const getGoalSubtitle = (optionKey: OptionKey) => t(`goalOptions.${optionKey}.subtitle`);
	const getScheduleTitle = (optionKey: OptionKey) => t(`scheduleOptions.${optionKey}.title`);
	const getScheduleSubtitle = (optionKey: OptionKey) => t(`scheduleOptions.${optionKey}.subtitle`);
	const getScheduleBadge = (optionKey: OptionKey) => t(`scheduleOptions.${optionKey}.badge`);

	const handleRoleSelect = (optionKey: string) => {
		setSelectedRole(optionKey);
		clearStepTwoError();
	};

	const handleGoalToggle = (optionKey: string) => {
		setSelectedGoals((currentGoals) => toggleStringInArray(currentGoals, optionKey));
		clearStepThreeError();
	};

	const handleScheduleToggle = (optionKey: string) => {
		setSelectedSchedule((currentSchedule) => toggleStringInArray(currentSchedule, optionKey));
		clearStepFourError();
	};

	const validateStepOne = () => {
		if (!firstName.trim() || !lastName.trim() || !workEmail.trim()) {
			setStepOneError(t("errors.stepOneRequired"));
			return false;
		}

		if (!EMAIL_PATTERN.test(workEmail.trim())) {
			setStepOneError(t("errors.invalidEmail"));
			return false;
		}

		setStepOneError("");
		return true;
	};

	const validateStepTwo = () => {
		if (!selectedRole) {
			setStepTwoError(t("errors.stepTwoRequired"));
			return false;
		}

		setStepTwoError("");
		return true;
	};

	const validateStepThree = () => {
		if (selectedGoals.length === 0) {
			setStepThreeError(t("errors.stepThreeRequired"));
			return false;
		}

		setStepThreeError("");
		return true;
	};

	const validateStepFour = () => {
		if (!englishLevel || !weeklyHours || selectedSchedule.length === 0) {
			setStepFourError(t("errors.stepFourRequired"));
			return false;
		}

		setStepFourError("");
		return true;
	};

	const validateStepFive = () => {
		if (!hearAboutUs) {
			setStepFiveError(t("errors.stepFiveSourceRequired"));
			return false;
		}

		if (!agreedToPolicy) {
			setStepFiveError(t("errors.stepFivePolicyRequired"));
			return false;
		}

		setStepFiveError("");
		return true;
	};

	const nextStep = () => {
		if (step === 1 && !validateStepOne()) return;
		if (step === 2 && !validateStepTwo()) return;
		if (step === 3 && !validateStepThree()) return;
		if (step === 4 && !validateStepFour()) return;

		if (step === 5) {
			if (!validateStepFive()) return;
			setIsCompleted(true);
			return;
		}

		setStep((currentStep) => Math.min(currentStep + 1, TOTAL_STEPS));
	};

	const prevStep = () => setStep((currentStep) => Math.max(currentStep - 1, 1));

	if (isCompleted) {
		return (
			<div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
				<div className="bg-gradient-to-r from-[#1f497c] to-[#3276e3] px-8 py-6 text-white">
					<div className="flex items-start justify-between gap-4">
						<div className="pt-3">
							<h1 className="text-3xl font-extrabold tracking-tight">{t("completion.title")}</h1>
						</div>
						{renderLogoLink()}
					</div>
				</div>

				<div className="space-y-8 p-8">
					<div className="space-y-2">
						<div className="flex flex-nowrap items-center justify-between gap-4 text-sm font-semibold text-slate-600">
							<p className="whitespace-nowrap">{completedProgressLabel}</p>
							<p className="whitespace-nowrap">100%</p>
						</div>
						<div className="h-2 w-full rounded-full bg-slate-200">
							<div className="h-full w-full rounded-full bg-[#d74100]" />
						</div>
					</div>

					<div className="space-y-4 text-center">
						<p className="text-4xl font-extrabold tracking-tight text-slate-900">{t("completion.welcome", { name: welcomeName })}</p>
						<p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-600">{t("completion.description")}</p>
					</div>

					<div className="pt-2 text-center">
						<Link
							href="/"
							className="inline-flex items-center justify-center rounded-full bg-[#d74100] px-8 py-3 text-lg font-bold text-white shadow-md transition hover:bg-[#b73600]"
						>
							{t("completion.accessTrial")}
						</Link>
					</div>

					<p className="text-center text-lg text-slate-600">
						{t("completion.bookCoachingPrompt")}{" "}
						<Link href="/free-coaching" className="font-bold text-[#1f497c] transition hover:text-[#3276e3]">
							{t("completion.scheduleCall")}
						</Link>
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
			<div className="bg-gradient-to-r from-[#1f497c] to-[#3276e3] px-8 py-6 text-white">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h1 className="text-2xl font-extrabold tracking-tight">{headerTitle}</h1>
						<p className="mt-1 text-sm text-blue-100">{headerSubtitle}</p>
					</div>
					{renderLogoLink()}
				</div>
			</div>

			<div className="space-y-8 p-8">
				<div className="space-y-2">
					<div className="flex flex-nowrap items-center justify-between gap-4 text-sm font-semibold text-slate-600">
						<p className="whitespace-nowrap">{progressLabel}</p>
						<p className="whitespace-nowrap">{progress}%</p>
					</div>
					<div className="h-2 w-full rounded-full bg-slate-200">
						<div className="h-full rounded-full bg-[#d74100] transition-all duration-300" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}></div>
					</div>
				</div>

				{step === 1 && (
					<div className="space-y-4">
						<input
							type="text"
							placeholder={t("fields.firstName")}
							value={firstName}
							onChange={(event) => setFirstName(event.target.value)}
							className={INPUT_CLASS_NAME}
						/>
						<input
							type="text"
							placeholder={t("fields.lastName")}
							value={lastName}
							onChange={(event) => setLastName(event.target.value)}
							className={INPUT_CLASS_NAME}
						/>
						<input
							type="email"
							placeholder={t("fields.workEmail")}
							value={workEmail}
							onChange={(event) => {
								setWorkEmail(event.target.value);
								clearStepOneError();
							}}
							className={INPUT_CLASS_NAME}
						/>
						<input
							type="text"
							placeholder={t("fields.company")}
							value={company}
							onChange={(event) => setCompany(event.target.value)}
							className={INPUT_CLASS_NAME}
						/>
						{renderErrorMessage(stepOneError)}
					</div>
				)}

				{step === 2 && (
					<div className="space-y-4">
						{ROLE_OPTION_KEYS.map((optionKey) => {
							const isSelected = selectedRole === optionKey;

							return (
								<div key={optionKey}>
									{renderSelectionCard({
										title: getRoleTitle(optionKey),
										subtitle: getRoleSubtitle(optionKey),
										isSelected,
										onClick: () => handleRoleSelect(optionKey),
										subtitleClassName: "mt-1 text-xs text-slate-600",
									})}
								</div>
							);
						})}
						{renderErrorMessage(stepTwoError)}
					</div>
				)}

				{step === 3 && (
					<div className="space-y-4">
						<p className="text-sm font-medium text-slate-600">{t("stepThree.helper")}</p>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{GOAL_OPTION_KEYS.map((optionKey) => {
								const isSelected = selectedGoals.includes(optionKey);

								return (
									<div key={optionKey}>
										{renderSelectionCard({
											title: getGoalTitle(optionKey),
											subtitle: getGoalSubtitle(optionKey),
											isSelected,
											onClick: () => handleGoalToggle(optionKey),
										})}
									</div>
								);
							})}
						</div>
						{renderErrorMessage(stepThreeError)}
					</div>
				)}

				{step === 4 && (
					<div className="space-y-6">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<label className="block text-sm font-semibold text-slate-700">{t("fields.englishLevel")}</label>
								<select
									value={englishLevel}
									onChange={(event) => {
										setEnglishLevel(event.target.value);
										clearStepFourError();
									}}
									className={INPUT_CLASS_NAME}
								>
									<option value="" disabled>
										{t("fields.englishLevelPlaceholder")}
									</option>
									{englishLevelOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>

							<div className="space-y-2">
								<label className="block text-sm font-semibold text-slate-700">{t("fields.weeklyHours")}</label>
								<select
									value={weeklyHours}
									onChange={(event) => {
										setWeeklyHours(event.target.value);
										clearStepFourError();
									}}
									className={INPUT_CLASS_NAME}
								>
									<option value="" disabled>
										{t("fields.weeklyHoursPlaceholder")}
									</option>
									{weeklyHoursOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="space-y-3">
							<h3 className="text-2xl font-extrabold tracking-tight text-slate-800">{t("stepFour.scheduleTitle")}</h3>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								{SCHEDULE_OPTION_KEYS.map((optionKey) => {
									const isSelected = selectedSchedule.includes(optionKey);

									return (
										<div key={optionKey}>
											{renderSelectionCard({
												title: getScheduleTitle(optionKey),
												subtitle: getScheduleSubtitle(optionKey),
												isSelected,
												onClick: () => handleScheduleToggle(optionKey),
												badge: getScheduleBadge(optionKey),
												titleClassName: "text-xl font-semibold leading-tight text-slate-900",
												subtitleClassName: "mt-1 text-base text-slate-600",
											})}
										</div>
									);
								})}
							</div>
						</div>

						{renderErrorMessage(stepFourError)}
					</div>
				)}

				{step === 5 && (
					<div className="space-y-4">
						<div className="space-y-2">
							<label className="block text-sm font-semibold text-slate-700">{t("fields.hearAboutUs")}</label>
							<select
								value={hearAboutUs}
								onChange={(event) => {
									setHearAboutUs(event.target.value);
									clearStepFiveError();
								}}
								className={INPUT_CLASS_NAME}
							>
								<option value="" disabled>
									{t("fields.hearAboutUsPlaceholder")}
								</option>
								{HEAR_ABOUT_US_OPTION_KEYS.map((optionKey) => (
									<option key={optionKey} value={optionKey}>
										{t(`hearAboutUsOptions.${optionKey}`)}
									</option>
								))}
							</select>
						</div>

						<textarea placeholder={t("fields.notes")} className={`${INPUT_CLASS_NAME} h-32`}></textarea>

						<div className="flex items-start gap-2">
							<input
								id="agree"
								type="checkbox"
								checked={agreedToPolicy}
								onChange={(event) => {
									setAgreedToPolicy(event.target.checked);
									if (event.target.checked) {
										clearStepFiveError();
									}
								}}
								className="mt-1 h-4 w-4 accent-[#d74100]"
							/>
							<label htmlFor="agree" className="text-sm text-slate-600">
								{t.rich("policy.text", {
									br: () => <br />,
									link: (chunks) => (
										<Link href="/privacy-policy/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1f497c] underline transition hover:text-[#3276e3]">
											{chunks}
										</Link>
									),
								})}
							</label>
						</div>
						{renderErrorMessage(stepFiveError)}
					</div>
				)}

				<div className="flex justify-between pt-6">
					<button
						onClick={prevStep}
						disabled={step === 1}
						className="rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition hover:text-[#1f497c] disabled:cursor-not-allowed disabled:opacity-40"
					>
						{t("buttons.back")}
					</button>

					<button onClick={nextStep} className="rounded-full bg-[#d74100] px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#b73600]">
						{primaryButtonLabel}
					</button>
				</div>
			</div>
		</div>
	);
}
