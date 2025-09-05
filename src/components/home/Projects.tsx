import React from 'react'
import { Section } from '../Section';
import Link from 'next/link';
import { Card, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Projects = ({ projects }: { projects: IProject[] }) => {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
  const t = useTranslations('ProjectsHome');
  return (
    <Section>
          <div className="bg-gray-50/70 py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800">{t('title')}</h2>
                <p className="text-gray-500 mt-4 text-lg">{t('description')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((project) => {
                  const projectImage = project.coverImage;
                  const imageUrl = STRAPI_URL + (projectImage.formats.small?.url || projectImage.url);
                  
                  return (
                    <Link href={`/projects/${project.documentId}`} key={project.id} className="group block">
                      <Card className="flex flex-col h-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                        {/* Блок с изображением */}
                        <div className="relative w-full h-72">
                          <Image
                            src={imageUrl}
                            alt={projectImage.alternativeText || `Фото проекта ${project.title}`}
                            fill
                            className="object-cover"
                            quality={85}
                          />
                        </div>
                        {/* Блок с текстом */}
                        <div className="p-6">
                          <CardTitle className="text-xl font-bold text-gray-800">
                            {project.title}
                          </CardTitle>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
              <div className="text-center mt-12">
                <Button asChild variant="outline" className="rounded-full px-8 py-6 text-lg border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  <Link href="/projects">
                    <span>{t('button')}</span> <ArrowRight className="ml-2 h-5 w-5"/>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Section>
  )
}

export default Projects