// src/components/Header.tsx
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation'; // 1. Импортируем хук usePathname
import { useLocale, useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // 2. Получаем текущий путь страницы

  // 3. Проверяем, является ли текущая страница главной
  const isHomePage = pathname === `/${locale}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        // 4. Динамически меняем стили в зависимости от страницы и скролла
        isHomePage ? 'fixed' : 'sticky border-b border-gray-800',
        (isScrolled || !isHomePage) 
          ? 'bg-green-900/80 backdrop-blur-md' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Логотип */}
        <Link href={`/${locale}`} className="font-bold text-xl text-white hover:text-green-400 transition-colors">
          {t('name')}
        </Link>

        {/* Навигация */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href={`/${locale}/projects`} className="text-gray-300 hover:text-white transition-colors">
            {t('projects')}
          </Link>
          <Link href={`/${locale}/services`} className="text-gray-300 hover:text-white transition-colors">
            {t('services')}
          </Link>
          <Link href={`/${locale}/about`} className="text-gray-300 hover:text-white transition-colors">
            {t('about')}  
          </Link>
          <Link href={`/${locale}/contacts`} className="text-gray-300 hover:text-white transition-colors">
            {t('contacts')}
          </Link>
          <Link href={`/${locale}/corruption`} className="text-gray-300 hover:text-white transition-colors">
            {t('corruption')}
          </Link>
        </nav>

        {/* Кнопка */}
        <Button asChild variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-900 rounded-full px-6">
            <Link href={`/${locale}/contacts`}>Связаться с нами</Link>
        </Button>
      </div>
    </header>
  );
}