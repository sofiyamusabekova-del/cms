'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { getLocalizedText } from '@/lib/i18n';

export const StatsBlock: React.FC<BlockRendererProps> = ({
  block,
  locale = 'ru',
  breakpoint = 'desktop',
}) => {
  const content = block.content || {};
  const getLoc = (val: unknown): string => getLocalizedText(val, locale);

  const stats = Array.isArray(content.stats) ? content.stats : [
    { value: '99.9%', label: { ru: 'Надёжность работы', en: 'Uptime SLA' } },
    { value: '150K+', label: { ru: 'Созданных сайтов', en: 'Websites Built' } },
    { value: '45+', label: { ru: 'Готовых блоков', en: 'Ready Blocks' } },
    { value: '24/7', label: { ru: 'Поддержка клиентов', en: 'Support' } },
  ];

  const padding = resolveResponsiveValue(block.styles?.spacing?.padding, breakpoint) || {
    top: 56,
    right: 24,
    bottom: 56,
    left: 24,
  };

  const paddingStyle = {
    paddingTop: `${padding.top}px`,
    paddingRight: `${padding.right}px`,
    paddingBottom: `${padding.bottom}px`,
    paddingLeft: `${padding.left}px`,
  };

  return (
    <section style={paddingStyle} className="w-full bg-zinc-50 dark:bg-zinc-900/60 transition-all border-y border-zinc-200/60 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((item: any, idx: number) => {
            const label = getLoc(item.label);
            return (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
