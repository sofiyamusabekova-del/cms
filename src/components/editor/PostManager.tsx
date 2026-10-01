'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { Post, ArticleBlock, ArticleBlockType } from '@/types';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  Eye,
  FileText,
  Heading,
  Image,
  Quote,
  List,
  Code,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { getLocalizedText } from '@/lib/i18n';
import { TextControl, TextareaControl } from '@/components/controls';

export const PostManager: React.FC = () => {
  const project = useEditorStore((state) => state.project);
  const currentLocale = useEditorStore((state) => state.currentLocale);
  const isDirty = useEditorStore((state) => state.isDirty);

  const [posts, setPosts] = useState<Post[]>(project?.posts || [
    {
      id: 'post-1',
      slug: 'how-to-build-fast-websites',
      title: { ru: 'Как создавать быстрые сайты в 2026 году', en: 'How to build lightning-fast websites in 2026' },
      excerpt: { ru: 'Главные принципы блочного подхода и статической генерации.', en: 'Core principles of visual block architecture and SSG.' },
      status: 'published',
      publishedAt: new Date().toISOString(),
      seo: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      blocks: [
        { id: 'b-1', type: 'heading', content: { text: { ru: 'Введение в визуальные конструкторы', en: 'Introduction to visual builders' }, level: 2 } },
        { id: 'b-2', type: 'paragraph', content: { text: { ru: 'Современный веб требует максимальной скорости разработки без потери производительности. Визуальные конструкторы нового поколения генерируют чистый статический код.', en: 'Modern web demands instant iteration speed without compromising performance.' } } },
        { id: 'b-3', type: 'quote', content: { text: { ru: 'Скорость доставки ценности — главный критерий успеха любого веб-проекта.', en: 'Speed of shipping value is the primary success factor.' }, author: { ru: 'Antigravity Team', en: 'Antigravity Team' } } },
        { id: 'b-4', type: 'list', content: { items: [{ ru: 'Статический экспорт', en: 'Static Export' }, { ru: 'Адаптивные токены', en: 'Responsive Tokens' }, { ru: 'Мультиязычность', en: 'Multilingual' }] } },
        { id: 'b-5', type: 'code', content: { text: { ru: 'npm run export-static-zip', en: 'npm run export-static-zip' }, language: 'bash' } },
      ],
    },
  ]);

  const [selectedPostId, setSelectedPostId] = useState<string | null>(posts[0]?.id || null);
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const selectedPost = posts.find((p) => p.id === selectedPostId);

  const handleAddPost = () => {
    const newId = `post-${crypto.randomUUID()}`;
    const newP: Post = {
      id: newId,
      slug: `new-article-${posts.length + 1}`,
      title: { [currentLocale]: 'Новая статья блога' },
      excerpt: { [currentLocale]: 'Краткое описание статьи...' },
      status: 'draft',
      blocks: [
        { id: `ab-${crypto.randomUUID()}`, type: 'heading', content: { text: { [currentLocale]: 'Заголовок статьи' }, level: 2 } },
        { id: `ab-${crypto.randomUUID()}`, type: 'paragraph', content: { text: { [currentLocale]: 'Текст первого абзаца...' } } },
      ],
      seo: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPosts([newP, ...posts]);
    setSelectedPostId(newId);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Удалить статью?')) {
      const next = posts.filter((p) => p.id !== id);
      setPosts(next);
      if (selectedPostId === id) setSelectedPostId(next[0]?.id || null);
    }
  };

  const handleAddArticleBlock = (type: ArticleBlockType) => {
    if (!selectedPost) return;
    const newBlock: ArticleBlock = {
      id: `ab-${crypto.randomUUID()}`,
      type,
      content: {
        text: { [currentLocale]: type === 'heading' ? 'Новый подзаголовок' : type === 'code' ? 'const greeting = "Hello World!";' : 'Текст блока...' },
        level: 2,
        items: type === 'list' ? [{ [currentLocale]: 'Элемент списка 1' }, { [currentLocale]: 'Элемент списка 2' }] : undefined,
      },
    };

    const nextPosts = posts.map((p) => {
      if (p.id !== selectedPost.id) return p;
      return { ...p, blocks: [...p.blocks, newBlock], updatedAt: new Date().toISOString() };
    });
    setPosts(nextPosts);
  };

  const handleMoveArticleBlock = (fromIndex: number, toIndex: number) => {
    if (!selectedPost) return;
    const newBlocks = [...selectedPost.blocks];
    const [moved] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, moved);

    const nextPosts = posts.map((p) => (p.id === selectedPost.id ? { ...p, blocks: newBlocks } : p));
    setPosts(nextPosts);
  };

  const handleDeleteArticleBlock = (blockId: string) => {
    if (!selectedPost) return;
    const nextBlocks = selectedPost.blocks.filter((b) => b.id !== blockId);
    const nextPosts = posts.map((p) => (p.id === selectedPost.id ? { ...p, blocks: nextBlocks } : p));
    setPosts(nextPosts);
  };

  const handleUpdateBlockText = (blockId: string, text: string) => {
    if (!selectedPost) return;
    const nextBlocks = selectedPost.blocks.map((b) => {
      if (b.id !== blockId) return b;
      return {
        ...b,
        content: {
          ...b.content,
          text: { ...(b.content.text || {}), [currentLocale]: text },
        },
      };
    });
    setPosts(posts.map((p) => (p.id === selectedPost.id ? { ...p, blocks: nextBlocks } : p)));
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 overflow-hidden">
      {/* Top Header */}
      <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
          <BookOpen className="size-4 text-indigo-600" />
          <span>Статьи блога ({posts.length})</span>
        </div>
        <button
          onClick={handleAddPost}
          className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium flex items-center gap-1"
        >
          <Plus className="size-3" /> Написать
        </button>
      </div>

      {/* Main split: Left post list | Right article editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Post List */}
        <div className="w-56 border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto p-2 space-y-1">
          {posts.map((p) => {
            const isSel = p.id === selectedPostId;
            return (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedPostId(p.id);
                  setPreviewMode(false);
                }}
                className={`p-2 rounded-xl text-left cursor-pointer transition-all border ${
                  isSel
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold truncate text-zinc-900 dark:text-zinc-100">
                    {getLocalizedText(p.title, currentLocale)}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePost(p.id);
                    }}
                    className="text-zinc-400 hover:text-rose-500 p-0.5"
                  >
                    <Trash2 className="size-3" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1 font-mono">
                  <span>{p.blocks.length} блоков</span>
                  <span className={`px-1.5 rounded ${p.status === 'published' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                    {p.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Post Editor / Preview */}
        <div className="flex-1 flex flex-col overflow-y-auto p-4">
          {selectedPost ? (
            <div className="space-y-4 max-w-xl mx-auto w-full">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {getLocalizedText(selectedPost.title, currentLocale)}
                  </h3>
                  <span className="text-xs text-zinc-400 font-mono">/{selectedPost.slug}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewMode(!previewMode)}
                    className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-medium flex items-center gap-1 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Eye className="size-3.5" />
                    <span>{previewMode ? 'Редактор' : 'Превью статьи'}</span>
                  </button>
                </div>
              </div>

              {previewMode ? (
                /* Article Preview View (Sprint 19.2) */
                <article className="prose dark:prose-invert max-w-none space-y-4 py-2">
                  <h1 className="text-2xl font-black">{getLocalizedText(selectedPost.title, currentLocale)}</h1>
                  <p className="text-sm text-zinc-500 italic">{getLocalizedText(selectedPost.excerpt, currentLocale)}</p>
                  <hr />
                  {selectedPost.blocks.map((b) => {
                    const text = getLocalizedText(b.content.text, currentLocale);
                    if (b.type === 'heading') return <h2 key={b.id} className="text-lg font-bold">{text}</h2>;
                    if (b.type === 'paragraph') return <p key={b.id} className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{text}</p>;
                    if (b.type === 'quote') return <blockquote key={b.id} className="p-3 border-l-4 border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 italic text-xs">{text}</blockquote>;
                    if (b.type === 'code') return <pre key={b.id} className="p-3 rounded-xl bg-zinc-900 text-emerald-400 font-mono text-xs overflow-x-auto"><code>{text}</code></pre>;
                    if (b.type === 'list') return (
                      <ul key={b.id} className="list-disc pl-5 space-y-1 text-xs">
                        {b.content.items?.map((it, iIdx) => <li key={iIdx}>{getLocalizedText(it, currentLocale)}</li>)}
                      </ul>
                    );
                    return null;
                  })}
                </article>
              ) : (
                /* Article Block Editor */
                <div className="space-y-3">
                  <TextControl
                    label="Заголовок статьи"
                    value={getLocalizedText(selectedPost.title, currentLocale)}
                    onChange={(val) => {
                      const next = posts.map((p) => (p.id === selectedPost.id ? { ...p, title: { ...(p.title || {}), [currentLocale]: val } } : p));
                      setPosts(next);
                    }}
                  />

                  {/* Article Blocks List */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
                      Содержимое статьи ({selectedPost.blocks.length} блоков):
                    </span>

                    {selectedPost.blocks.map((b, idx) => (
                      <div
                        key={b.id}
                        className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-2"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono uppercase text-zinc-400">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{b.type}</span>
                          <div className="flex items-center gap-1">
                            {idx > 0 && (
                              <button onClick={() => handleMoveArticleBlock(idx, idx - 1)} className="p-0.5 hover:text-zinc-900 dark:hover:text-white">
                                <ArrowUp className="size-3" />
                              </button>
                            )}
                            {idx < selectedPost.blocks.length - 1 && (
                              <button onClick={() => handleMoveArticleBlock(idx, idx + 1)} className="p-0.5 hover:text-zinc-900 dark:hover:text-white">
                                <ArrowDown className="size-3" />
                              </button>
                            )}
                            <button onClick={() => handleDeleteArticleBlock(b.id)} className="p-0.5 text-rose-500">
                              <Trash2 className="size-3" />
                            </button>
                          </div>
                        </div>

                        <textarea
                          rows={b.type === 'paragraph' ? 3 : 1}
                          value={getLocalizedText(b.content.text, currentLocale)}
                          onChange={(e) => handleUpdateBlockText(b.id, e.target.value)}
                          className="w-full px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add Block Toolbar */}
                  <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-[10px] font-semibold text-zinc-500 uppercase px-1">+ Блок:</span>
                    <button onClick={() => handleAddArticleBlock('paragraph')} className="px-2 py-1 rounded bg-white dark:bg-zinc-700 hover:text-indigo-600 text-[11px] font-medium shadow-sm">
                      Параграф
                    </button>
                    <button onClick={() => handleAddArticleBlock('heading')} className="px-2 py-1 rounded bg-white dark:bg-zinc-700 hover:text-indigo-600 text-[11px] font-medium shadow-sm">
                      Подзаголовок
                    </button>
                    <button onClick={() => handleAddArticleBlock('quote')} className="px-2 py-1 rounded bg-white dark:bg-zinc-700 hover:text-indigo-600 text-[11px] font-medium shadow-sm">
                      Цитата
                    </button>
                    <button onClick={() => handleAddArticleBlock('list')} className="px-2 py-1 rounded bg-white dark:bg-zinc-700 hover:text-indigo-600 text-[11px] font-medium shadow-sm">
                      Список
                    </button>
                    <button onClick={() => handleAddArticleBlock('code')} className="px-2 py-1 rounded bg-white dark:bg-zinc-700 hover:text-indigo-600 text-[11px] font-medium shadow-sm">
                      Код
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-zinc-400">Выберите статью для редактирования</div>
          )}
        </div>
      </div>
    </div>
  );
};
