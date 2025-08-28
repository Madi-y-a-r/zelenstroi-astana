// src/app/about/page.tsx

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// --- Определяем типы данных ---

// Тип для изображения (уже знакомый)
interface IStrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  formats: {
    medium?: { url: string };
  };
}

// Тип для нашего компонента "Statistic Item"
interface IStatisticItem {
  id: number;
  number: string;
  label: string;
}

// Тип для всей страницы "О компании"
interface IAboutUs {
  title: string;
  content: string;
  image: IStrapiImage;
  stats: IStatisticItem[];
}

// --- Функция для получения данных ---
async function getAboutUsData() {
  // Для одиночного типа URL другой, и нам нужно populate для всех полей
  const url = 'http://127.0.0.1:1337/api/about-us?populate[image]=true&populate[stats]=true';
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch "About Us" data from Strapi');
  }

  const response = await res.json();
  // Для одиночного типа данные лежат в .data, а не в .data[0]
  return response.data;
}

// --- Компонент страницы ---
export default async function AboutUsPage() {
  const data: IAboutUs = await getAboutUsData();
  const strapiUrl = "http://127.0.0.1:1337";

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Верхний блок с заголовком и изображением */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="prose prose-lg max-w-none text-muted-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {data.content}
              </ReactMarkdown>
            </div>
          {data.image && (
            <div className="relative h-96 w-full order-1 md:order-2 rounded-lg overflow-hidden">
              <Image
                src={strapiUrl + (data.image.formats.medium?.url || data.image.url)}
                alt={data.image.alternativeText || "Фото компании"}
                fill
                className="object-cover"
              />
            </div>
          )}
        </section>

        {/* Блок со статистикой */}
        {data.stats && data.stats.length > 0 && (
          <section className="text-center mb-12">
             <h2 className="text-3xl font-bold mb-8">Мы в цифрах</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.stats.map((stat) => (
                <Card key={stat.id} className="p-6">
                  <CardContent className="p-0">
                    <p className="text-4xl font-bold text-green-700">{stat.number}</p>
                    <p className="text-muted-foreground mt-2">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}