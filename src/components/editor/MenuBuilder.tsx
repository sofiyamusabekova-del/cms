'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { Menu, MenuItem } from '@/types';
import { Menu as MenuIcon, Plus, Trash2, ArrowUp, ArrowDown, ExternalLink, Link2, FileText } from 'lucide-react';
import { getLocalizedText } from '@/lib/i18n';
import { TextControl, SelectControl } from '@/components/controls';

export const MenuBuilder: React.FC = () => {
  const project = useEditorStore((state) => state.project);
  const currentLocale = useEditorStore((state) => state.currentLocale);

  const pages = project?.pages || [];

  const [menus, setMenus] = useState<Menu[]>(project?.menus || [
    {
      id: 'header-main-menu',
      name: 'Главное меню (Header)',
      location: 'header',
      items: [
        { id: 'mi-1', label: { ru: 'Главная', en: 'Home', uz: 'Bosh sahifa' }, type: 'page', pageId: pages[0]?.id },
        { id: 'mi-2', label: { ru: 'Возможности', en: 'Features', uz: 'Imkoniyatlar' }, type: 'external', url: '#features' },
        { id: 'mi-3', label: { ru: 'Тарифы', en: 'Pricing', uz: 'Tariflar' }, type: 'external', url: '#pricing' },
        { id: 'mi-4', label: { ru: 'Контакты', en: 'Contacts', uz: 'Aloqa' }, type: 'external', url: '#contacts' },
      ],
    },
  ]);

  const [selectedMenuId, setSelectedMenuId] = useState<string>(menus[0]?.id || '');
  const [newLabel, setNewLabel] = useState('');
  const [newType, setNewType] = useState<'page' | 'external'>('page');
  const [newPageId, setNewPageId] = useState<string>(pages[0]?.id || '');
  const [newUrl, setNewUrl] = useState('');

  const activeMenu = menus.find((m) => m.id === selectedMenuId) || menus[0];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim() || !activeMenu) return;

    const item: MenuItem = {
      id: `menu-item-${crypto.randomUUID()}`,
      label: { [currentLocale]: newLabel.trim() },
      type: newType,
      pageId: newType === 'page' ? newPageId : undefined,
      url: newType === 'external' ? newUrl.trim() : undefined,
    };

    const nextMenus = menus.map((m) => {
      if (m.id !== activeMenu.id) return m;
      return { ...m, items: [...m.items, item] };
    });

    setMenus(nextMenus);
    setNewLabel('');
    setNewUrl('');
  };

  const handleMove = (fromIdx: number, toIdx: number) => {
    if (!activeMenu) return;
    const nextItems = [...activeMenu.items];
    const [moved] = nextItems.splice(fromIdx, 1);
    nextItems.splice(toIdx, 0, moved);

    setMenus(menus.map((m) => (m.id === activeMenu.id ? { ...m, items: nextItems } : m)));
  };

  const handleDeleteItem = (itemId: string) => {
    if (!activeMenu) return;
    const nextItems = activeMenu.items.filter((i) => i.id !== itemId);
    setMenus(menus.map((m) => (m.id === activeMenu.id ? { ...m, items: nextItems } : m)));
  };

  return (
    <div className="p-4 space-y-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <MenuIcon className="size-4 text-indigo-600" />
        <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
          Конструктор навигации (Меню)
        </h3>
      </div>

      {/* Menu items list */}
      {activeMenu && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
            Пункты меню:
          </span>

          {activeMenu.items.map((item, idx) => {
            const pageRef = pages.find((p) => p.id === item.pageId);
            return (
              <div
                key={item.id}
                className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 flex items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {item.type === 'page' ? (
                    <FileText className="size-3.5 text-indigo-500 shrink-0" />
                  ) : (
                    <ExternalLink className="size-3.5 text-emerald-500 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 block truncate">
                      {getLocalizedText(item.label, currentLocale)}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono block truncate">
                      {item.type === 'page' ? `Страница: ${pageRef?.title || item.pageId}` : item.url}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {idx > 0 && (
                    <button onClick={() => handleMove(idx, idx - 1)} className="p-1 hover:text-zinc-900 dark:hover:text-white">
                      <ArrowUp className="size-3" />
                    </button>
                  )}
                  {idx < activeMenu.items.length - 1 && (
                    <button onClick={() => handleMove(idx, idx + 1)} className="p-1 hover:text-zinc-900 dark:hover:text-white">
                      <ArrowDown className="size-3" />
                    </button>
                  )}
                  <button onClick={() => handleDeleteItem(item.id)} className="p-1 text-zinc-400 hover:text-rose-500">
                    <Trash2 className="size-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Item Form */}
      <form onSubmit={handleAddItem} className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-3">
        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
          + Добавить ссылку в меню:
        </span>

        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Название ссылки (напр. О сервисе)"
          className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-900"
        />

        <div className="flex items-center gap-2">
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as any)}
            className="px-2 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-900"
          >
            <option value="page">Страница сайта</option>
            <option value="external">Внешний URL / Якорь</option>
          </select>

          {newType === 'page' ? (
            <select
              value={newPageId}
              onChange={(e) => setNewPageId(e.target.value)}
              className="flex-1 px-2 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-900"
            >
              {pages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} (/{p.slug})
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://... или #id"
              className="flex-1 px-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-900"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
        >
          Добавить в меню
        </button>
      </form>
    </div>
  );
};
