import Link from "next/link";
import {
  Layers,
  Sparkles,
  Palette,
  Globe,
  Download,
  Code2,
  ArrowRight,
  CheckCircle2,
  LayoutGrid,
  Laptop,
  Smartphone,
  Tablet,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Layers className="size-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                Visual Site Builder
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                MVP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/editor/demo">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition-all">
                Открыть редактор <ArrowRight className="size-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <Sparkles className="size-3.5 text-indigo-500" />
            <span>Sprint 0.1 завершен • Next.js + Tailwind + shadcn/ui</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Создавайте сайты легко с{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
              Visual Site Builder
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            Блочный визуальный конструктор сайтов. Собирайте страницы из готовых
            секций, настраивайте стили без ручного CSS, переводите на RU/EN/UZ и
            экспортируйте чистый статический сайт.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/editor/demo">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 h-12 text-base font-semibold shadow-lg shadow-indigo-600/25">
                Запустить редактор
                <ArrowRight className="size-5 ml-2" />
              </Button>
            </Link>
            <a
              href="#roadmap"
              className="inline-flex items-center justify-center px-6 h-12 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-base font-medium transition-colors"
            >
              План разработки
            </a>
          </div>
        </div>

        {/* Core Architectural Pillars */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="size-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <LayoutGrid className="size-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Block Registry</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Декларативный реестр готовых секций: Hero, Features, Services, CTA,
              Reviews с поддержкой вариантов.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="size-11 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
              <Palette className="size-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Визуальные стили</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Интуитивные инспекторы: ползунки, numeric inputs, spacing
              (linked/unlinked) и адаптивное наследование стилей.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="size-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <Globe className="size-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Мультиязычность</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Поддержка локализации контента на RU, EN, UZ на уровне блоков без
              дублирования структуры проекта.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="size-11 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
              <Download className="size-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Статический экспорт</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Генерация готового автономного ZIP-архива с чистым HTML, CSS, JS и
              SEO-разметкой без зависимостей.
            </p>
          </div>
        </div>

        {/* Viewport preview teaser */}
        <div className="mt-16 p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-800 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 size-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Responsive Design
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Редактирование для Desktop, Tablet и Mobile
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Переключайте viewport в реальном времени. Размеры, отступы и
                типографика плавно наследуются: Mobile &rarr; Tablet &rarr; Desktop.
              </p>
              <div className="flex items-center gap-4 text-sm text-zinc-300 pt-2">
                <span className="flex items-center gap-1.5">
                  <Laptop className="size-4 text-indigo-400" /> Desktop
                </span>
                <span className="flex items-center gap-1.5">
                  <Tablet className="size-4 text-indigo-400" /> Tablet
                </span>
                <span className="flex items-center gap-1.5">
                  <Smartphone className="size-4 text-indigo-400" /> Mobile
                </span>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col gap-3">
              <div className="px-5 py-4 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center gap-3">
                <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
                <span className="text-sm">Page JSON &rarr; Registry &rarr; Renderer</span>
              </div>
              <div className="px-5 py-4 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center gap-3">
                <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
                <span className="text-sm">Drag & Drop reordering via @dnd-kit</span>
              </div>
              <div className="px-5 py-4 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center gap-3">
                <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
                <span className="text-sm">Undo / Redo с лимитом 50 операций</span>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap section */}
        <section id="roadmap" className="mt-20 scroll-mt-20">
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              План реализации (TASKS.md)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-200 text-sm">
                    Sprint 0.1 — Создание проекта
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                    Next.js App Router, TypeScript strict, Tailwind CSS, shadcn/ui, Lucide Icons, базовая структура.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3 opacity-80">
                <Code2 className="size-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">
                    Sprint 1.1 — Каркас редактора
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">
                    /editor/demo, EditorShell, EditorTopbar, BlockLibrary, EditorCanvas, Inspector (Left | Center | Right).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center text-xs text-zinc-500 dark:text-zinc-500">
        <p>Visual Site Builder • MVP Development</p>
      </footer>
    </div>
  );
}
