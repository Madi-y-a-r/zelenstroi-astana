// src/components/HomePageClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import goal from '../../public/goal.png';
import Hero from '../../public/Hero.svg';
import kushenov from '../../public/kushenov.png';
import { Target, Goal, Check } from 'lucide-react'; 
// --- ИНТЕРФЕЙСЫ (дублируем типы для ясности) ---
interface IStrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  formats: {
    thumbnail: { url: string };
    small?: { url: string };
  };
}
interface IProject {
  id: number;
  documentId: string;
  title: string;
  coverImage: IStrapiImage;
}
interface IService {
  id: number;
  slug: string;
  title: string;
  image: IStrapiImage | null;
}
interface IStatisticItem {
  id: number;
  number: string;
  label: string;
}
// --- КОНЕЦ ИНТЕРФЕЙСОВ ---

// --- Компонент-обертка для анимации появления при скролле ---
function Section({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

// --- Главный компонент для отображения ---
export function HomePageClient({ projects, services, stats }: { projects: IProject[], services: IService[], stats: IStatisticItem[] | null }) {
  const STRAPI_URL = "http://127.0.0.1:1337";

  return (
    <main className="pt-[80px] bg-white">
      {/* 1. HERO СЕКЦИЯ */}
      <section className="relative h-[130vh] flex flex-col items-center justify-center text-center overflow-hidden -mt-[80px]">
        <Image
          src={Hero}
          alt="Озеленение Астаны"
          fill
          className="object-cover z-0 "
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 p-4 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[50px] md:text-9xl font-extrabold leading-tight text-white "
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            Создаем красоту
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200"
          >
            Профессиональное озеленение и ландшафтный дизайн для городских пространств и частных территорий.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex gap-4 justify-center"
          >
            <Button asChild className="bg-white hover:bg-gray-200 text-green-600 rounded-full px-10 py-8">
              <Link href="/services" className="text-xl">Подробнее</Link>
            </Button>
          
          </motion.div>
          {stats && stats.length > 0 && (
            <Section >
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-8 py-4 md:p-12 border border-white/10 shadow-lg mt-20">
                  
                  <div className="flex flex-col md:flex-row items-center justify-around w-full gap-8 md:gap-4">
                    {stats.map((stat, index) => (
                      <div key={stat.id} className="contents">
                        {/* Блок для одного элемента статистики */}
                        <div className="text-center flex-1">
                          <p className="text-4xl md:text-5xl font-bold text-green-400">
                            {stat.number}
                          </p>
                          <p className="text-gray-300 mt-2 text-sm md:text-base">
                            {stat.label}
                          </p>
                        </div>
                        
                        {/* Вертикальный разделитель. 
                          Он будет показан только если это не последний элемент.
                          И только на экранах md и выше (md:block).
                        */}
                        {index < stats.length - 1 && (
                          <div className="hidden md:block border-l border-white h-24"></div>
                        )}
                      </div>
                    ))}
                  </div>
              </div>
            </Section>
          )}
        </div>
       {/* {stats && stats.length > 0 && (
        <Section>
           <div className="container mx-auto px-4 py-16 md:py-24 z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Надежность, проверенная временем</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.id} className="text-center">
                    <p className="text-5xl font-bold text-green-400">{stat.number}</p>
                    <p className="text-gray-400 mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
          </div>
        </Section>
      )} */}
      </section>
       <Section>
        <div className="container mx-auto px-10 py-16 md:py-24">
          {/* Верхняя часть с заголовком */}
          <div className="max-w-2xl mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-green-600">Озеленение города</span><br />
              наша главная задача
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Мы верим, что гармоничная городская среда начинается с заботы о природе. Наша работа — создавать устойчивые, красивые и функциональные зеленые пространства для жизни и отдыха.
            </p>
          </div>

          {/* Нижняя часть с карточками и изображением */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Левая колонка с карточками */}
            <div className="space-y-8">
              {/* Карточка "Наша Миссия" */}
              <Card className="bg-gray-50/50 border shadow-xl rounded-2xl">
                <CardContent className="p-8 flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Наша Миссия</h3>
                    <p className="text-gray-500">
                      Создавать экологически здоровую и эстетически привлекательную городскую среду, повышая качество жизни жителей Астаны через профессиональное озеленение.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Карточка "Наша Цель" */}
              <Card className="bg-gray-50/50 border shadow-xl rounded-2xl">
                <CardContent className="p-8 flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Goal className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Наша Цель</h3>
                    <p className="text-gray-500">
                      Стать лидером в применении инновационных и устойчивых подходов в ландшафтном дизайне, ежегодно увеличивая площадь зеленых насаждений в столице.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Правая колонка с изображением */}
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg mt-8 md:mt-0">
               <Image
                  src={goal}
                  alt="Красивый зеленый сад"
                  fill
                  className="object-cover"
                  quality={90}
               />
            </div>
          </div>
        </div>
      </Section>
       <Section>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Левая колонка с изображением */}
            <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={kushenov}
                alt="Сотрудник Астана Зеленстрой за работой"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Правая колонка с текстом */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                Город выбирает<br/>
                <span className="text-green-600">Нас</span>
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Многолетний опыт и слаженная работа команды позволяют нам реализовывать проекты любой сложности, неизменно добиваясь высочайшего качества.
              </p>
              
              {/* Список преимуществ */}
              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-lg font-semibold text-gray-700">Опыта</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-lg font-semibold text-gray-700">Организованность</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-lg font-semibold text-gray-700">Сплоченность</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-lg font-semibold text-gray-700">Качество</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
      {/* 2. БЛОК ЗАДАЧ */}
       {services && services.length > 0 && (
        <Section>
          <div className="container mx-auto px-4 py-16 md:py-24">
            {/* Верхняя часть с заголовком */}
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                Наши услуги
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Мы предлагаем полный спектр решений для создания и поддержания идеальных зеленых пространств, сочетая творческий подход с научными знаниями.
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
                            {/* Здесь можно использовать краткое описание из Strapi */}
                            Комплексный подход к созданию гармоничных и функциональных ландшафтов.
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
      )}
      {/* 3. БЛОК ИЗБРАННЫХ ПРОЕКТОВ */}
      {projects && projects.length > 0 && (
        <Section>
          <div className="bg-gray-50/70 py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Наши знаковые проекты</h2>
                <p className="text-gray-500 mt-4 text-lg">Мы гордимся своей работой и ее вкладом в развитие столицы.</p>
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
                    Все проекты <ArrowRight className="ml-2 h-5 w-5"/>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* 4. БЛОК "В ЦИФРАХ" */}


      {/* 5. ФИНАЛЬНЫЙ CTA */}
      <Section>
        <div className="bg-green-800/80">
          <div className="container mx-auto text-center px-4 py-16">
            <h2 className="text-3xl font-bold text-white">Готовы преобразить ваше пространство?</h2>
            <p className="text-green-200 mt-4 max-w-2xl mx-auto">Свяжитесь с нами сегодня, чтобы обсудить ваш проект и получить бесплатную консультацию от наших экспертов.</p>
            <Button asChild size="lg" variant="secondary" className="mt-8 bg-white text-black hover:bg-gray-200">
              <Link href="/contacts">Обсудить проект</Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}