"use client";

import { ReactNode } from "react";
import { LanguageProvider, Locale } from "../lib/i18n/LanguageContext";

interface ClientLayoutProps {
  children: ReactNode;
  initialLocale: Locale;
}

export default function ClientLayout({ children, initialLocale }: ClientLayoutProps) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      {children}
    </LanguageProvider>
  );
}
