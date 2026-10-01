'use client';

import React, { useState } from 'react';
import { getAllBlocks, createBlock } from '@/builder/registry/blockRegistry';
import '@/builder/registry/init'; // Ensure registered
import { useEditorStore } from '@/store/editorStore';
import { Search, Plus, Sparkles, Layers, FileText, BookOpen, Menu as MenuIcon, Image as ImageIcon } from 'lucide-react';
import { PageManager } from './PageManager';
import { PostManager } from './PostManager';
import { MenuBuilder } from './MenuBuilder';
import { MediaLibraryModal } from './MediaLibraryModal';

export const BlockLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blocks' | 'pages' | 'posts' | 'menus'>('blocks');
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const addBlock = useEditorStore((state) => state.addBlock);

  const allBlocks = getAllBlocks();

  const categories = ['all', ...Array.from(new Set(allBlocks.map((b) => b.category)))];

  const filteredBlocks = allBlocks.filter((b) => {
    const matchesSearch =
      b.label.toLowerCase().includes(search.toLowerCase()) ||
      b.type.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCategory === 'all' || b.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleAddBlock = (type: string, variant?: string) => {
    const newBlock = createBlock(type, variant);
    addBlock(newBlock);
  };

  return (
    <aside className="w-80 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col h-full shrink-0 select-none">
      {/* Top Sidebar Navigation Tabs: Blocks / Pages / Posts / Menus / Media */}
      <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 p-1 gap-0.5 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('blocks')}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
            activeTab === 'blocks'
              ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
          title="Библиотека блоков"
        >
          <Layers className="size-3.5" />
          <span>Блоки</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pages')}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
            activeTab === 'pages'
              ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
          title="Страницы сайта"
        >
          <FileText className="size-3.5" />
          <span>Страницы</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('posts')}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
            activeTab === 'posts'
              ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
          title="Статьи блога"
        >
          <BookOpen className="size-3.5" />
          <span>Блог</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('menus')}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
            activeTab === 'menus'
              ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
          title="Меню и навигация"
        >
          <MenuIcon className="size-3.5" />
          <span>Меню</span>
        </button>

        <button
          type="button"
          onClick={() => setIsMediaOpen(true)}
          className="p-1.5 rounded-lg text-zinc-500 hover:text-indigo-600 hover:bg-white dark:hover:bg-zinc-800 transition-all ml-auto"
          title="Открыть медиабиблиотеку"
        >
          <ImageIcon className="size-4" />
        </button>
      </div>

      <MediaLibraryModal isOpen={isMediaOpen} onClose={() => setIsMediaOpen(false)} />

      {/* Pages Tab Content */}
      {activeTab === 'pages' && <PageManager />}

      {/* Posts Tab Content */}
      {activeTab === 'posts' && <PostManager />}

      {/* Menus Tab Content */}
      {activeTab === 'menus' && <MenuBuilder />}

      {/* Blocks Tab Content */}
      {activeTab === 'blocks' && (
        <>
          {/* Header & Search */}
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="relative">
              <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск блоков..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Category tags */}
            <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 text-[11px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-full capitalize whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {cat === 'all' ? 'Все' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Block List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {filteredBlocks.length === 0 ? (
              <div className="text-center py-8 text-xs text-zinc-400">
                Блоки не найдены
              </div>
            ) : (
              filteredBlocks.map((blockDef) => (
                <div
                  key={blockDef.type}
                  className="p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                        <Sparkles className="size-3.5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {blockDef.label}
                        </h3>
                        <span className="text-[10px] text-zinc-500 capitalize">
                          {blockDef.category}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddBlock(blockDef.type)}
                      className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium flex items-center gap-1 shadow-sm transition-transform active:scale-95"
                      title="Добавить на страницу"
                    >
                      <Plus className="size-3" /> Добавить
                    </button>
                  </div>

                  {/* Variants */}
                  {blockDef.variants && blockDef.variants.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60">
                      <span className="text-[10px] text-zinc-400 font-medium block mb-1">
                        Варианты:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {blockDef.variants.map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => handleAddBlock(blockDef.type, v.id)}
                            className="px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-700 text-[10px] text-zinc-600 dark:text-zinc-300 transition-colors"
                          >
                            + {v.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </aside>
  );
};
