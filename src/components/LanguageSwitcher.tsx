// src/components/LanguageSwitcher.tsx
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation"; // <-- Важный импорт из i18n
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // Этот хук из i18n/navigation уже не содержит локаль в пути

  const handleLocaleChange = (newLocale: 'ru' | 'kk') => {
    // Используем router.replace для смены URL без перезагрузки страницы
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2 rounded-full border bg-gray-100 backdrop-blur-sm border-gray-500 p-1">
      <button
        onClick={() => handleLocaleChange('ru')}
        className={cn(
          "px-3 py-1 rounded-full text-sm transition-colors",
          locale === 'ru' 
            ? "bg-green-200 text-gray-900 shadow-sm" 
            : " hover:bg-green-300 text-gray-700 hover:text-gray-800 cursor-pointer"
        )}
      >
        РУС
      </button>
      <button
        onClick={() => handleLocaleChange('kk')}
        className={cn(
          "px-3 py-1 rounded-full text-sm transition-colors",
          locale === 'kk' 
            ? "bg-green-200 text-gray-900 shadow-sm" 
            : " hover:bg-green-300 text-gray-700 hover:text-gray-800 cursor-pointer"
        )}
      >
        ҚАЗ
      </button>
    </div>
  );
}