"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => void;
  isLoading?: boolean;
}

export default function RegistrationForm({ onSubmit, isLoading }: RegistrationFormProps) {
  const localeClient = useLocale();
  const t = useTranslations("homepage.workshopHero.modal");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data: RegistrationFormData = {
      firstName: formData.get("firstName")?.toString() || "",
      lastName: formData.get("lastName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
    };
    
    onSubmit(data);
  };

  const renderNameInputs = (): React.ReactNode => {
    const firstNameField = (
      <div key="first-name">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          {t("firstName")}
        </label>
        <input
          name="firstName"
          type="text"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#1754cf] focus:bg-white transition disabled:opacity-50"
        />
      </div>
    );

    const lastNameField = (
      <div key="last-name">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          {t("lastName")}
        </label>
        <input
          name="lastName"
          type="text"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#1754cf] focus:bg-white transition disabled:opacity-50"
        />
      </div>
    );

    return localeClient === "ja" 
      ? <>{lastNameField}{firstNameField}</> 
      : <>{firstNameField}{lastNameField}</>;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {renderNameInputs()}
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          {t("email")}
        </label>
        <input
          name="email"
          type="email"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#1754cf] focus:bg-white transition disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#1754cf] text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:bg-blue-600 active:scale-[0.98] disabled:bg-gray-400 min-h-[56px] flex items-center justify-center"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>{t("confirm")}...</span>
          </div>
        ) : (
          t("confirm")
        )}
      </button>
    </form>
  );
}