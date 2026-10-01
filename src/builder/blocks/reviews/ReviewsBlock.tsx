'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { getLocalizedText } from '@/lib/i18n';
import { Star, Quote } from 'lucide-react';

export const ReviewsBlock: React.FC<BlockRendererProps> = ({
  block,
  locale = 'ru',
  breakpoint = 'desktop',
}) => {
  const content = block.content || {};
  const getLoc = (val: unknown): string => getLocalizedText(val, locale);

  const title = getLoc(content.title) || 'Что говорят наши клиенты';
  const subtitle = getLoc(content.subtitle) || 'Более 1,000 довольных компаний уже используют наш конструктор.';
  const reviews = Array.isArray(content.reviews) ? content.reviews : [
    {
      author: 'Ольга Васильева',
      company: 'Digital Agency Apex',
      text: {
        ru: 'Конструктор сократил время запуска лендингов для клиентов в 4 раза. Очень удобная система экспорта!',
        en: 'This site builder reduced our client landing page delivery time by 4x. Amazing export feature!',
      },
      rating: 5,
    },
    {
      author: 'Михаил Тарасов',
      company: 'TechVentures',
      text: {
        ru: 'Идеальное решение для быстрого тестирования продуктовых гипотез. Мультиязычность работает безупречно.',
        en: 'Perfect solution for rapid product hypothesis validation. Multilingual support works flawlessly.',
      },
      rating: 5,
    },
    {
      author: 'Анна Морозова',
      company: 'BeautyStore Online',
      text: {
        ru: 'Полный контроль над адаптивностью на смартфонах и планшетах. Результат превзошел все ожидания.',
        en: 'Complete control over responsive styling on mobile and tablet. Exceeded all our expectations.',
      },
      rating: 5,
    },
  ];

  const padding = resolveResponsiveValue(block.styles?.spacing?.padding, breakpoint) || {
    top: 72,
    right: 24,
    bottom: 72,
    left: 24,
  };

  const paddingStyle = {
    paddingTop: `${padding.top}px`,
    paddingRight: `${padding.right}px`,
    paddingBottom: `${padding.bottom}px`,
    paddingLeft: `${padding.left}px`,
  };

  return (
    <section style={paddingStyle} className="w-full bg-white dark:bg-zinc-950 transition-all">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Отзывы
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r: any, idx: number) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: r.rating || 5 }).map((_, sIdx) => (
                    <Star key={sIdx} className="size-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="size-6 text-indigo-400/40 mb-2" />
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic mb-6">
                  &ldquo;{getLoc(r.text)}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800">
                <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">{r.author}</h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{r.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
