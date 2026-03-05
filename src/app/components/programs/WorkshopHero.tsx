"use client";

import Image from "next/image";
import { useState } from "react";
import { FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getProgramLinkRegister } from "@/utils/helpers";
import { WorkshopSession } from "./WorkshopSessions";
import { useLocale, useTranslations } from "next-intl";
import RegistrationForm, { RegistrationFormData } from "./registrationFormBiznite";

interface WorkshopHeroProps {
    title: string;
    subtitle: string;
    image: string;
    code: string;
    levelLabel: string;
    registerNowLabel: string;
    readMoreLabel: string;
    readLessLabel: string;
    locale: string;
    sessions: WorkshopSession[];
    isBiznite?: boolean;
}

export default function WorkshopHero({ 
    title, subtitle, image, code, levelLabel, registerNowLabel, 
    readMoreLabel, readLessLabel, locale, sessions, isBiznite 
}: WorkshopHeroProps) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const messages = useTranslations("homepage.workshopHero.modal");
console.log("Check key:", messages("successTitle"));
    
    const localeClient = useLocale();
    const t = useTranslations("homepage.workshopHero.modal");

    const hasSingleDate = sessions?.length === 1 && sessions[0].dates?.length === 1;

    const rawDate = sessions?.[0]?.dates?.[0]?.date;
    const formattedDate = rawDate ? new Intl.DateTimeFormat(localeClient, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(rawDate)) : "";

    const closeModal = () => {
        setIsOpen(false);
        // Delay resetting success state so user doesn't see it flip back while modal is fading out
        setTimeout(() => setIsSuccess(false), 300);
    };

    /**
     * HANDLES THE ACTUAL API SUBMISSION
     */
    const handleFormSubmit = async (formData: RegistrationFormData): Promise<void> => {
        setIsSubmitting(true);
        try {
            const eventInfo = sessions[0].dates[0];

            const response = await fetch('/api/program/biznites/register', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-locale': localeClient 
                },
                body: JSON.stringify({
                   ...formData,
                    programCode: code,
                    eventName: title,
                    eventDate: eventInfo.date,
                    eventTime: eventInfo.startTime,
                    eventEndTime: eventInfo.endTime,
                    eventId: eventInfo.id,
                    zoomUrl: eventInfo.zoomLink
                }),
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(errorBody.error || "REGISTRATION_FAILED");
            }

            // Move to success view instead of alert
            setIsSuccess(true);

        } catch (error: unknown) {
            console.error("Registration failed:", error);
            alert(error instanceof Error ? error.message : "An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative overflow-hidden bg-[#77acfb]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4a88e6] to-[#9dc5fc]" />

            <div
                className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url('/img/dio.png')` }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 lg:pt-24 lg:pb-32">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="relative order-1 lg:order-2 flex justify-center">
                        <div className="relative w-[85%] lg:w-full max-w-[400px] lg:max-w-none">
                            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white/30 bg-blue-100">
                                <div className="relative aspect-[3/1.7] lg:aspect-[16/9] w-full">
                                    <Image src={image} alt={title} fill className="object-contain" priority sizes="(max-width: 768px) 85vw, 50vw" />
                                </div>
                            </div>
                            {levelLabel && (
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap px-4 py-1.5 rounded-full bg-white text-[#4a88e6] text-[11px] font-black uppercase tracking-wider shadow-md border border-blue-50">
                                    {levelLabel}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-5 text-center lg:text-left order-2 lg:order-1">
                        <div className="space-y-3">
                            <h1 className="text-2xl lg:text-5xl font-bold text-white leading-tight drop-shadow-sm px-2 lg:px-0">
                                {title} ({code})
                            </h1>
                            {subtitle && (
                                <div className="text-sm lg:text-base text-blue-50 font-medium px-4 lg:px-0">
                                    <div className={expanded ? "" : "line-clamp-2"}>{subtitle}</div>
                                    {subtitle.length > 100 && (
                                        <button className="mt-2 text-[11px] font-bold text-white underline flex items-center gap-1 mx-auto lg:mx-0 opacity-80" onClick={() => setExpanded(!expanded)}>
                                            {expanded ? <><FaChevronUp /> {readLessLabel}</> : <><FaChevronDown /> {readMoreLabel}</>}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {sessions?.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex justify-center lg:justify-start pt-2">
                                    {hasSingleDate ? (
                                        <button
                                            onClick={() => setIsOpen(true)}
                                            className="bg-[#d74100] md:text-xl text-white px-7 py-2.5 rounded-full font-bold shadow-lg flex items-center gap-2 text-base active:scale-95 transition-transform"
                                        >
                                            {registerNowLabel}
                                            <FaArrowRight className="text-sm" />
                                        </button>
                                    ) : (
                                        <a
                                            href={getProgramLinkRegister(code, locale)}
                                            className="bg-[#d74100] md:text-xl text-white px-7 py-2.5 rounded-full font-bold shadow-lg flex items-center gap-2 text-base active:scale-95 transition-transform"
                                        >
                                            {registerNowLabel}
                                            <FaArrowRight className="text-sm" />
                                        </a>
                                    )}
                                </div>

                                {hasSingleDate && isBiznite && (
                                    <div className="mt-3 text-sm text-blue-50 font-medium">
                                        {formattedDate}
                                        <br />
                                        {sessions[0].dates[0].startTime} - {sessions[0].dates[0].endTime} (JST)
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        
            {/* MODAL SECTION */}
            {isOpen && hasSingleDate && isBiznite && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
                        onClick={closeModal} 
                    />

                    <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col border border-gray-100 animate-in fade-in zoom-in duration-200">
                        
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 z-20 group p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {!isSuccess ? (
                            <>
                                <div className="relative px-8 pt-10 pb-6 bg-gradient-to-b from-gray-50/50 to-white">
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
                                        {title}
                                    </h3>

                                    <div className="mt-6 flex items-center gap-4 bg-white border border-gray-100 shadow-sm rounded-2xl p-4">
                                        <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{formattedDate}</p>
                                            <p className="text-xs font-medium text-gray-500">
                                                {sessions[0].dates[0].startTime} — {sessions[0].dates[0].endTime} (JST)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-8 pb-10 overflow-y-auto max-h-[60vh] custom-scrollbar">
                                    <div className="space-y-6">
                                        <p className="text-[15px] leading-relaxed text-gray-500 font-medium italic border-l-2 border-gray-100 pl-4">
                                            {t("description")}
                                        </p>
                                        <div className="relative">
                                            <RegistrationForm 
                                                onSubmit={handleFormSubmit} 
                                                isLoading={isSubmitting} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* SUCCESS VIEW */
<div className="px-8 py-12 text-center space-y-6 animate-in slide-in-from-bottom-4 duration-500">
    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
    </div>
    
    <div className="space-y-2">
        <h3 className="text-2xl font-black text-gray-900">
            {t("successTitle")}
        </h3>
        <p className="text-gray-500 font-medium px-6">
            {t("successSubtitle")}
        </p>
    </div>

    <div className="bg-gray-50 rounded-3xl p-6 text-left space-y-4 border border-gray-100">
        <div className="space-y-1">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                {t("eventDetails")}
            </span>
            <h4 className="font-bold text-gray-900 leading-tight">{title}</h4>
            <p className="text-sm text-gray-600">
                {formattedDate} • {sessions[0].dates[0].startTime} (JST)
            </p>
        </div>
        
        <div className="pt-2">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                {t("meetingLink")}
            </span>
            <a 
                href={sessions[0].dates[0].zoomLink} 
                target="_blank" 
                rel="noreferrer"
                className="block mt-1 text-sm text-blue-600 font-bold underline break-all hover:text-blue-700"
            >
                {sessions[0].dates[0].zoomLink}
            </a>
        </div>
    </div>

    <button 
        onClick={closeModal}
        className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-shadow shadow-lg active:scale-[0.98] transition-transform"
    >
        {t("closeButton")}
    </button>
</div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}