// src/components/PageWrapper.tsx
"use client";

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();

  // Проверяем, является ли текущая страница главной
  const isHomePage = pathname === `/${locale}`;

  return (
    // Применяем отступ сверху (pt-20 = 80px) ко всем страницам,
    // КРОМЕ главной. Также добавляем flex-grow, чтобы прижимать футер.
    <main className={cn(
      "flex-grow",
      !isHomePage && "pt-20" 
    )}>
      {children}
    </main>
  );
}