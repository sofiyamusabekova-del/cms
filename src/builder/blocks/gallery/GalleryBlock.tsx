'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { getLocalizedText } from '@/lib/i18n';
import { Image as ImageIcon } from 'lucide-react';

export const GalleryBlock: React.FC<BlockRendererProps> = ({
  block,
  locale = 'ru',
  breakpoint = 'desktop',
}) => {
  const content = block.content || {};
  const getLoc = (val: unknown): string => getLocalizedText(val, locale);

  const title = getLoc(content.title) || 'Наша галерея';
  const subtitle = getLoc(content.subtitle) || 'Примеры выполненных проектов и работ.';
  const images = Array.isArray(content.images) ? content.images : [
    { title: { ru: 'Проект 1', en: 'Project 1' }, category: { ru: 'Дизайн', en: 'Design' } },
    { title: { ru: 'Проект 2', en: 'Project 2' }, category: { ru: 'Разработка', en: 'Development' } },
    { title: { ru: 'Проект 3', en: 'Project 3' }, category: { ru: 'Маркетинг', en: 'Marketing' } },
    { title: { ru: 'Проект 4', en: 'Project 4' }, category: { ru: 'Брендинг', en: 'Branding' } },
    { title: { ru: 'Проект 5', en: 'Project 5' }, category: { ru: 'UI/UX', en: 'UI/UX' } },
    { title: { ru: 'Проект 6', en: 'Project 6' }, category: { ru: 'Мобильное приложение', en: 'Mobile App' } },
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
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Портфолио
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((item: any, idx: number) => {
            const itemTitle = getLoc(item.title);
            const itemCat = getLoc(item.category);
            const imgUrl = item.url;

            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 aspect-[4/3] border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-xl transition-all"
              >
                {imgUrl ? (
                  <img src={imgUrl} alt={itemTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-500/10 via-purple-500/15 to-pink-500/10 p-6 text-center">
                    <ImageIcon className="size-10 text-indigo-500 mb-2 opacity-60 group-hover:scale-110 transition-transform" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                  {itemCat && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                      {itemCat}
                    </span>
                  )}
                  <h3 className="font-bold text-base mt-0.5">{itemTitle}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
