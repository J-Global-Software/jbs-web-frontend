"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Minus } from "lucide-react";
import { getLink } from "@/lib/links";
import { useLocale } from "next-intl";
import Link from "next/link";
import clsx from "clsx";

// 1. Updated Interfaces for Categorized Features
type PlanCycle = "monthly" | "biannual" | "annual";

interface Feature {
    name: string;
    included: boolean;
    subtext?: string;
}

interface FeatureCategory {
    categoryName: string;
    items: Feature[];
}

interface PricingTier {
    price: string;
    total: string;
    features: FeatureCategory[];
    link: string;
}

interface Plan {
    name: string;
    description: string;
    accent: string;
    featured?: boolean;
    monthly: PricingTier;
    biannual: PricingTier;
    annual: PricingTier;
}

export default function PricingSection() {
    const t = useTranslations("homepage.pricing");
    const locale = useLocale();
    const [billingCycle, setBillingCycle] = useState<PlanCycle>("monthly");

    const cycles: PlanCycle[] = ["monthly", "biannual", "annual"];

    // 2. Shared Free Trial Features (Static across all cycles)
    const freeTrialFeatures: FeatureCategory[] = [
        {
            categoryName: "WORKSHOPS",
            items: [{ name: "Full Access (14 days)", included: true }]
        },
        {
            categoryName: "CERTIFICATIONS",
            items: [{ name: "Trial Access", included: true }]
        },
        {
            categoryName: "COACHING",
            items: [{ name: "1 × 20-min session (trial)", included: true }]
        },
        {
            categoryName: "E-LEARNING",
            items: [{ name: "1 Short \"INTRO\" Program", subtext: "JP: GCM Intro\nEN: ILP Intro", included: true }]
        },
        {
            categoryName: "SUPPORT",
            items: [{ name: "Self-Guided", included: true }]
        }
    ];

    // 3. Define Plans with Dynamic Categorized Features
    const plans: Record<"freeTrial" | "unlimited", Plan> = {
        freeTrial: {
            name: t("freeTrial.name"),
            description: t("freeTrial.features"),
            accent: "#F6C358",
            monthly: {
                price: "¥0",
                total: "for 14 days",
                features: freeTrialFeatures,
                link: getLink("freeTrial", locale),
            },
            biannual: {
                price: "¥0",
                total: "for 14 days",
                features: freeTrialFeatures,
                link: getLink("freeTrial", locale),
            },
            annual: {
                price: "¥0",
                total: "for 14 days",
                features: freeTrialFeatures,
                link: getLink("freeTrial", locale),
            }
        },
        unlimited: {
            name: t("unlimited.name"),
            description: t("unlimited.features"),
            accent: "#B184DB",
            featured: true,
            monthly: {
                price: "¥10,000",
                total: t("taxIncl", { price: "10,000" }),
                link: "https://buy.stripe.com/8wM2b6e3ufc0esMdQU",
                features: [
                    {
                        categoryName: "WORKSHOPS",
                        items: [{ name: "Up to 12 lessons/month", included: true }]
                    },
                    {
                        categoryName: "CERTIFICATIONS",
                        items: [{ name: "Short & Medium Programs", included: true }]
                    },
                    {
                        categoryName: "COACHING",
                        items: [{ name: "Not included (once from trial)", included: false }]
                    },
                    {
                        categoryName: "E-LEARNING",
                        items: [{ name: "Basic Access", included: true }]
                    },
                    {
                        categoryName: "SUPPORT",
                        items: [{ name: "Counseling", included: true }]
                    }
                ],
            },
            biannual: {
                price: "¥9,000",
                total: t("oneTime", { price: "54,000" }),
                link: "https://buy.stripe.com/7sIaHCcZqgg4acw005",
                features: [
                    {
                        categoryName: "WORKSHOPS",
                        items: [{ name: "Up to 20 lessons/month", included: true }]
                    },
                    {
                        categoryName: "CERTIFICATIONS",
                        items: [{ name: "Short & Medium Programs", included: true }]
                    },
                    {
                        categoryName: "COACHING",
                        items: [{ name: "1 × 20-min session/month (add-on)", included: true }]
                    },
                    {
                        categoryName: "E-LEARNING",
                        items: [{ name: "3 Short \"INTRO\" Programs", included: true }]
                    },
                    {
                        categoryName: "SUPPORT",
                        items: [{ name: "Half-Year Roadmap & Counseling", included: true }]
                    }
                ],
            },
            annual: {
                price: "¥8,000",
                total: t("oneTime", { price: "96,000" }),
                link: "https://buy.stripe.com/dR68zu1gIbZO3O88wC",
                features: [
                    {
                        categoryName: "WORKSHOPS",
                        items: [{ name: "Unlimited — up to 80 lessons/mo", included: true }]
                    },
                    {
                        categoryName: "CERTIFICATIONS",
                        items: [{ name: "Full Programs (Mini MBA, Global Project Mgt, etc.)", included: true }]
                    },
                    {
                        categoryName: "COACHING",
                        items: [{ name: "2 × 20-min sessions/month (add-on)", included: true }]
                    },
                    {
                        categoryName: "E-LEARNING",
                        items: [{ name: "4 Full Programs", included: true }]
                    },
                    {
                        categoryName: "SUPPORT",
                        items: [{ name: "Full 1-Year Career Roadmap & Progress Counseling", included: true }]
                    }
                ],
            },
        },
    };

    return (
        <section className="relative overflow-hidden py-24 bg-[#dbe9ff]/30">
            <div className="absolute inset-0 bg-[url('/img/topography.svg')] bg-cover bg-center opacity-1 pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#215ca5] mb-6">{t("title")}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("subtitle")}</p>

                    <div className="mt-10 inline-flex items-center p-1.5 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#215ca5]/20 shadow-sm">
                        {cycles.map((cycle) => (
                            <button key={cycle} onClick={() => setBillingCycle(cycle)} className={clsx("px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300", billingCycle === cycle ? "bg-[#215ca5] text-white shadow-lg" : "text-[#215ca5] hover:bg-[#215ca5]/5")}>
                                {t(`cycle_${cycle}`)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <PricingCard plan={plans.freeTrial} cycle={billingCycle} />
                    <PricingCard plan={plans.unlimited} cycle={billingCycle} />
                </div>
            </div>

            <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 border border-[#215ca5]/10 rotate-45" />
        </section>
    );
}

// 4. Update the PricingCard to render the Categories
interface PricingCardProps {
    plan: Plan;
    cycle: PlanCycle;
}

function PricingCard({ plan, cycle }: PricingCardProps) {
    const data = plan.name === "Free Trial" ? plan.monthly : plan[cycle];
    const t = useTranslations("homepage.pricing");
    
    // Safety check for billingLabel translation
    const billingLabel =
        plan.name === t("freeTrial.name")
            ? t("noCard")
            : cycle === "monthly"
            ? t("billedMonthly")
            : cycle === "biannual"
            ? t("billedBiannual")
            : t("billedAnnual");

    return (
        <div className={clsx("relative group flex flex-col p-8 md:p-10 rounded-4xl transition-all duration-500 bg-white/80 backdrop-blur-md border", plan.featured ? "border-[#215ca5] shadow-2xl scale-105 z-20" : "border-gray-100 shadow-xl z-10 hover:border-[#215ca5]/30")} data-aos={plan.featured ? "fade-left" : "fade-right"}>
            {plan.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#215ca5] text-white px-6 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">{t("fullMembership")}</div>}
            
            <div className="mb-5 text-center md:text-left">
                <h3 className="text-2xl font-black mb-2" style={{ color: plan.accent }}>
                    {plan.name}
                </h3>
                <p className="text-gray-500 font-medium">{plan.description}</p>
            </div>
            
            <div className="mb-8 text-center md:text-left">
                <div className="flex items-baseline justify-center md:justify-start gap-1">
                    <span className="text-5xl font-black text-[#0c2a45]">{data.price}</span>
                    {plan.name !== t("freeTrial.name") && (
                        <span className="text-gray-400 font-bold text-lg">/Month (Tax Incl.)</span>
                    )}
                </div>
                <p className="text-xs font-bold text-[#215ca5]/60 mt-1 uppercase tracking-tighter">{billingLabel}</p>
            </div>
            
            <div className="flex-grow space-y-6 mb-10">
                <div className="h-px bg-linear-to-r from-[#215ca5]/20 to-transparent mb-6" />
                
                {/* Categorized Perks Rendering */}
                {data.features.map((category, idx) => (
                    <div key={idx} className="space-y-3">
                        <h4 className="text-[11px] font-bold tracking-widest uppercase text-[#215ca5]/60">
                            {category.categoryName}
                        </h4>
                        <div className="space-y-3">
                            {category.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex items-start gap-3">
                                    <div className="mt-0.5 bg-[#215ca5]/10 p-1 rounded-full flex-shrink-0">
                                        {item.included ? (
                                            <Check className="w-3 h-3 text-[#215ca5]" strokeWidth={4} />
                                        ) : (
                                            <Minus className="w-3 h-3 text-[#215ca5]/40" strokeWidth={4} />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={clsx("text-sm font-semibold", item.included ? "text-gray-700" : "text-gray-400")}>
                                            {item.name}
                                        </span>
                                        {item.subtext && (
                                            <span className="text-xs text-gray-500 whitespace-pre-line mt-0.5">
                                                {item.subtext}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {data.link.startsWith("http") ? (
                <a
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                        "w-full py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-lg active:scale-95 text-center block mt-auto",
                        plan.featured
                            ? "bg-linear-to-r from-[#215ca5] to-[#0c2a45] text-white hover:shadow-[#215ca5]/40"
                            : "bg-white border-2 border-[#215ca5] text-[#215ca5] hover:bg-[#215ca5] hover:text-white"
                    )}
                >
                    {plan.name === t("freeTrial.name") ? t("startFreeTrial") : t("getStarted")}
                </a>
            ) : (
                <Link
                    href={data.link}
                    className={clsx(
                        "w-full py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-lg active:scale-95 text-center block mt-auto",
                        plan.featured
                            ? "bg-linear-to-r from-[#215ca5] to-[#0c2a45] text-white hover:shadow-[#215ca5]/40"
                            : "bg-white border-2 border-[#215ca5] text-[#215ca5] hover:bg-[#215ca5] hover:text-white"
                    )}
                >
                    {plan.name === t("freeTrial.name") ? t("startFreeTrial") : t("getStarted")}
                </Link>
            )}
        </div>
    );
}