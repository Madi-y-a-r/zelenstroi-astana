// src/components/Footer.tsx
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto p-8 text-center text-muted-foreground">
        <p>&copy; {currentYear} ТОО &quot;Астана Зеленстрой&quot;. Все права защищены.</p>
        <p className="mt-2">г. Астана, ул. Пушкина, 45</p>
      </div>
    </footer>
  );
}