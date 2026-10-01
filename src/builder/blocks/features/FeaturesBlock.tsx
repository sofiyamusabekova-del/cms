'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { getLocalizedText } from '@/lib/i18n';
import { Zap, Shield, Sparkles, Smartphone, Gauge, Award } from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  zap: Zap,
  shield: Shield,
  sparkles: Sparkles,
  smartphone: Smartphone,
  gauge: Gauge,
  award: Award,
};

export const FeaturesBlock: React.FC<BlockRendererProps> = ({
  block,
  locale = 'ru',
  breakpoint = 'desktop',
}) => {
  const content = block.content || {};

  const getLoc = (val: unknown): string => getLocalizedText(val, locale);

  const title = getLoc(content.title) || 'Преимущества нашей платформы';
  const subtitle = getLoc(content.subtitle) || 'Всё необходимое для быстрого и качественного запуска сайтов любого масштаба.';
  const items = Array.isArray(content.items) ? content.items : [];

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
    <section style={paddingStyle} className="w-full bg-zinc-50/50 dark:bg-zinc-900/50 transition-all">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Особенности
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const itemTitle = getLoc(item.title);
            const itemDesc = getLoc(item.description);
            const IconComp = ICON_MAP[item.icon] || Sparkles;

            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all group"
              >
                <div className="size-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <IconComp className="size-5" />
                </div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-2">
                  {itemTitle}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {itemDesc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
