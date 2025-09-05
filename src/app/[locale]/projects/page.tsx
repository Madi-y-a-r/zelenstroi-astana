// src/app/page.tsx

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { getLocale, getTranslations } from "next-intl/server";

// --- ИСПРАВЛЕННЫЕ ИНТЕРФЕЙСЫ ---
interface IStrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

// Убираем вложенность .data.attributes
interface IStrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  formats: {
    thumbnail: IStrapiImageFormat;
    small?: IStrapiImageFormat;
  };
}

interface IProject {
  id: number;
  documentId: string;
  title: string;
  description: string;
  completionDate: string;
  coverImage: IStrapiImage; // <-- Теперь используется новый "плоский" тип
}
// --- КОНЕЦ ИСПРАВЛЕНИЙ ---

async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate=coverImage`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch data from Strapi');
  const projectsData = await res.json();
  return projectsData.data;
}

export default async function ProjectsPage() {
  const t = await getTranslations();
  const projects: IProject[] = await getProjects();
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  return (
    <main className="container mx-auto p-4 md:p-8 pt-[80px]">
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">{t('Projects.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            // --- ИСПРАВЛЕНО: УБИРАЕМ .data.attributes ---
            const cover = project.coverImage; 
            const imageUrl = strapiUrl + cover.formats.thumbnail.url;

            return (
              <Link href={`/projects/${project.documentId}`} key={project.id} className="flex">
                <Card className="flex flex-col hover:border-primary transition-colors w-full overflow-hidden">
                  <div className="relative w-full h-48">
                    <Image
                      src={imageUrl}
                      alt={cover.alternativeText || `Фото проекта ${project.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader><CardTitle>{project.title}</CardTitle></CardHeader>
                  <CardContent className="flex-grow">
                    <p className="line-clamp-3 text-muted-foreground">{project.description}</p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    {/* ... */}
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}