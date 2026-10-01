'use client';

import React, { useEffect } from 'react';
import { EditorTopbar } from './EditorTopbar';
import { BlockLibrary } from './BlockLibrary';
import { EditorCanvas } from './EditorCanvas';
import { Inspector } from './Inspector';
import { useEditorStore } from '@/store/editorStore';

export const EditorShell: React.FC = () => {
  const loadProject = useEditorStore((state) => state.loadProject);

  useEffect(() => {
    loadProject();
  }, [loadProject]);
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background text-foreground select-none">
      {/* Topbar */}
      <EditorTopbar />

      {/* Main 3-column Layout (Left: Blocks | Center: Canvas | Right: Inspector) */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        <BlockLibrary />
        <EditorCanvas />
        <Inspector />
      </div>
    </div>
  );
};
