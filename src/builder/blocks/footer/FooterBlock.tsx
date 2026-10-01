'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { getLocalizedText } from '@/lib/i18n';
import { Layers } from 'lucide-react';

export const FooterBlock: React.FC<BlockRendererProps> = ({
  block,
  locale = 'ru',
  breakpoint = 'desktop',
}) => {
  const content = block.content || {};
  const getLoc = (val: unknown): string => getLocalizedText(val, locale);

  const brandName = getLoc(content.brandName) || 'Visual Site Builder';
  const tagline = getLoc(content.tagline) || 'Современный визуальный конструктор сайтов для бизнеса и специалистов.';
  const copyright = getLoc(content.copyright) || `© ${new Date().getFullYear()} Visual Site Builder. Все права защищены.`;

  const columns = Array.isArray(content.columns) ? content.columns : [
    {
      title: { ru: 'Продукт', en: 'Product' },
      links: [
        { label: { ru: 'Возможности', en: 'Features' }, url: '#' },
        { label: { ru: 'Тарифы', en: 'Pricing' }, url: '#' },
        { label: { ru: 'Шаблоны', en: 'Templates' }, url: '#' },
      ],
    },
    {
      title: { ru: 'Ресурсы', en: 'Resources' },
      links: [
        { label: { ru: 'Документация', en: 'Docs' }, url: '#' },
        { label: { ru: 'Блог', en: 'Blog' }, url: '#' },
        { label: { ru: 'Поддержка', en: 'Support' }, url: '#' },
      ],
    },
    {
      title: { ru: 'Компания', en: 'Company' },
      links: [
        { label: { ru: 'О нас', en: 'About Us' }, url: '#' },
        { label: { ru: 'Контакты', en: 'Contacts' }, url: '#' },
        { label: { ru: 'Политика конфиденциальности', en: 'Privacy Policy' }, url: '#' },
      ],
    },
  ];

  const padding = resolveResponsiveValue(block.styles?.spacing?.padding, breakpoint) || {
    top: 64,
    right: 24,
    bottom: 32,
    left: 24,
  };

  const paddingStyle = {
    paddingTop: `${padding.top}px`,
    paddingRight: `${padding.right}px`,
    paddingBottom: `${padding.bottom}px`,
    paddingLeft: `${padding.left}px`,
  };

  return (
    <footer style={paddingStyle} className="w-full bg-zinc-900 text-zinc-300 border-t border-zinc-800 transition-all">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="size-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Layers className="size-4" />
              </div>
              <span>{brandName}</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              {tagline}
            </p>
          </div>

          {columns.map((col: any, idx: number) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                {getLoc(col.title)}
              </h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                {col.links?.map((lnk: any, lIdx: number) => (
                  <li key={lIdx}>
                    <a href={lnk.url} className="hover:text-white transition-colors">
                      {getLoc(lnk.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>{copyright}</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono uppercase bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">
              Visual Builder v1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
