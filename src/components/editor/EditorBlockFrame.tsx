'use client';

import React, { useState } from 'react';
import { PageBlock } from '@/types';
import { useEditorStore } from '@/store/editorStore';
import { getBlockDefinition } from '@/builder/registry/blockRegistry';
import { Copy, Trash2, GripVertical, Check, X } from 'lucide-react';

interface EditorBlockFrameProps {
  block: PageBlock;
  children: React.ReactNode;
  dragHandleProps?: Record<string, unknown>;
}

export const EditorBlockFrame: React.FC<EditorBlockFrameProps> = ({
  block,
  children,
  dragHandleProps,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const selectedBlockId = useEditorStore((state) => state.selectedBlockId);
  const hoveredBlockId = useEditorStore((state) => state.hoveredBlockId);
  const selectBlock = useEditorStore((state) => state.selectBlock);
  const setHoveredBlock = useEditorStore((state) => state.setHoveredBlock);
  const removeBlock = useEditorStore((state) => state.removeBlock);
  const duplicateBlock = useEditorStore((state) => state.duplicateBlock);

  const isSelected = selectedBlockId === block.id;
  const isHovered = hoveredBlockId === block.id && !isSelected;

  const definition = getBlockDefinition(block.type);
  const label = definition?.label || block.type;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectBlock(block.id);
  };

  const handleMouseEnter = () => {
    setHoveredBlock(block.id);
  };

  const handleMouseLeave = () => {
    setHoveredBlock(null);
    setConfirmDelete(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    removeBlock(block.id);
    setConfirmDelete(false);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmDelete(false);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateBlock(block.id);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative transition-all duration-150 cursor-pointer ${
        isSelected
          ? 'ring-2 ring-indigo-600 ring-offset-2 ring-offset-zinc-100 dark:ring-offset-zinc-900 z-20'
          : isHovered
          ? 'ring-1 ring-indigo-400/80 ring-offset-1 z-10'
          : 'ring-0'
      }`}
    >
      {/* Top Floating Badge & Controls when selected or hovered */}
      {(isSelected || isHovered) && (
        <div
          className={`absolute -top-3.5 left-4 z-30 flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold shadow-md transition-opacity ${
            isSelected
              ? 'bg-indigo-600 text-white'
              : 'bg-zinc-800 text-zinc-200 opacity-90'
          }`}
        >
          {/* Drag Handle */}
          <div
            {...dragHandleProps}
            className="cursor-grab active:cursor-grabbing hover:text-white p-0.5"
            title="Перетащить блок"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="size-3.5 opacity-80" />
          </div>

          <span>{label}</span>
          {block.variant && block.variant !== 'default' && (
            <span className="opacity-70 text-[10px] font-normal">
              ({block.variant})
            </span>
          )}

          {isSelected && (
            <div className="flex items-center gap-1 ml-2 border-l border-white/20 pl-1.5">
              <button
                type="button"
                title="Дублировать блок"
                onClick={handleDuplicate}
                className="hover:text-indigo-200 transition-colors p-0.5"
              >
                <Copy className="size-3" />
              </button>

              {confirmDelete ? (
                <div className="flex items-center gap-1 bg-red-600 px-1.5 py-0.5 rounded text-[10px]">
                  <span>Удалить?</span>
                  <button
                    type="button"
                    title="Подтвердить удаление"
                    onClick={handleDelete}
                    className="hover:text-white text-red-100 p-0.5 font-bold"
                  >
                    <Check className="size-3" />
                  </button>
                  <button
                    type="button"
                    title="Отмена"
                    onClick={handleCancelDelete}
                    className="hover:text-white text-red-100 p-0.5"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  title="Удалить блок"
                  onClick={handleDelete}
                  className="hover:text-red-300 transition-colors p-0.5 text-red-200"
                >
                  <Trash2 className="size-3" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Actual Block Content */}
      <div className="relative">{children}</div>
    </div>
  );
};
