'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { getLocalizedText } from '@/lib/i18n';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const TextImageBlock: React.FC<BlockRendererProps> = ({
  block,
  locale = 'ru',
  breakpoint = 'desktop',
}) => {
  const content = block.content || {};

  const getLoc = (val: unknown): string => getLocalizedText(val, locale);

  const title = getLoc(content.title) || 'Удобный визуальный интерфейс';
  const subtitle = getLoc(content.subtitle) || 'С интуитивным управлением отступами, шрифтами и цветовой палитрой.';
  const bullets = Array.isArray(content.bullets) ? content.bullets : [];
  const ctaText = getLoc(content.ctaText) || 'Узнать больше';

  const isImageLeft = block.variant === 'imageLeft';

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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column or Right Column depending on variant */}
        <div className={`space-y-6 ${isImageLeft ? 'order-2 md:order-2' : 'order-1 md:order-1'}`}>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            О конструкторе
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight">
            {title}
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {subtitle}
          </p>

          {bullets.length > 0 && (
            <ul className="space-y-3 pt-2">
              {bullets.map((b: unknown, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{getLoc(b)}</span>
                </li>
              ))}
            </ul>
          )}

          {ctaText && (
            <div className="pt-2">
              <button
                type="button"
                style={{ backgroundColor: 'var(--color-primary, #4f46e5)' }}
                className="px-5 py-2.5 rounded-xl hover:opacity-90 text-white font-medium text-xs shadow-md shadow-indigo-600/20 transition-all inline-flex items-center gap-2"
              >
                {ctaText} <ArrowRight className="size-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Visual Mockup Container */}
        <div className={`${isImageLeft ? 'order-1 md:order-1' : 'order-2 md:order-2'}`}>
          <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-indigo-50 via-violet-50 to-pink-50 dark:from-zinc-800 dark:via-zinc-800/80 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 p-8 flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden group">
            <div className="size-20 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xl mb-4 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="size-10" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
              Visual Editor Preview
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mt-1">
              Редактируйте прямо в реальном времени с поддержкой всех устройств.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
