import { create } from 'zustand';
import {
  SiteProject,
  Page,
  Breakpoint,
  PageBlock,
  BlockStyles,
  ResponsiveValue,
  GlobalStyles,
  PageSEO,
  LocalizedText,
} from '@/types';
import { demoProject } from '@/builder/fixtures/demoProject';
import { getByPath, setByPath } from '@/lib/setByPath';
import { resetResponsiveBreakpoint } from '@/builder/renderer/styleResolver';
import { projectRepository } from '@/repositories/LocalStorageProjectRepository';

const MAX_HISTORY = 50;
let autosaveTimer: NodeJS.Timeout | null = null;

export interface EditorState {
  project: SiteProject | null;
  selectedPageId: string | null;
  selectedBlockId: string | null;
  hoveredBlockId: string | null;
  currentLocale: string;
  currentBreakpoint: Breakpoint;
  isDirty: boolean;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';

  // History (Sprint 12.1)
  past: SiteProject[];
  future: SiteProject[];

  // Actions
  selectPage: (id: string) => void;
  selectBlock: (id: string | null) => void;
  setHoveredBlock: (id: string | null) => void;
  setLocale: (locale: string) => void;
  setBreakpoint: (bp: Breakpoint) => void;
  setProject: (project: SiteProject) => void;
  updateGlobalStyles: (styles: Partial<GlobalStyles>) => void;
  updateGlobalColor: (key: keyof GlobalStyles['colors'], value: string) => void;

  // History Actions (Sprint 12.1)
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Pages CRUD (Sprint 13.1, 18.1, 24.1)
  addPage: (title: string, slug?: string) => string;
  addPageFromTemplate: (templateId: string, title?: string) => string;
  insertPage: (page: Page) => void;
  removePage: (pageId: string) => void;
  renamePage: (pageId: string, title: string, slug?: string) => void;
  updatePageSEO: (pageId: string, seo: Partial<PageSEO>) => void;

  // Multilingual & Translations (Sprint 14.1, 14.2)
  addLocale: (locale: string) => void;
  removeLocale: (locale: string) => void;
  updateTranslation: (key: string, locale: string, value: string) => void;

  // Block Actions
  addBlock: (block: PageBlock, index?: number) => void;
  removeBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  setBlockVariant: (id: string, variant: string) => void;
  updateBlockContent: (id: string, path: string, value: unknown) => void;
  updateBlockStyle: (id: string, path: string, value: unknown) => void;
  resetBlockStyleBreakpoint: (id: string, path: string, breakpoint: Breakpoint) => void;

  // Persistence Actions
  loadProject: (projectId?: string) => Promise<void>;
  saveProject: () => Promise<void>;
  resetToDefault: () => Promise<void>;
  scheduleAutosave: () => void;
}

// Helper to push history
function recordState(state: EditorState): { past: SiteProject[]; future: SiteProject[] } {
  if (!state.project) return { past: state.past, future: [] };
  const currentSnapshot = structuredClone(state.project);
  const nextPast = [...state.past, currentSnapshot].slice(-MAX_HISTORY);
  return { past: nextPast, future: [] };
}

