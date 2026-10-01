'use client';

import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import { ColorControl, SliderControl, SelectControl, TextControl } from '@/components/controls';
import { Palette, Type, Sparkles, Sliders, Languages, Plus, Trash2 } from 'lucide-react';

const FONT_OPTIONS = [
  { label: 'Inter (Sans-serif)', value: 'Inter, sans-serif' },
  { label: 'Roboto (Sans-serif)', value: 'Roboto, sans-serif' },
  { label: 'Outfit (Modern Sans)', value: 'Outfit, sans-serif' },
  { label: 'Playfair Display (Serif)', value: '"Playfair Display", serif' },
  { label: 'Merriweather (Serif)', value: 'Merriweather, serif' },
  { label: 'Fira Code (Monospace)', value: '"Fira Code", monospace' },
];

export const GlobalStylesInspector: React.FC = () => {
  const project = useEditorStore((state) => state.project);
  const updateGlobalStyles = useEditorStore((state) => state.updateGlobalStyles);
  const updateGlobalColor = useEditorStore((state) => state.updateGlobalColor);
  const currentLocale = useEditorStore((state) => state.currentLocale);
  const updateTranslation = useEditorStore((state) => state.updateTranslation);
  const addLocale = useEditorStore((state) => state.addLocale);
  const removeLocale = useEditorStore((state) => state.removeLocale);

  const globalStyles = project?.globalStyles;
  const translations = project?.translations || {};
  const locales = project?.locales || ['ru', 'en', 'uz'];

  const [newLocaleCode, setNewLocaleCode] = React.useState('');

  if (!globalStyles) return null;

  return (
    <div className="p-4 space-y-6">
      {/* Colors Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
          <Palette className="size-4 text-indigo-600" />
          <span>Глобальная палитра</span>
        </div>

        <ColorControl
          label="Основной цвет (Primary)"
          value={globalStyles.colors.primary}
          onChange={(color) => updateGlobalColor('primary', color)}
        />

        <ColorControl
          label="Дополнительный цвет (Secondary)"
          value={globalStyles.colors.secondary}
          onChange={(color) => updateGlobalColor('secondary', color)}
        />

        <ColorControl
          label="Цвет текста (Text)"
          value={globalStyles.colors.text}
          onChange={(color) => updateGlobalColor('text', color)}
        />

        <ColorControl
          label="Фон сайта (Background)"
          value={globalStyles.colors.background}
          onChange={(color) => updateGlobalColor('background', color)}
        />
      </div>

      {/* Typography Section */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
          <Type className="size-4 text-indigo-600" />
          <span>Шрифты</span>
        </div>

        <SelectControl
          label="Шрифт заголовков"
          value={globalStyles.typography.headingFont}
          options={FONT_OPTIONS}
          onChange={(val) =>
            updateGlobalStyles({
              typography: { ...globalStyles.typography, headingFont: val },
            })
          }
        />

        <SelectControl
          label="Основной шрифт текста"
          value={globalStyles.typography.bodyFont}
          options={FONT_OPTIONS}
          onChange={(val) =>
            updateGlobalStyles({
              typography: { ...globalStyles.typography, bodyFont: val },
            })
          }
        />
      </div>

      {/* Layout & Radiuses Section */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
          <Sliders className="size-4 text-indigo-600" />
          <span>Скругления и Макет</span>
        </div>

        <SliderControl
          label="Скругление SM"
          value={globalStyles.radius.sm}
          min={0}
          max={16}
          step={1}
          unit="px"
          onChange={(val) =>
            updateGlobalStyles({
              radius: { ...globalStyles.radius, sm: val },
            })
          }
        />

        <SliderControl
          label="Скругление MD"
          value={globalStyles.radius.md}
          min={0}
          max={32}
          step={2}
          unit="px"
          onChange={(val) =>
            updateGlobalStyles({
              radius: { ...globalStyles.radius, md: val },
            })
          }
        />

        <SliderControl
          label="Скругление LG"
          value={globalStyles.radius.lg}
          min={0}
          max={48}
          step={2}
          unit="px"
          onChange={(val) =>
            updateGlobalStyles({
              radius: { ...globalStyles.radius, lg: val },
            })
          }
        />

        <SliderControl
          label="Максимальная ширина контейнера"
          value={globalStyles.containerMaxWidth}
          min={800}
          max={1600}
          step={20}
          unit="px"
          onChange={(val) => updateGlobalStyles({ containerMaxWidth: val })}
        />
      </div>

      {/* Translations Dictionary (Sprint 14.1, 14.2) */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
            <Languages className="size-4 text-indigo-600" />
            <span>Словарь переводов ({currentLocale.toUpperCase()})</span>
          </div>
        </div>

        {/* Locales list */}
        <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 space-y-2">
          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 block">
            Поддерживаемые языки:
          </span>
          <div className="flex flex-wrap gap-1.5 items-center">
            {locales.map((loc) => (
              <span
                key={loc}
                className="px-2 py-0.5 rounded bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 text-xs font-mono uppercase font-semibold flex items-center gap-1 text-zinc-800 dark:text-zinc-200"
              >
                {loc}
                {locales.length > 1 && (
                  <button
                    onClick={() => removeLocale(loc)}
                    className="text-zinc-400 hover:text-rose-500"
                    title="Удалить язык"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <input
              type="text"
              value={newLocaleCode}
              onChange={(e) => setNewLocaleCode(e.target.value.toLowerCase().trim())}
              placeholder="Код (de, fr...)"
              maxLength={4}
              className="w-24 px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-900 font-mono"
            />
            <button
              type="button"
              onClick={() => {
                if (newLocaleCode) {
                  addLocale(newLocaleCode);
                  setNewLocaleCode('');
                }
              }}
              className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium"
            >
              + Добавить
            </button>
          </div>
        </div>

        {/* Static Translation Keys */}
        <div className="space-y-3">
          {Object.entries(translations).map(([key, transObj]) => (
            <TextControl
              key={key}
              label={`Ключ: "${key}" (${currentLocale.toUpperCase()})`}
              value={transObj[currentLocale] || ''}
              placeholder={`Перевод для ${key}...`}
              onChange={(val) => updateTranslation(key, currentLocale, val)}
            />
          ))}
        </div>
      </div>

      {/* CSS Variables live preview info */}
      <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-xs space-y-2">
        <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-zinc-200">
          <Sparkles className="size-3.5 text-indigo-500" />
          <span>Динамические CSS Variables</span>
        </div>
        <p className="text-[11px] text-zinc-500 leading-relaxed">
          Все блоки автоматически получают эти токены через CSS переменные{' '}
          <code className="bg-zinc-200/80 dark:bg-zinc-700 px-1 py-0.5 rounded text-[10px]">
            var(--color-primary)
          </code>{' '}
          и меняют вид в реальном времени.
        </p>
      </div>
    </div>
  );
};
