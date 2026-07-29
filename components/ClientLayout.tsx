"use client";

import { ReactNode } from "react";
import { LanguageProvider, Locale } from "../lib/i18n/LanguageContext";
import { Toaster } from "sonner";

interface ClientLayoutProps {
  children: ReactNode;
  initialLocale: Locale;
}

export default function ClientLayout({ children, initialLocale }: ClientLayoutProps) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <Toaster richColors position="top-right" />
      {children}
    </LanguageProvider>
  );
}
