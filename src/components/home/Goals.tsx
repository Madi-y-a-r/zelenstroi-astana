import React from 'react'
import { Section } from '../Section'
import { Card, CardContent } from '../ui/card'
import { Goal, Target } from 'lucide-react'
import Image from 'next/image'
import goal from '../../../public/goal.png';
import { useTranslations } from 'next-intl'
const Goals = () => {
  const t = useTranslations('GoalsHome');
  return (
    <Section>
        <div className="container mx-auto px-10 py-16 md:py-24">
          {/* Верхняя часть с заголовком */}
          <div className="max-w-2xl mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-green-600">{t('our_goals')}</span><br />
              {t('our_goals_2')}
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              {t('our_goals_desc')}
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
                    <h3 className="text-xl font-bold mb-2">{t('our_mission')}</h3>
                    <p className="text-gray-500">
                      {t('our_mission_desc')}
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
                    <h3 className="text-xl font-bold mb-2">{t('our_goal')}</h3>
                    <p className="text-gray-500">
                      {t('our_goal_desc')}
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
  )
}

export default Goals