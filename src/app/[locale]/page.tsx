

import { HomePageClient } from "@/components/HomePageClient";



// --- ФУНКЦИИ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ ---
const STRAPI_URL = "http://127.0.0.1:1337";

// Получаем 3 последних проекта для главной страницы
async function getFeaturedProjects(lang: string) {
  const url = `${STRAPI_URL}/api/projects?locale=${lang}&populate=coverImage&pagination[limit]=3&sort=publishedAt:desc`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  const response = await res.json();
  return response.data;
}

// Получаем 3 услуги
async function getFeaturedServices(lang: string) {
  const url = `${STRAPI_URL}/api/services?locale=${lang}&populate=image&pagination[limit]=3`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  const response = await res.json();
  return response.data;
}

// Получаем статистику со страницы "О компании"
async function getStats(lang: string) {
    const url = `${STRAPI_URL}/api/about-us?locale=${lang}&populate[stats]=true`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const response = await res.json();
    return response.data.stats;
}
// --- КОНЕЦ ФУНКЦИЙ ---


export default async function HomePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang;
  const [projects, services, stats] = await Promise.all([
    getFeaturedProjects(lang),
    getFeaturedServices(lang),
    getStats(lang),
  ]);

  return (
    <HomePageClient
      projects={projects} 
      services={services} 
      stats={stats} 
    />
  );
}