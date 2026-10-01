'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PageBlock } from '@/types';
import { EditorBlockFrame } from './EditorBlockFrame';

interface SortableBlockItemProps {
  block: PageBlock;
  children: React.ReactNode;
}

export const SortableBlockItem: React.FC<SortableBlockItemProps> = ({
  block,
  children,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
    position: 'relative',
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <EditorBlockFrame block={block} dragHandleProps={{ ...attributes, ...listeners }}>
        {children}
      </EditorBlockFrame>
    </div>
  );
};
