import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeBootstrap = `try {
  const savedTheme = localStorage.getItem("pallas-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", savedTheme ? savedTheme === "dark" : prefersDark);
} catch {}`;

export const metadata: Metadata = {
  title: "Pallas — Enterprise Knowledge Base AI",
  description:
    "Permission-aware AI knowledge base for teams. Import your docs, set access controls, and get traceable answers your team can trust.",
  icons: {
    icon: "/pallas-mark.svg",
    shortcut: "/pallas-mark.svg",
  },
  openGraph: {
    title: "Pallas — Enterprise Knowledge Base AI",
    description:
      "Turn scattered product docs, wikis and FAQs into a permission-aware AI knowledge base.",
    type: "website",
  },
  alternates: {
    languages: {
      en: "/",
      "zh-CN": "/zh",
      tr: "/tr",
      fr: "/fr",
      ja: "/ja",
      es: "/es",
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Script id="pallas-theme-bootstrap" strategy="beforeInteractive">
          {themeBootstrap}
        </Script>
        {children}
      </body>
    </html>
  );
}
