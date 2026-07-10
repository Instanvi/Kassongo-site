import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kassongo Express - Global Storage & Forwarding Solutions",
  description: "Sign up to get your unique Kassongo shipping addresses in major trade hubs. Shop any supplier, and we will securely store, combine, and forward your boxes to save you money.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-[#fdfbf2] text-[#002c17]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}