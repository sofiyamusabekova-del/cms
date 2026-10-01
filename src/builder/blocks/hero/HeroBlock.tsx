'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { useEditorStore } from '@/store/editorStore';
import { InlineTextEdit } from '@/components/editor/InlineTextEdit';
import { getLocalizedText } from '@/lib/i18n';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

export const HeroBlock: React.FC<BlockRendererProps> = ({
  block,
  locale = 'ru',
  breakpoint = 'desktop',
  mode = 'editor',
}) => {
  const updateBlockContent = useEditorStore((state) => state.updateBlockContent);
  const content = block.content || {};

  const getLoc = (val: unknown): string => getLocalizedText(val, locale);

  const title = getLoc(content.title) || 'Заголовок секции Hero';
  const subtitle = getLoc(content.subtitle) || 'Описание и подзаголовок секции Hero';
  const primaryButtonText = getLoc(content.primaryButtonText) || 'Начать';
  const secondaryButtonText = getLoc(content.secondaryButtonText) || 'Подробнее';

  const handleUpdateTitle = (newTitle: string) => {
    const prev = typeof content.title === 'object' ? (content.title as Record<string, string>) : {};
    updateBlockContent(block.id, 'title', { ...prev, [locale]: newTitle });
  };

  const handleUpdateSubtitle = (newSub: string) => {
    const prev = typeof content.subtitle === 'object' ? (content.subtitle as Record<string, string>) : {};
    updateBlockContent(block.id, 'subtitle', { ...prev, [locale]: newSub });
  };

  const padding = resolveResponsiveValue(block.styles?.spacing?.padding, breakpoint) || {
    top: 80,
    right: 24,
    bottom: 80,
    left: 24,
  };

  const textAlign = resolveResponsiveValue(block.styles?.typography?.textAlign, breakpoint) || (
    block.variant === 'split' ? 'left' : 'center'
  );

  const paddingStyle = {
    paddingTop: `${padding.top}px`,
    paddingRight: `${padding.right}px`,
    paddingBottom: `${padding.bottom}px`,
    paddingLeft: `${padding.left}px`,
  };

  const maxWidth = resolveResponsiveValue(block.styles?.sizing?.maxWidth, breakpoint) || 1200;
  const borderRadius = resolveResponsiveValue(block.styles?.border?.radius, breakpoint) || 0;
  const gap = resolveResponsiveValue(block.styles?.spacing?.gap, breakpoint) || 24;

  const backgroundColor = block.styles?.background?.color;
  const backgroundStyle = backgroundColor ? { backgroundColor } : {};

  const sectionStyle: React.CSSProperties = {
    ...paddingStyle,
    ...backgroundStyle,
    borderRadius: `${borderRadius}px`,
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: `${maxWidth}px`,
  };

  const titleFontSize = resolveResponsiveValue(block.styles?.typography?.fontSize, breakpoint) || (
    breakpoint === 'mobile' ? 32 : breakpoint === 'tablet' ? 42 : 54
  );
  const titleFontWeight = block.styles?.typography?.fontWeight ?? 800;
  const titleLineHeight =
    resolveResponsiveValue(block.styles?.typography?.lineHeight, breakpoint) ?? 1.15;
  const titleLetterSpacing =
    resolveResponsiveValue(block.styles?.typography?.letterSpacing, breakpoint) ?? -1;
  const titleColor = block.styles?.typography?.color || '#18181b';

  const headingStyle: React.CSSProperties = {
    fontSize: `${titleFontSize}px`,
    fontWeight: titleFontWeight,
    lineHeight: titleLineHeight,
    letterSpacing: `${titleLetterSpacing}px`,
    color: titleColor,
    textAlign,
  };

  const headingClassName = 'block w-full';

  if (block.variant === 'split') {
    return (
      <section
        style={sectionStyle}
        className="relative w-full overflow-hidden bg-white dark:bg-zinc-900 transition-all"
      >
        <div
          style={{ ...containerStyle, gap: `${gap}px` }}
          className="mx-auto grid grid-cols-1 md:grid-cols-2 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              <Sparkles className="size-3.5" />
              <span>Visual Site Builder</span>
            </div>

            {mode === 'editor' ? (
              <InlineTextEdit
                as="h1"
                value={title}
                onChange={handleUpdateTitle}
                style={headingStyle}
                className={headingClassName}
              />
            ) : (
              <h1 style={headingStyle} className={headingClassName}>
                {title}
              </h1>
            )}

            {mode === 'editor' ? (
              <InlineTextEdit
                as="p"
                multiline
                value={subtitle}
                onChange={handleUpdateSubtitle}
                className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed block"
              />
            ) : (
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {primaryButtonText && (
                <button
                  style={{ backgroundColor: 'var(--color-primary, #4f46e5)' }}
                  className="px-6 py-3 rounded-xl hover:opacity-90 text-white font-medium shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
                >
                  {primaryButtonText} <ArrowRight className="size-4" />
                </button>
              )}
              {secondaryButtonText && (
                <button className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors flex items-center gap-2">
                  <Play className="size-4 text-indigo-500 fill-indigo-500/20" /> {secondaryButtonText}
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-indigo-500/10 via-purple-500/20 to-pink-500/10 border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col justify-center items-center text-center shadow-xl">
              <div className="size-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 mb-4">
                <Sparkles className="size-8" />
              </div>
              <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200">
                Live Block Preview
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mt-1">
                Секция Hero с вариантом split и адаптивными параметрами.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Centered Variant
  const alignClass =
    textAlign === 'left' ? 'text-left items-start' : textAlign === 'right' ? 'text-right items-end' : 'text-center items-center';

  return (
    <section
      style={sectionStyle}
      className={`relative w-full overflow-hidden bg-white dark:bg-zinc-900 transition-all`}
    >
      <div style={{ ...containerStyle, gap: `${gap}px` }} className={`mx-auto flex flex-col ${alignClass}`}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="size-3.5 text-indigo-500" />
          <span>Новый визуальный опыт</span>
        </div>

        {mode === 'editor' ? (
          <InlineTextEdit
            as="h1"
            value={title}
            onChange={handleUpdateTitle}
            style={headingStyle}
            className={headingClassName}
          />
        ) : (
          <h1 style={headingStyle} className={headingClassName}>
            {title}
          </h1>
        )}

        {mode === 'editor' ? (
          <InlineTextEdit
            as="p"
            multiline
            value={subtitle}
            onChange={handleUpdateSubtitle}
            className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl block w-full"
          />
        ) : (
          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {primaryButtonText && (
            <button
              style={{ backgroundColor: 'var(--color-primary, #4f46e5)' }}
              className="px-6 py-3.5 rounded-xl hover:opacity-90 text-white font-semibold shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2 text-base"
            >
              {primaryButtonText} <ArrowRight className="size-4" />
            </button>
          )}
          {secondaryButtonText && (
            <button className="px-6 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium transition-colors flex items-center gap-2 text-base">
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
