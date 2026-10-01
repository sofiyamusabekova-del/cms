'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/store/editorStore';
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  Check,
  Globe,
  Settings,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { PageSEO } from '@/types';
import { TextControl, TextareaControl } from '@/components/controls';

import { PAGE_TEMPLATES } from '@/builder/templates/pageTemplates';

export const PageManager: React.FC = () => {
  const project = useEditorStore((state) => state.project);
  const selectedPageId = useEditorStore((state) => state.selectedPageId);
  const selectPage = useEditorStore((state) => state.selectPage);
  const addPage = useEditorStore((state) => state.addPage);
  const addPageFromTemplate = useEditorStore((state) => state.addPageFromTemplate);
  const removePage = useEditorStore((state) => state.removePage);
  const renamePage = useEditorStore((state) => state.renamePage);
  const updatePageSEO = useEditorStore((state) => state.updatePageSEO);
  const currentLocale = useEditorStore((state) => state.currentLocale);

  const [newPageTitle, setNewPageTitle] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('blank');
  const [isAdding, setIsAdding] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [seoModalPageId, setSeoModalPageId] = useState<string | null>(null);

  const pages = project?.pages || [];
  const activeSeoPage = pages.find((p) => p.id === seoModalPageId);

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle.trim()) return;
    if (selectedTemplateId === 'blank') {
      addPage(newPageTitle.trim());
    } else {
      addPageFromTemplate(selectedTemplateId, newPageTitle.trim());
    }
    setNewPageTitle('');
    setSelectedTemplateId('blank');
    setIsAdding(false);
  };

  const handleStartRename = (id: string, title: string, slug: string) => {
    setEditingPageId(id);
    setEditTitle(title);
    setEditSlug(slug);
  };

  const handleSaveRename = (id: string) => {
    if (editTitle.trim()) {
      renamePage(id, editTitle.trim(), editSlug.trim());
    }
    setEditingPageId(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
          <FileText className="size-4 text-indigo-600" />
          <span>Страницы ({pages.length})</span>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium flex items-center gap-1 transition-colors"
        >
          <Plus className="size-3" /> Добавить
        </button>
      </div>

      {/* Add Page Form with Templates (Sprint 18.1) */}
      {isAdding && (
        <form onSubmit={handleCreatePage} className="p-3 bg-indigo-50/50 dark:bg-indigo-950/30 border-b border-indigo-100 dark:border-indigo-900/40 space-y-2.5">
          <input
            type="text"
            value={newPageTitle}
            onChange={(e) => setNewPageTitle(e.target.value)}
            placeholder="Название страницы (напр. О компании)"
            className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            autoFocus
          />

          <div>
            <label className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider block mb-1">
              Шаблон страницы:
            </label>
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="blank">Пустая страница (0 блоков)</option>
              {PAGE_TEMPLATES.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 px-2 py-1"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium"
            >
              Создать
            </button>
          </div>
        </form>
      )}

      {/* Pages List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {pages.map((p) => {
          const isSelected = p.id === selectedPageId;
          const isEditing = p.id === editingPageId;

          return (
            <div
              key={p.id}
              className={`p-2 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700/60 shadow-sm'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200/70 dark:border-zinc-800 hover:border-zinc-300'
              }`}
            >
              {isEditing ? (
                <div className="space-y-2 py-1">
                  <div>
                    <label className="text-[10px] text-zinc-400 font-medium block">Название:</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 font-medium block">Slug (URL):</label>
                    <input
                      type="text"
                      value={editSlug}
                      onChange={(e) => setEditSlug(e.target.value)}
                      className="w-full px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-800 font-mono text-zinc-900 dark:text-zinc-100"
                      placeholder="home, about, services..."
                    />
                  </div>
                  <div className="flex justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => setEditingPageId(null)}
                      className="px-2 py-0.5 text-xs text-zinc-500"
                    >
                      Отмена
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveRename(p.id)}
                      className="px-2.5 py-0.5 rounded bg-indigo-600 text-white text-xs font-medium"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => selectPage(p.id)}
                    className="flex-1 text-left flex flex-col min-w-0 pr-2"
                  >
                    <span className={`text-xs font-semibold truncate ${isSelected ? 'text-indigo-700 dark:text-indigo-300' : 'text-zinc-800 dark:text-zinc-200'}`}>
                      {p.title}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 truncate">
                      /{p.slug} • {p.blocks.length} блоков
                    </span>
                  </button>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setSeoModalPageId(p.id)}
                      title="Настройки SEO страницы"
                      className="p-1 rounded text-zinc-400 hover:text-indigo-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Globe className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStartRename(p.id, p.title, p.slug)}
                      title="Переименовать страницу"
                      className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Edit2 className="size-3.5" />
                    </button>
                    {pages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Удалить страницу "${p.title}"?`)) {
                            removePage(p.id);
                          }
                        }}
                        title="Удалить страницу"
                        className="p-1 rounded text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SEO Modal / Panel (Sprint 15.1) */}
      {activeSeoPage && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Globe className="size-5 text-indigo-600" />
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  Настройки SEO: {activeSeoPage.title}
                </h3>
              </div>
              <button
                onClick={() => setSeoModalPageId(null)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <TextControl
                label={`SEO Title (${currentLocale.toUpperCase()})`}
                value={activeSeoPage.seo.title?.[currentLocale] || ''}
                placeholder="Заголовок для поисковиков и браузера..."
                onChange={(val) =>
                  updatePageSEO(activeSeoPage.id, {
                    title: { ...(activeSeoPage.seo.title || {}), [currentLocale]: val },
                  })
                }
              />

              <TextareaControl
                label={`SEO Meta Description (${currentLocale.toUpperCase()})`}
                rows={3}
                value={activeSeoPage.seo.description?.[currentLocale] || ''}
                placeholder="Краткое описание страницы для сниппета в Google..."
                onChange={(val) =>
                  updatePageSEO(activeSeoPage.id, {
                    description: { ...(activeSeoPage.seo.description || {}), [currentLocale]: val },
                  })
                }
              />

              <TextControl
                label="Canonical URL"
                value={activeSeoPage.seo.canonical || ''}
                placeholder="https://mysite.com/page"
                onChange={(val) =>
                  updatePageSEO(activeSeoPage.id, { canonical: val })
                }
              />

              <TextControl
                label={`OpenGraph Title (${currentLocale.toUpperCase()})`}
                value={activeSeoPage.seo.ogTitle?.[currentLocale] || ''}
                placeholder="Заголовок для соцсетей (VK, Telegram, Facebook)..."
                onChange={(val) =>
                  updatePageSEO(activeSeoPage.id, {
                    ogTitle: { ...(activeSeoPage.seo.ogTitle || {}), [currentLocale]: val },
                  })
                }
              />

              <TextareaControl
                label={`OpenGraph Description (${currentLocale.toUpperCase()})`}
                rows={2}
                value={activeSeoPage.seo.ogDescription?.[currentLocale] || ''}
                placeholder="Описание для превью в соцсетях..."
                onChange={(val) =>
                  updatePageSEO(activeSeoPage.id, {
                    ogDescription: { ...(activeSeoPage.seo.ogDescription || {}), [currentLocale]: val },
                  })
                }
              />

              <TextControl
                label="OpenGraph Image URL"
                value={activeSeoPage.seo.ogImage || ''}
                placeholder="https://mysite.com/og-image.jpg"
                onChange={(val) =>
                  updatePageSEO(activeSeoPage.id, { ogImage: val })
                }
              />

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="noindex-toggle"
                  checked={!!activeSeoPage.seo.noIndex}
                  onChange={(e) =>
                    updatePageSEO(activeSeoPage.id, { noIndex: e.target.checked })
                  }
                  className="size-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="noindex-toggle" className="text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  Запретить индексацию страницы поисковиками (noIndex)
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSeoModalPageId(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
              >
                Готово
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
