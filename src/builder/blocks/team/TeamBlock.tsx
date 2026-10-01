'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { getLocalizedText } from '@/lib/i18n';
import { User } from 'lucide-react';

export const TeamBlock: React.FC<BlockRendererProps> = ({
  block,
  locale = 'ru',
  breakpoint = 'desktop',
}) => {
  const content = block.content || {};
  const getLoc = (val: unknown): string => getLocalizedText(val, locale);

  const title = getLoc(content.title) || 'Наша команда экспертов';
  const subtitle = getLoc(content.subtitle) || 'Профессионалы с многолетним опытом в веб-разработке.';
  const members = Array.isArray(content.members) ? content.members : [
    { name: 'Алексей Смирнов', role: { ru: 'Основатель & CEO', en: 'Founder & CEO' }, bio: { ru: '10+ лет в создании цифровых продуктов', en: '10+ years in digital products' } },
    { name: 'Елена Кузнецова', role: { ru: 'Главный дизайнер', en: 'Lead Product Designer' }, bio: { ru: 'Эксперт по UX и дизайн-системам', en: 'Design system and UX expert' } },
    { name: 'Дмитрий Попов', role: { ru: 'Технический директор', en: 'CTO' }, bio: { ru: 'Архитектура высоконагруженных систем', en: 'Highload software architect' } },
    { name: 'Мария Соколова', role: { ru: 'Руководитель поддержки', en: 'Head of Support' }, bio: { ru: 'Забота о каждом пользователе 24/7', en: '24/7 customer care' } },
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
    <section style={paddingStyle} className="w-full bg-zinc-50/60 dark:bg-zinc-900/40 transition-all">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Команда
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m: any, idx: number) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-center shadow-sm hover:shadow-md transition-all group"
            >
              <div className="size-20 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <User className="size-10" />
              </div>
              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">{m.name}</h3>
              <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">{getLoc(m.role)}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">{getLoc(m.bio)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
