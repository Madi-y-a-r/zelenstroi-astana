// src/components/HomePageClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from "framer-motion";
import { use, useRef } from "react";
import goal from '../../public/goal.png';
import Hero from '../../public/Hero.svg';
import kushenov from '../../public/kushenov.png';
import { Target, Goal, Check } from 'lucide-react'; 
import { useTranslations } from "next-intl";
import { HeroSection } from "./home/HeroSection";
import Goals from "./home/Goals";
import { LatestNewsSection } from "./home/LatestNewsSection";
import Services from "./home/Services";
import Projects from "./home/Projects";

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
export function HomePageClient({ projects, services, stats, news }: { projects: IProject[], services: IService[], stats: IStatisticItem[], news: INewsItem[] | null }) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const t = useTranslations('HomePage');
  return (
    <main className="pt-[80px] bg-white">
      {/* 1. HERO СЕКЦИЯ */}
      <HeroSection stats={stats} />
      <Goals />
      <LatestNewsSection news={news} />
      {/* 2. БЛОК ЗАДАЧ */}
      {services && services.length > 0 && (
        <Services services={services} />
      )}

      {projects && projects.length > 0 && (
        <Projects projects={projects} />
      )}

      <Section>
        <div className="bg-green-800/80">
          <div className="container mx-auto text-center px-4 py-16">
            <h2 className="text-3xl font-bold text-white">{t('cta.title')}</h2>
            <p className="text-green-200 mt-4 max-w-2xl mx-auto">{t('cta.description')}</p>
            <Button asChild size="lg" variant="secondary" className="mt-8 bg-white text-black hover:bg-gray-200">
              <Link href="/contacts">{t('cta.button')}</Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}