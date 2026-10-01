'use client';

import React from 'react';
import Link from 'next/link';
import { useEditorStore } from '@/store/editorStore';
import { Breakpoint } from '@/types';
import {
  Laptop,
  Tablet,
  Smartphone,
  Layers,
  ArrowLeft,
  Eye,
  CheckCircle2,
  Save,
  Loader2,
  AlertTriangle,
  RotateCcw,
  Undo2,
  Redo2,
  Download,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExportService } from '@/builder/export/ExportService';
import { ShortcutsModal } from './ShortcutsModal';
import { AiGeneratorModal } from './AiGeneratorModal';

export const EditorTopbar: React.FC = () => {
  const project = useEditorStore((state) => state.project);
  const selectedPageId = useEditorStore((state) => state.selectedPageId);
  const currentBreakpoint = useEditorStore((state) => state.currentBreakpoint);
  const setBreakpoint = useEditorStore((state) => state.setBreakpoint);
  const currentLocale = useEditorStore((state) => state.currentLocale);
  const setLocale = useEditorStore((state) => state.setLocale);
  const isDirty = useEditorStore((state) => state.isDirty);
  const saveStatus = useEditorStore((state) => state.saveStatus);
  const saveProject = useEditorStore((state) => state.saveProject);
  const resetToDefault = useEditorStore((state) => state.resetToDefault);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const past = useEditorStore((state) => state.past);
  const future = useEditorStore((state) => state.future);

  const [isExporting, setIsExporting] = React.useState(false);
  const [showShortcuts, setShowShortcuts] = React.useState(false);
  const [showAiModal, setShowAiModal] = React.useState(false);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  // Keyboard shortcut Ctrl+Z / Ctrl+Shift+Z / Cmd+Z / Ctrl+S
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput =
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        (document.activeElement as HTMLElement)?.isContentEditable;

      if (isInput) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, saveProject]);

  const handleExportZip = async () => {
    if (!project) return;
    try {
      setIsExporting(true);
      const zipBlob = await ExportService.exportProjectZip(project, currentLocale);
      const filename = `${(project.name || 'my-site').toLowerCase().replace(/\s+/g, '-')}-export.zip`;
      ExportService.downloadBlob(zipBlob, filename);
    } catch (err) {
      console.error('Export error:', err);
      alert('Ошибка при формировании архива проекта.');
    } finally {
      setIsExporting(false);
    }
  };

  const breakpoints: { id: Breakpoint; label: string; icon: React.ReactNode }[] = [
    { id: 'desktop', label: 'Desktop', icon: <Laptop className="size-4" /> },
    { id: 'tablet', label: 'Tablet', icon: <Tablet className="size-4" /> },
    { id: 'mobile', label: 'Mobile', icon: <Smartphone className="size-4" /> },
  ];

  const locales = project?.locales || ['ru', 'en', 'uz'];

  return (
    <>
      <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 flex items-center justify-between z-30 select-none">
        {/* Left: Brand & Project Name */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors p-1"
            title="Вернуться на главную"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div className="size-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Layers className="size-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
              {project?.name || 'Visual Site Builder'}
            </span>
            {saveStatus === 'saving' && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-mono flex items-center gap-1.5 animate-pulse">
                <Loader2 className="size-3 animate-spin" /> Сохранение...
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="size-3" /> Сохранено
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-mono flex items-center gap-1">
                <AlertTriangle className="size-3" /> Ошибка сохранения
              </span>
            )}
            {saveStatus === 'idle' && isDirty && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-mono">
                ● Не сохранено
              </span>
            )}
          </div>

          {/* Undo / Redo Buttons (Sprint 12.1) */}
          <div className="flex items-center ml-2 border-l border-zinc-200 dark:border-zinc-800 pl-2 gap-0.5">
            <button
              type="button"
              onClick={undo}
              disabled={!canUndo}
              title="Отменить действие (Ctrl+Z)"
              className={`p-1.5 rounded-md transition-colors ${
                canUndo
                  ? 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  : 'text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
              }`}
            >
              <Undo2 className="size-4" />
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={!canRedo}
              title="Повторить действие (Ctrl+Shift+Z)"
              className={`p-1.5 rounded-md transition-colors ${
                canRedo
                  ? 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  : 'text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
              }`}
            >
              <Redo2 className="size-4" />
            </button>
          </div>
        </div>

        {/* Center: Breakpoints Switcher (Desktop / Tablet / Mobile) */}
        <div className="flex items-center p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
          {breakpoints.map((bp) => (
            <button
              key={bp.id}
              type="button"
              onClick={() => setBreakpoint(bp.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                currentBreakpoint === bp.id
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
              title={`Режим: ${bp.label}`}
              aria-pressed={currentBreakpoint === bp.id}
            >
              {bp.icon}
              <span className="hidden sm:inline">{bp.label}</span>
            </button>
          ))}
        </div>

        {/* Right: Locales Switcher & Actions */}
        <div className="flex items-center gap-2">
          {/* Locales Switcher */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-0.5 border border-zinc-200 dark:border-zinc-700/60">
            {locales.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setLocale(loc)}
                className={`px-2 py-1 rounded text-xs font-semibold uppercase transition-all ${
                  currentLocale === loc
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* AI Generator Button (Sprint 24.1) */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAiModal(true)}
            className="h-8 px-2.5 gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
            title="Сгенерировать страницу с помощью AI"
          >
            <Sparkles className="size-3.5" />
            <span className="hidden md:inline font-medium">AI Генератор</span>
          </Button>

          {/* Export ZIP Action (Sprint 22.1 - 22.3) */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportZip}
            disabled={isExporting}
            className="h-8 px-2.5 gap-1.5 text-xs text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-sm"
            title="Экспорт автономного HTML/CSS сайта в ZIP архив"
          >
            {isExporting ? (
              <Loader2 className="size-3.5 animate-spin text-indigo-600" />
            ) : (
              <Download className="size-3.5 text-indigo-600 dark:text-indigo-400" />
            )}
            <span className="hidden sm:inline">Экспорт ZIP</span>
          </Button>

          {/* Preview Action (Sprint 16.1) */}
          <Link
            href={`/preview?page=${selectedPageId || project?.pages[0]?.id || ''}&locale=${currentLocale}&bp=${currentBreakpoint}`}
            target="_blank"
            className="inline-flex items-center justify-center rounded-md text-xs font-medium border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 h-8 px-3 gap-1.5 text-zinc-700 dark:text-zinc-200 transition-colors shadow-sm"
            title="Открыть предпросмотр сайта в новой вкладке"
          >
            <Eye className="size-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </Link>

          {/* Save Button (Sprint 11.1) */}
          <Button
            variant="default"
            size="sm"
            onClick={() => saveProject()}
            disabled={saveStatus === 'saving'}
            className="h-8 gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          >
            {saveStatus === 'saving' ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Save className="size-3.5" />
            )}
            <span>{saveStatus === 'saving' ? 'Сохранение...' : 'Сохранить'}</span>
          </Button>

          {/* Shortcuts Help Button (Sprint 23.1) */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowShortcuts(true)}
            title="Горячие клавиши (Shortcuts)"
            className="h-8 px-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <HelpCircle className="size-4" />
          </Button>

          {/* Reset button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm('Сбросить проект к исходному состоянию? Все несохранённые изменения будут утеряны.')) {
                resetToDefault();
              }
            }}
            title="Сбросить к исходному демо-состоянию"
            className="h-8 px-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <RotateCcw className="size-3.5" />
          </Button>
        </div>
      </header>

      {/* Modals */}
      <ShortcutsModal open={showShortcuts} onOpenChange={setShowShortcuts} />
      <AiGeneratorModal open={showAiModal} onOpenChange={setShowAiModal} />
    </>
  );
};

