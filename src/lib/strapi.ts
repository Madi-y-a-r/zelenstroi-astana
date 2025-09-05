// src/lib/strapi.ts

// Тип для данных, возвращаемых из Strapi
type StrapiApiResponse<T> = {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Универсальная функция для выполнения запросов к Strapi API.
 * @param path - Путь к API эндпоинту (например, '/api/projects')
 * @param locale - Языковая локаль ('ru' или 'kk')
 * @param urlParamsObject - Дополнительные параметры URL (populate, filters, etc.)
 * @returns - Данные из Strapi
 */
export async function fetchApi<T>(
  path: string,
  locale: string,
  urlParamsObject: Record<string, any> = {}
): Promise<T> {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

  // Собираем URL с параметрами
  const queryString = new URLSearchParams({
    locale,
    ...urlParamsObject,
  }).toString();
  
  const requestUrl = `${STRAPI_URL}${path}?${queryString}`;

  

  try {
    const res = await fetch(requestUrl, { cache: 'no-store' });
      console.log(`[fetchApi] Запрос на URL: ${requestUrl}`);
    if (!res.ok) {
      console.error(`[Strapi API Error] Status: ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error(`[Strapi API Error] Body: ${errorBody}`);
      throw new Error(`Failed to fetch data from Strapi. URL: ${requestUrl}`);
    }

    const data: StrapiApiResponse<T> = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error in fetchApi:", error);
    throw error; // Пробрасываем ошибку дальше
  }
}