export const useEditorStore = create<EditorState>((set, get) => ({
  project: demoProject,
  selectedPageId: demoProject.pages[0]?.id || null,
  selectedBlockId: demoProject.pages[0]?.blocks[0]?.id || null,
  hoveredBlockId: null,
  currentLocale: 'ru',
  currentBreakpoint: 'desktop',
  isDirty: false,
  saveStatus: 'idle',
  past: [],
  future: [],

  selectPage: (id) => set({ selectedPageId: id, selectedBlockId: null }),
  selectBlock: (id) => set({ selectedBlockId: id }),
  setHoveredBlock: (id) => set({ hoveredBlockId: id }),
  setLocale: (locale) => set({ currentLocale: locale }),
  setBreakpoint: (bp) => set({ currentBreakpoint: bp }),
  setProject: (project) =>
    set({
      project,
      selectedPageId: project.pages[0]?.id || null,
      selectedBlockId: project.pages[0]?.blocks[0]?.id || null,
      isDirty: false,
      saveStatus: 'saved',
      past: [],
      future: [],
    }),

  // History Functions
  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,

  undo: () => {
    const { past, project, future } = get();
    if (past.length === 0 || !project) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    const newFuture = [structuredClone(project), ...future].slice(0, MAX_HISTORY);

    set({
      project: previous,
      past: newPast,
      future: newFuture,
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
  },

  redo: () => {
    const { past, project, future } = get();
    if (future.length === 0 || !project) return;

    const next = future[0];
    const newFuture = future.slice(1);
    const newPast = [...past, structuredClone(project)].slice(-MAX_HISTORY);

    set({
      project: next,
      past: newPast,
      future: newFuture,
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
  },

  // Page Management
  addPage: (title, rawSlug) => {
    const { project } = get();
    if (!project) return '';

    const slug = rawSlug !== undefined ? rawSlug : title.toLowerCase().trim().replace(/[^a-z0-9а-яё]+/gi, '-');
    const newPageId = `page-${crypto.randomUUID()}`;
    const newPage: Page = {
      id: newPageId,
      title,
      slug,
      status: 'draft',
      blocks: [],
      seo: {
        title: { [get().currentLocale]: `${title} | ${project.name}` },
        description: { [get().currentLocale]: `Описание страницы ${title}` },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const history = recordState(get());
    const nextPages = [...project.pages, newPage];

    set({
      ...history,
      project: { ...project, pages: nextPages },
      selectedPageId: newPageId,
      selectedBlockId: null,
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
    return newPageId;
  },

  addPageFromTemplate: (templateId, customTitle) => {
    const { project } = get();
    if (!project) return '';

    const { PAGE_TEMPLATES } = require('@/builder/templates/pageTemplates');
    const template = PAGE_TEMPLATES.find((t: any) => t.id === templateId) || PAGE_TEMPLATES[0];

    const title = customTitle || template.name.split(' (')[0];
    const slug = title.toLowerCase().trim().replace(/[^a-z0-9а-яё]+/gi, '-');
    const newPageId = `page-${crypto.randomUUID()}`;

    const newBlocks: PageBlock[] = template.blocks.map((b: any) => ({
      ...structuredClone(b),
      id: `block-${crypto.randomUUID()}`,
    }));

    const newPage: Page = {
      id: newPageId,
      title,
      slug,
      status: 'draft',
      blocks: newBlocks,
      seo: {
        title: { [get().currentLocale]: `${title} | ${project.name}` },
        description: { [get().currentLocale]: template.description },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const history = recordState(get());
    const nextPages = [...project.pages, newPage];

    set({
      ...history,
      project: { ...project, pages: nextPages },
      selectedPageId: newPageId,
      selectedBlockId: newBlocks[0]?.id || null,
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
    return newPageId;
  },

  insertPage: (newPage: Page) => {
    const { project } = get();
    if (!project) return;

    const history = recordState(get());
    const nextPages = [...project.pages, newPage];

    set({
      ...history,
      project: { ...project, pages: nextPages },
      selectedPageId: newPage.id,
      selectedBlockId: newPage.blocks[0]?.id || null,
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
  },

  removePage: (pageId) => {
    const { project, selectedPageId } = get();
    if (!project || project.pages.length <= 1) return; // Keep at least 1 page

    const history = recordState(get());
    const nextPages = project.pages.filter((p) => p.id !== pageId);
    const nextSelectedPageId = selectedPageId === pageId ? nextPages[0]?.id || null : selectedPageId;

    set({
      ...history,
      project: { ...project, pages: nextPages },
      selectedPageId: nextSelectedPageId,
      selectedBlockId: null,
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
  },

  renamePage: (pageId, title, rawSlug) => {
    const { project } = get();
    if (!project) return;

    const history = recordState(get());
    const nextPages = project.pages.map((p) => {
      if (p.id !== pageId) return p;
      return {
        ...p,
        title,
        slug: rawSlug !== undefined ? rawSlug : p.slug,
        updatedAt: new Date().toISOString(),
      };
    });

    set({
      ...history,
      project: { ...project, pages: nextPages },
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
  },

  updatePageSEO: (pageId, seo) => {
    const { project } = get();
    if (!project) return;

    const history = recordState(get());
    const nextPages = project.pages.map((p) => {
      if (p.id !== pageId) return p;
      return {
        ...p,
        seo: { ...p.seo, ...seo },
        updatedAt: new Date().toISOString(),
      };
    });

    set({
      ...history,
      project: { ...project, pages: nextPages },
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
  },

  // Multilingual Management
  addLocale: (locale) => {
    const { project } = get();
    if (!project || project.locales.includes(locale)) return;

    const history = recordState(get());
    set({
      ...history,
      project: { ...project, locales: [...project.locales, locale] },
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
  },

  removeLocale: (locale) => {
    const { project, currentLocale } = get();
    if (!project || project.locales.length <= 1) return;

    const history = recordState(get());
    const nextLocales = project.locales.filter((l) => l !== locale);
    const nextCurrent = currentLocale === locale ? nextLocales[0] : currentLocale;

    set({
      ...history,
      project: { ...project, locales: nextLocales },
      currentLocale: nextCurrent,
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
  },

  updateTranslation: (key, locale, value) => {
    const { project } = get();
    if (!project) return;

    const currentEntry = project.translations[key] || {};
    const updatedTranslations = {
      ...project.translations,
      [key]: {
        ...currentEntry,
        [locale]: value,
      },
    };

    set({
      project: { ...project, translations: updatedTranslations },
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
  },

  updateGlobalStyles: (styles) => {
    const { project } = get();
    if (!project) return;
    const history = recordState(get());
    const nextStyles: GlobalStyles = {
      ...project.globalStyles,
      ...styles,
      colors: { ...project.globalStyles.colors, ...(styles.colors || {}) },
      typography: { ...project.globalStyles.typography, ...(styles.typography || {}) },
      radius: { ...project.globalStyles.radius, ...(styles.radius || {}) },
    };
    set({
      ...history,
      project: { ...project, globalStyles: nextStyles },
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
  },

  updateGlobalColor: (key, value) => {
    const { project } = get();
    if (!project) return;
    const history = recordState(get());
    const nextColors = {
      ...project.globalStyles.colors,
      [key]: value,
    };
    const nextStyles: GlobalStyles = {
      ...project.globalStyles,
      colors: nextColors,
    };
    set({
      ...history,
      project: { ...project, globalStyles: nextStyles },
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
  },

  addBlock: (block, index) => {
    const { project, selectedPageId } = get();
    if (!project || !selectedPageId) return;

    const history = recordState(get());
    const newPages = project.pages.map((page) => {
      if (page.id !== selectedPageId) return page;
      const newBlocks = [...page.blocks];
      if (index !== undefined && index >= 0) {
        newBlocks.splice(index, 0, block);
      } else {
        newBlocks.push(block);
      }
      return { ...page, blocks: newBlocks, updatedAt: new Date().toISOString() };
    });

    set({
      ...history,
      project: { ...project, pages: newPages },
      selectedBlockId: block.id,
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
  },

  removeBlock: (id) => {
    const { project, selectedPageId, selectedBlockId } = get();
    if (!project || !selectedPageId) return;

    const history = recordState(get());
    const newPages = project.pages.map((page) => {
      if (page.id !== selectedPageId) return page;
      return {
        ...page,
        blocks: page.blocks.filter((b) => b.id !== id),
        updatedAt: new Date().toISOString(),
      };
    });

    set({
      ...history,
      project: { ...project, pages: newPages },
      selectedBlockId: selectedBlockId === id ? null : selectedBlockId,
      isDirty: true,
      saveStatus: 'idle',
    });
    get().scheduleAutosave();
  },

  duplicateBlock: (id) => {
    const { project, selectedPageId } = get();
    if (!project || !selectedPageId) return;

    const history = recordState(get());
    const newPages = project.pages.map((page) => {
      if (page.id !== selectedPageId) return page;
      const blockIndex = page.blocks.findIndex((b) => b.id === id);
      if (blockIndex === -1) return page;

      const original = page.blocks[blockIndex];
      const duplicated: PageBlock = {
        ...structuredClone(original),
        id: `block-${crypto.randomUUID()}`,
      };

      const newBlocks = [...page.blocks];
      newBlocks.splice(blockIndex + 1, 0, duplicated);

      return { ...page, blocks: newBlocks, updatedAt: new Date().toISOString() };
    });

    set({ ...history, project: { ...project, pages: newPages }, isDirty: true, saveStatus: 'idle' });
    get().scheduleAutosave();
  },

  moveBlock: (fromIndex, toIndex) => {
    const { project, selectedPageId } = get();
    if (!project || !selectedPageId) return;

    const history = recordState(get());
    const newPages = project.pages.map((page) => {
      if (page.id !== selectedPageId) return page;
      const newBlocks = [...page.blocks];
      const [moved] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, moved);
      return { ...page, blocks: newBlocks, updatedAt: new Date().toISOString() };
    });

    set({ ...history, project: { ...project, pages: newPages }, isDirty: true, saveStatus: 'idle' });
    get().scheduleAutosave();
  },

  setBlockVariant: (id, variant) => {
    const { project, selectedPageId } = get();
    if (!project || !selectedPageId) return;

    const history = recordState(get());
    const newPages = project.pages.map((page) => {
      if (page.id !== selectedPageId) return page;
      const newBlocks = page.blocks.map((block) => {
        if (block.id !== id) return block;
        return { ...block, variant };
      });
      return { ...page, blocks: newBlocks, updatedAt: new Date().toISOString() };
    });

    set({ ...history, project: { ...project, pages: newPages }, isDirty: true, saveStatus: 'idle' });
    get().scheduleAutosave();
  },

  updateBlockContent: (id, path, value) => {
    const { project, selectedPageId } = get();
    if (!project || !selectedPageId) return;

    const newPages = project.pages.map((page) => {
      if (page.id !== selectedPageId) return page;
      const newBlocks = page.blocks.map((block) => {
        if (block.id !== id) return block;
        const newContent = setByPath(block.content, path, value);
        return { ...block, content: newContent };
      });
      return { ...page, blocks: newBlocks, updatedAt: new Date().toISOString() };
    });

    set({ project: { ...project, pages: newPages }, isDirty: true, saveStatus: 'idle' });
    get().scheduleAutosave();
  },

  updateBlockStyle: (id, path, value) => {
    const { project, selectedPageId } = get();
    if (!project || !selectedPageId) return;

    const newPages = project.pages.map((page) => {
      if (page.id !== selectedPageId) return page;
      const newBlocks = page.blocks.map((block) => {
        if (block.id !== id) return block;
        const newStyles = setByPath(block.styles as Record<string, unknown>, path, value);
        return { ...block, styles: newStyles as BlockStyles };
      });
      return { ...page, blocks: newBlocks, updatedAt: new Date().toISOString() };
    });

    set({ project: { ...project, pages: newPages }, isDirty: true, saveStatus: 'idle' });
    get().scheduleAutosave();
  },

  resetBlockStyleBreakpoint: (id, path, breakpoint) => {
    const { project, selectedPageId } = get();
    if (!project || !selectedPageId) return;

    const history = recordState(get());
    const newPages = project.pages.map((page) => {
      if (page.id !== selectedPageId) return page;
      const newBlocks = page.blocks.map((block) => {
        if (block.id !== id) return block;
        const current = getByPath<ResponsiveValue<unknown>>(
          block.styles as Record<string, unknown>,
          path
        );
        const next = resetResponsiveBreakpoint(current, breakpoint);
        const newStyles = setByPath(block.styles as Record<string, unknown>, path, next);
        return { ...block, styles: newStyles as BlockStyles };
      });
      return { ...page, blocks: newBlocks, updatedAt: new Date().toISOString() };
    });

    set({ ...history, project: { ...project, pages: newPages }, isDirty: true, saveStatus: 'idle' });
    get().scheduleAutosave();
  },

  loadProject: async (projectId) => {
    try {
      const loaded = await projectRepository.load(projectId);
      if (loaded) {
        set({
          project: loaded,
          selectedPageId: loaded.pages[0]?.id || null,
          selectedBlockId: loaded.pages[0]?.blocks[0]?.id || null,
          isDirty: false,
          saveStatus: 'saved',
          past: [],
          future: [],
        });
      }
    } catch (err) {
      console.error('Failed to load project:', err);
    }
  },

  saveProject: async () => {
    const { project } = get();
    if (!project) return;

    set({ saveStatus: 'saving' });
    try {
      await projectRepository.save(project);
      set({ isDirty: false, saveStatus: 'saved' });
    } catch (err) {
      console.error('Save failed:', err);
      set({ saveStatus: 'error' });
    }
  },

  resetToDefault: async () => {
    await projectRepository.reset();
    set({
      project: demoProject,
      selectedPageId: demoProject.pages[0]?.id || null,
      selectedBlockId: demoProject.pages[0]?.blocks[0]?.id || null,
      isDirty: false,
      saveStatus: 'saved',
      past: [],
      future: [],
    });
  },

  scheduleAutosave: () => {
    if (autosaveTimer) {
      clearTimeout(autosaveTimer);
    }
    autosaveTimer = setTimeout(() => {
      get().saveProject();
    }, 700);
  },
}));
