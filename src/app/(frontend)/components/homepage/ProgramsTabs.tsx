"use client";

import { useState } from "react";
import CardGridSection, { CardGridData } from "./CardGridSection";


export default function ProgramsTabs({ levelsData }: { levelsData: CardGridData[] }) {
  const [activeLevel, setActiveLevel] = useState(0);

  return (
    <>
      {/* Tabs */}
        <div className="flex justify-center mb-10" >
          <div className="flex bg-white/60 backdrop-blur-md rounded-full p-1 shadow-md">
            {levelsData.map((level: CardGridData, index: number) => (
              <button
                key={index}
                onClick={() => setActiveLevel(index)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeLevel === index
                    ? "bg-[#1f497c] text-white shadow"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {level.level}
              </button>
            ))}
          </div>
        </div>
      {/* Content */}
      <div data-aos="fade-up" data-aos-duration="600">
        <CardGridSection {...levelsData[activeLevel]} align="center" />
      </div>
    </>
  );
}