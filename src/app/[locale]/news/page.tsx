// src/app/[locale]/news/page.tsx

import Link from "next/link";
import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { fetchApi } from "@/lib/strapi";
import { getLocale, getTranslations } from "next-intl/server";
import { PaginationComponent } from "@/components/PaginationComponent";

// --- ИСПРАВЛЕННЫЕ ИНТЕРФЕЙСЫ ---
interface IStrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  formats: {
    thumbnail: { url: string };
    small?: { url: string };
  };
}
interface INewsItem {
  id: number;
  title: string;
  slug: string;
  publishedDate: string;
  image: IStrapiImage | null;
}
// --- КОНЕЦ ИСПРАВЛЕНИЙ ---

// --- ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ ---
async function getLatestNews(locale: string) {
  return fetchApi<INewsItem[]>('/api/newspapers', locale, {
    populate: 'image',
    'sort[0]': 'publishedDate:desc',
    'pagination[limit]': "100",
  });
}



// --- КОМПОНЕНТ СТРАНИЦЫ ---
export default async function NewsPage(){
  const locale = await getLocale();
  const t = await getTranslations('NewsPage');
  const news  = await getLatestNews(locale);
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

  return (
    <main className="container mx-auto p-4 md:p-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">{t('main_title')}</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('subtitle')}</p>
      </section>

      {news && news.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => {
            const newsImage = item.image;
            const imageUrl = newsImage
              ? STRAPI_URL + (newsImage.formats.small?.url || newsImage.url)
              : "/placeholder-service.jpg";
            
            return (
              <Link href={`/news/${item.slug}`} key={item.id} className="group block">
                <Card className="flex flex-col h-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative w-full h-56">
                    <Image src={imageUrl} alt={newsImage?.alternativeText || item.title} fill className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                     <p className="text-sm text-gray-500 mb-2">{new Date(item.publishedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                     <CardTitle className="text-xl font-bold text-gray-800 flex-grow">{item.title}</CardTitle>
                     <div className="mt-4 text-green-600 font-bold flex items-center">
                        Читать далее <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"/>
                     </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </section>
      ) : (
        <section className="text-center py-16">
          <p className="text-lg text-gray-500">{t('no_news')}</p>
        </section>
      )}
      
     
    </main>
  );
}