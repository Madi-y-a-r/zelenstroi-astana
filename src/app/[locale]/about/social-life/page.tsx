// src/app/[locale]/about/social-life/page.tsx

import { getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Zelen from "../../../../../public/zelen.jpg"
// Мета-теги для SEO


export default async function SocialLifePage() {
  const t = await getTranslations('SocialLifePage');

  return (
    <>
      {/* Секция с главным заголовком */}
      <section className="text-center py-16 md:py-20 bg-gray-50 border-b">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{t('main_title')}</h1>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Основной контент в виде статьи */}
      <section className="container mx-auto p-4 md:p-8 my-16">
        <article className="prose prose-lg max-w-4xl mx-auto">
          {/* Добавим изображение для атмосферы */}
          <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden">
            <Image
                src={Zelen}
                alt={t('image_alt')}
                fill
                className="object-cover"
            />
          </div>

          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {t('content')}
          </ReactMarkdown>
        </article>
      </section>
    </>
  );
}