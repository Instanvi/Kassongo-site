"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en } from "./translations/en";
import { fr } from "./translations/fr";
import { zh } from "./translations/zh";
import { de } from "./translations/de"; 

export type Locale = "en" | "fr" | "zh" | "de" | "uk";

const translations = { en, fr, zh, de, uk: en };

interface LanguageContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Sync client-side cookie and localStorage on mount and locale change
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    // Set cookie for SSR next render
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    // Backup in localStorage
    localStorage.setItem("NEXT_LOCALE", newLocale);
  };

  useEffect(() => {
    // Check if client has a stored preference different from the initial SSR locale
    const storedLocale = localStorage.getItem("NEXT_LOCALE") as Locale;
    if (storedLocale && (storedLocale === "en" || storedLocale === "fr" || storedLocale === "zh" || storedLocale === "de" || storedLocale === "uk") && storedLocale !== locale) {
      setLocale(storedLocale);
    }
  }, []);

  const t = (key: string, variables?: Record<string, string | number>): string => {
    // Try current locale
    let value = getNestedValue(translations[locale], key);
    
    // Fallback to English if not found or empty
    if (value === undefined || value === null) {
      value = getNestedValue(translations["en"], key);
    }

    // Fallback to key itself if still not found
    if (value === undefined || value === null) {
      return key;
    }

    if (typeof value === "string") {
      let result = value;
      if (variables) {
        Object.entries(variables).forEach(([k, v]) => {
          result = result.replace(new RegExp(`{${k}}`, "g"), String(v));
        });
      }
      return result;
    }

    return String(value);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
