

import { HomePageClient } from "@/components/HomePageClient";
import { fetchApi } from "@/lib/strapi";
import { getLocale } from "next-intl/server";


async function getFeaturedProjects(locale: string) {
  return fetchApi<IProject[]>('/api/projects', locale, {
    populate: 'coverImage',
    'pagination[limit]': 3,
    'sort': 'publishedAt:desc',
  });
}

async function getFeaturedServices(locale: string) {
  return fetchApi<IService[]>('/api/services', locale, {
    populate: 'image',
    'pagination[limit]': 3,
  });
}

async function getStats(locale: string) {
  const response = await fetchApi<any>('/api/about-us', locale, {
    'populate[stats]': 'true'
  });
  return response.stats;
}
async function getLatestNews(locale: string) {
  return fetchApi<INewsItem[]>('/api/newspapers', locale, {
    populate: 'image',
    'sort[0]': 'publishedDate:desc',
    'pagination[limit]': "100",
  });
}



export default async function HomePage() {
  const locale = await getLocale();
  const [projects, services, stats, news] = await Promise.all([
    getFeaturedProjects(locale),
    getFeaturedServices(locale),
    getStats(locale),
    getLatestNews(locale),
  ]);

  return (
    <HomePageClient
      projects={projects} 
      services={services} 
      stats={stats}
      news={news}
    />
  );
}