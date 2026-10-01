'use client';

import React from 'react';
import { Command, CornerDownLeft, Sparkles, Undo2, Redo2, Download, Eye, Save, X } from 'lucide-react';

interface ShortcutsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ open, onOpenChange }) => {
  if (!open) return null;

  const shortcuts = [
    {
      combo: ['Ctrl', 'Z'],
      desc: 'Отменить последнее действие (Undo)',
      icon: <Undo2 className="size-3.5 text-indigo-500" />,
    },
    {
      combo: ['Ctrl', 'Shift', 'Z'],
      desc: 'Повторить отмененное действие (Redo)',
      icon: <Redo2 className="size-3.5 text-indigo-500" />,
    },
    {
      combo: ['Ctrl', 'Y'],
      desc: 'Альтернативная комбинация для Redo',
      icon: <CornerDownLeft className="size-3.5 text-zinc-400" />,
    },
    {
      combo: ['Ctrl', 'S'],
      desc: 'Быстрое ручное сохранение проекта',
      icon: <Save className="size-3.5 text-emerald-500" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 relative">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
          <Command className="size-4 text-indigo-600 dark:text-indigo-400" />
          <span>Горячие клавиши редактора</span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Список клавиатурных комбинаций для быстрого управления конструктором
        </p>

        <div className="space-y-2.5 mt-4">
          {shortcuts.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 text-xs"
            >
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                {item.icon}
                <span>{item.desc}</span>
              </div>
              <div className="flex items-center gap-1 font-mono">
                {item.combo.map((key, kIdx) => (
                  <kbd
                    key={kIdx}
                    className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 shadow-xs text-zinc-800 dark:text-zinc-200"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
          <span>Автосохранение активно (700ms)</span>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-xs"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};
