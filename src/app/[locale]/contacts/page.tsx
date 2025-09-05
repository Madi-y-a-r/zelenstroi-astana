// src/app/[locale]/contacts/page.tsx

import { getLocale, getTranslations } from "next-intl/server";
import { fetchApi } from "@/lib/strapi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Metadata } from "next";

// --- ИНТЕРФЕЙСЫ (соответствуют вашему API) ---
interface IContact {
  title: string;
  contact: string;
  mapEmbedUrl: string;
}

// --- ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ (ИСПРАВЛЕНО) ---
async function getContactData(locale: string) {
  try {
    // fetchApi уже возвращает нам нужный объект, а не {data, meta}
    const response = await fetchApi<IContact>('/api/contact', locale, {});
    
    // Просто возвращаем сам объект, который получили
    return response;
  } catch (error) {
    console.error("Failed to fetch contact data:", error);
    return null;
  }
}
// --- КОНЕЦ ИСПРАВЛЕНИЙ ---



// --- КОМПОНЕНТ СТРАНИЦЫ ---
export default async function ContactPage() {
  const locale = await getLocale();
  const data = await getContactData(locale);

  if (!data) {
    return (
      <main className="container mx-auto p-8 text-center">
        <p>Не удалось загрузить данные страницы.</p>
      </main>
    );
  }
  
  return (
    <main className="container mx-auto p-4 md:p-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">{data.title}</h1>
      </section>

      <section className="grid md:grid-cols-2 gap-12">
        {/* Левый блок с Markdown текстом */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data.contact} 
          </ReactMarkdown>
        </div>

        {/* Правый блок с картой */}
        <div className="rounded-lg overflow-hidden shadow-lg h-[450px]">
          {data.mapEmbedUrl && (
            <iframe
              src={data.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}
        </div>
      </section>
    </main>
  );
}