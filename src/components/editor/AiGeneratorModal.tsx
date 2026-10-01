'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, Wand2, Lightbulb, X } from 'lucide-react';
import { AiService } from '@/builder/ai/aiService';
import { useEditorStore } from '@/store/editorStore';

interface AiGeneratorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AiGeneratorModal: React.FC<AiGeneratorModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insertPage = useEditorStore((state) => state.insertPage);

  if (!open) return null;

  const samplePrompts = [
    'Сайт стоматологической клиники с услугами и отзывами',
    'Фитнес-клуб с тарифами, тренерами и статистикой',
    'IT-стартап по автоматизации маркетинга',
    'Студия дизайна интерьеров и архитектуры',
  ];

  const handleGenerate = async (targetPrompt?: string) => {
    const text = targetPrompt || prompt;
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const newPage = await AiService.generatePage({ prompt: text });
      insertPage(newPage);
      setIsLoading(false);
      onOpenChange(false);
      setPrompt('');
    } catch (err: any) {
      console.error('AI generation error:', err);
      setError(err?.message || 'Не удалось сгенерировать страницу. Проверьте запрос.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 relative">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
          <Sparkles className="size-4 text-indigo-600 dark:text-indigo-400" />
          <span>AI Генератор страниц</span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Опишите желаемый сайт или выберите готовый сценарий — генератор создаст готовую структуру из блоков с валидацией Zod.
        </p>

        <div className="space-y-4 py-3 mt-1">
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Тема или описание сайта
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Например: Стоматология или Фитнес-клуб..."
                value={prompt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter' && !isLoading) {
                    handleGenerate();
                  }
                }}
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <Button
                type="button"
                onClick={() => handleGenerate()}
                disabled={isLoading || !prompt.trim()}
                className="h-9 px-4 gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 rounded-xl"
              >
                {isLoading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Wand2 className="size-3.5" />
                )}
                <span>Создать</span>
              </Button>
            </div>
            {error && <p className="text-[11px] text-rose-500">{error}</p>}
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-1.5 text-zinc-500 text-[11px]">
              <Lightbulb className="size-3 text-amber-500" />
              <span>Быстрые примеры:</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {samplePrompts.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPrompt(s);
                    handleGenerate(s);
                  }}
                  disabled={isLoading}
                  className="text-left text-xs p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:border-indigo-200 dark:hover:border-indigo-800/60 text-zinc-600 dark:text-zinc-300 transition-colors"
                >
                  ⚡ {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
