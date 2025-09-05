// src/app/[locale]/corruption/page.tsx

import { getLocale, getTranslations } from "next-intl/server";
import { fetchApi } from "@/lib/strapi";
import { Download } from "lucide-react";

// --- Интерфейсы ---
interface IStrapiFile {
  id: number;
  name: string;
  url: string;
}
interface ICorruptionDocument {
  id: number;
  title: string;
  publishedDate: string;
  documentFile: IStrapiFile[] | null;
}

// --- Функция для получения данных ---
async function getCorruptionDocs(locale: string) {
  try {
    // Убедитесь, что API ID правильный (например, 'api/anti-corruption-documents')
    const strapiResponse = await fetchApi<{ 
      data: ICorruptionDocument[], 
      meta: any 
    }>('/api/anti-corruptions', locale, {
      populate: 'documentFile',
      'sort[0]': 'publishedDate:desc',
      'pagination[limit]': -1,
    });
    return strapiResponse.data || [];
  } catch (error) {
    console.error("Failed to fetch corruption documents:", error);
    return [];
  }
}



// --- Компонент страницы ---
export default async function CorruptionPage() {
  const locale = await getLocale();
  const t = await getTranslations('CorruptionPage');
  const documents = await getCorruptionDocs(locale);
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

  return (
    <main className="container mx-auto p-4 md:p-8">
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">{t('main_title')}</h1>
      </section>

      <section>
        <div className="border rounded-lg shadow-sm">
          <ul className="divide-y">
            {documents.length > 0 ? (
              documents.map((item) => {
                const docArray = item.documentFile;
                const doc = docArray && docArray.length > 0 ? docArray[0] : null;

                if (!doc) return null;

                return (
                  <li key={item.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                    <a 
                      href={STRAPI_URL + doc.url} 
                      download
                      className="flex items-center justify-between gap-4 group"
                    >
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">
                          {new Date(item.publishedDate).toLocaleDateString('ru-RU')}
                        </p>
                        <p className="font-medium text-gray-800 group-hover:text-green-600">
                          {item.title}
                        </p>
                      </div>
                      <Download className="w-6 h-6 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </a>
                  </li>
                );
              })
            ) : (
              <li className="p-4 md:p-6 text-center text-gray-500">
                Документы не найдены.
              </li>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}