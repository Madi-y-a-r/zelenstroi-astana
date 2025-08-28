// src/components/AnimatedPetals.tsx
"use client";

import { motion } from "framer-motion";

// Создаем массив для 20 лепестков
const petals = Array.from({ length: 20 });

export function AnimatedPetals() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {petals.map((_, i) => {
        const startX = Math.random() * 100; // Начальная позиция по X в %
        const duration = 10 + Math.random() * 10; // Длительность падения
        const delay = Math.random() * 15; // Задержка перед началом
        const rotation = -20 + Math.random() * 40; // Начальный наклон
        const drift = -10 + Math.random() * 20; // Смещение в сторону при падении

        return (
          <motion.div
            key={i}
            className="absolute text-green-500 opacity-30"
            style={{
              left: `${startX}%`,
              top: "-10%", // Начинаем за пределами экрана
              fontSize: `${10 + Math.random() * 15}px`, // Разный размер
            }}
            initial={{ y: 0, x: 0, rotate: rotation }}
            animate={{
              y: "110vh", // Падаем за пределы экрана
              x: `${drift}vw`, // Смещаемся в сторону
              rotate: rotation + (Math.random() > 0.5 ? 180 : -180), // Вращаемся
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            &#10047; {/* Символ лепестка */}
          </motion.div>
        );
      })}
    </div>
  );
}