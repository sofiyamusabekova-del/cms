'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { getBlockDefinition } from '@/builder/registry/blockRegistry';
import { SpacingValue, ResponsiveValue } from '@/types';
import { getByPath } from '@/lib/setByPath';
import {
  hasBreakpointOverride,
  resolveResponsiveValue,
  setResponsiveBreakpoint,
} from '@/builder/renderer/styleResolver';
import {
  SlidersHorizontal,
  FileText,
  Layout,
  Palette,
  Smartphone,
  Info,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
import {
  TextControl,
  TextareaControl,
  SelectControl,
  SliderControl,
  SpacingControl,
  ColorControl,
  SegmentedControl,
  TypographyControl,
} from '@/components/controls';

import { GlobalStylesInspector } from './GlobalStylesInspector';

export const Inspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'layout' | 'style' | 'responsive' | 'global'>('content');
  const [globalMode, setGlobalMode] = useState<boolean>(false);
  const project = useEditorStore((state) => state.project);
  const selectedPageId = useEditorStore((state) => state.selectedPageId);
  const selectedBlockId = useEditorStore((state) => state.selectedBlockId);
  const currentLocale = useEditorStore((state) => state.currentLocale);
  const currentBreakpoint = useEditorStore((state) => state.currentBreakpoint);
  const updateBlockContent = useEditorStore((state) => state.updateBlockContent);
  const updateBlockStyle = useEditorStore((state) => state.updateBlockStyle);
  const resetBlockStyleBreakpoint = useEditorStore(
    (state) => state.resetBlockStyleBreakpoint
  );
  const setBlockVariant = useEditorStore((state) => state.setBlockVariant);

  const currentPage = project?.pages.find((p) => p.id === selectedPageId);
  const selectedBlock = currentPage?.blocks.find((b) => b.id === selectedBlockId);

  if (globalMode || !selectedBlock) {
    return (
      <aside className="w-80 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col h-full shrink-0 select-none overflow-y-auto">
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-2">
            <Palette className="size-4 text-indigo-600" />
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Глобальные стили
            </span>
          </div>
          {selectedBlock && (
            <button
              onClick={() => setGlobalMode(false)}
              className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              К блоку &rarr;
            </button>
          )}
        </div>
        <GlobalStylesInspector />
      </aside>
    );
  }

  const definition = getBlockDefinition(selectedBlock.type);
  const label = definition?.label || selectedBlock.type;

  const tabs = [
    { id: 'content', label: 'Контент', icon: <FileText className="size-3.5" /> },
    { id: 'layout', label: 'Макет', icon: <Layout className="size-3.5" /> },
    { id: 'style', label: 'Стиль', icon: <Palette className="size-3.5" /> },
    { id: 'responsive', label: 'Адаптив', icon: <Smartphone className="size-3.5" /> },
  ] as const;

  // Localized helper
  const getLocalizedField = (field: unknown): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    if (typeof field === 'object') {
      const obj = field as Record<string, string>;
      return obj[currentLocale] || obj['ru'] || '';
    }
    return String(field);
  };

  const handleUpdateLocalizedField = (fieldName: string, value: string) => {
    const prevField = selectedBlock.content?.[fieldName];
    const prevObj = typeof prevField === 'object' && prevField !== null ? (prevField as Record<string, string>) : {};
    updateBlockContent(selectedBlock.id, fieldName, {
      ...prevObj,
      [currentLocale]: value,
    });
  };

  const DEFAULT_PADDING: SpacingValue = { top: 80, right: 24, bottom: 80, left: 24 };

  const writeResponsive = <T,>(path: string, value: T) => {
    const prev = getByPath<Record<string, unknown>>(
      selectedBlock.styles as Record<string, unknown>,
      path
    );
    updateBlockStyle(
      selectedBlock.id,
      path,
      setResponsiveBreakpoint(prev, currentBreakpoint, value)
    );
  };

  const currentPadding: SpacingValue =
    resolveResponsiveValue(selectedBlock.styles?.spacing?.padding, currentBreakpoint) ||
    DEFAULT_PADDING;

  const currentAlign =
    resolveResponsiveValue(selectedBlock.styles?.typography?.textAlign, currentBreakpoint) ||
    'center';

  const currentMaxWidth = Number(
    resolveResponsiveValue(selectedBlock.styles?.sizing?.maxWidth, currentBreakpoint) ?? 1200
  );
  const currentRadius = Number(
    resolveResponsiveValue(selectedBlock.styles?.border?.radius, currentBreakpoint) ?? 0
  );
  const currentGap = Number(
    resolveResponsiveValue(selectedBlock.styles?.spacing?.gap, currentBreakpoint) ?? 24
  );
  const currentFontSize = Number(
    resolveResponsiveValue(selectedBlock.styles?.typography?.fontSize, currentBreakpoint) ??
      (currentBreakpoint === 'mobile' ? 32 : currentBreakpoint === 'tablet' ? 42 : 54)
  );
  const currentFontWeight = selectedBlock.styles?.typography?.fontWeight ?? 800;
  const currentLineHeight = Number(
    resolveResponsiveValue(selectedBlock.styles?.typography?.lineHeight, currentBreakpoint) ?? 1.15
  );
  const currentLetterSpacing = Number(
    resolveResponsiveValue(selectedBlock.styles?.typography?.letterSpacing, currentBreakpoint) ?? -1
  );
  const currentTextColor = selectedBlock.styles?.typography?.color || '#18181b';

  const bgColor = selectedBlock.styles?.background?.color || '#ffffff';
  const handleBgChange = (val: string) => {
    updateBlockStyle(selectedBlock.id, 'background.color', val);
  };

  const overrideHint = (path: string) =>
    hasBreakpointOverride(
      getByPath<ResponsiveValue<unknown>>(
        selectedBlock.styles as Record<string, unknown>,
        path
      ),
      currentBreakpoint
    )
      ? 'своё'
      : 'наследование';

  return (
    <aside className="w-80 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col h-full shrink-0 select-none">
      {/* Block Meta Header */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-indigo-600" />
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {label}
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setGlobalMode(true)}
              className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-zinc-600 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-300 border border-zinc-200 dark:border-zinc-700 transition-colors"
              title="Настроить глобальные стили темы сайта"
            >
              Стили темы
            </button>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 font-semibold border border-indigo-200 dark:border-indigo-800">
              {selectedBlock.type}
            </span>
          </div>
        </div>

        {/* Selected Block ID info */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-zinc-500 font-mono bg-zinc-50 dark:bg-zinc-800/60 px-2 py-1 rounded border border-zinc-200/60 dark:border-zinc-700/60">
          <span className="text-zinc-400">ID:</span>
          <span className="truncate max-w-[200px]" title={selectedBlock.id}>
            {selectedBlock.id}
          </span>
        </div>

        {/* Variant Selector */}
        {definition?.variants && definition.variants.length > 0 && (
          <div className="mt-3">
            <SelectControl
              label="Вариант секции"
              value={selectedBlock.variant || definition.variants[0].id}
              options={definition.variants.map((v) => ({
                label: v.label,
                value: v.id,
              }))}
              onChange={(newVariant) =>
                setBlockVariant(selectedBlock.id, newVariant)
              }
            />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-2 bg-zinc-50/50 dark:bg-zinc-800/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-xs font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div className="p-2.5 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
              <Info className="size-4 shrink-0 text-indigo-500" />
              <span>
                Язык: <strong className="uppercase">{currentLocale}</strong> (текст меняется сразу)
              </span>
            </div>

            <TextControl
              label="Заголовок (Title)"
              value={getLocalizedField(selectedBlock.content?.title)}
              onChange={(val) => handleUpdateLocalizedField('title', val)}
              placeholder="Введите заголовок секции..."
            />

            <TextareaControl
              label="Подзаголовок / Описание"
              rows={3}
              value={getLocalizedField(selectedBlock.content?.subtitle)}
              onChange={(val) => handleUpdateLocalizedField('subtitle', val)}
              placeholder="Введите описание..."
            />

            {selectedBlock.content?.primaryButtonText !== undefined && (
              <TextControl
                label="Текст первой кнопки"
                value={getLocalizedField(selectedBlock.content?.primaryButtonText)}
                onChange={(val) =>
                  handleUpdateLocalizedField('primaryButtonText', val)
                }
              />
            )}

            {selectedBlock.content?.secondaryButtonText !== undefined && (
              <TextControl
                label="Текст второй кнопки"
                value={getLocalizedField(selectedBlock.content?.secondaryButtonText)}
                onChange={(val) =>
                  handleUpdateLocalizedField('secondaryButtonText', val)
                }
              />
            )}
          </div>
        )}

        {/* Layout Tab */}
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <SegmentedControl
              label="Выравнивание текста"
              value={currentAlign}
              onChange={(val) => writeResponsive('typography.textAlign', val)}
              options={[
                { id: 'left', label: <AlignLeft className="size-4" />, title: 'По левому краю' },
                { id: 'center', label: <AlignCenter className="size-4" />, title: 'По центру' },
                { id: 'right', label: <AlignRight className="size-4" />, title: 'По правому краю' },
              ]}
            />

            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-2">
                Сетка и колонки
              </span>
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Контейнер:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">Max-width 1200px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Режим:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">Responsive Grid</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Style Tab (Sprint 7.1, 7.2, 7.3, 9.1) */}
        {activeTab === 'style' && (
          <div className="space-y-5">
            <TypographyControl
              breakpoint={currentBreakpoint}
              values={{
                fontSize: currentFontSize,
                fontWeight: currentFontWeight,
                lineHeight: currentLineHeight,
                letterSpacing: currentLetterSpacing,
                textAlign:
                  currentAlign === 'justify' ||
                  currentAlign === 'left' ||
                  currentAlign === 'right'
                    ? currentAlign
                    : 'center',
                color: currentTextColor,
              }}
              overrideHint={overrideHint}
              onResponsiveChange={(path, value) => writeResponsive(path, value)}
              onFontWeightChange={(weight) =>
                updateBlockStyle(selectedBlock.id, 'typography.fontWeight', weight)
              }
              onColorChange={(color) =>
                updateBlockStyle(selectedBlock.id, 'typography.color', color)
              }
              onResetBreakpoint={(path) =>
                resetBlockStyleBreakpoint(selectedBlock.id, path, currentBreakpoint)
              }
            />

            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <SpacingControl
              label={`Внутренние отступы (${currentBreakpoint}) · ${overrideHint('spacing.padding')}`}
              value={currentPadding}
              onChange={(newVal) => writeResponsive('spacing.padding', newVal)}
              onReset={() =>
                resetBlockStyleBreakpoint(selectedBlock.id, 'spacing.padding', currentBreakpoint)
              }
            />
            </div>

            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
              <SliderControl
                label={`Максимальная ширина (${currentBreakpoint}) · ${overrideHint('sizing.maxWidth')}`}
                value={currentMaxWidth}
                min={400}
                max={1600}
                step={20}
                unit="px"
                onChange={(newVal) => writeResponsive('sizing.maxWidth', newVal)}
                onReset={() =>
                  resetBlockStyleBreakpoint(selectedBlock.id, 'sizing.maxWidth', currentBreakpoint)
                }
              />

              <SliderControl
                label="Скругление углов (Border Radius)"
                value={currentRadius}
                min={0}
                max={48}
                step={2}
                unit="px"
                onChange={(newVal) => writeResponsive('border.radius', newVal)}
                onReset={() =>
                  resetBlockStyleBreakpoint(selectedBlock.id, 'border.radius', currentBreakpoint)
                }
              />

              <SliderControl
                label={`Расстояние (Gap) · ${overrideHint('spacing.gap')}`}
                value={currentGap}
                min={8}
                max={64}
                step={4}
                unit="px"
                onChange={(newVal) => writeResponsive('spacing.gap', newVal)}
                onReset={() =>
                  resetBlockStyleBreakpoint(selectedBlock.id, 'spacing.gap', currentBreakpoint)
                }
              />
            </div>

            {/* ColorControl */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <ColorControl
                label="Фоновый цвет секции"
                value={bgColor}
                onChange={handleBgChange}
              />
            </div>
          </div>
        )}

        {/* Responsive Tab */}
        {activeTab === 'responsive' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Активный режим:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                  {currentBreakpoint}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Слайдеры пишут только в текущий breakpoint. Если значения нет, берётся
                mobile ← tablet ← desktop.
              </p>
            </div>

            <div className="text-xs space-y-2 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3">
              <div className="flex justify-between">
                <span className="text-zinc-500">Padding top</span>
                <span className="font-mono">{currentPadding.top}px</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Gap</span>
                <span className="font-mono">{currentGap}px</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Font-size</span>
                <span className="font-mono">{currentFontSize}px</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Font-weight</span>
                <span className="font-mono">{currentFontWeight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Line-height</span>
                <span className="font-mono">{currentLineHeight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Letter-spacing</span>
                <span className="font-mono">{currentLetterSpacing}px</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Text color</span>
                <span className="font-mono">{currentTextColor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Max-width</span>
                <span className="font-mono">{currentMaxWidth}px</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
