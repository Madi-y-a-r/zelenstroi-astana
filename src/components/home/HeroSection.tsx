"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Section } from "@/components/Section"; // Предполагаем, что Section тоже вынесен
import { StatsBlock } from "@/components/StatsBlock";
import Hero from '../../../public/Hero.svg';
import { useTranslations } from "next-intl";

// Принимаем данные для статистики как props
export function HeroSection({ stats }: { stats: any[] | null }) {
  const t = useTranslations('HeroSection');
  return (
    <section className="relative h-[130vh] flex flex-col items-center justify-center text-center overflow-hidden -mt-[80px]">
      <Image
        src={Hero}
        alt="Озеленение Астаны"
        fill
        className="object-cover z-0"
        quality={90}
        priority
      />
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="relative z-20 p-4 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[50px] md:text-9xl font-extrabold leading-tight text-white"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          {t('title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200"
        >
          {t('description')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <Button asChild className="bg-white hover:bg-gray-200 text-green-600 rounded-full px-10 py-8">
            <Link href="/services" className="text-xl">{t('about')}</Link>
          </Button>
        </motion.div>
        
        {/* Блок статистики теперь является частью Hero-секции */}
        <div className="mt-20 w-full max-w-4xl">
           <StatsBlock stats={stats} />
        </div>
      </div>
    </section>
  );
}