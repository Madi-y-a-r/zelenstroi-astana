// src/app/services/page.tsx

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

// --- Интерфейсы ---
interface IStrapiImageFormat { url: string; }
interface IStrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  formats: {
    thumbnail: IStrapiImageFormat;
    small?: IStrapiImageFormat;
  };
}

interface IService {
  id: number;
  title: string;
  slug: string;
  description: string;
  // Помечаем, что image может быть null
  image: IStrapiImage | null;
}
// --- Конец обновления ---

async function getServices() {
  const url = 'http://127.0.0.1:1337/api/services?populate=image';
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch services from Strapi');
  const response = await res.json();
  return response.data;
}

export default async function ServicesPage() {
  const services: IService[] = await getServices();
  const strapiUrl = "http://127.0.0.1:1337";

  return (
    <main className="container mx-auto p-4 md:p-8">
      {/* ... секция заголовка ... */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            // --- НАЧАЛО ИСПРАВЛЕНИЙ ---
            const serviceImage = service.image;
            
            // Проверяем, есть ли изображение. Если нет - используем заглушку.
            const imageUrl = serviceImage
              ? strapiUrl + (serviceImage.formats.small?.url || serviceImage.url)
              : "/placeholder-service.jpg"; // <-- Наша картинка-заглушка

            const imageAlt = serviceImage
              ? serviceImage.alternativeText || `Изображение для ${service.title}`
              : service.title;
            // --- КОНЕЦ ИСПРАВЛЕНИЙ ---

            return (
              <Link href={`/services/${service.slug}`} key={service.id} className="group block">
                <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="relative w-full h-56">
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover"
                      quality={85}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardContent className="p-0 text-muted-foreground flex-grow">
                      <p className="line-clamp-3">{service.description}</p>
                    </CardContent>
                    <div className="mt-4 text-green-700 font-semibold flex items-center">
                      Узнать больше
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}