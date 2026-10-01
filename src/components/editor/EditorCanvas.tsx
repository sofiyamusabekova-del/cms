'use client';

import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import { PageRenderer } from '@/builder/renderer/PageRenderer';
import { FileText, Layers } from 'lucide-react';
import { Breakpoint } from '@/types';

const CANVAS_WIDTHS: Record<Breakpoint, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
};

export const EditorCanvas: React.FC = () => {
  const project = useEditorStore((state) => state.project);
  const selectedPageId = useEditorStore((state) => state.selectedPageId);
  const currentBreakpoint = useEditorStore((state) => state.currentBreakpoint);
  const currentLocale = useEditorStore((state) => state.currentLocale);
  const selectBlock = useEditorStore((state) => state.selectBlock);

  const currentPage =
    project?.pages.find((p) => p.id === selectedPageId) || project?.pages[0];

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      selectBlock(null);
    }
  };

  const canvasWidth = CANVAS_WIDTHS[currentBreakpoint];
  const isDesktop = currentBreakpoint === 'desktop';

  return (
    <main
      onClick={handleCanvasClick}
      className="flex-1 overflow-y-auto overflow-x-auto bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center min-h-0 select-auto transition-colors"
    >
      <div className="w-full bg-white/70 dark:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800 px-6 py-2.5 flex items-center justify-between text-xs text-zinc-500 backdrop-blur-sm z-10 shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-200">
            <Layers className="size-3.5 text-indigo-500" />
            Проект: <strong className="font-semibold">{project?.name || 'Без названия'}</strong>
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span className="flex items-center gap-1.5">
            <FileText className="size-3.5 text-zinc-400" />
            Страница: <strong className="font-medium text-zinc-700 dark:text-zinc-300">{currentPage?.title || 'Главная'}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[11px] font-mono">
            Блоков: <strong>{currentPage?.blocks.length || 0}</strong>
          </span>
          <span className="text-[11px] uppercase font-mono tracking-wider text-indigo-600 dark:text-indigo-400">
            {currentBreakpoint} {canvasWidth}px ({currentLocale})
          </span>
        </div>
      </div>

      <div
        onClick={handleCanvasClick}
        style={{ width: `${canvasWidth}px`, maxWidth: '100%' }}
        className={`transition-all duration-200 bg-white dark:bg-zinc-900 min-h-[calc(100vh-8rem)] ${
          isDesktop
            ? 'flex-1'
            : 'my-6 rounded-2xl shadow-2xl border border-zinc-300 dark:border-zinc-700 overflow-hidden shrink-0'
        } ${currentBreakpoint === 'mobile' ? 'rounded-3xl border-4 border-zinc-800' : ''}`}
      >
        {currentPage ? (
          <PageRenderer
            page={currentPage}
            locale={currentLocale}
            breakpoint={currentBreakpoint}
            mode="editor"
            globalStyles={project?.globalStyles}
          />
        ) : (
          <div className="py-24 text-center text-zinc-400 text-sm">
            Страница не найдена
          </div>
        )}
      </div>
    </main>
  );
};
