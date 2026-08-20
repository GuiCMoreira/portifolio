import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Space_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guilherme Carvalho — Fullstack Developer | GuiOS",
  description:
    "Portfólio de Guilherme Carvalho, desenvolvedor web fullstack (Next.js, React, PHP). Apresentado como GuiOS: um sistema operacional interativo — abra os apps, use o terminal, explore.",
  keywords: [
    "Guilherme Carvalho",
    "desenvolvedor fullstack",
    "Next.js",
    "React",
    "TypeScript",
    "PHP",
    "portfólio",
  ],
  authors: [{ name: "Guilherme Carvalho", url: "https://github.com/GuiCMoreira" }],
  openGraph: {
    title: "Guilherme Carvalho — Fullstack Developer | GuiOS",
    description:
      "Um portfólio que é um sistema operacional: janelas, dock, terminal interativo e command palette. Next.js · React · PHP.",
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    siteName: "GuiOS",
  },
  twitter: {
    card: "summary",
    title: "Guilherme Carvalho — Fullstack Developer | GuiOS",
    description:
      "Um portfólio que é um sistema operacional: janelas, dock, terminal interativo e command palette.",
  },
};

export const viewport = {
  themeColor: "#07080c",
  // viewport-fit=cover: o GuiOS ocupa a tela toda em iPhones com notch;
  // os safe-area-insets protegem status bar, dock e home indicator.
  viewportFit: "cover" as const,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
