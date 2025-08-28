// src/app/contacts/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Определяем тип для страницы Контакты
interface IContact {
  title: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  mapEmbedUrl: string;
}

// Функция для получения данных
async function getContactData() {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch Contact data');
  const response = await res.json();
  return response.data;
}

// Компонент страницы
export default async function ContactPage() {
  const data: IContact = await getContactData();

  return (
    <main className="container mx-auto p-4 md:p-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
      </section>

      <section className="grid md:grid-cols-2 gap-12">
        {/* Блок с контактной информацией */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg">
              <p><strong>Адрес:</strong> {data.address}</p>
              <p><strong>Телефон:</strong> <a href={`tel:${data.phone}`} className="text-green-700 hover:underline">{data.phone}</a></p>
              <p><strong>Email:</strong> <a href={`mailto:${data.email}`} className="text-green-700 hover:underline">{data.email}</a></p>
              <p><strong>Часы работы:</strong> {data.workingHours}</p>
            </CardContent>
          </Card>
        </div>

        {/* Блок с картой */}
        <div>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Мы на карте</CardTitle>
            </CardHeader>
            <CardContent>
              {data.mapEmbedUrl && (
                <iframe
                  src={data.mapEmbedUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}