// src/app/services/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// --- ИНТЕРФЕЙСЫ ---
interface IStrapiImage {
  url: string;
  alternativeText: string | null;
  formats: {
    medium?: { url: string };
    large?: { url:string };
  };
}
interface IService {
  title: string;
  description: string;
  image: IStrapiImage | null;
}
// --- КОНЕЦ ИНТЕРФЕЙСОВ ---

// --- ФУНКЦИЯ ПОЛУЧЕНИЯ ДАННЫХ ПО SLUG ---
async function getServiceBySlug(slug: string) {
  // Фильтруем по slug и запрашиваем изображение
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/services?filters[slug][$eq]=${slug}&populate=image`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch service");

  const response = await res.json();
  // Так как фильтр возвращает массив, нам нужен первый элемент
  return response.data[0]; 
}

export default async function ServiceDetailsPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const {
    slug
  } = params;

  const service: IService = await getServiceBySlug(slug);
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!service) {
    return (
      <main className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold">Услуга не найдена</h1>
        <Button asChild className="mt-8">
          <Link href="/services">Ко всем услугам</Link>
        </Button>
      </main>
    );
  }

  const serviceImage = service.image;
  const imageUrl = serviceImage 
    ? strapiUrl + (serviceImage.formats.medium?.url || serviceImage.url)
    : "/placeholder-service.jpg";

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/services">&larr; Назад ко всем услугам</Link>
          </Button>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-8">{service.title}</h1>
        
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={serviceImage?.alternativeText || service.title}
            fill
            className="object-cover"
            quality={90}
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {service.description}
          </ReactMarkdown>
        </div>
      </div>
    </main>
  );
}