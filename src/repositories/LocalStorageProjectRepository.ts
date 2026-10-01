import { SiteProject } from '@/types';
import { ProjectRepository } from './ProjectRepository';
import { SiteProjectSchema } from '@/schemas/project.schema';

const STORAGE_PREFIX = 'crc_site_builder_project_';
const DEFAULT_KEY = 'crc_site_builder_current_project';

export class LocalStorageProjectRepository implements ProjectRepository {
  private getStorageKey(projectId?: string): string {
    return projectId ? `${STORAGE_PREFIX}${projectId}` : DEFAULT_KEY;
  }

  async load(projectId?: string): Promise<SiteProject | null> {
    if (typeof window === 'undefined') return null;

    try {
      const key = this.getStorageKey(projectId);
      const rawData = window.localStorage.getItem(key);
      if (!rawData) return null;

      const parsed = JSON.parse(rawData);
      const validation = SiteProjectSchema.safeParse(parsed);

      if (!validation.success) {
        console.warn('⚠️ LocalStorage data corrupted or invalid schema, falling back to default fixture:', validation.error);
        return null;
      }

      return validation.data as SiteProject;
    } catch (error) {
      console.error('Failed to load project from localStorage:', error);
      return null;
    }
  }

  async save(project: SiteProject): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      // Validate before saving
      const validation = SiteProjectSchema.safeParse(project);
      if (!validation.success) {
        console.error('Invalid project structure before saving:', validation.error);
        throw new Error('Project failed schema validation');
      }

      const key = this.getStorageKey(project.id);
      const json = JSON.stringify(validation.data);
      window.localStorage.setItem(key, json);
      window.localStorage.setItem(DEFAULT_KEY, json);
    } catch (error) {
      console.error('Failed to save project to localStorage:', error);
      throw error;
    }
  }

  async reset(projectId?: string): Promise<void> {
    if (typeof window === 'undefined') return;
    const key = this.getStorageKey(projectId);
    window.localStorage.removeItem(key);
    window.localStorage.removeItem(DEFAULT_KEY);
  }
}

export const projectRepository = new LocalStorageProjectRepository();
