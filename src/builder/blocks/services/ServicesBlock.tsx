'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { getLocalizedText } from '@/lib/i18n';
import { ArrowRight, Check } from 'lucide-react';

export const ServicesBlock: React.FC<BlockRendererProps> = ({
  block,
  locale = 'ru',
  breakpoint = 'desktop',
}) => {
  const content = block.content || {};

  const getLoc = (val: unknown): string => getLocalizedText(val, locale);

  const title = getLoc(content.title) || 'Наши услуги и решения';
  const subtitle = getLoc(content.subtitle) || 'Профессиональный комплекс услуг для вашего цифрового бизнеса.';
  const services = Array.isArray(content.services) ? content.services : [];

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
    <section style={paddingStyle} className="w-full bg-white dark:bg-zinc-900 transition-all">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Услуги
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item, idx) => {
            const sTitle = getLoc(item.title);
            const sDesc = getLoc(item.description);
            const sPrice = getLoc(item.price);
            const sTag = getLoc(item.tag);
            const features = Array.isArray(item.features) ? item.features : [];

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 flex flex-col justify-between hover:shadow-lg hover:border-indigo-400/80 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {sTag && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                        {sTag}
                      </span>
                    )}
                    {sPrice && (
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {sPrice}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    {sTitle}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                    {sDesc}
                  </p>
                  {features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {features.map((f: unknown, fIdx: number) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                          <Check className="size-3.5 text-emerald-500 shrink-0" />
                          <span>{getLoc(f)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  Заказать услугу <ArrowRight className="size-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
