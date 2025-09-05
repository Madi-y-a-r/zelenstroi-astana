// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {getMessages} from 'next-intl/server';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/dist/client/components/navigation";
import { routing } from "@/i18n/routing";
import { PageWrapper } from "@/components/PageWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Астана Зеленстрой",
  description: "Озеленение и ландшафтный дизайн в Астане",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={cn(
          inter.variable
        )}
      >
        <NextIntlClientProvider>
          <Header />
          <PageWrapper>{children}</PageWrapper>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}