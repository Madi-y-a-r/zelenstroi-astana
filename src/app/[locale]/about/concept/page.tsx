// src/app/[locale]/about/concept/page.tsx

import { getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Shema from "../../../../../public/chema.jpg"


export default async function ConceptPage() {
  const t = await getTranslations('ConceptPage');

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
          {/* Добавим изображение для наглядности */}
          <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden">
            <Image
                src={Shema}
                alt={t('image_alt')}
                width={500}
                height={400}
                className="self-center"
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