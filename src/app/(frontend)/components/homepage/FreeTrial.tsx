"use client";

import React from "react";
import { Zap, UserCheck, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import { clsx } from "clsx";

// Icon Map for Payload strings
const iconMap: Record<string, any> = {
  zap: Zap,
  userCheck: UserCheck,
  globe: Globe,
  shieldCheck: ShieldCheck,
};

interface RoadmapProps {
  data?: any;
}

export default function CenteredLinearRoadmap({ data }: RoadmapProps) {
  if (!data) return null;

  const { title, subtitle, steps, ctaTitle, ctaDescription, ctaButtonText } = data;

  // Title Parser (if you want to support <blue> here too)
  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag' && domNode.name === "blue") {
        return <span className="text-[#215ca5]">{domToReact(domNode.children, options)}</span>;
      }
    },
  };

  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            {parse(title || "", options)}
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            {subtitle}
          </p>
        </div>

        {/* Roadmap Track */}
        <div className="relative mb-24">
          {/* Desktop Line */}
          <div className="absolute top-8 left-0 w-full h-0.5 bg-slate-100 hidden md:block rounded-full" />

          <div className={clsx(
            "grid grid-cols-1 gap-12 md:gap-8 relative",
            steps?.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
          )}>
           {steps?.map((step: any, idx: number) => {
              const Icon = iconMap[step.icon] || Zap;
              return (
                <div key={idx} className="group flex flex-col items-center md:items-start text-center md:text-left">
                  
                  {/* Icon Circle */}
                  <div className="flex items-center justify-center mb-8 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center shadow-sm group-hover:border-slate-900 transition-colors duration-300">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      {step.day}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-[240px] whitespace-pre-line">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-center justify-center p-12 rounded-[3rem] bg-slate-50 border border-slate-100 text-center max-w-4xl mx-auto">
          <h4 className="text-2xl font-bold text-slate-900 mb-2">{ctaTitle}</h4>
          <p className="text-slate-500 mb-8 max-w-sm whitespace-pre-line">{ctaDescription}</p>
          
          <button className="px-12 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95">
            {ctaButtonText} <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}