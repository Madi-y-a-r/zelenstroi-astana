import React from 'react'
import { Section } from '../Section';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from '../ui/card';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';


const Services = ({ services }: { services: IService[] }) => {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
  const t = useTranslations('ServicesHome');
  return (
    <Section>
          <div className="container mx-auto px-4 py-16 md:py-24">
            {/* Верхняя часть с заголовком */}
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                {t('our_services')}
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                {t('services_desc')}
              </p>
            </div>

            {/* Сетка с новыми карточками услуг */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const serviceImage = service.image;
                const imageUrl = serviceImage
                  ? STRAPI_URL + (serviceImage.formats.small?.url || serviceImage.url)
                  : "/placeholder-service.jpg"; // Заглушка, если нет фото

                return (
                  <Link href={`/services/${service.slug}`} key={service.id} className="group block">
                    <Card className="flex flex-col h-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                      {/* Блок с изображением */}
                      <div className="relative w-full h-56">
                        <Image
                          src={imageUrl}
                          alt={serviceImage?.alternativeText || `Изображение для ${service.title}`}
                          fill
                          className="object-cover"
                          quality={85}
                        />
                      </div>
                      
                      {/* Блок с текстом */}
                      <div className="p-6 flex flex-col flex-grow">
                        <CardTitle className="text-xl font-bold text-gray-800">
                          {service.title}
                        </CardTitle>
                        <CardContent className="p-0 mt-2 text-base flex-grow">
                          <p className="text-gray-500 line-clamp-3">
                            {service.description}
                          </p>
                        </CardContent>
                        <div className="mt-4 text-green-600 font-bold flex items-center">
                          Узнать больше
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </Section>
  )
}

export default Services