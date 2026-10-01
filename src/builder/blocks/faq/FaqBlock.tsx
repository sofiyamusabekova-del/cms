'use client';

import React, { useState } from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { getLocalizedText } from '@/lib/i18n';
import { ChevronDown } from 'lucide-react';

export const FaqBlock: React.FC<BlockRendererProps> = ({
  block,
  locale = 'ru',
  breakpoint = 'desktop',
}) => {
  const content = block.content || {};
  const getLoc = (val: unknown): string => getLocalizedText(val, locale);

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const title = getLoc(content.title) || 'Часто задаваемые вопросы';
  const subtitle = getLoc(content.subtitle) || 'Ответы на самые популярные вопросы о нашем конструкторе.';
  const items = Array.isArray(content.items) ? content.items : [
    {
      q: { ru: 'Нужно ли уметь программировать для работы?', en: 'Do I need coding skills to use the builder?' },
      a: { ru: 'Нет, конструктор полностью визуальный. Вы можете настраивать стили, отступы и цвета без единой строчки кода.', en: 'No, the builder is 100% visual. You can configure layouts, styling and colors with zero code.' },
    },
    {
      q: { ru: 'Могу ли я экспортировать сайт и запустить его на своем хостинге?', en: 'Can I export the site and run it on my own hosting?' },
      a: { ru: 'Да! Доступен полный экспорт чистого HTML/CSS/JS в виде архива ZIP, готового для загрузки на любой сервер.', en: 'Yes! Full clean HTML/CSS/JS static export is available as a ZIP archive ready for any hosting.' },
    },
    {
      q: { ru: 'Как работает мультиязычность?', en: 'How does multilingual support work?' },
      a: { ru: 'Каждый текстовый элемент хранит переводы для всех добавленных языков (RU, EN, UZ и др.) и переключается мгновенно.', en: 'Every text element stores translations for all active locales (RU, EN, UZ, etc.) with instant switching.' },
    },
    {
      q: { ru: 'Поддерживаются ли поисковые системы и SEO?', en: 'Is it SEO-friendly for search engines?' },
      a: { ru: 'Да, для каждой страницы вы можете задавать SEO Title, Meta Description, OpenGraph теги и настраивать robots/sitemap.', en: 'Yes, every page supports customizable SEO titles, meta descriptions, OpenGraph tags, and robots/sitemap.' },
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
    <section style={paddingStyle} className="w-full bg-zinc-50/50 dark:bg-zinc-900/40 transition-all">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item: any, idx: number) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span>{getLoc(item.q)}</span>
                  <ChevronDown
                    className={`size-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
                    {getLoc(item.a)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
