// src/components/home/LatestNewsSection.tsx
"use client"; // <-- Делаем компонент клиентским

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

// 1. Импортируем компоненты карусели
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

// ... интерфейсы IStrapiImage и INewsItem остаются без изменений ...
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
  summary: string;
  publishedDate: string;
  image: IStrapiImage;
}

interface LatestNewsProps {
  news: INewsItem[] | null;
}

export function LatestNewsSection({ news }: LatestNewsProps) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }) // 4000ms = 4 секунды
  );
  if (!news || news.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50/70 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Последние новости</h2>
          <p className="text-gray-500 mt-4 text-lg">Следите за жизнью компании и важными событиями в сфере озеленения.</p>
        </div>
        
        {/* 2. Заменяем grid на компонент Carousel */}
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true, // Бесконечная прокрутка
          }}
          className="w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-7xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-4">
            {news.map((item) => (
              // 3. Каждый элемент теперь оборачиваем в CarouselItem
              <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Link href={`/news/${item.slug}`} className="group block h-full">
                    <Card className="flex flex-col h-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                      <div className="relative w-full h-56">
                        <Image
                          src={STRAPI_URL + (item.image.formats.small?.url || item.image.url)}
                          alt={item.image.alternativeText || `Изображение для ${item.title}`}
                          fill
                          className="object-cover"
                          quality={85}
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(item.publishedDate).toLocaleDateString('ru-RU', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </p>
                        <CardTitle className="text-xl font-bold text-gray-800 flex-grow">
                          {item.title}
                        </CardTitle>
                        <div className="mt-4 text-green-600 font-bold flex items-center">
                          Читать далее
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* 4. Добавляем стрелки навигации */}
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </div>
  );
}