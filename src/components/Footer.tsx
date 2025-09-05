import { useTranslations } from "next-intl";

// src/components/Footer.tsx
export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('Footer');
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto p-8 text-center text-muted-foreground">
        <p>&copy; {currentYear} ТОО &quot;Астана Зеленстрой&quot;. {t('rights')}</p>
        <p className="mt-2">{t('address')}</p>
      </div>
    </footer>
  );
}