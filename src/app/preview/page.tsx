'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SiteProject, Breakpoint } from '@/types';
import { projectRepository } from '@/repositories/LocalStorageProjectRepository';
import { demoProject } from '@/builder/fixtures/demoProject';
import { PageRenderer } from '@/builder/renderer/PageRenderer';
import { Laptop, Tablet, Smartphone, ArrowLeft, Globe } from 'lucide-react';
import Link from 'next/link';

const CANVAS_WIDTHS: Record<Breakpoint, number | string> = {
  desktop: '100%',
  tablet: 768,
  mobile: 375,
};

function PreviewContent() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const localeParam = searchParams.get('locale');
  const bpParam = searchParams.get('bp') as Breakpoint | null;

  const [project, setProject] = useState<SiteProject>(demoProject);
  const [currentLocale, setCurrentLocale] = useState<string>(localeParam || 'ru');
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>(bpParam || 'desktop');
  const [selectedPageId, setSelectedPageId] = useState<string>(pageParam || demoProject.pages[0]?.id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    projectRepository.load().then((loaded) => {
      if (loaded) {
        setProject(loaded);
        if (pageParam) {
          const found = loaded.pages.find((p) => p.id === pageParam);
          if (found) setSelectedPageId(found.id);
        } else if (loaded.pages[0]) {
          setSelectedPageId(loaded.pages[0].id);
        }
      }
      setIsLoading(false);
    });
  }, [pageParam]);

  const currentPage =
    project.pages.find((p) => p.id === selectedPageId) || project.pages[0];

  const breakpoints: { id: Breakpoint; label: string; icon: React.ReactNode }[] = [
    { id: 'desktop', label: 'Desktop', icon: <Laptop className="size-4" /> },
    { id: 'tablet', label: 'Tablet', icon: <Tablet className="size-4" /> },
    { id: 'mobile', label: 'Mobile', icon: <Smartphone className="size-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100 dark:bg-zinc-950">
      {/* Top Preview Bar */}
      <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur px-4 flex items-center justify-between sticky top-0 z-50 select-none shadow-sm">
        {/* Left: Back to Editor & Page Selector */}
        <div className="flex items-center gap-4">
          <Link
            href="/editor/demo"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Вернуться в редактор</span>
          </Link>

          <span className="text-zinc-300 dark:text-zinc-700">|</span>

          {/* Page Switcher */}
          <div className="flex items-center gap-1">
            {project.pages.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPageId(p.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  currentPage?.id === p.id
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Responsive Breakpoint Switcher */}
        <div className="flex items-center p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60">
          {breakpoints.map((bp) => (
            <button
              key={bp.id}
              onClick={() => setCurrentBreakpoint(bp.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                currentBreakpoint === bp.id
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
            >
              {bp.icon}
              <span className="hidden md:inline">{bp.label}</span>
            </button>
          ))}
        </div>

        {/* Right: Locales Switcher */}
        <div className="flex items-center gap-2">
          <Globe className="size-3.5 text-zinc-400" />
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-0.5 border border-zinc-200 dark:border-zinc-700/60">
            {project.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => setCurrentLocale(loc)}
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
        </div>
      </header>

      {/* Main Preview Container */}
      <main className="flex-1 flex flex-col items-center justify-start p-0 overflow-y-auto">
        {isLoading ? (
          <div className="py-24 text-center text-sm text-zinc-400">
            Загрузка страницы...
          </div>
        ) : currentPage ? (
          <div
            style={{
              width:
                currentBreakpoint === 'desktop'
                  ? '100%'
                  : `${CANVAS_WIDTHS[currentBreakpoint]}px`,
              maxWidth: '100%',
            }}
            className={`transition-all duration-300 bg-white dark:bg-zinc-900 min-h-screen ${
              currentBreakpoint !== 'desktop'
                ? 'my-8 rounded-2xl shadow-2xl border border-zinc-300 dark:border-zinc-800 overflow-hidden'
                : 'w-full'
            }`}
          >
            <PageRenderer
              page={currentPage}
              locale={currentLocale}
              breakpoint={currentBreakpoint}
              mode="preview"
              globalStyles={project.globalStyles}
            />
          </div>
        ) : (
          <div className="py-24 text-center text-sm text-zinc-400">
            Страница не найдена
          </div>
        )}
      </main>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-500">Загрузка предпросмотра...</div>}>
      <PreviewContent />
    </Suspense>
  );
}
