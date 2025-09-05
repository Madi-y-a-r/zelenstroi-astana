// src/app/projects/[docId]/page.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

// --- ИНТЕРФЕЙСЫ ---
interface IStrapiImageFormat { url: string; width: number; height: number; }
interface IStrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  formats: {
    thumbnail: IStrapiImageFormat;
    small?: IStrapiImageFormat;
    medium?: IStrapiImageFormat;
    large?: IStrapiImageFormat;
  };
}
interface IProject {
  id: number;
  documentId: string;
  title: string;
  description: string | null; // <-- Добавил null, так как в вашем JSON он может быть null
  completionDate: string | null; // <-- Добавил null
  coverImage: IStrapiImage;
  gallery: IStrapiImage[] | null; // <-- Добавил null
}
// --- КОНЕЦ ИНТЕРФЕЙСОВ ---

// --- ПОЛНАЯ И РАБОТАЮЩАЯ ФУНКЦИЯ ---
async function getProjectByDocId(docId: string) {
  
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects/${docId}?populate=*`;
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch project data');
  }

  const projectData = await res.json();
  return projectData.data; // <--- САМАЯ ВАЖНАЯ СТРОКА
}


export default async function ProjectDetailsPage(props: { params: Promise<{ docId: string }> }) {
  const t = await getTranslations();
  const params = await props.params;
  const {
    docId
  } = params;

  const project: IProject = await getProjectByDocId(docId);
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!project) {
    return <div className="container mx-auto p-8">{t('Projects.not_found')}</div>;
  }

  const cover = project.coverImage;
  const galleryImages = project.gallery;

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/projects">&larr; {t('Projects.back_to_projects')}</Link>
          </Button>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
        {project.completionDate && (
            <p className="text-lg text-muted-foreground mb-6">
            Дата реализации: {new Date(project.completionDate).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}
            </p>
        )}
        
        {cover && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
                src={strapiUrl + (cover.formats.large?.url || cover.url)}
                alt={cover.alternativeText || `Главное фото проекта ${project.title}`}
                fill
                className="object-cover"
            />
            </div>
        )}

        {project.description && (
            <div className="prose prose-lg max-w-none mb-12">
            <p>{project.description}</p>
            </div>
        )}

        {galleryImages && galleryImages.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6">Галерея</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map(img => (
                <div key={img.id} className="relative w-full h-48 rounded-md overflow-hidden">
                   <Image
                    src={strapiUrl + (img.formats.small?.url || img.url)}
                    alt={img.alternativeText || 'Фото из галереи проекта'}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}