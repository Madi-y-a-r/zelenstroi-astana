// src/app/[locale]/about/page.tsx

import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchApi } from "@/lib/strapi";
import { getLocale } from "next-intl/server";

// --- Определяем типы данных ---
interface IStrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  formats: {
    medium?: { url: string };
    large?: { url: string };
  };
}
interface IStatisticItem {
  id: number;
  number: string;
  label: string;
}
interface IAboutUs {
  title: string;
  content: string;
  image: IStrapiImage | null;
  stats: IStatisticItem[] | null;
}

// --- Функция для получения данных ---
async function getAboutUsData(locale: string) {
  return fetchApi<IAboutUs>('/api/about-us', locale, {
    'populate[image]': 'true',
    'populate[stats]': 'true',
  });
}

// --- Компонент страницы ---
export default async function AboutUsPage() {
  const locale = await getLocale();
  const data = await getAboutUsData(locale);
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

  if (!data) {
    return (
      <main className="container mx-auto p-8 text-center">
        <p>Не удалось загрузить данные страницы.</p>
      </main>
    )
  }

  return (
    <div>
      {/* --- БЛОК 1: ЗАГОЛОВОК И ВСТУПЛЕНИЕ --- */}
      <section className="text-center py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">{data.title}</h1>
          {/* Для краткого вступления можно создать отдельное поле в Strapi */}
        </div>
      </section>

      {/* --- БЛОК 2: ОСНОВНОЙ КОНТЕНТ И ИЗОБРАЖЕНИЕ --- */}
      <section className="container mx-auto p-4 md:p-8 my-16">
        <div className="max-w-5xl mx-auto  md:grid-cols-2 gap-12 items-center">
          {/* Левая колонка с изображением */}
          {data.image && (
            <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={strapiUrl + (data.image.formats.large?.url || data.image.url)}
                alt={data.image.alternativeText || "Фото компании"}
                fill
                className="object-cover"
                quality={90}
              />
            </div>
          )}
          {/* Правая колонка с текстом */}
          <div className="prose prose-lg max-w-none text-gray-600">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.content}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      {/* --- БЛОК 3: СТАТИСТИКА "МЫ В ЦИФРАХ" --- */}
      {data.stats && data.stats.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">Мы в цифрах</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.stats.map((stat) => (
                <div key={stat.id}>
                  <p className="text-5xl font-bold text-green-600">{stat.number}</p>
                  <p className="text-gray-500 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}