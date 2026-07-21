import type { Metadata } from "next";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import { cookies } from "next/headers";
import { Locale } from "../lib/i18n/LanguageContext";
import ClientLayout from "../components/ClientLayout";

export const metadata: Metadata = {
  title: "Kassongo Express - Global Storage & Forwarding Solutions",
  description: "Sign up to get your unique Kassongo shipping addresses in major trade hubs. Shop any supplier, and we will securely store, combine, and forward your boxes to save you money.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const initialLocale: Locale = (localeCookie === "fr" || localeCookie === "en" || localeCookie === "zh" || localeCookie === "de" || localeCookie === "uk") ? localeCookie : "en";

  return (
    <html
      lang={initialLocale}
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#fdfbf2] text-[#002c17]"
        suppressHydrationWarning
      >
        <ClientLayout initialLocale={initialLocale}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
