'use client';

import React, { useState } from 'react';
import { Page, Breakpoint, GlobalStyles } from '@/types';
import { getBlockDefinition } from '@/builder/registry/init';
import { EditorBlockFrame } from '@/components/editor/EditorBlockFrame';
import { SortableBlockItem } from '@/components/editor/SortableBlockItem';
import { useEditorStore } from '@/store/editorStore';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { AlertCircle, GripVertical } from 'lucide-react';

interface PageRendererProps {
  page: Page;
  locale?: string;
  breakpoint?: Breakpoint;
  mode?: 'editor' | 'preview' | 'export';
  globalStyles?: GlobalStyles;
}

const UnknownBlockFallback: React.FC<{ type: string }> = ({ type }) => {
  return (
    <div className="p-8 my-4 rounded-xl border border-dashed border-amber-300 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 flex items-center gap-3">
      <AlertCircle className="size-6 text-amber-500 shrink-0" />
      <div>
        <h4 className="font-semibold text-sm">Неизвестный блок: &ldquo;{type}&rdquo;</h4>
        <p className="text-xs opacity-80 mt-0.5">
          Этот блок не зарегистрирован в реестре блоков (Block Registry).
        </p>
      </div>
    </div>
  );
};

export const PageRenderer: React.FC<PageRendererProps> = ({
  page,
  locale = 'ru',
  breakpoint = 'desktop',
  mode = 'editor',
  globalStyles,
}) => {
  const moveBlock = useEditorStore((state) => state.moveBlock);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const blocks = page?.blocks || [];

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);

    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        moveBlock(oldIndex, newIndex);
      }
    }
  };

  if (!page || blocks.length === 0) {
    return (
      <div className="py-28 flex flex-col items-center justify-center text-center p-8 text-zinc-400">
        <div className="size-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 border border-indigo-100 dark:border-indigo-900/60 shadow-xs">
          <AlertCircle className="size-8" />
        </div>
        <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
          Страница пока пуста
        </p>
        <p className="text-xs text-zinc-500 max-w-sm mt-1 mb-4 leading-relaxed">
          Выберите блок на панели слева или воспользуйтесь кнопкой <span className="font-semibold text-indigo-600 dark:text-indigo-400">AI Генератор</span> в верхнем меню, чтобы наполнить страницу готовым контентом.
        </p>
      </div>
    );
  }

  // Preview or Export mode (no DnD wrapping)
  if (mode !== 'editor') {
    return (
      <div
        className="w-full flex flex-col space-y-0"
        style={{
          fontFamily: globalStyles?.typography?.bodyFont,
          ['--color-primary' as string]: globalStyles?.colors?.primary || '#4f46e5',
          ['--color-secondary' as string]: globalStyles?.colors?.secondary || '#9333ea',
          ['--color-text' as string]: globalStyles?.colors?.text || '#0f172a',
          ['--color-bg' as string]: globalStyles?.colors?.background || '#ffffff',
          ['--font-heading' as string]: globalStyles?.typography?.headingFont || 'Inter, sans-serif',
          ['--font-body' as string]: globalStyles?.typography?.bodyFont || 'Inter, sans-serif',
          ['--radius-sm' as string]: `${globalStyles?.radius?.sm ?? 4}px`,
          ['--radius-md' as string]: `${globalStyles?.radius?.md ?? 8}px`,
          ['--radius-lg' as string]: `${globalStyles?.radius?.lg ?? 16}px`,
          ['--container-max-width' as string]: `${globalStyles?.containerMaxWidth ?? 1200}px`,
        } as React.CSSProperties}
      >
        {blocks.map((block) => {
          if (block.hidden) return null;
          const definition = getBlockDefinition(block.type);
          if (!definition) return <UnknownBlockFallback key={block.id} type={block.type} />;
          const BlockComp = definition.renderer;
          return (
            <div key={block.id}>
              <BlockComp
                block={block}
                locale={locale}
                breakpoint={breakpoint}
                mode={mode}
                globalStyles={globalStyles}
              />
            </div>
          );
        })}
      </div>
    );
  }

  // Active dragged block
  const activeBlock = activeDragId ? blocks.find((b) => b.id === activeDragId) : null;
  const activeDef = activeBlock ? getBlockDefinition(activeBlock.type) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={blocks.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="w-full flex flex-col space-y-4 py-4"
          style={{
            fontFamily: globalStyles?.typography?.bodyFont,
            ['--color-primary' as string]: globalStyles?.colors?.primary || '#4f46e5',
            ['--color-secondary' as string]: globalStyles?.colors?.secondary || '#9333ea',
            ['--color-text' as string]: globalStyles?.colors?.text || '#0f172a',
            ['--color-bg' as string]: globalStyles?.colors?.background || '#ffffff',
            ['--font-heading' as string]: globalStyles?.typography?.headingFont || 'Inter, sans-serif',
            ['--font-body' as string]: globalStyles?.typography?.bodyFont || 'Inter, sans-serif',
            ['--radius-sm' as string]: `${globalStyles?.radius?.sm ?? 4}px`,
            ['--radius-md' as string]: `${globalStyles?.radius?.md ?? 8}px`,
            ['--radius-lg' as string]: `${globalStyles?.radius?.lg ?? 16}px`,
            ['--container-max-width' as string]: `${globalStyles?.containerMaxWidth ?? 1200}px`,
          } as React.CSSProperties}
        >
          {blocks.map((block) => {
            if (block.hidden) return null;

            const definition = getBlockDefinition(block.type);

            if (!definition) {
              return (
                <SortableBlockItem key={block.id} block={block}>
                  <UnknownBlockFallback type={block.type} />
                </SortableBlockItem>
              );
            }

            const BlockComp = definition.renderer;
            return (
              <SortableBlockItem key={block.id} block={block}>
                <BlockComp
                  block={block}
                  locale={locale}
                  breakpoint={breakpoint}
                  mode={mode}
                  globalStyles={globalStyles}
                />
              </SortableBlockItem>
            );
          })}
        </div>
      </SortableContext>

      {/* Drag Overlay Preview */}
      <DragOverlay>
        {activeBlock && activeDef ? (
          <div className="rounded-xl border-2 border-indigo-600 bg-white dark:bg-zinc-900 shadow-2xl p-4 opacity-90 scale-95 pointer-events-none flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GripVertical className="size-5 text-indigo-600" />
              <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Перемещение: {activeDef.label}
              </span>
            </div>
            <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              {activeBlock.type}
            </span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
