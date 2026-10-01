'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { getLocalizedText } from '@/lib/i18n';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const CtaBlock: React.FC<BlockRendererProps> = ({
  block,
  locale = 'ru',
  breakpoint = 'desktop',
}) => {
  const content = block.content || {};

  const getLoc = (val: unknown): string => getLocalizedText(val, locale);

  const title = getLoc(content.title) || 'Готовы запустить свой сайт сегодня?';
  const subtitle = getLoc(content.subtitle) || 'Присоединяйтесь к тысячам создателей, экономящих часы на вёрстке.';
  const primaryButtonText = getLoc(content.primaryButtonText) || 'Начать бесплатно';
  const secondaryButtonText = getLoc(content.secondaryButtonText) || 'Связаться с нами';
  const guaranteeText = getLoc(content.guaranteeText) || 'Без привязки карты • Мгновенный доступ';

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
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl text-center">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 size-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 size-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-200">
              <Sparkles className="size-3.5" />
              <span>Быстрый старт</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed max-w-xl mx-auto">
              {subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {primaryButtonText && (
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-white text-indigo-950 hover:bg-zinc-100 font-bold text-sm shadow-xl transition-all flex items-center gap-2"
                >
                  {primaryButtonText} <ArrowRight className="size-4" />
                </button>
              )}
              {secondaryButtonText && (
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-sm border border-white/20 transition-all"
                >
                  {secondaryButtonText}
                </button>
              )}
            </div>

            {guaranteeText && (
              <p className="text-xs text-indigo-200/80 pt-2 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                <span>{guaranteeText}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
