// src/components/StatsBlock.tsx

// 1. Определяем типы данных, которые компонент будет принимать в качестве props (свойств).
// Это хорошая практика при использовании TypeScript для избежания ошибок.
interface IStatisticItem {
  id: number;
  number: string;
  label: string;
}

interface StatsBlockProps {
  stats: IStatisticItem[] | null;
}

// 2. Создаем сам компонент.
export function StatsBlock({ stats }: StatsBlockProps) {
  // Если данные о статистике по какой-то причине не пришли,
  // компонент просто ничего не будет отображать.
  if (!stats || stats.length === 0) {
    return null; 
  }

  return (
    // 3. Основной контейнер. Стили создают полупрозрачный, размытый фон 
    // со скругленными углами и тонкой белой рамкой.
    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-lg">
      
      {/* 4. Flex-контейнер для расположения элементов. */}
      {/* На мобильных устройствах элементы будут в колонку (flex-col), с отступом gap-8. */}
      {/* На экранах среднего размера и больше (md:) - в строку (flex-row), с отступом gap-4. */}
      <div className="flex flex-col md:flex-row items-center justify-around w-full gap-8 md:gap-4">
        
        {stats.map((stat, index) => (
          // 5. Пробегаемся по массиву stats и для каждого элемента создаем верстку.
          // React.Fragment нужен, чтобы сгруппировать элемент и его разделитель.
          <div key={stat.id} className="contents">

            {/* Блок для одного элемента статистики */}
            <div className="text-center flex-1">
              <p className="text-4xl md:text-5xl font-bold text-white">
                {stat.number}
              </p>
              <p className="text-gray-300 mt-2 text-sm md:text-base">
                {stat.label}
              </p>
            </div>
            
            {/* 6. Вертикальный разделитель. */}
            {/* Условие "index < stats.length - 1" не дает разделителю появиться после последнего элемента. */}
            {/* "hidden md:block" показывает разделитель только на больших экранах. */}
            {index < stats.length - 1 && (
              <div className="hidden md:block border-l border-white/50 h-16"></div>
            )}

          </div>
        ))}
        
      </div>
    </div>
  );
}