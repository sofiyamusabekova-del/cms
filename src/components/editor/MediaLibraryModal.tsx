'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { MediaAsset } from '@/types';
import { Image as ImageIcon, Plus, Trash2, Check, Upload, Link as LinkIcon, Sparkles } from 'lucide-react';
import { getLocalizedText } from '@/lib/i18n';

export const MediaLibraryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelectAsset?: (url: string) => void;
}> = ({ isOpen, onClose, onSelectAsset }) => {
  const project = useEditorStore((state) => state.project);
  const currentLocale = useEditorStore((state) => state.currentLocale);

  const [assets, setAssets] = useState<MediaAsset[]>(project?.mediaAssets || [
    {
      id: 'm-1',
      name: 'Hero Mockup Device',
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      alt: { ru: 'Ноутбук и разработка', en: 'Laptop and development' },
      type: 'image',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'm-2',
      name: 'Team Workspace Office',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      alt: { ru: 'Команда за работой в офисе', en: 'Team collaborating in office' },
      type: 'image',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'm-3',
      name: 'Analytics Dashboard Screen',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      alt: { ru: 'Экран аналитики и графиков', en: 'Analytics dashboard graph' },
      type: 'image',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');

  if (!isOpen) return null;

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    const item: MediaAsset = {
      id: `media-${crypto.randomUUID()}`,
      name: newName.trim() || 'Новое изображение',
      url: newUrl.trim(),
      alt: { [currentLocale]: newName.trim() || 'Изображение' },
      type: 'image',
      createdAt: new Date().toISOString(),
    };
    setAssets([item, ...assets]);
    setNewUrl('');
    setNewName('');
  };

  const handleDelete = (id: string) => {
    setAssets(assets.filter((a) => a.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ImageIcon className="size-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Медиабиблиотека</h3>
              <p className="text-[11px] text-zinc-400">Хранилище картинок и ассетов для сайта</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-sm font-bold">
            ✕
          </button>
        </div>

        {/* Add image form */}
        <form onSubmit={handleAddUrl} className="p-4 bg-zinc-50 dark:bg-zinc-800/40 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-2 items-center">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="URL изображения (https://...)"
            className="flex-1 min-w-[220px] px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Название / Alt"
            className="w-44 px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="size-3.5" /> Добавить
          </button>
        </form>

        {/* Grid of assets */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50 overflow-hidden flex flex-col justify-between shadow-sm hover:border-indigo-400 transition-all"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 relative">
                <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(asset.id);
                  }}
                  className="absolute top-2 right-2 size-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
              <div className="p-2.5 bg-white dark:bg-zinc-900 flex items-center justify-between">
                <span className="text-xs font-semibold truncate text-zinc-800 dark:text-zinc-200">{asset.name}</span>
                {onSelectAsset && (
                  <button
                    onClick={() => {
                      onSelectAsset(asset.url);
                      onClose();
                    }}
                    className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-semibold hover:bg-indigo-700 shrink-0"
                  >
                    Выбрать
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
