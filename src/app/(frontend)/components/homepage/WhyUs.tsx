"use client";

import Image from "next/image";
import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import { clsx } from "clsx";

interface WhyUsProps {
    data?: {
        whyChooseUs?: string;     // Badge text
        mainTitle?: string;       // Rich text with <blue>
        reasonText?: string;          // Main description
        reasons?: {               // The 3 cards
            title: string;
            description: string;
        }[];
    };
}

export default function JGlobalBusinessSchool({ data }: WhyUsProps) {
    // Fallbacks to keep the UI from breaking if CMS data is missing
    const badgeText = data?.whyChooseUs ;
    const mainTitle = data?.mainTitle ;
    const descriptionText = data?.reasonText ;

    
    // Mapping icons to the array index (or you can add an icon picker in Payload later)
    const iconConfig = [
        { src: "/icons/piggy-bank.png", bg: "bg-[#e8eef7]" },
        { src: "/icons/laptop.png", bg: "bg-[#edf0f5]" },
        { src: "/icons/language.png", bg: "bg-[#e4ebf3]" },
    ];

    // Parser options for the <blue> tag in the title
    const options: HTMLReactParserOptions = {
        replace: (domNode: any) => {
            if (domNode.type === 'tag' && domNode.name === "blue") {
                return (
                    <span className="text-[#215ca5]">
                        {domToReact(domNode.children, options)}
                    </span>
                );
            }
        },
    };

    return (
        <div id="why-us" className="relative overflow-hidden">
            {/* Header Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-15 pt-15 text-center">
                <div className="flex flex-col items-center">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full border border-[#215ca5]/20 bg-[#215ca5]/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#215ca5]" />
                        <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#215ca5]">
                            {badgeText}
                        </span>
                    </div>

                    {/* Title with Parsed <blue> tag */}
                    <h2 className="text-3xl max-w-5xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
                        {parse(mainTitle!, options)}
                    </h2>
                </div>

                {/* Description - Using whitespace-pre-line to handle \n from CMS */}
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
                    {descriptionText}
                </p>
            </section>

            {/* Features Grid */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.reasons?.map((reason, i) => {
                        // Reuse icons in a loop if there are more than 3 reasons
                        const icon = iconConfig[i % iconConfig.length];
                        
                        return (
                            <div
                                key={i}
                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#215ca5]/20 transition-all duration-300 flex flex-col p-7"
                            >
                                {/* Icon Container */}
                                <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center mb-5", icon.bg)}>
                                    <Image 
                                        className="icon-mask" 
                                        src={icon.src} 
                                        alt="" 
                                        width={24} 
                                        height={24} 
                                        style={{ ['--icon-url' as any]: `url(${icon.src})` }} 
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-sm font-bold text-[#1a3558] mb-3 leading-snug">
                                    {reason.title}
                                </h3>

                                {/* Faint Rule */}
                                <div className="h-px bg-[#215ca5]/10 mb-3" />

                                {/* Body Text */}
                                <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                                    {reason.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}